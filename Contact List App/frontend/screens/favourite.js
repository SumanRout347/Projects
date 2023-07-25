import {View, Text, FlatList, StyleSheet,Image,TouchableOpacity} from 'react-native';
import {UserContext} from '../context/UserContext';
import {useContext} from 'react';

export default function Favourite({route}) {
  const {favouriteUser, setFavouriteUser} = useContext(UserContext);

  return (
    <View>
      <FlatList
        data={favouriteUser}
        renderItem={({item}) => (
          <View style={styles.listContainer}>
            <Image
              style={{height: 50, width: 50, borderRadius: 30}}
              source={{uri: item.user_img}}
            />
            <TouchableOpacity>
              <Text style={styles.text}>{item.user_name}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.user_id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
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
});
