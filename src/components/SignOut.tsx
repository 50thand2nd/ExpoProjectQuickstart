import React from "react";
import { View, Text, Image, Button } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import { BACKEND_URL } from "../constants/constants";

export const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  const { isSignedIn, user, isLoaded: userIsLoaded } = useUser();

  if (!isLoaded || !userIsLoaded || !isSignedIn || !user) {
    return null;
  }

  const deleteAccount = async () => {
    try {
      // Make a request to your server to delete the user account
      await fetch(
        `${BACKEND_URL}/example_delete/${user.primaryEmailAddress?.emailAddress}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.publicMetadata?.token}`,
          },
        }
      );
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
    <View>
      <Image
        source={{ uri: user.imageUrl as string }} // Casting to string to ensure type
        style={{ width: 100, height: 100 }}
      />
      <Text>{user.id}</Text>
      <Text>{user.fullName}</Text>
      <Text>{user.primaryEmailAddress?.emailAddress}</Text>
      <Text>{user.lastSignInAt?.toString()}</Text>
      <Button
        title="Delete Account"
        onPress={() => {
          deleteAccount();
        }}
      />
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};
