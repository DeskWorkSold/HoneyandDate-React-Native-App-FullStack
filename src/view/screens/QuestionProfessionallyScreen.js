import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/notify.svg';
import SVGImg1 from '../../assets/arrowleft.svg';


const QuestionProfessionallyScreen = ({ navigation, route }) => {
  const { email, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio } = route.params;
  const [experince, setExperince] = useState();
  const [experince2, setExperince2] = useState();
  // console.log(DateOfBirth);

  const onMusicSelect = () => {
    if (experince && experince2) {
      console.log(experince, experince2);
      navigation.navigate('QuestionPartnerAge', {
        Experince: experince, email: email, InTenYear: experince2, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids
      })
    }
    else {
      ToastAndroid.show("Please enter both experinces!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    navigation.navigate('QuestionPartnerAge', {
      Experince: null, email: email, InTenYear: null, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids
    })
  }

  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.contentContainer}>

            <View style={{
              alignItems: 'center',
              paddingTop: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              paddingHorizontal: 20,

            }}>
              <View style={{
                flex: 1,
                // backgroundColor: COLORS.gray2
              }}>
                <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
              </View>
              <View style={{
                flex: 2,
                // backgroundColor: COLORS.gray,
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 20
              }}>
                <SVGImg width={19} height={19} />
                <Text style={{
                  color: COLORS.black,
                  paddingLeft: 5,
                  textAlign: 'center'
                }}>Response is Not Public</Text>
              </View>
              <View style={{
                flex: 1,
                backgroundColor: COLORS.gray2
              }}>
              </View>
            </View>


            <View style={{
              alignItems: 'center',
              paddingHorizontal: 50,
              paddingTop: 20,
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black,
                textAlign: 'center',
              }}>Where do you see yourself professionally and personally in five years?</Text>
            </View>

            <View style={{
              paddingTop: 20,
            }}>
              <TextInput
                placeholder='Type Here!'
                multiline
                value={experince}
                numberOfLines={4}
                onChangeText={experince => setExperince(experince)}
                style={styles.TextInput} />
            </View>


            <View style={{
              alignItems: 'center',
              paddingHorizontal: 50,
              paddingTop: 20,
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black,
                textAlign: 'center',
              }}>Where do you see yourself
                professionally  and personally
                in ten years?</Text>
            </View>

            <View style={{
              paddingTop: 20,
            }}>
              <TextInput
                placeholder='Type Here!'
                multiline
                value={experince2}
                numberOfLines={4}
                onChangeText={experince2 => setExperince2(experince2)}
                style={styles.TextInput} />
            </View>

          </View>

          <View style={styles.footer}>

            <View style={{
              paddingTop: 20,
              // flexDirection: 'row'
            }}>
              <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => onMusicSelect()}
                  title={'Continue'} />
              </View>
              <View>
                <CustomeButton onpress={() => onSkip()}
                  title={'Skip'} bcolor={COLORS.light} />
              </View>
            </View>

            <View style={{
              paddingTop: 10,
            }}>
              <Text style={{ textAlign: 'center', fontSize: 10 }}>
                By continue you agree our Terms and Privacy Policy.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>



    </SafeAreaView>
  )
}

export default QuestionProfessionallyScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // height: '75%',
    alignItems: 'center',
  },
  footer: {
    marginTop: 20,
    // height: '25%',
    alignItems: 'center'
  },
  NumberInput: {
    marginTop: 20,
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: 45,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 10,
    backgroundColor: COLORS.light,
    color: COLORS.gray,
    width: 320,
    borderRadius: 10,
    height: 100,
    textAlignVertical: 'top',
  },
})