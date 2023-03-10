import { Image, StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView, ToastAndroid, Dimensions, Modal } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout, selectUser } from '../../../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-native-phone-number-input';
import { useRef } from 'react';
const { width } = Dimensions.get("window").width;
const { height } = Dimensions.get("window").height;
import { detailReligion } from './QuestionMoreAboutMuslimScreen';


const Data1 = [
    {
        id: '1',
        name: 'Platonic Relationship',
    },
    {
        id: '2',
        name: 'Long term Relationship',
    },
    {
        id: '3',
        name: 'Short term Relationship',
    },
    {
        id: '4',
        name: 'One night stand',
    },
    {
        id: '5',
        name: 'Polymerous',
    },
    {
        id: '6',
        name: 'Monogamous',
    },
    {
        id: '7',
        name: 'Open relationship',
    },
    {
        id: '8',
        name: 'Regular FWB',
    },
    {
        id: '9',
        name: 'Life partner',
    },
]
const Data2 = [
    {
        id: '1',
        name: 'Christian',
        onpress: 'QuestionMoreAboutChristianScreen'
    },
    {
        id: '2',
        name: 'Jewish',
        onpress: 'QuestionMoreAboutJewishScreen'
    },
    {
        id: '3',
        name: 'Catholic',
        onpress: 'QuestionMoreAboutCatholicScreen'
    },
    {
        id: '4',
        name: 'Muslim',
        onpress: 'QuestionMoreAboutMuslimScreen'
    },
    {
        id: '5',
        name: 'Hinduism',
    },

    {
        id: '5',
        name: 'Buddhism',
    },

    {
        id: '5',
        name: 'Chinese traditional religion',
    },
]

const Data3 = [
    {
        id: '1',
        name: 'Male',
    },
    {
        id: '2',
        name: 'Female',
    },
    {
        id: '3',
        name: 'Non binaray',
    },
    {
        id: '4',
        name: 'Trans Male to Female',
    },
    {
        id: '5',
        name: 'Trans Female to Male',
    },
]

