import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import {useSelector} from 'react-redux'
import OrderItem from '../../components/shop/OrderItem';

const CategoryGridTitle = props => {

    const orders = useSelector(state => state.orders.orders);

    const ordersHandler = itemData => {
        return(
            <OrderItem
                amount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}
            />
        )
    }

    return (
        <View>
            <FlatList
                data={orders}
                keyExtractor={(item, index) => item.id}
                renderItem={ordersHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default CategoryGridTitle