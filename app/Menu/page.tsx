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

const categories = [
  {
    name: "Lunch",
    image: require("../../assets/images/food.jpg"),
  },
  {
    name: "Snack",
    image: require("../../assets/images/snacks.jpg"),
  },
  {
    name: "Drink",
    image: require("../../assets/images/drinks.jpg"),
  },
  {
    name: "Dessert",
    image: require("../../assets/images/dessert.jpg"),
  },
  {
    name: "Breakfast",
    image: require("../../assets/images/breakf.jpg"),
  },
  {
    name: "Dinner",
    image: require("../../assets/images/Dinner.jpg"),
  },
];

export default function App() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      <View className="bg-orange-600 p-4 flex-row justify-between items-center">
        <Text className="text-white text-2xl font-bold">KaloryDash</Text>
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
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              className="w-[48%] h-32 mb-4 rounded-lg overflow-hidden relative"
            >
              <Image
                source={cat.image}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                <Text className="text-white text-lg font-bold">{cat.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="bg-gray-800 p-4 mt-auto">
        <Text className="text-white text-center text-sm">Monastir</Text>
        <Text className="text-white text-center text-sm">Tunisia</Text>
        <View className="flex-row justify-center space-x-4 mt-2">
          <Text className="text-white text-lg"></Text>
          <Text className="text-white text-lg"></Text>
          <Text className="text-white text-lg"></Text>
          <Text className="text-white text-lg"></Text>
        </View>
      </View>
      <Botmenu />
    </View>
  );
}
