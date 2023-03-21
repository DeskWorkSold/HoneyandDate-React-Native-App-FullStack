import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import COLORS from '../../consts/Colors';
import { useState } from 'react';
import SearchTab from '../components/SearchTab';
import EventItems from '../components/EventItems';
import EventsCategory from '../components/EventsCategory';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { events, selectEvents, selectPackages, selectUser } from '../../../redux/reducers/Reducers'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const { width } = Dimensions.get("window");


const EventBtn = [
  {
    id: '1',
    name: 'Explore',
  },
  {
    id: '2',
    name: 'Your Events',
  }
];

export const CategoriesEvent = [
  {
    id: '1',
    name: 'New Events',
  },
  {
    id: '2',
    name: 'Todays Event',
  },
  {
    id: '3',
    name: 'Last Events',
  },
]



const EventsScreen = ({ navigation }) => {
  // state = {
  //   active: 0,
  //   xTabOne: 0,
  //   xTabTwo: 0,
  //   translateX: new Animated.Value(0),
  //   translateXTabOne: new Animated.Value(0),
  //   translateXTabTwo: new Animated.Value(width),
  //   translateY: -1000
  // };
  const [allEvents, setAllEvents] = useState();
  const [allEventsTemp, setAllEventsTemp] = useState();
  const [allEventsfilter, setAllEventsfilter] = useState(null);
  const [Events, setEvents] = useState('Explore');
  // const [yourevent, setYourEvent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValueIndex] = useState(0);
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);

  const [search, setSearch] = useState(0);
  const [xTabTwo, setxTabTwo] = useState(0);
  const [myEvents, setMyEvents] = useState();
  const [myEventsid, setMyEventsid] = useState();

  const dispatch = useDispatch();
  const eventExist = useSelector(selectEvents);
  const user = useSelector(selectUser)


  // const BuyMemberShips = useSelector(selectPackages)
  //   // const EventsId = SelectedEvent.item.uid;
  //   console.log(BuyMemberShips);


  const fetchRecentTickets = () => {
    // console.log('test');
    firestore()
      .collection('SellTickets')
      .orderBy('createdAt', 'desc')
      // .limit(1)
      .onSnapshot(querySnapshot => {
        const EveId = []
        querySnapshot.forEach((documentSnapshot) => {
          const recentdata = documentSnapshot.data();
          // console.log('hello' , recentdata);
          if (recentdata.useruid == user.uid) {
            EveId.push(documentSnapshot.data().TicketAddToCard?.euid)
            // console.log('doc',documentSnapshot.data());
            // return;
          }
          // setRecentData(MatchedUser)
        })
        setMyEventsid(EveId)
        fetchyEvents()
        // console.log(EveId);
      })
  }
  const fetchyEvents = () => {
    // setLoading(true)
    // console.log('==>ak',removeDublication);
    if (myEventsid) {
      const removeDublication = myEventsid.filter((item,
        index) => myEventsid.indexOf(item) === index);

      const data = [];
      removeDublication?.map(item => {
        firestore()
          .collection('Events')
          .doc(item).onSnapshot(docSnapshot => {
            // console.log('=========>',docSnapshot.data());
            data.push(docSnapshot.data());
            // querySnapshot.forEach((documentSnapshot) => {
            //   // console.log('User ID: ', documentSnapshot.data());
            //   // modalDataUid.push(documentSnapshot.id);
            // });
            // dispatch(events(data))
            // setAllEvents(data)
            // console.log(data);
          });
        // setLoading(false)
      })
      data.sort(function (a, b) {
        // let test = timeStamp.toDate().toTimeString()
        return new Date(b.timeStamp?.toDate().toDateString() + " " + b.timeStamp.toDate().toTimeString()) - new Date(a.timeStamp?.toDate().toDateString() + " " + a.timeStamp.toDate().toTimeString());
        // return a.timeStamp.toDate().toTimeString().localeCompare(b.timeStamp.toDate().toTimeString());
      });
      setMyEvents(data)
    }

    // console.log('myevent',myEvents);
  }

  const handleSlide = (index) => {
    // console.log('slide');
    setValueIndex(index)
    const viewPage = EventBtn[index].name
    setEvents(viewPage);
  };

  const FetchEvents = async () => {
    setLoading(true)
    await firestore()
      .collection('Events')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach((documentSnapshot) => {
          // console.log('User ID: ', documentSnapshot.data());
          data.push(documentSnapshot.data());
          // modalDataUid.push(documentSnapshot.id);
        });
        data.sort(function (a, b) {
          // let test = timeStamp.toDate().toTimeString()
          return new Date(b.timeStamp?.toDate().toDateString() + " " + b.timeStamp.toDate().toTimeString()) - new Date(a.timeStamp?.toDate().toDateString() + " " + a.timeStamp.toDate().toTimeString());
          // return a.timeStamp.toDate().toTimeString().localeCompare(b.timeStamp.toDate().toTimeString());
        });

        // dispatch(events(data))
        setAllEvents(data)
        setAllEventsTemp(data)
        // console.log(data);
      });
    setLoading(false)
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = allEvents.filter((item) => {
        const itemData = item.Title ? item.Title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData);
      // console.log(newData);
      setAllEventsTemp(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setAllEventsTemp(allEvents);
      setSearch(text);
    }
  };


  useEffect(() => {
    FetchEvents();
    fetchRecentTickets();
  }, [])

  return (
    <SafeAreaView>
      <View style={styles.container}>

        <View style={styles.contentContainer}>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: "space-between",
            width: '100%',
            // paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: COLORS.light
          }}>
            {EventBtn.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSlide(index)}
                style={{
                  // flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderWidth: 0.5,
                  width: '50%',
                  // borderColor: value == index ? COLORS.main: COLORS.gray,
                  borderRadius: 10,
                  height: 46,
                  backgroundColor: value == index ? COLORS.main : COLORS.light
                }}
              >
                <Text style={{
                  fontFamily: '',
                  color: COLORS.black
                }}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>


        {Events == 'Your Events' ?
          <ScrollView showsVerticalScrollIndicator={false}
            style={{
              paddingRight: 20
            }}>
            {myEvents ?
              <>
                {!myEvents.length == 0 ?
                  <EventItems navigation={navigation} width={'100%'} data={myEvents} btn={'Detail'} />
                  :
                  <Text style={{
                    paddingHorizontal: 20,
                    alignItems: 'center'
                  }}>No Event Buy</Text>
                }
              </>
              :
              <Text style={{
                paddingHorizontal: 20,
                alignItems: 'center'
              }}>No Event Buy</Text>
            }
          </ScrollView>
          :
          <View>
            <View style={{
              marginBottom: 10,
            }}>
              {/* <SearchTab search={search} setSearch={setSearch} /> */}
              <View style={styles.NumberInput}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '80%',
                  height: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                  backgroundColor: COLORS.light,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}>
                  <Image source={require('../../assets/search.png')} resizeMode='contain' style={{
                    marginRight: 5
                  }} />
                  <TextInput
                    value={search}
                    placeholder='Type of Company'
                    onChangeText={search => searchFilterFunction(search)
                    }
                    style={styles.TextInput}
                  />
                </View>
                <View style={{
                  alignItems: 'flex-end',
                  backgroundColor: COLORS.main,
                  width: '10%',
                  height: 45,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image source={require('../../assets/filter.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20,
                  }} />
                </View>
              </View>
            </View>
            {allEvents ?
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingTop: 10,
                  justifyContent: 'space-between',
                }}>
                  <View>
                    <Text style={{ color: COLORS.black, fontSize: 20, fontWeight: 'bold' }}>New Events</Text>
                  </View>
                  <View>
                    <Text>All</Text>
                  </View>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <EventItems navigation={navigation} widths={300} data={allEventsTemp} />
                </ScrollView>
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                }}>
                  <View>
                    <Text style={{ color: COLORS.black, fontSize: 20, fontWeight: 'bold' }}>Categories</Text>
                  </View>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <EventsCategory data={CategoriesEvent} value={selectedCatIndex}
                    setValue={setSelectedCatIndex} filterdata={allEvents} setfilterdata={setAllEventsfilter} />
                </ScrollView>

                <View style={{
                  paddingLeft: 20,
                  width: '60%',
                  paddingTop: 10,
                }}>
                  {allEventsfilter ?
                    <Text>
                      {allEventsfilter.length} events are found matching
                      your catagories
                    </Text>
                    :
                    <Text>
                      {allEvents.length} events are found matching
                      your catagories
                    </Text>
                  }
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                  style={{
                    marginBottom: 200,
                  }}>
                  {allEventsfilter ?
                    <EventItems navigation={navigation} widths={300} data={allEventsfilter} />
                    :
                    <EventItems navigation={navigation} widths={300} data={allEvents} />
                  }
                </ScrollView>

              </ScrollView>
              :
              <View style={{
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
                <ActivityIndicator size="small" color={COLORS.white} animating={loading} />
              </View>
            }
          </View>
        }
      </View>
    </SafeAreaView >
  )
}

export default EventsScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.white
  },
  contentContainer: {
    // borderRadius:50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:COLORS.black
  },
  NumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: 20,
    // paddingHorizontal: 20,
    // height: 45,
    width: '100%',
    // backgroundColor: COLORS.light,
    // borderRadius: 5,
  },
  TextInput: {
    backgroundColor: COLORS.transparent,
    width: '90%'
  },
})