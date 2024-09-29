import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import GlobalColors from "../styles/colors";
import Swiper from "react-native-swiper";

const Welcome1Image = require("../../assets/images/welcome1.gif");
const Welcome2Image = require("../../assets/images/welcome2.gif");
const Welcome3Image = require("../../assets/images/welcome3.gif");

export const WelcomeScreen = ({ route, navigation }) => {
  const swiperRef = useRef(null);
  const [swiperIndex, setSwiperIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Swiper
          ref={swiperRef}
          index={swiperIndex}
          onIndexChanged={(index) => {
            setSwiperIndex(index);
          }}
          loop={false}
          showsButtons={false}
          style={styles.wrapper}
        >
          <View style={styles.slide}>
            <Image source={Welcome1Image} style={styles.detailImage} />
            <Text style={styles.text}>Welcome to Expo Project Quickstart!</Text>
            <Text style={styles.subtext}>
              This is your new favorite template for building great React Native
              apps!
            </Text>
          </View>
          <View style={styles.slide}>
            <Image source={Welcome2Image} style={styles.detailImage} />
            <Text style={styles.text}>We build apps fast.</Text>
            <Text style={styles.subtext}>
              Our template is designed to get you up and running with an Expo
              project in no time.
            </Text>
          </View>
          <View style={styles.slide}>
            <Image source={Welcome3Image} style={styles.detailImage} />
            <Text style={styles.text}>No, like really fast.</Text>
            <Text style={styles.subtext}>
              We've included a bunch of pre-built components and screens to help
              you get started.
            </Text>
          </View>
        </Swiper>

        <View
          style={{
            width: "100%",
            paddingHorizontal: 24,
          }}
        >
          <Pressable
            style={styles.getStartedButton}
            onPress={() => {
              swiperIndex === 2
                ? navigation.goBack()
                : swiperRef.current.scrollBy(1);
            }}
          >
            <Text style={styles.buttonText}>
              {swiperIndex === 2 ? "Get Started" : "Next"}
            </Text>
          </Pressable>
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
  getStartedButton: {
    marginVertical: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: GlobalColors.blue,
  },
  buttonText: {
    color: GlobalColors.white,
    textAlign: "center",
    fontFamily: "Montserrat-Bold",
  },
  wrapper: {},
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    marginBottom: 100,
  },
  text: {
    color: GlobalColors.black,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Platypi-Bold",
  },
  subtext: {
    color: GlobalColors.black,
    fontSize: 20,
    textAlign: "center",
    marginTop: 12,
    fontFamily: "Montserrat-Regular",
  },
  detailImage: {
    width: 300,
    height: 300,
    marginTop: 100,
    marginBottom: 50,
  },
});
