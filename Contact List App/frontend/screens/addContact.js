import {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase1.db'});

export default function AddContact({navigation}) {
  const [user, setUser] = useState({name: '', mobile: '', profile: ''});
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact VARCHAR(50), user_img VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  const saveData = () => {
    db.transaction(function (txn) {
      if (user.name !== '' || user.mobile !== '' || user.profile !== '') {
        txn.executeSql(
          'INSERT INTO table_user(user_name,user_contact,user_img) VALUES (?,?,?)',
          [user.name, user.mobile, user.profile],
          (tx, res) => {
            console.log(res);
            if (res.rowsAffected > 0) {
              Alert.alert('Success', 'Contact added Successfully', [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Contact List'),
                },
              ]);
            } else Alert.alert('Registration Failed');
          },
        );
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <TextInput
            style={{
              borderWidth: 1,
              marginTop: 20,
              padding: 10,
              color: 'black',
            }}
            placeholder="enter name..."
            placeholderTextColor="black"
            onChangeText={val => setUser({...user, name: val})}
            value={user.name}
          />
          <TextInput
            style={{borderWidth: 1, marginTop: 20, padding: 10, color: 'black'}}
            placeholder="enter mobile number..."
            placeholderTextColor="black"
            keyboardType="numeric"
            onChangeText={val => setUser({...user, mobile: val})}
            value={user.mobile}
          />
        </View>

        <View style={{alignItems: 'center', marginTop: 30}}>
          <TouchableOpacity
            onPress={() =>
              ImagePicker.launchImageLibrary(
                {
                  mediaType: 'photo',
                  includeBase64: false,
                  maxHeight: 200,
                  maxWidth: 200,
                },
                response => {
                  try {
                    const data = response.assets[0].uri;
                    if (data) {
                      setUser({...user, profile: data});
                    }
                  } catch (error) {
                    console.log('no img taken');
                  }
                },
              )
            }>
            <Image
              source={require('../assets/camera.png')}
              style={{
                height: 80,
                width: 80,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: 20,
          }}>
          <Button title="Save" onPress={() => saveData()} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '20%',
    padding: 10,
  },
});
