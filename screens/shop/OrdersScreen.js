import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import OrderItem from '../../components/shop/OrderItem';
import {fetchOrder} from '../../store/actions/order.actions'
import Colors from '../../constants/Colors'

const CategoryGridTitle = props => {

    const orders = useSelector(state => state.orders.orders);
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();


    const loadedProducts = useCallback( async () => {
        setError(null)
        setIsLoading(true)
        try{
            await dispatch(fetchOrder())
        }catch(err){
            setError(err.message)
        }
        setIsLoading(false)
    }, [setIsLoading, setError, dispatch])


    useEffect(() => {
        const willFocusSub = props.navigation.addListener('focus' ,loadedProducts);
       return willFocusSub;
     }, [loadedProducts])
     

    useEffect(() => {
        loadedProducts()
    },[dispatch, loadedProducts])

    const ordersHandler = itemData => {
        return(
            <OrderItem
                amount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}
            />
        )
    }


    let OrdersScreenContent =  <FlatList data={orders} keyExtractor={(item, index) => item.id} renderItem={ordersHandler}/>

    if(isLoading){
        OrdersScreenContent= <ActivityIndicator size="large" color={Colors.primaryColor}/>
    } else if(!isLoading && orders.length == 0){
         OrdersScreenContent = <Text style={{textAlign:'center'}}>No orders! Please make a new order</Text>
    }else if(error){
     OrdersScreenContent = <Text style={{textAlign:'center'}}>An error occured</Text>
 
    }  

    return (
        <View>
           {OrdersScreenContent}
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        justifyContent: 'center',
        flex: 1,
    }
})

export default CategoryGridTitle