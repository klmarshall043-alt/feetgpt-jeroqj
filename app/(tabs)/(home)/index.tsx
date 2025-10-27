
import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, View, Text, ScrollView, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import SelfCareTips from "@/components/SelfCareTips";
import Affirmations from "@/components/Affirmations";
import FunctionalityFocus from "@/components/FunctionalityFocus";

export default function HomeScreen() {
  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "FeetGPT",
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
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.heroIconContainer}>
              <IconSymbol name="heart.circle.fill" size={64} color={colors.primary} />
            </View>
            <Text style={styles.heroTitle}>Welcome to FeetGPT</Text>
            <Text style={styles.heroSubtitle}>
              Transform your relationship with your feet through health, function, and self-care
            </Text>
          </View>

          {/* Inspirational Message */}
          <View style={styles.inspirationalCard}>
            <IconSymbol name="sparkles" size={24} color={colors.accent} />
            <Text style={styles.inspirationalText}>
              Your feet are incredible! They carry you through life, support your entire body, and deserve your appreciation and care.
            </Text>
          </View>

          {/* Daily Affirmation */}
          <Affirmations />

          {/* Functionality Focus */}
          <FunctionalityFocus />

          {/* Self-Care Tips */}
          <SelfCareTips />

          {/* Bottom Spacer */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </>
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
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 20,
  },
  heroIconContainer: {
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  inspirationalCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  inspirationalText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginLeft: 12,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 40,
  },
});
