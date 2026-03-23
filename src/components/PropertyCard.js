// property card component - shows a single property in the list
// used in HomeScreen and SavedScreen

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatRent, getTypeColor } from "../utils/helpers";

function PropertyCard({ property, onPress, onSave, isSaved }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* property image */}
      <Image
        source={{ uri: property.image }}
        style={styles.propertyImage}
        resizeMode="cover"
      />

      <View style={styles.cardContent}>
      {/* top section - type badge and save button */}
      <View style={styles.topRow}>
        <View
          style={[
            styles.typeBadge,
            { backgroundColor: getTypeColor(property.type) },
          ]}
        >
          <Text style={styles.typeText}>{property.type}</Text>
        </View>

        <TouchableOpacity onPress={onSave}>
          <Ionicons
            name={isSaved ? "bookmark" : "bookmark-outline"}
            size={22}
            color={isSaved ? "#FF6B6B" : "#999"}
          />
        </TouchableOpacity>
      </View>

      {/* title */}
      <Text style={styles.title}>{property.title}</Text>

      {/* address */}
      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={14} color="#888" />
        <Text style={styles.address}>{property.address}</Text>
      </View>

      {/* rent and rating */}
      <View style={styles.bottomRow}>
        <Text style={styles.rent}>Rs. {formatRent(property.rent)}/month</Text>

        <View style={styles.ratingBox}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>
            {property.rating} ({property.reviews})
          </Text>
        </View>
      </View>

      {/* amenities - show first 3 only */}
      <View style={styles.amenityRow}>
        {property.amenities.slice(0, 3).map(function (item, index) {
          return (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{item}</Text>
            </View>
          );
        })}
        {property.amenities.length > 3 && (
          <Text style={styles.moreText}>
            +{property.amenities.length - 3} more
          </Text>
        )}
      </View>

      {/* bachelor friendly tag */}
      {property.bachelorAllowed && (
        <View style={styles.bachelorTag}>
          <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
          <Text style={styles.bachelorText}>Bachelor Friendly</Text>
        </View>
      )}
      </View>
    </TouchableOpacity>
  );
}

var styles = StyleSheet.create({
  propertyImage: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 16,
    marginVertical: 8,
    // shadow for android
    elevation: 3,
    // shadow for ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 16,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  address: {
    fontSize: 13,
    color: "#888",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  rent: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7C4DFF",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    color: "#666",
  },
  amenityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
  },
  amenityTag: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  amenityText: {
    fontSize: 11,
    color: "#555",
  },
  moreText: {
    fontSize: 11,
    color: "#999",
    alignSelf: "center",
  },
  bachelorTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bachelorText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "500",
  },
});

export default PropertyCard;
