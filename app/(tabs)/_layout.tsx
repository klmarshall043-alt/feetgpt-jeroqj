
import React from 'react';
import { Platform, Image, View, StyleSheet } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Home',
    },
    {
      name: 'learn',
      route: '/(tabs)/learn',
      icon: 'book.fill',
      label: 'Learn',
    },
    {
      name: 'gallery',
      route: '/(tabs)/gallery',
      icon: 'photo.fill',
      label: 'Gallery',
    },
    {
      name: 'community',
      route: '/(tabs)/community',
      icon: 'person.3.fill',
      label: 'Community',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Profile',
    },
  ];

  const HeaderLogo = () => (
    <View style={headerStyles.logoContainer}>
      <Image 
        source={require('@/assets/images/79afa96e-51b5-4b68-bf0b-5916da7e5df1.png')}
        style={headerStyles.logo}
        resizeMode="contain"
      />
    </View>
  );

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="house.fill" drawable="ic_home" />
          <Label>Home</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="learn">
          <Icon sf="book.fill" drawable="ic_learn" />
          <Label>Learn</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="gallery">
          <Icon sf="photo.fill" drawable="ic_gallery" />
          <Label>Gallery</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="community">
          <Icon sf="person.3.fill" drawable="ic_community" />
          <Label>Community</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.fill" drawable="ic_profile" />
          <Label>Profile</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '700',
          },
          animation: 'none',
          headerLeft: () => <HeaderLogo />,
        }}
      >
        <Stack.Screen 
          name="(home)" 
          options={{
            title: 'FeetGPT',
          }}
        />
        <Stack.Screen 
          name="learn" 
          options={{
            title: 'Learn',
          }}
        />
        <Stack.Screen 
          name="gallery" 
          options={{
            title: 'Gallery',
          }}
        />
        <Stack.Screen 
          name="community" 
          options={{
            title: 'Community',
          }}
        />
        <Stack.Screen 
          name="profile" 
          options={{
            title: 'Profile',
          }}
        />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}

const headerStyles = StyleSheet.create({
  logoContainer: {
    width: 32,
    height: 32,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});
