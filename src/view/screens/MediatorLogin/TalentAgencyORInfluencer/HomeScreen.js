import { ActivityIndicator, Dimensions, Image, PermissionsAndroid, Platform, SafeAreaView, ScrollView, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React from 'react';
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import Loader from '../../../components/Loader';
import Twitter from '../../../../assets/Twitter.svg';
import Facebook from '../../../../assets/Facebook.svg';
import WhatsApp from '../../../../assets/WhatsApp.svg';
import Reddit from '../../../../assets/Reddit.svg';
import Linkedin from '../../../../assets/Linkedin.svg';
import TikTok from '../../../../assets/TikTok.svg';
import CopyLink from '../../../../assets/copy.svg';
// import Facebook from '../../../../assets/Facebook.svg';
// import Facebook from '../../../../assets/Facebook.svg';
import SuggestMatche from '../../../components/SuggestMatche';
import messaging from '@react-native-firebase/messaging';
import Dollar from '../../../../assets/dollar.svg'
import Edite from '../../../../assets/edit.svg'
import Send from '../../../../assets/send.svg'
import { BarChart, ProgressChart } from 'react-native-chart-kit';
import Speedometer from '../../../components/Speedometer';
import { TextInput } from 'react-native-paper';
import CustomeButton from '../../../components/CustomeButton';

const { width, height } = Dimensions.get("window");

const CoordinatorBtn = [
  {
    id: '1',
    name: 'Your Clients',
  },
  {
    id: '2',
    name: 'Requests',
  }
];

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};


