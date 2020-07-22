import React from 'react';
import { Button, StyleSheet, FlatList, Platform } from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem'
import {useDispatch} from 'react-redux'
import {addToCart} from '../../store/actions/cart.actions'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import Colors from '../../constants/Colors'


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


    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetailScreen', {
            productId: id,
            productTitle: title
            })
    }


const productOverviewListHandler = (itemData) => {
    return (
        <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {selectItemHandler(itemData.item.id, itemData.item.title)}}
        >
         <Button 
         color={Colors.primaryColor} 
         title="View Details" 
          onPress={() => {selectItemHandler(itemData.item.id, itemData.item.title)}} 
         />
    
         <Button 
         color={Colors.primaryColor} 
         title="To Cart" 
         onPress={()=> { dispatch(addToCart(itemData.item))} }/>
        </ProductItem>
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