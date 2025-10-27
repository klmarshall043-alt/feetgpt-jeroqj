
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, Image } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

type LearnSection = 'symptom' | 'routine' | 'facts';

export default function LearnScreen() {
  const [activeSection, setActiveSection] = useState<LearnSection>('symptom');

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Learn",
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Logo */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('@/assets/images/79afa96e-51b5-4b68-bf0b-5916da7e5df1.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.headerTitle}>Foot Health Education</Text>
            <Text style={styles.headerSubtitle}>
              Learn about foot care, health, and wellness
            </Text>
          </View>

          {/* Section Selector */}
          <View style={styles.sectionSelector}>
            <Pressable
              style={[
                styles.sectionButton,
                activeSection === 'symptom' && styles.sectionButtonActive,
              ]}
              onPress={() => setActiveSection('symptom')}
            >
              <IconSymbol
                name="stethoscope"
                size={20}
                color={activeSection === 'symptom' ? colors.primary : colors.textSecondary}
              />
              <Text
                style={[
                  styles.sectionButtonText,
                  activeSection === 'symptom' && styles.sectionButtonTextActive,
                ]}
              >
                Symptom Checker
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.sectionButton,
                activeSection === 'routine' && styles.sectionButtonActive,
              ]}
              onPress={() => setActiveSection('routine')}
            >
              <IconSymbol
                name="calendar"
                size={20}
                color={activeSection === 'routine' ? colors.primary : colors.textSecondary}
              />
              <Text
                style={[
                  styles.sectionButtonText,
                  activeSection === 'routine' && styles.sectionButtonTextActive,
                ]}
              >
                Care Routine
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.sectionButton,
                activeSection === 'facts' && styles.sectionButtonActive,
              ]}
              onPress={() => setActiveSection('facts')}
            >
              <IconSymbol
                name="lightbulb.fill"
                size={20}
                color={activeSection === 'facts' ? colors.primary : colors.textSecondary}
              />
              <Text
                style={[
                  styles.sectionButtonText,
                  activeSection === 'facts' && styles.sectionButtonTextActive,
                ]}
              >
                Feet Facts
              </Text>
            </Pressable>
          </View>

          {/* Content Sections */}
          {activeSection === 'symptom' && <SymptomChecker />}
          {activeSection === 'routine' && <CareRoutineBuilder />}
          {activeSection === 'facts' && <FeetFactsLibrary />}

          {/* Bottom Spacer */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </>
  );
}

