import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Store,
  ShoppingCart,
  Home,
  User,
  Settings,
  Salad,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

function Botmenu() {
  return (
    <View className="fixed bottom-0 h-[10vh] w-full shadow-2xl flex-row justify-around items-center px-4">
      <MenuItem
        icon={<Salad size={24} color="black" />}
        label="Kalory's"
        link="/Menu/Kalory"
      />
      <MenuItem
        icon={<ShoppingCart size={24} color="black" />}
        label="Cart"
        link="/Menu/cart"
      />
      <MenuItem
        icon={<Home size={24} color="black" />}
        label="Home"
        link="/Menu/mainp"
      />
      <MenuItem
        icon={<User size={24} color="black" />}
        label="Profile"
        link="/Menu/prof"
      />
    </View>
  );
}

function MenuItem({
  icon,
  label,
  link,
}: {
  icon: any;
  label: string;
  link: any;
}) {
  return (
    <Link href={link}>
      <View className="flex items-center justify-center flex-col">
        {icon}
        <Text className="text-black text-xs mt-1">{label}</Text>
      </View>
    </Link>
  );
}

export default Botmenu;
