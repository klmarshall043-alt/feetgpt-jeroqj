
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
        <View style={styles.headerIconBg}>
          <IconSymbol name="star.fill" size={24} color={colors.primary} />
        </View>
        <Text style={styles.headerTitle}>Why Foot Health Matters</Text>
      </View>
      <Text style={styles.subtitle}>
        Understanding the amazing capabilities of your feet
      </Text>
      
      {facts.map((fact, index) => (
        <View key={fact.id} style={[
          styles.factCard,
          index === 0 && styles.factCardFirst,
          index === facts.length - 1 && styles.factCardLast,
        ]}>
          <View style={styles.factIconContainer}>
            <IconSymbol name={fact.icon as any} size={30} color={colors.card} />
          </View>
          <View style={styles.factContent}>
            <Text style={styles.factTitle}>{fact.title}</Text>
            <Text style={styles.factDescription}>{fact.description}</Text>
          </View>
          <View style={styles.factDecoration}>
            <View style={styles.factDecorationDot} />
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
  headerIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '30',
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
  factCard: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    boxShadow: '0px 4px 10px rgba(161, 136, 127, 0.25)',
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  factCardFirst: {
    backgroundColor: colors.wellness,
  },
  factCardLast: {
    backgroundColor: colors.primary,
  },
  factIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  factContent: {
    flex: 1,
  },
  factTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.card,
    marginBottom: 6,
  },
  factDescription: {
    fontSize: 14,
    color: colors.card,
    lineHeight: 21,
    opacity: 0.95,
  },
  factDecoration: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  factDecorationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});
