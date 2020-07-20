import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import productReducer from './store/reducers/product.reducer';
import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({
  products: productReducer
})

const FetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}


const store = createStore(rootReducer)

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
