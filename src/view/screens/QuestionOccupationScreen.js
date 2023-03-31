import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import SVGImg1 from '../../assets/arrowleft.svg';

const TypeTestimonial = [
  {
    id: '1',
    name: '#agriculture',
  },
  {
    id: '2',
    name: '#Social Media',
  },
  {
    id: '3',
    name: '#Business',
  },
  {
    id: '4',
    name: '#Personal Business',
  }
]

const PositionTestimonial = [
  {
    id: '1',
    name: '#CEO',
  },
  {
    id: '2',
    name: '#Worker',
  },
  {
    id: '3',
    name: '#Head of team',
  },
  {
    id: '4',
    name: '#Manager',
  }
]


const QuestionOccupationScreen = ({ navigation, route }) => {
  const { email, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [occupation, setoccupation] = useState();
  const [typeTestimonial, setTypeTestimonial] = useState(TypeTestimonial);
  const [temptypeTestimonial, setTempTypeTestimonial] = useState(TypeTestimonial);
  const [type, setType] = useState();
  const [position, setposition] = useState();
  const [positionTestimonial, setPositionTestimonial] = useState(PositionTestimonial);
  const [temppositionTestimonial, setTempPositionTestimonial] = useState(PositionTestimonial);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedPositionIndex, setSelectedPositionIndex] = useState(0);

  // console.log(DateOfBirth);

  const searchFilterType = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = typeTestimonial.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData);
      setTempTypeTestimonial(newData);
      setType(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setTempTypeTestimonial(typeTestimonial);
      setType(text);
    }
  };
  const searchFilterPosition = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = positionTestimonial.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData);
      setTempPositionTestimonial(newData);
      setposition(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setTempPositionTestimonial(positionTestimonial);
      setposition(text);
    }
  };


  const onInterestScreen = () => {
    // QuestionInterestScreen
    const CompanyType = TypeTestimonial[selectedCategoryIndex].name;
    const PositioninCompany = PositionTestimonial[selectedPositionIndex].name;
    // console.log(CompanyType,PositioninCompany);
    if (occupation) {
      // const Occupation = occupation;
      navigation.navigate('QuestionInterestScreen', { CompanyName: occupation, email: email, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please enter company name!", ToastAndroid.SHORT);
    }
  }
  const SkipScreen = () => {
    navigation.navigate('QuestionInterestScreen', { CompanyName: null, email: email, PositioninCompany: null, CompanyType: null, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }

  const ListTestimonial = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setValue(index)}
            style={styles.button}>
            <View style={{
              backgroundColor: value == index ? COLORS.main : COLORS.transparent,
              borderWidth: value == index ? 0 : 1,
              borderColor: value == index ? COLORS.main : COLORS.gray,
              // ...styles.toggelbtn
              borderRadius: 10,
              paddingHorizontal: 10,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              <View style={{ paddingLeft: 10 }}>
                <Text>{TypeTestimonial.name}</Text>
              </View>
              <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                {value == index ? (
                  <Image source={cancle} />
                ) : (
                  <Image source={require('../../assets/add2.png')} resizeMode='contain' />
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

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{
            paddingTop: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image source={require('../../assets/occupassion.png')} resizeMode='contain' style={{
              width: 200,
              height: 200
            }} />
          </View>


          <View style={{
            alignItems: 'center',
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>Occupation</Text>
          </View>

          <View style={{
            // alignItems: 'center',
            // paddingHorizontal:20
          }}>
            <View style={styles.Options}>
              <Text>(Optionals)</Text>
            </View>
            <View style={{
              alignItems: 'center',
            }}>
              <View style={[styles.NumberInput, { marginTop: -0, }]}>
                <TextInput
                  value={occupation}
                  placeholder={'Company name or type'}
                  // error={inputfirstName}
                  onChangeText={occupation => setoccupation(occupation)
                  }
                  style={styles.TextInput}
                />
              </View>
            </View>
            <View style={{
              alignItems: 'center',
            }}>
              <View style={styles.NumberInput}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Image source={require('../../assets/search.png')} resizeMode='contain' style={{
                    marginRight: 5
                  }} />
                  <TextInput
                    value={type}
                    placeholder={'Type of Company'}
                    onChangeText={type => searchFilterType(type)
                    }
                    style={styles.TextInput}
                  />
                </View>
                <View style={{
                  alignItems: 'flex-end'
                }}>
                  <Image source={require('../../assets/add.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                </View>
              </View>
            </View>

            <View style={{
              paddingLeft: 10
            }}>
              <ListTestimonial data={temptypeTestimonial} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
            </View>


            <View style={{
              alignItems: 'center',
            }}>
              <View style={styles.NumberInput}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Image source={require('../../assets/search.png')} resizeMode='contain' style={{
                    marginRight: 5
                  }} />
                  <TextInput
                    value={position}
                    placeholder={'Position in Company'}
                    onChangeText={position => searchFilterPosition(position)
                    }
                    style={styles.TextInput}
                  />
                </View>
                <View style={{
                  alignItems: 'flex-end'
                }}>
                  <Image source={require('../../assets/add.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                </View>
              </View>
            </View>

            <View style={{
              paddingLeft: 10
            }}>
              <ListTestimonial data={temppositionTestimonial} value={selectedPositionIndex}
                setValue={setSelectedPositionIndex} cancle={require('../../assets/cross.png')} />
            </View>


            <View style={{
              paddingTop: 50,
              paddingBottom: 40,
              alignItems: 'center'
            }}>
              <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => onInterestScreen()}
                  title={'Continue'} />
              </View>
              <View style={{ marginHorizontal: 5 }}>
                <CustomeButton onpress={() => SkipScreen()}
                  title={'Skip'} bcolor={COLORS.light} />
              </View>

            </View>

          </View>
        </ScrollView>
      </View>

    </SafeAreaView >
  )
}

export default QuestionOccupationScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: COLORS.white,
    height: '100%',
  },
  contentContainer: {
    height: '40%',
    alignItems: 'center',
  },
  footer: {
    height: '60%',
    alignItems: 'center',
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 45,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  Options: {
    marginTop: 0,
    // justifyContent: 'center',
    paddingLeft: 20,
    width: 340,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
    width: '88%'
  },
  toggelbtn: {
    flexDirection: 'row',
    height: 30,
    width: 180,
    marginVertical: 5,
    // backgroundColor: COLORS.main,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  button: {
    flexDirection: 'row',
    height: 30,
    marginTop: 5,
    borderRadius: 10,
  },
})