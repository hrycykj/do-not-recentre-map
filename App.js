import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native'

import CurrentMapview from './components/CurrentMapview'
import CheckpointMarker from './components/CheckpointMarker'
import {setMyLocation, updateLocation} from './components/questMapUtil'

export default function App() {
  const [location, setLocation] = useState({})
  const [errorMsg, setErrorMsg] = useState()
  let latitude = 51.0447
  let longitude = -114.0719
  let latitudeDelta = 0.0025
  let longitudeDelta = 0.001
  let checkpointCoords = {'latitude':51.045764204793116, 'longitude': -114.0594014214562}

  useEffect(() => {
    setMyLocation(setLocation, setErrorMsg).catch((error) =>
      console.log(error)
    );
    updateLocation(setLocation).catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <CurrentMapview
        latitude = {latitude}
        longitude = {longitude}
        latitudeDelta = {latitudeDelta}
        longitudeDelta = {longitudeDelta}
      >
        <Text>Rando Text</Text>
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
