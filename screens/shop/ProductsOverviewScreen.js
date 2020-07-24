import React, { useEffect, useState, useCallback } from 'react';
import {View, Text, Button, StyleSheet, FlatList, Platform, ActivityIndicator } from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem'
import {useDispatch} from 'react-redux'
import {addToCart} from '../../store/actions/cart.actions'
import {fetchProducts} from '../../store/actions/product.actions'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import Colors from '../../constants/Colors'


const ProductsOverviewScreen = props => {

const {navigation} = props    
const products = useSelector( state => state.products.availableProducts )
const dispatch = useDispatch();

const [isLoaded, setIsLoaded] = useState(false)
const [error, setError] = useState()


let loadedProducts =useCallback( async () => {
    setError(null)
    setIsLoaded(true)
    try{
        await dispatch(fetchProducts());
    }catch(err){
        setError(err.message)
    }

    setIsLoaded(false)
}, [dispatch, setIsLoaded, setError]) 


useEffect(() => {
    loadedProducts();
}, [dispatch, loadedProducts])

   

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


let ProductsOverviewScreenContent = <FlatList data={products} keyExtractor ={item => item.id} renderItem={productOverviewListHandler} />


   if(isLoaded){
       ProductsOverviewScreenContent= <ActivityIndicator size="large" color={Colors.primaryColor}/>
   } else if(!isLoaded && products.length == 0){
        ProductsOverviewScreenContent = <Text style={{textAlign:'center'}}>No products found! Maybe start adding some</Text>
   }else if(error){
    ProductsOverviewScreenContent = <Text style={{textAlign:'center'}}>An error occured</Text>

   }            


    return (
        <View style={styles.centered}> 
            {ProductsOverviewScreenContent}
        </View>
      
    )
}

const styles = StyleSheet.create({
    centered: {
        justifyContent: 'center',
        flex: 1,
    }
})

export default ProductsOverviewScreen;