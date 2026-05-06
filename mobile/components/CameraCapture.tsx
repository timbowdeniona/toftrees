/**
 * CameraCapture Component
 * Camera view with capture button for photographing headstones.
 */
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { IconButton, Text, Button, Surface } from 'react-native-paper';
import { toftreesTheme, spacing, radii } from '../theme';

interface CameraCaptureProps {
  onCapture: (uri: string) => void;
  onCancel: () => void;
}

export function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);

  if (!permission) {
    return (
      <Surface style={styles.container}>
        <Text variant="bodyLarge">Loading camera...</Text>
      </Surface>
    );
  }

  if (!permission.granted) {
    return (
      <Surface style={styles.permissionContainer}>
        <Text variant="headlineSmall" style={styles.permissionTitle}>
          Camera Access Required
        </Text>
        <Text variant="bodyMedium" style={styles.permissionText}>
          We need camera access to photograph headstones.
        </Text>
        <Button
          mode="contained"
          onPress={requestPermission}
          style={styles.permissionButton}
          icon="camera"
        >
          Grant Permission
        </Button>
        <Button
          mode="text"
          onPress={onCancel}
          style={styles.cancelButton}
        >
          Cancel
        </Button>
      </Surface>
    );
  }

  const handleCapture = async () => {
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.85,
        exif: true,
      });
      if (photo) {
        onCapture(photo.uri);
      }
    } catch (error) {
      console.error('Failed to take photo:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onCapture(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Failed to pick image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
      >
        {/* Overlay with guide frame */}
        <View style={styles.overlay}>
          <View style={styles.guideFrame}>
            <Text variant="labelMedium" style={styles.guideText}>
              Position headstone within frame
            </Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <IconButton
            icon="close"
            mode="contained"
            iconColor={toftreesTheme.colors.onSurface}
            containerColor={toftreesTheme.colors.surfaceVariant}
            size={24}
            onPress={onCancel}
            accessibilityLabel="Cancel camera"
          />
          <IconButton
            icon="camera"
            mode="contained"
            iconColor={toftreesTheme.colors.onPrimary}
            containerColor={toftreesTheme.colors.primary}
            size={48}
            onPress={handleCapture}
            disabled={isCapturing}
            accessibilityLabel="Take photo"
          />
          <IconButton
            icon="image"
            mode="contained"
            iconColor={toftreesTheme.colors.onSurface}
            containerColor={toftreesTheme.colors.surfaceVariant}
            size={24}
            onPress={handlePickImage}
            accessibilityLabel="Choose from gallery"
          />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideFrame: {
    width: '80%',
    aspectRatio: 3 / 4,
    borderWidth: 2,
    borderColor: 'rgba(168, 200, 150, 0.5)',
    borderRadius: radii.md,
    borderStyle: 'dashed',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: spacing.md,
  },
  guideText: {
    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: toftreesTheme.colors.background,
  },
  permissionTitle: {
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  permissionText: {
    marginBottom: spacing.lg,
    textAlign: 'center',
    color: toftreesTheme.colors.onSurfaceVariant,
  },
  permissionButton: {
    marginBottom: spacing.md,
  },
  cancelButton: {
    marginTop: spacing.sm,
  },
});
