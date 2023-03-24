import { ActivityIndicator, Dimensions, FlatList, Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderTabOne from '../components/HeaderTabOne';
import COLORS from '../../consts/Colors';
import CustomeButton from '../components/CustomeButton'
import LikesCard from '../components/LikesCard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import { selectChatuser, selectUser } from '../../../redux/reducers/Reducers';
import SVGImg1 from '../../assets/menu.svg';
import Slider from '@react-native-community/slider';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const filteruser = [
  {
    id: 1,
    name: 'Guys',
    value: 'Male',
  },
  {
    id: 2,
    name: 'Girls',
    value: 'Female',
  },
  {
    id: 3,
    name: 'Both',
    value: 'Both',
  },
]

const filterAdvance = [
  {
    id: 1,
    name: 'Status',
    image: require('../../assets/modal/Status.png')
  },
  {
    id: 2,
    name: 'Non Smoker',
    image: require('../../assets/modal/info2.png')
  },
  {
    id: 3,
    name: 'Drinker',
    image: require('../../assets/modal/info6.png')
  },
  {
    id: 4,
    name: 'Kids',
    image: require('../../assets/modal/Kids.png')
  },
  {
    id: 5,
    name: 'Pets',
    image: require('../../assets/modal/Pets.png')
  },
  {
    id: 6,
    name: 'Orintation',
    image: require('../../assets/modal/info8.png')
  },
  {
    id: 7,
    name: 'Language',
    image: require('../../assets/modal/info7.png')
  },
  {
    id: 8,
    name: 'Height',
    image: require('../../assets/modal/info3.png')
  },
  {
    id: 9,
    name: 'Personality',
    image: require('../../assets/modal/info5.png')
  },
  {
    id: 10,
    name: 'Education',
    image: require('../../assets/modal/info4.png')
  },
  {
    id: 11,
    name: 'Religion',
    image: require('../../assets/modal/Religion.png')
  },
  {
    id: 12,
    name: 'Political Views',
    image: require('../../assets/modal/PoliticalViews.png')
  },
  {
    id: 13,
    name: 'Any Disability',
    image: require('../../assets/modal/AnyDisability.png')
  },
  {
    id: 14,
    name: 'Your Body Type',
    image: require('../../assets/modal/YourBodyType.png')
  },
  {
    id: 15,
    name: 'Music',
    image: require('../../assets/modal/Music.png')
  },
  {
    id: 16,
    name: 'Favourite Food',
    image: require('../../assets/modal/FavouriteFood.png')
  },
  {
    id: 17,
    name: 'Exercise',
    image: require('../../assets/modal/Exercise.png')
  },
]

const LikeDetailScreen = ({ navigation }) => {
  const [likedusers, setLikedUser] = useState();
  const [modalDataUid, setModalDataUid] = useState();
  const [showFilter, setShowFilter] = useState(false);
  const [showAdvanceFilter, setShowAdvanceFilter] = useState(false);
  const [segmentedButtons, setSegmentedButtons] = useState(false);
  const [selectGender, setSelectGender] = useState(1);
  const [selectMinMaxAge, setSelectMinMaxAge] = useState('minage');
  const [FilterModaldata, setFilterModaldata] = useState([]);
  const [uploading, setUploading] = useState(false);


  const [minimumAge, setminimumAgeRange] = useState(0);
  const [maximumAge, setmaximumAgeRange] = useState(0);
  const [distance, setDistance] = useState(0);
  const user = useSelector(selectUser)
  const MatchUser = useSelector(selectChatuser);

  // console.log(user.uid);

  const fetchLikedUser = async () => {
    const userGender = user.Gender
    // console.log(userGender);
    if (userGender == 'Male') {
      fetchLikedUserFemale();
    }
    else {
      fetchLikedUserMale();
    }
  }

  const fetchLikedUserMale = async () => {
    const likedUser = [];
    await firestore()
      .collection('Users')
      .where("userDetails.Gender", '==', "Male")
      .onSnapshot(querySnapshot => {
        // console.log('Total user: ', querySnapshot.size);
        const modalDataUid = [];
        querySnapshot.forEach((documentSnapshot) => {
          // console.log('User ID: ', documentSnapshot.data());
          if (documentSnapshot.data()?.PrivateChat) {
            // console.log(documentSnapshot.data()?.PrivateChat);
            documentSnapshot.data()?.PrivateChat.map(LikedUser => {
              if (LikedUser.ChatuserDetails.uid == user.uid) {
                likedUser.push(documentSnapshot.data().userDetails)
                // console.log('test', documentSnapshot.data().userDetails);
              } else {
                console.log('no like found');
                // setChatUserDetail('')
              }
            })
            // console.log('final', likedUser);
            // users.push(documentSnapshot.data().userDetails);
            // modalDataUid.push(documentSnapshot.id);
          }
        });
        setLikedUser(likedUser)
        setModalDataUid(modalDataUid)
      })
    // console.log('==>' , likedusers);
  }


  const fetchLikedUserFemale = async () => {
    const likedUser = [];
    await firestore()
      .collection('Users')
      .where("userDetails.Gender", '==', "Female")
      .onSnapshot(querySnapshot => {
        // console.log('Total user: ', querySnapshot.size);
        const modalDataUid = [];
        querySnapshot.forEach((documentSnapshot) => {
          // console.log('User ID: ', documentSnapshot.data());
          if (documentSnapshot.data()?.PrivateChat) {
            // console.log(documentSnapshot.data()?.PrivateChat);
            documentSnapshot.data()?.PrivateChat.map(LikedUser => {
              if (LikedUser.ChatuserDetails.uid == user.uid) {
                likedUser.push(documentSnapshot.data().userDetails)
                // console.log('test', documentSnapshot.data().userDetails);
              } else {
                console.log('no like found');
                // setChatUserDetail('')
              }
            })
            // console.log('final', likedUser);
            // users.push(documentSnapshot.data().userDetails);
            // modalDataUid.push(documentSnapshot.id);
          }
        });
        setLikedUser(likedUser)
        setModalDataUid(modalDataUid)
      })
    // console.log('==>' , likedusers);
  }
  useEffect(() => {
    fetchLikedUser();
  }, [])


  const ApplyFilter = async () => {
    const filterGender = filteruser[selectGender]
    const filterMinAge = Math.floor(minimumAge * 100)
    const filterMaxAge = Math.floor(maximumAge * 100)
    const filterDistance = Math.floor(distance * 500)

    if (filterMinAge < 17 || filterDistance < 20 || !filterGender) {
      if (filterMinAge < 17) {
        ToastAndroid.show("Minimum age must be 17 atleast!", ToastAndroid.SHORT);
      }
      else if (filterDistance < 20) {
        ToastAndroid.show("Distance must be 20miles atleast!", ToastAndroid.SHORT);
      }
      else if (!filterGender) {
        ToastAndroid.show("Please select gender you looking for!", ToastAndroid.SHORT);
      }
    }
    else {
      console.log(
        // filterAdvance,
        filterMinAge,
        filterGender.value,
        filterDistance,
        filterMaxAge,
        // FilterModaldata
      );
      setUploading(true)
      const userRef = await firestore().collection('Users')
        .doc(user.uid)
      userRef.update({
        'userDetails.filterMinAge': filterMinAge,
        'userDetails.filterGender': filterGender.value,
        'userDetails.filterDistance': filterDistance,
        'userDetails.filterMaxAge': filterMaxAge,
      }).then(() => {
        setShowFilter(false)
        console.log('filter updated');
        ToastAndroid.show('Filter applied!', ToastAndroid.SHORT);
        setUploading(false)
      })

    }
  }

  const SelectedAdvanceFilter = (item) => {
    console.log(item);
    FilterModaldata.push(item);
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: COLORS.white,
          height: '8%'
        }}>
          <TouchableOpacity style={{ flex: 1, paddingHorizontal: 20 }}>
            <SVGImg1 width={46} height={46} />
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: COLORS.black
            }}>Liked you</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={() => setShowFilter(true)}>
              <Text style={{
                // fontWeight: 'bold',
                // fontSize: 20,
                color: COLORS.blue
              }}>Matches</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} vertical>
          <View style={{
            backgroundColor: COLORS.white,
            paddingBottom: 20,
            marginBottom: 300,
            height: '92%'
          }}>
            <View style={{
              alignItems: 'center',
              paddingTop: 10,
              paddingBottom: 20,
              paddingHorizontal: 40
            }}>
              <Text style={{
                textAlign: 'center'
              }}>These people would like to Chat with you.Like
                them back to start a conservation.</Text>
            </View>

            <View style={{
              marginHorizontal: 20,
              padding: 20,
              alignItems: 'center',
              borderRadius: 20,
              elevation: 5,
              backgroundColor: COLORS.light
            }}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  paddingVertical: 5,
                }}>Boost for more likes</Text>
              </View>
              <View style={{
                paddingHorizontal: 10,
                paddingBottom: 10,
              }}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 12
                }}>Boost your profile and get seen 30x more</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowFilter(true)}
                activeOpacity={0.8} style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: COLORS.main,
                  borderRadius: 10,
                }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 13,
                  fontWeight: 'bold'
                }}>Boost for 10$</Text>
              </TouchableOpacity>
            </View>

            <View style={{
              paddingHorizontal: 0,
            }}>
              <View style={{
                paddingTop: 20,
                width: '30%',
                paddingLeft: 20,
              }}>
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  fontFamily: 'Roboto-Medium',
                  color: COLORS.main,
                  borderBottomColor: COLORS.main,
                  borderBottomWidth: 0.5,
                  textAlign: 'center'
                }}>Your Matches</Text>
              </View>

              {MatchUser ? (
                // <View style={{ height: 170, width:'100%' }}>
                <>
                  {MatchUser.map((item, index) => (
                    <View key={index} style={{
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                      alignItems: 'center',
                      paddingVertical: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.gray2,
                      width: '100%',
                      // backgroundColor:COLORS.main,
                      height: 85,
                    }}>
                      <View style={{
                        marginHorizontal: 10,
                        borderRadius: 50,
                        width: '15%',
                      }}>
                        <Image source={{ uri: item.image1 }} resizeMode='contain'
                          style={{
                            width: 45,
                            height: 45,
                            borderRadius: 10,
                          }} />
                      </View>

                      <View style={{
                        width: '45%',
                        justifyContent: 'center',
                      }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{
                            fontWeight: 'bold',
                            color: COLORS.black,
                            paddingRight: 10,
                          }}>{item.Name}</Text>
                          <Text>now</Text>
                        </View>
                        <Text>6:13PM</Text>
                      </View>
                      <View style={{
                        // width: '40%',
                        // paddingHorizontal: 20
                      }}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('CongratsMatchScreen', {
                            userName: item.Name,
                            userImg: item.image1,
                            uid: item.uid,
                          })}
                          style={{
                            padding: 5,
                            borderRadius: 20,
                            borderWidth: 1,
                            elevation: 5,
                            backgroundColor: COLORS.white,
                            borderColor: COLORS.light,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Text style={{
                            paddingHorizontal: 5,
                            textAlign: 'center',
                            fontSize: 10,
                            // width: '80%',
                            color: 'red',
                          }}>Match Found!</Text>
                          <Image source={require('../../assets/heart.png')} resizeMode='contain'
                            style={{
                              tintColor: 'red',
                              width: 20,
                              height: 20,
                            }} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </>
                // </View>
              ) : (
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  paddingVertical: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.gray2,
                  width: '100%',
                  // backgroundColor:COLORS.main,
                  height: 85,
                }}>
                  <Text>
                    (No Matches)Liked them back to get your matches..
                  </Text>
                </View>
              )}
            </View>

            <View style={{
              // alignItems: 'center',
              // justifyContent:'center',
              paddingHorizontal: 10,
            }}>
              {likedusers ? (
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: "space-between",
                  width: '100%',
                  paddingHorizontal: 10
                }}>
                  {likedusers.map((item, index) => (
                    <View key={index}
                      style={{
                        marginTop: 20,
                        width: '45%',
                        marginHorizontal: 5,
                      }}>
                      <LikesCard image={{ uri: item.image1 }} name={item.Name} navigation={navigation}
                        description='Model at Instagram' item={item} />
                    </View>
                  ))}
                </View>
              ) : (
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                  width: '100%',
                }}>
                  <Text>
                    User's not found who's like to chat with you..
                  </Text>
                </View>
              )}

            </View>
            <View style={{
              paddingHorizontal: 20,
              paddingTop: 20
            }}>
              <View style={{
                padding: 0
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 20,
                  fontWeight: 'bold'
                }}>Suggested Options</Text>
              </View>
              <View style={{
                paddingBottom: 20,
                paddingTop: 5
              }}>
                <Text>Suggested by Our concierge Team and Other Members
                  Never by Bots or Ai</Text>
              </View>
            </View>
            <View style={{
              marginHorizontal: 20,
              padding: 20,
              alignItems: 'center',
              borderRadius: 20,
              elevation: 5,
              backgroundColor: COLORS.light
            }}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  paddingVertical: 5,
                }}>Upgrade to Premium to Unlock</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowFilter(true)}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: COLORS.main,
                  borderRadius: 10,
                  alignItems: 'center'
                }}>
                <Image source={require('../../assets/Crown.png')} resizeMode="contain" style={{
                  width: 22.14,
                  height: 14.79,
                }} />
                <Text style={{
                  color: COLORS.black,
                  fontSize: 13,
                  fontWeight: 'bold',
                  paddingLeft: 5
                }}>Upgrade</Text>
              </TouchableOpacity>
            </View>

            {/* test  */}
            <View style={{
              // alignItems: 'center',
              // justifyContent:'center',
              paddingHorizontal: 10,
            }}>
              {likedusers ? (
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: "space-between",
                  width: '100%',
                  paddingHorizontal: 10
                }}>
                  {likedusers.map((item, index) => (
                    <View key={index}
                      style={{
                        marginTop: 20,
                        width: '45%',
                        marginHorizontal: 5,
                      }}>
                      <LikesCard image={{ uri: item.image1 }} name={item.Name} navigation={navigation}
                        description='Model at Instagram' item={item} />
                    </View>
                  ))}
                </View>
              ) : (
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                  width: '100%',
                }}>
                  <Text>
                    User's not found who's like to chat with you..
                  </Text>
                </View>
              )}

            </View>




            <View style={{
              paddingHorizontal: 20,
              paddingTop: 20
            }}>
              <View style={{
                padding: 0
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 20,
                  fontWeight: 'bold'
                }}>Bot matches from AI</Text>
              </View>
              <View style={{
                paddingBottom: 20,
                paddingTop: 5
              }}>
                <Text>Suggested by AI based on your profile</Text>
              </View>
            </View>
            <View style={{
              marginHorizontal: 20,
              padding: 20,
              alignItems: 'center',
              borderRadius: 20,
              elevation: 5,
              backgroundColor: COLORS.light
            }}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  paddingVertical: 5,
                }}>Upgrade to Premium to Unlock</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowFilter(true)}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: COLORS.main,
                  borderRadius: 10,
                  alignItems: 'center'
                }}>
                <Image source={require('../../assets/Crown.png')} resizeMode="contain" style={{
                  width: 22.14,
                  height: 14.79,
                }} />
                <Text style={{
                  color: COLORS.black,
                  fontSize: 13,
                  fontWeight: 'bold',
                  paddingLeft: 5
                }}>Upgrade</Text>
              </TouchableOpacity>
            </View>

            {/* temp2  */}
            <View style={{
              // alignItems: 'center',
              // justifyContent:'center',
              paddingHorizontal: 10,
            }}>
              {likedusers ? (
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: "space-between",
                  width: '100%',
                  paddingHorizontal: 10
                }}>
                  {likedusers.map((item, index) => (
                    <View key={index}
                      style={{
                        marginTop: 20,
                        width: '45%',
                        marginHorizontal: 5,
                      }}>
                      <LikesCard image={{ uri: item.image1 }} name={item.Name} navigation={navigation}
                        description='Model at Instagram' item={item} />
                    </View>
                  ))}
                </View>
              ) : (
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                  width: '100%',
                }}>
                  <Text>
                    User's not found who's like to chat with you..
                  </Text>
                </View>
              )}

            </View>


            {/* 
            <View style={{
              marginTop: 20,
              marginHorizontal: 20,
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LikesCard image={require('../../assets/profile6.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
                <LikesCard image={require('../../assets/profile4.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
              </View>
            </View>

            <View style={{
              marginTop: 20,
              marginHorizontal: 20,
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LikesCard image={require('../../assets/profile6.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
                <LikesCard image={require('../../assets/profile4.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
              </View>
            </View> */}
          </View>



          <Modal
            animationType="slide"
            transparent={true}
            visible={showFilter}
            onRequestClose={() => {
              setShowFilter(!showFilter);
            }}
          >
            <View style={{
              height: windowHeight,
              backgroundColor: COLORS.white
            }}>
              <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View>
                  <View style={{
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <TouchableOpacity>
                      <Image source={require('../../assets/right.png')} resizeMode='contain' style={{
                        tintColor: COLORS.black
                      }} />
                    </TouchableOpacity>
                    <View>
                      <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: COLORS.black
                      }}>
                        Filter
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setShowFilter(false)}>
                      <Image source={require('../../assets/cross.png')} resizeMode='contain' style={{
                        tintColor: COLORS.black
                      }} />
                    </TouchableOpacity>
                  </View>
                  <View style={{
                    paddingHorizontal: 20,
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: COLORS.black
                    }}>
                      I'm interested in
                    </Text>
                  </View>
                  <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: COLORS.gray2,
                    marginHorizontal: 20,
                  }}>
                    {filteruser.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectGender(index)}
                        style={{
                          borderWidth: selectGender == index ? 1 : 0,
                          borderColor: selectGender == index ? '#2A3182' : null,
                          borderRadius: 10,
                          paddingHorizontal: 20,
                          paddingVertical: 15,
                          width: '33%'
                        }}>
                        <Text style={{
                          textAlign: 'center'
                        }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingTop: 20,
                  }}>
                    <View style={{
                      flex: 1,
                    }}>
                      <Text style={{
                        fontSize: 16,
                        // fontWeight: 'bold',
                        color: COLORS.black
                      }}>Age Range</Text>
                    </View>
                    <View style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'flex-end'
                    }}>
                      <TouchableOpacity onPress={() => setSelectMinMaxAge('minage')}
                        style={{
                          // backgroundColor: COLORS.main,
                          // paddingHorizontal: 3,
                          // borderRadius: 4
                        }}>
                        <Text style={{
                          fontSize: 20,
                          color: COLORS.black,
                          fontWeight: 'bold'
                        }}>{Math.floor(minimumAge * 100)}</Text>
                      </TouchableOpacity>
                      <Text> - </Text>
                      <TouchableOpacity onPress={() => setSelectMinMaxAge('maxage')}
                        style={{
                          // backgroundColor: COLORS.main,
                          // paddingHorizontal: 3,
                          // borderRadius: 4
                        }}>
                        <Text style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: COLORS.black
                        }}>{Math.floor(maximumAge * 100)}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {selectMinMaxAge == 'maxage' ?
                    <View style={{
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Slider
                        style={{ width: '100%', height: 40, }}
                        minimumValue={0}
                        maximumValue={1}
                        thumbTouchSize={{
                          width: 40, height: 40
                        }}
                        thumbTintColor={COLORS.main}
                        minimumTrackTintColor={COLORS.main}
                        maximumTrackTintColor={COLORS.gray}
                        onValueChange={(value) => setmaximumAgeRange(value)}
                      />
                    </View>
                    :
                    <View style={{
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Slider
                        style={{ width: '100%', height: 40, }}
                        minimumValue={0}
                        maximumValue={1}
                        thumbTouchSize={{
                          width: 40, height: 40
                        }}
                        thumbTintColor={COLORS.main}
                        minimumTrackTintColor={COLORS.main}
                        maximumTrackTintColor={COLORS.gray}
                        onValueChange={(value) => setminimumAgeRange(value)}
                      />
                    </View>
                  }

                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    justifyContent: 'space-between'
                  }}>
                    <View style={{
                    }}>
                      <Text style={{
                        fontSize: 16,
                        // fontWeight: 'bold',
                        color: COLORS.black
                      }}>Distance(miles) {Math.floor(distance * 500)}</Text>
                    </View>
                    <View style={{
                    }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: COLORS.black
                      }}>Whole country</Text>
                    </View>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Slider
                      style={{ width: '100%', height: 40, }}
                      minimumValue={0}
                      maximumValue={1}
                      thumbTouchSize={{
                        width: 40, height: 40
                      }}
                      thumbTintColor={COLORS.main}
                      minimumTrackTintColor={COLORS.main}
                      maximumTrackTintColor={COLORS.gray}
                      onValueChange={(value) => setDistance(value)}
                    />
                  </View>

                  {!FilterModaldata.length == 0 &&
                    <>
                      {FilterModaldata.map((item, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginVertical: 10
                          }}>
                          <View style={{
                            flex: 1
                          }}>
                            <Image source={item.image} resizeMode='contain' style={{
                              width: 40,
                              height: 40
                            }} />
                          </View>
                          <View style={{
                            flex: 4,
                            alignItems: 'flex-start'
                          }}>
                            <Text style={{
                              fontSize: 16,
                              color: COLORS.black
                            }}>
                              {item.name}
                            </Text>
                          </View>
                          <View style={{
                            flex: 1,
                            alignItems: 'flex-end'
                          }}>
                            <Image source={require('../../assets/back.png')} resizeMode='contain' style={{
                              width: 20,
                              height: 20,
                              tintColor: COLORS.black
                            }} />
                          </View>
                        </View>
                      ))}
                    </>
                  }

                  <View style={{
                    backgroundColor: COLORS.light,
                    justifyContent: 'center',
                    paddingVertical: 20,
                    marginTop: 20
                  }}>
                    <View style={{
                      paddingHorizontal: 20,
                    }}>
                      <Text style={{
                        color: COLORS.black,
                        fontSize: 20
                      }}>Advanced fillters</Text>
                    </View>
                    <View style={{
                      paddingHorizontal: 20,
                    }}>
                      <Text style={{
                        fontSize: 13
                      }}>Mix and match up to 3 filters, or use them all
                        at once with Premium</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => setShowAdvanceFilter(!showAdvanceFilter)}
                    style={{
                      marginHorizontal: 20,
                      marginTop: -10,
                      alignItems: 'center',
                      alignSelf: 'center',
                      // padding:5,
                      borderRadius: 30,
                      backgroundColor: COLORS.main,
                      width: 30,
                      height: 30,
                      justifyContent: 'center'
                    }}>
                    {showAdvanceFilter ?
                      <Image source={require('../../assets/dropdown.png')} resizeMode='contain'
                        style={{ transform: [{ rotateZ: '-180deg' }] }}
                      />
                      :
                      <Image source={require('../../assets/dropdown.png')} resizeMode='contain' />
                    }
                  </TouchableOpacity>

                  {showAdvanceFilter == true &&
                    filterAdvance.map((item, index) => (
                      <TouchableOpacity
                        onPress={() => SelectedAdvanceFilter(item)}
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: 20,
                          marginBottom: 20
                        }}>
                        <View style={{
                          flex: 1
                        }}>
                          <Image source={item.image} resizeMode='contain' style={{
                            width: 40,
                            height: 40
                          }} />
                        </View>
                        <View style={{
                          flex: 4,
                          alignItems: 'flex-start'
                        }}>
                          <Text style={{
                            fontSize: 16,
                            color: COLORS.black
                          }}>
                            {item.name}
                          </Text>
                        </View>
                        <View style={{
                          flex: 1,
                          alignItems: 'flex-end'
                        }}>
                          <Image source={require('../../assets/back.png')} resizeMode='contain' style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black
                          }} />
                        </View>
                      </TouchableOpacity>
                    ))
                  }


                  <View style={{
                    paddingVertical: 5, alignItems: 'center',
                    paddingTop: '30%',
                    marginBottom: 40,
                    paddingHorizontal: 20
                  }}>
                    <View>
                      <Text>
                        Answer these questions on your own profile
                        to use these filters
                      </Text>
                    </View>
                    {!uploading == true ?
                      <CustomeButton onpress={() => ApplyFilter()} title={'Apply'}
                        bcolor={COLORS.main} border={COLORS.white} />
                      :
                      <View style={{
                        backgroundColor: COLORS.main,
                        width: 329,
                        height: 50,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <ActivityIndicator size="small" color={COLORS.white} animating={uploading} />
                      </View>
                    }
                  </View>

                </View>
              </ScrollView>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default LikeDetailScreen

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})