import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUserDataService } from "@/firebase/Authentication";

const EditProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");

  const GetUserData = async () => {
    const userString = await AsyncStorage.getItem("user");
    const user = JSON.parse(userString as string);
    setUsername(user.fullName || "");
    setEmail(user.email || "");
    setHeight(user.height?.toString() || "");
    setWeight(user.weight?.toString() || "");
  };

  useEffect(() => {
    GetUserData();
  }, []);

  const handleSave = async () => {
    updateUserDataService({
      fullName: username,
      newEmail: email,
      height: parseFloat(height),
      weight: parseFloat(weight),
      callback: () => {
        Alert.alert("Profile Updated Successfully");
      },
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} className="bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="px-5 py-8 bg-white"
      >
        <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Profile
        </Text>

        <View className="mb-6">
          <Text className="text-base font-medium text-gray-700 mb-2">
            Username :
          </Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-base text-black"
            placeholder="Enter your username"
            placeholderTextColor="#999"
          />
        </View>

        <View className="mb-6 flex items-center justify-between flex-row">
          <View className="w-[48%]">
            <Text className="text-base font-medium text-gray-700 mb-2">
              Height (cm) :
            </Text>
            <TextInput
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-base text-black w-full"
              placeholder="Enter your height"
              placeholderTextColor="#999"
            />
          </View>

          <View className="w-[48%]">
            <Text className="text-base font-medium text-gray-700 mb-2">
              Weight (kg) :
            </Text>
            <TextInput
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-base text-black w-full"
              placeholder="Enter your weight"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSave}
          className="bg-blue-600 py-4 rounded-xl"
          activeOpacity={0.8}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Save Changes
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
