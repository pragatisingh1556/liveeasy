// map screen - shows properties on a mapbox map
// users can tap on markers to see property details
// note: mapbox needs an access token to work

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import sampleProperties from "../utils/sampleData";
import { formatRent } from "../utils/helpers";

// mapbox doesn't work great with expo go, so showing a placeholder map
// in production, you would use @rnmapbox/maps with an actual token

function MapScreen({ navigation }) {
  var [selectedProperty, setSelectedProperty] = useState(null);

  function handlePropertyTap(property) {
    setSelectedProperty(property);
  }

  function goToDetails() {
    if (selectedProperty) {
      navigation.navigate("Details", { property: selectedProperty });
    }
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Map View</Text>
        <Text style={styles.headerSubtitle}>
          {sampleProperties.length} properties nearby
        </Text>
      </View>

      {/* map placeholder */}
      <View style={styles.mapArea}>
        <Ionicons name="map" size={80} color="#B0D4F1" />
        <Text style={styles.mapText}>Mapbox Map View</Text>
        <Text style={styles.mapSubtext}>
          Properties are shown as pins on the map.
        </Text>
        <Text style={styles.mapSubtext}>
          Add your Mapbox token in config/mapbox.js to enable.
        </Text>
      </View>

      {/* property pins list - shown as cards since we can't render actual map in expo go */}
      <View style={styles.pinList}>
        <Text style={styles.pinListTitle}>Property Locations</Text>
        {sampleProperties.map(function (property) {
          var isSelected =
            selectedProperty && selectedProperty.id === property.id;
          return (
            <TouchableOpacity
              key={property.id}
              style={[styles.pinCard, isSelected && styles.pinCardSelected]}
              onPress={function () {
                handlePropertyTap(property);
              }}
            >
              <View style={styles.pinIcon}>
                <Ionicons name="location" size={20} color="#7C4DFF" />
              </View>
              <View style={styles.pinInfo}>
                <Text style={styles.pinTitle} numberOfLines={1}>
                  {property.title}
                </Text>
                <Text style={styles.pinAddress}>{property.address}</Text>
              </View>
              <Text style={styles.pinRent}>
                Rs. {formatRent(property.rent)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* bottom card for selected property */}
      {selectedProperty && (
        <TouchableOpacity style={styles.bottomCard} onPress={goToDetails}>
          <View>
            <Text style={styles.bottomTitle}>{selectedProperty.title}</Text>
            <Text style={styles.bottomAddress}>
              {selectedProperty.address}
            </Text>
          </View>
          <View style={styles.bottomRight}>
            <Text style={styles.bottomRent}>
              Rs. {formatRent(selectedProperty.rent)}/mo
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#7C4DFF" />
          </View>
        </TouchableOpacity>
      )}
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
  mapArea: {
    height: 200,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
    borderRadius: 12,
  },
  mapText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64B5F6",
    marginTop: 8,
  },
  mapSubtext: {
    fontSize: 12,
    color: "#90CAF9",
    marginTop: 4,
    textAlign: "center",
  },
  pinList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pinListTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  pinCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  pinCardSelected: {
    borderWidth: 2,
    borderColor: "#7C4DFF",
  },
  pinIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  pinInfo: {
    flex: 1,
  },
  pinTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  pinAddress: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  pinRent: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#7C4DFF",
  },
  bottomCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  bottomTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  bottomAddress: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  bottomRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bottomRent: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7C4DFF",
  },
});

export default MapScreen;
