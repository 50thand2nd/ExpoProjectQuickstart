import React from "react";
import {
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import GlobalColors from "../styles/colors";
import { SimpleAnimation } from "react-native-simple-animations";

const LogoImage = require("../../assets/images/icon.png");
const HomeImage = require("../../assets/images/home.png");

export const DetailRow = ({ image, detailTitle, detailText }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginVertical: 16,
    }}
  >
    <View
      style={{
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={image} style={styles.detailImage} />
    </View>
    <View
      style={{
        width: "80%",
        marginLeft: 12,
        paddingRight: 12,
      }}
    >
      <Text numberOfLines={1} style={styles.detailTextBold}>
        {detailTitle}
      </Text>
      <View style={{ height: 4 }} />
      <Text style={styles.detailText}>{detailText}</Text>
    </View>
  </View>
);

export const WelcomeScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="close" size={30} color={GlobalColors.black} />
        </Pressable>
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 24,
            }}
          >
            <Image source={LogoImage} style={styles.userImage} />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 24,
            }}
          >
            <Text style={styles.fullName}>
              Welcome to ExpoProjectQuickstart!
            </Text>
            <SimpleAnimation delay={0} duration={1000} fade staticType="zoom">
              <DetailRow
                image={HomeImage}
                detailTitle="Build Fast"
                detailText="Quickly build your next mobile app project"
              />
            </SimpleAnimation>
            <SimpleAnimation delay={500} duration={1000} fade staticType="zoom">
              <DetailRow
                image={HomeImage}
                detailTitle="Really Fast"
                detailText="Easily customize the app to fit your needs"
              />
            </SimpleAnimation>
            <SimpleAnimation
              delay={1000}
              duration={1000}
              fade
              staticType="zoom"
            >
              <DetailRow
                image={HomeImage}
                detailTitle="No, Really Fast"
                detailText="Build and deploy your app in minutes"
              />
            </SimpleAnimation>
            <SimpleAnimation
              delay={1500}
              duration={1000}
              fade
              staticType="zoom"
            >
              <DetailRow
                image={HomeImage}
                detailTitle="Really, Really Fast"
                detailText="Get started now!"
              />
            </SimpleAnimation>
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
        <View
          style={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            backgroundColor: GlobalColors.white,
          }}
        >
          <SimpleAnimation delay={2000} duration={1000} fade staticType="zoom">
            <Pressable
              style={styles.getStartedButton}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </Pressable>
          </SimpleAnimation>
        </View>
      </SafeAreaView>
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
    fontFamily: "Montserrat-Bold",
    color: GlobalColors.black,
  },
  title: {
    fontSize: 28,
    lineHeight: 40,
    fontFamily: "Montserrat-Bold",
    color: GlobalColors.black,
  },
  input: {
    padding: 24,
    fontSize: 18,
    fontFamily: "Platypi-Regular",
  },
  userImage: {
    width: 125,
    height: 125,
    borderRadius: 150,
  },
  detailImage: {
    width: 36,
    height: 36,
    tintColor: GlobalColors.black,
  },
  fullName: {
    fontSize: 28,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    paddingTop: 24,
    paddingBottom: 24,
    color: GlobalColors.black,
  },
  email: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    paddingTop: 24,
    color: GlobalColors.black,
  },
  detailTextBold: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: GlobalColors.black,
  },
  detailText: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    color: GlobalColors.black,
  },
  getStartedButton: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: GlobalColors.blue,
  },
  buttonText: {
    color: GlobalColors.white,
    textAlign: "center",
    fontFamily: "Montserrat-bold",
  },
});
