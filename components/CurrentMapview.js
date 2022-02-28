import { StyleSheet, Dimensions } from 'react-native'


import MapView from 'react-native-maps'

const screenMapWidth = Dimensions.get('window').width
const screenMapHeight = Dimensions.get('window').height

const CurrentMapview = (props) => {

    let latitude = props.latitude
    let longitude = props.longitude
    let latitudeDelta = props.latitudeDelta
    let longitudeDelta = props.longitudeDelta

    // console.log(latitude, longitude, latitudeDelta, longitudeDelta)

    return (
        <MapView
            style={
                styles.map}
            region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
            }}
        >
        {props.children}
        </MapView>
    )
}

// figure out what the styles should really be for this!

let styles = StyleSheet.create({
    map: {
        width: screenMapWidth*0.95,
        height: screenMapHeight*0.95,
    },
  });

export default CurrentMapview