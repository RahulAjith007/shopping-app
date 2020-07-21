import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem'
import {useDispatch} from 'react-redux'
import {addToCart} from '../../store/actions/cart.actions'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'


const ProductsOverviewScreen = props => {

const {navigation} = props    

const products = useSelector( state => state.products.availableProducts )


const dispatch = useDispatch();


    navigation.setOptions({
      headerRight: () => ( <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item 
        title='Cart' 
        iconName= {Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress={() => {navigation.navigate('CartScreen')}}/>
    </HeaderButtons>)
    });



const productOverviewListHandler = (itemData) => {
    return (
        <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {props.navigation.navigate('ProductDetailScreen', 
            {productId: itemData.item.id,
            productTitle: itemData.item.title
            }
            )}}
            onAddToCart={()=> {
                dispatch(addToCart(itemData.item))}
                }
        />
    )
}

    return (
       <FlatList
           data={products}
            keyExtractor ={item => item.id}
            renderItem={productOverviewListHandler}
       />
    )
}

const styles = StyleSheet.create({
    
})

export default ProductsOverviewScreen;