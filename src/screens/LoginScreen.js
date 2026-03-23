// login screen - first screen of the app
// user needs to login or sign up before seeing properties

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function LoginScreen({ onLogin }) {
  var [showSignUp, setShowSignUp] = useState(false);
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [name, setName] = useState("");
  var [showPassword, setShowPassword] = useState(false);

  // validate email format
  function isValidEmail(text) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  }

  // handle login
  function handleLogin() {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    // pass user data to App.js
    onLogin({
      name: email.split("@")[0],
      email: email,
    });
  }

  // handle sign up
  function handleSignUp() {
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    onLogin({
      name: name,
      email: email,
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* app logo and name */}
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Ionicons name="home" size={40} color="#fff" />
          </View>
          <Text style={styles.appName}>LiveEasy</Text>
          <Text style={styles.tagline}>
            Find bachelor-friendly housing near you
          </Text>
        </View>

        {/* form card */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            {showSignUp ? "Create Account" : "Login"}
          </Text>

          {/* name field - only for sign up */}
          {showSignUp && (
            <View style={styles.inputBox}>
              <Ionicons name="person-outline" size={18} color="#999" />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#bbb"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          )}

          {/* email field */}
          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={18} color="#999" />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#bbb"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* password field */}
          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={18} color="#999" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#bbb"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={function () {
                setShowPassword(!showPassword);
              }}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={18}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* forgot password - only for login */}
          {!showSignUp && (
            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          {/* login / sign up button */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={showSignUp ? handleSignUp : handleLogin}
          >
            <Text style={styles.submitBtnText}>
              {showSignUp ? "Sign Up" : "Login"}
            </Text>
          </TouchableOpacity>

          {/* switch between login and sign up */}
          <TouchableOpacity
            style={styles.switchBtn}
            onPress={function () {
              setShowSignUp(!showSignUp);
              setName("");
              setEmail("");
              setPassword("");
            }}
          >
            <Text style={styles.switchText}>
              {showSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <Text style={styles.switchHighlight}>
                {showSignUp ? "Login" : "Sign Up"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7C4DFF",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 30,
  },
  logoSection: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  tagline: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 6,
  },
  formCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#333",
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  forgotText: {
    fontSize: 13,
    color: "#7C4DFF",
  },
  submitBtn: {
    backgroundColor: "#7C4DFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchBtn: {
    marginTop: 20,
    alignItems: "center",
  },
  switchText: {
    fontSize: 13,
    color: "#888",
  },
  switchHighlight: {
    color: "#7C4DFF",
    fontWeight: "600",
  },
});

export default LoginScreen;
