/**
 * Survey Detail Screen
 * View/edit an existing survey record, with upload to Sanity.
 */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  Button,
  Surface,
  Snackbar,
  ActivityIndicator,
  Icon,
  Divider,
  Chip,
} from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toftreesTheme, spacing, radii } from '../../theme';
import { LocationDisplay } from '../../components/LocationDisplay';
import { InscriptionEditor } from '../../components/InscriptionEditor';
import { GraveForm } from '../../components/GraveForm';
import { getSurvey, updateSurvey } from '../../services/storage';
import { recognizeText, extractPersonsFromText } from '../../services/ocr';
import { getCurrentLocation } from '../../services/location';
import { uploadSurvey } from '../../services/sanity';
import type { SurveyRecord, LocationResult, PersonRecord } from '../../types';

export default function SurveyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [survey, setSurvey] = useState<SurveyRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [snackMessage, setSnackMessage] = useState('');
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    loadSurvey();
  }, [id]);

  const loadSurvey = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getSurvey(id);
      setSurvey(data);
    } catch (error) {
      console.error('Failed to load survey:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updates: Partial<SurveyRecord>) => {
    if (!survey) return;
    const updated = { ...survey, ...updates };
    setSurvey(updated);
  };

  const handleSave = async () => {
    if (!survey) return;
    setSaving(true);
    try {
      await updateSurvey(survey.id, survey);
      setSnackMessage('Saved!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleRunOcr = async () => {
    if (!survey?.headstonePhotoUri) {
      setSnackMessage('No photo to analyse');
      return;
    }
    setIsOcrProcessing(true);
    try {
      const result = await recognizeText(survey.headstonePhotoUri);
      const updates: Partial<SurveyRecord> = {
        rawOcrText: result.fullText,
        editedInscription: result.fullText,
      };

      // Try person extraction
      if (result.fullText) {
        const extracted = extractPersonsFromText(result.fullText);
        if (extracted.length > 0) {
          const persons: PersonRecord[] = extracted.map((p) => ({
            key: Math.random().toString(36).substring(2, 10),
            name: p.name,
            year: p.year,
            age: p.age,
          }));
          updates.persons = [...(survey.persons || []), ...persons];
          setSnackMessage(`Found ${extracted.length} person(s)`);
        }
      }

      handleUpdate(updates);
    } catch (error) {
      Alert.alert(
        'OCR Error',
        error instanceof Error ? error.message : 'Failed to run OCR'
      );
    } finally {
      setIsOcrProcessing(false);
    }
  };

  const handleRefreshLocation = async () => {
    setLocationLoading(true);
    try {
      const loc = await getCurrentLocation();
      handleUpdate({
        latitude: loc.latitude,
        longitude: loc.longitude,
        altitude: loc.altitude,
        what3words: loc.what3words,
      });
      setSnackMessage('Location updated');
    } catch (error) {
      Alert.alert('Error', 'Failed to get location');
    } finally {
      setLocationLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!survey) return;

    Alert.alert(
      'Upload to Sanity',
      `Upload "${survey.familySurname || 'this survey'}" to the Toftrees dataset?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Upload',
          onPress: async () => {
            setUploading(true);
            try {
              const sanityId = await uploadSurvey(survey, setUploadProgress);
              handleUpdate({ status: 'uploaded', sanityId });
              await updateSurvey(survey.id, {
                status: 'uploaded',
                sanityId,
              });
              setSnackMessage('Successfully uploaded to Sanity!');
            } catch (error) {
              Alert.alert(
                'Upload Error',
                error instanceof Error
                  ? error.message
                  : 'Failed to upload. Check Sanity token in Settings.'
              );
            } finally {
              setUploading(false);
              setUploadProgress('');
            }
          },
        },
      ]
    );
  };

  const handleMarkReady = async () => {
    if (!survey) return;
    handleUpdate({ status: 'ready' });
    await updateSurvey(survey.id, { status: 'ready' });
    setSnackMessage('Marked as ready for upload');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={toftreesTheme.colors.primary} />
      </View>
    );
  }

  if (!survey) {
    return (
      <View style={styles.loadingContainer}>
        <Text variant="titleMedium" style={{ color: toftreesTheme.colors.error }}>
          Survey not found
        </Text>
        <Button mode="outlined" onPress={() => router.back()}>
          Go Back
        </Button>
      </View>
    );
  }

  const location: LocationResult | null =
    survey.latitude != null && survey.longitude != null
      ? {
          latitude: survey.latitude,
          longitude: survey.longitude,
          altitude: survey.altitude,
          what3words: survey.what3words,
        }
      : null;

  const statusConfig = {
    draft: { label: 'Draft', color: toftreesTheme.colors.secondary },
    ready: { label: 'Ready', color: toftreesTheme.colors.primary },
    uploaded: { label: 'Uploaded', color: toftreesTheme.colors.tertiary },
  };
  const status = statusConfig[survey.status];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Status bar */}
        <View style={styles.statusBar}>
          <Chip icon="information" style={{ backgroundColor: status.color + '33' }}>
            {status.label}
          </Chip>
          {survey.sanityId && (
            <Text variant="labelSmall" style={styles.sanityId}>
              Sanity: {survey.sanityId.slice(0, 12)}...
            </Text>
          )}
        </View>

        {/* Photo */}
        {survey.headstonePhotoUri && (
          <Image
            source={{ uri: survey.headstonePhotoUri }}
            style={styles.photo}
            resizeMode="contain"
          />
        )}

        {/* Location */}
        <LocationDisplay
          location={location}
          loading={locationLoading}
        />
        <Button
          mode="outlined"
          icon="crosshairs-gps"
          onPress={handleRefreshLocation}
          disabled={locationLoading}
          compact
          style={styles.sectionButton}
        >
          {location ? 'Update Location' : 'Capture Location'}
        </Button>

        <Divider style={styles.divider} />

        {/* Inscription */}
        <InscriptionEditor
          rawText={survey.rawOcrText || ''}
          editedText={survey.editedInscription || ''}
          onTextChange={(text) => handleUpdate({ editedInscription: text })}
          onRunOcr={handleRunOcr}
          isProcessing={isOcrProcessing}
        />

        <Divider style={styles.divider} />

        {/* Grave Form */}
        <GraveForm survey={survey} onUpdate={handleUpdate} />
      </ScrollView>

      {/* Action bar */}
      <Surface style={[styles.actionBar, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
        {uploading && (
          <View style={styles.uploadProgress}>
            <ActivityIndicator size="small" color={toftreesTheme.colors.primary} />
            <Text variant="labelSmall" style={styles.uploadText}>
              {uploadProgress || 'Uploading...'}
            </Text>
          </View>
        )}

        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            icon="content-save"
            onPress={handleSave}
            loading={saving}
            disabled={saving || uploading}
            style={styles.actionButton}
          >
            Save
          </Button>

          {survey.status === 'draft' && (
            <Button
              mode="contained-tonal"
              icon="check-circle-outline"
              onPress={handleMarkReady}
              disabled={uploading}
              style={styles.actionButton}
            >
              Mark Ready
            </Button>
          )}

          {survey.status !== 'uploaded' && (
            <Button
              mode="contained"
              icon="cloud-upload"
              onPress={handleUpload}
              loading={uploading}
              disabled={uploading || saving}
              style={styles.actionButton}
            >
              Upload
            </Button>
          )}
        </View>
      </Surface>

      <Snackbar
        visible={Boolean(snackMessage)}
        onDismiss={() => setSnackMessage('')}
        duration={3000}
        style={styles.snackbar}
      >
        {snackMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: toftreesTheme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: toftreesTheme.colors.background,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 120,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sanityId: {
    color: toftreesTheme.colors.outline,
    fontFamily: 'monospace',
  },
  photo: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: radii.md,
    marginBottom: spacing.md,
    backgroundColor: toftreesTheme.colors.elevation.level2,
  },
  sectionButton: {
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
  },
  divider: {
    marginVertical: spacing.lg,
    backgroundColor: toftreesTheme.colors.outlineVariant,
  },
  actionBar: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: toftreesTheme.colors.elevation.level2,
    borderTopWidth: 1,
    borderTopColor: toftreesTheme.colors.outlineVariant,
  },
  uploadProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  uploadText: {
    color: toftreesTheme.colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  snackbar: {
    bottom: 80,
  },
});
