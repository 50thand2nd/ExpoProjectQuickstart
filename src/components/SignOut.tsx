import React from "react";
import { View, Text, Image, Button } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useUser } from "@clerk/clerk-expo";

export const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  const { isSignedIn, user, isLoaded: userIsLoaded } = useUser();

  if (!isLoaded || !userIsLoaded || !isSignedIn || !user) {
    return null;
  }

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
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};
