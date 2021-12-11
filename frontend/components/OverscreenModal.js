import React from "react";
import {View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import {AntDesign} from '@expo/vector-icons';

export default function OverscreenModal({title, message, buttonType='check', buttonColor='#9932CC', onClick, amIVisible}){
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={amIVisible}
            onRequestClose={() => onClick}
        >
            <View 
                style={{...StyleSheet.absoluteFillObject, height: '100%', backgroundColor: 'rgba(0,0,0,0.5)'}}
                blurRadius={100}
            />
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{title}</Text>
                <Text style={styles.modalText}>{message}</Text>
                <TouchableOpacity
                    onPress={onClick}
                    style={{...styles.modalButton, backgroundColor: buttonColor}}
                >
                    <AntDesign name={buttonType} size={30} color='#fff' />
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalTitle: {
        fontSize: 28,
        marginTop: 30,
        fontFamily: 'mt-bold',
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'mt-light',
    },
    modalButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 100,
      },
    modalView: {
        marginTop: 200,
        margin: 40,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
})
