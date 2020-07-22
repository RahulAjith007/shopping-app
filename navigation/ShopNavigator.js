//React

import React from 'react';
import {Platform} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

//screens

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

//others
import Colors from '../constants/Colors'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/UI/CustomHeaderButton'
import {Ionicons} from '@expo/vector-icons'


const ProductsStackNavigator = createStackNavigator();
const OrdersStackNavigator = createStackNavigator();
const OrdersDrawerNavigator = createDrawerNavigator();

const ProductsStackNavigation = navData => {
  return (
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
        options={{title: 'All Products',
        headerLeft: () => ( <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
            title='Menu' 
            iconName='ios-menu' 
            onPress={() => {
              navData.navigation.toggleDrawer()
            }}/>
        </HeaderButtons>)
        }}
         />
          <ProductsStackNavigator.Screen 
        name="ProductDetailScreen" 
        component={ProductDetailScreen}
        options={(
          { route } ) => ({ title: route.params.productTitle}
          )}
         />
          <ProductsStackNavigator.Screen 
        name="CartScreen" 
        component={CartScreen}
        options={{title: 'Cart'}}
         />
      </ProductsStackNavigator.Navigator>
  );
}



const OrdersStackNavigation = navData => {
  return (
      <OrdersStackNavigator.Navigator screenOptions={{
          headerStyle:{
              backgroundColor: Platform.OS === 'android'? Colors.primaryColor: ''
          },
          headerTintColor: Platform.OS === 'android'? 'white' : Colors.primaryColor,
          headerTitleStyle:{fontFamily: 'open-sans-bold'},
          headerBackTitleStyle:{fontFamily: 'open-sans-bold'}
      }}>
          <OrdersStackNavigator.Screen 
        name="OrdersScreen" 
        component={OrdersScreen}
        options={{title: 'Your Orders',
        headerLeft: () => ( <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
            title='Menu' 
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
            onPress={() => {
              navData.navigation.toggleDrawer()
            }}/>
        </HeaderButtons>),
        }}
         />
      </OrdersStackNavigator.Navigator>
  );
}



function OrdersDrawerNavigation() {
  return (
    <NavigationContainer>
      <OrdersDrawerNavigator.Navigator screenOptions={{
          headerStyle:{
              backgroundColor: Platform.OS === 'android'? Colors.primaryColor: ''
          },
          headerTintColor: Platform.OS === 'android'? 'white' : Colors.primaryColor,
          headerTitleStyle:{fontFamily: 'open-sans-bold'},
          headerBackTitleStyle:{fontFamily: 'open-sans-bold'}
      }}>
          <OrdersDrawerNavigator.Screen 
        name="ProductsStackNavigation" 
        component={ProductsStackNavigation}
        options={{title: 'Products',
        drawerIcon: drawerConfig => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={Colors.primaryColor}
            />
          )
        }}
         />

      <OrdersDrawerNavigator.Screen 
        name="OrdersStackNavigation" 
        component={OrdersStackNavigation}
        options={{title: 'Orders',
        drawerIcon: drawerConfig => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={Colors.primaryColor}
            />
          )
        }}
         />

         
      </OrdersDrawerNavigator.Navigator>
    </NavigationContainer>
  );
}



export default OrdersDrawerNavigation