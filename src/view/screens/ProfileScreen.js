import { ActivityIndicator, Dimensions, Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../../consts/Colors';
import HeaderTabTwo from '../components/HeaderTabTwo';
import { useDispatch, useSelector } from 'react-redux';
import { Buypackages, packages, selectUser } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const { height, width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const [memberships, setMemberships] = useState();
  const [modal, setModal] = useState(false);
  const [actionTriggered, setActionTriggered] = useState(false);
  const [image, setImage] = useState(null);
  // console.log(image);
  const [membershipUid, setMembershipUid] = useState();
  const [uploading, setUploading] = useState(false);
  const [buyPack, setBuyPack] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const user = useSelector(selectUser);
  // console.log(user.Flake);
  const dispatch = useDispatch();

  const fetchMemberships = async () => {
    setUploading(true)
    try {
      // console.log('hello');
      await firestore()
        .collection('Package')
        .get()
        .then(querySnapshot => {
          // console.log('Total user: ', querySnapshot.size);
          const membership = [];
          const membershipsuid = [];
          querySnapshot.forEach((documentSnapshot) => {
            // console.log('memberships ID: ', documentSnapshot.id, documentSnapshot.data());
            membership.push(documentSnapshot.data());
            membershipsuid.push(documentSnapshot.id);
          });
          setMemberships(membership)
          setMembershipUid(membershipsuid)
        })
      // console.log('membershipData: ', memberships);

    } catch (e) {
      console.log(e);
    }
    setUploading(false)
  };

  const ByMemeberShips = (item) => {
    var Data = new Object();
    Data.discountPercentage = item.discountPercentage;
    Data.discountPrice = item.discountPrice;
    Data.id = item.id;
    Data.name = item.name;
    Data.numberOfCards = item.numberOfCards;
    Data.numberOfChats = item.numberOfChats;
    Data.otherCategory = item.otherCategory;
    Data.rate = item.rate;
    Data.status = item.status;
    // console.log('test data: ', Data);
    // return;
    dispatch(Buypackages(Data))
    // console.log(item.id);
    // const MembershipName = item.otherCategory.split(' ')[0]
    // // console.log(MembershipName);
    // const useRef = firestore().collection('Users')
    //   .doc(user.uid)
    // useRef.update({
    //   'userDetails.AccountType': MembershipName,
    //   'userDetails.PackageId': item.id,
    // }).then(() => {
    //   setBuyPack(true)
    //   // console.log('Notices send!');
    // });
    navigation.navigate('PaymentOptionScreen')
  }
  const uploadImage = async (tempImage, names) => {
    if (tempImage == null) {
      ToastAndroid.show('Network issue please try again!!', ToastAndroid.SHORT)
      return null;
    }
    setModal(true)
    const uploadUri = tempImage;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    // setUploading(true);
    // setTransferred(0);

    const storageRef = storage().ref(`Users/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100,
      );
    });
    if (names == 'image2') {
      try {
        await task;

        const url = await storageRef.getDownloadURL();
        if (url) {
          const useRef = firestore().collection('Users')
            .doc(user?.uid)
          useRef.update({
            'userDetails.image2': url,
          }).then(() => {
            ToastAndroid.show('image uploaded successfull', ToastAndroid.SHORT)
            setModal(false)
            setActionTriggered(null)
            setUploading(false)
          });
        }
        else {
          ToastAndroid.show('Network issue please try again!!', ToastAndroid.SHORT)
        }
        return url;

      } catch (e) {
        console.log(e);
        return null;
      }
    }
    else if (names == 'image3') {
      try {
        await task;

        const url = await storageRef.getDownloadURL();
        if (url) {
          const useRef = firestore().collection('Users')
            .doc(user?.uid)
          useRef.update({
            'userDetails.image3': url,
          }).then(() => {
            ToastAndroid.show('image uploaded successfull', ToastAndroid.SHORT)
            setModal(false)
            setActionTriggered(null)
            setUploading(false)
          });
        }
        else {
          ToastAndroid.show('Network issue please try again!!', ToastAndroid.SHORT)
        }
        return url;

      } catch (e) {
        console.log(e);
        return null;
      }
    }
    else if (names == 'image4') {
      try {
        await task;

        const url = await storageRef.getDownloadURL();
        if (url) {
          const useRef = firestore().collection('Users')
            .doc(user?.uid)
          useRef.update({
            'userDetails.image4': url,
          }).then(() => {
            ToastAndroid.show('image uploaded successfull', ToastAndroid.SHORT)
            setModal(false)
            setActionTriggered(null)
            setUploading(false)
          });
        }
        else {
          ToastAndroid.show('Network issue please try again!!', ToastAndroid.SHORT)
        }
        return url;

      } catch (e) {
        console.log(e);
        return null;
      }
    }
    else if (names == 'image5') {
      try {
        await task;

        const url = await storageRef.getDownloadURL();
        if (url) {
          const useRef = firestore().collection('Users')
            .doc(user?.uid)
          useRef.update({
            'userDetails.image5': url,
          }).then(() => {
            ToastAndroid.show('image uploaded successfull', ToastAndroid.SHORT)
            setModal(false)
            setActionTriggered(null)
            setUploading(false)
          });
        }
        else {
          ToastAndroid.show('Network issue please try again!!', ToastAndroid.SHORT)
        }
        return url;

      } catch (e) {
        console.log(e);
        return null;
      }
    }
    else {
      try {
        await task;

        const url = await storageRef.getDownloadURL();
        if (url) {
          const useRef = firestore().collection('Users')
            .doc(user?.uid)
          useRef.update({
            'userDetails.image6': url,
          }).then(() => {
            ToastAndroid.show('image uploaded successfull', ToastAndroid.SHORT)
            setModal(false)
            setActionTriggered(null)
            setUploading(false)
          });
        }
        else {
          ToastAndroid.show('Network issue please try again!!', ToastAndroid.SHORT)
        }
        return url;

      } catch (e) {
        console.log(e);
        return null;
      }
    }
  }

  const pickImage2 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    const tempImage = result.assets[0].uri;
    const names = 'image2'
    setActionTriggered('UploadImage')
    setUploading(true)
    uploadImage(tempImage, names)
    // setImage1(result.assets[0].uri);
  }
  const pickImage3 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    const tempImage = result.assets[0].uri;
    const names = 'image3'
    setActionTriggered('UploadImage')
    setUploading(true)
    uploadImage(tempImage, names)
  }
  const pickImage4 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    const tempImage = result.assets[0].uri;
    const names = 'image4'
    setActionTriggered('UploadImage')
    setUploading(true)
    uploadImage(tempImage, names)
  }
  const pickImage5 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    const tempImage = result.assets[0].uri;
    const names = 'image5'
    setActionTriggered('UploadImage')
    setUploading(true)
    uploadImage(tempImage, names)
  }
  const pickImage6 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    const tempImage = result.assets[0].uri;
    const names = 'image6'
    setActionTriggered('UploadImage')
    setUploading(true)
    uploadImage(tempImage, names)
  }



  useEffect(() => {
    fetchMemberships();
  }, []);



  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <HeaderTabTwo onpress={() => navigation.navigate('SettingScreen')} />
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View style={{
            marginBottom: 200,
            backgroundColor: COLORS.white,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingBottom: 20
            }}>
              <View style={{
                borderWidth: 3,
                borderColor: COLORS.main,
                borderRadius: 50
              }}>
                {user ? (
                  <Image source={{ uri: user.image1 }} resizeMode='contain' style={{
                    borderRadius: 50,
                    width: 80,
                    height: 80
                  }} />
                ) : (
                  <Image source={require('../../assets/profile1.png')} resizeMode='contain' style={{
                    borderRadius: 30,
                    width: 80,
                    height: 80
                  }} />
                )}
              </View>
              <View style={{
                paddingHorizontal: 20,
                justifyContent: 'center'
              }}>
                {user ? (
                  <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: COLORS.black
                  }}>{user.Name}</Text>
                ) : (
                  <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: COLORS.black
                  }}>Jan dohn</Text>
                )}
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: COLORS.light,
                  borderRadius: 5,
                  padding: 5,
                  width: 120
                }}>
                  <Image source={require('../../assets/dates.png')} resizeMode='contain'
                    style={{
                      marginHorizontal: 5,
                      width: 20,
                      height: 20
                    }} />
                  <Text style={{ color: COLORS.black, fontSize: 13 }}>Want to date</Text>
                </View>
              </View>
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
                {user.image1 ?
                  <TouchableOpacity
                    // onPress={pickImage1}
                    onPress={() => { setModal(true), setImage(user.image1) }}
                    style={{
                      height: '100%',
                      width: '100%',
                      backgroundColor: COLORS.mainlight,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={{ uri: user.image1 }} resizeMode='cover' style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 10,
                    }} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    // onPress={pickImage1}
                    style={{
                      height: '100%',
                      width: '100%',
                      backgroundColor: COLORS.mainlight,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Image source={require('../../assets/uploadimage.png')} style={{
                      width: 30,
                      height: 30,
                    }} />
                    <Text style={{
                      width: '70%'
                    }}>
                      Click to add image
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
                {user.image2 ?
                  <TouchableOpacity
                    // onPress={pickImage2}
                    onPress={() => { setModal(true), setImage(user.image2) }}
                    style={{
                      height: 98,
                      backgroundColor: COLORS.mainlight,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Image source={{ uri: user.image2 }} resizeMode='cover' style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 10,
                    }} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    onPress={() => pickImage2()}
                    style={{
                      height: 98,
                      backgroundColor: COLORS.mainlight,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={require('../../assets/add.png')} style={{
                      width: 20,
                      height: 20,
                    }} />
                  </TouchableOpacity>
                }

                {user.image3 ?
                  <TouchableOpacity
                    // onPress={pickImage3}
                    onPress={() => { setModal(true), setImage(user.image3) }}
                    style={{
                      height: 98,
                      backgroundColor: COLORS.mainlight,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Image source={{ uri: user.image3 }} resizeMode='cover' style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 10,
                    }} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    onPress={() => pickImage3()}
                    style={{
                      height: 98,
                      backgroundColor: COLORS.mainlight,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={require('../../assets/add.png')} style={{
                      width: 20,
                      height: 20,
                    }} />
                  </TouchableOpacity>
                }
              </View>
            </View>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              width: width,
              paddingHorizontal: 20,
              marginTop: 5,
              flexWrap: 'nowrap',
              // justifyContent: 'flex-end',
              alignContent: 'stretch',
              alignItems: 'center',
              maxWidth: '100%',
              margin: 'auto',
              // backgroundColor:COLORS.gray,
              // marginHorizontal:20
              // paddingHorizontal: 20,
              // paddingTop: 20,
            }}>
              {user.image4 ?
                <TouchableOpacity
                  onPress={() => { setModal(true), setImage(user.image4) }}
                  // onPress={pickImage4}
                  style={{
                    height: 98,
                    width: '33%',
                    marginRight: 5,
                    backgroundColor: COLORS.mainlight,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Image source={{ uri: user.image4 }} resizeMode='cover' style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                  }} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => pickImage4()}
                  style={{
                    height: 98,
                    width: '34%',
                    marginRight: 5,
                    backgroundColor: COLORS.mainlight,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={require('../../assets/add.png')} style={{
                    width: 20,
                    height: 20,
                  }} />
                </TouchableOpacity>
              }

              {user.image5 ?
                <TouchableOpacity
                  // onPress={pickImage5}
                  onPress={() => { setModal(true), setImage(user.image5) }}
                  style={{
                    height: 98,
                    width: '33%',
                    marginRight: 5,
                    backgroundColor: COLORS.mainlight,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Image source={{ uri: user.image5 }} resizeMode='cover' style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                  }} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => pickImage5()}
                  style={{
                    height: 98,
                    width: '34%',
                    marginRight: 5,
                    backgroundColor: COLORS.mainlight,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={require('../../assets/add.png')} style={{
                    width: 20,
                    height: 20,
                  }} />
                </TouchableOpacity>
              }


              {user.image6 ?
                <TouchableOpacity
                  // onPress={pickImage5}
                  onPress={() => { setModal(true), setImage(user.image6) }}
                  style={{
                    height: 98,
                    width: '30%',
                    marginRight: 5,
                    backgroundColor: COLORS.mainlight,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Image source={{ uri: user.image6 }} resizeMode='cover' style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                  }} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => pickImage6()}
                  style={{
                    height: 98,
                    width: '30%',
                    marginRight: 5,
                    backgroundColor: COLORS.mainlight,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={require('../../assets/add.png')} style={{
                    width: 20,
                    height: 20,
                  }} />
                </TouchableOpacity>
              }

            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingTop: 20
            }}>
              <View style={{
                flexDirection: 'row',
                backgroundColor: COLORS.white,
                elevation: 5,
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 10,
                alignItems: 'center',
                height: 70,
                width: '49%'
              }}>
                <View>
                  <Image source={require('../../assets/matchperson.png')} resizeMode='contain'
                    style={{
                      width: 30,
                      marginRight: 10
                    }} />
                </View>
                <View>
                  <Text style={{
                    fontSize: 12
                  }}>
                    Your Matches
                  </Text>
                  <Text style={{
                    fontWeight: 'bold',
                    color: COLORS.black,
                    fontSize: 12
                  }}>
                    Very Low
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('CurrentBalanceScreen')}
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.white,
                  elevation: 5,
                  borderRadius: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  alignItems: 'center',
                  height: 70,
                  width: '49%'
                }}>
                <View>
                  <Image source={require('../../assets/credit.png')} resizeMode='contain'
                    style={{
                      width: 30,
                      marginRight: 10
                    }} />
                </View>
                <View>
                  <Text style={{
                    fontSize: 12
                  }}>
                    Credits
                  </Text>
                  <Text style={{
                    fontWeight: 'bold',
                    color: COLORS.black,
                    fontSize: 12
                  }}>
                    $50
                  </Text>
                </View>
              </TouchableOpacity>


            </View>

            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingTop: 20
            }}>
              <View style={{
                height: 80,
                borderRadius: 10,
                width: '100%',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: COLORS.light,
                flexDirection: 'row',
              }}>
                <View style={{
                  paddingRight: 30
                }}>
                  <Text>
                    What type of relationship you
                    are looking for?
                  </Text>
                </View>
                <View>
                  <Image source={require('../../assets/back.png')} resizeMode='contain' />
                </View>
              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
              <View style={{
                height: 80,
                borderRadius: 10,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                backgroundColor: COLORS.light,
                flexDirection: 'row',
              }}>
                <View style={{
                  paddingRight: 20
                }}>
                  <Text>
                    Are you introvert or extrovert?
                  </Text>
                </View>
                <View>
                  <Image source={require('../../assets/back.png')} resizeMode='contain' />
                </View>
              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
              paddingVertical: 20,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: COLORS.light
            }}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: COLORS.black
                }}>Flake Meter</Text>
                <Text>Flakes on your profile</Text>
              </View>
              <View>
                <Text style={{
                  color: COLORS.black,
                  textAlign: 'center'
                }}>
                  #flakemeter
                </Text>
                {user.Flake == 1 &&
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                    <Text>
                      +{user.Flake}
                    </Text>
                  </View>
                  // <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                }
                {user.Flake == 2 &&
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                    <Text>
                      +{user.Flake}
                    </Text>
                  </View>
                }
                {user.Flake == 3 &&
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Text>
                      +{user.Flake}
                    </Text>
                  </View>
                }
                {user.Flake > 3 &&
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Text>
                      +{user.Flake}
                    </Text>
                  </View>
                }
                {user.Flake < 1 &&
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                    <Text>
                      +0
                    </Text>
                  </View>

                }
                {/* <Image source={require('../../assets/flakemeter.png')} resizeMode='contain' /> */}
              </View>
            </View>

            <View style={{
              padding: 20,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: COLORS.light
            }}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  paddingVertical: 5,
                }}>Want to remove flakes</Text>
              </View>
              <View style={{
                paddingHorizontal: 50,
                paddingBottom: 10,
              }}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 13
                }}>You can remove flakes by paying
                  $20 per flake now</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('RemoveFlakeScreen')}
                activeOpacity={0.8} style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: COLORS.main,
                  borderRadius: 10,
                }}>
                <Text style={{ color: COLORS.black, fontSize: 13 }}>Remove Flakes</Text>
              </TouchableOpacity>
            </View>

            <View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 20
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontWeight: 'bold',
                  fontSize: 16
                }}>Memberships</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AdditonalPackages')}>
                  <Text style={{
                    color: COLORS.blue, borderBottomColor: COLORS.blue,
                    borderBottomWidth: 1,
                  }}>Additional Packages</Text>
                </TouchableOpacity>
              </View>
              {memberships ? (

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {memberships.map((item, index) => (
                    <View key={index} style={{ marginVertical: 10 }}>
                      <View style={{
                        marginHorizontal: 10,
                        marginLeft: 10,
                        borderRadius: 20,
                        backgroundColor: COLORS.white,
                        elevation: 5
                      }}>
                        <View style={{
                          backgroundColor: COLORS.white,
                          borderRadius: 20,
                          elevation: 5,
                        }}>
                          <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                          }}>
                            <Text style={{
                              color: COLORS.black,
                              fontWeight: 'bold',
                              fontSize: 15
                            }}>{item.otherCategory}</Text>
                            {!item.discountPrice == '' ? (
                              <Text style={{ color: COLORS.black }}>{item.discountPrice} OFF {item.discountPercentage}%</Text>
                            ) : (
                              <Text style={{ color: COLORS.black }}>${item.rate}/Month</Text>
                            )}
                          </View>
                          <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                          }}>
                            <Text style={{
                              color: COLORS.black,
                              fontSize: 13
                            }}>{item.name}</Text>
                            <Image source={require('../../assets/Premium.png')} resizeMode='contain'
                              style={{
                                width: 50,
                                height: 50
                              }} />
                          </View>
                          <View style={{
                            paddingHorizontal: 20,
                            paddingBottom: 20,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                          }}>
                            <TouchableOpacity activeOpacity={0.8} style={{
                              paddingHorizontal: 20,
                              paddingVertical: 10,
                              backgroundColor: COLORS.main,
                              borderRadius: 10,
                              alignItems: 'center'
                            }}>
                              <Text style={{ color: COLORS.black, fontSize: 13 }}>View more</Text>
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingHorizontal: 20,
                          paddingVertical: 20,
                          borderBottomColor: COLORS.light,
                          borderBottomWidth: 1,
                        }}>
                          <Text style={{
                            color: COLORS.black,
                            fontSize: 18,
                            fontWeight: 'bold'
                          }}>
                            What's in {item.otherCategory}
                          </Text>
                        </View>

                        <View>
                          <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            justifyContent: 'space-between',
                          }}>
                            <View style={{
                              flexDirection: 'row',
                            }}>
                              <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
                                <Image source={require('../../assets/unlock.png')} resizeMode='contain' />
                              </View>
                              <View style={{ paddingRight: 30 }}>
                                <Text>Unlock Political and religion filter</Text>
                              </View>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                              <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                            </View>
                          </View>

                          <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            justifyContent: 'space-between',
                          }}>
                            <View style={{
                              flexDirection: 'row',
                            }}>
                              <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                <Image source={require('../../assets/totlikes.png')} resizeMode='contain' />
                              </View>
                              <View style={{ paddingRight: 10 }}>
                                <Text>15 likes Per Day</Text>
                              </View>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                              <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                            </View>
                          </View>

                          <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            justifyContent: 'space-between',
                          }}>
                            <View style={{
                              flexDirection: 'row',
                            }}>
                              <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                <Image source={require('../../assets/matches.png')} resizeMode='contain' />
                              </View>
                              <View style={{ paddingRight: 30 }}>
                                <Text>10 Max Matches</Text>
                              </View>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                              <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                            </View>
                          </View>
                          <View style={{
                            padding: 20,
                          }}>
                            <TouchableOpacity
                              onPress={() => ByMemeberShips(item, membershipUid)}
                              activeOpacity={0.8} style={{
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                backgroundColor: COLORS.main,
                                borderRadius: 10,
                                alignItems: 'center'
                              }}>
                              <Text style={{ color: COLORS.black, fontSize: 15 }}>Current Membership</Text>
                            </TouchableOpacity>
                          </View>
                        </View>

                      </View>
                    </View>

                  ))}
                </ScrollView>
              ) : (
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}>
                  <ActivityIndicator size="small" color={COLORS.main} animating={uploading} />
                </View>
              )}
            </View>


          </View>


          <Modal
            animationType='fade'
            transparent={true}
            visible={modal}>
            <>
              {actionTriggered == 'UploadImage' ?
                <View style={{
                  width: width,
                  height: height,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.light,
                  opacity: .9
                }}>
                  <ActivityIndicator size="large" color={COLORS.black} animating={uploading} />
                </View>
                :
                <TouchableOpacity
                  onPress={() => { setModal(false), setImage(null) }}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 22,
                    backgroundColor: COLORS.gray,
                    opacity: .9
                  }}>
                  <View style={{
                    // margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    // padding: 35,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    width: '100%',
                    height: height / 1.6,
                    justifyContent: 'center'
                  }}>
                    <Image source={{ uri: image }} resizeMode="cover" style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 20,
                    }} />
                  </View>
                </TouchableOpacity>
              }
            </>
          </Modal>

        </ScrollView>





      </View >
    </SafeAreaView >
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})