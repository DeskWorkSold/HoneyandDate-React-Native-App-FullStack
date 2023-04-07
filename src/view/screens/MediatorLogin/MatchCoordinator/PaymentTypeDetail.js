import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import CustomeButton from '../../../components/CustomeButton';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const btns = [
    {
        id: 1,
        name: 'Recommended',
        price: '$18',
        tag: 'Per month',
        detail: 'When entering $18 you will become featured as Included Concierge and will be featured if you enter more clients, they will have to pay the whole amount addition to their subscription to the app.'
    },
    {
        id: 2,
        name: 'Enter Monthly Fee',
        price: '',
        tag: '',
        detail: ''
    }
]

const PaymentTypeDetail = ({ navigation, route }) => {
    const { title } = route.params
    const [btnindex, setBtnindex] = useState(null);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <View style={{
                    height: height / 1.5,
                }}>
                    <View style={{
                        alignItems: 'center',
                        // backgroundColor:COLORS.gray,
                        height: height / 4,
                        justifyContent: 'flex-end'
                    }}>
                        <Image source={require('../../../../assets/paymenttype.png')} resizeMode='contain' style={
                            {
                                width: width / 1.4
                            }
                        } />
                    </View>
                    <View style={{
                        alignItems: 'center',
                        paddingVertical: 20,
                        paddingHorizontal: 60,
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: COLORS.black
                        }}>Enter your monthly rate</Text>
                    </View>
                    {btns.map((item, index) => (
                        <View key={index} style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => setBtnindex(index)}
                                    style={[styles.NumberInput, { borderWidth: 1, borderColor: btnindex == index ? COLORS.main : COLORS.transparent }]}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <View>
                                            <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 14 }}>{item.name}</Text>
                                        </View>
                                        <View>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                color: COLORS.black,
                                                fontSize: 16,
                                                paddingHorizontal: 3,
                                            }}>{item.price}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ textAlign: 'center', fontSize: 14 }}>{item.tag}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        {item.detail ?
                                            <Text style={{
                                                fontSize: 10,
                                                textAlign: 'center',
                                            }}>
                                                When entering $18 you will become featured as Included Concierge and will be featured if you enter more clients, they will have to pay the whole amount addition to their subscription to the app.
                                            </Text>
                                            :
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingVertical: 5,
                                                backgroundColor: COLORS.light
                                            }}>
                                                <View>
                                                    <Text>test</Text>
                                                </View>
                                                <View>
                                                    <Text>test</Text>
                                                </View>
                                                <View>
                                                    <Text>test</Text>
                                                </View>
                                            </View>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}


                </View>
                <View style={{
                    height: height / 0.5,
                    paddingHorizontal: 20,
                    alignSelf: 'center',
                    paddingVertical: 20,
                }}>
                    <CustomeButton title={'Done'} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PaymentTypeDetail

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        height: height / 1.5,
        // backgroundColor:COLORS.gray
    },
    NumberInput: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        // height: 45,
        paddingVertical: 19,
        width: width / 1.2,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4
    },
})