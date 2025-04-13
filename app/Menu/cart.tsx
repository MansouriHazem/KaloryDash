import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";
import Botmenu from "@/common/Botmenu";

const cartItems = [
  {
    id: 1,
    name: "Cheeseburger",
    image: "../../assets/images/food.jpg",
    price: 18,
    quantity: 1,
  },
  {
    id: 2,
    name: "Taco Combo",
    image: "../../assets/images/food.jpg",
    price: 18,
    quantity: 2,
  },
];

export default function CartScreen() {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View className="flex-1 bg-white">
      <Text className="text-xl font-bold p-4">My Cart</Text>

      <ScrollView className="px-4 space-y-4">
        {cartItems.map((item) => (
          <View
            key={item.id}
            className="flex-row items-center bg-gray-100 rounded-2xl p-3 shadow-sm"
          >
            <Image
              source={{ uri: item.image }}
              className="w-20 h-20 rounded-xl"
              resizeMode="cover"
            />
            <View className="flex-1 ml-4">
              <Text className="text-base font-semibold">{item.name}</Text>
              <Text className="text-sm text-gray-500">
                {item.price.toFixed(2)} Dt
              </Text>
              <Text className="text-sm text-gray-500">
                Qty: {item.quantity}
              </Text>
            </View>
            <TouchableOpacity>
              <Trash2 size={20} color="#FF4D4F" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View className="p-4 border-t border-gray-200">
        <View className="flex-row justify-between mb-4">
          <Text className="text-lg font-semibold">Total:</Text>
          <Text className="text-lg font-bold">{total.toFixed(2)} Dt</Text>
        </View>
        <TouchableOpacity className="bg-black py-3 rounded-2xl">
          <Text className="text-center text-white font-semibold text-base">
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
      <Botmenu />
    </View>
  );
}
