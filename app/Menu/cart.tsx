import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Minus, MinusCircle, PlusCircle, Trash2 } from "lucide-react-native";
import Botmenu from "@/common/Botmenu";
import {
  AddPlateToUserOrders,
  DecrementPlateInUserOrders,
  DeletePlateInUserOrders,
  GetUserPlateIdsInCart,
} from "@/firebase/orderServices";

export default function CartScreen() {
  const [my_orders, setMyOrders] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const GetMyOrders = () => {
    GetUserPlateIdsInCart(setMyOrders);
  };

  useEffect(() => {
    GetMyOrders();
  }, []);

  useEffect(() => {
    let local_total = 0;
    my_orders.forEach((ord) => {
      let price = Number(ord.price.split(" DT")[0]);
      let qtt = ord.quantity;
      local_total = local_total + price * qtt;
    });
    setTotal(local_total);
  }, [my_orders]);

  return (
    <View className="flex-1 bg-white">
      <Text className="text-xl font-bold p-4">My Cart</Text>

      <ScrollView className="px-4 space-y-4">
        {my_orders.map((item) => (
          <View
            key={item.id}
            className="flex-row items-center bg-gray-100 rounded-2xl p-3 mb-4 shadow-sm"
          >
            <Image
              source={item.image}
              className="w-20 h-20 rounded-xl"
              resizeMode="cover"
            />
            <View className="flex-1 ml-4">
              <Text className="text-base font-semibold">{item.name}</Text>
              <Text className="text-sm text-gray-500">{item.price}</Text>
              <Text className="text-sm text-gray-500">
                Qty: {item.quantity}
              </Text>
            </View>
            <Pressable
              className="mr-2"
              onPress={() => {
                AddPlateToUserOrders(item.id, GetMyOrders);
              }}
            >
              <PlusCircle size={25} color="#00FF4F" />
            </Pressable>
            <Pressable
              className="mr-2"
              onPress={() => {
                DecrementPlateInUserOrders(item.id, GetMyOrders);
              }}
            >
              <MinusCircle size={25} color="#FF4D4F" />
            </Pressable>
            <Pressable
              onPress={() => {
                DeletePlateInUserOrders(item.id, GetMyOrders);
              }}
            >
              <Trash2 size={25} color="#FF4D4F" />
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <View className="p-4 border-t border-gray-200">
        <View className="flex-row justify-between mb-4">
          <Text className="text-lg font-semibold">Total:</Text>
          <Text className="text-lg font-bold">{total} Dt</Text>
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
