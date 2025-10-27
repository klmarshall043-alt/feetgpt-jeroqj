
import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, View, Text, ScrollView, Platform, Image } from "react-native";
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
          {/* Hero Section with Logo */}
          <View style={styles.heroSection}>
            <View style={styles.footprintPattern}>
              <View style={styles.footprintLeft}>
                <IconSymbol name="figure.walk" size={40} color={colors.footprint} style={styles.footprintIcon} />
              </View>
              <View style={styles.footprintRight}>
                <IconSymbol name="figure.walk" size={40} color={colors.footprint} style={styles.footprintIcon} />
              </View>
            </View>
            <View style={styles.logoContainer}>
              <Image 
                source={require('@/assets/images/79afa96e-51b5-4b68-bf0b-5916da7e5df1.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.heroTitle}>Welcome to FeetGPT</Text>
            <Text style={styles.heroSubtitle}>
              Transform your relationship with your feet through health, function, and self-care
            </Text>
          </View>

          {/* Inspirational Message with Spa Theme */}
          <View style={styles.inspirationalCard}>
            <View style={styles.inspirationalIconBg}>
              <IconSymbol name="sparkles" size={28} color={colors.wellness} />
            </View>
            <View style={styles.inspirationalContent}>
              <Text style={styles.inspirationalTitle}>Daily Inspiration</Text>
              <Text style={styles.inspirationalText}>
                Your feet are incredible! They carry you through life, support your entire body, and deserve your appreciation and care.
              </Text>
            </View>
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
    paddingVertical: 30,
    backgroundColor: colors.card,
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(141, 110, 99, 0.15)',
    elevation: 3,
  },
  footprintPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    opacity: 0.1,
  },
  footprintLeft: {
    transform: [{ rotate: '-15deg' }],
  },
  footprintRight: {
    transform: [{ rotate: '15deg' }],
  },
  footprintIcon: {
    opacity: 0.5,
  },
  logoContainer: {
    marginBottom: 16,
    zIndex: 1,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
    zIndex: 1,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
    zIndex: 1,
  },
  inspirationalCard: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    boxShadow: '0px 4px 12px rgba(128, 203, 196, 0.3)',
    elevation: 4,
    borderWidth: 2,
    borderColor: colors.wellness,
  },
  inspirationalIconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  inspirationalContent: {
    flex: 1,
  },
  inspirationalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  inspirationalText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 40,
  },
});
