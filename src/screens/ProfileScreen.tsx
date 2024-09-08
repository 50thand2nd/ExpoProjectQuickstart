import React from "react";
import {
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { SignOut } from "../components/SignOut";
import GlobalColors from "../styles/colors";

// @ts-ignore
const BackImage = require("../../assets/images/back.png");

export const ProfileScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={BackImage}
            style={{
              width: 28,
              height: 28,
              tintColor: GlobalColors.black,
            }}
          />
        </Pressable>
      </View>
      <SignOut />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.white,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingBottom: 12,
  },
  welcomeMessage: {
    fontSize: 36,
    fontFamily: "Platypi-Bold",
  },
  title: {
    fontSize: 28,
    lineHeight: 40,
    fontFamily: "Platypi-Bold",
  },
  input: {
    padding: 24,
    fontSize: 18,
    fontFamily: "Platypi-Regular",
  },
});
