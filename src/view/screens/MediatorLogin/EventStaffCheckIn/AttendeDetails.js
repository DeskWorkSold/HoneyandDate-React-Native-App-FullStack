import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, Modal, ToastAndroid } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import COLORS from '../../../../consts/Colors';
import { PieChart, ProgressChart } from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomeButton from '../../../components/CustomeButton';
import Twitter from '../../../../assets/Twitter.svg';
import Facebook from '../../../../assets/Facebook.svg';
import WhatsApp from '../../../../assets/WhatsApp.svg';
import Reddit from '../../../../assets/Reddit.svg';
import Linkedin from '../../../../assets/Linkedin.svg';
import TikTok from '../../../../assets/TikTok.svg';
import CopyLink from '../../../../assets/copy.svg';
import Edite from '../../../../assets/edit.svg'
import Send from '../../../../assets/send.svg'
import SVGImg1 from '../../../../assets/arrowleft.svg';
import SVGImg2 from '../../../../assets/filtermenu.svg';
import RightArrow from '../../../../assets/rightArrow.svg';

import { useState } from 'react';
import { RadioButton, TextInput } from 'react-native-paper';
import YourClinets from '../../../components/YourClinets';
import ManageStaffCard from '../../../components/ManageStaffCard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import Loader from '../../../components/Loader';
import SvgImage from '../../../../assets/arrowleft.svg'
const { width, height } = Dimensions.get("window");

const data = [
    {
        id: 1,
        name: 'For Dating Users',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 2,
        name: 'For Staff',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 3,
        name: 'For Concierges',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 4,
        name: 'For Events',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 5,
        name: 'For Front Door POS',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 6,
        name: 'For Profile Optimizer',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 7,
        name: 'For Influencers',
        screenName: 'SubmitTermAndCondition',
    }, {
        id: 8,
        name: 'For Social Media Manager',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 9,
        name: 'For Event Coordinator',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 10,
        name: 'For In house talent agency',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 11,
        name: 'Content Producer',
        screenName: 'SubmitTermAndCondition',
    }
]

