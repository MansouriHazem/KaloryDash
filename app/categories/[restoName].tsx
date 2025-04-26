import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Botmenu from "@/common/Botmenu";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { data } from "@/data/data";

export default function CategoriesPage() {
  const { restoName } = useLocalSearchParams<{ restoName: string }>();
  const Resto = data.find((oneItem) => {
    return oneItem.key === restoName;
  });
  const categories = Resto?.categories as any;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />

      <View className="bg-orange-600 p-4 flex-row justify-between items-center">
        <Text className="text-white text-2xl font-bold">{restoName}</Text>
        <Text className="text-white text-lg">☰</Text>
      </View>

      <Text className="text-xl font-bold text-center mt-4 mb-2 text-gray-800">
        Category
      </Text>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20 }}
        className="space-y-4"
      >
        <View className="flex-row flex-wrap justify-between">
          {categories.map((cat: any, index: any) => (
            <TouchableOpacity
              key={index}
              className="w-[48%] h-32 mb-4 rounded-lg overflow-hidden relative"
              onPress={() => {
                router.push(cat.link);
              }}
            >
              <Image
                source={cat.image}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-[#00000099] bg-opacity-40 flex justify-center items-center w-full h-full">
                <Text className="text-white text-2xl font-bold">
                  {cat.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Botmenu />
    </SafeAreaView>
  );
}
