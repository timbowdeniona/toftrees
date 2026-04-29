/**
 * New Survey Screen
 * Multi-step capture wizard: Photo → Location → OCR → Details → Save
 */
import React, { useState, useCallback } from 'react';
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
  Button,
  Text,
  ProgressBar,
  Surface,
  Snackbar,
  Icon,
  IconButton,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toftreesTheme, spacing, radii } from '../../theme';
import { CameraCapture } from '../../components/CameraCapture';
import { LocationDisplay } from '../../components/LocationDisplay';
import { InscriptionEditor } from '../../components/InscriptionEditor';
import { GraveForm } from '../../components/GraveForm';
import { getCurrentLocation } from '../../services/location';
import { recognizeText, extractPersonsFromText } from '../../services/ocr';
import { createSurvey } from '../../services/storage';
import { uploadSurvey } from '../../services/sanity';
import type { SurveyRecord, LocationResult, PersonRecord } from '../../types';

type Step = 'photo' | 'location' | 'inscription' | 'details' | 'review';

const STEPS: Step[] = ['photo', 'location', 'inscription', 'details', 'review'];
const STEP_LABELS: Record<Step, string> = {
  photo: '📸 Photo',
  location: '📍 Location',
  inscription: '📝 Inscription',
  details: '📋 Details',
  review: '✅ Review',
};

