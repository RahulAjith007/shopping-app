//React

import React, { useState } from 'react';
import {Platform} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {useSelector} from 'react-redux'

//screens

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductsScreen from '../screens/user/EditProductsScreen'
import AuthScreen from '../screens/user/AuthScreen';


//others

import Colors from '../constants/Colors'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/UI/CustomHeaderButton'
import {Ionicons} from '@expo/vector-icons'
import { Order } from '../models/order';


//Navigators

const ProductsStackNavigator = createStackNavigator();
const OrdersStackNavigator = createStackNavigator();
const AdminStackNavigator = createStackNavigator();
const OrdersDrawerNavigator = createDrawerNavigator();
const AuthStackNavigator = createStackNavigator();






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


const AdminStackNavigation = navData => {
  return (
      <AdminStackNavigator.Navigator screenOptions={{
          headerStyle:{
              backgroundColor: Platform.OS === 'android'? Colors.primaryColor: ''
          },
          headerTintColor: Platform.OS === 'android'? 'white' : Colors.primaryColor,
          headerTitleStyle:{fontFamily: 'open-sans-bold'},
          headerBackTitleStyle:{fontFamily: 'open-sans-bold'}
      }}>
          <AdminStackNavigator.Screen 
        name="UserProductsScreen" 
        component={UserProductsScreen}
        options={{title: 'Your Products',
        headerLeft: () => ( <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
            title='Menu' 
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
            onPress={() => {
              navData.navigation.toggleDrawer()
            }}/>
        </HeaderButtons>),
           headerRight: () => ( <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
            title='Add' 
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
            onPress={() => {
              navData.navigation.navigate('EditProductsScreen',{prodId: ''})
            }}/>
        </HeaderButtons>),
        }}
         />

<AdminStackNavigator.Screen 
        name="EditProductsScreen" 
        component={EditProductsScreen}
         />
      </AdminStackNavigator.Navigator>
  );
}






function OrdersDrawerNavigation() {

const Authorized = (useSelector( state => state.auth.token ))
console.log(Authorized)

  return (
  

    <NavigationContainer>


    {Authorized === null ? (
      <AuthStackNavigator.Navigator>
             <AuthStackNavigator.Screen name="AuthScreen" component={AuthScreen} />
       </AuthStackNavigator.Navigator>
    ) : (
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


      <OrdersDrawerNavigator.Screen 
              name="AdminStackNavigation" 
              component={AdminStackNavigation}
              options={{title: 'Admin',
              drawerIcon: drawerConfig => (
                  <Ionicons
                    name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    size={23}
                    color={Colors.primaryColor}
                  />
                )
              }}
         />

         
      </OrdersDrawerNavigator.Navigator>
    )}
   </NavigationContainer>
    
  );
}






export default OrdersDrawerNavigation;