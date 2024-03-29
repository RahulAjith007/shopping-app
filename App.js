import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk'
import productReducer from './store/reducers/product.reducer';
import cartReducer from './store/reducers/cart.reducer';
import orderReducer from './store/reducers/order.reducer';
import authReducer from './store/reducers/auth.reducer'; 
import ShopNavigator from './navigation/ShopNavigator'
import {composeWithDevTools} from 'redux-devtools-extension'
import {enableScreens} from 'react-native-screens';

enableScreens();

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth :authReducer
})

const FetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}


const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return <AppLoading 
    startAsync={FetchFonts} 
    onFinish={()=> setFontLoaded(true)}/>
  }

  return (
    <Provider store={store}>
        <ShopNavigator/>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
