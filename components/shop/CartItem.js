import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}</Text> 
                <Text style={styles.mainText}>{props.title}</Text>
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.amount}</Text>
                {props.deletable && <TouchableOpacity onPress = {props.onRemove} style={styles.DeleteButton}>
                   <Ionicons 
                   name ={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                   size={23}
                   color='red'    
                   /> 
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    itemData:{
        flexDirection: 'row',
        alignItems: 'center'

    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    mainText:{
        fontFamily: 'open-sans-bold',
        fontSize: 16

    },
    amount: {},
    DeleteButton:{
        marginLeft: 20
    }

})

export default CartItem