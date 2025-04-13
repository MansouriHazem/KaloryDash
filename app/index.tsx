import { Link, router, useNavigation } from "expo-router";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

import PageWrapper from "@/common/PageWrapper";

function Main() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 justify-center items-center bg-white  relative">
      <View className="w-full h-full absolute top-0 right-0">
        <Image
          source={require("../assets/images/bg.jpg")}
          className="w-full h-full "
          resizeMode="cover"
        />
      </View>
      <View className="w-full h-full px-6 flex justify-center items-center flex-col">
        <Image
          source={require("../assets/images/logo.png")}
          className="w-[50vw] h-[50vw] "
          resizeMode="contain"
        />

        <Text className="text-3xl font-bold mb-2">
          <Text className="text-black-500">Kalory</Text>
          <Text className="text-orange-500">Dash</Text>
        </Text>

        <Text className="text-base text-white mb-8 text-center">
          Bienvenue sur votre guide nutritionnel 🥗
        </Text>
        <Link
          className="bg-orange-500 px-10 py-4 rounded-full"
          href="/Menu/login"
        >
          <Text className="text-white text-lg font-semibold">
            Let's get started
          </Text>
        </Link>
      </View>
    </View>
  );
}

export default Main;

// npm run build
// https://expo.dev/accounts/hazemm/projects/kalorydash
// djej mosli
