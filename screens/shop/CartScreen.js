import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, FlatList } from 'react-native';
import {useSelector} from 'react-redux'
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';

const CategoryGridTitle = props => {

    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
            const transformedCartItems = [];
            for(const key in state.cart.items){
                transformedCartItems.push({
                    productId: key,
                    productTitle: state.cart.items[key].productTitle,
                    productPrice: state.cart.items[key].productPrice,
                    quantity: state.cart.items[key].quantity,
                    sum: state.cart.items[key].sum,
                })
                console.log(transformedCartItems);
            }
            return transformedCartItems;
            
    })

    const cartItemsHandler = (itemData) => {
        return (
            <CartItem
                quantity={itemData.item.quantity}
                title={itemData.item.productTitle}
                amount={itemData.item.productPrice}
                onRemove={() => {}}
            />
        )
    }
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
            <Text style={styles.summaryText}>Total : <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text></Text>
            <Button 
            color={Colors.accent} 
            title="Order Now" 
            disabled={cartItems.length === 0}
            />
            </View>
            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={(item, index) => item.productId}
                    renderItem={cartItemsHandler}
                />
            </View>
        </View>
       
    )
}

const styles = StyleSheet.create({
    screen:{
        margin: 20
    },
    summary:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset:{height: 2, width: 0},
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 6,

    },
    summaryText:{
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount:{
        color: Colors.primaryColor
    }
})

export default CategoryGridTitle