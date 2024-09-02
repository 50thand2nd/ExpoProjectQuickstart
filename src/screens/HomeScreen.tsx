import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import * as Notifications from "expo-notifications";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { BACKEND_URL } from "../constants/constants";

// Define the types for route and navigation
type HomeScreenProps = {
  route: RouteProp<any>; // Replace 'any' with your specific route params type if known
  navigation: StackNavigationProp<any>; // Replace 'any' with your specific stack param list type if known
};

// Define the type for the expected response of exampleFetch
type ExampleFetchResponse = {
  param: string;
};

export const HomeScreen = ({ route, navigation }: HomeScreenProps) => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user, isLoaded: userIsLoaded } = useUser();

  const [expoPushToken, setExpoPushToken] = useState<string>("");

  const registerForPushNotificationsAsync = async () => {
    let token;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    try {
      // TODO: Add your project ID
      const projectId = "1d608707-b91a-4d2a-83c9-28dfdc990bbd";
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(projectId, token);
    } catch (error) {
      alert(`Error fetching push token: ${error}`);
      console.error("Error stack:", error.stack);
    }
    return token;
  };

  const exampleFetch = async (): Promise<ExampleFetchResponse | undefined> => {
    try {
      const jwt = await getToken();
      const response = await fetch(`${BACKEND_URL}/example_post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          param: "value",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: ExampleFetchResponse = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      return undefined; // or handle the error case as needed
    }
  };

  useEffect(() => {
    if (userIsLoaded && user && isSignedIn) {
      exampleFetch();
      registerForPushNotificationsAsync().then((token) => {
        setExpoPushToken(token || "");
      });
    }

    // When user is loaded, print get token
    if (isLoaded) {
      getToken().then((jwt) => {
        console.log("userId", userId);
        console.log("sessionId", sessionId);
        console.log("jwt", jwt);
      });
    }
  }, [isLoaded, userIsLoaded, user, isSignedIn]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
