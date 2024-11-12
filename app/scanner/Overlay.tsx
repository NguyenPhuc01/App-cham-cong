import React, { useState, useEffect } from "react";
import { Canvas, DiffRect, rect, rrect } from "@shopify/react-native-skia";
import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

const { width, height } = Dimensions.get("window");

const innerDimension = 300;

const outer = rrect(rect(0, 0, width, height), 0, 0);
const inner = rrect(
  rect(
    width / 2 - innerDimension / 2,
    height / 2 - innerDimension / 2,
    innerDimension,
    innerDimension
  ),
  50,
  50
);

export const Overlay = ({ loading }) => {
  if (loading) {
    return (
      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Canvas
      style={
        Platform.OS === "android" ? { flex: 1 } : StyleSheet.absoluteFillObject
      }
    >
      <DiffRect inner={inner} outer={outer} color="black" opacity={0.5} />
    </Canvas>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
