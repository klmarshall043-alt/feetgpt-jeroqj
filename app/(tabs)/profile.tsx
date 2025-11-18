
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/sign-in');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
            </View>
            <Text style={styles.profileName}>{user?.username || 'User'}</Text>
            <Text style={styles.profileEmail}>{user?.email || ''}</Text>
            <Text style={styles.profileSubtitle}>
              Track your progress and celebrate your commitment to foot health
            </Text>
          </View>

          {/* Stats Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Progress</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <IconSymbol name="calendar" size={32} color={colors.primary} />
                <Text style={styles.statNumber}>7</Text>
                <Text style={styles.statLabel}>Days Active</Text>
              </View>
              
              <View style={styles.statCard}>
                <IconSymbol name="heart.fill" size={32} color={colors.accent} />
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Affirmations Read</Text>
              </View>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <IconSymbol name="sparkles" size={32} color={colors.primary} />
                <Text style={styles.statNumber}>15</Text>
                <Text style={styles.statLabel}>Tips Learned</Text>
              </View>
              
              <View style={styles.statCard}>
                <IconSymbol name="star.fill" size={32} color={colors.accent} />
                <Text style={styles.statNumber}>100%</Text>
                <Text style={styles.statLabel}>Commitment</Text>
              </View>
            </View>
          </View>

          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            
            <View style={styles.accountCard}>
              <View style={styles.accountRow}>
                <IconSymbol name="person.fill" size={20} color={colors.textSecondary} />
                <View style={styles.accountInfo}>
                  <Text style={styles.accountLabel}>Username</Text>
                  <Text style={styles.accountValue}>{user?.username || 'Not set'}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.accountRow}>
                <IconSymbol name="envelope.fill" size={20} color={colors.textSecondary} />
                <View style={styles.accountInfo}>
                  <Text style={styles.accountLabel}>Email</Text>
                  <Text style={styles.accountValue}>{user?.email || 'Not set'}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.accountRow}>
                <IconSymbol name="calendar" size={20} color={colors.textSecondary} />
                <View style={styles.accountInfo}>
                  <Text style={styles.accountLabel}>Member Since</Text>
                  <Text style={styles.accountValue}>
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About FeetGPT</Text>
            <View style={styles.aboutCard}>
              <Text style={styles.aboutText}>
                FeetGPT is designed to help you develop a positive, healthy relationship with your feet. 
                We focus on function, health, and self-care rather than appearance.
              </Text>
              <Text style={styles.aboutText}>
                Your feet are amazing tools that deserve care and appreciation. Through daily affirmations, 
                practical tips, and education about foot health, we help you transform any negative feelings 
                into positive action.
              </Text>
            </View>
          </View>

          {/* Tips Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Reminders</Text>
            <View style={styles.reminderCard}>
              <IconSymbol name="checkmark.circle.fill" size={24} color={colors.primary} />
              <Text style={styles.reminderText}>
                Remember to wash and dry your feet daily
              </Text>
            </View>
            <View style={styles.reminderCard}>
              <IconSymbol name="checkmark.circle.fill" size={24} color={colors.primary} />
              <Text style={styles.reminderText}>
                Choose comfortable, well-fitting shoes
              </Text>
            </View>
            <View style={styles.reminderCard}>
              <IconSymbol name="checkmark.circle.fill" size={24} color={colors.primary} />
              <Text style={styles.reminderText}>
                Take time to appreciate what your feet do for you
              </Text>
            </View>
          </View>

          {/* Sign Out Button */}
          <View style={styles.section}>
            <Pressable style={styles.signOutButton} onPress={handleSignOut}>
              <IconSymbol name="arrow.right.square.fill" size={20} color="#FFFFFF" />
              <Text style={styles.signOutText}>Sign Out</Text>
            </Pressable>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  profileName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  profileSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  accountCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  accountInfo: {
    flex: 1,
  },
  accountLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  accountValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.highlight,
    marginVertical: 16,
  },
  aboutCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  aboutText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  reminderCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  reminderText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    lineHeight: 20,
  },
  signOutButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomSpacer: {
    height: 40,
  },
});
