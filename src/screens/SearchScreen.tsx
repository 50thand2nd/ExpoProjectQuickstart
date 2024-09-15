import React from "react";
import {
  Text,
  Image,
  SafeAreaView,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import GlobalColors from "../styles/colors";

// Images
const ProfileImage = require("../../assets/images/user.png");

// Define the types for route and navigation
type SearchScreenProps = {
  route: RouteProp<any>; // Replace 'any' with your specific route params type if known
  navigation: StackNavigationProp<any>; // Replace 'any' with your specific stack param list type if known
};

type Query = {
  query: string;
};

export const SearchScreen = ({ route, navigation }: SearchScreenProps) => {
  const { query } = route.params as Query;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeRow}>
        <Text style={styles.welcomeMessage}>Search</Text>
        <Pressable
          style={{
            backgroundColor: GlobalColors.white,
            paddingVertical: 20,
            paddingHorizontal: 28,
            marginRight: -22,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          }}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Image source={ProfileImage} style={styles.userImage} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.white,
  },
  welcomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingBottom: 0,
  },
  welcomeMessage: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Platypi-Bold",
    color: GlobalColors.black,
  },
  userImage: {
    width: 28,
    height: 28,
    tintColor: GlobalColors.black,
  },
});
