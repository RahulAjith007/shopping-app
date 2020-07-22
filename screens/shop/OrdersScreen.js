import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import {useSelector} from 'react-redux'

const CategoryGridTitle = props => {

    const orders = useSelector(state => state.orders.orders);

    const ordersHandler = itemData => {
        return(
            <Text>{itemData.item.totalAmount}</Text>
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