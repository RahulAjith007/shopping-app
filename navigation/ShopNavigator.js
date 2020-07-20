//React

import React from 'react';
import {Platform} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'

//others
import Colors from '../constants/Colors'

const ProductsStackNavigator = createStackNavigator();

function ProductsStackNavigation() {
  return (
    <NavigationContainer>
      <ProductsStackNavigator.Navigator screenOptions={{
          headerStyle:{
              backgroundColor: Platform.OS === 'android'? Colors.primaryColor: ''
          },
          headerTintColor: Platform.OS === 'android'? 'white' : Colors.primaryColor,
          headerTitleStyle:{fontFamily: 'open-sans-bold'},
          headerBackTitleStyle:{fontFamily: 'open-sans-bold'}
      }}>
        <ProductsStackNavigator.Screen 
        name="ProductOverviewScreen" 
        component={ProductOverviewScreen}
        options={{title: 'All Products'}}
         />
          <ProductsStackNavigator.Screen 
        name="ProductDetailScreen" 
        component={ProductDetailScreen}
        options={(
          { route } ) => ({ title: route.params.productTitle}
          )}
         />
      </ProductsStackNavigator.Navigator>
    </NavigationContainer>
  );
}

export default ProductsStackNavigation