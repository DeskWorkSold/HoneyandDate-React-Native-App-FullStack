import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg1 from '../../assets/arrowleft.svg';



const QuestionDealBreakandMakeScreen = ({ navigation, route }) => {
  const { email, Firstrefname, FirstRefemail, FirstRefnumber, Secrefname, SecRefemail, SecRefnumber, PartnerBuildType, BuildType, EyeColor, HairColor, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, PartnerDisability, Disability, DescribePartner, DescribeYou, languages, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [dealBreaker, setdealBreaker] = useState();
  const [dealMaker, setdealMaker] = useState();

  // console.log(Firstrefname, FirstRefemail, FirstRefnumber, Secrefname, SecRefemail, SecRefnumber, PartnerBuildType, BuildType, EyeColor, HairColor, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, PartnerDisability, Disability, DescribePartner, DescribeYou, languages, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername );

  const onPartnerConditionScreen = () => {
    if (!dealBreaker || !dealMaker) {
      if (!dealBreaker) {
        ToastAndroid.show("Please enter major deal breakers!", ToastAndroid.SHORT);
      }
      else if (!dealMaker) {
        ToastAndroid.show("Please enter major deal makers!", ToastAndroid.SHORT);
      }
    }
    else {
      // console.log(dealBreaker, dealMaker);
      navigation.navigate('QuestionPartnerConditionScreen', { DealBreaker: dealBreaker, email: email, DealMakers: dealMaker, Firstrefname: Firstrefname, FirstRefemail: FirstRefemail, FirstRefnumber: FirstRefnumber, Secrefname: Secrefname, SecRefemail: SecRefemail, SecRefnumber: SecRefnumber, PartnerBuildType: PartnerBuildType, BuildType: BuildType, EyeColor: EyeColor, HairColor: HairColor, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
  }


  const onSkipScreen = () => {
    console.log('Skip Screen');
    navigation.navigate('QuestionPartnerConditionScreen', { DealBreaker: null, email: email, DealMakers: null, Firstrefname: Firstrefname, FirstRefemail: FirstRefemail, FirstRefnumber: FirstRefnumber, Secrefname: Secrefname, SecRefemail: SecRefemail, SecRefnumber: SecRefnumber, PartnerBuildType: PartnerBuildType, BuildType: BuildType, EyeColor: EyeColor, HairColor: HairColor, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }



  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>



        <View style={styles.contentContainer}>

          <View style={{
            alignItems: 'center',
            paddingTop: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <View style={{
              flex: 1,
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
            <View style={{
              flex: 2,
              flexDirection: "row",
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/notify.png')} resizeMode='contain'
                style={{
                  width: 15,
                  height: 15,
                }} />
              <Text style={{
                color: COLORS.black,
                marginLeft: 5
              }}>Response is Not Public</Text>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'flex-end'
            }}>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{
              alignItems: 'center'
            }}>
              <View style={{
                paddingTop: 20,
                alignItems: 'center'
              }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLORS.black
                }}>Major deal Breakers</Text>
              </View>

              <View style={{
                paddingTop: 20,
              }}>
                <TextInput
                  placeholder='Type Here!'
                  multiline
                  value={dealBreaker}
                  onChangeText={dealBreaker => setdealBreaker(dealBreaker)}
                  numberOfLines={8}
                  style={styles.TextInput} />
              </View>
            </View>


            <View style={{
              alignItems: 'center'
            }}>
              <View style={{
                paddingTop: 20,
                alignItems: 'center'
              }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLORS.black
                }}>Major deal Makers</Text>
              </View>

              <View style={{
                paddingTop: 20,
              }}>
                <TextInput
                  placeholder='Type Here!'
                  multiline
                  numberOfLines={8}
                  value={dealMaker}
                  onChangeText={dealMaker => setdealMaker(dealMaker)}
                  style={styles.TextInput} />
              </View>
            </View>




            <View style={{ paddingTop: 80 }}>

              <View style={{
                // flexDirection: 'row'
                paddingBottom: 40
              }}>
                <View style={{ marginBottom: 5 }}>
                  <CustomeButton onpress={() => onPartnerConditionScreen()}
                    title={'Continue'} />
                </View>
                <View style={{ marginHorizontal: 0 }}>
                  <CustomeButton onpress={() => onSkipScreen()}
                    title={'Skip'} bcolor={COLORS.light} />
                </View>
                <View style={{
                  paddingTop: 5,
                  // width: 310,
                  alignItems: 'center'
                }}>
                  <Text style={{ textAlign: 'center', fontSize: 10 }}>
                    By continue you agree our Terms and Privacy Policy.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

      </View>



    </SafeAreaView>
  )
}

export default QuestionDealBreakandMakeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: '100%'

  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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