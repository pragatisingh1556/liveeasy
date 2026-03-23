// filter modal - lets user filter properties by type, rent range, etc.
// shows up when user taps the filter icon on home screen

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

var propertyTypes = ["All", "1BHK", "2BHK", "3BHK", "PG", "Studio"];

var rentRanges = [
  { label: "Any", min: 0, max: 999999 },
  { label: "Under 5K", min: 0, max: 5000 },
  { label: "5K - 10K", min: 5000, max: 10000 },
  { label: "10K - 15K", min: 10000, max: 15000 },
  { label: "15K - 25K", min: 15000, max: 25000 },
  { label: "25K+", min: 25000, max: 999999 },
];

function FilterModal({ visible, onClose, onApply, currentFilters }) {
  var [selectedType, setSelectedType] = useState(
    currentFilters.type || "All"
  );
  var [selectedRent, setSelectedRent] = useState(
    currentFilters.rentIndex || 0
  );
  var [bachelorOnly, setBachelorOnly] = useState(
    currentFilters.bachelorOnly || false
  );
  var [nonVegAllowed, setNonVegAllowed] = useState(
    currentFilters.nonVegAllowed || false
  );

  function handleApply() {
    onApply({
      type: selectedType,
      rentIndex: selectedRent,
      rentMin: rentRanges[selectedRent].min,
      rentMax: rentRanges[selectedRent].max,
      bachelorOnly: bachelorOnly,
      nonVegAllowed: nonVegAllowed,
    });
    onClose();
  }

  function handleReset() {
    setSelectedType("All");
    setSelectedRent(0);
    setBachelorOnly(false);
    setNonVegAllowed(false);
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* property type */}
            <Text style={styles.sectionTitle}>Property Type</Text>
            <View style={styles.chipRow}>
              {propertyTypes.map(function (type) {
                var isActive = selectedType === type;
                return (
                  <TouchableOpacity
                    key={type}
                    style={[styles.chip, isActive && styles.chipActive]}
                    onPress={function () {
                      setSelectedType(type);
                    }}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isActive && styles.chipTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* rent range */}
            <Text style={styles.sectionTitle}>Monthly Rent</Text>
            <View style={styles.chipRow}>
              {rentRanges.map(function (range, index) {
                var isActive = selectedRent === index;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.chip, isActive && styles.chipActive]}
                    onPress={function () {
                      setSelectedRent(index);
                    }}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isActive && styles.chipTextActive,
                      ]}
                    >
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* toggles */}
            <Text style={styles.sectionTitle}>Preferences</Text>

            <TouchableOpacity
              style={styles.toggleRow}
              onPress={function () {
                setBachelorOnly(!bachelorOnly);
              }}
            >
              <Text style={styles.toggleLabel}>Bachelor Friendly Only</Text>
              <Ionicons
                name={bachelorOnly ? "checkbox" : "square-outline"}
                size={22}
                color={bachelorOnly ? "#7C4DFF" : "#999"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toggleRow}
              onPress={function () {
                setNonVegAllowed(!nonVegAllowed);
              }}
            >
              <Text style={styles.toggleLabel}>Non-Veg Allowed</Text>
              <Ionicons
                name={nonVegAllowed ? "checkbox" : "square-outline"}
                size={22}
                color={nonVegAllowed ? "#7C4DFF" : "#999"}
              />
            </TouchableOpacity>
          </ScrollView>

          {/* buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
              <Text style={styles.applyText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

var styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
    marginTop: 15,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  chipActive: {
    backgroundColor: "#7C4DFF",
    borderColor: "#7C4DFF",
  },
  chipText: {
    fontSize: 13,
    color: "#555",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  toggleLabel: {
    fontSize: 14,
    color: "#444",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  resetBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    alignItems: "center",
  },
  resetText: {
    fontSize: 15,
    color: "#666",
    fontWeight: "600",
  },
  applyBtn: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#7C4DFF",
    alignItems: "center",
  },
  applyText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FilterModal;
