import { TextInput, TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView, ToastAndroid, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectaddToCart, selectEvents, selectPaymentCardDetails, selectPaymentMethod, selectTicketsAddToCard, selectUser, ticketsAddtoCard } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import { addItemToCart } from '../../../redux/reducers/actions/action';
import { StackActions } from '@react-navigation/native';



const CheckoutScreen = ({ navigation }) => {
    const SelectedEvent = useSelector(selectEvents)
    const PaymentCardDetails = useSelector(selectPaymentCardDetails);
    const PaymentMethod = useSelector(selectPaymentMethod);
    const [platFormFee, setPlatFormFee] = useState(4);
    const EventsId = SelectedEvent.item.uid;
    const dispatch = useDispatch();




    // for ecommerce 
    const AddToCard = useSelector(selectaddToCart)
    const total = AddToCard?.map((item) => Number(item.Totalprice)).reduce((perv, curr) => perv + curr + platFormFee, 0);
    const totalUSD = total?.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });


    const TicketAddToCard = useSelector(selectTicketsAddToCard)
    // console.log('===>',TicketAddToCard);
    const user = useSelector(selectUser)
    const [applycopun, setApplycopun] = useState(); //initial choice
    const [uploading, setUploading] = useState(false);


    const PayAmount = async () => {
        // console.log(cardName, cardHolder, ExpDate, cvc, paymentMethod, TicketAddToCard);
        if (!PaymentCardDetails.cardName, !PaymentCardDetails.cardNumber, !PaymentCardDetails.ExpDate, !PaymentCardDetails.cvc, !PaymentMethod, !TicketAddToCard) {
            if (!PaymentCardDetails.cardName) {
                ToastAndroid.show("Please enter card holder name!", ToastAndroid.SHORT);
                // setInputCardName(true)
            }
            else if (!PaymentCardDetails.cardNumber) {
                ToastAndroid.show("Please enter card number!", ToastAndroid.SHORT);
                // setInputCardHolder(true)
            }
            else if (!PaymentCardDetails.ExpDate) {
                ToastAndroid.show("Please enter expiry date!", ToastAndroid.SHORT);
                // setInputExpDate(true)
            }
            else if (!PaymentCardDetails.cvc) {
                ToastAndroid.show("Please select cvc number!", ToastAndroid.SHORT);
                // setInputCvc(true)
            }
            else if (!PaymentMethod) {
                ToastAndroid.show("Please select paymentMethod!", ToastAndroid.SHORT);
                // setInputCvc(true)
            }
            else if (!TicketAddToCard) {
                ToastAndroid.show("Please select your tickets order and try again!", ToastAndroid.SHORT);
                // setInputCvc(true)
            }
        }
        else {
            var Data = new Object();
            Data.cardName = PaymentCardDetails?.cardName
            Data.cardNumber = PaymentCardDetails?.cardNumber
            Data.ExpDate = PaymentCardDetails?.ExpDate
            Data.cvc = PaymentCardDetails?.cvc
            Data.paymentMethod = PaymentMethod
            const time = firestore.FieldValue.serverTimestamp()
            // Data.Tickets = TicketAddToCard
            // console.log(
            //     user.uid,
            //     user.Name,
            //     // EventsId,
            //     // uid,
            //     Data,
            //     TicketAddToCard,
            //     // totalUSD,
            //     // AddToCard,
            //     time,
            // );
            // return
            if (!AddToCard.length == 0) {
                setUploading(true)
                const uid = Math.random().toString(16).slice(2);
                try {
                    await firestore()
                        .collection('orders')
                        .doc(uid)
                        .set({
                            Order: AddToCard,
                            useruid: user?.uid,
                            userName: user?.Name,
                            // userPhoneNumber: user.PhoneNumber,
                            eid: EventsId,
                            uid: uid,
                            PaymentInfo: Data,
                            totalAmount: totalUSD,
                            createdAt: time,
                        })
                        .then(() => {
                            ToastAndroid.show('Your Food Order Successfully Placed', ToastAndroid.SHORT)
                            navigation.navigate('EventsScreen');
                            // console.log('Your Food Order Successfully Placed');
                            dispatch(addToCart(''))
                        })
                    setUploading(false)
                } catch (error) {
                    console.log('error test1', error);
                }
            }
            else {
                const id = TicketAddToCard.uid
                try {
                    setUploading(true)
                    await firestore()
                        .collection('SellTickets')
                        .doc(id)
                        .set(
                            {
                                PaymentInfo: Data,
                                createdAt: time,
                                TicketAddToCard,
                                useruid: user?.uid,
                                status: 'Done'
                            },
                        )
                        .then(() => {
                            ToastAndroid.show('Tickets Purchase successfully', ToastAndroid.SHORT)
                            navigation.navigate('EventTicketsBuy', {
                                BuyTickets: TicketAddToCard,
                                paymentCard: Data,
                                // createdDate: createdDate,
                                // createdTime: createdTime,
                                useruid: user?.uid
                            })
                            dispatch(ticketsAddtoCard(null))
                        })
                    // // setImage(null)
                    setUploading(false)
                } catch (error) {
                    console.log('error test1', error);
                }

            }
        }
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>

                <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // backgroundColor:COLORS.gray2,
                        height: 80,
                        paddingHorizontal: 20,
                    }}>
                        <View style={{ width: '20%' }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}>
                                <Image source={require('../../assets/arrowleft.png')} resizeMode='contain'
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
                            }}>Checkout</Text>
                        </View>

                        <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                        </View>
                    </View>
                    <ScrollView>
                        {!AddToCard.length == 0 &&
                            <>
                                {AddToCard.map((item, index) => (
                                    <View key={index} style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: '100%',
                                        paddingHorizontal: 20,
                                        paddingVertical: 20,
                                        backgroundColor: COLORS.light,
                                        marginBottom: 10
                                    }}>
                                        <View style={{
                                            borderRadius: 50,
                                            width: '20%',
                                        }}>
                                            <Image source={{ uri: item?.image1 }} resizeMode='cover' style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 50,
                                                borderWidth: 2,
                                                borderColor: COLORS.main,
                                            }} />
                                        </View>
                                        <View style={{
                                            width: '60%',
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                paddingLeft: 10
                                            }}>{item?.name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, }}>
                                                <Text style={{
                                                    fontSize: 14,
                                                    fontWeight: 'bold',
                                                    color: COLORS.black,
                                                    paddingLeft: 10
                                                }}>
                                                    Qty:
                                                </Text>
                                                {/* <TouchableOpacity
                                            // onPress={() => handleDecrement(item)}
                                            style={{
                                                backgroundColor: COLORS.main,
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                width: 20
                                            }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontSize: 12,
                                                // marginRight: 5,
                                                // paddingRight: 5,
                                                textAlign: 'center',
                                                fontSize: 15,
                                            }}>-</Text>
                                        </TouchableOpacity> */}
                                                <Text style={{
                                                    // backgroundColor: COLORS.white,
                                                    paddingHorizontal: 3,
                                                    fontSize: 15,
                                                    width: 20,
                                                    textAlign: 'center',
                                                    color: COLORS.black
                                                }}>{item.qty}</Text>
                                                {/* <TouchableOpacity
                                            onPress={() => handleIncrement(item)}
                                            style={{
                                                backgroundColor: COLORS.main,
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                width: 20
                                            }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontSize: 12,
                                                marginRight: 5,
                                                paddingLeft: 5,
                                                fontSize: 15,
                                            }}>+</Text>
                                        </TouchableOpacity> */}
                                            </View>
                                        </View>
                                        <View style={{
                                            width: '20%',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                            }}>Total Price</Text>
                                            <Text style={{
                                                fontSize: 15,
                                                color: COLORS.green,
                                                fontWeight: 'bold'
                                            }}>${item?.Totalprice}.00</Text>
                                        </View>
                                    </View>
                                ))}
                            </>
                        }

                        <View>
                            <View style={{
                                width: '90%',
                                backgroundColor: COLORS.white,
                                paddingVertical: 20,
                                elevation: 9,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                borderRadius: 20,
                                marginVertical: 20
                            }}>
                                <View style={{
                                    // alignItems: 'center',
                                    // marginTop: -20
                                    paddingHorizontal: 20
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingBottom: 80
                                    }}>
                                        <View>
                                            <View>
                                                <Text style={{ fontSize: 12 }}>Card Holder Name</Text>
                                            </View>
                                            <View>
                                                <Text style={{
                                                    fontSize: 20,
                                                    fontWeight: 'bold',
                                                    color: COLORS.black
                                                }}>{PaymentCardDetails?.cardName}</Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            alignItems: 'center'
                                        }}>
                                            {PaymentMethod == 'Paypal' &&
                                                <>
                                                    <Image source={require('../../assets/paypal.png')} resizeMode='contain' />
                                                    <Text style={{
                                                        fontSize: 10
                                                    }}>{PaymentMethod}</Text>
                                                </>
                                            }
                                            {PaymentMethod == 'Google Pay' &&
                                                <>
                                                    <Image source={require('../../assets/google.png')} resizeMode='contain' />
                                                    <Text style={{
                                                        fontSize: 10
                                                    }}>{PaymentMethod}</Text>
                                                </>
                                            }
                                            {PaymentMethod == 'Venmo' &&
                                                <>
                                                    <Image source={require('../../assets/venmo.png')} resizeMode='contain' />
                                                    <Text style={{
                                                        fontSize: 10
                                                    }}>{PaymentMethod}</Text>
                                                </>
                                            }
                                            {PaymentMethod == 'Credit Card' &&
                                                <>
                                                    <Image source={require('../../assets/creditcard.png')} resizeMode='contain' />
                                                    <Text style={{
                                                        fontSize: 10
                                                    }}>{PaymentMethod}</Text>
                                                </>
                                            }
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                        <View>
                                            <Text>{PaymentCardDetails?.cardNumber}</Text>
                                        </View>
                                        <View>
                                            <Text>{PaymentCardDetails?.ExpDate}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 10
                            }}>
                                <View style={styles.NumberInput}>
                                    <Image source={require('../../assets/coupn.png')} resizeMode='contain'
                                        style={{
                                            width: 20
                                        }} />
                                    <TextInput
                                        value={applycopun}
                                        placeholder={'Apply Coupon'}
                                        // error={inputfirstName}
                                        keyboardType='number-pad'
                                        onChangeText={applycopun => setApplycopun(applycopun)
                                        }
                                        style={styles.TextInput}
                                    />
                                </View>
                                <View style={{
                                    width: '25%',
                                    height: 45,
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    backgroundColor: COLORS.main
                                }}>
                                    <TouchableOpacity style={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                    }}>
                                        <Text style={{ color: COLORS.black }}>Apply</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>


                            {!AddToCard.length == 0 ?
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingTop: 20,
                                        paddingBottom: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text>Delivery Charges</Text>
                                        <Text>$0</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text>Platform Fee</Text>
                                        <Text style={{ color: COLORS.green }}>${platFormFee}.00</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text>Total</Text>
                                        <Text>{totalUSD}</Text>
                                    </View>
                                </View>
                                :
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingTop: 20,
                                        paddingBottom: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text>Flakes</Text>
                                        <Text>$0</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text>Coupon</Text>
                                        <Text style={{ color: COLORS.green }}>-$0</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text>Total</Text>
                                        <Text>${TicketAddToCard?.totalPrice}</Text>
                                    </View>
                                </View>
                            }



                        </View>
                    </ScrollView>

                    <View style={{
                        paddingTop: 20,
                        alignItems: 'center',
                        paddingBottom: 100,
                        paddingTop: 90,
                        // height: '20%'
                    }}>
                        {!uploading == true ?
                            <>
                                {!AddToCard.length == 0 ?
                                    <CustomeButton onpress={() => PayAmount()}
                                        title={`Pay Amount ${totalUSD}`} />
                                    :
                                    <CustomeButton onpress={() => PayAmount()}
                                        title={`Pay Amount $${TicketAddToCard?.totalPrice}`} />
                                }
                            </>
                            :
                            <View style={{
                                backgroundColor: COLORS.main,
                                width: 329,
                                height: 50,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ActivityIndicator size="small" color={COLORS.white} animating={uploading} />
                            </View>
                        }
                    </View>
                </ScrollView>
            </View>


        </SafeAreaView>
    )
}

export default CheckoutScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        // height: '80%',
        paddingHorizontal: 20
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 45,
        width: '70%',
        backgroundColor: COLORS.white,
        elevation: 5,
        borderRadius: 5,
    },
    TextInput: {
        paddingLeft: 5,
        backgroundColor: COLORS.transparent,
    },
    rbStyle: {
        height: 22,
        width: 22,
        borderRadius: 110,
        borderWidth: 2,
        borderColor: COLORS.gray2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        width: 15,
        height: 15,
        margin: 10,
        borderRadius: 55,
        backgroundColor: COLORS.main,
    },
})