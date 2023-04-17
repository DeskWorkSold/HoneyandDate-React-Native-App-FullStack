import { Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, ProgressBarAndroid, ProgressBarIOS, Platform } from 'react-native'
import React from 'react'
import COLORS from '../../../../consts/Colors'
import { useState } from 'react';
import CustomeButton from '../../../components/CustomeButton';
import { logout, mediatorLogin, selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import Path from '../../../../assets/Path.svg';
import SVGImage from '../../../../assets/notify.svg';
import Tik from '../../../../assets/tik.svg';
import MyIcon from '../../../../assets/tik.svg';
import Facebook from '../../../../assets/Facebook.svg';
import Linkdin from '../../../../assets/Linkedin.svg';
import Twitter from '../../../../assets/Twitter.svg';
import Insta from '../../../../assets/insta.svg';
import Edite from '../../../../assets/edit2.svg';
import { RadioButton } from 'react-native-paper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const allDays = [
    {
        id: 1,
        name: 'Week',
    },
    {
        id: 2,
        name: 'Daily',
    },
    {
        id: 3,
        name: 'Always',
    },
]

const ProfileScreen = ({ navigation }) => {
    const [progress, setProgress] = useState(0.5);
    const mediator = useSelector(selectMediatorUser);
    const [name, setName] = useState(mediator?.userDetails?.Name);
    const [nameEdit, setNameEdit] = useState(false);
    const [email, setEmail] = useState(mediator?.userDetails?.email);
    const [emailEdit, setEmailEdit] = useState(false);
    const [number, setNumber] = useState(mediator?.userDetails?.Phonenumber ? mediator?.userDetails?.Phonenumber : null);
    const [numberEdit, setNumberEdit] = useState(false);
    const [about, setabout] = useState(mediator?.userDetails?.Bio);
    const [location, setLocation] = useState();
    const [locationEdit, setLocationEdit] = useState();
    const [duration, setDuration] = useState();
    const dispatch = useDispatch();

    // console.log(mediator.userDetails);

    const OnLogOut = () => {
        // navigation.navigate('LoginScreen')
        try {
            auth()
                .signOut()
                .then(() =>
                    console.log('User signed out!'),
                    ToastAndroid.show('Signed out!', ToastAndroid.SHORT),
                    //   navigation.navigate('LoginScreen')
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



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>

                <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <View style={{
                        marginBottom: 200,
                        backgroundColor: COLORS.white,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            // backgroundColor: COLORS.gray,
                            //   paddingHorizontal: 20,
                            alignItems: 'stretch',
                            paddingBottom: 20
                        }}>
                            <View>
                                <View style={{
                                    borderWidth: 3,
                                    borderColor: COLORS.main,
                                    borderRadius: 100
                                }}>
                                    <Image source={{ uri: mediator.userDetails.image1 }} resizeMode='cover' style={{
                                        borderRadius: 80,
                                        width: 100,
                                        height: 100
                                    }} />
                                </View>
                            </View>
                            <View style={{
                                justifyContent: 'center',
                                paddingLeft: 20
                            }}>
                                <View style={{
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: COLORS.black
                                    }}>
                                        {mediator?.userDetails?.Name &&
                                            mediator?.userDetails?.Name?.charAt(0).toUpperCase() + mediator?.userDetails?.Name.slice(1)
                                        }
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: COLORS.light,
                                    borderRadius: 5,
                                    // width: '100%',
                                    padding: 5,
                                    paddingHorizontal: 10,
                                    marginTop: 5,
                                }}>
                                    <Text style={{ color: COLORS.black, fontSize: 13 }}>Agency</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 0 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Name </Text>
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
                                        <Image source={require('../../../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 15,
                                                height: 15,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Email </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        // aria-disabled={true}
                                        editable={emailEdit}
                                        value={email}
                                        placeholder={'Enter your name'}
                                        keyboardType='email-address'
                                        onChangeText={name => setEmail(name)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => setEmailEdit(!emailEdit)}>
                                        <Image source={require('../../../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 15,
                                                height: 15,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Location </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        // aria-disabled={true}
                                        editable={locationEdit}
                                        value={location}
                                        placeholder={'Enter your name'}
                                        keyboardType='email-address'
                                        onChangeText={name => setLocation(name)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => setLocationEdit(!locationEdit)}>
                                        <Image source={require('../../../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 15,
                                                height: 15,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Phone No </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        // aria-disabled={true}
                                        editable={numberEdit}
                                        value={number}
                                        placeholder={'Enter your name'}
                                        keyboardType='email-address'
                                        onChangeText={name => setNumber(name)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => setNumberEdit(!numberEdit)}>
                                        <Image source={require('../../../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 15,
                                                height: 15,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            paddingHorizontal: 10,
                            marginTop: 20
                        }}>
                            <Text style={{
                                fontSize: 13,
                                color: COLORS.black,
                            }}>About</Text>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray,
                            }}>(anything about you that you would like to share with our marketing team or a little about you)</Text>
                        </View>

                        <View style={{
                            width: width / 1.2,
                            alignSelf: 'center',
                            borderRadius: 10,
                            elevation: 5,
                            backgroundColor: COLORS.white,
                            padding: 10,
                            marginVertical: 20
                        }}>
                            <Text style={{
                                fontSize: 13,
                                color: COLORS.gray
                            }}>Lorem ipsum dolor sit amet, ConnectEDU advising elite. Rut rum in Masada unique consequent. Tells Eros Ohio Del donec cliquey in. Get caucus get dolor, sit nun. Odio Del donec cliquey in. Get caucus get dolor, sit nun Ohio Del done </Text>
                        </View>

                        <View>
                            <Text style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: COLORS.black,
                                fontSize: 16
                            }}>Let us post on your behaf</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            paddingVertical: 20
                        }}>
                            <View style={{
                                marginRight: 5
                            }}>
                                <SVGImage width={20} height={20} />
                            </View>
                            <Text style={{
                                width: width / 1.2,
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                When given this permission we post at times people are on there most and when we post on all our influencers stories at the same time you have much high chance of your flowers / all followers signing up through your link, so this is beneficial we will never post a post we will only post in your story if this permission is given.
                            </Text>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginHorizontal: 20,
                            alignItems: 'center',
                            alignSelf: 'center',
                            elevation: 6
                        }}>

                            {allDays.map((Item, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    key={index}
                                    onPress={() => setDuration(index)}
                                    style={{
                                        width: '31%',
                                        paddingRight: 10,
                                        marginRight: 5,
                                        marginBottom: 10,
                                        // height: 40,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        backgroundColor: COLORS.white,
                                        elevation: 6,
                                        borderRadius: 5,
                                        // marginRight: 5,
                                        paddingHorizontal: 10,
                                        // paddingVertical: 5,
                                    }}>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLORS.black }}>{Item.name}</Text>
                                    </View>
                                    <View style={{ paddingLeft: 5 }}>
                                        <RadioButton
                                            value={duration}
                                            status={duration === index ? 'checked' : 'unchecked'}
                                            onPress={() => setDuration('Not Public')}
                                            color={COLORS.main}
                                            uncheckedColor={COLORS.main}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}

                        </View>

                        <View style={{
                            alignSelf: 'center',
                            marginVertical: 10,
                        }}>
                            <CustomeButton width={width / 1.2} title={'Allow to post'} />
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            justifyContent: 'space-between'
                        }}>
                            <View>
                                <Text style={{
                                    color: COLORS.black,
                                    fontWeight: 'bold'
                                }}>Social media handles</Text>
                            </View>
                            <TouchableOpacity style={{
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                backgroundColor: COLORS.main,
                                borderRadius: 5,
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    color: COLORS.black
                                }}>Add Handle</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: width / 1.2,
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            borderRadius: 5,
                            paddingVertical: 15,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    marginRight: 5
                                }}>
                                    <Facebook width={20} height={20} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.gray
                                    }}>Signed in as: </Text>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 13,
                                        color: COLORS.black
                                    }}>Username</Text>
                                </View>
                            </View>
                            <View>
                                <Edite width={20} height={20} />
                            </View>
                        </View>


                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: width / 1.2,
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            borderRadius: 5,
                            paddingVertical: 15,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    marginRight: 5
                                }}>
                                    <Linkdin width={20} height={20} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.gray
                                    }}>Signed in as: </Text>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 13,
                                        color: COLORS.black
                                    }}>Username</Text>
                                </View>
                            </View>
                            <View>
                                <Edite width={20} height={20} />
                            </View>
                        </View>


                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: width / 1.2,
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            borderRadius: 5,
                            paddingVertical: 15,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    marginRight: 5
                                }}>
                                    <Twitter width={20} height={20} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.gray
                                    }}>Signed in as: </Text>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 13,
                                        color: COLORS.black
                                    }}>Username</Text>
                                </View>
                            </View>
                            <View>
                                <Edite width={20} height={20} />
                            </View>
                        </View>



                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: width / 1.2,
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            borderRadius: 5,
                            paddingVertical: 15,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    marginRight: 5
                                }}>
                                    <Insta width={20} height={20} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.gray
                                    }}>Signed in as: </Text>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 13,
                                        color: COLORS.black
                                    }}>Username</Text>
                                </View>
                            </View>
                            <View>
                                <Edite width={20} height={20} />
                            </View>
                        </View>





                        <View style={{
                            marginTop:40,
                        }}>
                            <CustomeButton title={'Log out'} bcolor={COLORS.transparent} border={COLORS.gray} onpress={() => OnLogOut()} />
                        </View>


                        {/* <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 20 }} >
                                <TouchableOpacity style={styles.NumberInput} onPress={() => OnLogOut()}>
                                    <View>
                                        <Text style={{ color: COLORS.black }}>Log Out</Text>
                                    </View>
                                    <View>
                                        <Path width={15} height={15} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View> */}


                    </View>
                </ScrollView>
            </View >
        </SafeAreaView >
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        width: width,
        height: height,
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 45,
        width: width / 1.2,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 5
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
    },
    NumberInput2: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: 340,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4,
        marginTop: 5,
    },
    TextInput2: {
        paddingTop: 10,
        backgroundColor: COLORS.transparent,
        height: 200,
        textAlignVertical: 'top',
    },
})