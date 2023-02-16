import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity, ActivityIndicator, Dimensions, Modal } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import COLORS from '../../consts/Colors';
import HeaderTabOne from '../components/HeaderTabOne';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectStatus, selectUser, status } from '../../../redux/reducers/Reducers';
import Notifictaions from '../components/Notifictaions';
import { IconButton, MD3Colors, TextInput } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CustomeButton from '../components/CustomeButton';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const ChatingScreen = ({ navigation, route }) => {
    // console.log('==>' , route.params);
    const userName = route.params.userName;
    const userImg = route.params.userImg;
    const uid = route.params.uid;
    const [messages, setMessages] = useState([]);
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [rendering, setRendering] = useState(false);
    const Currentuser = useSelector(selectUser);
    const [transferred, setTransferred] = useState(0);
    const [modal, setModal] = useState(false);
    const [sendPorposal, setSendPorposal] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [dateVisibility, setDateVisibility] = useState(false);
    const [TimeVisibility, setTimeVisibility] = useState(false);
    const [location, setLocation] = useState(false);
    const [description, setDescription] = useState(false);
    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [actionTriggered, setActionTriggered] = useState(false);
    const [pin, setPin] = useState({
        latitude: 24.860966,
        longitude: 66.990501,
    });


    // console.log('userName: ', userName);
    // console.log('userName: ', userImg);

    const [showhide, setShowHide] = useState(false)
    const [sendchat, setSendChat] = useState('')

    const SwitchMode = (value) => (
        setShowHide(value)
    );

    useEffect(() => {
        // getAllMessages()
        const docid = uid > Currentuser.uid ? Currentuser.uid + "-" + uid : uid + "-" + Currentuser.uid
        // console.log(docid);
        const messageRef = firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .orderBy('createdAt', "desc")
        messageRef.onSnapshot((querySnap) => {
            const allmsg = querySnap.docs.map(docSanp => {
                // console.log('date: ', docSanp.data());
                const data = docSanp.data();
                if (data.createdAt) {
                    return {
                        ...docSanp.data(),
                        createdAt: docSanp.data().createdAt.toDate(),
                    }
                } else {
                    return {
                        ...docSanp.data(),
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        // user: {
                        //     avatar: userImg,
                        // },
                    }
                }
            })
            setMessages(allmsg)
            // console.log('==>',allmsg.user);
        })
    }, [])

    const onSend = useCallback((messages = []) => {
        let mymsg = null;
        // console.log('test',imageUrl);
        // return
        if (imageUrl !== '') {
            const msg = messages[0]
            mymsg = {
                ...msg,
                sentBy: Currentuser.uid,
                sentTo: uid,
                createdAt: new Date(),
                image: imageUrl,
            };
        }
        else {
            const msg = messages[0]
            mymsg = {
                ...msg,
                sentBy: Currentuser.uid,
                sentTo: uid,
                createdAt: new Date(),
                image: '',
            };
        }
        // console.log(mymsg);
        // return
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
        // console.log('==>', uid);
        const docid = uid > Currentuser.uid ? Currentuser.uid + "-" + uid : uid + "-" + Currentuser.uid
        // console.log('final', docid);
        // return;
        firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
        setImageUrl('');
        setImageData(null);
    }, [])

    const openCamera = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        if (result.didCancel && result.didCancel == true) {
        } else {
            // console.log(result.assets[0].uri);
            setImageData(result);
            uploadImage(result);
        }
    };

    const uploadImage = async imageDataa => {
        const pathToFile = imageDataa.assets[0].uri;
        // console.log(imageDataa.assets[0].uri);
        const reference = storage().ref(`Chats/${imageDataa.assets[0].fileName}`);
        await reference.putFile(pathToFile);
        const url = await reference.getDownloadURL();

        console.log('url', url);
        setImageUrl(url);
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: COLORS.main,
                    }
                }}
                textStyle={{
                    right: {
                        color: COLORS.white
                    }
                }}
            />
        )
    }

    const myAttachmentFunction = () => {
        console.log('attachment');
    }

    const customtInputToolbar = props => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: "white",
                    borderColor: "#E8E8E8",
                    borderTopWidth: 1,
                    padding: 2
                }}
            />
        );
    };

    const showDateModal = () => {
        setDateVisibility(true);
    }
    const hideDatePicker = () => {
        setDateVisibility(false);
    };
    const handleConfirmDate = date => {
        const test = moment(date).format('MM/DD/yy')
        console.warn('A date has been picked: ', date);
        console.log('date', test);
        setDate(moment(date).format('MM/DD/yy'));
        // hideDatePicker();
    };

    const showTimeModal = () => {
        setTimeVisibility(true)
    }
    const hideTimePicker = () => {
        setTimeVisibility(false);
    };
    const handleConfirmTime = date => {
        // console.warn('A date has been picked: ', date);
        const final = date.toLocaleString('en-UK', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
        setTime(final);
        hideTimePicker();
    };

    const OpenLocationModalView = () => {
        setLocationModalVisible(!locationModalVisible)
        setActionTriggered('ACTION_1');
    }

    const onSendPorposal = () => {
        console.log('send here!!');
    }

    const renderSend = props => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    onPress={() => { setModal(true) }}
                    style={{
                        paddingLeft: 10
                    }}>
                    <Entypo name='attachment' size={20} color={COLORS.black} />
                </TouchableOpacity>
                {imageUrl !== '' ? (
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            marginHorizontal: 5,
                        }}>
                        <Image
                            source={{ uri: imageData.assets[0].uri }}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 10,
                                position: 'absolute',
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setImageUrl('');
                            }}>
                            <Image
                                source={require('../../assets/cross.png')}
                                style={{ width: 16, height: 16, tintColor: COLORS.black }}
                            />
                        </TouchableOpacity>
                    </View>
                ) : null}
                <TouchableOpacity
                    onPress={() => { openCamera() }}
                    style={{
                        paddingLeft: 5,
                        paddingRight: 10,
                    }}
                >
                    <Ionicons name='camera-outline' size={25} color={COLORS.black} />
                </TouchableOpacity>
                <Send {...props}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor:COLORS.black,
                        paddingRight: 5,
                        width: 25
                    }}>
                        <IconButton
                            icon='send-circle'
                            size={30}
                            iconColor={COLORS.main}
                        />
                    </View>
                </Send>
            </View>
        )
    }
    const goToMessages = () => {
        navigation.goBack()
        uid
        // console.log('goback');
    }

    function scrollToBottomComponent() {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}>
                <IconButton icon='chevron-double-down' size={36} iconColor={COLORS.main} />
            </View>
        );
    }
    function renderLoading() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator size='large' color={COLORS.main} />
            </View>
        );
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    height: '10%',
                    backgroundColor: COLORS.white,
                }}>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity onPress={goToMessages} style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Image source={require('../../assets/arrowleft.png')} resizeMode='contain'
                                style={{
                                    tintColor: COLORS.black
                                }}
                            />
                        </TouchableOpacity>
                        <View style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Image source={{ uri: userImg }} resizeMode='contain'
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 50,
                                }}
                            />
                        </View>
                        <View style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>{userName}</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        {/* <View style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Image source={require('../../assets/call.png')} resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.black,
                                }}
                            />
                        </View> */}
                        <View style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Image source={require('../../assets/moreoption.png')} resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.black
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingTop: 20,
                    backgroundColor: COLORS.white,
                }}>
                    <TouchableOpacity onPress={value => setShowHide(value)} style={{
                        width: '50%',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.main,
                        alignItems: 'center',
                        marginHorizontal: 5,
                        paddingBottom: 5
                    }}>
                        <Text style={{
                            color: COLORS.main,
                            fontSize: 16,
                        }}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowHide(true)} style={{
                        width: '50%',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.gray2,
                        alignItems: 'center',
                        marginHorizontal: 5,
                        paddingBottom: 5
                    }}>
                        <Text style={{
                            color: COLORS.gray2,
                            fontSize: 16,
                        }}>Date Mode</Text>
                    </TouchableOpacity>
                </View>

                {showhide == true ? (
                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        backgroundColor: COLORS.white,
                        marginTop: 30,
                        marginHorizontal: 20,
                        borderRadius: 10,
                        elevation: 3,
                    }}>
                        <View style={{
                            alignItems: 'center',
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Date mode</Text>
                        </View>
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <Text style={{ textAlign: 'center' }}>Text your trusted friend or family member a link to
                                your live Location During date mode</Text>
                        </View>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('DateModeScreen')}
                                style={{
                                    marginVertical: 10,
                                    backgroundColor: COLORS.main,
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    width: '50%',
                                }}>
                                <Text style={{ color: COLORS.black }}>Request tracking</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={{
                        flex: 1,
                        backgroundColor: COLORS.white,
                        marginBottom: 20
                    }}>
                        <GiftedChat
                            messages={messages}
                            onSend={messages => onSend(messages)}
                            user={{
                                _id: Currentuser.uid,
                                avatar: Currentuser.image1,
                            }}
                            renderBubble={renderBubble}
                            alwaysShowSend
                            renderInputToolbar={props => customtInputToolbar(props)}
                            renderSend={props => renderSend(props)}
                            // renderInputToolbar={renderInputToolbar}
                            scrollToBottomComponent={scrollToBottomComponent}
                            renderLoading={renderLoading}
                        // renderActions={() => (
                        //     <View style={{ height: '100%', justifyContent: 'center', left: 5 }}>
                        //         <Icon name="attachment" onPress={() => myAttachmentFunction()} style={{ color: COLORS.gray }}
                        //             size={30} />
                        //             {/* <Text>tesst</Text> */}
                        //     </View>
                        // )}
                        />
                    </View>
                )}


                <DateTimePickerModal
                    isVisible={dateVisibility}
                    mode="date"
                    // display='spinner'
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                />

                <DateTimePickerModal
                    isVisible={TimeVisibility}
                    mode="time"
                    // display='spinner'
                    onConfirm={handleConfirmTime}
                    onCancel={hideTimePicker}
                />



                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModal(!modal);
                    }}
                >
                    {/* locationpopup  */}
                    <Modal
                        animationType='fade'
                        transparent={false}
                        visible={locationModalVisible}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 0 }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 20,
                                    height: 50
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                        }}
                                        onPress={() => navigation.goBack()}>
                                        <Icon name='arrow-back' size={20} onPress={() => setLocationModalVisible(false)} color={COLORS.black} />
                                    </TouchableOpacity>
                                    <View style={{
                                        flex: 2,
                                    }}>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}> Add Location </Text>
                                    </View>
                                </View>
                                <View style={{
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}>
                                    <MapView
                                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                        style={styles.map}
                                        initialRegion={{
                                            latitude: 24.860966,
                                            longitude: 66.990501,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                    >
                                        <Marker
                                            coordinate={{
                                                latitude: 24.860966,
                                                longitude: 66.990501,
                                            }}
                                            // image={require('../../../assets/map.png')}
                                            draggable={true}
                                            onDragEnd={(e) => {
                                                console.log('Drag end', e.nativeEvent.coordinate)
                                                setPin({
                                                    latitude: e.nativeEvent.coordinate.latitude,
                                                    longitude: e.nativeEvent.coordinate.longitude,
                                                })
                                            }}
                                            title={'Test Marker'}
                                            description={'This is description of marker'} >
                                            <Image
                                                source={require('../../assets/map.png')}
                                                style={{ width: 26, height: 28 }}
                                                resizeMode="contain"
                                            />
                                        </Marker>
                                        <Circle center={pin} radius={1000} />
                                    </MapView>
                                    <View
                                        style={{
                                            position: 'absolute',//use absolute position to show button on top of the map
                                            top: '70%', //for center align
                                            alignSelf: 'center' //for align to right
                                        }}
                                    >
                                        <CustomeButton title={'Add Location'} onpress={() => setLocation(pin)} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>


                    <View style={{
                        marginTop: 109,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        elevation: 5,
                        // justifyContent:'flex-end',
                        height: windowHeight / 1.2,
                        backgroundColor: COLORS.white
                    }}>
                        <View>
                            <View style={{
                                padding: 20,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flex: 1
                                }}>
                                    <Entypo name='cross' size={25} color={COLORS.black} onPress={() => setModal(false)} />
                                </View>
                                <View style={{
                                    flex: 2
                                }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: COLORS.black
                                    }}>
                                        Create a Proposal
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <View style={{ marginTop: 10, width: '90%' }}>
                                    <Text style={{ color: COLORS.black, paddingBottom: 5 }}>Date </Text>
                                    <View style={{
                                        height: 45,
                                        backgroundColor: COLORS.white,
                                        borderRadius: 10,
                                        elevation: 4,
                                        paddingRight: 10,
                                        marginLeft: 2,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <TextInput
                                            style={{
                                                padding: 0,
                                                backgroundColor: COLORS.transparent,
                                            }}
                                            placeholder={'Select Date'}
                                            value={date}
                                            placeholderTextColor={COLORS.gray}
                                            // error={dateOfBirthError}
                                            onChangeText={setDate}
                                            selectionColor={COLORS.black}
                                            underlineColor={COLORS.white}
                                            // activeOutlineColor={COLORS.fontColor}
                                            activeUnderlineColor={COLORS.white}
                                            // onFocus={() => { setDateOfBirthError(false) }}
                                            onPressIn={showDateModal}
                                        />
                                        <TouchableOpacity onPress={() => showDateModal()}>
                                            <Image source={require('../../assets/selectdate.png')} resizeMode='contain' style={{
                                                // tintColor: COLORS.black,
                                                width: 25,
                                                height: 25,
                                            }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <View style={{ marginTop: 10, width: '90%' }}>
                                    <Text style={{ color: COLORS.black, paddingBottom: 5 }}>Time </Text>
                                    <View style={{
                                        height: 45,
                                        backgroundColor: COLORS.white,
                                        borderRadius: 10,
                                        elevation: 4,
                                        paddingRight: 10,
                                        marginLeft: 2,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <TextInput
                                            style={{
                                                padding: 0,
                                                backgroundColor: COLORS.transparent,
                                            }}
                                            placeholder={'Select Time'}
                                            value={time}
                                            placeholderTextColor={COLORS.gray}
                                            // error={dateOfBirthError}
                                            onChangeText={setTime}
                                            selectionColor={COLORS.black}
                                            underlineColor={COLORS.white}
                                            // activeOutlineColor={COLORS.fontColor}
                                            activeUnderlineColor={COLORS.white}
                                            // onFocus={() => { setDateOfBirthError(false) }}
                                            onPressIn={showTimeModal}
                                        />
                                        {/* <Image source={require('../../assets/selectdate.png')} resizeMode='contain' style={{
                                            // tintColor: COLORS.black,
                                            width: 25,
                                            height: 25,
                                        }}/> */}
                                    </View>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ marginTop: 10, width: '90%' }}>
                                    <Text style={{ color: COLORS.black }}> Location </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingRight: 10,
                                        height: 50,
                                        // width: 340,
                                        backgroundColor: COLORS.white,
                                        borderRadius: 10,
                                        elevation: 4
                                    }}>
                                        <TextInput
                                            value={location}
                                            placeholder={'Add location of event'}
                                            onChangeText={location => setLocation(location)
                                            }
                                            placeholderTextColor={COLORS.gray}
                                            selectionColor={COLORS.black}
                                            underlineColor={COLORS.white}
                                            activeUnderlineColor={COLORS.white}
                                            style={{
                                                padding: 0,
                                                backgroundColor: COLORS.transparent,
                                            }}
                                            onPressIn={OpenLocationModalView}
                                            editable={true}
                                        />
                                        <Image source={require('../../assets/selectdate.png')} resizeMode='contain' style={{
                                            width: 25,
                                            height: 25,
                                        }} />
                                    </View>
                                </View>
                            </View>

                            <View style={{ alignItems: 'center' }}>
                                <View style={{ marginTop: 10, width: '90%' }}>
                                    <Text style={{ color: COLORS.black }}> Description </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingRight: 10,
                                        // height: 50,
                                        // width: 340,
                                        backgroundColor: COLORS.white,
                                        borderRadius: 10,
                                        elevation: 4
                                    }}>
                                        <TextInput
                                            value={description}
                                            placeholder={'enter more details'}
                                            onChangeText={description => setDescription(description)
                                            }
                                            placeholderTextColor={COLORS.gray}
                                            selectionColor={COLORS.black}
                                            underlineColor={COLORS.white}
                                            activeUnderlineColor={COLORS.white}
                                            style={{
                                                padding: 0,
                                                backgroundColor: COLORS.transparent,
                                                // height: 200,
                                            }}
                                            multiline
                                            numberOfLines={8}
                                            onPressIn={OpenLocationModalView}
                                            editable={true}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <View style={{
                                paddingTop: 50,
                                paddingBottom: 10,
                                flexDirection: 'row',
                            }}>
                                <View style={{ marginHorizontal: 5 }}>
                                    <CustomeButton width={130} onpress={() => setModal(false)}
                                        title={'Cancle'} bcolor={COLORS.light} />
                                </View>
                                <View style={{ marginHorizontal: 5 }}>
                                    <CustomeButton width={170} onpress={() => onSendPorposal()}
                                        title={'Send Proposal'} />
                                </View>

                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export default ChatingScreen

const styles = StyleSheet.create({
    container: {
        // alignItems:'center'
        backgroundColor: COLORS.white,
        flex: 1,
    },
    container2: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    contentContainer: {
        flex: 1,
        height: 400,
    },
    footer: {
        height: 120,
        width: '100%'
    },
    inputType: {
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderColor: COLORS.gray2,
        height: 40
    },
    map: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: windowHeight,
        width: windowWidth,
        borderRadius: 15,
    },
})
