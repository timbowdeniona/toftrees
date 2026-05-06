/**
 * Settings Screen
 * Configure API keys and Sanity connection.
 */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert, Linking } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Icon,
  Divider,
  Snackbar,
  Chip,
} from 'react-native-paper';
import { toftreesTheme, spacing, radii } from '../theme';
import { getSettings, saveSettings, validateSettings } from '../services/settings';
import { testConnection } from '../services/sanity';
import type { AppSettings } from '../types';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<AppSettings>({
    cloudVisionApiKey: '',
    what3wordsApiKey: '',
    sanityProjectId: '',
    sanityDataset: '',
    sanityToken: '',
  });
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [validation, setValidation] = useState<{
    valid: boolean;
    missing: string[];
  }>({ valid: false, missing: [] });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const s = await getSettings();
    setSettings(s);
    const v = await validateSettings();
    setValidation(v);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSettings(settings);
      const v = await validateSettings();
      setValidation(v);
      setSnackMessage('Settings saved!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setTesting(true);
    try {
      // Save first so the test uses current values
      await saveSettings(settings);
      const ok = await testConnection();
      if (ok) {
        setSnackMessage('✅ Connected to Sanity successfully!');
      } else {
        setSnackMessage('❌ Connection failed. Check your token and project ID.');
      }
    } catch (error) {
      setSnackMessage('❌ Connection error');
    } finally {
      setTesting(false);
    }
  };

  const openUrl = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Validation status */}
      {!validation.valid && (
        <Card style={styles.warningCard} mode="outlined">
          <Card.Content style={styles.warningContent}>
            <Icon
              source="alert-circle"
              size={24}
              color={toftreesTheme.colors.error}
            />
            <View style={styles.warningTextContainer}>
              <Text variant="titleSmall" style={styles.warningTitle}>
                Configuration Incomplete
              </Text>
              <Text variant="bodySmall" style={styles.warningText}>
                Missing: {validation.missing.join(', ')}
              </Text>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Google Cloud Vision */}
      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <View style={styles.header}>
            <Icon source="eye" size={20} color={toftreesTheme.colors.primary} />
            <Text variant="titleSmall" style={styles.headerText}>
              Google Cloud Vision
            </Text>
            <Button
              mode="text"
              compact
              onPress={() =>
                openUrl('https://console.cloud.google.com/apis/credentials')
              }
            >
              Get Key
            </Button>
          </View>

          <TextInput
            mode="outlined"
            label="Cloud Vision API Key"
            value={settings.cloudVisionApiKey}
            onChangeText={(v) =>
              setSettings((s) => ({ ...s, cloudVisionApiKey: v }))
            }
            secureTextEntry
            style={styles.input}
            outlineColor={toftreesTheme.colors.outlineVariant}
            activeOutlineColor={toftreesTheme.colors.primary}
            textColor={toftreesTheme.colors.onSurface}
            accessibilityLabel="Cloud Vision API key"
          />

          <Text variant="bodySmall" style={styles.helpText}>
            Used for headstone inscription OCR. Enable the Cloud Vision API in
            your GCP project.
          </Text>
        </Card.Content>
      </Card>

      {/* What3Words */}
      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <View style={styles.header}>
            <Icon
              source="map-marker-radius"
              size={20}
              color={toftreesTheme.colors.primary}
            />
            <Text variant="titleSmall" style={styles.headerText}>
              What3Words
            </Text>
            <Button
              mode="text"
              compact
              onPress={() => openUrl('https://developer.what3words.com')}
            >
              Get Key
            </Button>
          </View>

          <TextInput
            mode="outlined"
            label="What3Words API Key"
            value={settings.what3wordsApiKey}
            onChangeText={(v) =>
              setSettings((s) => ({ ...s, what3wordsApiKey: v }))
            }
            style={styles.input}
            outlineColor={toftreesTheme.colors.outlineVariant}
            activeOutlineColor={toftreesTheme.colors.primary}
            textColor={toftreesTheme.colors.onSurface}
            accessibilityLabel="What3Words API key"
          />

          <Text variant="bodySmall" style={styles.helpText}>
            Converts GPS coordinates to human-friendly 3-word addresses.
          </Text>
        </Card.Content>
      </Card>

      {/* Sanity */}
      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <View style={styles.header}>
            <Icon
              source="database"
              size={20}
              color={toftreesTheme.colors.primary}
            />
            <Text variant="titleSmall" style={styles.headerText}>
              Sanity CMS
            </Text>
            <Button
              mode="text"
              compact
              onPress={() => openUrl('https://www.sanity.io/manage')}
            >
              Dashboard
            </Button>
          </View>

          <TextInput
            mode="outlined"
            label="Project ID"
            value={settings.sanityProjectId}
            onChangeText={(v) =>
              setSettings((s) => ({ ...s, sanityProjectId: v }))
            }
            style={styles.input}
            outlineColor={toftreesTheme.colors.outlineVariant}
            activeOutlineColor={toftreesTheme.colors.primary}
            textColor={toftreesTheme.colors.onSurface}
            accessibilityLabel="Sanity project ID"
          />

          <TextInput
            mode="outlined"
            label="Dataset"
            value={settings.sanityDataset}
            onChangeText={(v) =>
              setSettings((s) => ({ ...s, sanityDataset: v }))
            }
            style={styles.input}
            outlineColor={toftreesTheme.colors.outlineVariant}
            activeOutlineColor={toftreesTheme.colors.primary}
            textColor={toftreesTheme.colors.onSurface}
            accessibilityLabel="Sanity dataset"
          />

          <TextInput
            mode="outlined"
            label="Write Token"
            value={settings.sanityToken}
            onChangeText={(v) =>
              setSettings((s) => ({ ...s, sanityToken: v }))
            }
            secureTextEntry
            style={styles.input}
            outlineColor={toftreesTheme.colors.outlineVariant}
            activeOutlineColor={toftreesTheme.colors.primary}
            textColor={toftreesTheme.colors.onSurface}
            accessibilityLabel="Sanity write token"
          />

          <Text variant="bodySmall" style={styles.helpText}>
            Create a write-enabled token in Sanity Dashboard → Project → API →
            Tokens.
          </Text>

          <Button
            mode="contained-tonal"
            icon="connection"
            onPress={handleTestConnection}
            loading={testing}
            disabled={testing}
            style={styles.testButton}
          >
            Test Connection
          </Button>
        </Card.Content>
      </Card>

      {/* Save */}
      <Button
        mode="contained"
        icon="content-save"
        onPress={handleSave}
        loading={saving}
        disabled={saving}
        style={styles.saveButton}
      >
        Save Settings
      </Button>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text variant="labelSmall" style={styles.appInfoText}>
          Toftrees Churchyard Surveyor v1.0.0
        </Text>
        <Text variant="labelSmall" style={styles.appInfoText}>
          Sanity Project: {settings.sanityProjectId || '—'}
        </Text>
      </View>

      <Snackbar
        visible={Boolean(snackMessage)}
        onDismiss={() => setSnackMessage('')}
        duration={3000}
      >
        {snackMessage}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: toftreesTheme.colors.background,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  warningCard: {
    marginBottom: spacing.md,
    borderColor: toftreesTheme.colors.error,
    backgroundColor: toftreesTheme.colors.errorContainer + '22',
  },
  warningContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  warningTextContainer: {
    flex: 1,
  },
  warningTitle: {
    color: toftreesTheme.colors.error,
  },
  warningText: {
    color: toftreesTheme.colors.onErrorContainer,
    marginTop: 2,
  },
  card: {
    marginBottom: spacing.md,
    backgroundColor: toftreesTheme.colors.elevation.level1,
    borderColor: toftreesTheme.colors.outlineVariant,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  headerText: {
    flex: 1,
    color: toftreesTheme.colors.primary,
  },
  input: {
    marginBottom: spacing.sm,
    backgroundColor: toftreesTheme.colors.elevation.level2,
  },
  helpText: {
    color: toftreesTheme.colors.outline,
    marginTop: spacing.xs,
    lineHeight: 18,
  },
  testButton: {
    marginTop: spacing.md,
  },
  saveButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  appInfo: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xl,
  },
  appInfoText: {
    color: toftreesTheme.colors.outline,
  },
});
