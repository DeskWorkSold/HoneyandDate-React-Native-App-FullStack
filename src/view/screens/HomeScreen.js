import { StatusBar, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ActivityIndicator, Dimensions, Modal, ScrollView, ImageBackground, Alert, PermissionsAndroid, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import COLORS from '../../consts/Colors';
import HeaderTabOne from '../components/HeaderTabOne';
import Swiper from 'react-native-deck-swiper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { chatuser, selectChatuser, selectPackages, selectUser } from '../../../redux/reducers/Reducers'
import Notifictaions from '../../view/components/Notifictaions';
import SVGImg from '../../assets/conform.svg';
import SVGImg1 from '../../assets/diamond.svg';
import SVGImg2 from '../../assets/dot.svg';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { getPreciseDistance } from 'geolib';
import GoogleMapKey from '../../consts/GoogleMapKey';
const { height, width } = Dimensions.get('window');
import messaging from '@react-native-firebase/messaging';
// import NetInfo from "@react-native-community/netinfo";

// console.log(GoogleMapKey.GOOGLE_MAP_KEY);

Geocoder.init(GoogleMapKey.GOOGLE_MAP_KEY); // use a valid API key



function RenderCard({ data, navigation }) {
    const user2 = useSelector(selectUser);
    // console.log('===>',user2.Location?.latitude);
    // console.log('===>',data?.userDetails?.Location.latitude);
    const [flake, setFlake] = useState('')
    const years = new Date().getFullYear() - new Date(data?.userDetails?.Dates).getFullYear();
    const distance = getPreciseDistance(
        { latitude: user2?.Location?.latitude, longitude: user2?.Location?.longitude, },
        { latitude: data?.userDetails?.Location.latitude, longitude: data?.userDetails?.Location.longitude }
    ) * 0.000621;

    return (
        <View style={{
            marginTop: -50,
            // height: '80%',
            backgroundColor: COLORS.white,
            elevation: 5,
            borderRadius: 25,
            paddingHorizontal: 5
        }}>
            <View style={{
                paddingTop: 5,
            }}>
                <Image source={{ uri: data?.userDetails?.image1 }} resizeMode='cover'
                    style={{
                        height: height / 1.7,
                        borderRadius: 20,
                        width: '100%',
                        paddingHorizontal: 10
                    }}
                />
                {data?.userDetails?.Flake > 0 &&
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 15,
                        marginTop: height / 2,
                        alignItems: 'center',
                        position: 'absolute',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginLeft: 15
                    }}>
                        <Text style={{
                            color: COLORS.black,
                            // textAlign: 'center'
                            fontWeight: 'bold'
                        }}>
                            #flakemeter
                        </Text>
                        {data?.userDetails?.Flake == 1 &&
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    width: 20,
                                    height: 20
                                }} />
                                <Text>
                                    +{data?.userDetails?.Flake}
                                </Text>
                            </View>
                            // <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                        }
                        {data?.userDetails?.Flake == 2 &&
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    width: 20,
                                    height: 20
                                }} />
                                <Text>
                                    +{data?.userDetails?.Flake}
                                </Text>
                            </View>
                        }
                        {data?.userDetails?.Flake == 3 &&
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Text>
                                    +{data?.userDetails?.Flake}
                                </Text>
                            </View>
                        }
                        {data?.userDetails?.Flake > 3 &&
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                    tintColor: COLORS.main,
                                    width: 20,
                                    height: 20
                                }} />
                                <Text>
                                    +{data?.userDetails?.Flake}
                                </Text>
                            </View>
                        }
                        {data?.userDetails?.Flake < 1 &&
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
                    </View>
                }
            </View>
            <View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                    paddingTop: 10
                }}>
                    <Image source={require('../../assets/dot.png')} resizeMode='contain'
                        style={{
                            width: 5,
                            height: 5,
                            marginRight: 5
                        }} />
                    <Text style={{
                        fontSize: 20, fontWeight: 'bold',
                        color: COLORS.black,
                        marginRight: 5
                    }}>{data?.userDetails?.Name},</Text>
                    <View>
                        <Text style={{
                            fontSize: 20,
                            color: COLORS.black,
                            marginRight: 5
                        }}>{years ? years : 0}</Text>
                    </View>
                    {/* <Image source={require('../../assets/conform.png')} resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                        }} /> */}
                    <View style={{
                        alignItems: 'center',
                    }}>
                        <SVGImg width={20} height={20} />
                    </View>
                    <View style={{
                        alignItems: 'center',
                        paddingHorizontal: 3
                    }}>
                        <SVGImg2 width={5} height={5} />
                    </View>
                    <SVGImg1 width={20} height={20} />
                </View>
            </View>


            <View style={{
                paddingBottom: 20
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        color: COLORS.black,
                        marginRight: 5
                    }}>Model at Instagaram</Text>
                    <Text style={{
                        color: COLORS.black,
                        marginRight: 5,
                        backgroundColor: COLORS.main,
                        padding: 3,
                        borderRadius: 5,
                    }}>{distance ? distance.toFixed(2) : 0} Miles Away</Text>
                </View>
            </View>

            {/* <View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 50,
                    justifyContent: 'space-between',
                    marginTop: 10
                }}>
                    <View style={{
                        padding: 20,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        elevation: 5
                    }}>
                        <TouchableOpacity>
                            <Image source={require('../../assets/cancle.png')} resizeMode='contain'
                                style={{
                                    width: 15,
                                    height: 15
                                }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        padding: 15,
                        borderRadius: 40,
                        backgroundColor: COLORS.pink
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('CongratsMatchScreen')}>
                            <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30
                                }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        padding: 20,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        elevation: 5
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>

                            <Image source={require('../../assets/message.png')} resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20
                                }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View> */}
        </View>
    )
}

function StatusCard({ text }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{text}</Text>
        </View>
    );
};

