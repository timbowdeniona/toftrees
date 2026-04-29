/**
 * LocationDisplay Component
 * Shows GPS coordinates, What3Words address, and accuracy information.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Icon, Chip } from 'react-native-paper';
import { toftreesTheme, spacing, radii } from '../theme';
import { formatCoordinates } from '../services/location';
import type { LocationResult } from '../types';

interface LocationDisplayProps {
  location: LocationResult | null;
  loading?: boolean;
  error?: string;
  onRefresh?: () => void;
}

export function LocationDisplay({
  location,
  loading,
  error,
  onRefresh,
}: LocationDisplayProps) {
  if (loading) {
    return (
      <Card style={styles.card} mode="outlined">
        <Card.Content style={styles.content}>
          <Icon source="crosshairs-gps" size={24} color={toftreesTheme.colors.primary} />
          <Text variant="bodyMedium" style={styles.loadingText}>
            Acquiring GPS position...
          </Text>
        </Card.Content>
      </Card>
    );
  }

  if (error) {
    return (
      <Card style={styles.card} mode="outlined">
        <Card.Content style={styles.content}>
          <Icon source="alert-circle" size={24} color={toftreesTheme.colors.error} />
          <Text variant="bodyMedium" style={styles.errorText}>{error}</Text>
        </Card.Content>
      </Card>
    );
  }

  if (!location) {
    return (
      <Card style={styles.card} mode="outlined">
        <Card.Content style={styles.content}>
          <Icon source="map-marker-off" size={24} color={toftreesTheme.colors.onSurfaceVariant} />
          <Text variant="bodyMedium" style={styles.placeholderText}>
            No location captured yet
          </Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <View style={styles.header}>
          <Icon source="map-marker" size={20} color={toftreesTheme.colors.primary} />
          <Text variant="titleSmall" style={styles.headerText}>Location</Text>
          {location.accuracy && (
            <Chip
              compact
              textStyle={styles.chipText}
              style={styles.accuracyChip}
              icon="target"
            >
              ±{location.accuracy.toFixed(0)}m
            </Chip>
          )}
        </View>

        <View style={styles.row}>
          <Text variant="labelSmall" style={styles.label}>GPS</Text>
          <Text variant="bodyMedium" style={styles.value}>
            {formatCoordinates(location.latitude, location.longitude)}
          </Text>
        </View>

        {location.altitude != null && (
          <View style={styles.row}>
            <Text variant="labelSmall" style={styles.label}>Altitude</Text>
            <Text variant="bodyMedium" style={styles.value}>
              {location.altitude.toFixed(1)}m
            </Text>
          </View>
        )}

        {location.what3words && (
          <View style={styles.row}>
            <Text variant="labelSmall" style={styles.label}>W3W</Text>
            <Text variant="bodyMedium" style={styles.w3wValue}>
              ///{location.what3words}
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
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
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
    paddingLeft: spacing.lg + spacing.sm,
  },
  label: {
    width: 60,
    color: toftreesTheme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  value: {
    flex: 1,
    fontFamily: 'monospace',
    color: toftreesTheme.colors.onSurface,
  },
  w3wValue: {
    flex: 1,
    color: toftreesTheme.colors.tertiary,
    fontWeight: '600',
  },
  accuracyChip: {
    backgroundColor: toftreesTheme.colors.elevation.level3,
    height: 28,
  },
  chipText: {
    fontSize: 11,
  },
  loadingText: {
    color: toftreesTheme.colors.primary,
  },
  errorText: {
    color: toftreesTheme.colors.error,
  },
  placeholderText: {
    color: toftreesTheme.colors.onSurfaceVariant,
  },
});
