import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SignInWithOauth } from "../components/SignInWithOauth";
import GlobalColors from "../styles/colors";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const LogoImage = require("../../assets/images/icon.png");
const EmailImage = require("../../assets/images/email.png");

// Define the types for route and navigation
type LoginScreenProps = {
  route: RouteProp<any>; // Replace 'any' with your specific route params type if known
  navigation: StackNavigationProp<any>; // Replace 'any' with your specific stack param list type if known
};

export const LoginScreen = ({ route, navigation }: LoginScreenProps) => {
  const hasWelcomed = useRef(false);

  useEffect(() => {
    if (!hasWelcomed.current) {
      navigation.navigate("Welcome Screen");

      // set the ref variable to true
      hasWelcomed.current = true;
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center", paddingVertical: 100 }}>
        {/* <Image source={LogoImage} style={styles.logo} /> */}
        <Text style={styles.appName}>Expo Project Quickstart</Text>
        <Text style={styles.appDescription}>
          A template for your next great React Native app
        </Text>
      </View>
      <View
        style={{ paddingHorizontal: 36, paddingVertical: 24, width: "100%" }}
      >
        <SignInWithOauth text="Sign in with Apple" strategy="oauth_apple" />
        <SignInWithOauth text="Sign in with Google" strategy="oauth_google" />
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("Auth");
          }}
        >
          <Image
            source={EmailImage}
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
          <Text
            style={{
              fontFamily: "Montserrat-Regular",
            }}
          >
            Sign in with email
          </Text>
        </Pressable>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://50thand2nd.github.io/");
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Montserrat-Regular",
              margin: 12,
            }}
          >
            By continuing, you agree to our{" "}
            <Text style={{ textDecorationLine: "underline" }}>
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text style={{ textDecorationLine: "underline" }}>
              Privacy Policy
            </Text>
            .
          </Text>
        </TouchableOpacity>
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
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 10,
    marginHorizontal: 20,
    textAlign: "center",
    fontFamily: "Platypi-Bold",
  },
  appDescription: {
    fontSize: 20,
    marginTop: 24,
    marginHorizontal: 20,
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
  },
  button: {
    backgroundColor: GlobalColors.lightgrey,
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    // width: "48%",
    marginBottom: 12,
    flexDirection: "row",
  },
});
