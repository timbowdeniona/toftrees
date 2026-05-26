/**
 * GraveForm Component
 * Full data entry form for grave details.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Card,
  Text,
  TextInput,
  Chip,
  SegmentedButtons,
  Switch,
  Icon,
  Divider,
} from 'react-native-paper';
import { toftreesTheme, spacing } from '../theme';
import { HEADSTONE_CONDITIONS } from '../types';
import type { SurveyRecord, HeadstoneCondition, PersonRecord } from '../types';

interface GraveFormProps {
  survey: Partial<SurveyRecord>;
  onUpdate: (updates: Partial<SurveyRecord>) => void;
}

export function GraveForm({ survey, onUpdate }: GraveFormProps) {
  const addPerson = () => {
    const persons = [...(survey.persons || [])];
    persons.push({
      key: Date.now().toString(),
      name: '',
      year: undefined,
      age: undefined,
    });
    onUpdate({ persons });
  };

  const updatePerson = (index: number, updates: Partial<PersonRecord>) => {
    const persons = [...(survey.persons || [])];
    persons[index] = { ...persons[index], ...updates };
    onUpdate({ persons });
  };

  const removePerson = (index: number) => {
    const persons = [...(survey.persons || [])];
    persons.splice(index, 1);
    onUpdate({ persons });
  };

  return (
    <View style={styles.container}>
      {/* Basic Info */}
      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <View style={styles.header}>
            <Icon source="grave-stone" size={20} color={toftreesTheme.colors.primary} />
            <Text variant="titleSmall" style={styles.headerText}>
              Grave Details
            </Text>
          </View>

          <TextInput
            mode="outlined"
            label="Grave Number"
            value={survey.graveNo?.toString() || ''}
            onChangeText={(v) =>
              onUpdate({ graveNo: v ? parseInt(v, 10) || undefined : undefined })
            }
            keyboardType="numeric"
            style={styles.input}
            outlineColor={toftreesTheme.colors.outlineVariant}
            activeOutlineColor={toftreesTheme.colors.primary}
            textColor={toftreesTheme.colors.onSurface}
            accessibilityLabel="Grave number"
          />

          <TextInput
            mode="outlined"
            label="Family Surname"
            value={survey.familySurname || ''}
            onChangeText={(v) => onUpdate({ familySurname: v })}
            autoCapitalize="characters"
            style={styles.input}
            outlineColor={toftreesTheme.colors.outlineVariant}
            activeOutlineColor={toftreesTheme.colors.primary}
            textColor={toftreesTheme.colors.onSurface}
            accessibilityLabel="Family surname"
          />

          <TextInput
            mode="outlined"
            label="Location Description"
            value={survey.locationDescription || ''}
            onChangeText={(v) => onUpdate({ locationDescription: v })}
            multiline
            numberOfLines={2}
            style={styles.input}
            placeholder="e.g., Corner of West and South Boundaries"
            outlineColor={toftreesTheme.colors.outlineVariant}
            activeOutlineColor={toftreesTheme.colors.primary}
            textColor={toftreesTheme.colors.onSurface}
            accessibilityLabel="Location description"
          />
        </Card.Content>
      </Card>

      {/* Headstone Condition */}
      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <View style={styles.header}>
            <Icon source="shield-check" size={20} color={toftreesTheme.colors.primary} />
            <Text variant="titleSmall" style={styles.headerText}>
              Condition
            </Text>
          </View>

          <View style={styles.conditionGrid}>
            {HEADSTONE_CONDITIONS.map((condition) => (
              <Chip
                key={condition}
                selected={survey.headstoneCondition === condition}
                onPress={() =>
                  onUpdate({ headstoneCondition: condition as HeadstoneCondition })
                }
                style={styles.conditionChip}
                showSelectedOverlay
              >
                {condition}
              </Chip>
            ))}
          </View>

          <Divider style={styles.divider} />

          <View style={styles.switchRow}>
            <Text variant="bodyMedium" style={styles.switchLabel}>
              Has Footstone
            </Text>
            <Switch
              value={survey.footstone || false}
              onValueChange={(v) => onUpdate({ footstone: v })}
              color={toftreesTheme.colors.primary}
            />
          </View>

          {survey.footstone && (
            <TextInput
              mode="outlined"
              label="Footstone Inscription"
              value={survey.footstoneInscription || ''}
              onChangeText={(v) => onUpdate({ footstoneInscription: v })}
              multiline
              numberOfLines={2}
              style={styles.input}
              outlineColor={toftreesTheme.colors.outlineVariant}
              activeOutlineColor={toftreesTheme.colors.primary}
              textColor={toftreesTheme.colors.onSurface}
              accessibilityLabel="Footstone inscription"
            />
          )}

          <Divider style={styles.divider} />

          <Text variant="bodyMedium" style={[styles.switchLabel, { marginBottom: spacing.xs }]}>
            Type of Grave
          </Text>
          <SegmentedButtons
            value={survey.graveType || 'upright'}
            onValueChange={(v) => onUpdate({ graveType: v as 'upright' | 'flat' })}
            buttons={[
              {
                value: 'upright',
                label: 'Upright',
              },
              {
                value: 'flat',
                label: 'Flat',
              },
            ]}
            style={styles.segmentedButton}
          />
        </Card.Content>
      </Card>

      {/* Persons */}
      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <View style={styles.header}>
            <Icon source="account-group" size={20} color={toftreesTheme.colors.primary} />
            <Text variant="titleSmall" style={styles.headerText}>
              Persons Buried
            </Text>
          </View>

          {(survey.persons || []).map((person, index) => (
            <View key={person.key} style={styles.personCard}>
              <View style={styles.personHeader}>
                <Text variant="labelMedium" style={styles.personLabel}>
                  Person {index + 1}
                </Text>
                <Icon
                  source="close"
                  size={18}
                  color={toftreesTheme.colors.error}
                />
              </View>

              <TextInput
                mode="outlined"
                label="Full Name"
                value={person.name || ''}
                onChangeText={(v) => updatePerson(index, { name: v })}
                autoCapitalize="words"
                dense
                style={styles.personInput}
                outlineColor={toftreesTheme.colors.outlineVariant}
                activeOutlineColor={toftreesTheme.colors.primary}
                textColor={toftreesTheme.colors.onSurface}
                accessibilityLabel={`Person ${index + 1} name`}
              />

              <View style={styles.personRow}>
                <TextInput
                  mode="outlined"
                  label="Year of Death"
                  value={person.year?.toString() || ''}
                  onChangeText={(v) =>
                    updatePerson(index, {
                      year: v ? parseInt(v, 10) || undefined : undefined,
                    })
                  }
                  keyboardType="numeric"
                  dense
                  style={[styles.personInput, styles.halfInput]}
                  outlineColor={toftreesTheme.colors.outlineVariant}
                  activeOutlineColor={toftreesTheme.colors.primary}
                  textColor={toftreesTheme.colors.onSurface}
                  accessibilityLabel={`Person ${index + 1} year of death`}
                />
                <TextInput
                  mode="outlined"
                  label="Age"
                  value={person.age?.toString() || ''}
                  onChangeText={(v) =>
                    updatePerson(index, {
                      age: v ? parseInt(v, 10) || undefined : undefined,
                    })
                  }
                  keyboardType="numeric"
                  dense
                  style={[styles.personInput, styles.halfInput]}
                  outlineColor={toftreesTheme.colors.outlineVariant}
                  activeOutlineColor={toftreesTheme.colors.primary}
                  textColor={toftreesTheme.colors.onSurface}
                  accessibilityLabel={`Person ${index + 1} age`}
                />
              </View>

              <TextInput
                mode="outlined"
                label="Date of Burial"
                value={person.dateBurial || ''}
                onChangeText={(v) => updatePerson(index, { dateBurial: v })}
                dense
                style={styles.personInput}
                placeholder="e.g., 1931-12-16"
                outlineColor={toftreesTheme.colors.outlineVariant}
                activeOutlineColor={toftreesTheme.colors.primary}
                textColor={toftreesTheme.colors.onSurface}
                accessibilityLabel={`Person ${index + 1} burial date`}
              />
            </View>
          ))}

          <SegmentedButtons
            value=""
            onValueChange={() => addPerson()}
            buttons={[
              {
                value: 'add',
                label: 'Add Person',
                icon: 'account-plus',
              },
            ]}
            style={styles.addPersonButton}
          />
        </Card.Content>
      </Card>

      {/* Additional Info */}
      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <View style={styles.header}>
            <Icon source="note-text" size={20} color={toftreesTheme.colors.primary} />
            <Text variant="titleSmall" style={styles.headerText}>
              Additional Notes
            </Text>
          </View>

          <TextInput
            mode="outlined"
            label="Additional Information"
            value={survey.additionalInformation || ''}
            onChangeText={(v) => onUpdate({ additionalInformation: v })}
            multiline
            numberOfLines={4}
            style={styles.input}
            outlineColor={toftreesTheme.colors.outlineVariant}
            activeOutlineColor={toftreesTheme.colors.primary}
            textColor={toftreesTheme.colors.onSurface}
            accessibilityLabel="Additional information"
          />
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  card: {
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
  conditionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  conditionChip: {},
  conditionButton: {},
  divider: {
    marginVertical: spacing.md,
    backgroundColor: toftreesTheme.colors.outlineVariant,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  switchLabel: {
    color: toftreesTheme.colors.onSurface,
  },
  personCard: {
    backgroundColor: toftreesTheme.colors.elevation.level2,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  personHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  personLabel: {
    color: toftreesTheme.colors.secondary,
  },
  personInput: {
    marginBottom: spacing.xs,
    backgroundColor: toftreesTheme.colors.elevation.level3,
  },
  personRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  halfInput: {
    flex: 1,
  },
  addPersonButton: {
    marginTop: spacing.sm,
  },
  segmentedButton: {
    marginTop: spacing.xs,
    backgroundColor: toftreesTheme.colors.elevation.level2,
  },
});
