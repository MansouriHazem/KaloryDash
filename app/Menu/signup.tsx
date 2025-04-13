import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Link, router } from "expo-router";
import { register } from "@/firebase/Authentication";

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  const isValidEmail = (email) =>
    /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,4}$/.test(email);
  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handleSignup = () => {
    let emailValid = isValidEmail(email);
    let passwordValid = isValidPassword(password);
    let confirmPasswordValid = password === confirmPassword;
    let fullNameValid = fullName.trim() !== "";

    setEmailError(emailValid ? "" : "Please enter a valid email address.");
    setPasswordError(
      passwordValid
        ? ""
        : "Password must be at least 8 characters, include one uppercase letter, and one special character."
    );
    setConfirmPasswordError(
      confirmPasswordValid ? "" : "Passwords do not match."
    );
    setFullNameError(fullNameValid ? "" : "Full name is required.");

    if (emailValid && passwordValid && confirmPasswordValid && fullNameValid) {
      register({
        email,
        fullName,
        password,
        callback: () => router.push("/Menu/mainp"),
      });
    }
  };

  return (
    <View className="flex-1  bg-[#1E1F2F] px-6 justify-center items-center">
      <Image
        source={require("@/assets/images/logo.png")}
        className="w-24 h-24 mb-6"
        resizeMode="contain"
      />

      <Text className="text-white text-3xl font-bold mb-8">Create Account</Text>

      <View className="w-full mb-4">
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            if (text.trim()) setFullNameError("");
          }}
          className="w-full h-14 bg-white/90 text-black px-4 rounded-2xl mb-1 shadow-md"
        />
        {fullNameError ? (
          <Text className="text-red-400 text-sm">{fullNameError}</Text>
        ) : null}
      </View>

      <View className="w-full mb-4">
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (isValidEmail(text)) setEmailError("");
          }}
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
          onChangeText={(text) => {
            setPassword(text);
            if (isValidPassword(text)) setPasswordError("");
          }}
          className="w-full h-14 bg-white/90 text-black px-4 rounded-2xl mb-1 shadow-md"
        />
        {passwordError ? (
          <Text className="text-red-400 text-sm">{passwordError}</Text>
        ) : null}
      </View>

      <View className="w-full mb-4">
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (text === password) setConfirmPasswordError("");
          }}
          className="w-full h-14 bg-white/90 text-black px-4 rounded-2xl mb-1 shadow-md"
        />
        {confirmPasswordError ? (
          <Text className="text-red-400 text-sm">{confirmPasswordError}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={handleSignup}
        className="w-full h-14 bg-orange-500 rounded-2xl flex items-center justify-center shadow-md mt-2"
      >
        <Text className="text-white font-bold text-lg">Sign Up</Text>
      </TouchableOpacity>

      <View className="flex-row mt-6">
        <Text className="text-white">Already have an account?</Text>
        <Link href="/Menu/login">
          <Text className="text-orange-400 font-semibold underline ml-1">
            Login
          </Text>
        </Link>
      </View>
    </View>
  );
};

export default SignupScreen;
