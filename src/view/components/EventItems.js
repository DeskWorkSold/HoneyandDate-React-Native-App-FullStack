import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../consts/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvents, events } from '../../../redux/reducers/Reducers';
const { height, width } = Dimensions.get('window');

const EventItems = ({ navigation, data, btn, widths, onpress }) => {
    const selectEventsss = useSelector(selectEvents);
    const dispatch = useDispatch();
    // console.log('==>ok', data);
    const onEventDeatilsScreen = (item) => {
        var data = new Object
        data.TicketModaldata = item.item.TicketModaldata;
        data.Title = item.item.Title;
        data.description = item.item.description;
        data.endDate = item.item.endDate;
        data.endTime = item.item.endTime;
        data.fifthimageUrl = item.item.fifthimageUrl;
        data.fourthimageUrl = item.item.fourthimageUrl;
        data.image1 = item.item.image1;
        data.location = item.item.location;
        data.ownerName = item.item.ownerName;
        data.owneremail = item.item.owneremail;
        data.owneruid = item.item.owneruid;
        data.secimageUrl = item.item.secimageUrl;
        data.sixthimageUrl = item.item.sixthimageUrl;
        data.startDate = item.item.startDate;
        data.startTime = item.item.startTime;
        data.thirdimageUrl = item.item.thirdimageUrl;
        data.totalTicketPrice = item.item.totalTicketPrice;
        data.uid = item.item.uid;

        // console.log('eventdeatils', data);

        navigation.navigate('EventDetails', { details: data })
        dispatch(events(data))
    }
    return (
        <>
            {data?.map((item, index) => (
                console.log(item.location?.latitude),
                <TouchableOpacity key={index}
                    onPress={() => onEventDeatilsScreen({ item })}
                    // onPress={() => navigation.navigate('EventDetails', { detail: item })}
                    activeOpacity={0.7}
                    style={{
                        backgroundColor: COLORS.white,
                        elevation: 5,
                        borderColor: COLORS.light,
                        borderRadius: 20,
                        // borderWidth: 1,
                        marginLeft: 20,
                        marginRight: 5,
                        marginVertical: 20,
                        width: widths
                    }}>
                    <View>
                        <Image source={{ uri: item.image1 }} resizeMode='cover'
                            style={{
                                width: widths,
                                height: 200,
                                borderRadius: 20,
                            }} />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10,
                        flex: 1
                    }}>
                        <View style={{
                            // flex: 2
                            width: widths / 1.5,
                            // backgroundColor:COLORS.gray
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.black,
                                marginRight: 10,
                            }}>{item.Title}</Text>
                        </View>
                        <View style={{
                            // flex:1
                            // width: widths / 0.5,
                            alignItems: 'flex-end',
                            // justifyContent:'center',
                            // backgroundColor:COLORS.gray
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.black,
                                fontWeight: 'bold'
                            }}>{item.totalTicketPrice}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        paddingBottom: 10,
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                marginRight: 10,
                            }}>
                                <Image source={require('../../assets/location.png')} style={{
                                    borderTopRightRadius: 20,
                                    borderTopLeftRadius: 20,
                                }} />
                            </View>
                            <View style={{
                                width: '90%',
                                // backgroundColor:COLORS.gray
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontSize: 12
                                }}>{item?.location}</Text>
                            </View>
                        </View>
                        {btn &&
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <TouchableOpacity style={{
                                    padding: 5,
                                    paddingHorizontal: 10,
                                    backgroundColor: COLORS.main,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 20,
                                }}>
                                    <Text style={{ fontSize: 12, }}>{btn}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </TouchableOpacity>
            ))}
        </>
    )
}

export default EventItems

const styles = StyleSheet.create({})