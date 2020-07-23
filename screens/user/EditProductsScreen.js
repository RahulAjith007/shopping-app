import React, { useCallback, useReducer } from 'react';
import {  View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, Alert } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {createProduct, updateProduct} from '../../store/actions/product.actions'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import Input from '../../components/UI/input';

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



const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

    dispatchFormState({
        type: FORM_INPUT_UPDATE, 
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
    })
}, [dispatchFormState])

    return (
    <KeyboardAvoidingView style={{flex:1}} behaviour="padding" keyboardVerticalOffset={100}>
       <ScrollView style={styles.formControl}>
    <View style={styles.form}>
        
          <Input
          id='title'
          label="Title"
             keyboardType='default' 
              autoCapitalize='sentences'
               autoCorrect = {false}
                returnKeyType = 'next'
                errorText = 'Please Enter a valid title!' 
                onInputChange = {inputChangeHandler}
                initialValue={editedProduct ? editedProduct.title : ''}
                initiallyValid={ !!editedProduct}
                required
          />

            <Input
            id='imageUrl'
            label="Image Url"
             keyboardType='default' 
              autoCapitalize='sentences'
               autoCorrect = {false}
                returnKeyType = 'next'
                errorText = 'Please Enter a valid image Url!' 
                onInputChange = {inputChangeHandler} 
                initialValue={editedProduct ? editedProduct.imageUrl : ''}
                initiallyValid={ !!editedProduct}
                required
             />

           {editedProduct ? null :(
            <Input
            id='price'
            label="price"
             keyboardType='default' 
                returnKeyType = 'next'
                errorText = 'Please Enter a valid Price!'  
                onInputChange = {inputChangeHandler}

                required
                min={0.1} 
          />
          )}

    
          <Input
          id='description'
            label="Description"
             keyboardType='default' 
              autoCapitalize='sentences'
               autoCorrect = {false}
                multiline
                numberOfLines={3}
                errorText = 'Please Enter a valid Description!'
                onInputChange = {inputChangeHandler}
                initialValue={editedProduct ? editedProduct.description: ''}
                initiallyValid={ !!editedProduct}  
                required
                minLength={5}
          />
           </View>
       </ScrollView>
       </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    form:{
        margin: 20
    },
    
})

export default EditProductScreen