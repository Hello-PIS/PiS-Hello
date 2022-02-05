import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import * as searchActions from '../actions/search';
import serverAddress from '../constants/serverAddress';
import LoadingScreenModal from '../components/LoadingScreenModal';
import OverscreenModal from '../components/OverscreenModal';

const available_filters = ['kategoria', 'nazwa użytkownika', 'ID wizytówki'];
  
const SearchBusinessCardsScreen = props => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const businessCards = useSelector((state) => state.search.businessCards);
    const searchTimestamp = useSelector((state) => state.search.searchResponseTimestamp);
    const [textInputValue, setTextInputValue] = useState('');

    const [chosenFilter, setChosenFilter] = useState(null);
    const [waitingForResponse, setWaitingForResponse] = useState(false);
    const [failureModalVisible, setFailureModalVisible] = useState(false);

    useEffect(() => {
        if (searchTimestamp === undefined)
            return;
        setWaitingForResponse(false);
        if (businessCards === null)
            setFailureModalVisible(true);
    }, [searchTimestamp]);

    async function searchForCards () {
        setWaitingForResponse(true);
        switch (chosenFilter) {
            case 'kategoria':
                await dispatch(searchActions.searchBusinessCards({profession: textInputValue}));
                break;
            case 'nazwa użytkownika':
                await dispatch(searchActions.searchBusinessCards({ownername: textInputValue}));
                break;
            case 'ID wizytówki':
                await dispatch(searchActions.searchBusinessCards({id: textInputValue}));
                break;
            case null:
                await dispatch(searchActions.searchBusinessCards({}));
                break;
            default:
                console.log(`Unrecognized command.`);
        }
        console.log(`Fetched business cards`);
    }

    const changeFilter = new_filter => {
        if (new_filter === null || !available_filters.includes(new_filter))
            return;
        
        if (new_filter === chosenFilter) {
            setChosenFilter(null);
        } else {
            setChosenFilter(new_filter);
        }
    }

    function renderHeader() {
        return (
            <View style={styles.header}>
                <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
                        <TouchableOpacity
                            onPress={ navigation.goBack }
                            style={styles.searchButton}>
                            <AntDesign name='back' size={26} color='#fff' style={{margin: 5,}} />
                        </TouchableOpacity>
                    <TextInput style={styles.searchBar} placeholder='Wpisz nazwę wizytówki...' onChangeText={setTextInputValue} value={textInputValue} />
                    <TouchableOpacity
                        onPress={searchForCards}
                        style={styles.searchButton}>
                        <AntDesign name='search1' size={26} color='#fff' style={{margin: 5,}} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}} />
                <FlatList
                    horizontal={true}
                    data={available_filters}
                    keyExtractor={item => item}
                    renderItem={({item}) => {
                    const bgcolor = chosenFilter === item ? 'white' : 'rgba(232,232,232,0.5)'
                    return <TouchableOpacity
                        style={{...styles.searchCategory, backgroundColor: bgcolor}}
                        onPress={() => changeFilter(item)}
                    >
                        <Text>{item}</Text>
                    </TouchableOpacity>
                }} />
                <View style={{flex: 1}} />
            </View>
        );
    }

    return <View style={{alignItems: 'center', flex: 1, }}>
        {renderHeader()}
        <FlatList
            style={{width: '100%'}}
            data={businessCards}
            keyExtractor={item => item.id}
            contentContainerStyle={{flexGrow: 1, paddingVertical: 20,}}
            renderItem={({item}) => {
            return <TouchableOpacity style={styles.listItem} >
                {/* <Text style={{fontFamily: 'open-sans', fontSize: 30, width: '100%', textAlign: 'center', fontWeight: 'bold'}}>{item.name.toUpperCase()}</Text> */}
                <View style={{backgroundColor: 'transparent', borderRadius: 20, overflow: 'hidden', marginBottom: 5}}>
                    <Image source={{uri: `http://${serverAddress.address}:8080/card/image?id=${item.id}`}} resizeMode='cover' style={{width: '100%', aspectRatio: 16/9,}} />
                </View>
                {item.name !== null && <Text style={{ fontFamily: 'open-sans',  fontSize: 17}}><Text>Nazwa: </Text><Text style={{fontSize: 20, fontFamily: 'open-sans'}}>{item.name}</Text></Text>}
                <Text><Text style={{fontSize: 17, fontFamily: 'open-sans'}}>Profesja:  </Text><Text style={{fontSize: 20, fontFamily: 'open-sans'}}>{item.category}</Text></Text>
                <Text><Text style={{fontSize: 17, fontFamily: 'open-sans'}}>Właściciel:  </Text><Text style={{fontSize: 20, fontFamily: 'open-sans'}}>{item.owner}</Text></Text>
                {item.company !== null && <Text style={{ fontFamily: 'open-sans',  fontSize: 17}}><Text>Firma: </Text><Text style={{fontSize: 20, fontFamily: 'open-sans'}}>{item.company}</Text></Text>}
                {item.phone !== null && <Text style={{ fontFamily: 'open-sans',  fontSize: 17}}><Text>Telefon: </Text><Text style={{fontSize: 20, fontFamily: 'open-sans'}}>{item.phone}</Text></Text>}
                {item.email !== null && <Text style={{ fontFamily: 'open-sans',  fontSize: 17}}><Text>E-mail: </Text><Text style={{fontSize: 20, fontFamily: 'open-sans'}}>{item.email}</Text></Text>}
            </TouchableOpacity>
            }}
        />

        <LoadingScreenModal amIVisible={waitingForResponse} />
        <OverscreenModal
            title={"Wyszukiwanie nie powiodło się"}
            message={"Serwer odrzucił próbę wyszukiwania. Spróbuj ponownie."}
            buttonType={'back'}
            buttonColor={'#9932CC'}
            onClick={ () => setFailureModalVisible(false) }
            amIVisible={failureModalVisible}
        />
    </View>
};

const styles = StyleSheet.create({
    imagePicker: {
        //alignItems: 'center',
        backgroundColor: 'black',
        flex: 1,
    },
    roundButton: {
        width: 75,
        height: 75,
        margin: 20,
        borderRadius: 100,
        backgroundColor: '#9932CC',
        position: 'absolute',
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    title: {
        color: 'white',
        fontSize: 26,
        fontFamily: 'open-sans-bold',
    },
    header: {
        paddingTop: 80,
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9A58FF',
    },
    backButton: {
        marginLeft: 10,
        padding: 5,
        borderRadius: 100,
        alignSelf: 'flex-start',
    },
    searchButton: {
        padding: 5,
        marginHorizontal: 5,
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,0.25)',
        elevation: 3,
    },
    searchBar: {
        flexGrow: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 5,
        elevation: 3,
        padding: 10,
        fontSize: 18,
    },
    searchCategory: {
        backgroundColor: 'white',
        borderRadius: 12,
        alignSelf: 'center',
        elevation: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 5,
    },
    listItem: {
        flex: 1,
        backgroundColor: 'white',
        elevation: 10, marginBottom: 15,
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 20,
        alignItems: 'flex-start',
    },
});

export default SearchBusinessCardsScreen;