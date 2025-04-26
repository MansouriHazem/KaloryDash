import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Botmenu from "@/common/Botmenu";
import { useLocalSearchParams } from "expo-router";
import { data } from "@/data/data";
import { CircleMinus, CirclePlus, Plus } from "lucide-react-native";
import { AddPlateToUserOrders } from "@/firebase/orderServices";

export default function MenuScreen() {
  const { resto, category } = useLocalSearchParams();

  const SelectedResto = data.find((oneItem) => {
    return oneItem.key === resto;
  });

  const SelectedCategory = SelectedResto?.categories.find((oneItem) => {
    return oneItem.name === category;
  });

  const plates = SelectedCategory?.plates as any[];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4 flex-row justify-between items-center">
        <Text className="text-xl font-bold">Our Menu</Text>
        <Ionicons name="cart-outline" size={24} color="black" />
      </View>

      <View className="flex-row justify-around mt-4">
        <Text className="text-orange-500 border-b-2 border-orange-500 pb-1">
          {resto} {category}
        </Text>
      </View>

      <ScrollView className="mt-4 px-4">
        <View className="flex-row flex-wrap justify-between">
          {plates.map((item) => (
            <View
              key={item.id}
              className="w-[48%] bg-slate-100 mb-4 rounded-xl shadow p-2"
            >
              <Image
                source={item.image}
                className="w-full h-28 rounded-xl"
                resizeMode="cover"
              />
              <View className="w-full flex flex-row px-2 items-stretch justify-between">
                <View className="w-2/3">
                  <Text className="mt-2 text-sm font-semibold text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="text-orange-500 font-bold">
                    {item.price}
                  </Text>
                </View>
                <View className="w-1/3 flex items-center justify-center">
                  <Pressable
                    onPress={() => {
                      AddPlateToUserOrders(item.id, () => {});
                    }}
                    className="pt-2 pl-3"
                  >
                    <CirclePlus size={25} color="orange" />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Botmenu />
    </SafeAreaView>
  );
}
