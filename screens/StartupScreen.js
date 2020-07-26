import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors'
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux'
import * as authActions from '../store/actions/auth.actions';

const StartupScreen = props => {
const dispatch = useDispatch()

useEffect(()=> {
    const tryLogin = async () => {
       const userData = await AsyncStorage.getItem('userData') 
      if(!userData){
          props.navigation.navigate('AuthScreen')
      }
      
       const transformedData = JSON.parse(userData)
       const {token, userId, expiryDate} = transformedData
       const expirationDate = new Date(expiryDate)

       if(expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('AuthScreen')
        return;
       }
       props.navigation.navigate('OrdersDrawernavigation')
       dispatch(authActions.authenticate(userId, token))
    }
    tryLogin()
}, [dispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.primaryColor}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    }
})

export default StartupScreen