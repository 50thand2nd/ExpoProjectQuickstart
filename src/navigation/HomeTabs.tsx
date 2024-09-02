import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GlobalColors from "../styles/colors";

import { HomeScreen } from "../screens/HomeScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { ProfileScreen } from "../screens/ProfileScreen";

const HomeImage = require("../../assets/images/home.png");
const SearchImage = require("../../assets/images/search.png");
const ProfileImage = require("../../assets/images/user.png");

const Tab = createBottomTabNavigator();

// Define type for screenOptions function parameter
type RouteProps = {
  route: { name: string };
};

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
          } else if (route.name === "Profile Tab") {
            image = ProfileImage;
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
      <Tab.Screen name="Profile Tab" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
