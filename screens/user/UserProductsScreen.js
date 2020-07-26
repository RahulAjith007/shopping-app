import React from 'react';
import { FlatList, StyleSheet, Button, Alert, Text, View } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import {deleteProduct} from '../../store/actions/product.actions'


const UserProductScreen = props => {

   const userProducts = useSelector(state => state.products.userProducts) 

   const editProductHandler = id => {
    props.navigation.navigate('EditProductsScreen', {prodId: id})
}

const deleteHandler =(id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
        {text: 'No', style: 'default'},
        {text: 'Yes', style: 'destructive',
         onPress: () => {
             dispatch(deleteProduct(id))}}
    ])
}


    const dispatch = useDispatch()

    const userProductsHandler = (itemData) => {
        return (
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    editProductHandler(itemData.item.id)
                 }}


            >
             <Button 
              color={Colors.primaryColor} 
            title="Edit" 
              onPress={() => {
                  editProductHandler(itemData.item.id)
               }} 
             />
    
             <Button 
             color={Colors.primaryColor} 
             title="Delete" 
            onPress={deleteHandler.bind(this, itemData.item.id)}/> 
            {/* can also be done with onPress = {() => deleteHandler(itemData.item.id)} */}
            </ProductItem>
        )
    }

let UserProductScreenContent = ( <FlatList
    data = {userProducts}
    keyExtractor = {(item, index) => item.id}
    renderItem={userProductsHandler}
/>)

if(userProducts.length === 0){
    UserProductScreenContent =(<View>
        <Text >You have no product! Start adding your product</Text>
    </View> )
}

    return (
        <View style={{flex:1, justifyContent: 'center'}}>
            {UserProductScreenContent}
        </View>
            
       
    )
}

const styles = StyleSheet.create({
    
})

export default UserProductScreen