const HomeScreen = ({ navigation }) => {
  let afcode = Math.random().toString(16).slice(2);
  const [code, setCode] = useState(afcode);
  const [progressmeter, setProgressMeter] = useState(60);
  const [uploading, setUploading] = useState(false);
  const [emailAddress, setEmailAddress] = useState(false);
  const [isEnabled2, setisEnabled2] = useState(false);

  const [reqUser, setReqUser] = useState(null);
  const [ClientUser, setClientUser] = useState(null);
  const [filterMatchUser, setFilterMatchUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [matcheModal, setMatchModal] = useState(false);
  const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [suggestedMatch, setSuggestedMatch] = useState(false);
  const [matchIndex, setMatchIndex] = useState(null);
  const [matchUsers, setMatchUsers] = useState(null);

  const [userTemp, setUserTemp] = useState(null);
  const [matchUserTemp, setMatchUserTemp] = useState(null);


  const CurrentUser = auth().currentUser.uid;


  // console.log(reqUser);

  const GetFcmToken = () => {
    //get device token
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          messaging()
            .getToken()
            .then(fcmToken => {
              if (fcmToken) {
                // console.log(fcmToken);
                firestore()
                  .collection('token')
                  .doc(CurrentUser)
                  .set({
                    token: fcmToken,
                    create_date: new Date(),
                  })
                  .then(() => {
                    console.log('token succssfully saved');
                  })
                  .catch(error => {
                    console.log(error);
                  });
              } else {
                console.log("user doesn't have a device token yet");
              }
            });
        } else {
          console.log('Permission Denied');
        }
      });
  }

  useEffect(() => {
    locationPermission();
    getCurrentLocation();

    // NotificationPermission();
    GetFcmToken();

  }, [])

  // useEffect(() => {
  //   getfilterMatchUsers();
  // }, [filterMatchUser])

  const locationPermission = () => {
    new Promise(async (resolve, reject) => {
      if (Platform.OS === 'ios') {
        try {
          const permissionStatus = await Geolocation.requestAuthorization(
            'whenInUse',
          );
          if (permissionStatus === 'granted') {
            return resolve('granted');
          }
          reject('Permission not granted');
        } catch (error) {
          return reject(error);
        }
      }
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted');
          }
          return reject('Location Permission denied');
        })
        .catch(error => {
          console.log('Ask Location permission error: ', error);
          return reject(error);
        });
    });
  }

  const getCurrentLocation = () => {
    setTimeout(() => {
      Geolocation.getCurrentPosition(
        position => {
          const cords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            // heading: position.coords.heading,
          };
          firestore()
            .collection('Users').doc(CurrentUser).update({
              'userDetails.Location': cords,
            })
          // console.log('===>', cords);
          // resolve(cords);
        },
        error => { console.log(error) }
      );
    }, 5000);
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <View style={{
              backgroundColor: COLORS.bluedark,
              // paddingVertical: 50
              width: width,
              height: height / 3.5,
              justifyContent: 'center'
            }}>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                justifyContent: 'space-between'
              }}>
                <View style={{
                  flex: 1
                }}>
                  <Text style={{ color: COLORS.white, fontSize: 13 }}>Refer other influencers</Text>
                  <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>Earn up to 10%
                    of end user
                    learn more</Text>
                </View>
                <View style={{
                  flex: 1,
                  alignItems: 'flex-end'
                }}>
                  <Dollar width={width / 2.5} height={height / 5.5} />
                </View>

              </View>

            </View>
            <View style={{
              top: -20,
              width: width / 1.1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: COLORS.white,
              borderRadius: 10,
              elevation: 5,
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 15
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 13
                }}>Your affiliate code : </Text>
                <View><Text style={{
                  color: COLORS.black,
                  fontSize: 13
                }}>{code}</Text></View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('CustomeEfilatedCode')}
                style={{
                  color: COLORS.black,
                  fontSize: 13
                }}>
                <Edite width={20} height={20} />
              </TouchableOpacity>
            </View>
            <View style={{
              width: width,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
              <View >
                <Text style={{
                  color: COLORS.black,
                  fontWeight: 'bold',
                  fontSize: 13
                }}>
                  Earning from affiliate
                </Text>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{
                  paddingRight: 10,
                  color: COLORS.black,
                  fontSize: 12
                }}>
                  Last Month
                </Text>
                <TouchableOpacity>
                  <Image source={require('../../../../assets/goback.png')} resizeMode='contain' style={{
                    width: 12,
                    height: 12,
                    transform: [{ rotateZ: '-90deg' }],
                    tintColor: COLORS.black
                  }} />
                </TouchableOpacity>
              </View>
            </View>


            <View style={{
              paddingVertical: 10
            }}>
              <BarChart
                data={data}
                width={width - 20}
                height={220}
                yAxisLabel="$"
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: COLORS.white,
                  backgroundGradientFrom: COLORS.white,
                  backgroundGradientTo: COLORS.white,
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: opacity => COLORS.main,
                  labelColor: (opacity = 1) => `${COLORS.gray}`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: COLORS.gray
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              // verticalLabelRotation={30}
              // style={{alignItems:'center'}}
              // chartConfig = {{
              //   backgroundGradientFrom: COLORS.white,
              //   backgroundGradientFromOpacity: 0,
              //   backgroundGradientTo: COLORS.white,
              //   backgroundGradientToOpacity: 0.5,
              //   color: opacity  => `${COLORS.main}`,
              //   strokeWidth: 2, // optional, default 3
              //   barPercentage: 0.5,
              //   useShadowColorFromDataset: false // optional

              // }}
              />
            </View>

            <View style={{
            }}>
              <View style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                alignItems: 'center',
                width: width,
                justifyContent: 'space-between'
              }}>
                <View style={{
                  // flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Text style={{ fontSize: 12, color: COLORS.black }}>Earning: </Text>
                    <Text style={{ fontSize: 12, color: COLORS.black, fontWeight: 'bold' }}>$980</Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Text style={{ fontSize: 12, color: COLORS.black }}>Pending: </Text>
                    <Text style={{ fontSize: 12, color: COLORS.black, fontWeight: 'bold' }}>$180</Text>
                  </View>
                </View>
                <View>
                  <Text style={{
                    color: COLORS.black,
                    backgroundColor: COLORS.main,
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    fontSize: 12,
                    // fontWeight:'bold'
                  }}>See Balance</Text>
                </View>
              </View>
            </View>
            <View style={{
              width: width / 1.1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: COLORS.white,
              borderRadius: 10,
              elevation: 5,
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 15,
              marginTop: 30,
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '10%'
              }}>
                <Image source={require('../../../../assets/like1.png')} resizeMode='contain' style={{
                  width: 20,
                  height: 20,
                }} />
                <View style={{
                  left: -5,
                }}>
                  <Image source={require('../../../../assets/like2.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20,
                  }} />
                </View>
                <View style={{
                  left: -10,
                }}>
                  <Image source={require('../../../../assets/like3.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20,
                  }} />
                </View>
              </View>
              <View style={{
                width: '75%',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 13,
                  color: COLORS.black
                }}>13 people used your
                  referral code this month</Text>
              </View>
              <TouchableOpacity 
              onPress={() => navigation.navigate('YourClients')}
              style={{
                color: COLORS.black,
                fontSize: 13,
                width: '5%'
              }}>
                <Image source={require('../../../../assets/goback.png')} resizeMode='contain' style={{
                  width: 12,
                  height: 12,
                  transform: [{ rotateZ: '-180deg' }],
                  tintColor: COLORS.black
                }} />
              </TouchableOpacity>
            </View>


            <View style={{
              width: width / 1.1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: COLORS.white,
              borderRadius: 10,
              elevation: 5,
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 20,
              marginTop: 30,
            }}>
              <View>
                <Text style={{ color: COLORS.black, fontSize: 14 }}>Promotional content</Text>
              </View>
              <Image source={require('../../../../assets/goback.png')} resizeMode='contain' style={{
                width: 12,
                height: 12,
                transform: [{ rotateZ: '-180deg' }],
                tintColor: COLORS.black
              }} />
            </View>


            <View style={{
              width: width / 1.1,
              // flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: COLORS.white,
              borderRadius: 10,
              elevation: 5,
              // alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 20,
              marginTop: 30,
            }}>
              <View style={{
                paddingBottom: 20
              }}>
                <Text style={{ color: COLORS.black, fontSize: 14, fontWeight: 'bold' }}>Rewards Program:</Text>
              </View>
              <View style={{
                alignItems: 'center'
              }}>
                <Speedometer value={progressmeter} />
              </View>

              <View>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 12,
                  paddingTop: 10
                }}>
                  Total Number of Users used your code (includes non paid users)
                </Text>
              </View>
            </View>

            <View style={{
              paddingVertical: 20
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.black
              }}>
                Send Invite
              </Text>
            </View>


            <View style={{
              // top: -20,
              width: width / 1.1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: COLORS.white,
              borderRadius: 10,
              elevation: 5,
              alignItems: 'center',
              paddingRight: 20,
              paddingVertical: 5,
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <TextInput
                  placeholder='enter email address'
                  value={emailAddress}
                  placeholderTextColor={COLORS.gray}
                  onChangeText={(text) => setEmailAddress(text)}
                  underlineColor={COLORS.transparent}
                  activeUnderlineColor={COLORS.transparent}
                  backgroundColor={COLORS.transparent}
                  style={{
                    width: width / 1.5,
                    padding: 0,
                    margin: 0,
                    backgroundColor: COLORS.transparent
                  }}
                />
              </View>
              <View style={{
                color: COLORS.black,
                fontSize: 13
              }}>
                <Send width={20} height={20} />
              </View>
            </View>


            <View style={{
              marginTop: 30,
              width: width / 1.1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: COLORS.white,
              // borderRadius: 10,
              // elevation: 5,
              alignItems: 'center',
              // paddingRight: 20,
              paddingVertical: 5
            }}>
              <View style={{
                width: '45%',
                elevation: 5,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                paddingVertical: 15,
                paddingHorizontal: 10,
                alignItems: 'center'
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Twitter width={20} height={20} />
                  <Text style={{
                    paddingLeft: 5,
                    fontSize: 13,
                    color: COLORS.black
                  }}>Twitter</Text>
                </View>
              </View>
              <View style={{
                width: '45%',
                elevation: 5,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                paddingVertical: 15,
                paddingHorizontal: 10,
                alignItems: 'center'
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Facebook width={20} height={20} />
                  <Text style={{
                    paddingLeft: 5,
                    fontSize: 13,
                    color: COLORS.black
                  }}>Facebook</Text>
                </View>
              </View>
            </View>

            <View style={{
              marginTop: 10,
              width: width / 1.1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: COLORS.white,
              // borderRadius: 10,
              // elevation: 5,
              alignItems: 'center',
              // paddingRight: 20,
              paddingVertical: 5
            }}>
              <View style={{
                width: '45%',
                elevation: 5,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                paddingVertical: 15,
                paddingHorizontal: 10,
                alignItems: 'center'
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <WhatsApp width={20} height={20} />
                  <Text style={{
                    paddingLeft: 5,
                    fontSize: 13,
                    color: COLORS.black
                  }}>WhatsApp</Text>
                </View>
              </View>
              <View style={{
                width: '45%',
                elevation: 5,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 10,
                alignItems: 'center'
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <WhatsApp width={20} height={20} />
                  <Text style={{
                    paddingLeft: 5,
                    fontSize: 13,
                    color: COLORS.black
                  }}>Send to all on WhatsApp</Text>
                </View>
              </View>
            </View>

            <View style={{
              marginTop: 10,
              width: width / 1.1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: COLORS.white,
              // borderRadius: 10,
              // elevation: 5,
              alignItems: 'center',
              // paddingRight: 20,
              paddingVertical: 5
            }}>
              <View style={{
                width: '45%',
                elevation: 5,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                paddingVertical: 15,
                paddingHorizontal: 10,
                alignItems: 'center'
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Reddit width={20} height={20} />
                  <Text style={{
                    paddingLeft: 5,
                    fontSize: 13,
                    color: COLORS.black
                  }}>Reddit</Text>
                </View>
              </View>
              <View style={{
                width: '45%',
                elevation: 5,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                paddingVertical: 15,
                paddingHorizontal: 10,
                alignItems: 'center'
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Linkedin width={20} height={20} />
                  <Text style={{
                    paddingLeft: 5,
                    fontSize: 13,
                    color: COLORS.black
                  }}>Linked in </Text>
                </View>
              </View>
            </View>


            <View style={{
              marginTop: 10,
              width: width / 1.1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: COLORS.white,
              // borderRadius: 10,
              // elevation: 5,
              alignItems: 'center',
              // paddingRight: 20,
              paddingVertical: 5
            }}>
              <View style={{
                width: '45%',
                elevation: 5,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                paddingVertical: 15,
                paddingHorizontal: 10,
                alignItems: 'center'
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <TikTok width={20} height={20} />
                  <Text style={{
                    paddingLeft: 5,
                    fontSize: 13,
                    color: COLORS.black
                  }}>TikTok</Text>
                </View>
              </View>
              <View style={{
                width: '45%',
                elevation: 5,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                paddingVertical: 15,
                paddingHorizontal: 10,
                alignItems: 'center'
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <CopyLink width={20} height={20} />
                  <Text style={{
                    paddingLeft: 5,
                    fontSize: 13,
                    color: COLORS.black
                  }}>Copy Link</Text>
                </View>
              </View>
            </View>

            <View style={{
              paddingVertical: 20
            }}>
              <CustomeButton title={'Send to all'} width={width / 1.1} />
            </View>


            <View style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.black
              }}>
                Send message on IG
              </Text>
              <Text style={{
                fontSize: 12,
                color: COLORS.black,
                textAlign: 'center'
              }}>
                Don’t forget to share don't forget to invite your influencer friends on IG and make 5% of end user subscription they bring in
              </Text>
            </View>


            <View style={{
              paddingVertical: 20
            }}>
              <CustomeButton title={'Send message'} width={width / 1.1} />
            </View>






          </View>
        </ScrollView>
        <Loader modal={uploading} uploading={uploading} />

      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.white
  },
  contentContainer: {
    // borderRadius:50,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
    // backgroundColor:COLORS.black
  },
})