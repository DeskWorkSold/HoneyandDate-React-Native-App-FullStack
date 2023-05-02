import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SVGimage1 from '../../assets/influencermain.svg';
import SVGimage2 from '../../assets/influencerfeed.svg';
import SVGimage3 from '../../assets/manage.svg';
import SVGimage4 from '../../assets/profile.svg';
import HomeScreen from '../screens/MediatorLogin/Influencers/HomeScreen';
import ProfileScreen from '../screens/MediatorLogin/Influencers/ProfileScreen';
import EventScreen from '../screens/MediatorLogin/Influencers/EventScreen';
import AccountScreen from '../screens/MediatorLogin/Influencers/AccountScreen';
import CustomeEfilatedCode from '../screens/MediatorLogin/Influencers/CustomeEfilatedCode';
import YourClients from '../screens/MediatorLogin/Influencers/YourClients';
import AddSocialMediaAccount from '../screens/MediatorLogin/Influencers/AddSocialMediaAccount';


const Tab = createBottomTabNavigator();


const HomeStack = ({ navigation }) => (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBar: false,
        tabBarStyle: {
            paddingHorizontal: 20,
            paddingTop: 0,
            backgroundColor: COLORS.white,
            borderTopWidth: 0,
            elevation: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
        },
    }}>
        <Tab.Screen name='HomeScreen' component={HomeScreen} />
        <Tab.Screen name='CustomeEfilatedCode' component={CustomeEfilatedCode} />
        <Tab.Screen name='YourClients' component={YourClients} />
    </Tab.Navigator>
)
const EventStack = ({ navigation }) => (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBar: false,
        tabBarStyle: {
            paddingHorizontal: 20,
            paddingTop: 0,
            backgroundColor: COLORS.white,
            borderTopWidth: 0,
            elevation: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
        },
    }}>
        <Tab.Screen name="EventScreen" component={EventScreen} />
        {/* <Tab.Screen name="ArticalDetailScreen" component={ArticalDetailScreen} /> */}
    </Tab.Navigator>
)
const AccountStack = ({ navigation }) => (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBar: false,
        tabBarStyle: {
            paddingHorizontal: 20,
            paddingTop: 0,
            backgroundColor: COLORS.white,
            borderTopWidth: 0,
            elevation: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
        },
    }}>
        <Tab.Screen name="AccountScreen" component={AccountScreen} />
    </Tab.Navigator>
)
const ProfileStack = ({ navigation }) => (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBar: false,
        tabBarStyle: {
            paddingHorizontal: 20,
            paddingTop: 0,
            backgroundColor: COLORS.white,
            borderTopWidth: 0,
            elevation: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
        },
    }}>
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
        <Tab.Screen name="AddSocialMediaAccount" component={AddSocialMediaAccount} />
        {/* <Tab.Screen name="PaymentTypeDetail" component={PaymentTypeDetail} />
        <Tab.Screen name="TermsAndCondition" component={TermsAndCondition} />
        <Tab.Screen name="ReligionsWorkWith" component={ReligionsWorkWith} /> */}
    </Tab.Navigator>
)

const MediatorInfluencersBT = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    height: 70,
                    paddingHorizontal: 20,
                    paddingTop: 0,
                    backgroundColor: COLORS.white,
                    position: 'absolute',
                    borderTopWidth: 0,
                    elevation: 20,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                },
            }}>
            <Tab.Screen name="HomeStack" component={HomeStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {focused == true ? (

                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.mainlight,
                                    padding: 5,
                                    borderRadius: 5
                                }}>
                                    {/* <SVGimage1 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/home.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12 , color:COLORS.black }}>Home</Text>
                                </View>
                            ) : (
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <Image
                                        source={require('../../assets/home.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    {/* <SVGimage1 width={20} height={20} color='red'/> */}
                                </View>
                            )
                            }
                        </View>
                    )
                }} />

            <Tab.Screen name="EventStack" component={EventStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {focused == true ? (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.mainlight,
                                    padding: 5,
                                    borderRadius: 5
                                }}>
                                    {/* <SVGimage2 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/events.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12, color:COLORS.black}}>Events</Text>
                                </View>
                            ) : (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {/* <SVGimage2 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/events.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                </View>
                            )

                            }
                        </View>
                    )
                }} />


            <Tab.Screen name="AccountStack" component={AccountStack}
                options={{
                    // tabBarBadge: 3,
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {focused == true ? (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.mainlight,
                                    padding: 5,
                                    borderRadius: 5
                                }}>
                                    {/* <SVGimage3 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/feed.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12 , color:COLORS.black}}>Account</Text>
                                </View>

                            ) : (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {/* <SVGimage3 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/feed.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                </View>
                            )}
                        </View>
                    )
                }} />


            <Tab.Screen name="ProfileStack" component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {focused == true ? (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.mainlight,
                                    padding: 5,
                                    borderRadius: 5
                                }}>
                                    {/* <SVGimage4 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/profile.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12, color:COLORS.black }}>Profile</Text>
                                </View>

                            ) : (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {/* <SVGimage4 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/profile.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                </View>
                            )}

                        </View>
                    )
                }} />
        </Tab.Navigator>
    )
}

export default MediatorInfluencersBT

const styles = StyleSheet.create({})