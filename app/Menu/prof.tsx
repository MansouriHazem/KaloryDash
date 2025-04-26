import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { LogOut, Settings, User, ShoppingBag, Key } from "lucide-react-native";
import Botmenu from "@/common/Botmenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function ProfileScreen() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const GetUser = async () => {
    const logged = await AsyncStorage.getItem("logged");
    if (logged === "true") {
      const userString = await AsyncStorage.getItem("user");
      const user = JSON.parse(userString as string);
      setEmail(user.email);
      setFullName(user.fullName);
    }
  };

  const Logout = async () => {
    await AsyncStorage.removeItem("logged");
    await AsyncStorage.removeItem("user");
    setEmail("");
    setFullName("");
    router.push("/");
  };

  useEffect(() => {
    GetUser();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View className="items-center my-6">
          <Image
            source={require("../../assets/images/avatar.png")}
            className="w-24 h-24 rounded-full"
          />
          <Text className="text-xl font-bold mt-4">{fullName}</Text>
          <Text className="text-sm text-gray-500">{email}</Text>
        </View>

        <View className="space-y-4 mt-6">
          <TouchableOpacity
            onPress={() => {
              router.push("/Menu/editprof");
            }}
            className="flex-row items-center p-4 bg-gray-100 rounded-2xl mb-4"
          >
            <User color="#000" size={20} />
            <Text className="ml-4 text-base">Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/Menu/changepassword" as any);
            }}
            className="flex-row items-center p-4 bg-gray-100 rounded-2xl  mb-4"
          >
            <Key color="#000" size={20} />
            <Text className="ml-4 text-base">Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/Menu/cart");
            }}
            className="flex-row items-center p-4 bg-gray-100 rounded-2xl  mb-4"
          >
            <ShoppingBag color="#000" size={20} />
            <Text className="ml-4 text-base">My Orders</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity
          onPress={Logout}
          className="flex-row items-center justify-center bg-red-500 py-3 rounded-2xl"
        >
          <LogOut color="#fff" size={20} />
          <Text className="ml-2 text-white font-semibold text-base">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <Botmenu />
    </View>
  );
}
