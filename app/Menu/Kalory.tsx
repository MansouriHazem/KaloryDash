import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Botmenu from "@/common/Botmenu";
import { router } from "expo-router";
import {
  AddPlateToUserOrders,
  DecrementPlateInUserOrders,
  DeletePlateInUserOrders,
  GetUserPlateIdsInCart,
} from "@/firebase/orderServices";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react-native";

const cartItems = [
  {
    id: 1,
    name: "Cheeseburger",
    image: require("../../assets/images/burger.jpg"),
    Calories: 300,
    quantity: 1,
  },
  {
    id: 2,
    name: "Taco Combo",
    image: require("../../assets/images/burger.jpg"),
    Calories: 450,
    quantity: 2,
  },
];

const caloriesToSteps = (calories) => Math.round(calories * 20);

export default function CaloriesScreen() {
  const [my_orders, setMyOrders] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const GetMyOrders = () => {
    GetUserPlateIdsInCart((items) => {
      setMyOrders(
        items.map((item) => {
          return {
            ...item,
            userQuantity: 1,
          };
        })
      );
    });
  };

  const IncrementUserQuantity = (index = 0) => {
    const local_items = [...my_orders];
    const item = local_items[index];
    if (item.quantity > item.userQuantity) {
      local_items[index].userQuantity += 1;
    }
    setMyOrders(local_items);
  };

  const DecrementUserQuantity = (index = 0) => {
    const local_items = [...my_orders];
    const item = local_items[index];
    if (item.userQuantity > 0) {
      local_items[index].userQuantity -= 1;
    }
    setMyOrders(local_items);
  };

  useEffect(() => {
    GetMyOrders();
  }, []);

  useEffect(() => {
    let local_total = 0;
    my_orders.forEach((ord) => {
      let price = Number(ord.Calories);
      let qtt = ord.userQuantity;
      local_total = local_total + price * qtt;
    });
    setTotal(local_total);
  }, [my_orders]);

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <ScrollView className="px-4 pt-6 space-y-4">
        <Text className="text-2xl font-bold text-gray-800">
          Calories Tracker
        </Text>

        <Image
          source={require("../../assets/images/calo.png")}
          className="w-full h-52 rounded-2xl"
        />

        <ScrollView className="space-y-4">
          {my_orders.map((item, index) => (
            <View
              key={item.id}
              className="flex-row items-center bg-gray-100 rounded-2xl p-3 my-4 shadow-sm"
            >
              <Image
                source={item.image}
                className="w-20 h-20 rounded-xl"
                resizeMode="cover"
              />
              <View className="flex-1 ml-4">
                <Text className="text-base font-semibold">{item.name}</Text>
                <Text className="text-sm text-gray-500">
                  Calories : {item.Calories}
                </Text>
                <Text className="text-sm text-gray-500">
                  Qty: {item.userQuantity}
                </Text>
              </View>
              {item.userQuantity < item.quantity && (
                <Pressable
                  className="mr-2"
                  onPress={() => {
                    IncrementUserQuantity(index);
                  }}
                >
                  <PlusCircle size={25} color="#00FF4F" />
                </Pressable>
              )}
              {item.userQuantity > 0 && (
                <Pressable
                  className="mr-2"
                  onPress={() => {
                    DecrementUserQuantity(index);
                  }}
                >
                  <MinusCircle size={25} color="#FF4D4F" />
                </Pressable>
              )}
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          className="bg-black py-4 rounded-2xl mt-6"
          onPress={() => router.push(`/Menu/summary?totalCalories=${total}`)}
        >
          <Text className="text-center text-white font-semibold text-base">
            I'm Ready to Burn ({total}C) !
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Botmenu />
    </View>
  );
}
