import { ActivityIndicator, Alert, Dimensions, Image, Modal, PermissionsAndroid, Platform, SafeAreaView, ScrollView, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
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
import Share from 'react-native-share';
// import Facebook from '../../../../assets/Facebook.svg';
// import Facebook from '../../../../assets/Facebook.svg';
import SuggestMatche from '../../../components/SuggestMatche';
import messaging from '@react-native-firebase/messaging';
import SVGImg2 from '../../../../assets/filtermenu.svg'
import Edite from '../../../../assets/edit.svg'
import Send from '../../../../assets/send.svg'
import { BarChart, ProgressChart } from 'react-native-chart-kit';
import Speedometer from '../../../components/Speedometer';
import { RadioButton, TextInput } from 'react-native-paper';
import CustomeButton from '../../../components/CustomeButton';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import HeaderTabOne from '../../../components/HeaderTabOne';
import UserProfileView from '../../../components/UserProfileView';
import { launchImageLibrary } from 'react-native-image-picker';

const { width, height } = Dimensions.get("window");

const CoordinatorBtn = [
  {
    id: '1',
    name: 'Edit',
  },
  {
    id: '2',
    name: 'Preview',
  }
];

const FilterTag = [
  {
    id: '1',
    Title: 'Smoe Van',
    description: require('../../../../assets/profile1.png'),
  },
  {
    id: '2',
    Title: 'Smoe Van',
    description: require('../../../../assets/profile1.png'),
  },
  {
    id: '3',
    Title: 'Smoe Van',
    description: require('../../../../assets/profile1.png'),
  },
];


const SuggestionScreen = ({ navigation, route }) => {
  const { data } = route.params
  // let afcode = Math.random().toString(16).slice(2);
  // const [code, setCode] = useState(afcode);
  const [value, setValueIndex] = useState(2);
  const [coordinatorBtn, setCoordinatorBtn] = useState('Preview');
  const [staffCategory, setStaffCategory] = useState(FilterTag);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [image6, setImage6] = useState(null);
  const [about, setabout] = useState(null);
  const [aboutEdit, setaboutEdit] = useState(false);
  const [aboutError, setaboutError] = useState(false);
  const [staffCategoryIndex, setStaffCategoryIndex] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingTwo, setUploadingTwo] = useState(false);
  const [search, setSearch] = useState(null);
  const [selectUser, setSelectUser] = useState(null);

  const [rUser, setRUser] = useState(null);
  const [rUserTemp, setRUserTemp] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [AdvFilter, setAdvFilter] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [matcheModal, setMatchModal] = useState(false);
  const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [suggestedMatch, setSuggestedMatch] = useState(false);
  const [matchIndex, setMatchIndex] = useState(null);
  const [matchUsers, setMatchUsers] = useState(null);

  const [userTemp, setUserTemp] = useState(null);
  const [matchUserTemp, setMatchUserTemp] = useState(null);
  const mediator = useSelector(selectMediatorUser);


  const CurrentUser = auth().currentUser.uid;


  const requestDetail = () => {
    navigation.goBack()
  }


  const handleSlide = (index) => {
    // console.log('slide');
    setValueIndex(index)
    const viewPage = CoordinatorBtn[index].name
    setCoordinatorBtn(viewPage);
  };
  const pickImage1 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    setImage1(result.assets[0].uri);
  };
  const pickImage2 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    setImage2(result.assets[0].uri);
  };
  const pickImage3 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    setImage3(result.assets[0].uri);
  };
  const pickImage4 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    setImage4(result.assets[0].uri);
  };
  const pickImage5 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    setImage5(result.assets[0].uri);
  };
  const pickImage6 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    setImage6(result.assets[0].uri);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.container}>
        <View style={{
          height: height,
          backgroundColor: COLORS.white,
        }}>

          <View style={{
            height: height / 15,
            backgroundColor: COLORS.white,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
            <TouchableOpacity
              onPress={() => requestDetail()}
              style={{
                flex: 1,
                // alignItems:'center',
              }}>
              <Image source={require('../../../../assets/arrowleft.png')} resizeMode='contain'
                style={{
                  width: 21,
                  height: 20,
                  tintColor: COLORS.black
                }} />
            </TouchableOpacity>
            <View style={{
              flex: 3,
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black
              }}>Client Profile</Text>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'center'
            }}>
            </View>
          </View>


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

          {coordinatorBtn == 'Preview' ?
            <UserProfileView data={data} navigation={navigation} />
            :
            <ScrollView showsVerticalScrollIndicator={false} >
              <View style={{
                backgroundColor: COLORS.white,
                paddingBottom: 20,
                marginBottom: 150,
                height: '100%'
              }}>
                <View>
                  <Text style={{
                    color: COLORS.bluedark,
                    textAlign: 'center'
                  }}>Drag to rearrange photos</Text>
                </View>



                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end',
                  alignContent: 'stretch',
                  alignItems: 'center',
                  maxWidth: '100%',
                  margin: 'auto',
                  paddingHorizontal: 20,
                  paddingTop: 20,
                }}>
                  <View style={{
                    flexDirection: 'row',
                    width: '70%',
                    height: 200,
                    paddingRight: 5
                  }}>
                    {image1 ?
                      <TouchableOpacity
                        onPress={pickImage1}
                        style={{
                          height: '100%',
                          width: '100%',
                          backgroundColor: COLORS.mainlight,
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                        <Image source={{ uri: image1 }} resizeMode='cover' style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 10,
                        }} />
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        onPress={pickImage1}
                        style={{
                          height: '100%',
                          width: '100%',
                          backgroundColor: COLORS.mainlight,
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                        <Text style={{
                          width: '70%',
                          textAlign: 'center',
                          color: COLORS.black
                        }}>
                          Profile Picture
                        </Text>
                      </TouchableOpacity>
                    }
                  </View>
                  <View style={{
                    flexDirection: 'column',
                    width: '30%',
                    height: 200,
                    justifyContent: 'space-between'
                  }}>
                    {image2 ?
                      <TouchableOpacity
                        onPress={pickImage2}
                        style={{
                          height: 98,
                          backgroundColor: COLORS.mainlight,
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                        <Image source={{ uri: image2 }} resizeMode='cover' style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 10,
                        }} />
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        onPress={pickImage2}
                        style={{
                          height: 98,
                          backgroundColor: COLORS.mainlight,
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{ color: COLORS.black, fontSize: 12, }}>
                          Travel Pics
                        </Text>
                      </TouchableOpacity>
                    }

                    {image3 ?
                      <TouchableOpacity
                        onPress={pickImage3}
                        style={{
                          height: 98,
                          backgroundColor: COLORS.mainlight,
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                        <Image source={{ uri: image3 }} resizeMode='cover' style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 10,
                        }} />
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        onPress={pickImage3}
                        style={{
                          height: 98,
                          backgroundColor: COLORS.mainlight,
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{ color: COLORS.black, fontSize: 12, }}>
                          Portrait
                        </Text>
                      </TouchableOpacity>
                    }
                  </View>
                </View>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  // width: '100%',
                  paddingHorizontal: 20,
                  marginTop: 5,
                  justifyContent: 'space-between'
                }}>
                  {image4 ?
                    <TouchableOpacity
                      onPress={pickImage4}
                      style={{
                        height: 98,
                        width: '34%',
                        marginRight: 5,
                        backgroundColor: COLORS.mainlight,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      <Image source={{ uri: image4 }} resizeMode='cover' style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 10,
                      }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                      onPress={pickImage4}
                      style={{
                        height: 98,
                        width: '34%',
                        marginRight: 5,
                        backgroundColor: COLORS.mainlight,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{ color: COLORS.black, fontSize: 12, }}>
                        ActionAction
                      </Text>
                    </TouchableOpacity>
                  }

                  {image5 ?
                    <TouchableOpacity
                      onPress={pickImage5}
                      style={{
                        height: 98,
                        width: '34%',
                        marginRight: 5,
                        backgroundColor: COLORS.mainlight,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      <Image source={{ uri: image4 }} resizeMode='cover' style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 10,
                      }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                      onPress={pickImage5}
                      style={{
                        height: 98,
                        width: '34%',
                        marginRight: 5,
                        backgroundColor: COLORS.mainlight,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{ color: COLORS.black, fontSize: 12, }}>
                        Casual Pic
                      </Text>
                    </TouchableOpacity>
                  }

                  {image6 ?
                    <TouchableOpacity
                      onPress={pickImage6}
                      style={{
                        height: 98,
                        width: '30%',
                        marginRight: 5,
                        backgroundColor: COLORS.mainlight,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      <Image source={{ uri: image4 }} resizeMode='cover' style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 10,
                      }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                      onPress={pickImage6}
                      style={{
                        height: 98,
                        width: '30%',
                        marginRight: 5,
                        backgroundColor: COLORS.mainlight,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{ color: COLORS.black, fontSize: 12, }}>
                        Casual Pic
                      </Text>
                    </TouchableOpacity>
                  }
                </View>


                <View style={{ paddingHorizontal: 20, }}>
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ color: COLORS.black, paddingBottom: 5, fontWeight: 'bold', fontSize: 16 }}> Enter Bio Tips </Text>

                    <View style={{
                      backgroundColor: COLORS.white,
                      borderWidth: 1,
                      borderColor: COLORS.gray2,
                      paddingBottom: 50,
                      width: '100%',
                      borderRadius: 10,
                    }}>

                      <TextInput
                        error={aboutError}
                        onFocus={() => setaboutError(false)}
                        // aria-disabled={true}
                        underlineColor={COLORS.transparent}
                        activeUnderlineColor={COLORS.transparent}
                        editable={aboutEdit}
                        value={about}
                        placeholder={'Enter details'}
                        placeholderTextColor={COLORS.gray}
                        keyboardType='email-address'
                        onChangeText={name => setabout(name)
                        }
                        style={{
                          backgroundColor: COLORS.white,
                        }}
                      />
                    </View>
                  </View>
                </View>


                <View style={{ paddingHorizontal: 20, }}>
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ color: COLORS.black, paddingBottom: 5, fontWeight: 'bold', fontSize: 16 }}> Enter tips </Text>
                    <View style={{
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between'
                    }}>
                      <Text style={{ color: COLORS.black, paddingBottom: 5, fontSize: 12 }}> 1st photo </Text>
                      <Text style={{ color: COLORS.bluedark, paddingBottom: 5, fontSize: 12 }}> Add reference image </Text>
                    </View>
                    <View style={{
                      backgroundColor: COLORS.white,
                      borderWidth: 1,
                      borderColor: COLORS.gray2,
                      width: '100%',
                      borderRadius: 10,
                    }}>

                      <TextInput
                        error={aboutError}
                        onFocus={() => setaboutError(false)}
                        // aria-disabled={true}
                        underlineColor={COLORS.transparent}
                        activeUnderlineColor={COLORS.transparent}
                        editable={aboutEdit}
                        value={about}
                        placeholder={'Enter details'}
                        placeholderTextColor={COLORS.gray}
                        keyboardType='email-address'
                        onChangeText={name => setabout(name)
                        }
                        style={{
                          backgroundColor: COLORS.white,
                        }}
                      />
                    </View>
                  </View>
                </View>


                <View style={{ paddingHorizontal: 20, }}>
                  <View style={{ marginTop: 10 }}>
                    <View style={{
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between'
                    }}>
                      <Text style={{ color: COLORS.black, paddingBottom: 5, fontSize: 12 }}> 2st photo </Text>
                      <Text style={{ color: COLORS.bluedark, paddingBottom: 5, fontSize: 12 }}> Add reference image </Text>
                    </View>
                    <View style={{
                      backgroundColor: COLORS.white,
                      borderWidth: 1,
                      borderColor: COLORS.gray2,
                      width: '100%',
                      borderRadius: 10,
                    }}>

                      <TextInput
                        error={aboutError}
                        onFocus={() => setaboutError(false)}
                        // aria-disabled={true}
                        underlineColor={COLORS.transparent}
                        activeUnderlineColor={COLORS.transparent}
                        editable={aboutEdit}
                        value={about}
                        placeholder={'Enter details'}
                        placeholderTextColor={COLORS.gray}
                        keyboardType='email-address'
                        onChangeText={name => setabout(name)
                        }
                        style={{
                          backgroundColor: COLORS.white,
                        }}
                      />
                    </View>
                  </View>
                </View>



                <View style={{ paddingHorizontal: 20, }}>
                  <View style={{ marginTop: 10 }}>
                    <View style={{
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between'
                    }}>
                      <Text style={{ color: COLORS.black, paddingBottom: 5, fontSize: 12 }}> 3st photo </Text>
                      <Text style={{ color: COLORS.bluedark, paddingBottom: 5, fontSize: 12 }}> Add reference image </Text>
                    </View>
                    <View style={{
                      backgroundColor: COLORS.white,
                      borderWidth: 1,
                      borderColor: COLORS.gray2,
                      width: '100%',
                      borderRadius: 10,
                    }}>

                      <TextInput
                        error={aboutError}
                        onFocus={() => setaboutError(false)}
                        // aria-disabled={true}
                        underlineColor={COLORS.transparent}
                        activeUnderlineColor={COLORS.transparent}
                        editable={aboutEdit}
                        value={about}
                        placeholder={'Enter details'}
                        placeholderTextColor={COLORS.gray}
                        keyboardType='email-address'
                        onChangeText={name => setabout(name)
                        }
                        style={{
                          backgroundColor: COLORS.white,
                        }}
                      />
                    </View>
                  </View>
                </View>



                <View style={{ paddingHorizontal: 20, }}>
                  <View style={{ marginTop: 10 }}>
                    <View style={{
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between'
                    }}>
                      <Text style={{ color: COLORS.black, paddingBottom: 5, fontSize: 12 }}> 4st photo </Text>
                      <Text style={{ color: COLORS.bluedark, paddingBottom: 5, fontSize: 12 }}> Add reference image </Text>
                    </View>
                    <View style={{
                      backgroundColor: COLORS.white,
                      borderWidth: 1,
                      borderColor: COLORS.gray2,
                      width: '100%',
                      borderRadius: 10,
                    }}>

                      <TextInput
                        error={aboutError}
                        onFocus={() => setaboutError(false)}
                        // aria-disabled={true}
                        underlineColor={COLORS.transparent}
                        activeUnderlineColor={COLORS.transparent}
                        editable={aboutEdit}
                        value={about}
                        placeholder={'Enter details'}
                        placeholderTextColor={COLORS.gray}
                        keyboardType='email-address'
                        onChangeText={name => setabout(name)
                        }
                        style={{
                          backgroundColor: COLORS.white,
                        }}
                      />
                    </View>
                  </View>
                </View>



                <View style={{ paddingHorizontal: 20, }}>
                  <View style={{ marginTop: 10 }}>
                    <View style={{
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between'
                    }}>
                      <Text style={{ color: COLORS.black, paddingBottom: 5, fontSize: 12 }}> 5st photo </Text>
                      <Text style={{ color: COLORS.bluedark, paddingBottom: 5, fontSize: 12 }}> Add reference image </Text>
                    </View>
                    <View style={{
                      backgroundColor: COLORS.white,
                      borderWidth: 1,
                      borderColor: COLORS.gray2,
                      width: '100%',
                      borderRadius: 10,
                    }}>

                      <TextInput
                        error={aboutError}
                        onFocus={() => setaboutError(false)}
                        // aria-disabled={true}
                        underlineColor={COLORS.transparent}
                        activeUnderlineColor={COLORS.transparent}
                        editable={aboutEdit}
                        value={about}
                        placeholder={'Enter details'}
                        placeholderTextColor={COLORS.gray}
                        keyboardType='email-address'
                        onChangeText={name => setabout(name)
                        }
                        style={{
                          backgroundColor: COLORS.white,
                        }}
                      />
                    </View>
                  </View>
                </View>

                <View style={{ paddingHorizontal: 20, }}>
                  <View style={{ marginTop: 10 }}>
                    <View style={{
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between'
                    }}>
                      <Text style={{ color: COLORS.black, paddingBottom: 5, fontSize: 12 }}> 6st photo </Text>
                      <Text style={{ color: COLORS.bluedark, paddingBottom: 5, fontSize: 12 }}> Add reference image </Text>
                    </View>
                    <View style={{
                      backgroundColor: COLORS.white,
                      borderWidth: 1,
                      borderColor: COLORS.gray2,
                      width: '100%',
                      borderRadius: 10,
                    }}>

                      <TextInput
                        error={aboutError}
                        onFocus={() => setaboutError(false)}
                        // aria-disabled={true}
                        underlineColor={COLORS.transparent}
                        activeUnderlineColor={COLORS.transparent}
                        editable={aboutEdit}
                        value={about}
                        placeholder={'Enter details'}
                        placeholderTextColor={COLORS.gray}
                        keyboardType='email-address'
                        onChangeText={name => setabout(name)
                        }
                        style={{
                          backgroundColor: COLORS.white,
                        }}
                      />
                    </View>
                  </View>
                </View>


                <View style={{
                  marginTop:50,
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'space-between',
                  paddingHorizontal:20,
                }}>
                  <View>
                    <CustomeButton title={'Skip'} width={width/3} />
                  </View>
                  <CustomeButton title={'Save Changes'} width={width/2} bcolor={COLORS.transparent}  border={COLORS.gray}/>
                </View>



              </View>
            </ScrollView>

          }



        </View>

      </View>
    </SafeAreaView>
  )
}

export default SuggestionScreen

const styles = StyleSheet.create({
  container: {

    height: '100%',
    backgroundColor: COLORS.white,
    paddingVertical: 20,
  },
  contentContainer: {
    // borderRadius:50,
    // flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
    // backgroundColor:COLORS.black
  },
})