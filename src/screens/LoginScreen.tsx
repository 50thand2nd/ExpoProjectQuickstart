import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import { SignInWithOauth } from "../components/SignInWithOauth";
import GlobalColors from "../styles/colors";

const LogoImage = require("../../assets/images/icon.png");

export const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center", paddingVertical: 100 }}>
        <Image source={LogoImage} style={styles.logo} />
        <Text style={styles.appName}>Expo Project Quickstart</Text>
        <Text style={styles.appDescription}>
          A template for your next great React Native app
        </Text>
      </View>
      <View style={{ paddingBottom: 100 }}>
        <SignInWithOauth text="Sign in with Google" strategy="oauth_google" />
        <SignInWithOauth text="Sign in with Apple" strategy="oauth_apple" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 50,
    backgroundColor: GlobalColors.white,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  appName: {
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Montserrat-Bold",
  },
  appDescription: {
    fontSize: 22,
    marginTop: 18,
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
  },
});
