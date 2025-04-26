import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  Bike,
  Dumbbell,
  Egg,
  Footprints,
  Mail,
  PersonStanding,
  WavesLadder,
} from "lucide-react-native";

export default function SummaryScreen() {
  const { totalCalories } = useLocalSearchParams();

  const calories = parseInt(totalCalories as any) || 0;

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <ScrollView className="px-4 pt-10 space-y-6">
        <Text className="text-2xl font-bold text-center text-gray-800">
          Burn Summary
        </Text>

        <Image
          source={require("../../assets/images/run.jpg")}
          className="w-full h-52 rounded-2xl"
        />

        <View className="bg-white rounded-2xl shadow-sm p-5">
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            Total Calories Consumed:{" "}
            <Text className="text-xl font-bold text-orange-600">
              {calories} Cal
            </Text>
          </Text>

          <Text className="text-lg font-semibold text-gray-800 mb-4">
            here are some suggestions to
            <Text className="text-xl font-bold text-blue-600"> Burn :</Text>
          </Text>

          <NotificationCard
            title="Walking"
            subTitle={`Walk for ${Math.round(calories / 4 / 60)} Hours.`} // Burn 4 calories per minute
            Icon={Footprints}
          />
          <NotificationCard
            title="Running"
            subTitle={`Run for ${Math.round(calories / 10 / 60)} Hours.`} // Burn 10 calories per minute
            Icon={PersonStanding}
          />
          <NotificationCard
            title="Cycling"
            subTitle={`Cycle for ${Math.round(calories / 7 / 60)} Hours.`} // Burn 7 calories per minute
            Icon={Bike}
          />
          <NotificationCard
            title="Gym"
            subTitle={`Workout for ${Math.round(calories / 8 / 60)} Hours.`} // Burn 8 calories per minute
            Icon={Dumbbell}
          />
          <NotificationCard
            title="Swimming"
            subTitle={`Swim for ${Math.round(calories / 8 / 60)} Hours.`} // Burn 8 calories per minute
            Icon={WavesLadder}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const NotificationCard = ({
  title = "",
  subTitle = "",
  Icon = null,
}: {
  title?: string;
  subTitle?: string;
  Icon?: any;
}) => {
  return (
    <View className="w-full my-2">
      <View className="flex flex-row items-center border border-black rounded-lg overflow-hidden">
        {/* Icon Container */}
        <View className="flex items-center justify-center aspect-square p-6 bg-white">
          {Icon && (
            <Icon
              size={45}
              color="black"
              className="h-[45px] w-[45px] text-black"
            />
          )}
        </View>

        {/* Vertical Separator */}
        <View className="w-px h-full bg-black" />

        {/* Text Content */}
        <View className="flex flex-col px-4">
          <Text className="font-medium text-2xl">{title}</Text>
          <Text className="text-lg text-gray-500">{subTitle}</Text>
        </View>
      </View>
    </View>
  );
};
