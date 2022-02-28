import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Button, View } from 'react-native'

import CurrentMapview from './components/CurrentMapview'
import CheckpointMarker from './components/CheckpointMarker'
import {setMyLocation, updateLocation, newCenterCoordinates} from './components/questMapUtil'

export default function App() {
  const [location, setLocation] = useState({})
  const [errorMsg, setErrorMsg] = useState()
  const [mapCenter, setMapCenter] = useState ({
    'latitude': 51.0447,
    'longitude': -114.0719,
    'latitudeDelta': 0.0025,
    'longitudeDelta': 0.001,
  })
  let checkpointCoords = {'latitude':51.045764204793116, 'longitude': -114.0594014214562}

  useEffect(() => {
    setMyLocation(setLocation, setErrorMsg).catch((error) =>
      console.log(error)
    );
    updateLocation(setLocation).catch((error) => console.log(error));
  }, []);

const handlePress = () => {
  newCenterCoordinates (location, checkpointCoords, setMapCenter)
}

  return (
    <View style={styles.container}>
      <CurrentMapview
        latitude = {mapCenter.latitude}
        longitude = {mapCenter.longitude}
        latitudeDelta = {mapCenter.latitudeDelta}
        longitudeDelta = {mapCenter.longitudeDelta}
        setMapCenter = {setMapCenter}
      >
        {location && location.coords && <CheckpointMarker
          latitude = {location?.coords?.latitude}
          longitude = {location?.coords?.longitude}
          title = {'Me'}
        />}
        <CheckpointMarker
          latitude = {checkpointCoords.latitude}
          longitude = {checkpointCoords.longitude}
          title = {'Checkpoint'}
        />
        <Button
          title = 'the pressable button'
          onPress = {
            handlePress
          }
        >
          Press Me!
        </Button>
      </CurrentMapview>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
