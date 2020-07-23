import React, { useCallback, useReducer } from 'react';
import {  View, Text, ScrollView, TextInput, StyleSheet, Alert } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {createProduct, updateProduct} from '../../store/actions/product.actions'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if(action.type === 'FORM_INPUT_UPDATE'){
        const updateValues = {
            ...state.inputValues,
            [action.input]: [action.value]
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: [action.value]
        }
        let updatedFormIsValid = true
        for( const key in updatedValidities) {
           updatedFormIsValid =updatedFormIsValid && updatedValidities[key]
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updateValues,
            inputValidities: updatedValidities
        }
    }
    return state
}


const EditProductScreen = props => {
const {navigation} = props
const { prodId } = props.route.params;  
const editedProduct = useSelector(state => state.products.userProducts.find( product => product.id === prodId))

const dispatch = useDispatch();

const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
        title: editedProduct ? editedProduct.title : '',
        imageUrl: editedProduct ? editedProduct.imageUrl : '',
        price:'',
        description: editedProduct ? editedProduct.description : ''
    },
    inputValidities:{
        title: editedProduct ? true: false,
        imageUrl: editedProduct ? true: false,
        price: editedProduct ? true: false,
        description : editedProduct ? true: false,
    },
    formIsValid: editedProduct ? true: false,
})


const submitHandler = useCallback(() => {

            if(!formState.formIsValid ){
                Alert.alert('Wrong Input !', 'Please check the errors in the form', [{text: 'Okay'}])
                return;
            }

                if(editedProduct){
                    dispatch(updateProduct(
                        prodId ,
                        formState.inputValues.title, 
                        formState.inputValues.description, 
                        formState.inputValues.imageUrl ))
                }else{
                    dispatch(createProduct(
                        formState.inputValues.title, 
                        formState.inputValues.description, 
                        formState.inputValues.imageUrl, 
                        +formState.inputValues.price ))
                }
                navigation.pop();
            }, [navigation, dispatch, prodId, formState]
    )



React.useLayoutEffect (() => {
    props.navigation.setOptions({
        title: prodId ? 'Edit Product' : 'Add Product',
        headerRight: () => ( <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
            title='Save' 
            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} 
            onPress={submitHandler}/>
        </HeaderButtons>)
    })
},[submitHandler])



const textChangeHandler = (inputIdentifier, text) => {
let isValid = false;
if(text.trim().length > 0){
   isValid = true
}
    dispatchFormState({
        type: FORM_INPUT_UPDATE, 
        value: text,
        isValid: isValid,
        input: inputIdentifier
    })
}

    return (
       <ScrollView style={styles.formControl}>
    <View style={styles.form}>
           <View style={styles.label}>
               <Text style={styles.label}>Title</Text>
               <TextInput 
               value={formState.inputValues.title}
               onChangeText={textChangeHandler.bind(this, 'title')}
               style={styles.input}
               keyboardType='default' 
               autoCapitalize='sentences'
               autoCorrect = {false}
               returnKeyType = 'next'
               />

               {!formState.inputValidities.title && <Text> Please Enter a Valid title !</Text>}
           </View>

           <View style={styles.label}>
               <Text style={styles.label}>Image Url</Text>
               <TextInput 
               value={formState.inputValues.imageUrl}
               onChangeText={textChangeHandler.bind(this, 'imageUrl')}
               style={styles.input}/>
           </View>

           {editedProduct ? null :(<View style={styles.label}>
               <Text style={styles.label}>Price</Text>
               <TextInput
               value={formState.inputValues.price}
               onChangeText={textChangeHandler.bind(this, 'price')}
                style={styles.input}
                 keyboardType='decimal-pad'   
                />
           </View>)}

    
           <View style={styles.label}>
               <Text style={styles.label}>Description</Text>
               <TextInput style={styles.input}
                 value={formState.inputValues.description}
                   onChangeText={textChangeHandler.bind(this, 'description')}
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