/**
 * InscriptionEditor Component
 * Displays OCR results with an editable text area for corrections.
 */
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Card,
  Text,
  TextInput,
  Button,
  Icon,
  SegmentedButtons,
  ActivityIndicator,
} from 'react-native-paper';
import { toftreesTheme, spacing, radii } from '../theme';

interface InscriptionEditorProps {
  rawText: string;
  editedText: string;
  onTextChange: (text: string) => void;
  onRunOcr?: () => void;
  isProcessing?: boolean;
}

export function InscriptionEditor({
  rawText,
  editedText,
  onTextChange,
  onRunOcr,
  isProcessing,
}: InscriptionEditorProps) {
  const [viewMode, setViewMode] = useState<string>('edit');

  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <View style={styles.header}>
          <Icon source="text-recognition" size={20} color={toftreesTheme.colors.primary} />
          <Text variant="titleSmall" style={styles.headerText}>
            Inscription
          </Text>
          {onRunOcr && (
            <Button
              mode="outlined"
              compact
              onPress={onRunOcr}
              disabled={isProcessing}
              icon={isProcessing ? undefined : 'eye-outline'}
              loading={isProcessing}
              style={styles.ocrButton}
            >
              {isProcessing ? 'Reading...' : 'Run OCR'}
            </Button>
          )}
        </View>

        {isProcessing && (
          <View style={styles.processingContainer}>
            <ActivityIndicator
              size="large"
              color={toftreesTheme.colors.primary}
            />
            <Text variant="bodyMedium" style={styles.processingText}>
              Analysing headstone inscription...
            </Text>
          </View>
        )}

        {!isProcessing && (rawText || editedText) && (
          <>
            <SegmentedButtons
              value={viewMode}
              onValueChange={setViewMode}
              style={styles.segmented}
              buttons={[
                {
                  value: 'edit',
                  label: 'Edit',
                  icon: 'pencil',
                },
                {
                  value: 'raw',
                  label: 'OCR Raw',
                  icon: 'text-box-outline',
                },
              ]}
            />

            {viewMode === 'edit' ? (
              <TextInput
                mode="outlined"
                multiline
                numberOfLines={8}
                value={editedText || rawText}
                onChangeText={onTextChange}
                style={styles.textInput}
                placeholder="Edit inscription text..."
                outlineColor={toftreesTheme.colors.outlineVariant}
                activeOutlineColor={toftreesTheme.colors.primary}
                textColor={toftreesTheme.colors.onSurface}
                placeholderTextColor={toftreesTheme.colors.onSurfaceVariant}
                accessibilityLabel="Inscription text editor"
              />
            ) : (
              <ScrollView style={styles.rawTextContainer}>
                <Text
                  variant="bodyMedium"
                  style={styles.rawText}
                  selectable
                >
                  {rawText || 'No OCR text detected'}
                </Text>
              </ScrollView>
            )}
          </>
        )}

        {!isProcessing && !rawText && !editedText && (
          <View style={styles.emptyContainer}>
            <Icon
              source="text-box-remove-outline"
              size={48}
              color={toftreesTheme.colors.outlineVariant}
            />
            <Text variant="bodyMedium" style={styles.emptyText}>
              Take a photo of the headstone and run OCR to extract the inscription
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.sm,
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
  ocrButton: {
    borderColor: toftreesTheme.colors.primary,
  },
  segmented: {
    marginBottom: spacing.md,
  },
  textInput: {
    backgroundColor: toftreesTheme.colors.elevation.level2,
    minHeight: 160,
    fontSize: 15,
  },
  rawTextContainer: {
    maxHeight: 200,
    backgroundColor: toftreesTheme.colors.elevation.level2,
    borderRadius: radii.sm,
    padding: spacing.md,
  },
  rawText: {
    fontFamily: 'monospace',
    color: toftreesTheme.colors.onSurfaceVariant,
    lineHeight: 22,
  },
  processingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.md,
  },
  processingText: {
    color: toftreesTheme.colors.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.md,
  },
  emptyText: {
    color: toftreesTheme.colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 250,
  },
});
