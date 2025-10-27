
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';

const affirmations = [
  'My feet carry me through life with strength and grace.',
  'I appreciate my feet for all they do for me every day.',
  'My feet are unique and perfectly suited for my journey.',
  'I care for my feet with love and attention.',
  'My feet deserve comfort, care, and respect.',
  'I am grateful for the mobility my feet provide.',
  'My feet are strong, capable, and resilient.',
  'I honor my feet by choosing what feels good for them.',
  'My feet connect me to the earth and ground me.',
  'I celebrate my feet for their function and reliability.',
  'Every step I take is supported by my amazing feet.',
  'My feet are worthy of care and appreciation.',
];

export default function Affirmations() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % affirmations.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + affirmations.length) % affirmations.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconSymbol name="heart.fill" size={28} color={colors.accent} />
        <Text style={styles.headerTitle}>Daily Affirmation</Text>
      </View>
      <Text style={styles.subtitle}>
        Positive thoughts for a positive relationship with your feet
      </Text>
      
      <View style={styles.affirmationCard}>
        <View style={styles.quoteIconContainer}>
          <IconSymbol name="quote.opening" size={32} color={colors.primary + '40'} />
        </View>
        
        <Text style={styles.affirmationText}>
          {affirmations[currentIndex]}
        </Text>
        
        <View style={styles.navigationContainer}>
          <Pressable 
            onPress={handlePrevious}
            style={styles.navButton}
          >
            <IconSymbol name="chevron.left" size={24} color={colors.primary} />
          </Pressable>
          
          <View style={styles.dotsContainer}>
            {affirmations.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>
          
          <Pressable 
            onPress={handleNext}
            style={styles.navButton}
          >
            <IconSymbol name="chevron.right" size={24} color={colors.primary} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  affirmationCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  quoteIconContainer: {
    marginBottom: 16,
  },
  affirmationText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 24,
    minHeight: 84,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.highlight,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
