// search bar component - used on top of home screen
// simple text input with a search icon

import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function SearchBar({ value, onChangeText, onFilterPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Ionicons name="search" size={18} color="#999" />
        <TextInput
          style={styles.input}
          placeholder="Search by city, area or property name..."
          placeholderTextColor="#aaa"
          value={value}
          onChangeText={onChangeText}
        />
        {value.length > 0 && (
          <TouchableOpacity
            onPress={function () {
              onChangeText("");
            }}
          >
            <Ionicons name="close-circle" size={18} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
        <Ionicons name="options-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    alignItems: "center",
  },
  inputBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  filterBtn: {
    backgroundColor: "#7C4DFF",
    padding: 10,
    borderRadius: 10,
  },
});

export default SearchBar;
