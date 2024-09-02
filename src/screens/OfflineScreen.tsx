import React from "react";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import GlobalColors from "../styles/colors";

export const OfflineScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={GlobalColors.black} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
