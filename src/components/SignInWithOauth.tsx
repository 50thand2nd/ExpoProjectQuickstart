import React, { useCallback, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { StyleSheet, Pressable, Text } from "react-native";
import GlobalColors from "../styles/colors";
import Toast from "react-native-toast-message";

WebBrowser.maybeCompleteAuthSession();

// Define types for component props
type SignInWithOauthProps = {
  text: string;
  strategy: "oauth_apple" | "oauth_google";
};

export const SignInWithOauth = ({ text, strategy }: SignInWithOauthProps) => {
  const { startOAuthFlow } = useOAuth({ strategy: strategy });
  const [signingIn, setSigningIn] = useState(false);

  const onPress = useCallback(async () => {
    setSigningIn(true);
    try {
      if (signingIn) {
        return;
      }
      const { createdSessionId, setActive, signUp } =
        await startOAuthFlow().catch((error) => {
          console.log(error);
          throw new Error("Failed to start OAuth flow");
        });

      if (createdSessionId) {
        console.log(createdSessionId);
        setActive({ session: createdSessionId });
      } else {
        throw new Error("Failed to create session");
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to sign in or sign up.",
      });
    } finally {
      setSigningIn(false);
    }
  }, [signingIn, startOAuthFlow]);

  return (
    <Pressable style={styles.button} onPress={onPress} disabled={signingIn}>
      <Text
        style={{
          fontFamily: "Montserrat-Regular",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalColors.lightgrey,
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    marginBottom: 12,
  },
});
