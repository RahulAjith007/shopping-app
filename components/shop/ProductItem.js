import React from 'react';
import { 
    TouchableOpacity, 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    Button,
    TouchableNativeFeedback,
    Platform } from 'react-native';
import Colors from '../../constants/Colors'
const ProductItem = props => {

let TouchableCmp = TouchableOpacity

if(Platform.OS === 'android' && Platform.Version >=21){
    TouchableCmp = TouchableNativeFeedback
}


    return ( 
        <View style={styles.product}>
        <View style={styles.touchable}>
        <TouchableCmp onPress={props.onViewDetail} useForeground>
        <View>
      <View style={styles.imageContainer}>
      <Image style={styles.image} source={{uri: props.image}}/>
      </View>
          <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
        
          <View style={styles.ButtonGroup}>
              <Button color={Colors.primaryColor} title="View Details" onPress={props.onViewDetail}/>
              <Button color={Colors.primaryColor} title="To Cart" onPress={props.onAddToCart}/>
          </View>
          </View>
      </TouchableCmp>
      </View>
         </View>
    )
}

const styles = StyleSheet.create({
    product :{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset:{height: 2, width: 0},
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 6,
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
        height: '15%',
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
    ButtonGroup:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
})

export default ProductItem