import { TextInput, TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, Modal, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { selectUser } from '../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';


const RemoveFlakeScreen = () => {
    const [name, setName] = useState('');
    const [showPoppup, setShowPoppup] = useState(false);
    const [uploading, setUploading] = useState(false);
    const user = useSelector(selectUser);


    const RemoveFlakeScreen = () => {
        if (user.Flake >= 1) {
            if (name >= 1) {
                console.log('RemoveFlake');
                setUploading(true)
                // navigation.navigate('QuestionWantKidsScreen')
                const userRef = firestore().collection('Users')
                    .doc(user.uid)
                userRef.update({
                    'userDetails.Flake': firestore.FieldValue.increment(-name),
                }).then(() => {
                    console.log('Flake Added!');
                    setShowPoppup(true)
                    setName('')
                    // console.log(item);
                    setUploading(false)
                });
            }
            else {
                ToastAndroid.show("You can remove more then 1 flake at a time!", ToastAndroid.SHORT);
            }
        }
        else {
            ToastAndroid.show("You dont have any flake on your profile!", ToastAndroid.SHORT);
        }

    }

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showPoppup}
                    onRequestClose={() => {
                        setShowPoppup(!showPoppup);
                    }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        // alignItems: 'center',
                    }}>
                        <View style={{
                            margin: 20,
                            backgroundColor: 'white',
                            borderRadius: 20,
                            padding: 25,
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
                            <Image source={require('../../assets/flakeremove.png')} resizeMode='contain' style={{
                                width: 90,
                                height: 90
                            }} />
                            <Text style={{
                                marginBottom: 10,
                                color: COLORS.black,
                                fontWeight: 'bold'
                                // textAlign: 'center',
                            }}>Flakes Removed!</Text>
                            <Text style={{
                                marginBottom: 10,
                                textAlign: 'center'
                            }}>
                                Congratulations your one flake has been removed for $10 dollars.
                            </Text>
                            <TouchableOpacity
                                onPress={() => setShowPoppup(false)}
                                style={{
                                    // borderColor: COLORS.black,
                                    width: '100%',
                                    borderRadius: 10,
                                    marginHorizontal: 5,
                                    paddingVertical: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.main
                                }}>
                                <Text style={{
                                    color: COLORS.black,
                                }}>
                                    Done
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={{
                    height: '80%'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: COLORS.white,
                        height: 80
                    }}>
                        <View style={{ width: '20%' }}>
                            <TouchableOpacity>
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
                            }}>Flakes</Text>
                        </View>

                        <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                        </View>
                    </View>


                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View>
                            <Text>
                                Remove your flakes for $10 per flakes. Flakes on your profile are added when you cancel date after certain time or do not reach date destination
                            </Text>
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
                        paddingHorizontal: 25,
                        paddingVertical: 5,
                    }}>
                        <View style={{
                            paddingBottom: 5
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Remove Flakes</Text>
                        </View>
                        <View>
                            <Text>No of flakes (max 2)</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ marginTop: 10 }}>
                            <View style={styles.NumberInput}>
                                <TextInput
                                    value={name}
                                    placeholder={'0'}
                                    keyboardType='number-pad'
                                    onChangeText={name => setName(name)
                                    }
                                    style={styles.TextInput}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{
                    height: '20%'
                }}>
                    <View style={{
                        paddingTop: 20,
                        alignItems: 'center'
                    }}>
                        {!uploading == true ?
                            <CustomeButton onpress={() => RemoveFlakeScreen()}
                                title={`Remove ${name} Flake`} />
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


            </View>
        </SafeAreaView>
    )
}

export default RemoveFlakeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: '100%'
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        height: 45,
        width: 340,
        backgroundColor: COLORS.white,
        elevation: 5,
        borderRadius: 5,
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
    },
})