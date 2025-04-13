import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { Link, router } from "expo-router";
import { login } from "@/firebase/Authentication";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("hatem@gmail.com");
  const [password, setPassword] = useState("aaaAAA55e#f5tg+");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (isValidEmail(text)) setEmailError("");
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (isValidPassword(text)) setPasswordError("");
  };

  const handleLogin = () => {
    let emailValid = true;
    let passwordValid = true;
    setEmailError("");
    setPasswordError("");

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      emailValid = false;
    }

    if (!isValidPassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters, include one uppercase letter, and one special character."
      );
      passwordValid = false;
    }

    if (emailValid && passwordValid) {
      login({
        email,
        password,
        callback: () => {
          router.push("/Menu/mainp");
        },
      });
    }
  };

  return (
    <View className="flex-1 bg-[#1E1F2F]  px-6 justify-center items-center">
      <Image
        source={require("@/assets/images/logo.png")}
        className="w-24 h-24 mb-6"
        resizeMode="contain"
      />

      <Text className="text-white text-3xl font-bold mb-8">Welcome </Text>

      <View className="w-full mb-4">
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={handleEmailChange}
          className="w-full h-14 bg-white/90 text-black px-4 rounded-2xl mb-1 shadow-md"
        />
        {emailError ? (
          <Text className="text-red-400 text-sm">{emailError}</Text>
        ) : null}
      </View>

      <View className="w-full mb-4">
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
          className="w-full h-14 bg-white/90 text-black px-4 rounded-2xl mb-1 shadow-md"
        />
        {passwordError ? (
          <Text className="text-red-400 text-sm">{passwordError}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        className="w-full h-14 bg-orange-500 rounded-2xl flex items-center justify-center shadow-md mt-2"
      >
        <Text className="text-white font-bold text-lg">Log In</Text>
      </TouchableOpacity>

      <View className="flex-row mt-6">
        <Text className="text-white">Don't have an account?</Text>
        <Link href="/Menu/signup">
          <Text className="text-orange-400 font-semibold underline ml-1">
            Sign Up
          </Text>
        </Link>
      </View>
    </View>
  );
};

export default LoginScreen;