const AttendeDetails = ({ navigation, route }) => {
    const { data } = route.params
    const [emailAddress, setEmailAddress] = useState(null);
    const [customeCode, setCustomeCode] = useState(null);
    const [modal, setModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [UserDetails, setUserDetails] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectUser, setSelectUser] = useState(null);
    const [AdvFilter, setAdvFilter] = useState(false);
    const CurrentUser = auth().currentUser.uid;
    // const [data, setData] = useState(null);
    const mediator = useSelector(selectMediatorUser);
    const years = new Date().getFullYear() - new Date(data?.Dates).getFullYear();
    // console.log(mediator.AccessGiven);


    const onGoBack = () => {
        navigation.goBack()
    }
    

    return (
        <View style={{
            // paddingHorizontal:20
            flex: 1,
            backgroundColor: COLORS.white,
        }}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 20,
                flexDirection: 'row',
                paddingHorizontal: 20,
            }}>
                <TouchableOpacity onPress={() => onGoBack()} style={{
                    flex: 1
                }}>
                    <SvgImage width={20} height={20} />
                </TouchableOpacity>
                <View style={{
                    flex: 2,
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 20, color: COLORS.black, fontWeight: 'bold'
                    }}> Attendee Details</Text>
                </View>
                <View style={{
                    flex: 1,
                }}>
                </View>
            </View>

            <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View style={{
                    marginBottom: 200,
                    backgroundColor: COLORS.white,
                }}>
                    <View style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        width: width / 1.1,
                        backgroundColor: COLORS.white,
                        elevation: 10,
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        alignSelf: 'center',
                        // justifyContent:'center'
                    }}>
                        <View>
                            <View style={{
                                borderWidth: 3,
                                borderColor: COLORS.main,
                                borderRadius: 100
                            }}>
                                <Image source={{ uri: data?.image1 }} resizeMode='cover' style={{
                                    borderRadius: 80,
                                    width: 80,
                                    height: 80
                                }} />
                            </View>
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            paddingLeft: 20
                        }}>
                            <View style={{
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: COLORS.black
                                }}>
                                    {data?.Name &&
                                        data?.Name?.charAt(0).toUpperCase() + data?.Name.slice(1)
                                    }
                                </Text>
                            </View>
                            <View style={{
                                alignSelf: 'flex-start',
                                // backgroundColor: COLORS.light,
                                borderRadius: 5,
                                // marginTop: 5,
                            }}>
                                <Text style={{ color: COLORS.black, fontSize: 13 }}>{data?.email}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        marginTop: 15,
                        // flexDirection: 'row',
                        width: width / 1.1,
                        backgroundColor: COLORS.white,
                        elevation: 10,
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        alignSelf: 'center',
                        // justifyContent:'center'
                    }}>
                        <View style={{
                            marginBottom: 5,
                        }}>
                            <Text style={{
                                color: COLORS.gray
                            }}>Order #</Text>
                        </View>
                        <View>
                            <Text style={{
                                color: COLORS.black,
                                fontWeight: 'bold'
                            }}>31341257</Text>
                        </View>
                    </View>
                    <View style={{
                        marginTop: 15,
                        // flexDirection: 'row',
                        width: width / 1.1,
                        backgroundColor: COLORS.white,
                        elevation: 10,
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        alignSelf: 'center',
                        // justifyContent:'center'
                    }}>
                        <View style={{
                            marginBottom: 5,
                        }}>
                            <Text style={{
                                color: COLORS.gray
                            }}>Ticket Type</Text>
                        </View>
                        <View>
                            <Text style={{
                                color: COLORS.black,
                                fontWeight: 'bold'
                            }}>Early Bird</Text>
                        </View>
                    </View>
                    <View style={{
                        marginTop: 15,
                        // flexDirection: 'row',
                        width: width / 1.1,
                        backgroundColor: COLORS.white,
                        elevation: 10,
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        alignSelf: 'center',
                        // justifyContent:'center'
                    }}>
                        <View style={{
                            marginBottom: 5,
                        }}>
                            <Text style={{
                                color: COLORS.gray
                            }}>Delivery Type</Text>
                        </View>
                        <View>
                            <Text style={{
                                color: COLORS.black,
                                fontWeight: 'bold',
                            }}>Teticket: fulfilled</Text>
                        </View>
                    </View>

                    <View style={{
                        marginTop: 15,
                        // flexDirection: 'row',
                        width: width / 1.1,
                        backgroundColor: COLORS.white,
                        elevation: 10,
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        alignSelf: 'center',
                        // justifyContent:'center'
                    }}>
                        <View style={{
                            marginBottom: 5,
                        }}>
                            <Text style={{
                                color: COLORS.gray
                            }}>Barcode</Text>
                        </View>
                        <View>
                            <Text style={{
                                color: COLORS.black,
                                fontWeight: 'bold',
                            }}>31341257283134125728</Text>
                        </View>
                    </View>

                    <View style={{
                        marginTop: 15,
                        // flexDirection: 'row',
                        width: width / 1.1,
                        backgroundColor: COLORS.white,
                        elevation: 10,
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        alignSelf: 'center',
                        // justifyContent:'center'
                    }}>
                        <View style={{
                            marginBottom: 5,
                        }}>
                            <Text style={{
                                color: COLORS.bluedark,
                                borderBottomWidth: 1,
                                borderBottomColor: COLORS.bluedark,
                                alignItems: "flex-start",
                                alignSelf: 'flex-start'
                            }}>Activity Log</Text>
                        </View>
                    </View>

                    <View style={{
                        marginTop: 35,
                        backgroundColor: COLORS.light,
                        paddingVertical: 15
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: COLORS.black,
                            // fontSize:12,
                        }}>Notes</Text>
                    </View>
                    <View style={{
                        // marginTop: 15,
                        backgroundColor: COLORS.white,
                        paddingVertical: 15
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            alignSelf: 'center',
                            color: COLORS.bluedark,
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.bluedark,
                        }}>Add attendee Notes</Text>
                    </View>
                    <View style={{
                        // marginTop: 15,
                        backgroundColor: COLORS.light,
                        paddingVertical: 15
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: COLORS.black,
                            // fontSize:12,
                        }}>More Details</Text>
                    </View>

                    <View style={{
                        paddingVertical: 10,
                        marginTop: 15,
                        marginHorizontal: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.gray2
                    }}>
                        <Text style={{
                            color: COLORS.black,
                            // fontSize:16,
                            paddingVertical: 5,
                            fontWeight: 'bold'
                        }}>Cell Phone</Text>
                        <Text style={{
                            fontSize: 12,
                        }}>{data?.Phonenumber}</Text>
                    </View>

                    <View style={{
                        paddingVertical: 10,
                        // marginTop:15,
                        marginHorizontal: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.gray2
                    }}>
                        <Text style={{
                            color: COLORS.black,
                            // fontSize:16,
                            paddingVertical: 5,
                            fontWeight: 'bold'
                        }}>Age</Text>
                        <Text style={{
                            fontSize: 12,
                        }}>{years}</Text>
                    </View>

                    <View style={{
                        alignSelf: 'center',
                        marginTop: 50,
                    }}>
                        <CustomeButton title={'Check In'} width={width / 1.1} />
                    </View>




                </View>
            </ScrollView>
            <Loader modal={uploading} uploading={uploading} />
        </View>
    )
}

export default AttendeDetails


const styles = StyleSheet.create({
    gauge: {
        position: 'absolute',
        width: 100,
        height: 160,
        // top:'60%',
        // backgroundColor:COLORS.light,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: 'red',
        fontSize: 12,
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 45,
        width: width / 1.2,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 5
    },
})