export default function NewSurveyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState<Step>('photo');
  const [showCamera, setShowCamera] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [saving, setSaving] = useState(false);

  // Survey data
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [additionalPhotos, setAdditionalPhotos] = useState<string[]>([]);
  const [location, setLocation] = useState<LocationResult | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [rawOcrText, setRawOcrText] = useState('');
  const [editedInscription, setEditedInscription] = useState('');
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [surveyData, setSurveyData] = useState<Partial<SurveyRecord>>({});

  const currentStepIndex = STEPS.indexOf(currentStep);
  const progress = (currentStepIndex + 1) / STEPS.length;

  // Navigation
  const goNext = () => {
    const idx = STEPS.indexOf(currentStep);
    if (idx < STEPS.length - 1) {
      setCurrentStep(STEPS[idx + 1]);
    }
  };

  const goBack = () => {
    const idx = STEPS.indexOf(currentStep);
    if (idx > 0) {
      setCurrentStep(STEPS[idx - 1]);
    }
  };

  // Photo capture
  const handlePhotoCapture = (uri: string) => {
    setPhotoUri(uri);
    setShowCamera(false);
    setSnackMessage('Photo captured!');
  };

  // Location capture
  const handleGetLocation = async () => {
    setLocationLoading(true);
    setLocationError('');
    try {
      const loc = await getCurrentLocation();
      setLocation(loc);
      setSnackMessage(
        loc.what3words
          ? `Location: ///${loc.what3words}`
          : 'GPS position acquired'
      );
    } catch (error) {
      setLocationError(
        error instanceof Error ? error.message : 'Failed to get location'
      );
    } finally {
      setLocationLoading(false);
    }
  };

  // OCR
  const handleRunOcr = async () => {
    if (!photoUri) {
      setSnackMessage('Take a photo first');
      return;
    }
    setIsOcrProcessing(true);
    try {
      const result = await recognizeText(photoUri);
      setRawOcrText(result.fullText);
      setEditedInscription(result.fullText);

      // Try to extract person data from inscription
      if (result.fullText) {
        const extractedPersons = extractPersonsFromText(result.fullText);
        if (extractedPersons.length > 0) {
          const persons: PersonRecord[] = extractedPersons.map((p) => ({
            key: Math.random().toString(36).substring(2, 10),
            name: p.name,
            year: p.year,
            age: p.age,
          }));
          setSurveyData((prev) => ({
            ...prev,
            persons: [...(prev.persons || []), ...persons],
          }));
          setSnackMessage(
            `Found ${extractedPersons.length} person(s) in inscription`
          );
        } else {
          setSnackMessage('Inscription transcribed — no persons auto-detected');
        }
      } else {
        setSnackMessage('No text detected in photo');
      }
    } catch (error) {
      Alert.alert(
        'OCR Error',
        error instanceof Error
          ? error.message
          : 'Failed to recognise text. Check your Cloud Vision API key in Settings.'
      );
    } finally {
      setIsOcrProcessing(false);
    }
  };

  // Save
  const handleSave = async (status: 'draft' | 'ready' = 'draft') => {
    setSaving(true);
    try {
      const record: Partial<SurveyRecord> = {
        ...surveyData,
        status,
        headstonePhotoUri: photoUri || undefined,
        additionalPhotoUris:
          additionalPhotos.length > 0 ? additionalPhotos : undefined,
        latitude: location?.latitude,
        longitude: location?.longitude,
        altitude: location?.altitude,
        what3words: location?.what3words,
        rawOcrText: rawOcrText || undefined,
        editedInscription: editedInscription || undefined,
      };

      await createSurvey(record);
      setSnackMessage('Survey saved!');
      router.back();
    } catch (error) {
      Alert.alert(
        'Save Error',
        error instanceof Error ? error.message : 'Failed to save survey'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDirectUpload = async () => {
    setUploading(true);
    try {
      const record: SurveyRecord = {
        id: Math.random().toString(36).substring(2, 10),
        status: 'uploaded',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...surveyData,
        headstonePhotoUri: photoUri || undefined,
        additionalPhotoUris:
          additionalPhotos.length > 0 ? additionalPhotos : undefined,
        latitude: location?.latitude,
        longitude: location?.longitude,
        altitude: location?.altitude,
        what3words: location?.what3words,
        rawOcrText: rawOcrText || undefined,
        editedInscription: editedInscription || undefined,
      };

      const sanityId = await uploadSurvey(record, setUploadProgress);
      
      // Save locally as well
      record.sanityId = sanityId;
      await createSurvey(record);
      
      setSnackMessage('Successfully uploaded to Sanity!');
      router.back();
    } catch (error) {
      Alert.alert(
        'Upload Error',
        error instanceof Error
          ? error.message
          : 'Failed to upload. Check your token.'
      );
    } finally {
      setUploading(false);
      setUploadProgress('');
    }
  };

  // Camera view
  if (showCamera) {
    return (
      <CameraCapture
        onCapture={handlePhotoCapture}
        onCancel={() => setShowCamera(false)}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Progress */}
      <Surface style={styles.progressContainer}>
        <View style={styles.stepRow}>
          {STEPS.map((step, i) => (
            <Text
              key={step}
              variant="labelSmall"
              style={[
                styles.stepLabel,
                i === currentStepIndex && styles.stepLabelActive,
                i < currentStepIndex && styles.stepLabelDone,
              ]}
            >
              {STEP_LABELS[step]}
            </Text>
          ))}
        </View>
        <ProgressBar
          progress={progress}
          color={toftreesTheme.colors.primary}
          style={styles.progressBar}
        />
      </Surface>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* STEP: Photo */}
        {currentStep === 'photo' && (
          <View style={styles.stepContent}>
            <Text variant="headlineSmall" style={styles.stepTitle}>
              Photograph the Headstone
            </Text>

            {photoUri ? (
              <View style={styles.photoContainer}>
                <Image
                  source={{ uri: photoUri }}
                  style={styles.photoPreview}
                  resizeMode="contain"
                />
                <View style={styles.photoActions}>
                  <Button
                    mode="outlined"
                    icon="camera"
                    onPress={() => setShowCamera(true)}
                    style={styles.actionButton}
                  >
                    Retake
                  </Button>
                </View>
              </View>
            ) : (
              <Surface style={styles.photoPlaceholder}>
                <Icon
                  source="camera-plus"
                  size={64}
                  color={toftreesTheme.colors.outlineVariant}
                />
                <Text variant="bodyMedium" style={styles.placeholderText}>
                  Tap to take a photo of the headstone
                </Text>
                <Button
                  mode="contained"
                  icon="camera"
                  onPress={() => setShowCamera(true)}
                  style={styles.captureButton}
                >
                  Open Camera
                </Button>
              </Surface>
            )}
          </View>
        )}

        {/* STEP: Location */}
        {currentStep === 'location' && (
          <View style={styles.stepContent}>
            <Text variant="headlineSmall" style={styles.stepTitle}>
              Record Location
            </Text>
            <Text variant="bodyMedium" style={styles.stepDescription}>
              Capture the GPS coordinates and What3Words address of this grave.
            </Text>

            <LocationDisplay
              location={location}
              loading={locationLoading}
              error={locationError}
            />

            <Button
              mode="contained"
              icon="crosshairs-gps"
              onPress={handleGetLocation}
              loading={locationLoading}
              disabled={locationLoading}
              style={styles.actionButton}
            >
              {location ? 'Update Location' : 'Capture Location'}
            </Button>
          </View>
        )}

        {/* STEP: Inscription */}
        {currentStep === 'inscription' && (
          <View style={styles.stepContent}>
            <Text variant="headlineSmall" style={styles.stepTitle}>
              Transcribe Inscription
            </Text>

            {photoUri && (
              <Image
                source={{ uri: photoUri }}
                style={styles.photoThumb}
                resizeMode="cover"
              />
            )}

            <InscriptionEditor
              rawText={rawOcrText}
              editedText={editedInscription}
              onTextChange={setEditedInscription}
              onRunOcr={handleRunOcr}
              isProcessing={isOcrProcessing}
            />
          </View>
        )}

        {/* STEP: Details */}
        {currentStep === 'details' && (
          <View style={styles.stepContent}>
            <Text variant="headlineSmall" style={styles.stepTitle}>
              Enter Details
            </Text>

            <GraveForm
              survey={surveyData}
              onUpdate={(updates) =>
                setSurveyData((prev) => ({ ...prev, ...updates }))
              }
            />
          </View>
        )}

        {/* STEP: Review */}
        {currentStep === 'review' && (
          <View style={styles.stepContent}>
            <Text variant="headlineSmall" style={styles.stepTitle}>
              Review & Save
            </Text>

            {/* Summary */}
            <Surface style={styles.reviewCard}>
              {photoUri && (
                <Image
                  source={{ uri: photoUri }}
                  style={styles.reviewPhoto}
                  resizeMode="cover"
                />
              )}

              <View style={styles.reviewRow}>
                <Icon source="grave-stone" size={18} color={toftreesTheme.colors.primary} />
                <Text variant="bodyMedium" style={styles.reviewText}>
                  {surveyData.familySurname || 'No surname'}
                  {surveyData.graveNo ? ` (#${surveyData.graveNo})` : ''}
                </Text>
              </View>

              {location && (
                <View style={styles.reviewRow}>
                  <Icon source="map-marker" size={18} color={toftreesTheme.colors.primary} />
                  <Text variant="bodyMedium" style={styles.reviewText}>
                    {location.what3words
                      ? `///${location.what3words}`
                      : `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`}
                  </Text>
                </View>
              )}

              {(rawOcrText || editedInscription) && (
                <View style={styles.reviewRow}>
                  <Icon source="text-recognition" size={18} color={toftreesTheme.colors.primary} />
                  <Text
                    variant="bodyMedium"
                    style={styles.reviewText}
                    numberOfLines={2}
                  >
                    {(editedInscription || rawOcrText).slice(0, 100)}...
                  </Text>
                </View>
              )}

              {(surveyData.persons?.length ?? 0) > 0 && (
                <View style={styles.reviewRow}>
                  <Icon source="account-group" size={18} color={toftreesTheme.colors.primary} />
                  <Text variant="bodyMedium" style={styles.reviewText}>
                    {surveyData.persons?.length} person(s) recorded
                  </Text>
                </View>
              )}
            </Surface>

            <View style={styles.saveActions}>
              <Button
                mode="contained"
                icon="cloud-upload"
                onPress={handleDirectUpload}
                loading={uploading}
                disabled={saving || uploading}
                style={[styles.saveButton, { flex: 2, backgroundColor: toftreesTheme.colors.tertiary }]}
                textColor={toftreesTheme.colors.onTertiary}
              >
                {uploadProgress || 'Upload to Sanity'}
              </Button>
            </View>

            <View style={[styles.saveActions, { marginTop: spacing.sm }]}>
              <Button
                mode="outlined"
                icon="content-save-outline"
                onPress={() => handleSave('draft')}
                loading={saving}
                disabled={saving || uploading}
                style={styles.saveButton}
              >
                Save Draft
              </Button>
              <Button
                mode="contained-tonal"
                icon="check-circle-outline"
                onPress={() => handleSave('ready')}
                loading={saving}
                disabled={saving || uploading}
                style={styles.saveButton}
              >
                Mark Ready
              </Button>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Navigation */}
      <Surface style={[styles.navBar, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
        <Button
          mode="text"
          icon="arrow-left"
          onPress={currentStepIndex === 0 ? () => router.back() : goBack}
          textColor={toftreesTheme.colors.onSurface}
        >
          {currentStepIndex === 0 ? 'Cancel' : 'Back'}
        </Button>

        {currentStep !== 'review' && (
          <Button
            mode="contained"
            icon="arrow-right"
            onPress={goNext}
            contentStyle={{ flexDirection: 'row-reverse' }}
          >
            Next
          </Button>
        )}
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
  progressContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    backgroundColor: toftreesTheme.colors.elevation.level1,
  },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  stepLabel: {
    color: toftreesTheme.colors.outline,
    fontSize: 10,
  },
  stepLabelActive: {
    color: toftreesTheme.colors.primary,
    fontWeight: '700',
  },
  stepLabelDone: {
    color: toftreesTheme.colors.onSurfaceVariant,
  },
  progressBar: {
    height: 3,
    borderRadius: 2,
    backgroundColor: toftreesTheme.colors.surfaceVariant,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  stepContent: {
    gap: spacing.md,
  },
  stepTitle: {
    color: toftreesTheme.colors.onSurface,
    fontWeight: '600',
  },
  stepDescription: {
    color: toftreesTheme.colors.onSurfaceVariant,
  },
  photoContainer: {
    gap: spacing.md,
  },
  photoPreview: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: radii.md,
    backgroundColor: toftreesTheme.colors.elevation.level2,
  },
  photoActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: toftreesTheme.colors.outlineVariant,
    borderStyle: 'dashed',
    backgroundColor: toftreesTheme.colors.elevation.level1,
    gap: spacing.md,
  },
  placeholderText: {
    color: toftreesTheme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  captureButton: {
    marginTop: spacing.sm,
  },
  actionButton: {
    marginTop: spacing.sm,
  },
  photoThumb: {
    width: '100%',
    height: 120,
    borderRadius: radii.sm,
    backgroundColor: toftreesTheme.colors.elevation.level2,
  },
  reviewCard: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: toftreesTheme.colors.elevation.level2,
    gap: spacing.md,
  },
  reviewPhoto: {
    width: '100%',
    height: 200,
    borderRadius: radii.sm,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  reviewText: {
    flex: 1,
    color: toftreesTheme.colors.onSurface,
  },
  saveActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  saveButton: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: toftreesTheme.colors.elevation.level2,
    borderTopWidth: 1,
    borderTopColor: toftreesTheme.colors.outlineVariant,
  },
  snackbar: {
    backgroundColor: toftreesTheme.colors.inverseSurface,
    bottom: 70,
  },
});
