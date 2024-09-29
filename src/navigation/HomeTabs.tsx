import React from "react";
import { Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GlobalColors from "../styles/colors";
import * as Haptics from "expo-haptics";

import { HomeScreen } from "../screens/HomeScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeImage = require("../../assets/images/home.png");
const SearchImage = require("../../assets/images/search.png");

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  const handleTabPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    // scroll to top
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: GlobalColors.black,
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: GlobalColors.white,
          height: 90,
          borderTopWidth: 0,
          paddingTop: 12,
        },
        tabBarItemStyle: {
          paddingVertical: 0,
        },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let image;
          if (route.name === "Home Tab") {
            image = HomeImage;
          } else if (route.name === "Search Tab") {
            image = SearchImage;
          }
          return (
            <TouchableOpacity
              onPress={handleTabPress}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={image}
                style={{
                  width: 28,
                  height: 28,
                  tintColor: color,
                  alignSelf: "center",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: color,
                  textAlign: "center",
                  marginTop: 8,
                  fontFamily: "Montserrat-Regular",
                }}
              >
                {route.name.replace(" Tab", "")}
              </Text>
            </TouchableOpacity>
          );
        },
      })}
    >
      <Tab.Screen name="Home Tab" component={HomeScreen} />
      <Tab.Screen name="Search Tab" component={SearchScreen} />
    </Tab.Navigator>
  );
};
