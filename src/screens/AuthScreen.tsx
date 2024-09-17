import * as React from "react";
import {
  TextInput,
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import GlobalColors from "../styles/colors";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

// Define the types for route and navigation
type AuthScreenProps = {
  route: RouteProp<any>; // Replace 'any' with your specific route params type if known
  navigation: StackNavigationProp<any>; // Replace 'any' with your specific stack param list type if known
};

const BackImage = require("../../assets/images/back.png");
const LogoImage = require("../../assets/images/icon.png");

export default function AuthScreen({ route, navigation }: AuthScreenProps) {
  const {
    signIn,
    setActive: setSignInActive,
    isLoaded: isSignInLoaded,
  } = useSignIn();
  const {
    signUp,
    setActive: setSignUpActive,
    isLoaded: isSignUpLoaded,
  } = useSignUp();

  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const onSignInPress = async () => {
    if (!isSignInLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setSignInActive({ session: signInAttempt.createdSessionId });
        navigation.navigate("Home");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Toast.show({
        type: "error",
        position: "top",
        text1: err?.errors?.[0]?.message || "Error",
        text2: err?.errors?.[0]?.longMessage || "",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const onSignUpPress = async () => {
    if (!isSignUpLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Toast.show({
        type: "error",
        position: "top",
        text1: err?.errors?.[0]?.longMessage || "An error occurred",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const onPressVerify = async () => {
    if (!isSignUpLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setSignUpActive({ session: completeSignUp.createdSessionId });
        navigation.navigate("Home");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Toast.show({
        type: "error",
        position: "top",
        text1: err?.errors?.[0]?.message || "Error",
        text2: err?.errors?.[0]?.longMessage || "",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={BackImage} style={styles.backImage} />
        </Pressable>
      </View>
      <ScrollView
        style={styles.innerContainer}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Image source={LogoImage} style={styles.logo} />
        </View>
        <Text style={styles.title}>{isSigningUp ? "Sign Up" : "Sign In"}</Text>
        {!pendingVerification ? (
          <>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email"
              onChangeText={(email) => setEmailAddress(email)}
            />
            <TextInput
              style={styles.input}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />

            {isSigningUp ? (
              <>
                <Pressable style={styles.button} onPress={onSignUpPress}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
                <Pressable
                  style={styles.secondaryButton}
                  onPress={() => setIsSigningUp(false)}
                >
                  <Text style={styles.secondaryButtonText}>
                    Already have an account? Sign In
                  </Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable style={styles.button} onPress={onSignInPress}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </Pressable>
                <Pressable
                  style={styles.secondaryButton}
                  onPress={() => setIsSigningUp(true)}
                >
                  <Text style={styles.secondaryButtonText}>
                    New here? Sign Up
                  </Text>
                </Pressable>
              </>
            )}
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              value={code}
              placeholder="Verification Code..."
              onChangeText={(code) => setCode(code)}
            />
            <Pressable style={styles.button} onPress={onPressVerify}>
              <Text style={styles.buttonText}>Verify Email</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: GlobalColors.white,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingBottom: 12,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  backImage: {
    width: 28,
    height: 28,
    tintColor: GlobalColors.black,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Platypi-Bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: "Montserrat-Regular",
  },
  button: {
    backgroundColor: GlobalColors.blue,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: GlobalColors.white,
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },
  secondaryButton: {
    alignItems: "center",
    padding: 10,
  },
  secondaryButtonText: {
    color: GlobalColors.blue,
    fontSize: 14,
  },
});
