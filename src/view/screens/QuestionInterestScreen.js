import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import SVGImg1 from '../../assets/arrowleft.svg';

const TypeTestimonial = [
  {
    id: '1',
    name: '#Soccer',
  },
  {
    id: '2',
    name: '#Baseball',
  },
  {
    id: '3',
    name: '#Sports',
  },
  {
    id: '4',
    name: '#Movie Watcher',
  },
  {
    id: '5',
    name: '#Dog Lover',
  }
]


const QuestionInterestScreen = ({ navigation, route }) => {
  const { email, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [search, setsearch] = useState();
  const [typeTestimonial, setTypeTestimonial] = useState(TypeTestimonial);
  const [temptypeTestimonial, settemptypeTestimonial] = useState(TypeTestimonial);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelection = (item) => {
    const newSelectedItems = [...selectedItems, item];
    setSelectedItems(newSelectedItems);
  };

  const handleRemoval = (item) => {
    const newSelectedItems = selectedItems.filter((i) => i !== item);
    setSelectedItems(newSelectedItems);
  };


  const searchFilterinterest = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = typeTestimonial.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData);
      settemptypeTestimonial(newData);
      setsearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      settemptypeTestimonial(typeTestimonial);
      setsearch(text);
    }
  };


  const onEducationScreen = () => {
    // const selectitem = TypeTestimonial[selectedCategoryIndex].name;
    // console.log(selectedItems);
    // return
    if (!selectedItems?.length == 0) {
      // const Occupation = occupation;
      navigation.navigate('QuestionEducationScreen', { Interest: selectedItems, email: email, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your interest!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    navigation.navigate('QuestionEducationScreen', { Interest: null, email: email, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }

  const ListTestimonial = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((TypeTestimonial, index) => (
          <View
            key={index}
            activeOpacity={0.8}
            // onPress={() => setValue(index)}
            onPress={() => handleSelection(TypeTestimonial.name)}
            // style={styles.button}
            style={styles.itemContainer}>
            <TouchableOpacity style={{
              backgroundColor: selectedItems.includes(TypeTestimonial.name) ? COLORS.main : COLORS.transparent,
              borderWidth: selectedItems.includes(TypeTestimonial.name) ? 0 : 1,
              borderColor: selectedItems.includes(TypeTestimonial.name) ? COLORS.main : COLORS.gray,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 5,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
              onPress={() => handleSelection(TypeTestimonial.name)}>
              <View style={{
                flexDirection: 'row',
                paddingHorizontal: 5
              }}>
                <Text>{TypeTestimonial.name}</Text>
              </View>

              {selectedItems.includes(TypeTestimonial.name) ? (
                <TouchableOpacity onPress={() => handleRemoval(TypeTestimonial.name)}>
                  <Image source={cancle} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleRemoval(TypeTestimonial.name)}>
                  <Image source={require('../../assets/add2.png')} resizeMode='contain' style={{
                    color: COLORS.black
                  }} />
                </TouchableOpacity>
              )
              }
            </TouchableOpacity>
          </View>
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
            <Image source={require('../../assets/interest.png')} resizeMode='contain' style={{
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
            }}>What are your interests?</Text>
          </View>
          <View style={{
            alignItems: 'center',
            paddingHorizontal: 70,
          }}>
            <Text style={{
              color: COLORS.black,
              textAlign: 'center',
            }}>(Maximum 10)</Text>
          </View>

          <View style={styles.NumberInput}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Image source={require('../../assets/search.png')} resizeMode='contain' style={{
                marginRight: 5
              }} />
              <TextInput
                value={search}
                placeholder={'Search'}
                onChangeText={search => searchFilterinterest(search)
                }
                style={styles.TextInput}
              />
            </View>
          </View>


          <View style={{
            paddingTop: 10, paddingLeft: 10
          }}>
            <ListTestimonial data={temptypeTestimonial} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
          </View>

          <View style={{
            paddingTop: 40,
            alignSelf: 'center',
            // flexDirection: 'row'
          }}>
            <View style={{ marginBottom: 5 }}>
              <CustomeButton onpress={() => onEducationScreen()}
                title={'Continue'} />
            </View>

            <View style={{ marginBottom: 5 }}>
              <CustomeButton onpress={() => onSkip()}
                title={'Skip'} bcolor={COLORS.light} />
            </View>
          </View>

          <View style={{
            paddingTop: 5,
            // width: 310,
            paddingBottom: 50
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>

        </ScrollView>
      </View>

    </SafeAreaView >
  )
}

export default QuestionInterestScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
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
    alignContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    height: 45,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  Options: {
    marginTop: 0,
    justifyContent: 'center',
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
    // minWidth:120,
    maxWidth: 180,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10
  },
  button: {
    flexDirection: 'row',
    height: 30,
    marginTop: 5,
    borderRadius: 10,
    // marginBottom:3
  },


  itemContainer: {
    flexDirection: 'row',
    height: 30,
    marginTop: 5,
    borderRadius: 10,
    // flexDirection: 'row',
    // // height: 30,

    // alignItems: 'center',
    // justifyContent: 'space-between',
    // // padding: 10,
    // // paddingHorizontal: 10,
    // margin: 5,
    // borderWidth: 1,
    // borderColor: '#ddd',
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
})