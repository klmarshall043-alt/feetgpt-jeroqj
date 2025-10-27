
import React from 'react';
import { Platform } from 'react-native';
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
      name: 'ai-chat',
      route: '/(tabs)/ai-chat',
      icon: 'sparkles',
      label: 'Ask AI',
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
  ];

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
        <NativeTabs.Trigger name="ai-chat">
          <Icon sf="sparkles" drawable="ic_ai" />
          <Label>Ask AI</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="gallery">
          <Icon sf="photo.fill" drawable="ic_gallery" />
          <Label>Gallery</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="community">
          <Icon sf="person.3.fill" drawable="ic_community" />
          <Label>Community</Label>
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
          name="ai-chat" 
          options={{
            title: 'Ask AI',
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
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
