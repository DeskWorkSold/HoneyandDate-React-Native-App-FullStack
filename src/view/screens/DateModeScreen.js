import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid, Modal, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Share from 'react-native-share';
import { getApps, GetAppResult } from 'react-native-map-link';
import { useEffect } from 'react';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const DateModeScreen = ({ navigation }) => {
  const [availableApps, setAvailableApps] = useState([]);


  const [arrivalTime, setArrivalTime] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState();
  const [trackingTime, setTrackingTime] = useState('');
  const [actionTriggered, setActionTriggered] = useState(false);
  const [LocationModalVisible, setLocationModalVisible] = useState(false);
  const [ExpectedTimeVisibility, setExpectedTimeVisibility] = useState(false);
  const [TrackingTimeVisibility, setTrackingTimeVisibility] = useState(false);
  const [tempDates, setTempDates] = useState('');
  const [pin, setPin] = useState({
    latitude: 24.860966,
    longitude: 66.990501,
  });
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  useEffect(() => {
    (async () => {
      const result = await getApps({
        latitude: region.latitude,
        longitude: region.longitude,
        // title: 'The White House',
        googleForceLatLon: false,
        alwaysIncludeGoogle: true,
        appsWhiteList: ['google-maps'],
      });
      setAvailableApps(result);
    })();
  }, []);



  const OpenLocationModalView = () => {
    setLocationModalVisible(!LocationModalVisible)
    setActionTriggered('ACTION_1');
  }
  const OnSetLocation = (region) => {
    // console.log(pin);
    if (region) {
      setRegion(region)
      setLocation('Karachi Federal B Area')
      setLocationModalVisible(false)
    }
    else {
      ToastAndroid.show("Please select location first!", ToastAndroid.SHORT);
    }
  }



  const showExpectedTimePicker = () => {
    setExpectedTimeVisibility(true)
    // setCategory('Proposal')
  }
  const hideExpectedTimePicker = () => {
    setExpectedTimeVisibility(false);
  };
  const handleConfirmExpectedTime = date => {
    // console.warn('A date has been picked: ', date);
    setTempDates(date)
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setArrivalTime(final);
    hideExpectedTimePicker();
  };
  const showTrackingTimePicker = () => {
    setTrackingTimeVisibility(true)
    // setCategory('Proposal')
  }
  const hideTrackingTimePicker = () => {
    setTrackingTimeVisibility(false);
  };
  const handleConfirmTrackingTime = date => {
    // console.warn('A date has been picked: ', date);
    // setTempDates(date)
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setTrackingTime(final);
    hideTrackingTimePicker();
  };


  const onContinue = () => {
    if (!location, !trackingTime, !region, !arrivalTime) {
      if (!location) {
        ToastAndroid.show("Please select location first!", ToastAndroid.SHORT);
      }
      else if (!trackingTime) {
        ToastAndroid.show("Please select tracking Time first!", ToastAndroid.SHORT);
      }
      else if (!region) {
        ToastAndroid.show("Please select region first!", ToastAndroid.SHORT);
      }
      else if (!arrivalTime) {
        ToastAndroid.show("Please select arrival Time first!", ToastAndroid.SHORT);
      }
    }
    else {
      console.log('here', location);
      setActionTriggered('ACTION_2');
      setLocationModalVisible(!LocationModalVisible)
    }
  }
  const OnSendMessages = async () => {
    // console.log(
    //   location, trackingTime, region, arrivalTime
    // );
    // console.log(availableApps.open);
    availableApps.map(item => {
      console.log(item.open);
    })
    return;
    
    const shareOptions = {
      title: 'Share Location',
      location: location,
      message: availableApps,
      // message:
      //   'Address ' + location + ' ,Tracking Time ' + trackingTime + ' ,Arrival Time ' + arrivalTime + ' ,region ' + region,  //string
      // url: 'some share url',
      // // social: Share.Social.WHATSAPP,
      // whatsAppNumber: "9199999999",  // country code + phone number
      // filename: 'test', // only for base64 file in Android
    };

    let Data = new Object();
    Data.message = location;
    Data.trackingTime = trackingTime;
    Data.region = region;
    Data.arrivalTime = arrivalTime;

    // console.log(shareOption , Data);
    // return;
    try {
      const ShareResponce = await Share.open(shareOptions)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log('Error2',err);
        });
    }
    catch (e) {
      console.log('Error',e);
    }
  }






  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <ScrollView>
        <View style={styles.container}>

          <View style={{
            alignItems: 'center',
            paddingTop: 20,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>Date Mode
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}>Date Location </Text>
              <TouchableOpacity
                onPress={() => OpenLocationModalView()}
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <MapView
                  style={styles.map1}
                  initialRegion={{
                    latitude: 24.860966,
                    longitude: 66.990501,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: region.latitude,
                      longitude: region.longitude,
                    }}
                    draggable
                    onDragEnd={
                      (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                    }
                    title={'Test Marker'}
                    description={'This is description of marker'} />
                </MapView>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Where going for date? </Text>
              <View style={styles.NumberInput}>
                <TextInput
                  value={location}
                  placeholder={'Enter date location'}
                  keyboardType='email-address'
                  onChangeText={location => setLocation(location)
                  }
                  style={styles.TextInput}
                  onPressIn={OpenLocationModalView}
                />
              </View>
            </View>
          </View>


          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Expected arrival time? </Text>
              <View style={styles.NumberInput}>
                <TextInput
                  value={arrivalTime}
                  placeholder={'Arrival time'}
                  keyboardType='number-pad'
                  onChangeText={arrivalTime => setArrivalTime(arrivalTime)
                  }
                  style={styles.TextInput}
                  onPressIn={showExpectedTimePicker}
                />
              </View>
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Tracking time </Text>
              <View style={styles.NumberInput}>
                <TextInput
                  value={trackingTime}
                  placeholder={'Time'}
                  onChangeText={trackingTime => setTrackingTime(trackingTime)
                  }
                  style={styles.TextInput}
                  onPressIn={showTrackingTimePicker}
                />
              </View>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>

            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingTop: 80,
              paddingBottom: 10,
            }}>
              <View style={{ marginHorizontal: 5 }}>
                <CustomeButton onpress={() => onContinue()}
                  title={'Continue'} />
              </View>
            </View>
          </View>

        </View>


        <DateTimePickerModal
          isVisible={ExpectedTimeVisibility}
          mode="time"
          // display='spinner'
          onConfirm={handleConfirmExpectedTime}
          onCancel={hideExpectedTimePicker}
        />

        <DateTimePickerModal
          isVisible={TrackingTimeVisibility}
          mode="time"
          // display='spinner'
          onConfirm={handleConfirmTrackingTime}
          onCancel={hideTrackingTimePicker}
        />



        <Modal
          animationType="slide"
          transparent={false}
          visible={LocationModalVisible}
          onRequestClose={() => {
            setLocationModalVisible(!LocationModalVisible);
          }}
        >
          {actionTriggered === 'ACTION_1' ?
            <View style={{ alignItems: 'center', flex: 1 }}>
              <View style={{ marginTop: 0 }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  flex: 0,
                  height: 50
                }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                    }}
                    onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' size={20} onPress={() => setLocationModalVisible(false)} color={COLORS.black} />
                  </TouchableOpacity>
                  <View style={{
                    flex: 2,
                  }}>
                    <Text style={{
                      color: COLORS.black,
                      fontSize: 20,
                      fontWeight: 'bold'
                    }}> Add Location </Text>
                  </View>
                </View>
                <View style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <GooglePlacesAutocomplete
                    placeholder='Search'
                    fetchDetails={true}
                    autoFocus={false}
                    onFail={error => console.error(error)}
                    GooglePlacesSearchQuery={{
                      rankby: "distance"
                    }}
                    onPress={(data, details = null) => {
                      // 'details' is provided when fetchDetails = true
                      console.log('data here ===>', data, 'details ===>', details);
                      setRegion({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                      })
                      setLocation(data.description)
                    }}
                    query={{
                      key: 'AIzaSyADaEpiFSeltBH4uNI9aZaIM1XRXFfPvhs',
                      language: 'en',
                      components: "country:pk",
                      types: "establishment",
                      radius: 30000,
                      location: `${region.latitude}, ${region.longitude}`
                    }}
                    styles={{
                      container: {
                        flex: 1, position: 'relative', width: "100%", zIndex: 1,
                        // marginHorizontal: 20,
                        marginTop: 10,
                      },
                      listView: { backgroundColor: "white" }
                    }}
                  />
                  <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    initialRegion={{
                      latitude: 24.860966,
                      longitude: 66.990501,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                      }}
                      // image={require('../../../assets/map.png')}
                      draggable={true}
                      onDragEnd={(e) => {
                        console.log('Drag end', e.nativeEvent.coordinate)
                        setRegion({
                          latitude: e.nativeEvent.coordinate.latitude,
                          longitude: e.nativeEvent.coordinate.longitude,
                        })
                      }}
                      title={'Test Marker'}
                      description={'This is description of marker'} >
                      <Image
                        source={require('../../assets/map.png')}
                        style={{ width: 26, height: 28 }}
                        resizeMode="contain"
                      />
                    </Marker>
                    <Circle center={pin} radius={200} />
                  </MapView>
                  <View
                    style={{
                      position: 'absolute',//use absolute position to show button on top of the map
                      top: '70%', //for center align
                      alignSelf: 'center' //for align to right
                    }}
                  >
                    <CustomeButton title={'Add Location'} onpress={() => OnSetLocation(region)} />
                  </View>
                </View>
              </View>
            </View>
            :
            actionTriggered === 'ACTION_2' ?
              <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{ marginTop: 0 }}>
                  <View style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapView
                      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        height: windowHeight,
                        width: windowWidth,
                        borderRadius: 15,
                      }}
                      initialRegion={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: region.latitude,
                          longitude: region.longitude,
                        }}
                      // image={require('../../../assets/map.png')}
                      // draggable={true}
                      // onDragEnd={(e) => {
                      //   console.log('Drag end', e.nativeEvent.coordinate)
                      //   setRegion({
                      //     latitude: e.nativeEvent.coordinate.latitude,
                      //     longitude: e.nativeEvent.coordinate.longitude,
                      //   })
                      // }}
                      // title={'Test Marker'}
                      // description={'This is description of marker'} 
                      >
                        <Image
                          source={require('../../assets/map.png')}
                          style={{ width: 26, height: 28 }}
                          resizeMode="contain"
                        />
                      </Marker>
                      <Circle center={region} radius={200} />
                    </MapView>



                    <View
                      style={{
                        position: 'absolute',//use absolute position to show button on top of the map
                        top: '60%', //for center align
                        alignSelf: 'center', //for align to right,
                        backgroundColor: COLORS.white,
                        color: COLORS.black,
                        width: windowWidth,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        height: '40%'
                      }}
                    >
                      <View style={{
                        // justifyContent:'center'
                        paddingHorizontal: 20,
                        paddingTop: 30
                      }}>
                        <View>
                          <Text style={{
                            fontSize: 12
                          }}>
                            Current Location of your Date
                          </Text>
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 50
                          }}>
                            <Image source={require('../../assets/map.png')}
                              style={{ width: 16, height: 18, marginRight: 5 }}
                              resizeMode="contain"
                            />
                            <Text style={{ color: COLORS.black }}>
                              {location}
                            </Text>
                          </View>
                        </View>
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10
                        }}>
                          <Text style={{
                            fontSize: 12
                          }}>
                            Distance from you
                          </Text>
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: COLORS.main,
                            padding: 5,
                            borderRadius: 5
                          }}>
                            <Image source={require('../../assets/clock.png')}
                              style={{ width: 16, height: 18, marginRight: 5, tintColor: COLORS.black, color: COLORS.black }}
                              resizeMode="contain"
                            />
                            <Text style={{ color: COLORS.black }}>03h 24m</Text>
                          </View>
                        </View>
                        <View style={{
                          paddingVertical: 5,
                          marginBottom: 10,
                          flexDirection: 'row'
                        }}>
                          <Image source={require('../../assets/map.png')}
                            style={{ width: 16, height: 18, marginRight: 5 }}
                            resizeMode="contain"
                          />
                          <Text style={{
                            color: COLORS.black
                          }}>407mm</Text>
                        </View>

                        <View style={{
                          alignItems: 'center'
                        }}>
                          <CustomeButton title={'Send Message'} onpress={() => OnSendMessages()} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              : null}
        </Modal>
      </ScrollView>







    </SafeAreaView >
  )
}

export default DateModeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: '100%'
  },
  contentContainer: {
    height: '90%',
  },
  footer: {
    alignItems: 'center',
  },
  map1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 200,
    width: 340,
    borderRadius: 15,
  },
  NumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 45,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
  map: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: windowHeight,
    width: windowWidth,
    borderRadius: 15,
  },
})