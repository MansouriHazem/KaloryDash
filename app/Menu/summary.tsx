import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function SummaryScreen() {
  const { totalCalories, totalSteps } = useLocalSearchParams();

  const calories = parseInt(totalCalories) || 0;
  const steps = parseInt(totalSteps) || 0;

  const meters = steps * 0.762;
  const kilometers = (meters / 1000).toFixed(2);

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <ScrollView className="px-4 pt-10 space-y-6">
        <Text className="text-2xl font-bold text-center text-gray-800">
          Burn Summary
        </Text>

        <Image
          source={{
            uri: "https://source.unsplash.com/500x300/?running,health",
          }}
          className="w-full h-52 rounded-2xl"
        />

        <View className="bg-white rounded-2xl shadow-sm p-5">
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            Total Calories Consumed:
          </Text>
          <Text className="text-xl font-bold text-orange-600">
            {calories} kcal
          </Text>

          <Text className="text-lg font-semibold text-gray-800 mt-4 mb-2">
            Steps Required to Burn:
          </Text>
          <Text className="text-xl font-bold text-blue-600">{steps} steps</Text>

          <Text className="text-lg font-semibold text-gray-800 mt-4 mb-2">
            Equivalent Distance:
          </Text>
          <Text className="text-base text-gray-700">
            {meters.toFixed(0)} meters / {kilometers} km
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
