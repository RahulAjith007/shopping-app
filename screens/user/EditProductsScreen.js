import React, { useState } from 'react';
import {  View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import {useSelector} from 'react-redux';

const EditProductScreen = props => {

const { productId } = props.route.params   
const editedProduct = useSelector(state => state.products.userProducts.find( product => product.id === productId))

const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
const [price, setPrice] = useState(editedProduct ? editedProduct.price : '');
const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');





    return (
       <ScrollView style={styles.formControl}>
    <View style={styles.form}>
           <View style={styles.label}>
               <Text style={styles.label}>Title</Text>
               <TextInput 
               value={title}
               onChangeText={(text) => {setTitle(text)}}
               style={styles.input}/>
           </View>

           <View style={styles.label}>
               <Text style={styles.label}>Image Url</Text>
               <TextInput 
               value={imageUrl}
               onChangeText={(text) => {setImageUrl(text)}}
               style={styles.input}/>
           </View>

           {editedProduct ? null :(<View style={styles.label}>
               <Text style={styles.label}>Price</Text>
               <TextInput
               value={price}
               onChangeText={(text) => {setPrice(text)}}
                style={styles.input}/>
           </View>)}

    
           <View style={styles.label}>
               <Text style={styles.label}>Description</Text>
               <TextInput style={styles.input}
                 value={description}
                   onChangeText={(text) => {setDescription(text)}}
               />
           </View>
           </View>
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    form:{
        margin: 20
    },
    formControl:{
        width: '100%'
    },
    label:{
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input:{
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})

export default EditProductScreen