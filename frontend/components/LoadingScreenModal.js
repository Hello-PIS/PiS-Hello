import React from "react";
import {View, Modal, StyleSheet, ActivityIndicator } from 'react-native';

export default function LoadingScreenModal({amIVisible}){
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={amIVisible}
        >
            <View style={{...StyleSheet.absoluteFillObject, height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.75)'}}>
                <ActivityIndicator size='large' color='#24A0ED' />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({

})