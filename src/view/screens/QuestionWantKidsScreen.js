import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';


const WantKidData = [
  {
    id: '1',
    name: 'I want children',
  },
  {
    id: '2',
    name: 'I have children',
  },
  {
    id: '3',
    name: 'Have kids, open to having more',
  },
  {
    id: '4',
    name: 'I dont ever want children',
  },
  {
    id: '5',
    name: 'I want to adopt children',
  },
];


const QuestionWantKidsScreen = ({ navigation, route }) => {
  const { email, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender } = route.params;
  // console.log(email);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [kids, setKids] = useState();
  console.log(DateOfBirth);

  const onBioPress = () => {
    // console.log(WantKidData[selectedCategoryIndex].name);
    const selectedGender = WantKidData[selectedCategoryIndex].name;
    // console.log('test',selectedGender);
    navigation.navigate('QuestionBioScreen', { Kids: selectedGender, email: email, PartnerGender: PartnerGender, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender })
  }

  const onSkip = () => {
    // console.log(WantKidData[selectedCategoryIndex].name);
    // console.log('test',selectedGender);
    navigation.navigate('QuestionBioScreen', { Kids: null, email: email, PartnerGender: PartnerGender, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender })

  }

  const ListKids = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((gender, index) => (
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
                  {gender.name}
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
            alignItems: 'center',
            paddingTop: 20,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>Do you want kids?</Text>
          </View>

          <View style={{
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 12,
              color: COLORS.black
            }}>(Select all that apply)</Text>
          </View>
          <View>
            <ListKids data={WantKidData} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
          </View>
        </View>





        <View style={styles.footer}>
          <View style={{
            paddingTop: 20,
            // flexDirection: 'row',
            marginHorizontal: 20,
          }}>
            <View style={{ marginBottom: 5 }}>
              <CustomeButton onpress={() => onBioPress()}
                title={'Continue'} />
            </View>
            <View style={{ marginHorizontal: 0 }}>
              <CustomeButton onpress={() => onSkip()}
                title={'Skip'} bcolor={COLORS.light} />
            </View>

          </View>

          <View style={{
            // paddingTop: 20,
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

export default QuestionWantKidsScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '75%',
    alignItems: 'center',
  },
  footer: {
    height: '25%',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  NumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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