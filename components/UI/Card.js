import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return (
        <View style={{...props.style, ...styles.card}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset:{height: 2, width: 0},
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 6,
    }
})

export default Card