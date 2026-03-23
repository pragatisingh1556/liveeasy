// saved screen - shows bookmarked properties
// for now using local state, later can be connected to firebase

import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function SavedScreen({ navigation }) {
  // in a real app, saved properties would come from firebase or async storage
  // for now just showing an empty state since we don't have global state management
  var savedProperties = [];

  function renderEmpty() {
    return (
      <View style={styles.emptyBox}>
        <Ionicons name="bookmark-outline" size={60} color="#ccc" />
        <Text style={styles.emptyTitle}>No saved properties</Text>
        <Text style={styles.emptySubtext}>
          Tap the bookmark icon on any property to save it here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved</Text>
        <Text style={styles.headerSubtitle}>Your bookmarked properties</Text>
      </View>

      <FlatList
        data={savedProperties}
        keyExtractor={function (item) {
          return item.id;
        }}
        renderItem={function ({ item }) {
          return <View />;
        }}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{ flex: 1 }}
      />
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#999",
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 13,
    color: "#bbb",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default SavedScreen;
