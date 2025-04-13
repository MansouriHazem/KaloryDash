import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Botmenu from "@/common/Botmenu";
import { router } from "expo-router";

const cartItems = [
  {
    id: 1,
    name: "Cheeseburger",
    image: "https://source.unsplash.com/200x200/?burger",
    Calories: 300,
    quantity: 1,
  },
  {
    id: 2,
    name: "Taco Combo",
    image: "https://source.unsplash.com/200x200/?taco",
    Calories: 450,
    quantity: 2,
  },
];

const caloriesToSteps = (calories) => Math.round(calories * 20);

export default function CaloriesScreen() {
  const navigation = useNavigation();
  const totalCalories = cartItems.reduce(
    (sum, item) => sum + item.Calories * item.quantity,
    0
  );
  const totalSteps = caloriesToSteps(totalCalories);

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <ScrollView className="px-4 pt-6 space-y-4">
        <Text className="text-2xl font-bold text-gray-800">
          Calories Tracker
        </Text>

        <Image
          source={{ uri: "https://source.unsplash.com/500x300/?fitness,steps" }}
          className="w-full h-44 rounded-2xl mt-4"
        />

        {cartItems.map((item) => (
          <View
            key={item.id}
            className="flex-row bg-white rounded-2xl shadow-sm p-4 items-center space-x-4"
          >
            <Image
              source={{ uri: item.image }}
              className="w-20 h-20 rounded-xl"
            />
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">
                {item.name}
              </Text>
              <Text className="text-sm text-gray-500">
                Calories: {item.Calories} kcal
              </Text>
              <Text className="text-sm text-gray-500">
                Qty: {item.quantity}
              </Text>
            </View>
          </View>
        ))}

        <TouchableOpacity
          className="bg-black py-4 rounded-2xl mt-6"
          onPress={() =>
            router.push(
              `/Menu/summary?totalCalories=${totalCalories}&totalSteps=${totalSteps}`
            )
          }
        >
          <Text className="text-center text-white font-semibold text-base">
            I'm Ready to Burn!
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Botmenu />
    </View>
  );
}
