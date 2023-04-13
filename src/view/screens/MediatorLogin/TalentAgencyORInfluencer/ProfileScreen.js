import { Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, ProgressBarAndroid, ProgressBarIOS, Platform } from 'react-native'
import React from 'react'
import COLORS from '../../../../consts/Colors'
import { useState } from 'react';
import CustomeButton from '../../../components/CustomeButton';
import { logout, mediatorLogin, selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import Path from '../../../../assets/Path.svg';
// import Tik from '../../../../assets/tik.svg';
import MyIcon from '../../../../assets/tik.svg';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProfileScreen = ({ navigation }) => {
    const [progress, setProgress] = useState(0.5);
    const mediator = useSelector(selectMediatorUser);
    const [name, setName] = useState(mediator?.userDetails?.Name);
    const [nameEdit, setNameEdit] = useState(false);
    const [email, setEmail] = useState(mediator?.userDetails?.email);
    const [emailEdit, setEmailEdit] = useState(false);
    const [number, setNumber] = useState(mediator.Number ? mediator.Number : null);
    const [numberEdit, setNumberEdit] = useState(false);
    const [about, setabout] = useState(mediator?.userDetails?.Bio);
    const [location, setLocation] = useState();
    const [locationEdit, setLocationEdit] = useState();
    const dispatch = useDispatch();

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
                        <View style={{ alignItems: 'center' }}>
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
                        </View>


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