import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    mediatoruser: 'mediatoruser',
    ticketAddtoCard: 'ticketAddtoCard',
    status: 'status',
    packages: 'packages',
    Buypackages: 'Buypackages',
    chatuser: 'chatuser',
    itemsInCart: 'itemsInCart',
    events: 'events',
    porposalCat: 'porposalCat',
    paymentMethod: 'paymentMethod',
    paymentCardDetails: 'paymentCardDetails',
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    cart: 'cart',
    initialState: {
        user: null,
        mediatoruser: null,
        ticketAddtoCard: null,
        status: false,
        porposalCat: null,
        packages: null,
        Buypackages: null,
        chatuser: null,
        events: null,
        paymentMethod: null,
        paymentCardDetails: null,
        hidden: true,
        cartItems: 0,
        itemsInCart: [],
        quantity: 0,
        totalCount: 0,
    },
    reducers: {
        login: (state, action) => {
            console.log(state.user, " : New user");

            state.user = action.payload;
        },
        mediatorLogin: (state, action) => {
            console.log(state.mediatoruser, " : New MediatorUser");

            state.mediatoruser = action.payload;
        },
        ticketsAddtoCard: (state, action) => {
            console.log(state.ticketAddtoCard, " : New Item");

            state.ticketAddtoCard = action.payload;
        },
        status: (state, action) => {
            console.log(state.status, " : New status");

            state.status = action.payload;
        },
        PorposalCategory: (state, action) => {
            console.log(state.porposalCat, " : New category");

            state.porposalCat = action.payload;
        },
        packages: (state, action) => {
            console.log(state.packages, " : New Packages");

            state.packages = action.payload;
        },
        Buypackages: (state, action) => {
            console.log(state.Buypackages, " : New BuyPackages");

            state.Buypackages = action.payload;
        },
        chatuser: (state, action) => {
            console.log(state.chatuser, " : New chatuser");

            state.chatuser = action.payload;
        },
        events: (state, action) => {
            console.log(state.events, " : New Events");

            state.events = action.payload;
        },
        addToCart(state, action) {
            //   console.log(state.itemsInCart , ": ADD TO CART");
            const itemInCart = state.itemsInCart.find((item) => item.uid == action.payload.uid);
            if (itemInCart) {
                itemInCart.qty += action.payload.qty;
                itemInCart.Totalprice = itemInCart.PricePerItem * itemInCart.qty;
            }
            else {
                state.itemsInCart.push({ ...action.payload })
                // console.log(state.itemsInCart, "ADD TO CART")
                // state.itemsInCart = [...state.itemsInCart, action.payload]
            }
            // if (action.payload) {
            // restaurantName :  action.payload.restaurantName,
            // }
            //   state.itemsInCart = payload;
            //   return[...state.itemsInCart,  action.payload];
            //uid is the unique id of the item
            // const { id } = payload;

            // const find = state.find((item) => item?.id === id);
            // if (find) {
            //     return state.map((item) =>
            //         item.id === id
            //             ? {
            //                 ...item,
            //                 qty: item.qty + 1,
            //             }
            //             : item
            //     );
            // } else {
            //     state.push({
            //         ...payload,
            //         qty: 1,
            //     });
            // }
        },
        removeFromCart: (state, action) => {
            const removeFromCart = state.itemsInCart.filter((item) => item.uid !== action.payload.uid);
            state.itemsInCart = removeFromCart;
        },
        incrementQty: (state, action) => {
            const itemInCart = state.itemsInCart.find((item) => item.uid == action.payload.uid);
            // itemInCart.qty++;
            itemInCart.qty += 1;
            itemInCart.Totalprice = itemInCart.PricePerItem * itemInCart.qty;
        },
        decrementQty: (state, action) => {
            const itemInCart = state.itemsInCart.find((item) => item.uid == action.payload.uid);
            if (itemInCart.qty == 1) {
                const removeFromCart = state.itemsInCart.filter((item) => item.uid !== action.payload.uid);
                state.itemsInCart = removeFromCart;
            }
            else {
                itemInCart.qty -= 1;
                itemInCart.Totalprice = itemInCart.PricePerItem * itemInCart.qty;
            }
        },
        PaymentMethod: (state, action) => {
            console.log(state.paymentMethod, " : New payment-Method");

            state.paymentMethod = action.payload;
        },
        PaymentCardDetails: (state, action) => {
            console.log(state.paymentCardDetails, " : New payment-Card-Details");

            state.paymentCardDetails = action.payload;
        },

        logout: (state) => {
            console.log(state.user, " : Delete user");

            state.user = null;
            state.status = false;
            state.packages = null;
            state.chatuser = null;
            state.mediatoruser = null;
        },
    },
});

export const { login, mediatorLogin, ticketsAddtoCard, status, packages, Buypackages, logout, chatuser, events, addToCart, removeFromCart, incrementQty, decrementQty, PaymentMethod, PaymentCardDetails, PorposalCategory } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;
export const selectPackages = (state) => state.user.packages;
export const selectBuypackages = (state) => state.user.Buypackages;
export const selectChatuser = (state) => state.user.chatuser;
export const selectEvents = (state) => state.user.events;
export const selectaddToCart = (state) => state.user.itemsInCart;
export const selectMediatorUser = (state) => state.user.mediatoruser;
export const selectTicketsAddToCard = (state) => state.user.ticketAddtoCard;
export const selectPaymentMethod = (state) => state.user.paymentMethod;
export const selectPaymentCardDetails = (state) => state.user.paymentCardDetails;
export const selectPorposalCategory = (state) => state.user.porposalCat;


export default userSlice.reducer;
// import { ADD_ITEM, REMOVE_ITEM } from "./ActionTypes";

// export const Reducers = (state = [], action) => {
//     switch (action.type) {
//         case ADD_ITEM:
//             console.log(state, 'new state here!');
//             return [...state, action.payload];

//         case REMOVE_ITEM:
//             const deleteArry = state.filter((Item, index) => {
//                 return (index != action.payload);
//             });
//             return deleteArry;
//         default:
//             return state;
//     }
// }

