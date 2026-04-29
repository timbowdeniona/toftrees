/**
 * Home Screen
 * Lists all survey records with status filtering and FAB for new surveys.
 */
import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  FAB,
  Text,
  Chip,
  Icon,
  Searchbar,
  IconButton,
  Snackbar,
  Surface,
} from 'react-native-paper';
import { useRouter, useFocusEffect } from 'expo-router';
import { toftreesTheme, spacing, radii } from '../theme';
import { SurveyCard } from '../components/SurveyCard';
import { getAllSurveys, deleteSurvey } from '../services/storage';
import type { SurveyRecord, SurveyStatus } from '../types';

type FilterStatus = 'all' | SurveyStatus;

export default function HomeScreen() {
  const router = useRouter();
  const [surveys, setSurveys] = useState<SurveyRecord[]>([]);
  const [filteredSurveys, setFilteredSurveys] = useState<SurveyRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [snackMessage, setSnackMessage] = useState('');

  const loadSurveys = useCallback(async () => {
    try {
      const data = await getAllSurveys();
      setSurveys(data);
      applyFilters(data, filter, searchQuery);
    } catch (error) {
      console.error('Failed to load surveys:', error);
    }
  }, [filter, searchQuery]);

  useFocusEffect(
    useCallback(() => {
      loadSurveys();
    }, [loadSurveys])
  );

  const applyFilters = (
    data: SurveyRecord[],
    status: FilterStatus,
    query: string
  ) => {
    let result = data;
    if (status !== 'all') {
      result = result.filter((s) => s.status === status);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (s) =>
          s.familySurname?.toLowerCase().includes(q) ||
          s.graveNo?.toString().includes(q) ||
          s.what3words?.toLowerCase().includes(q)
      );
    }
    setFilteredSurveys(result);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadSurveys();
    setRefreshing(false);
  };

  const handleFilterChange = (newFilter: FilterStatus) => {
    setFilter(newFilter);
    applyFilters(surveys, newFilter, searchQuery);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(surveys, filter, query);
  };

  const handleDelete = (id: string) => {
    const survey = surveys.find((s) => s.id === id);
    const name = survey?.familySurname || `Grave #${survey?.graveNo || '?'}`;

    Alert.alert(
      'Delete Survey',
      `Delete "${name}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteSurvey(id);
            setSnackMessage(`Deleted "${name}"`);
            await loadSurveys();
          },
        },
      ]
    );
  };

  const statusCounts = {
    all: surveys.length,
    draft: surveys.filter((s) => s.status === 'draft').length,
    ready: surveys.filter((s) => s.status === 'ready').length,
    uploaded: surveys.filter((s) => s.status === 'uploaded').length,
  };

  return (
    <View style={styles.container}>
      {/* Search */}
      <Searchbar
        placeholder="Search surveys..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchbar}
        inputStyle={styles.searchInput}
        iconColor={toftreesTheme.colors.onSurfaceVariant}
        placeholderTextColor={toftreesTheme.colors.outline}
        right={() => (
          <IconButton
            icon="cog"
            size={20}
            onPress={() => router.push('/settings')}
            accessibilityLabel="Settings"
          />
        )}
      />

      {/* Filters */}
      <View style={styles.filterRow}>
        {(
          [
            { key: 'all', label: 'All', icon: 'format-list-bulleted' },
            { key: 'draft', label: 'Draft', icon: 'pencil-outline' },
            { key: 'ready', label: 'Ready', icon: 'check-circle-outline' },
            { key: 'uploaded', label: 'Uploaded', icon: 'cloud-check' },
          ] as const
        ).map(({ key, label, icon }) => (
          <Chip
            key={key}
            selected={filter === key}
            onPress={() => handleFilterChange(key)}
            icon={icon}
            compact
            style={[
              styles.filterChip,
              filter === key && styles.filterChipActive,
            ]}
            textStyle={[
              styles.filterChipText,
              filter === key && styles.filterChipTextActive,
            ]}
          >
            {label} ({statusCounts[key]})
          </Chip>
        ))}
      </View>

      {/* Survey List */}
      <FlatList
        data={filteredSurveys}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SurveyCard
            survey={item}
            onPress={(id) => router.push(`/survey/${id}`)}
            onLongPress={handleDelete}
          />
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={toftreesTheme.colors.primary}
          />
        }
        ListEmptyComponent={() => (
          <Surface style={styles.emptyContainer}>
            <Icon
              source="grave-stone"
              size={64}
              color={toftreesTheme.colors.outlineVariant}
            />
            <Text variant="titleMedium" style={styles.emptyTitle}>
              No Surveys Yet
            </Text>
            <Text variant="bodyMedium" style={styles.emptyText}>
              Tap the + button to start surveying graves in the churchyard
            </Text>
          </Surface>
        )}
      />

      {/* FAB */}
      <FAB
        icon="plus"
        label="New Survey"
        onPress={() => router.push('/survey/new')}
        style={styles.fab}
        color={toftreesTheme.colors.onPrimary}
        customSize={56}
        accessibilityLabel="Start new survey"
      />

      {/* Snackbar */}
      <Snackbar
        visible={Boolean(snackMessage)}
        onDismiss={() => setSnackMessage('')}
        duration={3000}
        style={styles.snackbar}
      >
        {snackMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: toftreesTheme.colors.background,
  },
  searchbar: {
    margin: spacing.md,
    backgroundColor: toftreesTheme.colors.elevation.level2,
    borderRadius: radii.lg,
  },
  searchInput: {
    color: toftreesTheme.colors.onSurface,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  filterChip: {
    backgroundColor: toftreesTheme.colors.elevation.level1,
  },
  filterChipActive: {
    backgroundColor: toftreesTheme.colors.primaryContainer,
  },
  filterChipText: {
    fontSize: 11,
    color: toftreesTheme.colors.onSurfaceVariant,
  },
  filterChipTextActive: {
    color: toftreesTheme.colors.onPrimaryContainer,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl * 2,
    gap: spacing.md,
    backgroundColor: 'transparent',
  },
  emptyTitle: {
    color: toftreesTheme.colors.onSurfaceVariant,
  },
  emptyText: {
    color: toftreesTheme.colors.outline,
    textAlign: 'center',
    maxWidth: 280,
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.xl,
    backgroundColor: toftreesTheme.colors.primary,
    borderRadius: radii.lg,
  },
  snackbar: {
    backgroundColor: toftreesTheme.colors.inverseSurface,
  },
});
