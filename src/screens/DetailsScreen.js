// details screen - shows full info about a property
// opens when user taps on a property card

import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatRent, getTypeColor } from "../utils/helpers";

function DetailsScreen({ route, navigation }) {
  var property = route.params.property;

  // open phone dialer
  function handleCall() {
    var phoneUrl = "tel:" + property.ownerPhone.replace(/\s/g, "");
    Linking.canOpenURL(phoneUrl).then(function (supported) {
      if (supported) {
        Linking.openURL(phoneUrl);
      } else {
        Alert.alert("Error", "Cannot make phone calls on this device");
      }
    });
  }

  // open whatsapp with a pre-filled message
  function handleWhatsApp() {
    var phone = property.ownerPhone.replace(/\s/g, "").replace("+", "");
    var message =
      "Hi, I found your property '" +
      property.title +
      "' on LiveEasy. Is it still available?";
    var whatsappUrl =
      "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

    Linking.openURL(whatsappUrl).catch(function () {
      Alert.alert("Error", "WhatsApp is not installed");
    });
  }

  return (
    <View style={styles.container}>
      {/* back button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={function () {
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* property image */}
        <Image
          source={{ uri: property.image }}
          style={styles.propertyImage}
          resizeMode="cover"
        />

        {/* main info */}
        <View style={styles.mainInfo}>
          <View style={styles.titleRow}>
            <View
              style={[
                styles.typeBadge,
                { backgroundColor: getTypeColor(property.type) },
              ]}
            >
              <Text style={styles.typeText}>{property.type}</Text>
            </View>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>
                {property.rating} ({property.reviews} reviews)
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{property.title}</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color="#7C4DFF" />
            <Text style={styles.address}>{property.address}</Text>
          </View>
        </View>

        {/* rent and deposit */}
        <View style={styles.rentCard}>
          <View style={styles.rentItem}>
            <Text style={styles.rentLabel}>Monthly Rent</Text>
            <Text style={styles.rentValue}>
              Rs. {formatRent(property.rent)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.rentItem}>
            <Text style={styles.rentLabel}>Deposit</Text>
            <Text style={styles.rentValue}>
              Rs. {formatRent(property.deposit)}
            </Text>
          </View>
        </View>

        {/* details section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>

          <View style={styles.detailRow}>
            <Ionicons name="bed-outline" size={18} color="#666" />
            <Text style={styles.detailLabel}>Furnishing:</Text>
            <Text style={styles.detailValue}>{property.furnishing}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="people-outline" size={18} color="#666" />
            <Text style={styles.detailLabel}>Bachelors:</Text>
            <Text
              style={[
                styles.detailValue,
                { color: property.bachelorAllowed ? "#4CAF50" : "#F44336" },
              ]}
            >
              {property.bachelorAllowed ? "Allowed" : "Not Allowed"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="restaurant-outline" size={18} color="#666" />
            <Text style={styles.detailLabel}>Non-Veg:</Text>
            <Text
              style={[
                styles.detailValue,
                { color: property.nonVegAllowed ? "#4CAF50" : "#F44336" },
              ]}
            >
              {property.nonVegAllowed ? "Allowed" : "Not Allowed"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="person-outline" size={18} color="#666" />
            <Text style={styles.detailLabel}>Guest Policy:</Text>
            <Text style={styles.detailValue}>{property.guestPolicy}</Text>
          </View>
        </View>

        {/* amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenityGrid}>
            {property.amenities.map(function (amenity, index) {
              return (
                <View key={index} style={styles.amenityItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color="#4CAF50"
                  />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* owner info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Owner</Text>
          <View style={styles.ownerCard}>
            <View style={styles.ownerAvatar}>
              <Ionicons name="person" size={24} color="#fff" />
            </View>
            <View>
              <Text style={styles.ownerName}>{property.ownerName}</Text>
              <Text style={styles.ownerPhone}>{property.ownerPhone}</Text>
            </View>
          </View>
        </View>

        {/* extra space at bottom for buttons */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* contact buttons - fixed at bottom */}
      <View style={styles.contactBar}>
        <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.btnText}>Call Owner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.whatsappBtn} onPress={handleWhatsApp}>
          <Ionicons name="logo-whatsapp" size={20} color="#fff" />
          <Text style={styles.btnText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  propertyImage: {
    width: "100%",
    height: 250,
  },
  mainInfo: {
    padding: 16,
    backgroundColor: "#fff",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  typeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  address: {
    fontSize: 14,
    color: "#666",
  },
  rentCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  rentItem: {
    flex: 1,
    alignItems: "center",
  },
  rentLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  rentValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7C4DFF",
  },
  divider: {
    width: 1,
    backgroundColor: "#E0E0E0",
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    width: 90,
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  amenityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: "45%",
    marginBottom: 6,
  },
  amenityText: {
    fontSize: 13,
    color: "#555",
  },
  ownerCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  ownerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#7C4DFF",
    justifyContent: "center",
    alignItems: "center",
  },
  ownerName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  ownerPhone: {
    fontSize: 13,
    color: "#888",
  },
  contactBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 16,
    paddingBottom: 30,
    backgroundColor: "#fff",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  callBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#7C4DFF",
    paddingVertical: 14,
    borderRadius: 10,
  },
  whatsappBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#25D366",
    paddingVertical: 14,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default DetailsScreen;
