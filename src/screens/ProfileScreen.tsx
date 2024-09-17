import React from "react";
import {
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Alert,
} from "react-native";
import GlobalColors from "../styles/colors";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { BACKEND_URL } from "../constants/constants";
import Toast from "react-native-toast-message";

// @ts-ignore
const BackImage = require("../../assets/images/back.png");

export const ProfileScreen = ({ route, navigation }) => {
  const { isLoaded, getToken, signOut } = useAuth();
  const { isSignedIn, user, isLoaded: userIsLoaded } = useUser();

  if (!isLoaded && !userIsLoaded) {
    return null;
  }

  const deleteAccount = async () => {
    try {
      const token = await getToken();
      const email = user.primaryEmailAddress.emailAddress;
      // Make a request to your server to delete the user account
      await fetch(`${BACKEND_URL}/delete_user/${email}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      await user.delete();
      signOut();
      Toast.show({
        type: "success",
        text1: "Account Deleted",
        text2: "Your account has been successfully deleted.",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={BackImage} style={styles.backImage} />
        </Pressable>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainSection}>
          <Image source={{ uri: user.imageUrl }} style={styles.userImage} />
          <Text style={styles.fullName}>{user.fullName}</Text>
          <Text style={styles.email}>
            {user.primaryEmailAddress.emailAddress}
          </Text>
        </View>
        <View style={styles.footerSection}>
          <Pressable
            style={styles.deleteButton}
            onPress={() => {
              // confirm delete account
              Alert.alert(
                "Delete Account",
                "Are you sure you want to delete your account? This action cannot be undone.",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                  },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                      deleteAccount();
                    },
                  },
                ]
              );
            }}
          >
            <Text style={styles.deleteText}>Delete Account</Text>
          </Pressable>
          <Pressable
            style={styles.signOutButton}
            onPress={() => {
              signOut();
            }}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
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
  mainSection: {
    padding: 24,
    alignItems: "center",
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  fullName: {
    fontSize: 24,
    fontFamily: "Montserrat-Bold",
  },
  email: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    marginTop: 6,
  },
  backImage: {
    width: 28,
    height: 28,
    tintColor: GlobalColors.black,
  },
  footerSection: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 40 : 0,
    width: "100%",
  },
  deleteButton: {
    backgroundColor: GlobalColors.lightgrey,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    marginBottom: 0,
    padding: 10,
    borderRadius: 20,
  },
  deleteText: {
    color: GlobalColors.red,
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
  },
  signOutButton: {
    backgroundColor: GlobalColors.lightgrey,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    marginBottom: 16,
    padding: 10,
    borderRadius: 20,
  },
  signOutText: {
    color: GlobalColors.black,
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
  },
});
