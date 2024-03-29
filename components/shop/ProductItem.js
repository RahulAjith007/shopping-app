import React from 'react';
import { 
    TouchableOpacity, 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    TouchableNativeFeedback,
    Platform } from 'react-native';

import Card from '../UI/Card';

const ProductItem = props => {

let TouchableCmp = TouchableOpacity

if(Platform.OS === 'android' && Platform.Version >=21){
    TouchableCmp = TouchableNativeFeedback
}


    return ( 
        <Card style={styles.product}>
        <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
        <View>
      <View style={styles.imageContainer}>
      <Image style={styles.image} source={{uri: props.image}}/>
      </View>
          <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
        
          <View style={styles.actions}>
             {props.children}
          </View>
          </View>
      </TouchableCmp>
      </View>
         </Card>
    )
}

const styles = StyleSheet.create({
    product :{
       
        padding: 10,
        height: 300,
        margin: 20,
        
    },
    touchable:{
        borderRadius: 10,
        overflow: "hidden"
    },
    imageContainer:{
        height: '60%',
        width: '100%'
    },
    image:{
        height: '100%',
        width: '100%'
    },
    details:{
        alignItems: 'center',
        height: '17%',
        padding: 10
    },
    title:{
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold',
        
    },
    price:{
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    actions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    }
})

export default ProductItem