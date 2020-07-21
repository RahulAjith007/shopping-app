import React from 'react';
import { ScrollView,TouchableOpacity, Image, Button, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import {useDispatch} from 'react-redux'
import {addToCart} from '../../store/actions/cart.actions'

const ProductDetailScreen = props => {

    const dispatch = useDispatch();

    const {productId} = props.route.params;
    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find(availableProduct => {
            return (
                availableProduct.id === productId
            )
        }))

    return (
       <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
            <Button color={Colors.primaryColor} title="Add to Cart" 
            onPress={() => {
                dispatch(addToCart(selectedProduct))
                }}/>
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions:{
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'

    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal:20,
        fontFamily: 'open-sans'
    }
})

export default ProductDetailScreen;