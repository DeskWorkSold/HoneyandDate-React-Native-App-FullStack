import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SVGImg1 from '../../../../assets/diamond.svg';
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



const HomeScreen = () => {
  const [coordinatorBtn, setCoordinatorBtn] = useState('Your Clients');
  const [value, setValueIndex] = useState(0);
  const [uploading, setUploading] = useState(0);
  const [isEnabled, setisEnabled] = useState(false);
  const [isEnabled2, setisEnabled2] = useState(false);
  

  const [reqUser, setReqUser] = useState(null)
  // console.log(reqUser);



  const handleSlide = (index) => {
    // console.log('slide');
    setValueIndex(index)
    const viewPage = CoordinatorBtn[index].name
    setCoordinatorBtn(viewPage);
  };

  const fetchUser = async () => {
    setUploading(true)
    await firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];
        querySnapshot.forEach((documentSnapshot) => {
          // console.log(documentSnapshot.data());
          const data = documentSnapshot.data().userDetails;
          users.push(data);
          // if (data.Category == 'Mediator') {
          // }
        })
        setReqUser(users.slice(0, 10))
      })
    setUploading(false)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.container}>

        <View style={styles.contentContainer}>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: "space-between",
            width: '100%',
            // paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: COLORS.light
          }}>
            {CoordinatorBtn.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSlide(index)}
                style={{
                  // flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderWidth: 0.5,
                  width: '50%',
                  // borderColor: value == index ? COLORS.main: COLORS.gray,
                  borderRadius: 10,
                  height: 46,
                  backgroundColor: value == index ? COLORS.main : COLORS.light
                }}
              >
                <Text style={{
                  fontFamily: '',
                  color: COLORS.black
                }}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>


        {coordinatorBtn == 'Your Clients' ?
          <View>
            <Text>test</Text>
          </View>
          :
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ paddingBottom: 10, }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 5
              }}>
                <View>
                  <Text style={{ color: COLORS.black }}>Accept with template</Text>
                </View>
                <View>
                  <Switch
                    trackColor={{ false: COLORS.gray, true: COLORS.mainlight }}
                    thumbColor={isEnabled ? COLORS.main : '#f4f3f4'}
                    ios_backgroundColor={COLORS.main}
                    thumbTouchSize={{
                      width: 40, height: 40
                    }}
                    onValueChange={() => setisEnabled(!isEnabled)}
                    value={isEnabled}
                  />
                </View>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 5
              }}>
                <View>
                  <Text style={{ color: COLORS.black }}>Decline with template</Text>
                </View>
                <View>
                <Switch
                    trackColor={{ false: COLORS.gray, true: COLORS.mainlight }}
                    thumbColor={isEnabled2 ? COLORS.main : '#f4f3f4'}
                    ios_backgroundColor={COLORS.main}
                    thumbTouchSize={{
                      width: 40, height: 40
                    }}
                    onValueChange={() => setisEnabled2(!isEnabled2)}
                    value={isEnabled2}
                  />
                </View>
              </View>
              <View style={{
                width: width / 1.3
              }}>
                <Text style={{
                  fontSize: 12
                }}>
                  Premade template should say thank for choosing me unfortunately i currently am only take on clients that i feel like would be good matches with my currant clients but im sure there are other concierges that would be a better fit and they can still match you with anyone i work with if they feel like your a good match for them.
                </Text>
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ marginBottom: 300 }}>
                {!reqUser?.length == 0 ?
                  reqUser?.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        alignItems: 'center',
                        paddingVertical: 20,
                        elevation: 1,
                        backgroundColor: COLORS.white,
                        marginBottom: 3,
                        // backgroundColor: COLORS.blue
                      }}>
                      <View style={{
                        width: '25%',
                        // backgroundColor: COLORS.gray,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <View style={{
                          borderRadius: 50,
                          borderWidth: 4,
                          borderColor: COLORS.main
                        }}>
                          <Image source={{ uri: item.image1 }} resizeMode='cover' style={{
                            width: 70,
                            height: 70,
                            borderRadius: 50,
                          }} />
                        </View>
                      </View>
                      <View style={{
                        width: '75%',
                        // flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                      }}>
                        <View style={{
                          // backgroundColor: COLORS.dark,
                          width: '100%',
                          // width: width / 1.4,
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingBottom: 10
                        }}>
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '80%',
                            // backgroundColor: COLORS.gray2
                          }}>
                            <View style={{
                              paddingRight: 5
                            }}>
                              <Text style={{
                                fontSize: 15,
                                fontWeight: '500',
                                color: COLORS.black
                              }}>{item.Name.split(' ',)[0]}</Text>
                            </View>
                            <View style={{ paddingRight: 5 }}>
                              <SVGImg1 width={20} height={20} />
                            </View>
                            <View style={{
                              // paddingLeft: 5
                            }}>
                              <Text style={{ fontSize: 12 }}>Diamonds +</Text>
                            </View>
                          </View>
                          <View style={{
                            width: '20%',
                            // paddingHorizontal: 5
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            // backgroundColor: COLORS.black,
                          }}>
                            <Text style={{
                              fontSize: 12,
                              color: COLORS.green
                            }}>Call</Text>
                          </View>
                        </View>
                        <View style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          <View>
                            <TouchableOpacity style={{
                              paddingHorizontal: 40,
                              paddingVertical: 8,
                              borderRadius: 5,
                              backgroundColor: COLORS.black,
                            }}>
                              <Text style={{
                                color: COLORS.white,
                                fontSize: 12,
                              }}>
                                Decline
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View>
                            <TouchableOpacity style={{
                              paddingHorizontal: 40,
                              paddingVertical: 8,
                              borderRadius: 5,
                              backgroundColor: COLORS.main,
                            }}>
                              <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                              }}>
                                Accept
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))
                  :
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: width,
                    height: height
                  }}>
                    <ActivityIndicator size="large" color={COLORS.main} animating={uploading} />
                  </View>
                }
              </View>

            </ScrollView>


          </View>
        }
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
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:COLORS.black
  },
})