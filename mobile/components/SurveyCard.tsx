/**
 * SurveyCard Component
 * Card display for a survey record in the list view.
 */
import React from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { Card, Text, Chip, Icon } from 'react-native-paper';
import { toftreesTheme, spacing, radii } from '../theme';
import type { SurveyRecord } from '../types';

interface SurveyCardProps {
  survey: SurveyRecord;
  onPress: (id: string) => void;
  onLongPress?: (id: string) => void;
}

const statusConfig = {
  draft: {
    label: 'Draft',
    icon: 'pencil-outline' as const,
    color: toftreesTheme.colors.secondary,
    bg: toftreesTheme.colors.secondaryContainer,
  },
  ready: {
    label: 'Ready',
    icon: 'check-circle-outline' as const,
    color: toftreesTheme.colors.primary,
    bg: toftreesTheme.colors.primaryContainer,
  },
  uploaded: {
    label: 'Uploaded',
    icon: 'cloud-check' as const,
    color: toftreesTheme.colors.tertiary,
    bg: toftreesTheme.colors.tertiaryContainer,
  },
};

export function SurveyCard({ survey, onPress, onLongPress }: SurveyCardProps) {
  const status = statusConfig[survey.status];
  const personCount = survey.persons?.length || 0;
  const hasPhoto = Boolean(survey.headstonePhotoUri);
  const hasLocation = Boolean(survey.latitude);
  const hasInscription = Boolean(survey.rawOcrText || survey.editedInscription);

  const displayName = survey.familySurname
    ? `${survey.familySurname}${survey.graveNo ? ` (#${survey.graveNo})` : ''}`
    : survey.graveNo
    ? `Grave #${survey.graveNo}`
    : 'Unnamed Survey';

  const timeAgo = getRelativeTime(survey.updatedAt);

  return (
    <Pressable
      onPress={() => onPress(survey.id)}
      onLongPress={() => onLongPress?.(survey.id)}
      accessibilityLabel={`Survey ${displayName}, status ${status.label}`}
      accessibilityRole="button"
    >
      <Card style={styles.card} mode="elevated">
        <View style={styles.content}>
          {/* Thumbnail */}
          {hasPhoto ? (
            <Image
              source={{ uri: survey.headstonePhotoUri }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.thumbnailPlaceholder}>
              <Icon
                source="image-off-outline"
                size={28}
                color={toftreesTheme.colors.outlineVariant}
              />
            </View>
          )}

          {/* Info */}
          <View style={styles.info}>
            <View style={styles.topRow}>
              <Text
                variant="titleMedium"
                style={styles.name}
                numberOfLines={1}
              >
                {displayName}
              </Text>
              <Chip
                compact
                textStyle={[styles.chipText, { color: status.color }]}
                style={[styles.statusChip, { backgroundColor: status.bg }]}
                icon={status.icon}
              >
                {status.label}
              </Chip>
            </View>

            {/* Feature indicators */}
            <View style={styles.indicators}>
              {hasLocation && (
                <View style={styles.indicator}>
                  <Icon
                    source="map-marker"
                    size={14}
                    color={toftreesTheme.colors.primary}
                  />
                  {survey.what3words && (
                    <Text variant="labelSmall" style={styles.indicatorText}>
                      ///{survey.what3words}
                    </Text>
                  )}
                </View>
              )}
              {hasInscription && (
                <View style={styles.indicator}>
                  <Icon
                    source="text-recognition"
                    size={14}
                    color={toftreesTheme.colors.secondary}
                  />
                  <Text variant="labelSmall" style={styles.indicatorText}>
                    OCR
                  </Text>
                </View>
              )}
              {personCount > 0 && (
                <View style={styles.indicator}>
                  <Icon
                    source="account"
                    size={14}
                    color={toftreesTheme.colors.tertiary}
                  />
                  <Text variant="labelSmall" style={styles.indicatorText}>
                    {personCount}
                  </Text>
                </View>
              )}
            </View>

            <Text variant="bodySmall" style={styles.timestamp}>
              {timeAgo}
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

function getRelativeTime(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(isoString).toLocaleDateString();
}

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.xs,
    backgroundColor: toftreesTheme.colors.elevation.level2,
  },
  content: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: radii.sm,
    backgroundColor: toftreesTheme.colors.elevation.level3,
  },
  thumbnailPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: radii.sm,
    backgroundColor: toftreesTheme.colors.elevation.level3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  name: {
    flex: 1,
    color: toftreesTheme.colors.onSurface,
    fontWeight: '600',
  },
  statusChip: {
    height: 24,
  },
  chipText: {
    fontSize: 10,
    lineHeight: 14,
  },
  indicators: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  indicatorText: {
    color: toftreesTheme.colors.onSurfaceVariant,
    fontSize: 11,
  },
  timestamp: {
    color: toftreesTheme.colors.outline,
    marginTop: spacing.xs,
  },
});
