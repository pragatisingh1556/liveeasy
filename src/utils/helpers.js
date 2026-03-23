// helper functions used across the app

// format rent like 8000 -> "8,000"
function formatRent(amount) {
  if (!amount) return "N/A";
  return amount.toLocaleString("en-IN");
}

// get color based on property type
function getTypeColor(type) {
  if (type === "1BHK") return "#4CAF50";
  if (type === "2BHK") return "#7C4DFF";
  if (type === "3BHK") return "#FF9800";
  if (type === "PG") return "#9C27B0";
  if (type === "Studio") return "#00BCD4";
  return "#757575";
}

// calculate distance between two coordinates (in km)
// using haversine formula - learned this from a youtube tutorial
function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // earth radius in km
  var dLat = ((lat2 - lat1) * Math.PI) / 180;
  var dLon = ((lon2 - lon1) * Math.PI) / 180;

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c;

  return Math.round(distance * 10) / 10; // round to 1 decimal
}

// shorten long addresses
function shortenAddress(address) {
  if (!address) return "";
  if (address.length > 40) {
    return address.substring(0, 37) + "...";
  }
  return address;
}

export { formatRent, getTypeColor, getDistance, shortenAddress };
