import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, FlatList } from 'react-native';
import {useSelector} from 'react-redux'
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import {removeFromCart} from '../../store/actions/cart.actions';
import {addOrder} from '../../store/actions/order.actions'
import {useDispatch} from 'react-redux';

const CategoryGridTitle = props => {

    const dispatch = useDispatch()

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
            return transformedCartItems.sort((a,b) => 
            a.productId > b.productId ? 1: -1);
            
    })

    const cartItemsHandler = (itemData) => {
        return (
            <CartItem
                quantity={itemData.item.quantity}
                title={itemData.item.productTitle}
                amount={itemData.item.productPrice}
                deletable
                onRemove={() => {dispatch(removeFromCart(itemData.item.productId))}}
            />
        )
    }
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
            <Text style={styles.summaryText}>Total : <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) *100 /100)}</Text></Text>
            <Button 
            color={Colors.accent} 
            title="Order Now" 
            disabled={cartItems.length === 0}
            onPress={() => {dispatch(addOrder(cartItems, cartTotalAmount))}}
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