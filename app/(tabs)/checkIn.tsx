import { StyleSheet } from "react-native";

import { useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";

import Scanner from "../scanner";
export default function ScanQrCode() {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  useEffect(() => {
    if (isPermissionGranted) {
      requestPermission();
    }
  }, [isPermissionGranted]);

  return <Scanner />;
}
