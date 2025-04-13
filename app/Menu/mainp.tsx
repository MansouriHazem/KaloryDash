import Botmenu from "@/common/Botmenu";
import { data } from "@/data/data";
import { Link, useNavigation, router } from "expo-router";
import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="px-4 pt-4">
        <Text className="text-2xl font-bold mb-4">Restaurants</Text>
        {data.map((restaurant, index) => (
          <TouchableOpacity
            key={index}
            className="mb-4 bg-white rounded-2xl shadow-md overflow-hidden"
            onPress={() => {
              router.push(restaurant.link as any);
            }}
          >
            <Image
              source={restaurant.image}
              className="w-full h-40"
              resizeMode="cover"
            />

            <View className="p-4">
              <Text className="text-lg font-semibold">{restaurant.name}</Text>
              <Text className="text-gray-600">{restaurant.cuisine}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Botmenu />
    </SafeAreaView>
  );
}
