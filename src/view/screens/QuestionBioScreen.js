import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, Alert, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg1 from '../../assets/arrowleft.svg';
const { width, height } = Dimensions.get("window");


const QuestionBioScreen = ({ navigation, route }) => {
  const { email, Kids, PartnerGender, name, image1, image2, image3, image4, image5, DateOfBirth, Gender } = route.params;
  const [bio, setbio] = useState();
  // console.log(email);

  const onQuestionProfessionally = () => {
    if (bio) {
      // console.log('bio', bio);
      navigation.navigate('QuestionProfessionallyScreen', {
        Bio: bio, email: email, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids
      })
    }
    else {
      // Alert.alert('please enter bio')
      console.log('not found');
      ToastAndroid.show("Please enter your bio!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    // console.log(WantKidData[selectedCategoryIndex].name);
    // console.log('test',selectedGender);
    navigation.navigate('QuestionProfessionallyScreen', {
      Bio: null, email: email, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids
    })

  }

  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.contentContainer}>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              flexDirection: 'row',
              height: 40,
              justifyContent: 'center',
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
              </View>
              <View style={{
                flex: 1,
                backgroundColor: COLORS.gray2
              }}>
              </View>
            </View>

            <View style={{
              paddingTop: 0
            }}>
              <Image source={require('../../assets/bio.png')}
                resizeMode='contain' style={{
                  width: width / 1.6
                }} />
            </View>


            <View style={{
              paddingTop: 10,
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.black
              }}>Public Bio</Text>
            </View>


            <View style={{
              alignItems: 'center'
            }}>
              <Text style={{
                color: COLORS.black
              }}>(200 Characters)</Text>
            </View>

            <View style={{
              paddingTop: 20,
            }}>
              <TextInput
                placeholder='Type Here!'
                multiline
                numberOfLines={8}
                value={bio}
                onChangeText={bio => setbio(bio)}
                style={styles.TextInput} />
            </View>


          </View>


          <View style={styles.footer}>

            <View style={{
              marginBottom: 5,
            }}>
              <CustomeButton onpress={() => onQuestionProfessionally()}
                title={'Continue'} />
            </View>
            <View style={{ marginHorizontal: 0 }}>
              <CustomeButton onpress={() => onSkip()}
                title={'Skip'} bcolor={COLORS.light} />
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

export default QuestionBioScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,

  },
  contentContainer: {
    // height: '70%',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  footer: {
    // height: '30%',
    marginTop: 20
  },
  NumberInput: {
    marginTop: 60,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 20
  },
  TextInput: {
    padding: 10,
    backgroundColor: COLORS.light,
    color: COLORS.gray,
    width: 320,
    borderRadius: 10,
    height: 200,
    textAlignVertical: 'top',
  },
})