function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const symptoms = [
    { id: '1', name: 'Dry Skin', icon: 'drop.fill', resource: 'Moisturize daily' },
    { id: '2', name: 'Calluses', icon: 'bandage.fill', resource: 'Use pumice stone' },
    { id: '3', name: 'Fungal Infection', icon: 'cross.case.fill', resource: 'See a podiatrist' },
    { id: '4', name: 'Cracked Heels', icon: 'exclamationmark.triangle.fill', resource: 'Deep moisturizing treatment' },
    { id: '5', name: 'Odor', icon: 'wind', resource: 'Improve hygiene routine' },
    { id: '6', name: 'Pain', icon: 'heart.text.square.fill', resource: 'Consult healthcare provider' },
  ];

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Symptom Checker</Text>
      <Text style={styles.sectionDescription}>
        Select any symptoms you&apos;re experiencing to get helpful resources and guidance.
      </Text>

      <View style={styles.symptomGrid}>
        {symptoms.map((symptom) => (
          <Pressable
            key={symptom.id}
            style={[
              styles.symptomCard,
              selectedSymptoms.includes(symptom.id) && styles.symptomCardSelected,
            ]}
            onPress={() => toggleSymptom(symptom.id)}
          >
            <IconSymbol
              name={symptom.icon as any}
              size={32}
              color={
                selectedSymptoms.includes(symptom.id)
                  ? colors.primary
                  : colors.textSecondary
              }
            />
            <Text
              style={[
                styles.symptomName,
                selectedSymptoms.includes(symptom.id) && styles.symptomNameSelected,
              ]}
            >
              {symptom.name}
            </Text>
            {selectedSymptoms.includes(symptom.id) && (
              <Text style={styles.symptomResource}>{symptom.resource}</Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function CareRoutineBuilder() {
  const [selectedRoutines, setSelectedRoutines] = useState<string[]>([]);

  const routines = [
    { id: '1', name: 'Daily Wash', frequency: 'Daily', icon: 'drop.fill' },
    { id: '2', name: 'Moisturize', frequency: 'Daily', icon: 'sparkles' },
    { id: '3', name: 'Trim Nails', frequency: 'Weekly', icon: 'scissors' },
    { id: '4', name: 'Exfoliate', frequency: 'Weekly', icon: 'wand.and.stars' },
    { id: '5', name: 'Foot Soak', frequency: 'Weekly', icon: 'water.waves' },
    { id: '6', name: 'Stretch', frequency: 'Daily', icon: 'figure.flexibility' },
  ];

  const toggleRoutine = (id: string) => {
    setSelectedRoutines((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Care Routine Builder</Text>
      <Text style={styles.sectionDescription}>
        Build your personalized foot care routine by selecting activities.
      </Text>

      <View style={styles.routineList}>
        {routines.map((routine) => (
          <Pressable
            key={routine.id}
            style={[
              styles.routineCard,
              selectedRoutines.includes(routine.id) && styles.routineCardSelected,
            ]}
            onPress={() => toggleRoutine(routine.id)}
          >
            <View style={styles.routineIcon}>
              <IconSymbol
                name={routine.icon as any}
                size={28}
                color={
                  selectedRoutines.includes(routine.id)
                    ? colors.primary
                    : colors.textSecondary
                }
              />
            </View>
            <View style={styles.routineInfo}>
              <Text
                style={[
                  styles.routineName,
                  selectedRoutines.includes(routine.id) && styles.routineNameSelected,
                ]}
              >
                {routine.name}
              </Text>
              <Text style={styles.routineFrequency}>{routine.frequency}</Text>
            </View>
            <View
              style={[
                styles.routineCheckbox,
                selectedRoutines.includes(routine.id) && styles.routineCheckboxSelected,
              ]}
            >
              {selectedRoutines.includes(routine.id) && (
                <IconSymbol name="checkmark" size={16} color={colors.primary} />
              )}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function FeetFactsLibrary() {
  const facts = [
    {
      id: '1',
      title: 'Complex Structure',
      fact: 'The human foot has 26 bones, 33 joints, and over 100 muscles, tendons, and ligaments.',
      icon: 'figure.walk',
    },
    {
      id: '2',
      title: 'Weight Bearing',
      fact: 'Your feet support the entire weight of your body and absorb 2-3 times your body weight when running.',
      icon: 'figure.run',
    },
    {
      id: '3',
      title: 'Sweat Glands',
      fact: 'Each foot has about 250,000 sweat glands, producing up to half a pint of perspiration daily.',
      icon: 'drop.fill',
    },
    {
      id: '4',
      title: 'Steps Per Day',
      fact: 'The average person takes 8,000-10,000 steps per day, which adds up to about 115,000 miles in a lifetime.',
      icon: 'figure.walk.circle',
    },
    {
      id: '5',
      title: 'Balance & Posture',
      fact: 'Your feet play a crucial role in maintaining balance and proper posture throughout your entire body.',
      icon: 'figure.stand',
    },
    {
      id: '6',
      title: 'Nerve Endings',
      fact: 'Feet contain thousands of nerve endings, making them highly sensitive to touch, pressure, and temperature.',
      icon: 'brain.head.profile',
    },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Feet Facts Library</Text>
      <Text style={styles.sectionDescription}>
        Discover fascinating facts about your feet and their incredible capabilities.
      </Text>

      <View style={styles.factsList}>
        {facts.map((fact) => (
          <View key={fact.id} style={styles.factCard}>
            <View style={styles.factIconContainer}>
              <IconSymbol name={fact.icon as any} size={32} color={colors.primary} />
            </View>
            <View style={styles.factContent}>
              <Text style={styles.factTitle}>{fact.title}</Text>
              <Text style={styles.factText}>{fact.fact}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 20,
    backgroundColor: colors.card,
    borderRadius: 20,
    boxShadow: '0px 4px 12px rgba(141, 110, 99, 0.15)',
    elevation: 3,
  },
  logoContainer: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  sectionSelector: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  sectionButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 4,
  },
  sectionButtonActive: {
    backgroundColor: colors.primary + '20',
  },
  sectionButtonText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionButtonTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  symptomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  symptomCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  symptomCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  symptomName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  symptomNameSelected: {
    color: colors.primary,
  },
  symptomResource: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  routineList: {
    gap: 12,
  },
  routineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  routineCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  routineIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routineInfo: {
    flex: 1,
  },
  routineName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  routineNameSelected: {
    color: colors.primary,
  },
  routineFrequency: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  routineCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routineCheckboxSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },
  factsList: {
    gap: 12,
  },
  factCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  factIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  factContent: {
    flex: 1,
  },
  factTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  factText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 40,
  },
});
