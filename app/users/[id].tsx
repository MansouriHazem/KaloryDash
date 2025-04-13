import PageWrapper from "@/common/PageWrapper";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

function UserById() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <PageWrapper>
      <View className="w-full h-full bg-red-500">
        <Text>User Page {id}</Text>
      </View>
    </PageWrapper>
  );
}

export default UserById;
