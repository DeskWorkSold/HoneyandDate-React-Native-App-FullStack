import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { useState } from 'react';
import COLORS from '../../../../consts/Colors';
import { RadioButton, TextInput } from 'react-native-paper';
import CustomeButton from '../../../components/CustomeButton';
import Add from '../../../../assets/add.svg';
import Cancle from '../../../../assets/cancle.svg';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Loader from '../../../components/Loader';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get("window");

const CoordinatorBtn = [
  {
    id: '1',
    name: 'Available time',
  },
  {
    id: '2',
    name: 'Write Notes',
  }
];

const monday = [
  {
    id: '1',
    name: 'Will respond within 12 hours',
  },
  {
    id: '2',
    name: 'Select Time',
  }
]


const ManageScreen = () => {
  const mediatoruser = useSelector(selectMediatorUser)
  const [coordinatorBtn, setCoordinatorBtn] = useState('Available time');
  const [value, setValueIndex] = useState(0);
  const [notes, setNotes] = useState(null);
  const [inputNotes, setInputNotes] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [onChange, setOnChange] = useState(false);
  const [checkedindex, setCheckedindex] = useState(
    {
      mondayindex: null,
      tuesdayindex: null,
      wednesdayindex: null,
      thursdayindex: null,
      fridayindex: null,
      saturdayindex: null,
      sundayindex: null,
    }
  );
  const [checked, setChecked] = useState(
    {
      mondayName: null,
      tuesdayName: null,
      wednesdayName: null,
      thursdayName: null,
      fridayName: null,
      saturdayName: null,
      sundayName: null,
    }
  );
  const [days, setdays] = useState(
    {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    }
  )
  const [startTimeVisibility, setStartTimeVisibility] = useState(
    {
      mondayVisibility: false,
      tuesdayVisibility: false,
      wednesdayVisibility: false,
      thursdayVisibility: false,
      fridayVisibility: false,
      saturdayVisibility: false,
      sundayVisibility: false,
    }
  )
  const [endTimeVisibility, setEndTimeVisibility] = useState(
    {
      mondayVisibility: false,
      tuesdayVisibility: false,
      wednesdayVisibility: false,
      thursdayVisibility: false,
      fridayVisibility: false,
      saturdayVisibility: false,
      sundayVisibility: false,
    }
  )
  const [startTime, setStartTime] = useState(
    {
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
    }
  )
  const [endTime, setendTime] = useState(
    {
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
    }
  )



  const handleSlide = (index) => {
    // console.log('slide');
    setValueIndex(index)
    const viewPage = CoordinatorBtn[index].name
    setCoordinatorBtn(viewPage);
  };


  const onSendNotes = () => {
    if (!notes || notes == '' || notes == isNaN) {
      ToastAndroid.show("Please enter your notes first!", ToastAndroid.SHORT);
      setInputNotes(true)
    }
    else {
      console.log(notes);
    }
  }

  const onCheckMonday = (index) => {
    setCheckedindex({ ...checkedindex, mondayindex: index });
    const test = monday[index].name
    // console.log(test);
    setChecked({ ...checked, mondayName: test })
  }
  const onCheckTuesday = (index) => {
    setCheckedindex({ ...checkedindex, tuesdayindex: index });
    const test = monday[index].name
    // console.log(test);
    setChecked({ ...checked, tuesdayName: test })
  }
  const onCheckWednesday = (index) => {
    setCheckedindex({ ...checkedindex, wednesdayindex: index });
    const test = monday[index].name
    // console.log(test);
    setChecked({ ...checked, wednesdayName: test })
  }
  const onCheckThursday = (index) => {
    setCheckedindex({ ...checkedindex, thursdayindex: index });
    const test = monday[index].name
    // console.log(test);
    setChecked({ ...checked, thursdayName: test })
  }
  const onCheckFriday = (index) => {
    setCheckedindex({ ...checkedindex, fridayindex: index });
    const test = monday[index].name
    // console.log(test);
    setChecked({ ...checked, fridayName: test })
  }
  const onCheckSaturday = (index) => {
    setCheckedindex({ ...checkedindex, saturdayindex: index });
    const test = monday[index].name
    // console.log(test);
    setChecked({ ...checked, saturdayName: test })
  }
  const onCheckSunday = (index) => {
    setCheckedindex({ ...checkedindex, sundayindex: index });
    const test = monday[index].name
    // console.log(test);
    setChecked({ ...checked, sundayName: test })
  }

  const handleMondaystartTime = date => {
    // console.warn('A date has been picked: ', date);
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    // console.log(final);
    setStartTime({ ...startTime, monday: final });
    setStartTimeVisibility({ ...startTimeVisibility, mondayVisibility: false });
    // hideEndTimePicker();
    setOnChange(true)
  }
  const handleMondayendTime = date => {
    // console.warn('A date has been picked: ', date);
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    // console.log(final);
    setendTime({ ...endTime, monday: final });
    setEndTimeVisibility({ ...endTimeVisibility, mondayVisibility: false });
    setOnChange(true)
    // hideEndTimePicker();
  }

  const handleTuesdaystartTime = date => {
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setStartTime({ ...startTime, tuesday: final });
    setStartTimeVisibility({ ...startTimeVisibility, tuesdayVisibility: false });
    setOnChange(true)
  }

  const handleTuesdayEndTime = date => {
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setendTime({ ...endTime, tuesday: final });
    setEndTimeVisibility({ ...endTimeVisibility, tuesdayVisibility: false });
    setOnChange(true)
  }

  const handleWednesdaystartTime = date => {
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setStartTime({ ...startTime, wednesday: final });
    setStartTimeVisibility({ ...startTimeVisibility, wednesdayVisibility: false });
    setOnChange(true)
  }
  const handleWednesdayEndTime = date => {
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setendTime({ ...endTime, wednesday: final });
    setEndTimeVisibility({ ...endTimeVisibility, wednesdayVisibility: false });
    setOnChange(true)
  }
  const handleThursdaystartTime = date => {
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setStartTime({ ...startTime, thursday: final });
    setStartTimeVisibility({ ...startTimeVisibility, thursdayVisibility: false });
    setOnChange(true)
  }
  const handleThursdayEndTime = date => {
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setendTime({ ...endTime, thursday: final });
    setEndTimeVisibility({ ...endTimeVisibility, thursdayVisibility: false });
    setOnChange(true)
  }
  const handleFridaystartTime = date => {
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setStartTime({ ...startTime, friday: final });
    setStartTimeVisibility({ ...startTimeVisibility, fridayVisibility: false });
    setOnChange(true)
  }
  const handleFridayEndTime = date => {
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setendTime({ ...endTime, friday: final });
    setEndTimeVisibility({ ...endTimeVisibility, fridayVisibility: false });
    setOnChange(true)
  }
  const handleSaturdaystartTime = date => {
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setStartTime({ ...startTime, saturday: final });
    setStartTimeVisibility({ ...startTimeVisibility, saturdayVisibility: false });
    setOnChange(true)
  }
  const handleSaturdayEndTime = date => {
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setendTime({ ...endTime, saturday: final });
    setEndTimeVisibility({ ...endTimeVisibility, saturdayVisibility: false });
    setOnChange(true)
  }
  const handleSundaystartTime = date => {
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setStartTime({ ...startTime, sunday: final });
    setStartTimeVisibility({ ...startTimeVisibility, sundayVisibility: false });
    setOnChange(true)
  }
  const handleSundayEndTime = date => {
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setendTime({ ...endTime, sunday: final });
    setEndTimeVisibility({ ...endTimeVisibility, sundayVisibility: false });
    setOnChange(true)
  }

  const OnCancle = async () => {
    setCheckedindex({ ...checkedindex, mondayindex: null, tuesdayindex: null, wednesdayindex: null, thursdayindex: null, fridayindex: null, saturdayindex: null, sundayindex: null })
    setChecked({ ...checked, mondayName: null, tuesdayName: null, wednesdayName: null, thursdayName: null, fridayName: null, saturdayName: null, sundayName: null })
    setStartTime({ ...startTime, monday: null, tuesday: null, wednesday: null, thursday: null, friday: null, saturday: null, sunday: null })
    setendTime({ ...startTime, monday: null, tuesday: null, wednesday: null, thursday: null, friday: null, saturday: null, sunday: null })

  }

  const OnSendTimings = async () => {
    if (!checked.mondayName && !checked.tuesdayName && !checked.wednesdayName && !checked.thursdayName && !checked.fridayName && !checked.saturdayName && !checked.sundayName) {
      ToastAndroid.show("Please select your timings!", ToastAndroid.SHORT)
    }
    else {
      if (checked.mondayName == 'Select Time' && checked.tuesdayName == 'Select Time' && checked.wednesdayName == 'Select Time' && checked.thursdayName == 'Select Time' && checked.fridayName == 'Select Time' && checked.saturdayName == 'Select Time' && checked.sundayName == 'Select Time') {
        if (!onChange == true || startTime.monday == null && startTime.tuesday == null && startTime.wednesday == null && startTime.thursday == null && startTime.friday == null && startTime.saturday == null && startTime.sunday == null && endTime.monday == null && endTime.tuesday == null && endTime.wednesday == null && endTime.thursday == null && endTime.friday == null && endTime.saturday == null && endTime.sunday == null) {
          if (startTime.monday == null && startTime.tuesday == null && startTime.wednesday == null && startTime.thursday == null && startTime.friday == null && startTime.saturday == null && startTime.sunday == null && endTime.monday == null && endTime.tuesday == null && endTime.wednesday == null && endTime.thursday == null && endTime.friday == null && endTime.saturday == null && endTime.sunday == null) {
            ToastAndroid.show("Please enter your timings!", ToastAndroid.SHORT);
            // console.log('sds', startTime.monday, endTime.monday);
          }
          else {
            ToastAndroid.show("Please Change your timings then save changes!", ToastAndroid.SHORT);
          }
        }
        else {
          setUploading(true)
          await firestore()
            .collection('Users').doc(mediatoruser.uid).update({
              'userDetails.Timing': 'Select Time',
              'userDetails.MondayOpen': startTime.monday ? startTime.monday : null,
              'userDetails.MondayClose': endTime.monday ? endTime.monday : null,
              'userDetails.TuesdayOpen': startTime.tuesday ? startTime.tuesday : null,
              'userDetails.TuesdayClose': endTime.tuesday ? endTime.tuesday : null,
              'userDetails.WednesdayOpen': startTime.wednesday ? startTime.wednesday : null,
              'userDetails.WednesdayClose': endTime.wednesday ? endTime.wednesday : null,
              'userDetails.ThursdayOpen': startTime.thursday ? startTime.thursday : null,
              'userDetails.ThursdayClose': endTime.thursday ? endTime.thursday : null,
              'userDetails.FridayOpen': startTime.friday ? startTime.friday : null,
              'userDetails.FridayClose': endTime.friday ? endTime.friday : null,
              'userDetails.SaturdayOpen': startTime.saturday ? startTime.saturday : null,
              'userDetails.SaturdayClose': endTime.saturday ? endTime.saturday : null,
              'userDetails.SundayClose': startTime.sunday ? startTime.sunday : null,
              'userDetails.SundayClose': endTime.sunday ? endTime.sunday : null,
            })
            .then(() => {
              ToastAndroid.show("Save changes!", ToastAndroid.SHORT);
              console.log('timing submitted - Select Time');
              setUploading(false)
              setCheckedindex({ ...checkedindex, mondayindex: null, tuesdayindex: null, wednesdayindex: null, thursdayindex: null, fridayindex: null, saturdayindex: null, sundayindex: null })
              setChecked({ ...checked, mondayName: null, tuesdayName: null, wednesdayName: null, thursdayName: null, fridayName: null, saturdayName: null, sundayName: null })
              setStartTime({ ...startTime, monday: null, tuesday: null, wednesday: null, thursday: null, friday: null, saturday: null, sunday: null })
              setendTime({ ...startTime, monday: null, tuesday: null, wednesday: null, thursday: null, friday: null, saturday: null, sunday: null })
            });
          // console.log('test',
          //   'Start Time',
          //   startTime.monday,
          //   startTime.tuesday,
          //   startTime.wednesday,
          //   startTime.thursday,
          //   startTime.friday,
          //   startTime.saturday,
          //   startTime.sunday,
          //   'End Time',
          //   endTime.monday,
          //   endTime.tuesday,
          //   endTime.wednesday,
          //   endTime.thursday,
          //   endTime.friday,
          //   endTime.saturday,
          //   endTime.sunday,
          //   onChange,
          //   mediatoruser.uid
          // );
        }
      }
      else if (checked.mondayName == 'Will respond within 12 hours' && checked.tuesdayName == 'Will respond within 12 hours' && checked.wednesdayName == 'Will respond within 12 hours' && checked.thursdayName == 'Will respond within 12 hours' && checked.fridayName == 'Will respond within 12 hours' && checked.saturdayName == 'Will respond within 12 hours' && checked.sundayName == 'Will respond within 12 hours') {
        setUploading(true)
        await firestore()
          .collection('Users').doc(mediatoruser.uid).update({
            'userDetails.Timing': 'Will respond within 12 hours',
            'userDetails.MondayOpen': checked.mondayName ? checked.mondayName : null,
            'userDetails.MondayClose': null,
            'userDetails.TuesdayOpen': checked.tuesdayName ? checked.tuesdayName : null,
            'userDetails.TuesdayClose': null,
            'userDetails.WednesdayOpen': checked.wednesdayName ? checked.wednesdayName : null,
            'userDetails.WednesdayClose': null,
            'userDetails.ThursdayOpen': checked.thursdayName ? checked.thursdayName : null,
            'userDetails.ThursdayClose': null,
            'userDetails.FridayOpen': checked.fridayName ? checked.fridayName : null,
            'userDetails.FridayClose': null,
            'userDetails.SaturdayOpen': checked.saturdayName ? checked.saturdayName : null,
            'userDetails.SaturdayClose': null,
            'userDetails.SundayClose': checked.sundayName ? checked.sundayName : null,
            'userDetails.SundayClose': null,
          })
          .then(() => {
            ToastAndroid.show("Save changes!", ToastAndroid.SHORT);
            console.log('timing submitted - repond within 12 hours');
            setUploading(false);
            setCheckedindex({ ...checkedindex, mondayindex: null, tuesdayindex: null, wednesdayindex: null, thursdayindex: null, fridayindex: null, saturdayindex: null, sundayindex: null })
            setChecked({ ...checked, mondayName: null, tuesdayName: null, wednesdayName: null, thursdayName: null, fridayName: null, saturdayName: null, sundayName: null })
            setStartTime({ ...startTime, monday: null, tuesday: null, wednesday: null, thursday: null, friday: null, saturday: null, sunday: null })
            setendTime({ ...startTime, monday: null, tuesday: null, wednesday: null, thursday: null, friday: null, saturday: null, sunday: null })
          });
        // console.log(
        //   'Start Time',
        //   startTime.monday,
        //   startTime.tuesday,
        //   startTime.wednesday,
        //   startTime.thursday,
        //   startTime.friday,
        //   startTime.saturday,
        //   startTime.sunday,
        //   'End Time',
        //   endTime.monday,
        //   endTime.tuesday,
        //   endTime.wednesday,
        //   endTime.thursday,
        //   endTime.friday,
        //   endTime.saturday,
        //   endTime.sunday,
        //   onChange,
        //   mediatoruser.uid
        // );
      }
      else {
        if (!checked.mondayName) {
          ToastAndroid.show("Please select your timings for monday!", ToastAndroid.SHORT);
        }
        else if (!checked.tuesdayName) {
          ToastAndroid.show("Please select your timings for tuesday!", ToastAndroid.SHORT);
        }
        else if (!checked.wednesdayName) {
          ToastAndroid.show("Please select your timings for wednesday!", ToastAndroid.SHORT);
        }
        else if (!checked.thursdayName) {
          ToastAndroid.show("Please select your timings for thursday!", ToastAndroid.SHORT);
        }
        else if (!checked.fridayName) {
          ToastAndroid.show("Please select your timings for friday!", ToastAndroid.SHORT);
        }
        else if (!checked.saturdayName) {
          ToastAndroid.show("Please select your timings for saturday!", ToastAndroid.SHORT);
        }
        else if (!checked.sundayName) {
          ToastAndroid.show("Please select your timings for sunday!", ToastAndroid.SHORT);
        }
      }
    }
  }

  // console.log(startTime.monday);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.container}>

        <View style={styles.contentContainer}>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: "space-between",
            width: '100%',
            // paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: COLORS.light
          }}>
            {CoordinatorBtn.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSlide(index)}
                style={{
                  // flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderWidth: 0.5,
                  width: '50%',
                  // borderColor: value == index ? COLORS.main: COLORS.gray,
                  borderRadius: 10,
                  height: 46,
                  backgroundColor: value == index ? COLORS.main : COLORS.light
                }}
              >
                <Text style={{
                  fontFamily: '',
                  color: COLORS.black
                }}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {coordinatorBtn == 'Available time' ?
          <View style={{ marginBottom: 180, marginHorizontal: 0, }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                elevation: 9,
                // marginHorizontal:10,
                borderRadius: 10,
                marginTop: 5,
                marginBottom: 30,
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: COLORS.light,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>
                      Monday
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setdays({ ...days, monday: !days.monday })}>
                    <Add height={20} width={20} />
                  </TouchableOpacity>
                </View>
                {days.monday &&
                  <>
                    {monday.map((item, index) => (
                      <View key={index}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text>
                              {item.name}
                            </Text>
                          </View>
                          <View>
                            <RadioButton
                              value="Public"
                              status={checkedindex.mondayindex === index ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
                              onPress={() => onCheckMonday(index)}//when pressed, set the value of the checked Hook to 'Apple'
                              color={COLORS.black}
                              uncheckedColor={COLORS.black}
                            />
                          </View>
                        </View>
                        {checked.mondayName == 'Select Time' && checkedindex.mondayindex == index &&
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 20,
                          }}>
                            <View style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              // justifyContent:'space-between',
                            }}>
                              <View>
                                <TextInput
                                  // label='Description'
                                  placeholder='4:00'
                                  placeholderTextColor={COLORS.gray}
                                  value={startTime.monday}
                                  mode='outlined'
                                  // onBlur={inputBio}
                                  onChangeText={(text) => setStartTime({ ...startTime, monday: text })}
                                  activeOutlineColor={COLORS.light}
                                  outlineColor={COLORS.gray2}
                                  style={{
                                    width: 100,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    // justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.black
                                  }}
                                  editable={true}
                                  onPressIn={() => setStartTimeVisibility({ ...startTimeVisibility, mondayVisibility: true })}
                                />
                              </View>
                              <View style={{
                                paddingHorizontal: 20,
                              }}>
                                <Text>to</Text>
                              </View>
                              <View>
                                <TextInput
                                  // label='Description'
                                  placeholder='12:00'
                                  placeholderTextColor={COLORS.gray}
                                  value={endTime.monday}
                                  mode='outlined'
                                  // onBlur={inputBio}
                                  onChangeText={(text) => setendTime({ ...endTime, monday: text })}
                                  activeOutlineColor={COLORS.light}
                                  outlineColor={COLORS.gray2}
                                  style={{
                                    width: 100,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    // justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.black
                                  }}
                                  onPressIn={() => setEndTimeVisibility({ ...endTimeVisibility, mondayVisibility: true })}
                                />
                              </View>
                            </View>
                            <View>
                              <TouchableOpacity
                                onPress={() => { setCheckedindex(null), setChecked('Will respond within 12 hours') }}>
                                <Cancle height={25} width={25} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        }
                      </View>
                    ))}
                  </>
                }
                {/* <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
                <View>
                  <Text>
                    Will respond within 12 hours
                  </Text>
                </View>
                <View>
                  <Add height={20} width={20} />
                </View>
              </View> */}
              </View>



              <View style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                elevation: 9,
                borderRadius: 10,
                marginBottom: 30,
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: COLORS.light,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>
                      Tuesday
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setdays({ ...days, tuesday: !days.tuesday })}>
                    <Add height={20} width={20} />
                  </TouchableOpacity>
                </View>
                {days.tuesday &&
                  <>
                    {monday.map((item, index) => (
                      <View key={index}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text>
                              {item.name}
                            </Text>
                          </View>
                          <View>
                            <RadioButton
                              value="Public"
                              status={checkedindex.tuesdayindex === index ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
                              onPress={() => onCheckTuesday(index)}//when pressed, set the value of the checked Hook to 'Apple'
                              color={COLORS.black}
                              uncheckedColor={COLORS.black}
                            />
                          </View>
                        </View>
                        {checked.tuesdayName == 'Select Time' && checkedindex.tuesdayindex == index &&
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 20,
                          }}>
                            <View style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              // justifyContent:'space-between',
                            }}>
                              <View>
                                <TextInput
                                  // label='Description'
                                  placeholder='4:00'
                                  placeholderTextColor={COLORS.gray}
                                  value={startTime.tuesday}
                                  mode='outlined'
                                  // onBlur={inputBio}
                                  onChangeText={(text) => setStartTime({ ...startTime, tuesday: text })}
                                  activeOutlineColor={COLORS.light}
                                  outlineColor={COLORS.gray2}
                                  style={{
                                    width: 100,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    // justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.black
                                  }}
                                  editable={true}
                                  onPressIn={() => setStartTimeVisibility({ ...startTimeVisibility, tuesdayVisibility: true })}
                                />
                              </View>
                              <View style={{
                                paddingHorizontal: 20,
                              }}>
                                <Text>to</Text>
                              </View>
                              <View>
                                <TextInput
                                  // label='Description'
                                  placeholder='12:00'
                                  placeholderTextColor={COLORS.gray}
                                  value={endTime.tuesday}
                                  mode='outlined'
                                  // onBlur={inputBio}
                                  onChangeText={(text) => setendTime({ ...endTime, tuesday: text })}
                                  activeOutlineColor={COLORS.light}
                                  outlineColor={COLORS.gray2}
                                  style={{
                                    width: 100,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    // justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.black
                                  }}
                                  editable={true}
                                  onPressIn={() => setEndTimeVisibility({ ...endTimeVisibility, tuesdayVisibility: true })}
                                />
                              </View>
                            </View>
                            <View>
                              <TouchableOpacity
                                onPress={() => { setCheckedindex({ ...checkedindex, tuesdayindex: null }), setChecked({ ...checked, tuesdayName: 'Will respond within 12 hours' }) }}>
                                <Cancle height={25} width={25} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        }
                      </View>
                    ))}
                  </>
                }
                {/* <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
                <View>
                  <Text>
                    Will respond within 12 hours
                  </Text>
                </View>
                <View>
                  <Add height={20} width={20} />
                </View>
              </View> */}
              </View>




              <View style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                elevation: 9,
                borderRadius: 10,
                marginBottom: 30,
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: COLORS.light,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>
                      Wednesday
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setdays({ ...days, wednesday: !days.wednesday })}>
                    <Add height={20} width={20} />
                  </TouchableOpacity>
                </View>
                {days.wednesday &&
                  <>
                    {monday.map((item, index) => (
                      <View key={index}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text>
                              {item.name}
                            </Text>
                          </View>
                          <View>
                            <RadioButton
                              value="Public"
                              status={checkedindex.wednesdayindex === index ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
                              onPress={() => onCheckWednesday(index)}//when pressed, set the value of the checked Hook to 'Apple'
                              color={COLORS.black}
                              uncheckedColor={COLORS.black}
                            />
                          </View>
                        </View>
                        {checked.wednesdayName == 'Select Time' && checkedindex.wednesdayindex == index &&
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 20,
                          }}>
                            <View style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              // justifyContent:'space-between',
                            }}>
                              <View>
                                <TextInput
                                  // label='Description'
                                  placeholder='4:00'
                                  placeholderTextColor={COLORS.gray}
                                  value={startTime.wednesday}
                                  mode='outlined'
                                  // onBlur={inputBio}
                                  onChangeText={(text) => setStartTime({ ...startTime, wednesday: text })}
                                  activeOutlineColor={COLORS.light}
                                  outlineColor={COLORS.gray2}
                                  style={{
                                    width: 100,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    // justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.black
                                  }}
                                  editable={true}
                                  onPressIn={() => setStartTimeVisibility({ ...startTimeVisibility, wednesdayVisibility: true })}
                                />
                              </View>
                              <View style={{
                                paddingHorizontal: 20,
                              }}>
                                <Text>to</Text>
                              </View>
                              <View>
                                <TextInput
                                  // label='Description'
                                  placeholder='12:00'
                                  placeholderTextColor={COLORS.gray}
                                  value={endTime.wednesday}
                                  mode='outlined'
                                  // onBlur={inputBio}
                                  onChangeText={(text) => setendTime({ ...endTime, wednesday: text })}
                                  activeOutlineColor={COLORS.light}
                                  outlineColor={COLORS.gray2}
                                  style={{
                                    width: 100,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    // justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.black
                                  }}
                                  onPressIn={() => setEndTimeVisibility({ ...endTimeVisibility, wednesdayVisibility: true })}
                                />
                              </View>
                            </View>
                            <View>
                              <TouchableOpacity
                                onPress={() => { setCheckedindex({ ...checkedindex, wednesdayindex: null }), setChecked({ ...checked, wednesdayName: 'Will respond within 12 hours' }) }}>
                                <Cancle height={25} width={25} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        }
                      </View>
                    ))}
                  </>
                }
                {/* <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
                <View>
                  <Text>
                    Will respond within 12 hours
                  </Text>
                </View>
                <View>
                  <Add height={20} width={20} />
                </View>
              </View> */}
              </View>




              <View style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                elevation: 9,
                borderRadius: 10,
                marginBottom: 30,
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: COLORS.light,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>
                      Thursday
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setdays({ ...days, thursday: !days.thursday })}>
                    <Add height={20} width={20} />
                  </TouchableOpacity>
                </View>
                {days.thursday &&
                  <>
                    {monday.map((item, index) => (
                      <View key={index}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text>
                              {item.name}
                            </Text>
                          </View>
                          <View>
                            <RadioButton
                              value="Public"
                              status={checkedindex.thursdayindex === index ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
                              onPress={() => onCheckThursday(index)}//when pressed, set the value of the checked Hook to 'Apple'
                              color={COLORS.black}
                              uncheckedColor={COLORS.black}
                            />
                          </View>
                        </View>
                        {checked.thursdayName == 'Select Time' && checkedindex.thursdayindex == index &&
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 20,
                          }}>
                            <View style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              // justifyContent:'space-between',
                            }}>
                              <View>
                                <TextInput
                                  // label='Description'
                                  placeholder='4:00'
                                  placeholderTextColor={COLORS.gray}
                                  value={startTime.thursday}
                                  mode='outlined'
                                  // onBlur={inputBio}
                                  onChangeText={(text) => setStartTime({ ...startTime, thursday: text })}
                                  activeOutlineColor={COLORS.light}
                                  outlineColor={COLORS.gray2}
                                  style={{
                                    width: 100,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    // justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.black
                                  }}
                                  editable={true}
                                  onPressIn={() => setStartTimeVisibility({ ...startTimeVisibility, thursdayVisibility: true })}
                                />
                              </View>
                              <View style={{
                                paddingHorizontal: 20,
                              }}>
                                <Text>to</Text>
                              </View>
                              <View>
                                <TextInput
                                  // label='Description'
                                  placeholder='12:00'
                                  placeholderTextColor={COLORS.gray}
                                  value={endTime.thursday}
                                  mode='outlined'
                                  // onBlur={inputBio}
                                  onChangeText={(text) => setendTime({ ...endTime, thursday: text })}
                                  activeOutlineColor={COLORS.light}
                                  outlineColor={COLORS.gray2}
                                  style={{
                                    width: 100,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    // justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.black
                                  }}
                                  onPressIn={() => setEndTimeVisibility({ ...endTimeVisibility, thursdayVisibility: true })}
                                />
                              </View>
                            </View>
                            <View>
                              <TouchableOpacity
                                onPress={() => { setCheckedindex({ ...checkedindex, thursdayindex: null }), setChecked({ ...checked, thursdayName: 'Will respond within 12 hours' }) }}>
                                <Cancle height={25} width={25} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        }
                      </View>
                    ))}
                  </>
                }
                {/* <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
                <View>
                  <Text>
                    Will respond within 12 hours
                  </Text>
                </View>
                <View>
                  <Add height={20} width={20} />
                </View>
              </View> */}
              </View>




              <View style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                elevation: 9,
                borderRadius: 10,
                marginBottom: 30,
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: COLORS.light,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>
                      Friday
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setdays({ ...days, friday: !days.friday })}>
                    <Add height={20} width={20} />
                  </TouchableOpacity>
                </View>
                {days.friday &&
                  <>
                    {monday.map((item, index) => (
                      <View key={index}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text>
                              {item.name}
                            </Text>
                          </View>
                          <View>
                            <RadioButton
                              value="Public"
                              status={checkedindex.fridayindex === index ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
                              onPress={() => onCheckFriday(index)}//when pressed, set the value of the checked Hook to 'Apple'
                              color={COLORS.black}
                              uncheckedColor={COLORS.black}
                            />
                          </View>
                        </View>
                        {checked.fridayName == 'Select Time' && checkedindex.fridayindex == index &&
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 20,
                          }}>
                            <View style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              // justifyContent:'space-between',
                            }}>
                              <View>
                                <TextInput
                                  // label='Description'
                                  placeholder='4:00'
                                  placeholderTextColor={COLORS.gray}
                                  value={startTime.friday}
                                  mode='outlined'
                                  // onBlur={inputBio}
                                  onChangeText={(text) => setStartTime({ ...startTime, friday: text })}
                                  activeOutlineColor={COLORS.light}
                                  outlineColor={COLORS.gray2}
                                  style={{
                                    width: 100,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    // justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.black
                                  }}
                                  editable={true}
                                  onPressIn={() => setStartTimeVisibility({ ...startTimeVisibility, fridayVisibility: true })}
                                />
                              </View>
                              <View style={{
                                paddingHorizontal: 20,
                              }}>
                                <Text>to</Text>
                              </View>
                              <View>
                                <TextInput
                                  // label='Description'
                                  placeholder='12:00'
                                  placeholderTextColor={COLORS.gray}
                                  value={endTime.friday}
                                  mode='outlined'
                                  // onBlur={inputBio}
                                  onChangeText={(text) => setendTime({ ...endTime, friday: text })}
                                  activeOutlineColor={COLORS.light}
                                  outlineColor={COLORS.gray2}
                                  style={{
                                    width: 100,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    // justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.black
                                  }}
                                  onPressIn={() => setEndTimeVisibility({ ...endTimeVisibility, fridayVisibility: true })}
                                />
                              </View>
                            </View>
                            <View>
                              <TouchableOpacity
                                onPress={() => { setCheckedindex({ ...checkedindex, fridayindex: null }), setChecked({ ...checked, fridayName: 'Will respond within 12 hours' }) }}>
                                <Cancle height={25} width={25} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        }
                      </View>
                    ))}
                  </>
                }
                {/* <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
                <View>
                  <Text>
                    Will respond within 12 hours
                  </Text>
                </View>
                <View>
                  <Add height={20} width={20} />
                </View>
              </View> */}
              </View>




              <View style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                elevation: 9,
                borderRadius: 10,
                marginBottom: 30,
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: COLORS.light,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>
                      Saturday
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setdays({ ...days, saturday: !days.saturday })}>
                    <Add height={20} width={20} />
                  </TouchableOpacity>
                </View>
                {days.saturday &&
                  <>
                    {monday.map((item, index) => (
                      <View key={index}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text>
                              {item.name}
                            </Text>
                          </View>
                          <View>
                            <RadioButton
                              value="Public"
                              status={checkedindex.saturdayindex === index ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
                              onPress={() => onCheckSaturday(index)}//when pressed, set the value of the checked Hook to 'Apple'
                              color={COLORS.black}
                              uncheckedColor={COLORS.black}
                            />
                          </View>
                        </View>
                        {checked.saturdayName == 'Select Time' && checkedindex.saturdayindex == index &&
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 20,
                          }}>
                            <View style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              // justifyContent:'space-between',
                            }}>
                              <View>
                                <TextInput
                                  // label='Description'
                                  placeholder='4:00'
                                  placeholderTextColor={COLORS.gray}
                                  value={startTime.saturday}
                                  mode='outlined'
                                  // onBlur={inputBio}
                                  onChangeText={(text) => setStartTime({ ...startTime, saturday: text })}
                                  activeOutlineColor={COLORS.light}
                                  outlineColor={COLORS.gray2}
                                  style={{
                                    width: 100,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    // justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.black
                                  }}
                                  editable={true}
                                  onPressIn={() => setStartTimeVisibility({ ...startTimeVisibility, saturdayVisibility: true })}
                                />
                              </View>
                              <View style={{
                                paddingHorizontal: 20,
                              }}>
                                <Text>to</Text>
                              </View>
                              <View>
                                <TextInput
                                  // label='Description'
                                  placeholder='12:00'
                                  placeholderTextColor={COLORS.gray}
                                  value={endTime.saturday}
                                  mode='outlined'
                                  // onBlur={inputBio}
                                  onChangeText={(text) => setendTime({ ...endTime, saturday: text })}
                                  activeOutlineColor={COLORS.light}
                                  outlineColor={COLORS.gray2}
                                  style={{
                                    width: 100,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    // justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.black
                                  }}
                                  onPressIn={() => setEndTimeVisibility({ ...endTimeVisibility, saturdayVisibility: true })}
                                />
                              </View>
                            </View>
                            <View>
                              <TouchableOpacity
                                onPress={() => { setCheckedindex({ ...checkedindex, saturdayindex: null }), setChecked({ ...checked, saturdayName: 'Will respond within 12 hours' }) }}>
                                <Cancle height={25} width={25} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        }
                      </View>
                    ))}
                  </>
                }
                {/* <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
                <View>
                  <Text>
                    Will respond within 12 hours
                  </Text>
                </View>
                <View>
                  <Add height={20} width={20} />
                </View>
              </View> */}
              </View>




              <View style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                elevation: 9,
                borderRadius: 10,
                marginBottom: 30,
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: COLORS.light,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>
                      Sunday
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setdays({ ...days, sunday: !days.sunday })}>
                    <Add height={20} width={20} />
                  </TouchableOpacity>
                </View>
                {days.sunday &&
                  <>
                    {monday.map((item, index) => (
                      <View key={index}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text>
                              {item.name}
                            </Text>
                          </View>
                          <View>
                            <RadioButton
                              value="Public"
                              status={checkedindex.sundayindex === index ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
                              onPress={() => onCheckSunday(index)}//when pressed, set the value of the checked Hook to 'Apple'
                              color={COLORS.black}
                              uncheckedColor={COLORS.black}
                            />
                          </View>
                        </View>
                        {checked.sundayName == 'Select Time' && checkedindex.sundayindex == index &&
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 20,
                          }}>
                            <View style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              // justifyContent:'space-between',
                            }}>
                              <View>
                                <TextInput
                                  // label='Description'
                                  placeholder='4:00'
                                  placeholderTextColor={COLORS.gray}
                                  value={startTime.sunday}
                                  mode='outlined'
                                  // onBlur={inputBio}
                                  onChangeText={(text) => setStartTime({ ...startTime, sunday: text })}
                                  activeOutlineColor={COLORS.light}
                                  outlineColor={COLORS.gray2}
                                  style={{
                                    width: 100,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    // justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.black
                                  }}
                                  editable={true}
                                  onPressIn={() => setStartTimeVisibility({ ...startTimeVisibility, sundayVisibility: true })}
                                />
                              </View>
                              <View style={{
                                paddingHorizontal: 20,
                              }}>
                                <Text>to</Text>
                              </View>
                              <View>
                                <TextInput
                                  // label='Description'
                                  placeholder='12:00'
                                  placeholderTextColor={COLORS.gray}
                                  value={endTime.sunday}
                                  mode='outlined'
                                  // onBlur={inputBio}
                                  onChangeText={(text) => setendTime({ ...endTime, sunday: text })}
                                  activeOutlineColor={COLORS.light}
                                  outlineColor={COLORS.gray2}
                                  style={{
                                    width: 100,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    // justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.black
                                  }}
                                  onPressIn={() => setEndTimeVisibility({ ...endTimeVisibility, sundayVisibility: true })}
                                />
                              </View>
                            </View>
                            <View>
                              <TouchableOpacity
                                onPress={() => { setCheckedindex({ ...checkedindex, sundayindex: null }), setChecked({ ...checked, sundayName: 'Will respond within 12 hours' }) }}>
                                <Cancle height={25} width={25} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        }
                      </View>
                    ))}
                  </>
                }
              </View>

              <View style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginBottom: 50
              }}>
                <View style={{
                  marginRight: 10
                }}>
                  <CustomeButton width={170} title={'Cancel'} bcolor={COLORS.white} border={COLORS.gray2} />
                </View>
                {!uploading == true ?
                  <CustomeButton width={170} title={'Save Changes'} onpress={() => OnSendTimings()} />
                  :
                  <CustomeButton width={170} title={'Please wait...'} onpress={() => OnCancle()} />
                }
              </View>
            </ScrollView>
          </View>
          :
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
              alignItems: 'center',
              height: height / 1.2,
              // backgroundColor:COLORS.gray
            }}>
              <View style={{
                paddingTop: 20,
              }}>
                <Image source={require('../../../../assets/notebrain.png')} resizeMode='contain' style={{
                  height: height / 4.5,
                  // width:100,
                }} />
              </View>
              <View style={{
                paddingTop: 30,
              }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLORS.black
                }}>Write notes for Brian</Text>
              </View>
              <View style={{
                paddingTop: 20,
              }}>
                <TextInput
                  // label='Description'
                  placeholder='Type Here!'
                  placeholderTextColor={COLORS.gray}
                  value={notes}
                  mode='outlined'
                  multiline
                  numberOfLines={4}
                  error={inputNotes}
                  // onBlur={inputBio}
                  onChangeText={(notes) => setNotes(notes)}
                  onFocus={() => setInputNotes(false)}
                  activeOutlineColor={COLORS.light}
                  outlineColor={COLORS.gray2}
                  style={styles.TextInput}
                />
              </View>
              <View style={{
                paddingTop: 20
              }}>
                <CustomeButton title={'Submit'} bcolor={COLORS.main} onpress={() => onSendNotes()} />
              </View>
            </View>

          </ScrollView>
        }
        <DateTimePickerModal
          isVisible={startTimeVisibility.mondayVisibility}
          mode="time"
          // display='spinner'
          onConfirm={handleMondaystartTime}
          onCancel={() => setStartTimeVisibility({ ...startTimeVisibility, mondayVisibility: false })}
        />
        <DateTimePickerModal
          isVisible={endTimeVisibility.mondayVisibility}
          mode="time"
          // display='spinner'  
          onConfirm={handleMondayendTime}
          onCancel={() => setEndTimeVisibility({ ...endTimeVisibility, mondayVisibility: false })}
        />
        <DateTimePickerModal
          isVisible={startTimeVisibility.tuesdayVisibility}
          mode="time"
          // display='spinner'  
          onConfirm={handleTuesdaystartTime}
          onCancel={() => setStartTimeVisibility({ ...startTimeVisibility, tuesdayVisibility: false })}
        />
        <DateTimePickerModal
          isVisible={endTimeVisibility.tuesdayVisibility}
          mode="time"
          // display='spinner'  
          onConfirm={handleTuesdayEndTime}
          onCancel={() => setEndTimeVisibility({ ...endTimeVisibility, tuesdayVisibility: false })}
        />
        <DateTimePickerModal
          isVisible={startTimeVisibility.wednesdayVisibility}
          mode="time"
          // display='spinner'  
          onConfirm={handleWednesdaystartTime}
          onCancel={() => setStartTimeVisibility({ ...startTimeVisibility, wednesdayVisibility: false })}
        />
        <DateTimePickerModal
          isVisible={endTimeVisibility.wednesdayVisibility}
          mode="time"
          // display='spinner'  
          onConfirm={handleWednesdayEndTime}
          onCancel={() => setEndTimeVisibility({ ...endTimeVisibility, wednesdayVisibility: false })}
        />
        <DateTimePickerModal
          isVisible={startTimeVisibility.thursdayVisibility}
          mode="time"
          // display='spinner'  
          onConfirm={handleThursdaystartTime}
          onCancel={() => setStartTimeVisibility({ ...startTimeVisibility, thursdayVisibility: false })}
        />
        <DateTimePickerModal
          isVisible={endTimeVisibility.thursdayVisibility}
          mode="time"
          // display='spinner'  
          onConfirm={handleThursdayEndTime}
          onCancel={() => setEndTimeVisibility({ ...endTimeVisibility, thursdayVisibility: false })}
        />
        <DateTimePickerModal
          isVisible={startTimeVisibility.fridayVisibility}
          mode="time"
          // display='spinner'  
          onConfirm={handleFridaystartTime}
          onCancel={() => setStartTimeVisibility({ ...startTimeVisibility, fridayVisibility: false })}
        />
        <DateTimePickerModal
          isVisible={endTimeVisibility.fridayVisibility}
          mode="time"
          // display='spinner'  
          onConfirm={handleFridayEndTime}
          onCancel={() => setEndTimeVisibility({ ...endTimeVisibility, fridayVisibility: false })}
        />
        <DateTimePickerModal
          isVisible={startTimeVisibility.saturdayVisibility}
          mode="time"
          // display='spinner'  
          onConfirm={handleSaturdaystartTime}
          onCancel={() => setStartTimeVisibility({ ...startTimeVisibility, saturdayVisibility: false })}
        />
        <DateTimePickerModal
          isVisible={endTimeVisibility.saturdayVisibility}
          mode="time"
          // display='spinner'  
          onConfirm={handleSaturdayEndTime}
          onCancel={() => setEndTimeVisibility({ ...endTimeVisibility, saturdayVisibility: false })}
        />
        <DateTimePickerModal
          isVisible={startTimeVisibility.sundayVisibility}
          mode="time"
          // display='spinner'  
          onConfirm={handleSundaystartTime}
          onCancel={() => setStartTimeVisibility({ ...startTimeVisibility, sundayVisibility: false })}
        />
        <DateTimePickerModal
          isVisible={endTimeVisibility.sundayVisibility}
          mode="time"
          // display='spinner'  
          onConfirm={handleSundayEndTime}
          onCancel={() => setEndTimeVisibility({ ...endTimeVisibility, sundayVisibility: false })}
        />

        <Loader modal={uploading} uploading={uploading} />
      </View>
    </SafeAreaView>
  )
}

export default ManageScreen

const styles = StyleSheet.create({
  contentContainer: {
    // borderRadius:50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:COLORS.black
  },
  TextInput: {
    // padding: 10,
    backgroundColor: COLORS.white,
    // color: COLORS.gray,

    width: 320,
    // borderRadius: 30,
    height: height / 4,
    textAlignVertical: 'top',
  },
})