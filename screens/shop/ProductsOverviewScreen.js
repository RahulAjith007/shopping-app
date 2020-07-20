import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem'


const ProductsOverviewScreen = props => {
const products = useSelector( state => state.products.availableProducts )

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
            onAddToCart={()=> {}}
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