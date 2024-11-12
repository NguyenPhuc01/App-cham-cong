import { Camera, CameraView } from "expo-camera";
import { Stack } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Overlay } from "./Overlay";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const getPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("🚀 ~ location:", location.coords);
    getAddress(location.coords.latitude, location.coords.longitude);
  };
  const getAddress = async (latitude: number, longitude: number) => {
    try {
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (geocode.length > 0) {
        const { street, city, region, country } = geocode[0];
        console.log("🚀 ~ getAddress ~ geocode:", geocode);
        qrLock.current = false;
        router.push("/");
      }
    } catch (error) {
      console.log("Lỗi khi lấy tên địa điểm:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("xx");

        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            console.log("🚀 ~ Home ~ data:", data);
            console.log("🚀 ~ !qrLock.current:", !qrLock.current);
            setIsLoading(true);
            getPermission();
            qrLock.current = true;
          }
        }}
      />
      <Overlay loading={isLoading} />
    </SafeAreaView>
  );
}
