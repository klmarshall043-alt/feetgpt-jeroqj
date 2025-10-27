
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';

interface FactItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const facts: FactItem[] = [
  {
    id: '1',
    icon: 'figure.walk',
    title: 'Mobility & Balance',
    description: 'Your feet contain 26 bones, 33 joints, and over 100 muscles, tendons, and ligaments working together to keep you balanced and mobile.',
  },
  {
    id: '2',
    icon: 'bolt.fill',
    title: 'Foundation of Movement',
    description: 'Healthy feet are essential for walking, running, and all physical activities. They support your entire body weight with every step.',
  },
  {
    id: '3',
    icon: 'heart.circle.fill',
    title: 'Overall Health',
    description: 'Foot health is connected to your overall well-being. Problems with feet can affect posture, joints, and even your mood.',
  },
];

export default function FunctionalityFocus() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconSymbol name="star.fill" size={28} color={colors.primary} />
        <Text style={styles.headerTitle}>Why Foot Health Matters</Text>
      </View>
      <Text style={styles.subtitle}>
        Understanding the amazing capabilities of your feet
      </Text>
      
      {facts.map((fact) => (
        <View key={fact.id} style={styles.factCard}>
          <View style={styles.factIconContainer}>
            <IconSymbol name={fact.icon as any} size={28} color={colors.card} />
          </View>
          <View style={styles.factContent}>
            <Text style={styles.factTitle}>{fact.title}</Text>
            <Text style={styles.factDescription}>{fact.description}</Text>
          </View>
        </View>
      ))}
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
  factCard: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    boxShadow: '0px 3px 6px rgba(0, 123, 255, 0.2)',
    elevation: 3,
  },
  factIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  factContent: {
    flex: 1,
  },
  factTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
    marginBottom: 4,
  },
  factDescription: {
    fontSize: 14,
    color: colors.card,
    lineHeight: 20,
    opacity: 0.9,
  },
});
