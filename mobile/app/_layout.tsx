/**
 * Root Layout
 * Sets up the theme provider, navigation, and global app structure.
 */
import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { toftreesTheme } from '../theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={toftreesTheme}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: toftreesTheme.colors.elevation.level2,
            },
            headerTintColor: toftreesTheme.colors.onSurface,
            headerTitleStyle: {
              fontWeight: '600',
            },
            contentStyle: {
              backgroundColor: toftreesTheme.colors.background,
            },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: 'Toftrees Surveyor',
              headerLargeTitle: true,
            }}
          />
          <Stack.Screen
            name="survey/new"
            options={{
              title: 'New Survey',
              presentation: 'fullScreenModal',
            }}
          />
          <Stack.Screen
            name="survey/[id]"
            options={{
              title: 'Survey Details',
            }}
          />
          <Stack.Screen
            name="settings"
            options={{
              title: 'Settings',
            }}
          />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