function RenderModal({ data }) {
    // console.log(data);
    // return (
    //   <View style={styles.cardsText}>
    //     <Text>{data.name}</Text>
    //   </View>
    // );
};
const HomeScreen = ({ navigation }) => {
    const [swiper, setSwiper] = useState();
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState();
    const [modalData, setModalData] = useState();
    const [modalDataUid, setModalDataUid] = useState();
    const [swapLeft, setSwapLeft] = useState([]);
    const [swipedAllCards, setswipedAllCards] = useState(false);
    const [swipeDirection, setswipeDirection] = useState('');
    const [cardIndex, setcardIndex] = useState(0);
    const [ChatUserId, setChatUserId] = useState();
    const [ChatUserDetail, setChatUserDetail] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [recentMessage, setRecentMessage] = useState([]);
    const [unreadMessage, setUnreadMessage] = useState([]);
    const [actionTrigger, setActionTrigger] = useState([]);
    // const [unreadMessage, setUnreadMessage] = useState([]);
    const user = useSelector(selectUser);
    // console.log(user);
    const userPackage = useSelector(selectPackages);
    const CurrentUser = auth().currentUser.uid;
    const chatUser = useSelector(selectChatuser);
    const dispatch = useDispatch();

    // console.log('=====================>',chatUser);




    // const ByMemeberShips = (item) => {
    //     var Data = new Object();
    //     Data.discountPercentage = item.discountPercentage;
    //     Data.discountPrice = item.discountPrice;
    //     Data.id = item.id;
    //     Data.name = item.name;
    //     Data.numberOfCards = item.numberOfCards;
    //     Data.numberOfChats = item.numberOfChats;
    //     Data.otherCategory = item.otherCategory;
    //     Data.rate = item.rate;
    //     Data.status = item.status;
    //     Data.description = item.description;
    //     // console.log('test data: ', Data);
    //     dispatch(packages(Data))
    //     // console.log(MembershipName);
    //     // console.log(item.id);
    //     const MembershipName = item.otherCategory.split(' ')[0]
    //     const useRef = firestore().collection('Users')
    //         .doc(CurrentUser)
    //     useRef.update({
    //         'userDetails.AccountType': MembershipName,
    //         'userDetails.PackageId': item.id,
    //     }).then(() => {
    //         setBuyPack(true)
    //         // console.log('Notices send!');
    //     });
    // }
    // const fetchMemberships = async () => {
    //     setUploading(true)
    //     try {
    //         // console.log('hello');
    //         await firestore()
    //             .collection('Package')
    //             .get()
    //             .then(querySnapshot => {
    //                 // console.log('Total user: ', querySnapshot.size);
    //                 const membership = [];
    //                 const membershipsuid = [];
    //                 querySnapshot.forEach((documentSnapshot) => {
    //                     // console.log('memberships ID: ', documentSnapshot.id, documentSnapshot.data());
    //                     membership.push(documentSnapshot.data());
    //                     membershipsuid.push(documentSnapshot.id);
    //                 });
    //                 setMemberships(membership)
    //                 setMembershipUid(membershipsuid)
    //             })
    //         // console.log('membershipData: ', memberships);

    //     } catch (e) {
    //         console.log(e);
    //     }
    //     setUploading(false)
    // };


    const fetchUsersUid = () => {
        if (CurrentUser) {
            try {
                const userRef = firestore().collection('Users')
                    .doc(CurrentUser)
                userRef.onSnapshot((querySnap) => {
                    // console.log('doc exists: ', querySnap.data());
                    if (!querySnap.data()?.PrivateChat) {
                        console.log('private chats not found');
                        // console.log('private chat here');
                    } else {
                        const ChatUid = []
                        querySnap.data()?.PrivateChat.map(chats => {
                            // console.log('total chats here', chats.ChatuserDetails.uid);
                            ChatUid.push(chats.ChatuserDetails.uid)
                        })
                        setChatUserId(ChatUid)
                    }
                })
            } catch (e) {
                console.log(e);
            }
        }
        else {
            dispatch(chatuser(null))
            setChatUserDetail(null)
        }
    };

    const fetchLockUser = (ChatUserId) => {
        // console.log('lock user here');
        if (!ChatUserId == '') {
            try {
                const LockedUser = []
                ChatUserId.map(item => {
                    firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                        // console.log('Match User: ', documentSnapshot.data());
                        if (docSnapshot.data()?.PrivateChat) {
                            const UserDetailLock = docSnapshot.data().userDetails.UserLock;
                            // console.log('LockUser: ',userdetails);
                            if (UserDetailLock == true) {
                                docSnapshot.data()?.PrivateChat.map(secUser => {
                                    if (secUser.ChatuserDetails.uid == CurrentUser) {
                                        // console.log('Lockeduser', docSnapshot.data().userDetails);
                                        LockedUser.push(docSnapshot.data().userDetails)
                                    }
                                    else {
                                        console.log('no locked user found');
                                        // LockedUser.push('')
                                    }
                                })
                            }
                            dispatch(chatuser(LockedUser.slice(0, 2)))
                            setChatUserDetail(LockedUser.slice(0, 2))
                        }
                        else {
                            console.log('data not found');
                            setChatUserDetail('')
                        }
                    })
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            setChatUserDetail('')
        }
    }

    const fetchMatchUsers = (ChatUserId) => {
        // console.log('chat id', ChatUserId);
        if (!userPackage == '') {
            const Package = userPackage.id;
            if (Package == 123) {
                if (!ChatUserId == '') {
                    // console.log(ChatUserId);
                    try {
                        const MatchedUser = []
                        ChatUserId.map(item => {
                            firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                                // console.log('Match User: ', docSnapshot.data().PrivateChat);
                                if (docSnapshot.data()?.PrivateChat) {
                                    // console.log('data here' , docSnapshot.data().userDetails.UserLock);
                                    const UserDetailLock = docSnapshot.data().userDetails
                                    // console.log(UserDetailLock);
                                    docSnapshot.data()?.PrivateChat.map(secUser => {
                                        if (secUser.ChatuserDetails.uid == CurrentUser) {
                                            MatchedUser.push(docSnapshot.data().userDetails)
                                        } else {
                                            console.log('no match found');
                                            // setChatUserDetail('')
                                        }
                                        // setChatUserId(chats.ChatuserDetails)
                                    })
                                    dispatch(chatuser(MatchedUser.slice(0, 2)))
                                    // console.log('final', MatchedUser);
                                    setChatUserDetail(MatchedUser.slice(0, 2))
                                    // setChatUserDetail(MatchedUser)
                                } else {
                                    console.log('data not found');
                                    setChatUserDetail('')
                                }
                            })
                        });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    setChatUserDetail('')
                }
            }
            else if (Package == 456) {
                if (!ChatUserId == '') {
                    try {
                        const MatchedUser = []
                        console.log(ChatUserId);

                        ChatUserId.map(item => {
                            firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                                // console.log('Match User: ', documentSnapshot.data());
                                if (docSnapshot.data()?.PrivateChat) {
                                    // console.log('data here');
                                    docSnapshot.data()?.PrivateChat.map(secUser => {
                                        if (secUser.ChatuserDetails.uid == CurrentUser) {
                                            console.log(
                                                docSnapshot.data().userDetails
                                            );

                                            const docid = docSnapshot.data().userDetails.uid > CurrentUser ? CurrentUser + "-" + docSnapshot.data().userDetails.uid : docSnapshot.data().userDetails.uid + "-" + CurrentUser
                                            console.log(docid);

                                            const messageRef = firestore().collection('chatrooms')
                                                .doc(docid)
                                                .collection('messages')
                                                .orderBy('createdAt', "desc")
                                                .limit(1)
                                            messageRef.onSnapshot((querySnap) => {
                                                const allmsg = querySnap.docs.map(docSanp => {
                                                    const data = docSanp.data();
                                                    // setRecentMessage(data.text)
                                                    // console.log(data);
                                                })
                                            })
                                            // docSnapshot.data().userDetails.recentMessages = recentMessage
                                            MatchedUser.push(docSnapshot.data().userDetails)
                                        } else {
                                            console.log('no match found');
                                        }
                                        // setChatUserId(chats.ChatuserDetails)
                                    })
                                    // setChatUserDetail(MatchedUser)
                                    // console.log('final', MatchedUser);
                                    setChatUserDetail(MatchedUser.slice(0, 3))
                                    dispatch(chatuser(MatchedUser.slice(0, 3)))
                                } else {
                                    console.log('data not found');
                                    setChatUserDetail('')
                                }
                            })
                        });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    setChatUserDetail('')
                }
            }
            else {
                if (!ChatUserId == '') {
                    try {
                        const MatchedUser = []
                        ChatUserId.map(item => {
                            firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                                // console.log('Match User: ', item);
                                if (docSnapshot.data()?.PrivateChat) {
                                    // console.log('data here');
                                    docSnapshot.data()?.PrivateChat.map(secUser => {
                                        if (secUser.ChatuserDetails.uid == CurrentUser) {
                                            const docid = docSnapshot.data().userDetails.uid > CurrentUser ? CurrentUser + "-" + docSnapshot.data().userDetails.uid : docSnapshot.data().userDetails.uid + "-" + CurrentUser

                                            const messageRef = firestore().collection('chatrooms')
                                                .doc(docid)
                                                .collection('messages')
                                                // .limit(1)
                                                .orderBy('createdAt', "desc")
                                            messageRef.onSnapshot((querySnap) => {
                                                const unreaded = []
                                                const recentmsg = []
                                                const allmsg = querySnap.docs.map(docSanp => {
                                                    const data2 = docSanp.data();
                                                    recentmsg.push(data2.text)
                                                    if (data2.read == false && data2.sentBy == item) {
                                                        // setRecentMessage(data?.text)
                                                        // docSnapshot.data().userDetails.recentMessages = recentMessage
                                                        // return data2.text
                                                        unreaded.push(data2.text)
                                                    }
                                                })
                                            })
                                            dataupdated = {
                                                ...docSnapshot.data().userDetails,
                                                // recentMessages: recentmsg.slice(0, 1),
                                                unreadMessages: '2',
                                                recentMessages: 'Hello there',
                                            }
                                            // console.log(docSnapshot.data().userDetails);
                                            //     docSnapshot.data().userDetails.unreadMessages = unreaded
                                            //     console.log(docSnapshot.data().userDetails);
                                            MatchedUser.push(dataupdated);
                                            // })
                                        } else {
                                            console.log('no match found');
                                        }
                                        // console.log('push: ', MatchedUser);
                                        // setChatUserId(chats.ChatuserDetails)
                                    })
                                    // console.log('final', MatchedUser.slice(0, 5));
                                    // const finalMatch = MatchedUser.slice(0, 5)
                                    setChatUserDetail(MatchedUser.slice(0, 25))
                                    dispatch(chatuser(MatchedUser.slice(0, 25)))
                                } else {
                                    console.log('data not found');
                                    setChatUserDetail('')
                                }
                            })
                        });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    setChatUserDetail('')
                }
            }
        }
        else {
            // console.log('===>',ChatUserId);
            if (!ChatUserId == '') {
                try {
                    const MatchedUser = []
                    ChatUserId.map(item => {
                        firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                            // console.log('Match User: ', docSnapshot.data());
                            if (docSnapshot.data()?.PrivateChat) {
                                // console.log('data here');
                                docSnapshot.data()?.PrivateChat.map(secUser => {
                                    if (secUser.ChatuserDetails?.uid == CurrentUser) {
                                        const docid = docSnapshot.data().userDetails.uid > CurrentUser ? CurrentUser + "-" + docSnapshot.data().userDetails.uid : docSnapshot.data().userDetails.uid + "-" + CurrentUser
                                        // console.log(docid);

                                        const messageRef = firestore().collection('chatrooms')
                                            .doc(docid)
                                            .collection('messages')
                                            .limit(1)
                                            .orderBy('createdAt', "desc")
                                        messageRef.onSnapshot((querySnap) => {
                                            const allmsg = querySnap.docs.map(docSanp => {
                                                const data = docSanp.data();
                                                setRecentMessage(data.text)
                                            })
                                        })
                                        docSnapshot.data().userDetails.recentMessages = recentMessage
                                        MatchedUser.push(docSnapshot.data().userDetails)
                                    } else {
                                        console.log('no match found');
                                        // MatchedUser.push('')
                                        // setChatUserDetail('')
                                    }
                                    // setChatUserId(chats.ChatuserDetails)
                                })
                                dispatch(chatuser(MatchedUser.slice(0, 1)))
                                setChatUserDetail(MatchedUser.slice(0, 1))
                            } else {
                                console.log('data not found');
                                setChatUserDetail('')
                            }
                        })
                    });
                } catch (e) {
                    console.log(e);
                }
            } else {
                setChatUserDetail('')
            }

        }
    };


    const fetchChatuserMain = () => {
        // console.log('testing: ', userData.userLock);
        if (user.userLock == true) {
            fetchLockUser(ChatUserId);
        } else {
            fetchMatchUsers(ChatUserId);
            // console.log('else');
        }
    }


    const fetchusersMain = async () => {
        // console.log(user.Gender);
        setLoading(true)
        if (user.Gender == 'Male') {
            // console.log(user.Gender);
            fetchFemaleUsers();
        }
        else {
            fetchMaleUsers();
            // console.log(user.Gender);
        }
        setLoading(false)

    }

    const fetchMaleUsers = async () => {
        // const Package = userPackage.otherCategory;
        // console.log(Package);
        if (!userPackage == '') {
            let distance
            const Package = userPackage.id;
            // console.log('male filter', Package);
            // for basic package 
            if (Package == 123) {
                await firestore()
                    .collection('Users')
                    // .where("userDetails.Gender", '==', "Male")
                    // .limit(2)
                    .onSnapshot(querySnapshot => {
                        // console.log('Total user: ', querySnapshot.size);
                        const users = [];
                        const modalDataUid = [];
                        querySnapshot.forEach((documentSnapshot) => {
                            const data = documentSnapshot.data().userDetails;
                            const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                            // if (data?.Location?.latitude && data?.Location?.longitude) {
                            //     distance = getPreciseDistance(
                            //         { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
                            //         { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
                            //     ) * 0.000621;
                            // }
                            // console.log('distance234==>', distance );
                            if (data.Gender == `${user.filterGender ? user.filterGender : "Male"}`) {
                                if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                    // || distance > 0 ? distance : 0 <= user.filterDistance
                                    ) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                            }
                            else if (user.filterGender == 'Both') {
                                if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                    // || distance > 0 ? distance : 0 <= user.filterDistance
                                    ) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                                // users.push(documentSnapshot.data());
                            }
                        });
                        setUsers(users.slice(0, 2))
                        setModalDataUid(modalDataUid.slice(0, 2))
                    })
            }
            // for Standar pacakge 
            else if (Package == 456) {
                await firestore()
                    .collection('Users')
                    // .where("userDetails.Gender", '==', "Male")
                    // .limit(3)
                    .onSnapshot(querySnapshot => {
                        // console.log('Total user: ', querySnapshot.size);
                        const users = [];
                        const modalDataUid = [];
                        querySnapshot.forEach((documentSnapshot) => {
                            const data = documentSnapshot.data().userDetails;
                            const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                            // if (data?.Location?.latitude && data?.Location?.longitude) {
                            //     distance = getPreciseDistance(
                            //         { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
                            //         { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
                            //     ) * 0.000621;
                            // }
                            if (data.Gender == `${user.filterGender ? user.filterGender : "Male"}`) {
                                if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                    // || distance > 0 ? distance : 0 <= user.filterDistance
                                    ) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge || !user?.filterDistance) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                            }
                            else if (user.filterGender == 'Both') {
                                if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                    // || distance > 0 ? distance : 0 <= user.filterDistance
                                    ) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge || !user?.filterDistance) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                                // users.push(documentSnapshot.data());
                            }
                        });
                        setUsers(users.slice(0, 3))
                        setModalDataUid(modalDataUid.slice(0, 3))
                    })
            }
            // for premium package 
            else {
                await firestore()
                    .collection('Users')
                    // .where("userDetails.Gender", '==', "Male")
                    // .limit(25)
                    .onSnapshot(querySnapshot => {
                        // console.log('Total user: ', querySnapshot.size);
                        const users = [];
                        const modalDataUid = [];
                        querySnapshot.forEach((documentSnapshot) => {
                            const data = documentSnapshot.data().userDetails;
                            const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                            // if (data?.Location?.latitude && data?.Location?.longitude) {
                            //     distance = getPreciseDistance(
                            //         { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
                            //         { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
                            //     ) * 0.000621;
                            // }
                            if (data.Gender == `${user.filterGender ? user.filterGender : "Male"}`) {
                                if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                    // || distance > 0 ? distance : 0 <= user.filterDistance
                                    ) {
                                    // console.log('User ID=======================1: ', documentSnapshot.data()) 
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge || !user?.filterDistance) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                    // console.log('test');
                                }
                            }
                            else if (user.filterGender == 'Both') {
                                if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                    // || distance > 0 ? distance : 0 <= user.filterDistance
                                    ) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge || !user?.filterDistance) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                                // users.push(documentSnapshot.data());
                            }
                        });
                        setUsers(users.slice(0, 25))
                        setModalDataUid(modalDataUid.slice(0, 25))
                    })
            }
        }
        else {
            await firestore()
                .collection('Users')
                // .where("userDetails.Gender", '==', "Male")
                // .limit(1)
                .onSnapshot(querySnapshot => {
                    // console.log('Total user: ', querySnapshot.size);
                    const users = [];
                    const modalDataUid = [];
                    querySnapshot.forEach((documentSnapshot) => {
                        const data = documentSnapshot.data().userDetails;
                        const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                        // if (data?.Location?.latitude && data?.Location?.longitude) {
                        //     distance = getPreciseDistance(
                        //         { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
                        //         { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
                        //     ) * 0.000621;
                        // }
                        // const distance = geolib.getPreciseDistance(user?.Location, data?.Location) * 0.000621
                        if (data.Gender == `${user.filterGender ? user.filterGender : "Male"}`) {
                            if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                // || distance > 0 ? distance : 0 <= user.filterDistance
                                ) {
                                // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                users.push(documentSnapshot.data());
                                modalDataUid.push(documentSnapshot.id);
                                // console.log('test');
                            }
                            else if (!user.filterMinAge || !user.filterMinAge || !user?.filterDistance) {
                                users.push(documentSnapshot.data());
                                modalDataUid.push(documentSnapshot.id);
                            }
                        }
                        else if (user.filterGender == 'Both') {
                            if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                // || distance > 0 ? distance : 0 <= user.filterDistance
                                ) {
                                // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                users.push(documentSnapshot.data());
                                modalDataUid.push(documentSnapshot.id);
                            }
                            else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
                                users.push(documentSnapshot.data());
                                modalDataUid.push(documentSnapshot.id);
                            }
                        }
                    });
                    setUsers(users.slice(0, 1))
                    setModalDataUid(modalDataUid.slice(0, 1))
                })
        }
    };

    const fetchFemaleUsers = async () => {
        // console.log('packages',userPackage);
        if (!userPackage == '') {
            const Package = userPackage.id;
            // for basic package 
            let distance
            if (Package == 123) {
                await firestore()
                    .collection('Users')
                    // .where("userDetails.Gender", '==', "Female")
                    // .limit(2)
                    .onSnapshot(querySnapshot => {
                        // console.log('Total user: ', querySnapshot.size);
                        const users = [];
                        const modalDataUid = [];
                        querySnapshot.forEach((documentSnapshot) => {
                            const data = documentSnapshot.data().userDetails;
                            const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                            // if (data?.Location?.latitude && data?.Location?.longitude) {
                            //     distance = getPreciseDistance(
                            //         { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
                            //         { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
                            //     ) * 0.000621;
                            // }
                            // const distance = geolib.getPreciseDistance(user?.Location, data?.Location) * 0.000621


                            if (data.Gender == `${user.filterGender ? user.filterGender : "Female"}`) {
                                if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                    // || distance > 0 ? distance : 0 <= user.filterDistance
                                    ) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                            }
                            else if (user.filterGender == 'Both') {
                                if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                    // || distance > 0 ? distance : 0 <= user.filterDistance
                                    ) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                                // users.push(documentSnapshot.data());
                            }
                        });
                        setUsers(users.slice(0, 2))
                        setModalDataUid(modalDataUid.slice(0, 2))
                    })
                // console.log('FemaleUsers: ', users);
            }
            else if (Package == 456) {
                // console.log('female filter', Package);
                await firestore()
                    .collection('Users')
                    // .where("userDetails.Gender", '==', "Female")
                    // .limit(3)
                    .onSnapshot(querySnapshot => {
                        // console.log('Total user: ', querySnapshot.size);
                        const users = [];
                        const modalDataUid = [];
                        querySnapshot.forEach((documentSnapshot) => {
                            const data = documentSnapshot.data().userDetails;
                            const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                            // if (data?.Location?.latitude && data?.Location?.longitude) {
                            //     distance = getPreciseDistance(
                            //         { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
                            //         { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
                            //     ) * 0.000621;
                            // }
                            // const distance = geolib.getPreciseDistance(user?.Location, data?.Location) * 0.000621
                            if (data.Gender == `${user.filterGender ? user.filterGender : "Female"}`) {
                                if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                    // || distance > 0 ? distance : 0 <= user.filterDistance
                                    ) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                    // console.log(documentSnapshot.data());
                                }
                            }
                            else if (user.filterGender == 'Both') {
                                if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                    // || distance > 0 ? distance : 0 <= user.filterDistance
                                    ) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                                // users.push(documentSnapshot.data());
                            }
                        });
                        setUsers(users.slice(0, 5))
                        setModalDataUid(modalDataUid.slice(0, 5))
                    })
            }
            // for premium package 
            else {
                await firestore()
                    .collection('Users')
                    // .where("userDetails.Gender", '==', user.filterGender ? user.filterGender : "Female")
                    // .limit(25)
                    .onSnapshot(querySnapshot => {
                        // console.log('Total user: ', querySnapshot.size);
                        const users = [];
                        const modalDataUid = [];
                        querySnapshot.forEach((documentSnapshot) => {
                            const data = documentSnapshot.data().userDetails;
                            const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                            // if (data?.Location?.latitude && data?.Location?.longitude) {
                            //     distance = getPreciseDistance(
                            //         { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
                            //         { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
                            //     ) * 0.000621;
                            // }
                            if (data.Gender == `${user.filterGender ? user.filterGender : "Female"}`) {
                                // console.log(distance); 
                                if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                    // || distance > 0 ? distance : 0 <= user.filterDistance
                                    ) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                            }
                            else if (user.filterGender == 'Both') {
                                if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                    // || distance > 0 ? distance : 0 <= user?.filterDistance
                                    ) {
                                    // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
                                    users.push(documentSnapshot.data());
                                    modalDataUid.push(documentSnapshot.id);
                                }
                                // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                                // users.push(documentSnapshot.data());
                            }
                        });
                        setUsers(users.slice(0, 25))
                        setModalDataUid(modalDataUid.slice(0, 25))
                    })
            }
        }
        else {
            try {
                await firestore()
                    .collection('Users')
                    // .where("userDetails.Gender", '==', "Female")
                    // .limit(1)
                    .onSnapshot(querySnapshot => {
                        // console.log('Total user: ', querySnapshot.size);
                        const users = [];
                        const modalDataUid = [];
                        querySnapshot.forEach((documentSnapshot) => {
                            const data = documentSnapshot.data().userDetails;
                            const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                            // if (data?.Location?.latitude && data?.Location?.longitude) {
                            //     distance = getPreciseDistance(
                            //         { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
                            //         { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
                            //     ) * 0.000621;
                            // }
                            // console.log(distance);
                            if (data.Gender == 'Female') {
                                // console.log('asdjk'); 
                                if (data.Gender == `${user.filterGender ? user.filterGender : "Female"}`) {
                                    if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                        // || distance > 0 ? distance : 0 <= user?.filterDistance
                                        ) {
                                        // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                        users.push(documentSnapshot.data());
                                        modalDataUid.push(documentSnapshot.id);
                                        // console.log('yetduh');
                                    }
                                    else if (!user.filterMinAge || !user.filterMaxAge || !user.filterDistance) {
                                        // console.log('User ID=======================2: ', documentSnapshot.id, documentSnapshot.data());
                                        users.push(documentSnapshot.data());
                                        modalDataUid.push(documentSnapshot.id);
                                        // console.log('etg');
                                    }
                                }
                                else if (user.filterGender == 'Both') {
                                    if (years >= user.filterMinAge || typeof years == typeof user.filterMinAge || typeof years == typeof user.filterMaxAge || years <= user.filterMaxAge 
                                        // || distance > 0 ? distance : 0 <= user?.filterDistance
                                        ) {
                                        // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
                                        users.push(documentSnapshot.data());
                                        modalDataUid.push(documentSnapshot.id);
                                    }
                                    else if (!user.filterMinAge || !user.filterMaxAge || !user.filterDistance) {
                                        users.push(documentSnapshot.data());
                                        modalDataUid.push(documentSnapshot.id);
                                    }
                                    // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
                                    // users.push(documentSnapshot.data());
                                }
                            }
                        });
                        setUsers(users.slice(0, 1))
                        setModalDataUid(modalDataUid.slice(0, 1))
                    })
                // console.log('FemaleUsers: ', users);
            } catch (e) {
                console.log(e);
            }
        };
    }

    // const CheckConnection = () => {
    //     NetInfo.addEventListener(state => {
    //         if (state.isConnected) {
    //             fetchusersMain();
    //             fetchUsersUid();
    //             locationPermission();
    //             getCurrentLocation();
    //             GetFcmToken();
    //             // user is online, do something here
    //         } else {
    //             // user is offline, show network error screen
    //             // for example:
    //             navigation.navigate('NetworkErrorScreen');
    //         }
    //     });
    // }

    useEffect(() => {
        // CheckConnection();
        fetchusersMain();
        fetchUsersUid();
        // if (user.Location) {
        //     console.log('location found');
        // }
        // else {
        //     // setActionTrigger('ACTION_1')
        //     // setModalVisible(true)
        // }
        // getCurrentPosition();
        locationPermission();

        getCurrentLocation();
        GetFcmToken();

        // console.log(userPackage);
    }, [userPackage])

    useEffect(() => {
        fetchChatuserMain();
        // console.log(ChatUserId);
    }, [ChatUserId]);

    const openSettingsModal = (cardIndex) => {
        const test = users[cardIndex]
        setModalData(users[cardIndex]);
        setModalVisible(!modalVisible);
        // console.log('here is current card index',cardIndex);
        // cardData = cards[cardIndex]
        // console.log('modal data', users[cardIndex]);

        const Address = Geocoder.from(test?.userDetails?.Location.latitude, test?.userDetails?.Location.longitude)
            .then(json => {
                var addressComponent = json.results[0].address_components[0].long_name;
                // console.log(addressComponent);
                // console.log(test);
                const updated = {
                    ...test,
                    Address: addressComponent,
                };
                console.log(updated);
                setModalData(updated);
            })
            .catch(error =>
                console.warn(error)
            );
    }

    const OpenForChating = (cardIndex) => {
        // console.log('Chating data', users[cardIndex]);
        const Data = users[cardIndex];
        const DataId = modalDataUid[cardIndex]
        // console.log( Data);
        SubmitChatUSer(Data, DataId)
        MatchUsers(Data, DataId)
        // SendToChatUSer(CurrentuserData, DataId);
        // navigation.navigate('Message')
    }

    const SubmitChatUSer = (Data, DataId) => {
        if (!Data == '') {
            // console.log('Submit data', DataId);
            // return;
            firestore()
                .collection('Users').doc(CurrentUser).update({
                    PrivateChat: firestore.FieldValue.arrayUnion({
                        ChatuserDetails: Data.userDetails
                    }),
                })
                .then(() => {
                    // console.log('You like', Data.userDetails.Name);
                    // navigation.navigate('MessagesScreen')
                    Notifictaions(
                        Docuser = DataId,
                        noticeStatus = 'Unread',
                        tag = 'likes you',
                        type = 'Swap',
                        RequestStatus = 'Unaccepted',
                        noticeID = CurrentUser,
                        NoticeName = user.Name,
                    )
                });
        } else {
            console.log('card user not found!!');
        }
    }

    const MatchUsers = (Data, DataId) => {
        if (!DataId == '') {
            try {
                firestore().collection('Users').doc(DataId).onSnapshot(docSnapshot => {
                    if (docSnapshot.data()?.PrivateChat) {
                        docSnapshot.data()?.PrivateChat.map(chats => {
                            if (chats.ChatuserDetails.uid == CurrentUser) {
                                // console.log('test');
                                Notifictaions(
                                    Docuser = CurrentUser,
                                    noticeStatus = 'Unread',
                                    tag = 'is your match founded',
                                    type = 'Swap',
                                    RequestStatus = 'Accepted',
                                    noticeID = DataId,
                                    NoticeName = Data.userDetails.Name,
                                )
                                Notifictaions(
                                    Docuser = DataId,
                                    noticeStatus = 'Unread',
                                    tag = 'is your match founded',
                                    type = 'Swap',
                                    RequestStatus = 'Accepted',
                                    noticeID = CurrentUser,
                                    NoticeName = user.Name,
                                )
                                // console.log('notices send both-hand');
                            } else {
                                console.log('no match found');
                            }
                        })
                    } else {
                        console.log('data not found');
                    }
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log('Match not found');
        }
    };


    const onSwiped = (type) => {
        console.log(`on swiped ${type}`)
    }

    const onSwipedAllCards = () => {
        setswipedAllCards(true)
    };


    const getCurrentPosition = async () => {
        // Geolocation.getCurrentPosition(info => console.log('hello',info));

        // await Geolocation.getCurrentPosition(
        //     (pos) => {
        //         console.log('location', pos.coords);
        //         firestore()
        //             .collection('Users').doc(CurrentUser).update({
        //                 'userDetails.Location': pos.coords,
        //             })
        //         // setPosition(JSON.stringify(pos));
        //     },
        //     (error) =>
        //         // console.log('GetCurrentPosition Error', JSON.stringify(error);
        //         Alert.alert('GetCurrentPosition Error', JSON.stringify(error)
        //         ),
        //     { enableHighAccuracy: true }
        // );


    };

    const GetFcmToken = () => {
        //get device token
        messaging()
            .hasPermission()
            .then(enabled => {
                if (enabled) {
                    messaging()
                        .getToken()
                        .then(fcmToken => {
                            if (fcmToken) {
                                // console.log(fcmToken);
                                firestore()
                                    .collection('token')
                                    .doc(CurrentUser)
                                    .set({
                                        token: fcmToken,
                                        create_date: new Date(),
                                    })
                                    .then(() => {
                                        console.log('token succssfully saved');
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                            } else {
                                console.log("user doesn't have a device token yet");
                            }
                        });
                } else {
                    console.log('Permission Denied');
                }
            });
    }



    const getCurrentLocation = () => {
        setTimeout(() => {
            Geolocation.getCurrentPosition(
                position => {
                    const cords = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        // heading: position.coords.heading,
                    };
                    firestore()
                        .collection('Users').doc(CurrentUser).update({
                            'userDetails.Location': cords,
                        })
                    // console.log('===>', cords);
                    // resolve(cords);
                },
                error => { console.log(error) }
            );
        }, 5000);
    }

    const locationPermission = () => {
        new Promise(async (resolve, reject) => {
            if (Platform.OS === 'ios') {
                try {
                    const permissionStatus = await Geolocation.requestAuthorization(
                        'whenInUse',
                    );
                    if (permissionStatus === 'granted') {
                        return resolve('granted');
                    }
                    reject('Permission not granted');
                } catch (error) {
                    return reject(error);
                }
            }
            return PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
                .then(granted => {
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        resolve('granted');
                    }
                    return reject('Location Permission denied');
                })
                .catch(error => {
                    console.log('Ask Location permission error: ', error);
                    return reject(error);
                });
        });
    }
    // const useSwiper = useRef(null).current;
    // const handleOnSwipedLeft = () => useSwiper.swipeLeft()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.black} />
            <HeaderTabOne
                onpress={() => navigation.openDrawer()}
                Lefticon={require('../../assets/menu3.png')}
                Righticon={require('../../assets/menu2.png')}
                logo={require('../../assets/splashlogo.png')}
            />
            {modalData ? (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <HeaderTabOne Lefticon={require('../../assets/menu3.png')} logo={require('../../assets/splashlogo.png')} />
                    <View style={{
                        marginHorizontal: 10,
                        alignItems: 'center'
                    }}>
                        <View style={{
                            // marginTop: 0, 
                            // paddingHorizontal: 20, 
                            // backgroundColor: COLORS.white 
                            width: '100%',
                            marginBottom: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            borderRadius: 25,
                            // paddingHorizontal: 10,
                            paddingBottom: 20,
                            marginTop: 10,
                            borderWidth: 5,
                            borderColor: COLORS.white,
                            marginBottom: 50
                        }}>
                            <ScrollView vertical showsVerticalScrollIndicator={false}>
                                <View style={{
                                    borderRadius: 20,
                                }}>
                                    <View style={{
                                        // paddingTop: 10,
                                        // marginTop:10
                                        borderRadius: 20,
                                    }}>
                                        <Image source={{ uri: modalData.userDetails.image1 }} resizeMode='cover'
                                            style={{
                                                height: 380,
                                                width: '100%',
                                                borderRadius: 20,
                                                // paddingHorizontal: 10
                                            }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setModalVisible(!modalVisible)}
                                            style={{
                                                position: 'absolute',
                                                margin: 20
                                            }}>
                                            <Image source={require('../../assets/arrowleft.png')} resizeMode='contain' style={{
                                                tintColor: COLORS.black,
                                                width: 25,
                                                height: 25,
                                            }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 5,
                                            paddingTop: 10
                                        }}>
                                            <Image source={require('../../assets/dot.png')} resizeMode='contain'
                                                style={{
                                                    width: 5,
                                                    height: 5,
                                                    marginRight: 5
                                                }} />
                                            <Text style={{
                                                fontSize: 20, fontWeight: 'bold',
                                                color: COLORS.black,
                                                marginRight: 5
                                            }}>{modalData.userDetails.Name}</Text>
                                            <Text style={{
                                                fontSize: 20,
                                                color: COLORS.black,
                                                marginRight: 5
                                            }}>25</Text>
                                            <Image source={require('../../assets/conform.png')} resizeMode='contain'
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                }} />
                                        </View>
                                    </View>


                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 5,
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                marginRight: 5
                                            }}>Model at Instagaram</Text>
                                            <Text style={{
                                                color: COLORS.black,
                                                marginRight: 5,
                                                backgroundColor: COLORS.main,
                                                padding: 3,
                                                borderRadius: 5
                                            }}>2.1 Miles Away</Text>
                                        </View>
                                    </View>

                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 50,
                                            justifyContent: 'space-between',
                                            marginTop: 10
                                        }}>
                                            <View style={{
                                                padding: 15,
                                                borderRadius: 30,
                                                backgroundColor: COLORS.white,
                                                elevation: 5

                                            }}>
                                                <TouchableOpacity onPress={() => { swiper.swipeLeft(), setModalVisible(!modalVisible) }}>
                                                    <Image source={require('../../assets/cancle.png')} resizeMode='contain'
                                                        style={{
                                                            width: 15,
                                                            height: 15
                                                        }} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{
                                                padding: 15,
                                                borderRadius: 40,
                                                backgroundColor: 'red'
                                            }}>
                                                <TouchableOpacity onPress={() => { swiper.swipeRight(), setModalVisible(!modalVisible) }}>

                                                    <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                                        style={{
                                                            width: 40,
                                                            height: 40
                                                        }} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{
                                                padding: 15,
                                                borderRadius: 30,
                                                backgroundColor: COLORS.white,
                                                elevation: 5
                                            }}>
                                                <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>

                                                    <Image source={require('../../assets/message.png')} resizeMode='contain'
                                                        style={{
                                                            width: 20,
                                                            height: 20
                                                        }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <View style={{
                                                backgroundColor: COLORS.main,
                                                padding: 8,
                                                borderRadius: 10,
                                            }}>
                                                <Image source={require('../../assets/modal/bio.png')} resizeMode='contain' style={{
                                                    width: 15,
                                                    height: 15,
                                                    tintColor: COLORS.white
                                                }} />
                                            </View>
                                            <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>Bio</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: width,
                                        }}>
                                            <View style={{ width: '85%' }}>
                                                <Text style={{ paddingVertical: 10, }}>
                                                    {modalData.userDetails.Bio ? modalData.userDetails.Bio : 'Bio not found'}
                                                </Text>
                                            </View>
                                            {/* <TouchableOpacity style={{ width: '25%' }}>
                      <Image source={require('../../assets/like2.png')} resizeMode='contain' />
                    </TouchableOpacity> */}
                                        </View>
                                    </View>

                                    <View>
                                        <View style={{
                                            paddingHorizontal: 20,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingBottom: 10,
                                            }}>
                                                <View style={{
                                                    backgroundColor: COLORS.main,
                                                    padding: 8,
                                                    borderRadius: 10,
                                                }}>
                                                    <Image source={require('../../assets/modal/address.png')} resizeMode='contain' style={{
                                                        width: 15,
                                                        height: 15,
                                                        tintColor: COLORS.white
                                                    }} />
                                                </View>
                                                <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                                                    {modalData.Address ? modalData.Address : 'Address not found'}
                                                </Text>
                                            </View>
                                            {/* <View>
                      <Image source={require('../../assets/hello.png')} resizeMode='contain' />
                    </View> */}
                                        </View>
                                        <View>
                                            <Image source={{ uri: modalData.userDetails.image1 }} resizeMode='cover' style={{
                                                width: '100%',
                                                height: 250,
                                                borderRadius: 20,
                                            }} />
                                            {/* <TouchableOpacity style={{
                      paddingHorizontal: 20,
                      alignItems: 'flex-end',
                      marginTop: -65,
                      flex: 1
                    }}>
                      <Image source={require('../../assets/like2.png')} resizeMode='contain' />
                    </TouchableOpacity> */}
                                        </View>
                                    </View>

                                    <View>
                                        <View style={{
                                            paddingHorizontal: 20,
                                            paddingVertical: 20,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <View style={{
                                                backgroundColor: COLORS.main,
                                                padding: 8,
                                                borderRadius: 10,
                                            }}>
                                                <Image source={require('../../assets/modal/info.png')} resizeMode='contain' style={{
                                                    width: 15,
                                                    height: 15,
                                                    tintColor: COLORS.white
                                                }} />
                                            </View>
                                            <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                                                {modalData.userDetails.Name}'s info
                                            </Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            marginHorizontal: 20,
                                            alignItems: 'center',
                                        }}>
                                            <TouchableOpacity style={{
                                                // width: '40%',
                                                paddingRight: 10,
                                                marginRight: 5,
                                                marginBottom: 10,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                // marginRight: 5,
                                            }}>
                                                <View>
                                                    <Image source={require('../../assets/modal/like2.png')} resizeMode='contain'
                                                        style={{
                                                            height: 40,
                                                            width: 40
                                                        }} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>Single</Text>
                                                </View>
                                            </TouchableOpacity>
                                            {modalData.userDetails.Education &&
                                                <TouchableOpacity style={{
                                                    paddingHorizontal: 10,
                                                    marginRight: 5,
                                                    paddingVertical: 10,
                                                    // height: 40,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    backgroundColor: COLORS.light,
                                                    borderRadius: 30,
                                                    marginBottom: 10,
                                                }}>
                                                    <View>
                                                        <Image source={require('../../assets/modal/info4.png')} resizeMode='contain'
                                                            style={{
                                                                height: 20,
                                                                width: 20,
                                                                marginRight: 5,
                                                            }} />
                                                    </View>
                                                    <View>
                                                        <Text style={{ fontSize: 12 }}>{modalData.userDetails.Education}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.Hieght &&
                                                <TouchableOpacity style={{
                                                    paddingHorizontal: 10,
                                                    marginRight: 5,
                                                    paddingVertical: 10,
                                                    // height: 40,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    backgroundColor: COLORS.light,
                                                    borderRadius: 30,
                                                    marginBottom: 10,
                                                }}>
                                                    <View>
                                                        <Image source={require('../../assets/modal/info3.png')} resizeMode='contain'
                                                            style={{
                                                                height: 20,
                                                                width: 20,
                                                                marginRight: 5,
                                                            }} />
                                                    </View>
                                                    <View>
                                                        <Text style={{ fontSize: 12 }}>Height, {modalData.userDetails.Hieght}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.Gender &&
                                                <TouchableOpacity style={{
                                                    paddingHorizontal: 10,
                                                    marginRight: 5,
                                                    paddingVertical: 10,
                                                    // height: 40,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    backgroundColor: COLORS.light,
                                                    borderRadius: 30,
                                                    marginBottom: 10,
                                                }}>
                                                    <View>
                                                        <Image source={require('../../assets/modal/info8.png')} resizeMode='contain'
                                                            style={{
                                                                height: 20,
                                                                width: 20,
                                                                marginRight: 5,
                                                            }} />
                                                    </View>
                                                    <View>
                                                        <Text style={{ fontSize: 12 }}>{modalData.userDetails.Gender}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 10,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View>
                                                    <Image source={require('../../assets/modal/info7.png')} resizeMode='contain'
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                            marginRight: 5,
                                                        }} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>English</Text>
                                                </View>
                                            </TouchableOpacity>
                                            {modalData.userDetails.Drink &&
                                                <TouchableOpacity style={{
                                                    paddingHorizontal: 10,
                                                    marginRight: 5,
                                                    paddingVertical: 10,
                                                    // height: 40,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    backgroundColor: COLORS.light,
                                                    borderRadius: 30,
                                                    marginBottom: 10,
                                                }}>
                                                    <View>
                                                        <Image source={require('../../assets/modal/info6.png')} resizeMode='contain'
                                                            style={{
                                                                height: 20,
                                                                width: 20,
                                                                marginRight: 5,
                                                            }} />
                                                    </View>
                                                    <View>
                                                        <Text style={{ fontSize: 12 }}>{modalData.userDetails.Drink}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.Kids &&
                                                <TouchableOpacity style={{
                                                    paddingHorizontal: 10,
                                                    marginRight: 5,
                                                    paddingVertical: 10,
                                                    // height: 40,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    backgroundColor: COLORS.light,
                                                    borderRadius: 30,
                                                    marginBottom: 10,
                                                }}>
                                                    <View>
                                                        <Image source={require('../../assets/modal/info9.png')} resizeMode='contain'
                                                            style={{
                                                                height: 20,
                                                                width: 20,
                                                                marginRight: 5,
                                                            }} />
                                                    </View>
                                                    <View>
                                                        <Text style={{ fontSize: 12 }}>{modalData.userDetails.Kids}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.Nature &&
                                                <TouchableOpacity style={{
                                                    paddingHorizontal: 10,
                                                    marginRight: 5,
                                                    paddingVertical: 10,
                                                    // height: 40,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    backgroundColor: COLORS.light,
                                                    borderRadius: 30,
                                                    marginBottom: 10,
                                                }}>
                                                    <View>
                                                        <Image source={require('../../assets/modal/info5.png')} resizeMode='contain'
                                                            style={{
                                                                height: 20,
                                                                width: 20,
                                                                marginRight: 5,
                                                            }} />
                                                    </View>
                                                    <View>
                                                        <Text style={{ fontSize: 12 }}>{modalData.userDetails.Nature}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.Smoke &&
                                                <TouchableOpacity style={{
                                                    paddingHorizontal: 10,
                                                    marginRight: 5,
                                                    paddingVertical: 10,
                                                    // height: 40,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    backgroundColor: COLORS.light,
                                                    borderRadius: 30,
                                                    marginBottom: 10,
                                                }}>
                                                    <View>
                                                        <Image source={require('../../assets/modal/info2.png')} resizeMode='contain'
                                                            style={{
                                                                height: 20,
                                                                width: 20,
                                                                marginRight: 5,
                                                            }} />
                                                    </View>
                                                    <View>
                                                        <Text style={{ fontSize: 12 }}>{modalData.userDetails.Smoke}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>

                                    <View>
                                        <View style={{
                                            paddingHorizontal: 20,
                                            paddingVertical: 20,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <View style={{
                                                    backgroundColor: COLORS.main,
                                                    padding: 8,
                                                    borderRadius: 10,
                                                }}>
                                                    <Image source={require('../../assets/modal/gallery.png')} resizeMode='contain' style={{
                                                        tintColor: COLORS.white,
                                                        width: 15,
                                                        height: 15,
                                                    }} />
                                                </View>
                                                <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                                                    Gallery
                                                </Text>
                                            </View>
                                        </View>

                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                            <View style={{
                                                flexDirection: 'row',
                                                paddingHorizontal: 20,
                                            }}>
                                                <Image source={{ uri: modalData.userDetails.image1 }} resizeMode='cover' style={{
                                                    width: 250,
                                                    height: 150,
                                                    borderRadius: 20,
                                                    marginRight: 10,
                                                }} />
                                                <Image source={{ uri: modalData.userDetails.image1 }} resizeMode='cover' style={{
                                                    width: 250,
                                                    height: 150,
                                                    borderRadius: 20,
                                                    marginRight: 10,
                                                }} />
                                            </View>
                                        </ScrollView>
                                    </View>

                                    {modalData?.userDetails?.Interest &&

                                        <View>
                                            <View style={{
                                                paddingHorizontal: 20,
                                                paddingVertical: 20,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                    <Text style={{ paddingHorizontal: 10, fontSize: 18, fontWeight: 'bold' }}>
                                                        I’m Interested in..
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                marginHorizontal: 20,
                                                alignItems: 'center',
                                            }}>
                                                {modalData?.userDetails?.Interest.map((item, index) => (
                                                    <TouchableOpacity key={index} style={{
                                                        paddingHorizontal: 10,
                                                        marginRight: 5,
                                                        paddingVertical: 10,
                                                        // height: 40,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        backgroundColor: COLORS.light,
                                                        borderRadius: 30,
                                                        marginBottom: 10,
                                                    }}>
                                                        <View>
                                                            <Text style={{ fontSize: 12, color: COLORS.black, fontWeight: 'bold' }}>#{item}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>
                                    }

                                    <View style={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 20,
                                    }}>
                                        <View>
                                            <Text style={{ fontWeight: 'bold' }}>
                                                Verification
                                            </Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginVertical: 10,
                                            marginBottom: 80
                                        }}>
                                            <View style={{
                                                padding: 8,
                                                backgroundColor: COLORS.main,
                                                borderRadius: 30,
                                            }}>
                                                <Image source={require('../../assets/modal/tick.png')} resizeMode='contain' style={{
                                                    width: 10,
                                                    height: 10,
                                                    tintColor: COLORS.white
                                                }} />
                                            </View>
                                            <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                                                {modalData.userDetails.Name}’s photo-verified
                                            </Text>
                                        </View>
                                    </View>

                                </View>
                            </ScrollView>

                        </View>
                    </View>
                </Modal>
            ) :
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    {actionTrigger == 'ACTION_1' ?
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            // alignItems: 'center',
                            backgroundColor: COLORS.gray,
                            opacity: 0.9
                        }}>
                            <View style={{
                                margin: 20,
                                backgroundColor: 'white',
                                opacity: 1,
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
                                paddingHorizontal: 40
                            }}>
                                <Text style={{
                                    marginBottom: 10,
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    textAlign: 'center',
                                }}>Allow ‘Dates & Honey’ to use
                                    your location</Text>
                                <Text style={{
                                    marginBottom: 10,
                                    textAlign: 'center',
                                    fontSize: 12,
                                }}>
                                    We will use your location to find people
                                    nearby you.
                                </Text>
                                <Image source={require('../../assets/currentloc.png')} resizeMode='cover' />
                                <TouchableOpacity
                                    onPress={() => { setModalVisible(false), setActionTrigger(null) }}
                                    style={{
                                        borderBottomColor: COLORS.gray2,
                                        borderBottomWidth: 1,
                                        width: width / 1.2,
                                        marginHorizontal: 20,
                                        paddingVertical: 10,
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{
                                        color: '#2A3182'
                                    }}>
                                        Allow Once
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { setModalVisible(false), setActionTrigger(null) }}
                                    style={{
                                        // borderColor: COLORS.black,
                                        borderBottomColor: COLORS.gray2,
                                        borderBottomWidth: 1,
                                        width: width / 1.2,
                                        marginHorizontal: 20,
                                        paddingVertical: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // backgroundColor: COLORS.main
                                    }}>
                                    <Text style={{
                                        color: '#2A3182'
                                    }}>
                                        Allow while using the app
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        : null}
                </Modal>
            }

            <View style={styles.container}>

                <View style={{
                    height: height / 1.4,
                    backgroundColor: COLORS.white,
                    // flex:3,
                    // justifyContent:'flex-end',
                    // marginTop: -59,
                }}>
                    <View>
                        {users ? (
                            <Swiper
                                ref={swiper => setSwiper(swiper)}
                                onSwiped={() => onSwiped('general')}
                                onSwipedLeft={() => onSwiped('left')}
                                // onSwipedRight={() => onSwiped('right')}
                                onSwipedRight={(cardIndex) => {
                                    OpenForChating(cardIndex);
                                }}
                                disableTopSwipe={true}
                                disableBottomSwipe={true}
                                // onSwipedTop={() => onSwiped('top')}
                                // onSwipedBottom={() => onSwiped('bottom')}
                                cards={users}
                                renderCard={(cards) => <RenderCard data={cards} navigation={navigation} />}
                                cardIndex={0}
                                // onTapCard={(cards) => openSettingsModal(cards) }
                                onTapCard={(cardIndex) => {
                                    openSettingsModal(cardIndex);
                                }}
                                infinite
                                showSecondCard={false}
                                // cardVerticalMargin={30}
                                onSwipedAll={onSwipedAllCards}
                                stackSize={3}
                                stackSeparation={25}
                                overlayLabels={{
                                    bottom: {
                                        title: 'BLEAH',
                                        style: {
                                            label: {
                                                backgroundColor: 'black',
                                                borderColor: 'black',
                                                color: 'white',
                                                borderWidth: 1
                                            },
                                            wrapper: {
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }
                                        }
                                    },
                                    left: {
                                        title: 'NOPE',
                                        style: {
                                            label: {
                                                backgroundColor: 'black',
                                                borderColor: 'black',
                                                color: 'white',
                                                borderWidth: 1,
                                            },
                                            wrapper: {
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                                justifyContent: 'flex-start',
                                                marginTop: 30,
                                                marginLeft: -30
                                            }
                                        }
                                    },
                                    right: {
                                        title: 'LIKE',
                                        style: {
                                            label: {
                                                backgroundColor: 'red',
                                                borderColor: 'red',
                                                color: 'white',
                                                borderWidth: 1,
                                            },
                                            wrapper: {
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                marginTop: 30,
                                                marginLeft: 30,
                                            }
                                        }
                                    },
                                    top: {
                                        title: 'SUPER LIKE',
                                        style: {
                                            label: {
                                                backgroundColor: 'black',
                                                borderColor: 'black',
                                                color: 'white',
                                                borderWidth: 1,
                                            },
                                            wrapper: {
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }
                                        }
                                    }
                                }}
                                animateOverlayLabelsOpacity
                                animateCardOpacity
                                swipeBackCard
                            >
                            </Swiper>

                        ) : (
                            <View style={{
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: height,
                            }}>
                                <ActivityIndicator size="small" color={COLORS.main} animating={loading} />
                            </View>
                        )}
                    </View>
                </View>

                {/* <View style={{
                    marginTop: 5,
                    height: '57%', backgroundColor: COLORS.white,
                    elevation: 5,
                    borderRadius: 25,
                    paddingHorizontal: 5
                }}>
                    <View style={{
                        paddingTop: 5,
                    }}>
                        <Image source={require('../../assets/profilepic2.png')} resizeMode='stretch'
                            style={{
                                height: 380,
                                width: 350,
                                paddingHorizontal: 10
                            }}
                        />
                    </View>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 5,
                            paddingTop: 10
                        }}>
                            <Image source={require('../../assets/dot.png')} resizeMode='contain'
                                style={{
                                    width: 5,
                                    height: 5,
                                    marginRight: 5
                                }} />
                            <Text style={{
                                fontSize: 20, fontWeight: 'bold',
                                color: COLORS.black,
                                marginRight: 5
                            }}>Sofia Toly,</Text>
                            <Text style={{
                                fontSize: 20,
                                color: COLORS.black,
                                marginRight: 5
                            }}>25</Text>
                            <Image source={require('../../assets/conform.png')} resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                }} />
                        </View>
                    </View>


                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 5,
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                marginRight: 5
                            }}>Model at Instagaram</Text>
                            <Text style={{
                                color: COLORS.black,
                                marginRight: 5,
                                backgroundColor: COLORS.main,
                                padding: 3,
                                borderRadius: 5
                            }}>2.1 Miles Away</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 50,
                            justifyContent: 'space-between',
                            marginTop: 10
                        }}>
                            <View style={{
                                padding: 20,
                                borderRadius: 30,
                                backgroundColor: COLORS.white,
                                elevation: 5

                            }}>
                                <TouchableOpacity>

                                    <Image source={require('../../assets/cancle.png')} resizeMode='contain'
                                        style={{
                                            width: 15,
                                            height: 15
                                        }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                padding: 15,
                                borderRadius: 40,
                                backgroundColor: COLORS.pink
                            }}>
                                <TouchableOpacity onPress={() => navigation.navigate('CongratsMatchScreen')}>

                                    <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                        style={{
                                            width: 30,
                                            height: 30
                                        }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                padding: 20,
                                borderRadius: 30,
                                backgroundColor: COLORS.white,
                                elevation: 5
                            }}>
                                <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>

                                    <Image source={require('../../assets/message.png')} resizeMode='contain'
                                        style={{
                                            width: 20,
                                            height: 20
                                        }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ height: '45%' }}>

                </View> */}

                <View style={{
                    // height: '35%',
                    height: height / 0.6,
                    // backgroundColor:COLORS.main,
                    // position: 'absolute',
                    marginTop: -25,
                    width: '100%',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 70,
                        justifyContent: 'space-between',
                        // marginTop: -20
                    }}>
                        <View style={{
                            padding: 15,
                            borderRadius: 30,
                            backgroundColor: COLORS.white,
                            elevation: 5
                        }}>
                            {/* onLeft={swiper.swipeLeft()} onRight={swiper.swipeRight()} */}
                            <TouchableOpacity onPress={() => swiper.swipeLeft()}>
                                <Image source={require('../../assets/cancle.png')} resizeMode='contain'
                                    style={{
                                        width: 15,
                                        height: 15
                                    }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            padding: 15,
                            borderRadius: 40,
                            backgroundColor: 'red'
                        }}>
                            <TouchableOpacity onPress={() =>
                                swiper.swipeRight()
                                // navigation.navigate('CongratsMatchScreen')
                            }
                            >
                                <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                    style={{
                                        width: 40,
                                        height: 40
                                    }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            padding: 15,
                            borderRadius: 30,
                            backgroundColor: COLORS.white,
                            elevation: 5
                        }}>
                            <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>

                                <Image source={require('../../assets/message.png')} resizeMode='contain'
                                    style={{
                                        width: 20,
                                        height: 20
                                    }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* <TouchableOpacity onPress={() => { }}>
                    <Text>Left</Text>
                </TouchableOpacity> */}



            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        // justifyContent:'center'
        height: '100%',
        width: width,
        // flex:1,
        backgroundColor: COLORS.white,
        // alignContent: 'center',
        // justifyContent: 'center',
    },
})