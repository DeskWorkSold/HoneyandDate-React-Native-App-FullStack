import { TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { RadioButton, TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from 'react-redux';
import { PaymentCardDetails, selectPaymentMethod } from '../../../redux/reducers/Reducers';


const AddCardScreen = ({ navigation }) => {
    // console.log(paymentMethod);
    const PaymentMethod = useSelector(selectPaymentMethod);
    // console.log(PaymentMethod);
    const [cardHolder, setCardHolder] = useState();
    const [cardName, setCardName] = useState(); //initial choice
    const [ExpDate, setExpDate] = useState();
    const [DateVisibility, setDateVisibility] = useState(false);
    const [cvc, setCvc] = useState();
    const [InputcardHolder, setInputCardHolder] = useState(false);
    const [InputcardName, setInputCardName] = useState(false); //initial choice
    const [InputExpDate, setInputExpDate] = useState(false);
    const [Inputcvc, setInputCvc] = useState(false);
    const dispatch = useDispatch();

    const OnPaymentScreen = () => {
        if (!cardName || !cardHolder || !ExpDate || !cvc) {
            if (!cardName) {
                ToastAndroid.show("Please enter card holder name!", ToastAndroid.SHORT);
                setInputCardName(true)
            }
            else if (!cardHolder) {
                ToastAndroid.show("Please enter card number!", ToastAndroid.SHORT);
                setInputCardHolder(true)
            }
            else if (!ExpDate) {
                ToastAndroid.show("Please enter expiry date!", ToastAndroid.SHORT);
                setInputExpDate(true)
            }
            else if (!cvc) {
                ToastAndroid.show("Please enter cvc number!", ToastAndroid.SHORT);
                setInputCvc(true)
            }
        }
        else {
            let Data = new Object();
            Data.cardName = cardName
            Data.cardNumber = cardHolder
            Data.ExpDate = ExpDate
            Data.cvc = cvc
            dispatch(PaymentCardDetails(Data))

            // console.log('hello');
            navigation.navigate('CheckoutScreen')

        }
    }


    const showDateModal = () => {
        setDateVisibility(true);
    }
    const hideDiscountStartDatePicker = () => {
        setDateVisibility(false);
    };
    const handleDiscountConfirmStartDate = date => {
        setExpDate(moment(date).format('MM/DD/yy'));
        // console.warn('A date has been picked: ', date);
        // let data = new Date(date + "Z");

        // setExpDate(data);
        // hideDiscountStartDatePicker();
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            <StatusBar backgroundColor={COLORS.black} />
            <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View style={{
                    backgroundColor: COLORS.white,
                    marginBottom: 100,
                }}>
                    <View style={styles.container}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            // backgroundColor:COLORS.gray2,
                            height: 80,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{ width: '20%' }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
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
                                }}>Add Cards</Text>
                            </View>

                            <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                            </View>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: -20
                        }}>
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
                                                <Text style={{
                                                    fontSize: 20,
                                                    fontWeight: 'bold',
                                                    color: COLORS.black
                                                }}>Add new card</Text>
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
                                            <Text>*************</Text>
                                        </View>
                                        <View>
                                            <Text>09/25</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center', marginTop: -10 }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Card Holder Name </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        error={InputcardName}
                                        onFocus={() => setInputCardName(false)}
                                        activeUnderlineColor={COLORS.transparent}
                                        value={cardName}
                                        underlineColor={COLORS.transparent}
                                        placeholder={'Enter name'}
                                        placeholderTextColor={COLORS.gray2}
                                        keyboardType='email-address'
                                        onChangeText={cardName => setCardName(cardName)
                                        }
                                        style={styles.TextInput}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Card Number </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        activeUnderlineColor={COLORS.transparent}
                                        error={InputcardHolder}
                                        placeholderTextColor={COLORS.gray2}
                                        onFocus={() => setInputCardHolder(false)}
                                        value={cardHolder}
                                        placeholder={'Enter number'}
                                        underlineColor={COLORS.transparent}
                                        keyboardType='phone-pad'
                                        onChangeText={cardHolder => setCardHolder(cardHolder)
                                        }
                                        style={styles.TextInput}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Expiry Date</Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        style={styles.TextInput}
                                        placeholder={'MM / YY'}
                                        value={ExpDate}
                                        onChangeText={setExpDate}
                                        // error={InputExpDate}
                                        activeUnderlineColor={COLORS.transparent}
                                        // onFocus={() => setInputExpDate(false)}
                                        placeholderTextColor={COLORS.gray2}
                                        underlineColor={COLORS.transparent}
                                    // keyboardType='email-address'
                                    // editable={true}
                                    // onPressIn={showDateModal}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> CVC</Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        error={Inputcvc}
                                        activeUnderlineColor={COLORS.transparent}
                                        onFocus={() => setInputCvc(false)}
                                        value={cvc}
                                        placeholderTextColor={COLORS.gray2}
                                        underlineColor={COLORS.transparent}
                                        placeholder={'Enter'}
                                        keyboardType='email-address'
                                        onChangeText={cvc => setCvc(cvc)
                                        }
                                        style={styles.TextInput}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            paddingTop: 20,
                            alignItems: 'center',
                            paddingBottom: 50,
                            paddingTop: 50
                        }}>
                            <CustomeButton onpress={() => OnPaymentScreen()}
                                title={'Add To Card'} />
                        </View>
                    </View>













                    <DateTimePickerModal
                        isVisible={DateVisibility}
                        mode="date"
                        // display='spinner'
                        onConfirm={handleDiscountConfirmStartDate}
                        onCancel={hideDiscountStartDatePicker}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddCardScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: '100%'
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: 20,
        justifyContent: 'space-between',
        color: COLORS.light,
        height: 45,
        width: 340,
        backgroundColor: COLORS.white,
        elevation: 5,
        borderRadius: 5,
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
        color: COLORS.light
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