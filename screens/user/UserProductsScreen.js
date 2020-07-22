import React from 'react';
import { FlatList, StyleSheet, Button } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import {deleteProduct} from '../../store/actions/product.actions'

const UserProduct = props => {

   const userProducts = useSelector(state => state.products.userProducts) 


   const selectItemHandler = (id, title) => {
    props.navigation.navigate('EditProductsScreen', {
        productId: id,
        productTitle: title
        })
}


    const dispatch = useDispatch()

    const userProductsHandler = (itemData) => {
        return (
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                 }}


            >
             <Button 
              color={Colors.primaryColor} 
            title="Edit" 
              onPress={() => {
                  selectItemHandler(itemData.item.id, itemData.item.title)
               }} 
             />
    
             <Button 
             color={Colors.primaryColor} 
             title="Delete" 
            onPress={()=> {
                dispatch(deleteProduct(itemData.item.id))} }/>
            </ProductItem>
        )
    }

    return (
        <FlatList
            data = {userProducts}
            keyExtractor = {(item, index) => item.id}
            renderItem={userProductsHandler}
        />
    )
}

const styles = StyleSheet.create({
    
})

export default UserProduct