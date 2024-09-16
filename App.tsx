import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { LoginScreen } from "./src/screens/LoginScreen";
import * as SecureStore from "expo-secure-store";
import * as Font from "expo-font";
import { useNetInfo } from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import { OfflineScreen } from "./src/screens/OfflineScreen";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { HomeTabs } from "./src/navigation/HomeTabs";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { WelcomeScreen } from "./src/screens/WelcomeScreen";

const Stack = createStackNavigator();

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const loadFonts = async () => {
  await Font.loadAsync({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });
};

export default function App() {
  const netInfo = useNetInfo();
  console.log("netInfo", netInfo.isConnected);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      {netInfo.isConnected ? (
        <ClerkProvider
          publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
          tokenCache={tokenCache}
        >
          <SignedIn>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeTabs} />
                <Stack.Screen name="Profile" component={ProfileScreen} />

                <Stack.Screen
                  name="Welcome Screen"
                  component={WelcomeScreen}
                  options={{
                    gestureDirection: "vertical",
                    ...TransitionPresets.ModalSlideFromBottomIOS,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>
          <Toast />
        </ClerkProvider>
      ) : (
        <OfflineScreen />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
