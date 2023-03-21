import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';

const IntroExtroData = [
  {
    id: '1',
    name: 'Introvert',
  },
  {
    id: '2',
    name: 'Extrovert',
  },
]


const QuestionIntroandExtroScreen = ({ navigation, route }) => {
  const { name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView } = route.params;
  // console.log(PartnerGender);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const onPIntroandExtro = () => {
    console.log(IntroExtroData[selectedCategoryIndex].name);
    const selectedPolitics = IntroExtroData[selectedCategoryIndex].name;
    if(selectedPolitics){
      navigation.navigate('QuestionPIntroandExtroScreen', { IntroandExtro: selectedPolitics, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else{
      ToastAndroid.show("Please select your nature!", ToastAndroid.SHORT);
    }
  }

  const ListIntroExtro = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {IntroExtroData.map((item, index) => (
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
                  {item.name}
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end',
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
            paddingTop: 40,
          }}>
            <Image source={require('../../assets/group.png')}
              resizeMode='contain' />
          </View>


          <View style={{
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>Are you Introverted or extroverted</Text>
          </View>

          <View>
            <ListIntroExtro data={IntroExtroData} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
          </View>
        </View>


        <View style={styles.footer}>

          <View style={{
            paddingTop: 60,
          }}>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton onpress={() => onPIntroandExtro()}
                title={'Continue'} />
            </View>
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


      </View>



    </SafeAreaView>
  )
}

export default QuestionIntroandExtroScreen

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
    height: '20%',
    alignItems: 'center'
  },
  NumberInput: {
    marginTop: 10,
    flexDirection: 'row',
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