const SettingScreen = ({ navigation }) => {
    const user = useSelector(selectUser);
    const [name, setName] = useState(user.Name ? user.Name : null);
    const [nameEdit, setNameEdit] = useState(false);
    const [email, setEmail] = useState(user.email ? user.email : null);
    const [emailEdit, setEmailEdit] = useState(false);
    const [number, setNumber] = useState(user.Number ? user.Number : null);
    const [numberEdit, setNumberEdit] = useState(false);
    const [actionTriggered, setActionTriggered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [relationshipTypeyour, setRelationshipTypeyour] = useState(user.RelationshipType ? user.RelationshipType : null);
    const [religionyour, setReligionyour] = useState(user.Relagion ? user.Relagion : null);
    const [religionTypeyour, setReligionTypeyour] = useState(user.religionType ? user.religionType : null);
    const [genderyour, setGenderyour] = useState(user.Gender ? user.Gender : null);
    const [relationShipLookingyour, setRelationShipLookingyour] = useState(user.relationshipLookingType ? user.relationshipLookingType : null);








    // question
    const [relationshipType, setRelationshipType] = useState(0);
    const [religion, setReligion] = useState(0);
    const [religionType, setReligionType] = useState(0);
    const [gender, setGender] = useState(0);
    const [relationShipLooking, setRelationShipLooking] = useState(0);


    const dispatch = useDispatch();
    const phoneInput = useRef(null);


    const OnSaveChanges = () => {
        if (!name && !email && !number && !relationshipTypeyour && !religionyour && !religionTypeyour && !genderyour && !relationShipLookingyour) {
            if (!name) {
                ToastAndroid.show('Please enter your name!', ToastAndroid.SHORT)
            }
            else if (!email) {
                ToastAndroid.show('Please enter your email!', ToastAndroid.SHORT)
            }
            else if (!number) {
                ToastAndroid.show('Please enter your number!', ToastAndroid.SHORT)
            }
            else if (!relationshipTypeyour) {
                ToastAndroid.show('Please enter your relationshiptype!', ToastAndroid.SHORT)
            }
            else if (!religionyour) {
                ToastAndroid.show('Please enter your religion!', ToastAndroid.SHORT)
            }
            else if (!religionTypeyour) {
                ToastAndroid.show('Please enter your religion Type!', ToastAndroid.SHORT)
            }
            else if (!genderyour) {
                ToastAndroid.show('Please enter your gender!', ToastAndroid.SHORT)
            }
            else if (!relationShipLookingyour) {
                ToastAndroid.show('Please enter relationship you looking for!', ToastAndroid.SHORT)
            }
        }
        else {
            const userRef = firestore().collection('Users')
                .doc(user.uid)
            userRef.update({
                'userDetails.Name': name,
                'userDetails.email': email,
                'userDetails.Number': number,
                'userDetails.RelationshipType': relationshipTypeyour,
                'userDetails.Relagion': religionyour,
                'userDetails.religionType': religionTypeyour,
                'userDetails.Gender': genderyour,
                'userDetails.relationshipLookingType': relationShipLookingyour,
            }).then(() => {
                navigation.navigate('ProfileScreen')
                console.log('userDetails updated');
            })
            // console.log('here');
            //             
            // email
            // Number

            // RelationshipType
            // Relagion
            // religionType
            // Gender
            // relationshipLookingType
            // console.log(
            //     name,
            //     email,
            //     number,
            //     relationshipTypeyour,
            //     religionyour,
            //     religionTypeyour,
            //     genderyour,
            //     relationShipLookingyour,
            // );
        }
    }


    const OnLogOut = async () => {
        console.log('logout');
        try {
            auth()
                .signOut()
                .then(() =>
                    console.log('User signed out!'),
                    ToastAndroid.show('Signed out!', ToastAndroid.SHORT)
                    // navigation.('SignUpScreen')
                );
            // const userData = await AsyncStorage.getItem('session');
            //   await AsyncStorage.removeItem('CurrentUserData')
            //   await AsyncStorage.removeItem('CurrentUser')
            dispatch(logout());
        }
        catch (exception) {
            return false;
        }
    }

    const onRelationshipType = (index) => {
        setRelationshipType(index)
        setRelationshipTypeyour(Data1[index].name)
        // const data = Data1[index].name
        // console.log(data);
        setShowModal(false)
    }
    const onRelagion = (index) => {
        setReligion(index)
        setReligionyour(Data2[index].name)
        setShowModal(false)
    }
    const onRelagionType = (index) => {
        setReligionType(index)
        setReligionTypeyour(detailReligion[index].name)
        setShowModal(false)
    }
    const onGender = (index) => {
        setGender(index)
        setGenderyour(Data3[index].name)
        setShowModal(false)
    }
    const onRelagionTypeLooking = (index) => {
        setRelationShipLooking(index)
        setRelationShipLookingyour(Data1[index].name)
        setShowModal(false)
    }


    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: COLORS.white,
                    height: 80
                }}>
                    <View style={{ width: '20%' }}>
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <Image source={require('../../assets/menu.png')} resizeMode='contain'
                                style={{
                                    height: 45,
                                    color: COLORS.black
                                }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '60%', alignItems: 'center', }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: COLORS.black
                        }}>Profile Settings</Text>
                    </View>

                    <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                    </View>
                </View>

                <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Name </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        // aria-disabled={true}
                                        editable={nameEdit}
                                        value={name}
                                        placeholder={'Enter your name'}
                                        keyboardType='email-address'
                                        onChangeText={name => setName(name)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => setNameEdit(!nameEdit)}>
                                        <Image source={require('../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Email </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        editable={emailEdit}
                                        value={email}
                                        placeholder={'Enter your email'}
                                        keyboardType='email-address'
                                        onChangeText={email => setEmail(email)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => setEmailEdit(!emailEdit)}>
                                        <Image source={require('../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Phone Number </Text>
                                <PhoneInput
                                    ref={phoneInput}
                                    defaultValue={number}
                                    defaultCode="PK"
                                    layout="first"
                                    // disabled={true}
                                    // withShadow
                                    // autoFocus
                                    containerStyle={styles.phoneNumberView}
                                    textContainerStyle={{ paddingVertical: 0, borderRadius: 5, backgroundColor: COLORS.light }}
                                    onChangeFormattedText={text => {
                                        setNumber(text);
                                    }}
                                    flagButtonStyle={{ color: "black" }}
                                    textInputProps={{ placeholderTextColor: COLORS.gray }}
                                />
                                {/* <View style={styles.NumberInput}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>

                                        <Image source={require('../../assets/USflag.png')} resizeMode='contain' style={{
                                            marginRight: 10,
                                            borderRadius: 3
                                        }} />
                                        <Text> | </Text>
                                        <TextInput
                                            value={number}
                                            placeholder={'Enter your number'}
                                            keyboardType='email-address'
                                            onChangeText={number => setNumber(number)
                                            }
                                            style={styles.TextInput}
                                        />
                                    </View>
                                    <View>
                                        <Image source={require('../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </View>
                                </View> */}
                            </View>
                        </View>

                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            paddingVertical: 20
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Questions Settings</Text>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            height: 100,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 40,
                            }}>
                                <View>
                                    <Text>
                                        What type of relationship?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {relationshipTypeyour}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('ACTION_1') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            height: 100,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text>
                                        What is your religion?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {religionyour} , {religionTypeyour}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('ACTION_2') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            height: 100,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text>
                                        What do you identify as?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {genderyour}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('ACTION_3') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            height: 100,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text>
                                        What type of relationship you are looking for?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {relationShipLookingyour}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('ACTION_4') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            paddingTop: 10,
                        }}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <View style={{ marginHorizontal: 5 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('TermsandCondition')}
                                        activeOpacity={0.7}>
                                        <View style={{
                                            backgroundColor: COLORS.white,
                                            elevation: 5,
                                            width: 150,
                                            height: 50,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                            }}>Terms or Conditions</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginHorizontal: 5 }}>
                                    <TouchableOpacity activeOpacity={0.7}
                                        onPress={() => navigation.navigate('PrivacyPolicy')}>
                                        <View style={{
                                            backgroundColor: COLORS.white,
                                            elevation: 5,
                                            width: 150,
                                            height: 50,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                            }}>Privacy Policy</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{
                                alignItems: 'center',
                                paddingVertical: 10,
                                marginBottom: 20,
                            }}>
                                <TouchableOpacity activeOpacity={0.7}
                                    onPress={() => OnLogOut()}>
                                    <View style={{
                                        backgroundColor: COLORS.white,
                                        elevation: 5,
                                        width: 150,
                                        height: 50,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            color: COLORS.black,
                                        }}>Logout</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginBottom: 80
                        }}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <View style={{ marginHorizontal: 5 }}>
                                    <CustomeButton width={170} onpress={() => navigation.navigate('ProfileScreen')}
                                        title={'Skip'} bcolor={COLORS.light} />
                                </View>
                                <View style={{ marginHorizontal: 5 }}>
                                    <CustomeButton width={170} onpress={() => OnSaveChanges()}
                                        title={'Continue'} color={COLORS.white} />
                                </View>
                            </View>
                        </View>


                    </View>








                    {/* //here modal */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showModal}
                        onRequestClose={() => {
                            setShowModal(!showModal);
                        }}
                    >
                        {actionTriggered == 'ACTION_1' &&
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 22,
                            }}>
                                <View style={{
                                    margin: 20,
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    padding: 35,
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                }}>
                                    {Data1.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            activeOpacity={0.8}
                                            onPress={() => onRelationshipType(index)}>
                                            <View style={{
                                                backgroundColor: relationshipType == index ? COLORS.main : COLORS.transparent,
                                                flexDirection: 'row',
                                                marginTop: 10,
                                                alignItems: 'center',
                                                marginHorizontal: 20,
                                                paddingHorizontal: 20,
                                                height: 45,
                                                width: 340,
                                                backgroundColor: COLORS.light,
                                                borderRadius: 5,
                                            }}>
                                                <View style={{ width: '90%' }}>
                                                    <Text style={{ color: COLORS.black }}>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    alignItems: 'flex-end',
                                                }}>
                                                    {relationshipType == index ? (
                                                        <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                                                            width: 20,
                                                            height: 20
                                                        }} />
                                                    ) : (<View></View>
                                                    )}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                    <View style={{
                                        alignItems: 'center',
                                        paddingHorizontal: 20,
                                        flexDirection: 'row',
                                        marginTop: 10
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => setShowModal(false)}
                                            style={{
                                                width: '90%',
                                                borderWidth: 1,
                                                borderColor: COLORS.black,
                                                borderRadius: 10,
                                                marginHorizontal: 5,
                                                paddingVertical: 10,
                                                alignItems: 'center',
                                            }}>
                                            <Text style={{
                                                color: COLORS.black
                                            }}>
                                                Back
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>}

                        {actionTriggered == 'ACTION_2' &&
                            <ScrollView vertical showsVerticalScrollIndicator={false}>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 22,
                                }}>
                                    <View style={{
                                        margin: 20,
                                        backgroundColor: 'white',
                                        borderRadius: 20,
                                        padding: 35,
                                        alignItems: 'center',
                                        shadowColor: '#000',
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 4,
                                        elevation: 5,
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black }}>Religion</Text>
                                        {Data2.map((item, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                activeOpacity={0.8}
                                                onPress={() => onRelagion(index)}
                                            >
                                                <View style={{
                                                    backgroundColor: religion == index ? COLORS.main : COLORS.transparent,
                                                    flexDirection: 'row',
                                                    marginTop: 10,
                                                    alignItems: 'center',
                                                    marginHorizontal: 20,
                                                    paddingHorizontal: 20,
                                                    height: 45,
                                                    width: 340,
                                                    backgroundColor: COLORS.light,
                                                    borderRadius: 5,
                                                }}>
                                                    <View style={{ width: '90%' }}>
                                                        <Text style={{ color: COLORS.black }}>
                                                            {item.name}
                                                        </Text>
                                                    </View>
                                                    <View style={{
                                                        alignItems: 'flex-end',
                                                    }}>
                                                        {religion == index ? (
                                                            <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                                                                width: 20,
                                                                height: 20
                                                            }} />
                                                        ) : (<View></View>
                                                        )}
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black, marginTop: 10 }}>Religion Type</Text>
                                        {detailReligion.map((item, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                activeOpacity={0.8}
                                                onPress={() => onRelagionType(index)}
                                            >
                                                <View style={{
                                                    backgroundColor: religionType == index ? COLORS.main : COLORS.transparent,
                                                    flexDirection: 'row',
                                                    marginTop: 10,
                                                    alignItems: 'center',
                                                    marginHorizontal: 20,
                                                    paddingHorizontal: 20,
                                                    height: 45,
                                                    width: 340,
                                                    backgroundColor: COLORS.light,
                                                    borderRadius: 5,
                                                }}>
                                                    <View style={{ width: '90%' }}>
                                                        <Text style={{ color: COLORS.black }}>
                                                            {item.name}
                                                        </Text>
                                                    </View>
                                                    <View style={{
                                                        alignItems: 'flex-end',
                                                    }}>
                                                        {religionType == index ? (
                                                            <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                                                                width: 20,
                                                                height: 20
                                                            }} />
                                                        ) : (<View></View>
                                                        )}
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                        <View style={{
                                            alignItems: 'center',
                                            paddingHorizontal: 20,
                                            flexDirection: 'row',
                                            marginTop: 10
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => setShowModal(false)}
                                                style={{
                                                    width: '90%',
                                                    borderWidth: 1,
                                                    borderColor: COLORS.black,
                                                    borderRadius: 10,
                                                    marginHorizontal: 5,
                                                    paddingVertical: 10,
                                                    alignItems: 'center',
                                                }}>
                                                <Text style={{
                                                    color: COLORS.black
                                                }}>
                                                    Back
                                                </Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        }

                        {actionTriggered == 'ACTION_3' &&
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 22,
                            }}>
                                <View style={{
                                    margin: 20,
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    padding: 35,
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                }}>
                                    {Data3.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            activeOpacity={0.8}
                                            onPress={() => onGender(index)}>
                                            <View style={{
                                                backgroundColor: gender == index ? COLORS.main : COLORS.transparent,
                                                flexDirection: 'row',
                                                marginTop: 10,
                                                alignItems: 'center',
                                                marginHorizontal: 20,
                                                paddingHorizontal: 20,
                                                height: 45,
                                                width: 340,
                                                backgroundColor: COLORS.light,
                                                borderRadius: 5,
                                            }}>
                                                <View style={{ width: '90%' }}>
                                                    <Text style={{ color: COLORS.black }}>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    alignItems: 'flex-end',
                                                }}>
                                                    {gender == index ? (
                                                        <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                                                            width: 20,
                                                            height: 20
                                                        }} />
                                                    ) : (<View></View>
                                                    )}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                    <View style={{
                                        alignItems: 'center',
                                        paddingHorizontal: 20,
                                        flexDirection: 'row',
                                        marginTop: 10
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => setShowModal(false)}
                                            style={{
                                                width: '90%',
                                                borderWidth: 1,
                                                borderColor: COLORS.black,
                                                borderRadius: 10,
                                                marginHorizontal: 5,
                                                paddingVertical: 10,
                                                alignItems: 'center',
                                            }}>
                                            <Text style={{
                                                color: COLORS.black
                                            }}>
                                                Back
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>}


                        {actionTriggered == 'ACTION_4' &&
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 22,
                            }}>
                                <View style={{
                                    margin: 20,
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    padding: 35,
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                }}>
                                    {Data1.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            activeOpacity={0.8}
                                            onPress={() => onRelagionTypeLooking(index)}>
                                            <View style={{
                                                backgroundColor: relationShipLooking == index ? COLORS.main : COLORS.transparent,
                                                flexDirection: 'row',
                                                marginTop: 10,
                                                alignItems: 'center',
                                                marginHorizontal: 20,
                                                paddingHorizontal: 20,
                                                height: 45,
                                                width: 340,
                                                backgroundColor: COLORS.light,
                                                borderRadius: 5,
                                            }}>
                                                <View style={{ width: '90%' }}>
                                                    <Text style={{ color: COLORS.black }}>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    alignItems: 'flex-end',
                                                }}>
                                                    {relationShipLooking == index ? (
                                                        <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                                                            width: 20,
                                                            height: 20
                                                        }} />
                                                    ) : (<View></View>
                                                    )}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                    <View style={{
                                        alignItems: 'center',
                                        paddingHorizontal: 20,
                                        flexDirection: 'row',
                                        marginTop: 10
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => setShowModal(false)}
                                            style={{
                                                width: '90%',
                                                borderWidth: 1,
                                                borderColor: COLORS.black,
                                                borderRadius: 10,
                                                marginHorizontal: 5,
                                                paddingVertical: 10,
                                                alignItems: 'center',
                                            }}>
                                            <Text style={{
                                                color: COLORS.black
                                            }}>
                                                Back
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>}




                    </Modal>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: '100%',
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        height: 45,
        width: 340,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
    },
    phoneNumberView: {
        width: 340,
        height: 50,
        borderRadius: 5,
        backgroundColor: COLORS.light,
        // marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light
    },

})