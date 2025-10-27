
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
    color: colors.wellness,
  },
  {
    id: '2',
    icon: 'scissors',
    title: 'Nail Care',
    description: 'Trim toenails straight across to prevent ingrown nails. Keep them at a moderate length.',
    color: colors.care,
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
    color: colors.wellness,
  },
  {
    id: '5',
    icon: 'heart.fill',
    title: 'Massage',
    description: 'Give yourself a foot massage to improve circulation and relieve tension.',
    color: colors.care,
  },
  {
    id: '6',
    icon: 'eye.fill',
    title: 'Regular Checks',
    description: 'Inspect your feet regularly for cuts, blisters, or changes. Early detection is key.',
    color: colors.primary,
  },
];

export default function SelfCareTips() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIconBg}>
          <IconSymbol name="sparkles" size={24} color={colors.wellness} />
        </View>
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
            <View style={[styles.iconContainer, { backgroundColor: tip.color + '25' }]}>
              <IconSymbol name={tip.icon as any} size={26} color={tip.color} />
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
  headerIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent + '30',
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
  tipsContainer: {
    maxHeight: 400,
  },
  tipCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    boxShadow: '0px 3px 8px rgba(141, 110, 99, 0.12)',
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: colors.footprint,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 5,
  },
  tipDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
