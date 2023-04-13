import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';



const GenderData = [
  {
    id: '1',
    name: 'Male',
  },
  {
    id: '2',
    name: 'Female',
  },
  {
    id: '3',
    name: 'Non binaray',
  },
  {
    id: '4',
    name: 'Trans Male to Female',
  },
  {
    id: '5',
    name: 'Trans Female to Male',
  },
]


const QuestionGenderScreen = ({ navigation, route }) => {
  const { name, image1, image2, image3, image4, image5, DateOfBirth } = route.params;
  const [gender, setGender] = useState();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [checked, setChecked] = React.useState('Apple'); //initial choice

  console.log(DateOfBirth);

  const onQuestionYourInterestScreen = () => {
    console.log(GenderData[selectedCategoryIndex].name);
    const selectedGender = GenderData[selectedCategoryIndex].name;
    navigation.navigate('QuestionYourInterestScreen', { Gender: selectedGender, DateOfBirth: DateOfBirth, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, })
  }
  const SkipScreen = () => {
    console.log(GenderData[selectedCategoryIndex].name);
    const selectedGender = GenderData[selectedCategoryIndex].name;
    navigation.navigate('QuestionYourInterestScreen', { Gender: null, DateOfBirth: DateOfBirth, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, })
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
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={{
          alignItems: 'center',
          // justifyContent:'center',
          paddingTop: 20,
          flexDirection: 'row',
          height:40,
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

        <View style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
              paddingTop: 0,
              alignItems:'center'
            }}>
              <Image source={require('../../assets/gender.png')} resizeMode='contain' style={{
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
              }}>What do you identify as?</Text>
            </View>


            {/* <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>Enter the full name</Text>
          </View> */}

            <View style={{
              alignItems:'center'
            }}>
              <ListGender data={GenderData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
            </View>

            <View style={styles.footer}>

              <View style={{
                paddingTop: 20,
                marginBottom: 10,
              }}>
                <CustomeButton onpress={() => onQuestionYourInterestScreen()}
                  title={'Continue'} />
              </View>
              {/* <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => SkipScreen()}
                  title={'Skip'} bcolor={COLORS.light} />
              </View> */}

              <View style={{
                paddingBottom: 20,
                // width: 310,
                alignItems: 'center',
              }}>
                <Text style={{ textAlign: 'center', fontSize: 10 }}>
                  By continue you agree our Terms and Privacy Policy.
                </Text>
              </View>
        </View>
          </ScrollView>
      </View>

    </View>
      {/* </View> */ }



    </SafeAreaView >
  )
}

export default QuestionGenderScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '100%',
    // alignItems: 'center',
  },
  footer: {
    // height: '20%',
    paddingTop:100,
    paddingBottom:150,
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