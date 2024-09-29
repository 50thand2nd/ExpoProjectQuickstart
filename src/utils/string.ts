import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";

export const copyToClipboard = async (textToCopy: string) => {
  await Clipboard.setStringAsync(textToCopy);
  Toast.show({
    type: "success",
    text1: "Copied to clipboard",
    text2: `"${textToCopy}"`,
  });
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};
