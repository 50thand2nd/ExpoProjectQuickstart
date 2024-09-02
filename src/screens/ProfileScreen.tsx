import React from "react";
import { SafeAreaView } from "react-native";
import { SignOut } from "../components/SignOut";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// Define the types for route and navigation
type ProfileScreenProps = {
  route: RouteProp<any>; // Replace 'any' with your specific route params type if known
  navigation: StackNavigationProp<any>; // Replace 'any' with your specific stack param list type if known
};

export const ProfileScreen = ({ route, navigation }: ProfileScreenProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignOut />
    </SafeAreaView>
  );
};
