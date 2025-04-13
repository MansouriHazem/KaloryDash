import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function PageWrapper({ children }: { children: React.ReactNode }) {
  return <SafeAreaView>{children}</SafeAreaView>;
}

export default PageWrapper;
