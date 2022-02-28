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

module.exports = {
  setMyLocation,
  updateLocation,
};
