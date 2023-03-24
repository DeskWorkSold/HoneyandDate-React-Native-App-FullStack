import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';

const Education = [
  {
    id: '1',
    name: 'High School',
  },
  {
    id: '2',
    name: 'Some Collage',
  },
  {
    id: '3',
    name: 'Bachelors',
  },
  {
    id: '4',
    name: 'Master',
  },
  {
    id: '5',
    name: 'Trade School',
  },
  {
    id: '6',
    name: 'Graduation',
  },
  {
    id: '7',
    name: 'Other',
  },
  {
    id: '8',
    name: 'Prefer not say',
  }
]



const QuestionEducationScreen = ({ navigation, route }) => {
  const { Interest, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);



  const onRelationshipScreen = () => {
    const selectitem = Education[selectedCategoryIndex].name;
    console.log(selectitem);
    if (selectitem) {
      // const Occupation = occupation;
      navigation.navigate('QuestionRelationshipScreen', { Education: selectitem, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your interest!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    navigation.navigate('QuestionRelationshipScreen', { Education: null, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }

  const ListEducation = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setValue(index)}>
            <View style={{
              backgroundColor: value == index ? COLORS.main : COLORS.transparent,
              ...styles.NumberInput
            }}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>
                  {TypeTestimonial.name}
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {value == index ? (
                  <SVGImg width={20} height={20} />
                ) : (<View></View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

      </View>
    )
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

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
            </View>
            <View style={{
              flex: 1,
              backgroundColor: COLORS.gray2
            }}>
            </View>
          </View>

          <View style={{
            paddingTop: 0,
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/education.png')} resizeMode='contain' style={{
              width: 150,
              height: 200,
            }} />
          </View>


          <View style={{
            alignItems: 'center',
            paddingBottom: 10
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>What is your Education?</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{
              alignItems: 'center'
            }}>
              <ListEducation data={Education} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
            </View>


            <View style={{
              alignItems: 'center',
              paddingBottom: 5,
              paddingBottom:10
            }}>
              <View style={{
                paddingTop: 50,
              }}>
                <CustomeButton onpress={() => onRelationshipScreen()}
                  title={'Continue'} />
              </View>
              <View style={{
                paddingTop: 10,
              }}>
                <CustomeButton onpress={() => onSkip()}
                  title={'Skip'}  bcolor={COLORS.light} />
              </View>

              <View style={{
                paddingTop: 5,
                width: 310,
              }}>
                <Text style={{ textAlign: 'center', fontSize: 10 }}>
                  By continue you agree our Terms and Privacy Policy.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>



    </SafeAreaView>
  )
}


export default QuestionEducationScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // alignItems: 'center',
  },
  footer: {
    alignItems: 'center'
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: 45,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})