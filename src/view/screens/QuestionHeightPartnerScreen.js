import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg1 from '../../assets/arrowleft.svg';



const QuestionHeightPartnerScreen = ({ navigation, route }) => {
  const { email, Height, PartnerDisability, Disability, DescribePartner, DescribeYou, languages, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [minHeight, setminHeight] = useState();
  const [maxHeight, setmaxHeight] = useState();
  const [heighType, setHeightType] = useState(false);
  const [heighType2, setHeightType2] = useState(false);


  const onMinHeight = (minHeight) => {
    let newText = '';
    let numbers = '0123456789.';

    for (var i = 0; i < minHeight.length; i++) {
      if (numbers.indexOf(minHeight[i]) > -1) {
        newText = newText + minHeight[i];
      }
      else {
        alert("please enter numbers only");
      }
    }
    setminHeight(newText);
  }
  const onMaxHeight = (maxHeight) => {
    let newText = '';
    let numbers = '0123456789.';

    for (var i = 0; i < maxHeight.length; i++) {
      if (numbers.indexOf(maxHeight[i]) > -1) {
        newText = newText + maxHeight[i];
      }
      else {
        alert("please enter numbers only");
      }
    }
    setmaxHeight(newText);
  }

  const onQuestionBuildTypeScreen = () => {
    if (minHeight || maxHeight) {
      // console.log(minHeight, maxHeight);
      if (heighType2 == true && heighType == true) {
        navigation.navigate('QuestionHairColorScreen', { PartnerMaxHeightType: 'Inches', PartnerMinHeightType: 'Inches', email: email, PartnerMaxHeight: maxHeight, PartnerMinHeight: minHeight, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
      }
      navigation.navigate('QuestionHairColorScreen', { PartnerMaxHeightType: 'feets', PartnerMinHeightType: 'feets', email: email, PartnerMaxHeight: maxHeight, PartnerMinHeight: minHeight, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please enter your partner expected Height!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    navigation.navigate('QuestionHairColorScreen', { PartnerMaxHeightType: null, email: email, PartnerMinHeightType: null, PartnerMaxHeight: null, PartnerMinHeight: null, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
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
                height: 200
              }} />
          </View>

          <View style={{
            paddingTop: 30,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              paddingHorizontal: 30,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Select the height Range you
              would be open to dating?
            </Text>
          </View>


          <View style={{
            paddingTop: 20,
          }}>
            <View style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={{ color: COLORS.black }}>Minimum</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setHeightType(!heighType)}>
                  <Image source={require('../../assets/HIcon.png')} resizeMode='contain'
                    style={{
                      width: 15,
                      height: 15,
                      marginRight: 2
                    }} />
                </TouchableOpacity>
                {heighType ?
                  <Text>Inches</Text>
                  :
                  <Text>feets</Text>
                }
              </View>
            </View>
            <TextInput
              value={heighType ? minHeight * 12 : minHeight}
              keyboardType='numeric'
              onChangeText={minHeight => onMinHeight(minHeight)}
              placeholder='Enter minimum height!'
              style={styles.TextInput} />
          </View>

          <View style={{
            paddingTop: 20,
          }}>
            <View style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={{ color: COLORS.black }}>Maximum</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setHeightType2(!heighType2)}>
                  <Image source={require('../../assets/HIcon.png')} resizeMode='contain'
                    style={{
                      width: 15,
                      height: 15,
                      marginRight: 2
                    }} />
                </TouchableOpacity>
                {heighType2 ?
                  <Text>Inches</Text>
                  :
                  <Text>feets</Text>
                }
              </View>
            </View>
            <TextInput
              keyboardType='numeric'
              value={heighType2 ? maxHeight * 12 : maxHeight}
              onChangeText={maxHeight => onMaxHeight(maxHeight)}
              placeholder='Enter maximum height!'
              style={styles.TextInput} />
          </View>


        </View>


        {/* <View style={styles.footer}> */}

        <View style={{
          paddingTop: 20,
          marginTop: '20%'
        }}>
          <View style={{
            marginBottom: 5
          }}>
            <CustomeButton onpress={() => onQuestionBuildTypeScreen()}
              title={'Continue'} />
          </View>

          <CustomeButton onpress={() => onSkip()}
            title={'Skip'} bcolor={COLORS.light} />
        </View>

        <View style={{
          paddingTop: 20,
          width: 310,
        }}>
          <Text style={{ textAlign: 'center', fontSize: 10 }}>
            By continue you agree our Terms and Privacy Policy.
          </Text>
        </View>
        {/* </View> */}


      </View>



    </SafeAreaView>
  )
}

export default QuestionHeightPartnerScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: '100%'

  },
  contentContainer: {
    // height: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    marginTop: '40%'
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
  },
})