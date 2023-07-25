import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {useState, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import {useIsFocused} from '@react-navigation/native';

import {SwipeListView} from "react-native-swipe-list-view"

var db = openDatabase({name: 'UserDatabase1.db'});

export default function ContactList({navigation, route}) {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  function handleSearch(text) {
    if (text === '') {
      setData(users.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } else {
      let newData = data.filter(
        item => item.user_name.toLowerCase().indexOf(text.toLowerCase()) > -1,
      );
      setData(newData);
    }
  }
  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, res) => {
        console.log(res.rows.item);
        var temp = [];
        for (let i = 0; i < res.rows.length; i++) {
          temp.push(res.rows.item(i));
          setUsers(temp);
        }
        console.log(users);
      });
    });
  };
  useEffect(() => {
    getData();
    function ascending() {
      setData(users);
      let asc = users.sort((a, b) => (a.user_name > b.user_name ? 1 : -1));
      setData(asc);
    }
    ascending();
  }, [isFocused]);

  return (
    <View style={styles.container}>
     
        <View style={{flex: 1}}>
          <TextInput
            placeholder="search..."
            style={{
              color: 'black',
              borderWidth: 1,
              padding: 10,
              borderRadius: 20,
            }}
            placeholderTextColor="black"
            onChangeText={val => handleSearch(val)}
          />

          <FlatList
            data={data}
            renderItem={({item}) => (
              <View style={styles.listContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate({
                      name: 'Update Contact',
                      params: {item: item},
                    })
                  }>
                  <Image
                    style={{height: 50, width: 50, borderRadius: 30}}
                    source={{uri: item.user_img}}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.text}>{item.user_name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
         
        </View>
        <View style={styles.but}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Add New Contact')}>
            <Image
              style={{height: 50, width: 50}}
              source={require('../assets/button.png')}
            />
          </TouchableOpacity>
        </View>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  listContainer: {
    padding: 10,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
  },
  but: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    padding: 15,
  },
});
