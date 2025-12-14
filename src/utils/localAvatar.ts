import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const AVATAR_KEY = "LOCAL_PROFILE_AVATAR";

export async function pickAndSaveLocalAvatar() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.8,
  });

  if (result.canceled || !result.assets?.length) return null;

  const uri = result.assets[0].uri;
  await AsyncStorage.setItem(AVATAR_KEY, uri);
  return uri;
}

export async function loadLocalAvatar() {
  return await AsyncStorage.getItem(AVATAR_KEY);
}

export async function clearLocalAvatar() {
  await AsyncStorage.removeItem(AVATAR_KEY);
}
