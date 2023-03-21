import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, TextInput, ScrollView, ActivityIndicator, StatusBar, Linking, ToastAndroid } from 'react-native';
import React from 'react';
import COLORS from '../../consts/Colors';
import { useState } from 'react';
import SearchTab from '../components/SearchTab';
import EventItems from '../components/EventItems';
import EventsCategory from '../components/EventsCategory';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { events, selectEvents } from '../../../redux/reducers/Reducers'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTabOne from '../components/HeaderTabOne';
import { color } from 'react-native-reanimated';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
const { height, width } = Dimensions.get('window');



const EventBtn = [
  {
    id: '1',
    name: 'Explore',
  },
  {
    id: '2',
    name: 'Your Events',
  }
];

export const CategoriesEvent = [
  {
    id: '1',
    name: 'New Events',
  },
  {
    id: '2',
    name: 'Todays Event',
  },
  {
    id: '3',
    name: 'Last Events',
  },
]



const EventDetails = ({ navigation, route }) => {
  const { details } = route.params;
  // console.log(details.startDate);
  const [Events, setEvents] = useState('Explore');



  const [scan, setScan] = useState(false);
  const [result, setResult] = useState();



  const dispatch = useDispatch();
  const eventExist = useSelector(selectEvents);



  const handleSlide = (index) => {
    // console.log('slide');
    setValueIndex(index)
    const viewPage = EventBtn[index].name
    setEvents(viewPage);
  };

  const ScanDoc = () => {
    console.log('scan now');
  }
  const onSuccess = (e) => {
    setResult(e.data);
    setScan(false)
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
    console.log('QR Result==> :', e.data);
  }
  const startScan = () => {
    setScan(true)
    setResult();
  }

  const VerifyScanDoc = () => {
    if (!result) {
      ToastAndroid.show("Doc scan error please try again!", ToastAndroid.SHORT);
      // navigation.goBack()
    }
    else {
      ToastAndroid.show("Doc scaned now buy your tickets!", ToastAndroid.SHORT);
      navigation.navigate('EventTickets', { details: details, Doc: result })
    }
  }

  useEffect(() => {
    VerifyScanDoc();

  }, [result])

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.black} />
        <HeaderTabOne
          onpress={() => navigation.goBack()}
          Lefticon={require('../../assets/goback.png')}
          Righticon={'no image'}
          Title={'Events Detail'}
        />

        <View style={{
          height: '100%',
          // backgroundColor: COLORS.main
        }}>
          {!scan &&
            <ScrollView vertical showsVerticalScrollIndicator={false} >
              <View style={{
                alignItems: 'center',
                paddingTop: 10,
                paddingHorizontal: 20,
              }}>
                <Image source={{ uri: details.image1 }} resizeMode='cover'
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 10,
                    // marginRight: 10,
                  }} />
              </View>
              <View style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingTop: 10,
                paddingBottom: 5,
                justifyContent: 'space-between',
                alignItems: 'center',
                width: width
              }}>
                <View style={{
                  width: width / 1.5,
                }}>
                  <Text style={{
                    fontSize: 16,
                    color: COLORS.black,
                    fontWeight: 'bold'
                  }}>{details.Title}</Text>
                </View>
                <View style={{
                  alignItems: 'flex-end'
                }}>
                  <Text style={{
                    fontSize: 10,
                    color: COLORS.black
                  }}>Starting from</Text>
                  <Text style={{
                    fontSize: 16,
                    color: COLORS.black,
                    fontWeight: 'bold'
                  }}>${details.totalTicketPrice}</Text>
                </View>
              </View>


              <View style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <View style={{
                    justifyContent:'center'
                  }}>
                  <Image source={require('../../assets/location.png')} style={{
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    marginRight: 5
                  }} />
                  </View>
                  <View style={{
                    width: width / 1.7,
                    // backgroundColor:COLORS.gray
                  }}>
                    <Text style={{
                      fontSize: 12,
                      color: COLORS.black,
                    }}>{details.location}</Text>
                  </View>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems:'flex-end',
                }}>
                  <Image source={require('../../assets/events.png')} resizeMode="contain" style={{
                    marginRight: 5,
                    width: 20,
                    height: 20,
                    tintColor: COLORS.black
                  }} />
                  <Text style={{
                    // fontSize: 1,
                    color: COLORS.black,
                  }}>{details.startDate}</Text>
                </View>
              </View>

              <View style={{
                paddingHorizontal: 20,
                paddingTop: 10,
              }}>
                <Text style={{
                  color: COLORS.black,
                }}>Description</Text>
              </View>
              <View style={{
                paddingHorizontal: 20,
                // paddingTop:10,
              }}>
                <Text style={{
                  fontSize: 12,
                }}>{details.description}</Text>
              </View>

              <View style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
                <Text style={{
                  color: COLORS.black,
                }}>Picture</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                }}>
                  <Image source={{ uri: details.image1 }} resizeMode='cover' style={{
                    width: 150,
                    height: 80,
                    borderRadius: 10,
                    marginRight: 10,
                  }} />
                  {details.secimageUrl &&
                    <Image source={{ uri: details.secimageUrl }} resizeMode='cover' style={{
                      width: 150,
                      height: 80,
                      borderRadius: 10,
                      marginRight: 10,
                    }} />
                  }
                  {details.thirdimageUrl &&
                    <Image source={{ uri: details.thirdimageUrl }} resizeMode='cover' style={{
                      width: 150,
                      height: 80,
                      borderRadius: 10,
                      marginRight: 10,
                    }} />
                  }
                  {details.fourthimageUrl &&
                    <Image source={{ uri: details.fourthimageUrl }} resizeMode='cover' style={{
                      width: 150,
                      height: 80,
                      borderRadius: 10,
                      marginRight: 10,
                    }} />
                  }
                  {details.fifthimageUrl &&
                    <Image source={{ uri: details.fifthimageUrl }} resizeMode='cover' style={{
                      width: 150,
                      height: 80,
                      borderRadius: 10,
                      marginRight: 10,
                    }} />
                  }
                </View>
              </ScrollView>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
                backgroundColor: COLORS.light,
                paddingHorizontal: 20,
                marginTop: 20,
                marginBottom: 200,
                // borderRadius: 20,
                // elevation: 8
              }}>
                <View style={{
                  width: '80%'
                }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10
                  }}>
                    <Image source={require('../../assets/notify.png')} resizeMode='contain' />
                    <View style={{
                      width: '60%',
                      paddingLeft: 10,
                      paddingVertical: 10,
                    }}>
                      <Text style={{
                        color: COLORS.black
                      }}>
                        Scan your  DL or ID
                        to connect (optional)
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      // navigation.navigate('EventTickets', { details: details.details.item })
                      startScan()
                    }
                    style={{
                      backgroundColor: COLORS.main,
                      width: '50%',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 5,
                    }}>
                    <Text style={{
                      color: COLORS.black,
                      fontSize: 12
                    }}>Scan now</Text>
                  </TouchableOpacity>
                </View>
                <View style={{
                  width: '20%',
                  alignItems: 'center',
                  paddingRight: 20,
                }}>
                  {/* <Image source={require('../../assets/barcode.png')} resizeMode='contain'
                    style={{
                      width: 100,
                      height: 100,
                    }} /> */}
                </View>
              </View>

            </ScrollView>
          }
          {scan &&
            <View style={{
              flex: 1,
              justifyContent: 'center',
              // height: '80%',
            }}>
              <QRCodeScanner
                reactivate={true}
                showMarker={true}
                ref={(node) => { scanner = node }}
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                  <Text style={styles.centerText}>
                    Scan your QRCode!
                  </Text>
                }
                bottomContent={
                  <TouchableOpacity style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>OK. Got it!</Text>
                  </TouchableOpacity>
                }
              />
            </View>
          }
        </View>

      </View>
    </SafeAreaView >
  )
}

export default EventDetails

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.white
  },
  contentContainer: {
    // borderRadius:50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:COLORS.black
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: COLORS.black
  },
  textBold: {
    fontWeight: '500',
    color: COLORS.black,
  },
  buttonText: {
    fontSize: 21,
    color: COLORS.black
  },
  buttonTouchable: {
    // padding: 16
  }

})