
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';

interface TipItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

const tips: TipItem[] = [
  {
    id: '1',
    icon: 'drop.fill',
    title: 'Daily Hygiene',
    description: 'Wash your feet daily with mild soap and warm water. Dry thoroughly, especially between toes.',
    color: colors.primary,
  },
  {
    id: '2',
    icon: 'scissors',
    title: 'Nail Care',
    description: 'Trim toenails straight across to prevent ingrown nails. Keep them at a moderate length.',
    color: colors.accent,
  },
  {
    id: '3',
    icon: 'shoe.fill',
    title: 'Proper Footwear',
    description: 'Choose shoes that fit well with adequate toe room. Avoid tight or narrow shoes.',
    color: colors.primary,
  },
  {
    id: '4',
    icon: 'figure.walk',
    title: 'Moisturize',
    description: 'Apply moisturizer daily to prevent dry, cracked skin. Focus on heels and soles.',
    color: colors.accent,
  },
  {
    id: '5',
    icon: 'heart.fill',
    title: 'Massage',
    description: 'Give yourself a foot massage to improve circulation and relieve tension.',
    color: colors.primary,
  },
  {
    id: '6',
    icon: 'eye.fill',
    title: 'Regular Checks',
    description: 'Inspect your feet regularly for cuts, blisters, or changes. Early detection is key.',
    color: colors.accent,
  },
];

export default function SelfCareTips() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconSymbol name="sparkles" size={28} color={colors.primary} />
        <Text style={styles.headerTitle}>Self-Care Tips</Text>
      </View>
      <Text style={styles.subtitle}>
        Simple daily practices for healthy, happy feet
      </Text>
      <ScrollView 
        style={styles.tipsContainer}
        showsVerticalScrollIndicator={false}
      >
        {tips.map((tip) => (
          <View key={tip.id} style={styles.tipCard}>
            <View style={[styles.iconContainer, { backgroundColor: tip.color + '20' }]}>
              <IconSymbol name={tip.icon as any} size={24} color={tip.color} />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipDescription}>{tip.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
  tipsContainer: {
    maxHeight: 400,
  },
  tipCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
