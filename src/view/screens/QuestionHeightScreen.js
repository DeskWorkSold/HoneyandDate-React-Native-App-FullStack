import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg1 from '../../assets/arrowleft.svg';
import Slider from '@react-native-community/slider';



const QuestionHeightScreen = ({ navigation, route }) => {
  const { email, PartnerDisability, Disability, DescribePartner, DescribeYou, languages, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [height, setHeight] = useState(0);
  const [heighType, setHeightType] = useState(false);


  // console.log(
  //   PartnerDisability, Disability, DescribePartner, DescribeYou, languages, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername 
  // );


  const onHeight = (height) => {
    let newText = '';
    let numbers = '0123456789.';
    for (var i = 0; i < height.length; i++) {
      if (numbers.indexOf(height[i]) > -1) {
        newText = newText + height[i];
      }
      else {
        alert("please enter numbers only");
      }
    }
    setHeight(newText);
  }

  const onQuestionHeightPartnerScreen = () => {
    if (height) {
      const data2 = Math.round(height * 10) / 10
      // console.log(height);
      // console.log(data2);
      // return
      navigation.navigate('QuestionHeightPartnerScreen', { Height: data2, email: email, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your Height!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    if (height) {
      navigation.navigate('QuestionHeightPartnerScreen', { Height: null, email: email, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your Height!", ToastAndroid.SHORT);
    }
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20,
            flexDirection: 'row',
            height: 40,
            justifyContent: 'center',
            paddingHorizontal: 20,

          }}>
            <View style={{
              flex: 1,
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
          </View>

          <View style={{
            paddingTop: 0
          }}>
            <Image source={require('../../assets/height.png')}
              resizeMode='contain' style={{
                height: 230
              }} />
          </View>

          <View style={{
            paddingTop: 20,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              paddingHorizontal: 30,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Your Height?
            </Text>
          </View>

          <View style={{ paddingTop: 20 }}>
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 30,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              {heighType ?
                <>
                  <View>
                    <Text>{(Math.floor(height * 10) / 10) * 12} Inches</Text>
                  </View>
                  <TouchableOpacity onPress={() => setHeightType(!heighType)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                    <Image source={require('../../assets/HIcon.png')} resizeMode='contain'
                      style={{
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }} />
                    <Text>
                      Inches
                    </Text>
                  </TouchableOpacity>
                </>
                :
                <>
                  <View>
                    <Text>
                      {Math.round(height * 10) / 10} ft
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => setHeightType(!heighType)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                    <Image source={require('../../assets/HIcon.png')} resizeMode='contain'
                      style={{
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }} />
                    <Text>
                      feets
                    </Text>
                  </TouchableOpacity>
                </>
              }
            </View>
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Slider
                style={{ width: '100%', height: 40, }}
                minimumValue={0}
                maximumValue={50}
                thumbTouchSize={{
                  width: 40, height: 40
                }}
                thumbTintColor={COLORS.main}
                minimumTrackTintColor={COLORS.main}
                maximumTrackTintColor={COLORS.gray}
                onValueChange={(value) => setHeight(value)}
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}>

          <View style={{
            marginBottom: 5
          }}>
            <CustomeButton onpress={() => onQuestionHeightPartnerScreen()}
              title={'Continue'} />
          </View>
          <CustomeButton bcolor={COLORS.light} onpress={() => onSkip()}
            title={'Skip'} />

          <View style={{
            paddingTop: 10,
            // width: 310,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>


      </View>



    </SafeAreaView>
  )
}

export default QuestionHeightScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,

  },
  contentContainer: {
    height: '80%',
    alignItems: 'center',
  },
  footer: {
    height: '20%'
    // marginTop: '40%'
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.light,
    color: COLORS.gray,
    width: 320,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
})