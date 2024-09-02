import React from "react";
import { Text, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// Define the types for route and navigation
type SearchScreenProps = {
  route: RouteProp<any>; // Replace 'any' with your specific route params type if known
  navigation: StackNavigationProp<any>; // Replace 'any' with your specific stack param list type if known
};

export const SearchScreen = ({ route, navigation }: SearchScreenProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>SearchScreen</Text>
    </SafeAreaView>
  );
};
