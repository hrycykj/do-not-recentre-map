import * as Location from "expo-location";
import { useEffect, useState, useContext } from "react";

const setMyLocation = async (setLocation, setErrorMsg) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status != "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }
  let location = await Location.getCurrentPositionAsync({});
  // let location = await Location.getLastKnownPositionAsync({})
  setLocation(location);
};

const updateLocation = async (setLocation) => {
  _getLocationAsync = async () => {
    let { status } = await Location.getForegroundPermissionsAsync()
    if (status != "granted") {
      console.log('location permissions not granted yet',status)
      return
    }

    let locations = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (loc) => {
        setLocation(loc);
      }
    );
  };
  _getLocationAsync();
  return () => {
    Location.LocationSubscription();
  };
};

const newCenterCoordinates = (location, checkpointCoords, setMapCenter) => {
  // console.log('you should be calculating the new coordinates already!')
  console.log (location.coords.latitude, location.coords.longitude)
  const coords1 = location?.coords
  const coords2 = checkpointCoords

  let long = (coords1.longitude+coords2.longitude)/2
    let lat = (coords1.latitude+coords2.latitude)/2
    let deltaLong = Math.abs(coords1.longitude-coords2.longitude)*1.2
    let deltaLat = Math.abs(coords1.latitude-coords2.latitude)*1.2

    console.log(deltaLong, deltaLat)
    if (deltaLat<0.0025) {deltaLat=0.0025} else {deltaLat=deltaLat}
    if (deltaLong<.001) {deltaLong=0.001} else {deltaLong=deltaLong}
    console.log(deltaLong, deltaLat)

    setMapCenter ({
    'latitude': lat,
    'longitude': long,
    'latitudeDelta': deltaLat,
    'longitudeDelta': deltaLong,
    })
}

module.exports = {
  setMyLocation,
  updateLocation,
  newCenterCoordinates,
};
