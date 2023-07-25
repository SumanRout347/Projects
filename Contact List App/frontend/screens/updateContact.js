import {useState, useContext} from 'react';
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
import {openDatabase} from 'react-native-sqlite-storage';

import * as ImagePicker from 'react-native-image-picker';
import {UserContext} from '../context/UserContext';
var db = openDatabase({name: 'UserDatabase1.db'});

export default function UpdateContact({navigation, route}) {
  const [name, setName] = useState(route.params?.item.user_name);
  const [mobile, setMobile] = useState(route.params?.item.user_contact);
  const [profile, setProfile] = useState(route.params?.item.user_img);
  const oldUser = route.params?.item;
  const {favouriteUser, setFavouriteUser} = useContext(UserContext);
  console.log(oldUser);
  function handleFavourite(user) {
    // console.log(user);
    const userFound = favouriteUser.find(u => u.user_id === user.user_id);
    console.log(userFound);
    if (!userFound) {
      setFavouriteUser(prev => {
        return [...prev, user];
      });
      navigation.navigate({
        name: 'Favourite Contact',
      });
    }
  }
  const updateUser = () => {
    db.transaction(tx => {
      if (name !== '' || mobile !== '' || profile !== '') {
        tx.executeSql(
          'UPDATE table_user set user_name=?, user_contact=?,user_img=? where user_id=?',
          [name, mobile, profile, oldUser.user_id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Contact updated successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Contact List'),
                  },
                ],
                {cancelable: false},
              );
            } else Alert.alert('Updation Failed');
          },
        );
      }
    });
  };
  const deleteUser = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Contact deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Contact List'),
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Please insert a valid User Id');
          }
        },
      );
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
            onChangeText={val => setName(val)}
            value={name}
          />
          <TextInput
            style={{borderWidth: 1, marginTop: 20, padding: 10, color: 'black'}}
            placeholder="enter mobile number..."
            placeholderTextColor="black"
            keyboardType="numeric"
            onChangeText={val => setMobile(val)}
            value={mobile}
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
                      setProfile(data);
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
        <View style={styles.operation}>
          <View>
            <TouchableOpacity onPress={() => updateUser()}>
              <Image
                source={require('../assets/edit.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => deleteUser(oldUser.user_id)}>
              <Image
                source={require('../assets/delete.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{position:"absolute",left:0,right:0,bottom:0,padding:20}}>
          <Button title="Add to favourite List" onPress={()=>handleFavourite(oldUser)} />
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
  operation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
  },
});
