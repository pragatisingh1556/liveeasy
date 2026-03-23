// home screen - main screen of the app
// shows list of properties with search and filter options

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/FilterModal";
import sampleProperties from "../utils/sampleData";

function HomeScreen({ navigation }) {
  var [properties, setProperties] = useState([]);
  var [filteredList, setFilteredList] = useState([]);
  var [searchText, setSearchText] = useState("");
  var [showFilter, setShowFilter] = useState(false);
  var [loading, setLoading] = useState(true);
  var [refreshing, setRefreshing] = useState(false);
  var [savedIds, setSavedIds] = useState([]);
  var [filters, setFilters] = useState({
    type: "All",
    rentIndex: 0,
    rentMin: 0,
    rentMax: 999999,
    bachelorOnly: false,
    nonVegAllowed: false,
  });

  // load properties on start
  useEffect(function () {
    loadProperties();
  }, []);

  // apply search and filters whenever they change
  useEffect(
    function () {
      applyFilters();
    },
    [searchText, filters, properties]
  );

  function loadProperties() {
    setLoading(true);
    // using sample data for now
    // TODO: fetch from firebase later
    setTimeout(function () {
      setProperties(sampleProperties);
      setLoading(false);
    }, 800); // small delay to show loading
  }

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(function () {
      setProperties(sampleProperties);
      setRefreshing(false);
    }, 500);
  }

  function applyFilters() {
    var result = properties;

    // search filter
    if (searchText.length > 0) {
      var query = searchText.toLowerCase();
      result = result.filter(function (item) {
        return (
          item.title.toLowerCase().includes(query) ||
          item.address.toLowerCase().includes(query)
        );
      });
    }

    // type filter
    if (filters.type !== "All") {
      result = result.filter(function (item) {
        return item.type === filters.type;
      });
    }

    // rent filter
    result = result.filter(function (item) {
      return item.rent >= filters.rentMin && item.rent <= filters.rentMax;
    });

    // bachelor filter
    if (filters.bachelorOnly) {
      result = result.filter(function (item) {
        return item.bachelorAllowed === true;
      });
    }

    // non-veg filter
    if (filters.nonVegAllowed) {
      result = result.filter(function (item) {
        return item.nonVegAllowed === true;
      });
    }

    setFilteredList(result);
  }

  function toggleSave(id) {
    if (savedIds.includes(id)) {
      setSavedIds(
        savedIds.filter(function (savedId) {
          return savedId !== id;
        })
      );
    } else {
      setSavedIds([...savedIds, id]);
    }
  }

  // what to show when no properties match
  function renderEmpty() {
    if (loading) return null;
    return (
      <View style={styles.emptyBox}>
        <Ionicons name="home-outline" size={60} color="#ccc" />
        <Text style={styles.emptyTitle}>No properties found</Text>
        <Text style={styles.emptySubtext}>
          Try changing your search or filters
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#7C4DFF" />
        <Text style={styles.loadingText}>Finding properties...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>LiveEasy</Text>
          <Text style={styles.subtitle}>
            Find bachelor-friendly housing near you
          </Text>
        </View>
      </View>

      {/* search bar */}
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onFilterPress={function () {
          setShowFilter(true);
        }}
      />

      {/* results count */}
      <Text style={styles.resultCount}>
        {filteredList.length} properties found
      </Text>

      {/* property list */}
      <FlatList
        data={filteredList}
        keyExtractor={function (item) {
          return item.id;
        }}
        renderItem={function ({ item }) {
          return (
            <PropertyCard
              property={item}
              isSaved={savedIds.includes(item.id)}
              onPress={function () {
                navigation.navigate("Details", { property: item });
              }}
              onSave={function () {
                toggleSave(item.id);
              }}
            />
          );
        }}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#7C4DFF"]}
          />
        }
        contentContainerStyle={
          filteredList.length === 0 ? { flex: 1 } : { paddingBottom: 20 }
        }
      />

      {/* filter modal */}
      <FilterModal
        visible={showFilter}
        onClose={function () {
          setShowFilter(false);
        }}
        onApply={setFilters}
        currentFilters={filters}
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
    paddingBottom: 5,
    backgroundColor: "#fff",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  resultCount: {
    paddingHorizontal: 16,
    fontSize: 13,
    color: "#999",
    marginBottom: 5,
  },
  loadingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  loadingText: {
    marginTop: 10,
    color: "#999",
    fontSize: 14,
  },
  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 5,
  },
});

export default HomeScreen;
