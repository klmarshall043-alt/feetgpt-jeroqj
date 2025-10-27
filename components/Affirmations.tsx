
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
        <View style={styles.headerIconBg}>
          <IconSymbol name="heart.fill" size={24} color={colors.care} />
        </View>
        <Text style={styles.headerTitle}>Daily Affirmation</Text>
      </View>
      <Text style={styles.subtitle}>
        Positive thoughts for a positive relationship with your feet
      </Text>
      
      <View style={styles.affirmationCard}>
        <View style={styles.decorativeTop}>
          <View style={styles.decorativeDot} />
          <View style={styles.decorativeDot} />
          <View style={styles.decorativeDot} />
        </View>
        
        <View style={styles.quoteIconContainer}>
          <IconSymbol name="quote.opening" size={36} color={colors.primary + '50'} />
        </View>
        
        <Text style={styles.affirmationText}>
          {affirmations[currentIndex]}
        </Text>
        
        <View style={styles.navigationContainer}>
          <Pressable 
            onPress={handlePrevious}
            style={styles.navButton}
          >
            <IconSymbol name="chevron.left" size={24} color={colors.card} />
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
            <IconSymbol name="chevron.right" size={24} color={colors.card} />
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
  headerIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.care + '30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
    marginLeft: 50,
  },
  affirmationCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    boxShadow: '0px 6px 16px rgba(141, 110, 99, 0.25)',
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeTop: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 6,
  },
  decorativeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  quoteIconContainer: {
    marginBottom: 16,
  },
  affirmationText: {
    fontSize: 19,
    fontWeight: '600',
    color: colors.card,
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 28,
    minHeight: 90,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  activeDot: {
    backgroundColor: colors.card,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
