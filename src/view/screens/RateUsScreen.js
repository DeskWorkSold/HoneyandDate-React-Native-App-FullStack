import { Image, StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const RateUsScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <View>
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
                        }}>Rate Us</Text>
                    </View>
                    <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    paddingBottom: 100,
                    backgroundColor: COLORS.white
                }}>
                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 17,
                                fontWeight: 'bold'
                            }}>
                                Welcome to Honey and Dates Rate Us!
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Our team is dedicated to providing you with the best possible service. How can we assist you today?"
                            </Text>
                        </View>
                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 17,
                                fontWeight: 'bold'
                            }}>
                                Ordering assistance:
                            </Text>
                        </View>
                        <View>
                            <Text>
                                If you need help placing an order, please let us know. We can help you select the right products and ensure a smooth checkout process.
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 17,
                                fontWeight: 'bold'
                            }}>
                                Product questions:
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Do you have any questions about our Honey and Dates products? Our customer support team is here to help. We can provide information on ingredients, nutritional values, and more.
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 17,
                                fontWeight: 'bold'
                            }}>
                                Returns and refunds:
                            </Text>
                        </View>
                        <View>
                            <Text>
                                We want you to be completely satisfied with your Honey and Dates purchase. If for any reason you are not happy with your order, please let us know. We can assist you with the return process and ensure a prompt refund.
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 17,
                                fontWeight: 'bold'
                            }}>
                                Feedback and suggestions:
                            </Text>
                        </View>
                        <View>
                            <Text>
                                We value your feedback and suggestions. If you have any ideas on how we can improve our products or service, please let us know. We are always looking for ways to better serve our customers.
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 17,
                                fontWeight: 'bold'
                            }}>
                                Technical assistance:
                            </Text>
                        </View>
                        <View>
                            <Text>
                                If you are experiencing any technical issues with our website or online store, please contact our customer support team. We can assist you with troubleshooting and resolving any issues.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RateUsScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: '100%',
    },
})