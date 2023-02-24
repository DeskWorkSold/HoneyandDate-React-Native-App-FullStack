import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, TextInput, ScrollView, ActivityIndicator, StatusBar, Button } from 'react-native';
import React from 'react';
import COLORS from '../../consts/Colors';
import { useState } from 'react';
import SearchTab from '../components/SearchTab';
import EventItems from '../components/EventItems';
import EventsCategory from '../components/EventsCategory';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { events, selectEvents, selectUser } from '../../../redux/reducers/Reducers'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTabOne from '../components/HeaderTabOne';
import { color } from 'react-native-reanimated';
import CustomeButton from '../components/CustomeButton';
import QRCode from 'react-native-qrcode-svg';
const { width } = Dimensions.get("window");




const EventTicketsBuy = ({ navigation, route }) => {
  const { BuyTickets, paymentCard, useruid } = route?.params;
  // console.log(BuyTickets.euid);
  const EventsFood = BuyTickets.euid;
  const [TicketsData, setTicketData] = useState([]);
  const [ticketindex, setTicketindex] = useState(0);
  const [recentData, setRecentData] = useState();
  const [qrCode, setQrCode] = useState('hello');
  const dispatch = useDispatch();
  const eventExist = useSelector(selectEvents);
  const [quantity, setquantity] = useState(0)
  const user = useSelector(selectUser)
  // console.log(user.uid);

  // const handleTicket = (index) => {
  //   // const BuyTickets = TicketsData[ticketindex]
  //   // console.log(BuyTickets);
  //   navigation.navigate('PaymentOptionScreen', { BuyTickets: BuyTickets })
  //   // setValueIndex(index)
  //   // setEvents(viewPage);
  // };

  const fetchRecentTickets = () => {
    // console.log('test');
    firestore()
      .collection('SellTickets')
      .orderBy('createdAt', 'desc')
      // .limit(1)
      .onSnapshot(querySnapshot => {
        const MatchedUser = []
        querySnapshot.forEach((documentSnapshot) => {
          const recentdata = documentSnapshot.data();
          // console.log('hello' , recentdata);
          if (recentdata.useruid == user.uid) {
            MatchedUser.push(documentSnapshot.data())
            // console.log('doc',documentSnapshot.data());

            // return;
          }
          setRecentData(MatchedUser[0])
        })
        setQrCode(recentData?.TicketAddToCard?.uid)
        // console.log(recentData?.TicketAddToCard?.uid);
      })
    // firestore().collection('SellTickets').orderBy('createdAt', 'desc')
    //   .limit(1)
    //   .onSnapshot(docs => {
    // console.log(docs.docs.map(doc => ({id:doc.id, createdAt:doc.data().createdAt})));
    // console.log(docs.data());
    // docs.docs.map(doc => (
    //   test = doc.data(),
    //   console.log(test)
    // ));

    // Use last entry as cursor
    // const cursor = docs.docs[docs.docs.length - 1]; // assumed not empty

    // Same query starting after cursor (last doc)
    // firestore().collection('SellTickets').orderBy('createdAt', 'desc').startAfter(cursor.id).limit(5).onSnapshot(docs => {

    //   // docs.docs includes cursor
    //   console.log(docs.docs.map(doc => ({id:doc.id, time:doc.data().time})));
    // });
    // })
  }

  useEffect(() => {
    fetchRecentTickets();
  }, [])

  // useEffect(() => {
  //   // QrCodeGenerator()
  // }, [recentData])

  // const QrCodeGenerator = () => {
  //   // console.log('qrgenerator', recentData);
  //   RNQRGenerator.generate({
  //     value: "Hamza Tahir",
  //     height: 400,
  //     width: 400,
  //     // base64: true,
  //   }).then((response) => {
  //     console.log('response', response);
  //     // const { uri, width, height, base64 } = response;
  //     setQrCode(response.uri)
  //   })
  //     .catch(error => console.log('Cannot create QR code', error));
  // }
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <View style={{
          paddingTop: 20
        }}>
          <Image source={require('../../assets/tofi.png')} resizeMode='contain' style={{
            height: 120
          }} />
        </View>

        <View style={{
          padding: 20
        }}>
          <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: COLORS.black,
            textAlign: 'center',
          }}>Congratulations</Text>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: COLORS.black,
              marginRight: 5
            }}>You got the
            </Text>
            <Text style={{
              backgroundColor: COLORS.main,
              paddingHorizontal: 10,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: COLORS.black,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>Ticket!</Text>
          </View>

        </View>
        {/* <View style={{ flexDirection: 'row' }}>
          <View style={{
            marginHorizontal: 10,
            marginVertical: 5,
            borderWidth: 6,
            borderColor: COLORS.white,
            borderRadius: 60,
          }}>
            <Image source={{ uri: user.image1 }} resizeMode='contain'
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
              }} />
          </View>
          <View style={{
            marginHorizontal: 10,
            marginVertical: 5,
            borderWidth: 6,
            borderColor: COLORS.white,
            borderRadius: 60,
          }}>
            <Image source={{ uri: userImg }} resizeMode='contain'
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
              }} />
          </View>
        </View> */}

        <View style={{
          width: '20%',
          alignItems: 'center',
        }}>
            <QRCode
              value={qrCode}
              // logo={{ uri: base64Logo }}
              // logoSize={30}
              // logoBackgroundColor='transparent'
              backgroundColor='black'
              color={'white'}
              size={100}
            />
            {/* // <Image source={{ uri: qrCode }} resizeMode='contain'
            //   style={{
            //     width: 100,
            //     height: 100,
            //   }} /> */}
        </View>

        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black }}>
            {BuyTickets?.Tickets?.ticketTitle}
          </Text>
        </View>
        <View style={{
          paddingTop: 10
        }}>
          <Text style={{ color: COLORS.black }}>
            Events start at <Text style={{ color: COLORS.blue, fontWeight: 'bold' }}>{BuyTickets?.startTime}</Text>
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 12 }}>Come early to avoid lines</Text>
        </View>

        <View style={{
          justifyContent: 'center',
          paddingTop: 10,
          paddingHorizontal: 50
        }}>
          <Text style={{
            textAlign: 'center'
          }}>
            Take a screen screenshot of this screen and have it out for fast check in Or if you scanned your DL or ID have it out ready in line for fast check in
          </Text>
        </View>

        <View style={{
          paddingTop: 70
        }}>
          <TouchableOpacity
          onPress={() => navigation.navigate('Foodmenu', {
            EventsId: EventsFood,
          })}
          >
            <View style={{
              backgroundColor: COLORS.main,
              width: 329,
              height: 50,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ fontWeight: 'bold', color: COLORS.black, fontSize: 16 }}>Watch Menu</Text>
            </View>
          </TouchableOpacity>
        </View>



      </View>
    </SafeAreaView>
  )
}

export default EventTicketsBuy

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.white,
    alignItems: 'center'
  },

})