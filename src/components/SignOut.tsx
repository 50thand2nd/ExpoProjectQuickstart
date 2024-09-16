import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  Platform,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useUser } from "@clerk/clerk-expo";
import GlobalColors from "../styles/colors";
import Toast from "react-native-toast-message";
import { BACKEND_URL } from "../constants/constants";

export const SignOut = () => {
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
        <Image source={{ uri: user.imageUrl }} style={styles.userImage} />
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.fullName}>{user.fullName}</Text>
        <Text style={styles.email}>
          {user.primaryEmailAddress.emailAddress}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: Platform.OS === "ios" ? 40 : 0,
          width: "100%",
        }}
      >
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
          <Text
            style={{
              color: GlobalColors.red,
              textAlign: "center",
              fontFamily: "Montserrat-Regular",
            }}
          >
            Delete Account
          </Text>
        </Pressable>
        <Pressable
          style={styles.signOutButton}
          onPress={() => {
            signOut();
          }}
        >
          <Text
            style={{
              color: GlobalColors.black,
              textAlign: "center",
              fontFamily: "Montserrat-Regular",
            }}
          >
            Sign Out
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: GlobalColors.white,
  },
  headerRow: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingBottom: 12,
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
  deleteButton: {
    backgroundColor: GlobalColors.lightgrey,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    marginBottom: 0,
    padding: 10,
    borderRadius: 20,
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
};
