import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import COLORS from '../../../../consts/Colors';
import { PieChart, ProgressChart } from 'react-native-chart-kit';
import Pie from 'react-native-pie';
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
import SVGImg2 from '../../../../assets/diamond.svg';
import Gold from '../../../../assets/gold.svg';

import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import YourClinets from '../../../components/YourClinets';

const { width, height } = Dimensions.get("window");

const data = [
    {
        id: 1,
        name: 'Jan',
        img: require('../../../../assets/profilepic.png'),
        yourEarning: 380,
        ClientEarning: 15,
        type: 'Diamond'
    },
    {
        id: 2,
        name: 'Roy',
        img: require('../../../../assets/profilepic.png'),
        yourEarning: 380,
        ClientEarning: 15,
        type: 'Diamond'
    },
    {
        id: 3,
        name: 'Mendela',
        img: require('../../../../assets/profilepic.png'),
        yourEarning: 380,
        ClientEarning: 390,
        type: 'Gold'
    },
    {
        id: 4,
        name: 'Sam',
        img: require('../../../../assets/profilepic.png'),
        yourEarning: 380,
        ClientEarning: 390,
        type: 'Gold'
    },
    {
        id: 5,
        name: 'Arun',
        img: require('../../../../assets/profilepic.png'),
        yourEarning: 380,
        ClientEarning: 390,
        type: 'Gold'
    }
]

const YourClients = ({ navigation }) => {
    const [emailAddress, setEmailAddress] = useState(null);
    const [customeCode, setCustomeCode] = useState(null);

    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.light,
            // paddingHorizontal:20
            marginBottom: 30,
        }}>
            <ScrollView>
                <View style={{
                    backgroundColor: COLORS.white
                }}>
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                flex: 1,
                            }}>
                            <SVGImg1 width={20} height={20} />
                        </TouchableOpacity>
                        <View style={{
                            flex: 2,
                        }}>
                            <Text style={{ textAlign: 'center', color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>Your Clients</Text>
                        </View>
                        <View style={{
                            flex: 1,
                        }}>
                        </View>
                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 10,
                        paddingBottom: 20,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: COLORS.black,
                            fontSize: 14,
                            fontWeight: 'bold',
                            paddingRight: 5,
                        }}>Diamond/Diamond+</Text>
                        <SVGImg2 width={20} height={20} />
                    </View>
                </View>

                {data.map((item, index) => (
                    <YourClinets index={index} item={item} />
                ))}


                <View style={{
                    marginTop: 5,
                    backgroundColor: COLORS.white,
                }}>
                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 10,
                        paddingBottom: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent:'center'
                    }}>
                        <Text style={{
                            color: COLORS.black,
                            fontSize: 14,
                            fontWeight: 'bold',
                            paddingRight: 5
                        }}>Gold</Text>
                        <Gold width={20} height={20} />
                    </View>
                </View>
                {data.map((item, index) => (
                    <YourClinets index={index} item={item} />
                ))}



            </ScrollView>
        </View>
    )
}

export default YourClients


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
})