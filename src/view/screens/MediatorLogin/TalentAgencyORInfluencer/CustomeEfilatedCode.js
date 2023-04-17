import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
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

import { useState } from 'react';
import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get("window");

const CustomeEfilatedCode = ({ navigation }) => {
    const [emailAddress, setEmailAddress] = useState(null);
    const [customeCode, setCustomeCode] = useState(null);

    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white,
            // paddingHorizontal:20
        }}>
            <ScrollView>
                <View style={{
                    marginBottom: 30
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
                            <Text style={{ textAlign: 'center', color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>Learn more about
                                referral program</Text>
                        </View>
                        <View style={{
                            flex: 1,
                        }}>
                        </View>
                    </View>

                    <View style={{
                        // top: -20,
                        alignSelf: 'center',
                        width: width / 1.1,
                        // flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        elevation: 5,
                        // alignItems: 'center',
                        paddingRight: 20,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: COLORS.black,
                            fontSize: 15
                        }}>Referral Program Details</Text>

                        <View style={{
                            paddingVertical: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                width: 20,
                                height: 20,
                                textAlign: 'center',
                                borderRadius: 100,
                                color: COLORS.white,
                                backgroundColor: COLORS.black,
                            }}>1</Text>
                            <View style={{
                                width: '90%',
                                paddingLeft: 5,
                                fontSize: 13,
                                color: COLORS.gray
                            }}>
                                <Text>Onboard talent/modeling agencies
                                    and earn 2.5%</Text>
                            </View>
                        </View>
                        <View style={{
                            paddingVertical: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                width: 20,
                                height: 20,
                                textAlign: 'center',
                                borderRadius: 100,
                                color: COLORS.white,
                                backgroundColor: COLORS.black,
                            }}>2</Text>
                            <View style={{
                                width: '90%',
                                paddingLeft: 5,
                                fontSize: 13,
                                color: COLORS.gray
                            }}>
                                <Text>Talent agencies will earn 5% of
                                    subscription</Text>
                            </View>
                        </View>
                        <View style={{
                            paddingVertical: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                width: 20,
                                height: 20,
                                textAlign: 'center',
                                borderRadius: 100,
                                color: COLORS.white,
                                backgroundColor: COLORS.black,
                            }}>3</Text>
                            <View style={{
                                width: '90%',
                                paddingLeft: 5,
                                fontSize: 13,
                                color: COLORS.gray
                            }}>
                                <Text>Influnacers/ models will earn 10%
                                    of subscription</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 10,
                        }}>
                            <Text style={{
                                width: 20,
                                height: 20,
                                textAlign: 'center',
                                borderRadius: 100,
                                color: COLORS.white,
                                backgroundColor: COLORS.black,
                            }}>4</Text>
                            <View style={{
                                width: '90%',
                                paddingLeft: 5,
                                fontSize: 13,
                                color: COLORS.gray
                            }}>
                                <Text>You will earn most money when you sign up talent/ modeling Agancy’s that have the most influencers</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        // top: -20,
                        marginTop: 30,
                        alignSelf: 'center',
                        width: width / 1.1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        elevation: 5,
                        alignItems: 'center',
                        paddingRight: 20,
                        paddingVertical: 5,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <TextInput
                                placeholder='Enter your custom code'
                                value={customeCode}
                                placeholderTextColor={COLORS.gray}
                                onChangeText={(text) => setCustomeCode(text)}
                                underlineColor={COLORS.transparent}
                                activeUnderlineColor={COLORS.transparent}
                                backgroundColor={COLORS.transparent}
                                style={{
                                    width: width / 1.5,
                                    padding: 0,
                                    margin: 0,
                                    backgroundColor: COLORS.transparent
                                }}
                            />
                        </View>
                        <View style={{
                            color: COLORS.black,
                            fontSize: 13
                        }}>
                            <Edite width={20} height={20} />
                        </View>
                    </View>

                    <View style={{
                        paddingVertical: 20,
                        alignSelf: 'center'
                    }}>
                        <CustomeButton title={'Autogenerate'} />
                    </View>

                    <View style={{
                        paddingVertical: 20,
                        paddingHorizontal: 20
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: COLORS.black,
                            textAlign: 'center'
                        }}>
                            Send Invite
                        </Text>
                    </View>

                    <View style={{
                        // top: -20,
                        alignSelf: 'center',
                        width: width / 1.1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        elevation: 5,
                        alignItems: 'center',
                        paddingRight: 20,
                        paddingVertical: 5,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <TextInput
                                placeholder='enter email address'
                                value={emailAddress}
                                placeholderTextColor={COLORS.gray}
                                onChangeText={(text) => setEmailAddress(text)}
                                underlineColor={COLORS.transparent}
                                activeUnderlineColor={COLORS.transparent}
                                backgroundColor={COLORS.transparent}
                                style={{
                                    width: width / 1.5,
                                    padding: 0,
                                    margin: 0,
                                    backgroundColor: COLORS.transparent
                                }}
                            />
                        </View>
                        <View style={{
                            color: COLORS.black,
                            fontSize: 13
                        }}>
                            <Send width={20} height={20} />
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        paddingVertical: 10,
                        paddingHorizontal:20,
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}>
                        <View>
                            <Text>Log in to email to send mass emails</Text>
                        </View>
                        <TouchableOpacity style={{
                            paddingHorizontal:10,
                            paddingVertical:2,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:5,
                            backgroundColor:COLORS.main
                        }}>
                            <Text style={{
                                fontSize:12,
                                color:COLORS.black
                            }}>
                                Log in
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        alignSelf: 'center',
                        width: width / 1.1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 5
                    }}>
                        <View style={{
                            width: '45%',
                            elevation: 5,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Twitter width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>Twitter</Text>
                            </View>
                        </View>
                        <View style={{
                            width: '45%',
                            elevation: 5,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Facebook width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>Facebook</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{
                        alignSelf: 'center',
                        marginTop: 10,
                        width: width / 1.1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // backgroundColor: COLORS.white,
                        // borderRadius: 10,
                        // elevation: 5,
                        alignItems: 'center',
                        // paddingRight: 20,
                        paddingVertical: 5
                    }}>
                        <View style={{
                            width: '45%',
                            elevation: 5,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <WhatsApp width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>WhatsApp</Text>
                            </View>
                        </View>
                        <View style={{
                            width: '45%',
                            elevation: 5,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <WhatsApp width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>Send to all on WhatsApp</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        alignSelf: 'center',
                        marginTop: 10,
                        width: width / 1.1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // backgroundColor: COLORS.white,
                        // borderRadius: 10,
                        // elevation: 5,
                        alignItems: 'center',
                        // paddingRight: 20,
                        paddingVertical: 5
                    }}>
                        <View style={{
                            width: '45%',
                            elevation: 5,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Reddit width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>Reddit</Text>
                            </View>
                        </View>
                        <View style={{
                            width: '45%',
                            elevation: 5,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Linkedin width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>Linked in </Text>
                            </View>
                        </View>
                    </View>


                    <View style={{
                        alignSelf: 'center',
                        marginTop: 10,
                        width: width / 1.1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // backgroundColor: COLORS.white,
                        // borderRadius: 10,
                        // elevation: 5,
                        alignItems: 'center',
                        // paddingRight: 20,
                        paddingVertical: 5
                    }}>
                        <View style={{
                            width: '45%',
                            elevation: 5,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <TikTok width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>TikTok</Text>
                            </View>
                        </View>
                        <View style={{
                            width: '45%',
                            elevation: 5,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <CopyLink width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>Copy Link</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        paddingVertical: 20,
                        alignSelf: 'center'
                    }}>
                        <CustomeButton title={'Send to all'} width={width / 1.1} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CustomeEfilatedCode


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