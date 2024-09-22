import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center", paddingVertical: 100 }}>
        <Image source={LogoImage} style={styles.logo} />
        <Text style={styles.appName}>Expo Project Quickstart</Text>
        <Text style={styles.appDescription}>
          A template for your next great React Native app
        </Text>
      </View>
      <View style={{ paddingBottom: 50 }}>
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
    fontSize: 48,
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
    width: 300,
    marginBottom: 12,
    flexDirection: "row",
  },
});
