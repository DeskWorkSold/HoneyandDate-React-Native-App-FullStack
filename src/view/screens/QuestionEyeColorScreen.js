import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';



const GenderData = [
  {
    id: '1',
    name: 'amber',
  },
  {
    id: '2',
    name: 'blue',
  },
  {
    id: '3',
    name: 'brown',
  },
  {
    id: '4',
    name: 'gray',
  },
  {
    id: '5',
    name: 'green',
  },
  {
    id: '6',
    name: 'hazel',
  },
  {
    id: '7',
    name: 'red',
  },
]


const QuestionEyeColorScreen = ({ navigation, route }) => {
  // const { name, image1, image2, image3, image4, image5, DateOfBirth } = route.params;
  const [gender, setGender] = useState();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [checked, setChecked] = React.useState('Apple'); //initial choice

  // console.log(DateOfBirth);

  const onLanguageScreen = () => {
    // console.log(GenderData[selectedCategoryIndex].name);
    const selectedGender = GenderData[selectedCategoryIndex].name;
    navigation.navigate('QuestionLanguageScreen')
    // navigation.navigate('QuestionYourInterestScreen', { Gender: selectedGender, DateOfBirth: DateOfBirth, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, })
  }


  const ListGender = ({ data, value, setValue, cancle }) => {
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
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>

            <View style={{
              paddingTop: 20,
              paddingHorizontal: 20
            }}>
              <Image source={require('../../assets/eyecolor.png')} resizeMode='contain' style={{
                width: 150,
                height: 200,
              }} />
            </View>


            <View style={{
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black
              }}>What color of eye do
                you have?</Text>
            </View>
            <View>
              <Text>
                You can select Multiple
              </Text>
            </View>


            <View>
              <ListGender data={GenderData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
            </View>

          </View>


          <View style={styles.footer}>

            <View style={{
              paddingTop: 100,
              // flexDirection: 'row',
            }}>
              <View style={{
                marginBottom:10,
              }}>
                <CustomeButton onpress={() => onLanguageScreen()}
                  title={'Continue'} />
              </View>
              <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => SkipScreen()}
                  title={'Skip'} bcolor={COLORS.light} />
              </View>
            </View>

            <View style={{
              paddingTop: 5,
              width: 310,
              paddingBottom: 20
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

export default QuestionEyeColorScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // height: '75%',
    // backgroundColor: COLORS.black,
    alignItems: 'center',
  },
  footer: {
    height: '25%',
    alignItems: 'center',
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