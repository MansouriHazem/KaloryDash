import { changePasswordService } from "@/firebase/Authentication";
import React, { useState } from "react";
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

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidPassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(pass);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match.");
      return;
    }

    if (!isValidPassword(newPassword)) {
      Alert.alert(
        "Password must be at least 8 characters, include one uppercase letter, and one special character."
      );
      return;
    }

    // Here, you'd call your password change function (e.g. Firebase)
    console.log("Changing password:", {
      oldPassword,
      newPassword,
    });

    const userString = await AsyncStorage.getItem("user");
    const user = JSON.parse(userString as string);

    changePasswordService({
      email: user.email,
      newPassword: newPassword,
      oldPassword: oldPassword,
      callback: () => {
        Alert.alert("Success", "Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
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
          Change Password
        </Text>

        <View className="mb-6">
          <Text className="text-base font-medium text-gray-700 mb-2">
            Old Password:
          </Text>
          <TextInput
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
            className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-base text-black"
            placeholder="Enter your old password"
            placeholderTextColor="#999"
          />
        </View>

        <View className="mb-6">
          <Text className="text-base font-medium text-gray-700 mb-2">
            New Password:
          </Text>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-base text-black"
            placeholder="Enter your new password"
            placeholderTextColor="#999"
          />
        </View>

        <View className="mb-6">
          <Text className="text-base font-medium text-gray-700 mb-2">
            Confirm New Password:
          </Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-base text-black"
            placeholder="Confirm your new password"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          onPress={handleChangePassword}
          className="bg-blue-600 py-4 rounded-xl"
          activeOpacity={0.8}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Change Password
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
