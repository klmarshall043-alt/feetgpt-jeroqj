
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

type LearnSection = 'symptom' | 'routine' | 'facts';

export default function LearnScreen() {
  const [activeSection, setActiveSection] = useState<LearnSection>('facts');

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Learn',
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
          {/* Header */}
          <View style={styles.header}>
            <IconSymbol name="book.fill" size={48} color={colors.primary} />
            <Text style={styles.headerTitle}>Foot Health Hub</Text>
            <Text style={styles.headerSubtitle}>
              Knowledge and care for healthier feet
            </Text>
          </View>

          {/* Section Selector */}
          <View style={styles.sectionSelector}>
            <Pressable
              style={[
                styles.sectionButton,
                activeSection === 'symptom' && styles.sectionButtonActive
              ]}
              onPress={() => setActiveSection('symptom')}
            >
              <IconSymbol
                name="stethoscope"
                size={20}
                color={activeSection === 'symptom' ? colors.card : colors.textSecondary}
              />
              <Text
                style={[
                  styles.sectionButtonText,
                  activeSection === 'symptom' && styles.sectionButtonTextActive
                ]}
              >
                Symptom Checker
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.sectionButton,
                activeSection === 'routine' && styles.sectionButtonActive
              ]}
              onPress={() => setActiveSection('routine')}
            >
              <IconSymbol
                name="calendar"
                size={20}
                color={activeSection === 'routine' ? colors.card : colors.textSecondary}
              />
              <Text
                style={[
                  styles.sectionButtonText,
                  activeSection === 'routine' && styles.sectionButtonTextActive
                ]}
              >
                Care Routine
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.sectionButton,
                activeSection === 'facts' && styles.sectionButtonActive
              ]}
              onPress={() => setActiveSection('facts')}
            >
              <IconSymbol
                name="lightbulb.fill"
                size={20}
                color={activeSection === 'facts' ? colors.card : colors.textSecondary}
              />
              <Text
                style={[
                  styles.sectionButtonText,
                  activeSection === 'facts' && styles.sectionButtonTextActive
                ]}
              >
                Feet Facts
              </Text>
            </Pressable>
          </View>

          {/* Content */}
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
    { id: 'dryness', label: 'Dry or Cracked Skin', icon: 'drop.fill' },
    { id: 'calluses', label: 'Calluses or Corns', icon: 'circle.fill' },
    { id: 'fungal', label: 'Discoloration or Fungal Signs', icon: 'exclamationmark.triangle.fill' },
    { id: 'pain', label: 'Pain or Discomfort', icon: 'bandage.fill' },
    { id: 'odor', label: 'Unusual Odor', icon: 'nose.fill' },
    { id: 'swelling', label: 'Swelling or Inflammation', icon: 'waveform.path.ecg' },
  ];

  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  return (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>Self-Assessment</Text>
      <Text style={styles.sectionDescription}>
        Select any symptoms you&apos;re experiencing. This is private and helps you identify common, treatable issues.
      </Text>

      <View style={styles.symptomGrid}>
        {symptoms.map((symptom) => {
          const isSelected = selectedSymptoms.includes(symptom.id);
          return (
            <Pressable
              key={symptom.id}
              style={[
                styles.symptomCard,
                isSelected && styles.symptomCardSelected
              ]}
              onPress={() => toggleSymptom(symptom.id)}
            >
              <IconSymbol
                name={symptom.icon as any}
                size={28}
                color={isSelected ? colors.primary : colors.textSecondary}
              />
              <Text
                style={[
                  styles.symptomLabel,
                  isSelected && styles.symptomLabelSelected
                ]}
              >
                {symptom.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {selectedSymptoms.length > 0 && (
        <View style={styles.resultsCard}>
          <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
          <View style={styles.resultsContent}>
            <Text style={styles.resultsTitle}>Common Causes & Care</Text>
            <Text style={styles.resultsText}>
              Based on your selection, these symptoms are often treatable with proper foot care routines. Consider:
            </Text>
            <Text style={styles.resultsBullet}>• Daily moisturizing for dry skin</Text>
            <Text style={styles.resultsBullet}>• Proper footwear to reduce pressure</Text>
            <Text style={styles.resultsBullet}>• Regular cleaning and drying</Text>
            <Text style={styles.resultsNote}>
              For persistent issues, consult a podiatrist or dermatologist.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

function CareRoutineBuilder() {
  const [selectedRoutines, setSelectedRoutines] = useState<string[]>([]);

  const routines = [
    {
      id: 'soak',
      title: 'Daily Foot Soak',
      description: 'Warm water with Epsom salt for 10-15 minutes',
      frequency: 'Daily',
      icon: 'drop.fill',
      color: '#4A90E2',
    },
    {
      id: 'moisturize',
      title: 'Moisturizing',
      description: 'Apply foot cream after washing and drying',
      frequency: 'Twice Daily',
      icon: 'sparkles',
      color: '#50C878',
    },
    {
      id: 'stretch',
      title: 'Foot Stretches',
      description: 'Gentle stretches to improve flexibility',
      frequency: 'Daily',
      icon: 'figure.walk',
      color: '#FF6B6B',
    },
    {
      id: 'massage',
      title: 'Self-Massage',
      description: 'Massage arches and pressure points',
      frequency: '3x per week',
      icon: 'hand.raised.fill',
      color: '#9B59B6',
    },
    {
      id: 'trim',
      title: 'Nail Care',
      description: 'Trim nails straight across, file edges',
      frequency: 'Weekly',
      icon: 'scissors',
      color: '#F39C12',
    },
    {
      id: 'inspect',
      title: 'Visual Inspection',
      description: 'Check for changes, cuts, or issues',
      frequency: 'Daily',
      icon: 'eye.fill',
      color: '#3498DB',
    },
  ];

  const toggleRoutine = (id: string) => {
    if (selectedRoutines.includes(id)) {
      setSelectedRoutines(selectedRoutines.filter(r => r !== id));
    } else {
      setSelectedRoutines([...selectedRoutines, id]);
    }
  };

  return (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>Build Your Care Routine</Text>
      <Text style={styles.sectionDescription}>
        Select activities to create your personalized foot care routine
      </Text>

      <View style={styles.routineList}>
        {routines.map((routine) => {
          const isSelected = selectedRoutines.includes(routine.id);
          return (
            <Pressable
              key={routine.id}
              style={[
                styles.routineCard,
                isSelected && styles.routineCardSelected
              ]}
              onPress={() => toggleRoutine(routine.id)}
            >
              <View style={styles.routineHeader}>
                <View style={[styles.routineIcon, { backgroundColor: routine.color + '20' }]}>
                  <IconSymbol
                    name={routine.icon as any}
                    size={24}
                    color={routine.color}
                  />
                </View>
                <View style={styles.routineInfo}>
                  <Text style={styles.routineTitle}>{routine.title}</Text>
                  <Text style={styles.routineFrequency}>{routine.frequency}</Text>
                </View>
                <View style={[
                  styles.checkbox,
                  isSelected && styles.checkboxSelected
                ]}>
                  {isSelected && (
                    <IconSymbol name="checkmark" size={16} color={colors.card} />
                  )}
                </View>
              </View>
              <Text style={styles.routineDescription}>{routine.description}</Text>
            </Pressable>
          );
        })}
      </View>

      {selectedRoutines.length > 0 && (
        <View style={styles.routineSummary}>
          <IconSymbol name="checkmark.circle.fill" size={24} color={colors.primary} />
          <Text style={styles.routineSummaryText}>
            You&apos;ve selected {selectedRoutines.length} routine{selectedRoutines.length !== 1 ? 's' : ''}. 
            Great start to healthier feet!
          </Text>
        </View>
      )}
    </View>
  );
}

function FeetFactsLibrary() {
  const facts = [
    {
      id: '1',
      icon: 'figure.walk',
      title: 'Complex Structure',
      fact: 'The human foot has 26 bones, 33 joints, and over 100 muscles, tendons, and ligaments.',
      color: '#4A90E2',
    },
    {
      id: '2',
      icon: 'bolt.fill',
      title: 'Incredible Strength',
      fact: 'Your feet can support 1.5 times your body weight when walking and up to 3 times when running.',
      color: '#FF6B6B',
    },
    {
      id: '3',
      icon: 'heart.fill',
      title: 'Sensory Powerhouse',
      fact: 'Each foot has over 7,000 nerve endings, making them highly sensitive to touch and pressure.',
      color: '#50C878',
    },
    {
      id: '4',
      icon: 'arrow.up.arrow.down',
      title: 'Balance Masters',
      fact: 'Your feet play a crucial role in balance and posture, constantly adjusting to keep you stable.',
      color: '#9B59B6',
    },
    {
      id: '5',
      icon: 'drop.fill',
      title: 'Natural Shock Absorbers',
      fact: 'The arch of your foot acts as a natural shock absorber, distributing impact forces efficiently.',
      color: '#F39C12',
    },
    {
      id: '6',
      icon: 'figure.run',
      title: 'Lifetime Journey',
      fact: 'The average person walks about 110,000 miles in their lifetime - that&apos;s like walking around the Earth 4 times!',
      color: '#3498DB',
    },
    {
      id: '7',
      icon: 'thermometer',
      title: 'Temperature Regulation',
      fact: 'Feet help regulate body temperature through sweat glands - each foot has about 250,000 of them!',
      color: '#E74C3C',
    },
    {
      id: '8',
      icon: 'sparkles',
      title: 'Unique Identity',
      fact: 'Just like fingerprints, your footprints are unique to you. No two people have identical foot patterns.',
      color: '#1ABC9C',
    },
  ];

  return (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>Feet Facts Library</Text>
      <Text style={styles.sectionDescription}>
        Celebrate the complexity and function of your amazing feet
      </Text>

      <View style={styles.factsList}>
        {facts.map((fact) => (
          <View key={fact.id} style={styles.factCard}>
            <View style={[styles.factIcon, { backgroundColor: fact.color + '20' }]}>
              <IconSymbol
                name={fact.icon as any}
                size={28}
                color={fact.color}
              />
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
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  sectionSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  sectionButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.highlight,
    gap: 6,
  },
  sectionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sectionButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  sectionButtonTextActive: {
    color: colors.card,
  },
  sectionContent: {
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
    lineHeight: 20,
    marginBottom: 20,
  },
  symptomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  symptomCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: colors.highlight,
  },
  symptomCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  symptomLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  symptomLabelSelected: {
    color: colors.primary,
  },
  resultsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  resultsContent: {
    flex: 1,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  resultsBullet: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
    marginLeft: 8,
  },
  resultsNote: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 8,
  },
  routineList: {
    gap: 12,
    marginBottom: 20,
  },
  routineCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.highlight,
  },
  routineCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '05',
  },
  routineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  routineIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routineInfo: {
    flex: 1,
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  routineFrequency: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  routineDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginLeft: 60,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  routineSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.primary + '10',
    padding: 16,
    borderRadius: 12,
  },
  routineSummaryText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  factsList: {
    gap: 16,
  },
  factCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06)',
    elevation: 1,
  },
  factIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
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
