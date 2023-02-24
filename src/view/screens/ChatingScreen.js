import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity, ActivityIndicator, Dimensions, Modal, ToastAndroid, ScrollView, Pressable } from 'react-native';
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
import { login, PorposalCategory, selectPorposalCategory, selectStatus, selectUser, status } from '../../../redux/reducers/Reducers';
import Notifictaions from '../components/Notifictaions';
import { IconButton, MD3Colors, TextInput } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CustomeButton from '../components/CustomeButton';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { set } from 'immer/dist/internal';
import GoogleMapKey from '../../consts/GoogleMapKey';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const ChatingScreen = ({ navigation, route }) => {
    // console.log('==>' , GoogleMapKey);
    const userName = route.params.userName;
    const userImg = route.params.userImg;
    const uid = route.params.uid;
    const [messages, setMessages] = useState([]);
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [rendering, setRendering] = useState(false);
    const Currentuser = useSelector(selectUser);
    const [transferred, setTransferred] = useState(0);
    const [modal, setModal] = useState(false);
    const [sendPorposal, setSendPorposal] = useState();
    const [date, setDate] = useState();
    const [discountStartDate, setDiscountStartDate] = useState('');
    const [DateVisibility, setDateVisibility] = useState(false);
    const [isDiscountStartDatePickerVisible, setDiscountStartDatePickerVisibility] = useState(false);

    const [time, setTime] = useState('');
    const [address, setAddressText] = useState();
    const [TimeVisibility, setTimeVisibility] = useState(false);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [actionTriggered, setActionTriggered] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [pin, setPin] = useState({
        latitude: 24.9026764,
        longitude: 67.11445119999999,
    });
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });
    const [acceptedProposal, setAcceptedProposal] = useState();

    const api = GoogleMapKey.GOOGLE_MAP_KEY
    const dispatch = useDispatch()
    const cat = useSelector(selectPorposalCategory)
    console.log('=====>', cat);


    // console.log('userName: ', userName);
    // console.log('userName: ', userImg);

    const [showhide, setShowHide] = useState(false)
    const [sendchat, setSendChat] = useState('')

    const SwitchMode = (value) => (
        setShowHide(value)
    );
    const docid = uid > Currentuser.uid ? Currentuser.uid + "-" + uid : uid + "-" + Currentuser.uid


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
            // console.log('==>',allmsg);
        })

        fetchDateModeProposals();

    }, [])

    const onSend = useCallback((messages = []) => {
        let mymsg = null;
        console.log('category==>', cat);
        console.log('imageUrl===>', imageUrl);
        // return
        if (imageUrl !== '') {
            console.log('send imageUrl');
            const msg = messages[0]
            mymsg = {
                ...msg,
                sentBy: Currentuser.uid,
                sentTo: uid,
                createdAt: new Date(),
                image: imageUrl,
                sent: true,
                category: 'image',
                ProposalDate: '',
                ProposalTime: '',
                ProposalAddress: '',
                ProposalLocation: '',
                ProposalDescription: '',
                ProposalStatus: '',
            };
        }
        else {
            console.log('send proposal');
            const msg = messages[0]
            mymsg = {
                ...msg,
                sentBy: Currentuser.uid,
                sentTo: uid,
                createdAt: new Date(),
                image: '',
                sent: true,
                category: cat,
                ProposalDate: discountStartDate,
                ProposalTime: time,
                ProposalAddress: location,
                ProposalLocation: pin,
                ProposalDescription: description,
                ProposalStatus: false,
            };
        }
        // else {
        //     const msg = messages[0]
        //     mymsg = {
        //         ...msg,
        //         sentBy: Currentuser.uid,
        //         sentTo: uid,
        //         createdAt: new Date(),
        //         image: '',
        //         sent: true,
        //         category: 'normal',
        //         ProposalDate: '',
        //         ProposalTime: '',
        //         ProposalAddress: '',
        //         ProposalLocation: '',
        //         ProposalDescription: '',
        //         ProposalStatus: '',
        //     };
        // }
        // console.log(mymsg);
        // return
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
        const docid = uid > Currentuser.uid ? Currentuser.uid + "-" + uid : uid + "-" + Currentuser.uid
        console.log(mymsg);
        // return
        firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .doc(mymsg._id)
            .set({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
            .then(() => {
                setImageUrl('');
                setImageData(null);
                setCategory('');
                dispatch(PorposalCategory(null))
            })
    }, [])

    const fetchDateModeProposals = async () => {

        await
            firestore().collection('chatrooms')
                .doc(docid)
                .collection('messages')
                .where("category", '==', "Proposal")
                .where("ProposalStatus", '==', true)
                .onSnapshot(docSnapshot => {
                    // console.log(docSnapshot.data());
                    const Proposals = [];
                    docSnapshot.forEach((documentSnapshot) => {
                        // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                        Proposals.push(documentSnapshot.data());
                        // modalDataUid.push(documentSnapshot.id);
                    });
                    // console.log(Proposals);
                    setAcceptedProposal(Proposals)
                })
        // console.log(acceptedProposal);
    }

    const onSendPorposal = () => {
        // setCategory('Proposal')
        const test = 'Proposal'
        dispatch(PorposalCategory(test))
        if (!discountStartDate) {
            // console.log('aklxjn');
            ToastAndroid.show("Please select proposal Date!", ToastAndroid.SHORT);
        }
        else if (!time) {
            ToastAndroid.show("Please select proposal time!", ToastAndroid.SHORT);
        }
        else if (!description) {
            ToastAndroid.show("Please add proposal description!", ToastAndroid.SHORT);
        }
        else if (!pin) {
            ToastAndroid.show("Please add your location!", ToastAndroid.SHORT);
        }
        else {
            // setInterval(() => {
            //     setCategory('Proposal');
            // })
            // console.log(
            //     'selected date', discountStartDate,
            //     'selected time', time,
            //     'selected address', location,
            //     'selected location', pin,
            //     'selected description', description,
            // );
            // onSend();

            setModal(false)
        }
    }
    // useEffect(() => {
    //     console.log('useeffect1', category);
    //     console.log('useeffect2', imageUrl);
    // }, [category || imageUrl])



    const RejectProposal = (uid) => {
        // console.log('reject', uid);
        const userRef = firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .doc(uid)

        userRef.delete()
            .then(() => {
                // RefereshForm();
                // setDefaultAnimationDialog(false)
                // navigation.goBack();
                // console.log('Event deleted!');
                ToastAndroid.show('Proposal Rejected!', ToastAndroid.SHORT)
            });
    }
    const AcceptProposal = (uid) => {
        // console.log('accept', uid);

        const userRef = firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .doc(uid)

        userRef.update({
            'ProposalStatus': true,
        })
    }



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
        // console.log(props.currentMessage.category);
        const filter = props.currentMessage.category
        // console.log(props.currentMessage.sentBy);
        // // console.log(Currentuser.uid);
        // console.log(props.currentMessage.text);
        if (filter == 'Proposal') {
            return (
                <Bubble
                    {...props}
                    wrapperStyle={{
                        right: {
                            backgroundColor: COLORS.white,
                            elevation: 3,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 15,
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15,
                            // height: 170,
                            // width: 250,
                        },
                        left: {
                            backgroundColor: COLORS.white,
                            elevation: 3,
                            borderBottomRightRadius: 15,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15,
                            // height: 170,
                            // width: 250,
                        }
                    }}
                    textStyle={{
                        right: {
                            color: COLORS.main
                        },
                    }}
                />

            )
        }
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
                        color: COLORS.white,
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 15,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                    },
                    left: {
                        borderBottomRightRadius: 15,
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        borderBottomLeftRadius: 0,
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
        // console.log('showdatemodal');
    }
    const hideDiscountStartDatePicker = () => {
        setDateVisibility(false);
    };
    const handleDiscountConfirmStartDate = date => {
        // console.warn('A date has been picked: ', date);
        setDiscountStartDate(moment(date).format('MM/DD/yy'))
        // setDiscountStartDate(moment(date).format('MM/DD/yy'));
        hideDiscountStartDatePicker();
    };
    // const hideDatePicker = () => {
    //     setDateVisibility(false);
    // };
    // const handleConfirmDate = date => {
    //     setDate(moment(date).format('MM/DD/yy'));
    //     // console.log('date', date);
    //     // const test = moment(date).format('MM/DD/yy')
    //     // console.warn('A date has been picked: ', date);
    //     hideDatePicker();
    // };

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


    const OnSetLocation = () => {
        if (region) {
            console.log('selected pin', region);
            console.log('selected pin', location);
            setLocation('location')
            // setAddressText(location)
            setLocationModalVisible(false)
        }
        else {
            ToastAndroid.show("Please select location first!", ToastAndroid.SHORT);
        }
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

    function renderCustomePurposal(props) {
        // console.log(props.currentMessage.category);
        const uid = props.currentMessage._id;
        const myid = props.currentMessage.sentBy;
        const chatuserid = props.currentMessage.sentTo;
        const filter = props.currentMessage.category;
        const ProposalAddress = props.currentMessage.ProposalAddress;
        const ProposalDate = props.currentMessage.ProposalDate;
        const ProposalTime = props.currentMessage.ProposalTime;
        const ProposalStatus = props.currentMessage.ProposalStatus;
        // const filter = props.currentMessage.category;
        // const filter = props.currentMessage.category;
        // console.log(props.currentMessage.sentBy);a
        // console.log(props.currentMessage.sentBy);
        // console.log(props.currentMessage.text);
        return (
            <>
                {filter == 'Proposal' && Currentuser.uid == myid &&
                    <View style={{
                        backgroundColor: COLORS.white,
                        // elevation:3,
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 15,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                        // height: 170,
                        // width: 250,
                        // width: 300,
                        // height: 150,
                        padding: 20,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: COLORS.black,
                                    paddingRight: 50
                                }}>Dating Porposal</Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontSize: 12,
                                }}>6 days remaining</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: 10
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    paddingRight: 5
                                }}>
                                    <Image source={require('../../assets/events.png')} resizeMode="contain" style={{
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                    }}>{ProposalDate}</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    paddingRight: 5
                                }}>
                                    <Image source={require('../../assets/clock.png')} resizeMode="contain" style={{
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                    }}>{ProposalTime}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: 10
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    paddingRight: 5
                                }}>
                                    <Image source={require('../../assets/map.png')} resizeMode="contain" style={{
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                    }}>{ProposalAddress}</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{
                                backgroundColor: COLORS.black,
                                marginTop: 20,
                                borderRadius: 10,
                                padding: 10,
                                alignItems: 'center',
                            }}>
                            <Text style={{
                                color: COLORS.white
                            }}>Withdraw purposal</Text>
                        </TouchableOpacity>
                    </View>
                }

                {filter == 'Proposal' && Currentuser.uid == chatuserid &&
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 15,
                        // elevation:3,
                        // borderBottomRightRadius: 0,
                        // borderBottomLeftRadius: 15,
                        // borderTopRightRadius: 15,
                        // borderTopLeftRadius: 15,
                        // height: 170,
                        // width: 250,
                        // width: 300,
                        // height: 150,
                        padding: 20,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: COLORS.black,
                                    paddingRight: 50
                                }}>Dating Porposal</Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontSize: 12,
                                }}>6 days remaining</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: 10
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    paddingRight: 5
                                }}>
                                    <Image source={require('../../assets/events.png')} resizeMode="contain" style={{
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                    }}>{ProposalDate}</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    paddingRight: 5
                                }}>
                                    <Image source={require('../../assets/clock.png')} resizeMode="contain" style={{
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                    }}>{ProposalTime}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: 10
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    paddingRight: 5
                                }}>
                                    <Image source={require('../../assets/map.png')} resizeMode="contain" style={{
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                    }}>{ProposalAddress}</Text>
                                </View>
                            </View>
                        </View>
                        {ProposalStatus ?
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{
                                    backgroundColor: COLORS.black,
                                    marginTop: 20,
                                    borderRadius: 10,
                                    padding: 10,
                                    alignItems: 'center',
                                }}>
                                <Text style={{
                                    color: COLORS.white
                                }}>Cancle</Text>
                            </TouchableOpacity>
                            :
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <TouchableOpacity
                                    onPress={() => RejectProposal(uid)}
                                    activeOpacity={0.8}
                                    style={{
                                        backgroundColor: COLORS.transparent,
                                        borderWidth: 1,
                                        marginTop: 20,
                                        borderRadius: 10,
                                        padding: 10,
                                        alignItems: 'center',
                                        width: 120,
                                        marginHorizontal: 10
                                    }}>
                                    <Text style={{
                                        color: COLORS.black
                                    }}>Reject</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => AcceptProposal(uid)}

                                    activeOpacity={0.8}
                                    style={{
                                        backgroundColor: COLORS.black,
                                        marginTop: 20,
                                        borderRadius: 10,
                                        padding: 10,
                                        alignItems: 'center',
                                        width: 120,
                                        marginHorizontal: 10
                                    }}>
                                    <Text style={{
                                        color: COLORS.white
                                    }}>Accepte</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                }
            </>
        )
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
                    <View>
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

                        <View style={{
                            marginTop: 20,
                            paddingHorizontal: 20
                        }}>
                            <Text style={{
                                fontSize: 20,
                                color: COLORS.black,
                                fontWeight: 'bold'
                            }}>Dates</Text>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {!acceptedProposal?.length == 0 ?
                                <>
                                    {acceptedProposal?.map((item, index) => (
                                        console.log('==============', item),
                                        <View
                                            key={index}
                                            style={{
                                                paddingHorizontal: 20,
                                                paddingVertical: 20,
                                                backgroundColor: COLORS.white,
                                                marginVertical: 10,
                                                marginHorizontal: 20,
                                                borderRadius: 10,
                                                elevation: 3,
                                            }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}>
                                                <View>
                                                    <Text style={{
                                                        fontSize: 20,
                                                        fontWeight: 'bold',
                                                        color: COLORS.black,
                                                        paddingRight: 50
                                                    }}>Dating Porposal</Text>
                                                </View>
                                                <View>
                                                    <Text style={{
                                                        fontSize: 12,
                                                    }}>6 days remaining</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                paddingTop: 10
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <View style={{
                                                        paddingRight: 5
                                                    }}>
                                                        <Image source={require('../../assets/events.png')} resizeMode="contain" style={{
                                                            width: 15,
                                                            height: 15,
                                                        }} />
                                                    </View>
                                                    <View>
                                                        <Text style={{
                                                            fontSize: 12,
                                                        }}>{item?.ProposalDate}</Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <View style={{
                                                        paddingRight: 5
                                                    }}>
                                                        <Image source={require('../../assets/clock.png')} resizeMode="contain" style={{
                                                            width: 15,
                                                            height: 15,
                                                        }} />
                                                    </View>
                                                    <View>
                                                        <Text style={{
                                                            fontSize: 12,
                                                        }}>{item.ProposalTime}</Text>
                                                    </View>
                                                </View>

                                            </View>

                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                paddingTop: 10
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <View style={{
                                                        paddingRight: 5
                                                    }}>
                                                        <Image source={require('../../assets/map.png')} resizeMode="contain" style={{
                                                            width: 15,
                                                            height: 15,
                                                        }} />
                                                    </View>
                                                    <View>
                                                        <Text style={{
                                                            fontSize: 12,
                                                        }}>{item.ProposalAddress}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => { setModal(true), setDeleteModal('DeleteModal') }}
                                                activeOpacity={0.8}
                                                style={{
                                                    backgroundColor: COLORS.black,
                                                    marginTop: 20,
                                                    borderRadius: 10,
                                                    padding: 10,
                                                    alignItems: 'center',
                                                }}>
                                                <Text style={{
                                                    color: COLORS.white
                                                }}>Cancle</Text>
                                            </TouchableOpacity>

                                        </View>
                                    ))}
                                </>
                                :
                                <View style={{
                                    alignItems: 'center',
                                    paddingTop: 20
                                }}>
                                    <Text>No Dates Proposal Found!</Text>
                                </View>
                            }

                        </ScrollView>

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
                            renderCustomView={props => (
                                renderCustomePurposal(props)
                            )}
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


                {/* <DateTimePickerModal
                    isVisible={DateVisibility}
                    mode="date"
                    // display='spinner'
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                /> */}
                <DateTimePickerModal
                    isVisible={DateVisibility}
                    mode="date"
                    // display='spinner'
                    onConfirm={handleDiscountConfirmStartDate}
                    onCancel={hideDiscountStartDatePicker}
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
                    < Modal
                        animationType='fade'
                        transparent={false}
                        visible={locationModalVisible}>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <View style={{ marginTop: 0 }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 20,
                                    flex: 0,
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
                                    justifyContent: 'center'
                                }}>
                                    <GooglePlacesAutocomplete
                                        placeholder='Search'
                                        fetchDetails={true}
                                        autoFocus={false}
                                        GooglePlacesSearchQuery={{
                                            rankby: "distance"
                                        }}
                                        onPress={(data, details = null) => {
                                            // 'details' is provided when fetchDetails = true
                                            console.log('data here ===>', data, 'details ===>', details);
                                            setRegion({
                                                latitude: details.geometry.location.lat,
                                                longitude: details.geometry.location.lng,
                                                latitudeDelta: 0.0922,
                                                longitudeDelta: 0.0421
                                            })
                                            setLocation(data.description)
                                        }}
                                        query={{
                                            key: api,
                                            language: 'en',
                                            components: "country:pk",
                                            types: "establishment",
                                            radius: 30000,
                                            location: `${region.latitude}, ${region.longitude}`
                                        }}
                                        styles={{
                                            container: {
                                                flex: 1, position: 'relative', width: "100%", zIndex: 1,
                                                // marginHorizontal: 20,
                                                marginTop: 10,
                                            },
                                            listView: { backgroundColor: "white" }
                                        }}
                                    />
                                    <MapView
                                        // ref={mapRef}
                                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                        style={styles.map}
                                        initialRegion={{
                                            latitude: 24.9026764,
                                            longitude: 67.11445119999999,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                    >
                                        {/* <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} /> */}
                                        <Marker
                                            coordinate={{
                                                latitude: region.latitude,
                                                longitude: region.longitude,
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
                                        <Circle center={region} radius={1000} />
                                        {/* <MapViewDirections
                                            origin={pin}
                                            destination={pin}
                                            apikey={GoogleMapKey.GOOGLE_MAP_KEY}
                                            strokeColor={COLORS.black}
                                            strokeWidth={3}
                                            optimizeWayPoints={true}
                                            mode='DRIVING'
                                            onReady={result => {
                                                console.log('===>', result);
                                                // setResult(result);
                                                // calculateDistance(result);
                                                // mapRef.current.fitToCoordinates(result.coordinates, {
                                                //     edgePadding: {
                                                //         right: 30,
                                                //         bottom: 50,
                                                //         left: 30,
                                                //         top: 50
                                                //     }
                                                // })
                                            }}
                                        /> */}
                                    </MapView>
                                    <View
                                        style={{
                                            position: 'absolute',//use absolute position to show button on top of the map
                                            top: '70%', //for center align
                                            alignSelf: 'center' //for align to right
                                        }}
                                    >
                                        <CustomeButton title={'Add Location'} onpress={() => OnSetLocation()} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>



                    {modal && deleteModal == "DeleteModal" ?

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
                                <Text style={{
                                    marginBottom: 10,
                                    color: COLORS.black,
                                    fontWeight: 'bold'
                                    // textAlign: 'center',
                                }}>Cancle Date!</Text>
                                <Text style={{
                                    marginBottom: 10,

                                }}>
                                    If you cancel now, you will get flake on your profile. You can remove flakes for $10 pet flake. On your profile
                                </Text>
                                <View style={{
                                    alignItems: 'center',
                                    paddingHorizontal: 20,
                                    flexDirection: 'row',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => { setModal(false), setDeleteModal('') }}
                                        style={{
                                            width: '50%',
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
                                    <TouchableOpacity style={{
                                        width: '50%',
                                        borderWidth: 1,
                                        borderColor: COLORS.black,
                                        borderRadius: 10,
                                        marginHorizontal: 5,
                                        paddingVertical: 10,
                                        alignItems: 'center',
                                        backgroundColor: COLORS.black
                                    }}>
                                        <Text style={{
                                            color: COLORS.white
                                        }}>
                                            Cancle Date
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                        :
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
                                                value={discountStartDate}
                                                placeholderTextColor={COLORS.gray}
                                                // error={dateOfBirthError}
                                                onChangeText={setDiscountStartDate}
                                                selectionColor={COLORS.black}
                                                underlineColor={COLORS.white}
                                                // activeOutlineColor={COLORS.fontColor}
                                                activeUnderlineColor={COLORS.white}
                                                // onFocus={() => { setDateOfBirthError(false) }}
                                                onPressIn={showDateModal}
                                            // onPressIn={showTimeModal}

                                            />
                                            <Image source={require('../../assets/selectdate.png')} resizeMode='contain' style={{
                                                // tintColor: COLORS.black,
                                                width: 25,
                                                height: 25,
                                            }} />
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
                                                    paddingLeft: 0,
                                                    backgroundColor: COLORS.transparent,
                                                    width: '85%'
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
                    }


                </Modal>
            </View>
        </SafeAreaView >
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
    containerStyle: {
        backgroundColor: 'white',
        zIndex: 1
    },

    textInputStyle: {
        zIndex: 1,
        width: '100%',
        padding: 5,
        color: COLORS.black,
        fontSize: 14,
        // backgroundColor: 'white',
        borderColor: 'grey',
        borderBottomWidth: 1.2,
        marginVertical: 5,
        // paddingHorizontal: 20,
    },
})
