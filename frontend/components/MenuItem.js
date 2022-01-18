import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

export default function MenuItem({text, onPress, icon}) {

    return (
        <TouchableOpacity onPress={onPress}
            style={{
                ...styles.container,
                ...styles.shadow,
            }}
        >

        <AntDesign name={icon} size={30} color='black'/>

        <View style={{flex: 1, marginLeft: 20}}>
            <Text style={styles.text}>{text}</Text>
        </View>

        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 35,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8
    },
    text: {
        color:'black',
        fontSize: 26,
    }
});