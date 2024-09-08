import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GlobalColors from "../styles/colors";

import { HomeScreen } from "../screens/HomeScreen";
import { SearchScreen } from "../screens/SearchScreen";

const HomeImage = require("../../assets/images/home.png");
const SearchImage = require("../../assets/images/search.png");

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
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
            <Image
              source={image}
              style={{
                width: 28,
                height: 28,
                tintColor: color,
                alignSelf: "center",
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home Tab" component={HomeScreen} />
      <Tab.Screen name="Search Tab" component={SearchScreen} />
    </Tab.Navigator>
  );
};
