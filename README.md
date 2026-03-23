# LiveEasy - Bachelor Friendly Smart Housing Finder

![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo_SDK-54-000020?logo=expo&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-11.0-FFCA28?logo=firebase&logoColor=black)
![Mapbox](https://img.shields.io/badge/Mapbox-Maps-4264FB?logo=mapbox&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

A mobile app that helps bachelors find rental properties, PGs, and flats easily. Built with React Native (Expo) and Firebase. Users can search, filter, view properties on a map, save favorites, and contact owners directly.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React Native (Expo) |
| Maps | Mapbox |
| Backend | Firebase (Auth + Firestore) |
| Navigation | React Navigation (Stack + Tabs) |
| Icons | Expo Vector Icons (Ionicons) |

## Features

- Search properties by city, area, or name
- Filter by property type (1BHK, 2BHK, 3BHK, PG, Studio)
- Filter by rent range, bachelor-friendly, non-veg allowed
- View properties on map with location pins
- Property details with amenities, owner info, policies
- Bookmark/save properties for later
- Call owner or message on WhatsApp directly from the app
- Pull to refresh property listings
- User profile with login/signup

## Project Structure

```
liveeasy/
├── App.js                    # main entry - navigation setup
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js    # login and signup form
│   │   ├── HomeScreen.js     # property listing with search
│   │   ├── MapScreen.js      # map view with markers
│   │   ├── DetailsScreen.js  # full property details
│   │   ├── SavedScreen.js    # bookmarked properties
│   │   └── ProfileScreen.js  # user profile and settings
│   ├── components/
│   │   ├── PropertyCard.js   # property card in list
│   │   ├── SearchBar.js      # search input with filter button
│   │   └── FilterModal.js    # filter bottom sheet
│   ├── config/
│   │   ├── firebase.js       # firebase connection
│   │   └── mapbox.js         # mapbox token
│   └── utils/
│       ├── helpers.js        # utility functions
│       └── sampleData.js     # sample properties for testing
└── package.json
```

## Setup

1. Clone the repo
```bash
git clone https://github.com/pragatisingh1556/liveeasy.git
cd liveeasy
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your config values into `src/config/firebase.js`

4. Set up Mapbox
   - Sign up at [mapbox.com](https://www.mapbox.com/)
   - Get your access token from the dashboard
   - Paste it in `src/config/mapbox.js`

5. Run the app
```bash
npx expo start
```

6. Scan the QR code with Expo Go app on your phone

## Screenshots

| Login | Home | Details | Profile |
|-------|------|---------|---------|
| <img src="screenshots/login.jpg" width="200"/> | <img src="screenshots/home.jpg" width="200"/> | <img src="screenshots/details.jpg" width="200"/> | <img src="screenshots/profile.jpg" width="200"/> |

## What I Learned

- Setting up navigation with React Navigation (nested stack + tab navigators)
- Working with Mapbox for showing locations on a map
- Connecting React Native app to Firebase for auth and database
- Building reusable components like PropertyCard and FilterModal
- Handling filters and search with useState and useEffect
- Making phone calls and opening WhatsApp from a mobile app using Linking API

## Future Improvements

- Add image upload for properties
- Implement real-time chat between tenant and owner
- Add push notifications for new listings
- Location-based search using device GPS
- Reviews and ratings system
