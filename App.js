// LiveEasy - Bachelor Friendly Smart Housing Finder
// main app file - sets up navigation (tabs + stack)
// shows login screen first, then tabs after login

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// screens
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import SavedScreen from "./src/screens/SavedScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import DetailsScreen from "./src/screens/DetailsScreen";

var Tab = createBottomTabNavigator();
var Stack = createStackNavigator();

// bottom tab navigator - home, map, saved, profile
function TabNavigator({ user, onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={function ({ route }) {
        return {
          headerShown: false,
          tabBarActiveTintColor: "#7C4DFF",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopColor: "#EEE",
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
          tabBarIcon: function ({ focused, color, size }) {
            var iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Map") {
              iconName = focused ? "map" : "map-outline";
            } else if (route.name === "Saved") {
              iconName = focused ? "bookmark" : "bookmark-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={22} color={color} />;
          },
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen
        name="Profile"
        children={function () {
          return <ProfileScreen user={user} onLogout={onLogout} />;
        }}
      />
    </Tab.Navigator>
  );
}

// main app - manages login state
export default function App() {
  var [user, setUser] = useState(null);

  // called when user logs in
  function handleLogin(userData) {
    setUser(userData);
  }

  // called when user logs out
  function handleLogout() {
    setUser(null);
  }

  // if not logged in, show login screen
  if (!user) {
    return (
      <>
        <StatusBar style="light" />
        <LoginScreen onLogin={handleLogin} />
      </>
    );
  }

  // if logged in, show the main app
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main">
          {function () {
            return <TabNavigator user={user} onLogout={handleLogout} />;
          }}
        </Stack.Screen>
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
