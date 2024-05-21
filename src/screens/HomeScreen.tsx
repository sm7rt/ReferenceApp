import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {Icon} from '@ui-kitten/components';
import {useSelector} from 'react-redux';
import {RootStackScreenProps} from '../navigation/NavigatorTypes';
import {fetchTopics} from '../services/api';
import {selectBookmarks} from '../state/slices/userSlice';
import {Topic} from '../types/topic';

const HomeScreen = ({navigation}: RootStackScreenProps<'Home'>) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [topics, setTopics] = useState([]);
  const bookmarks = useSelector(selectBookmarks);

  const handleSearch = async () => {
    const data = await fetchTopics(searchQuery);
    setTopics(data);
  };

  useEffect(() => {
    const getTopics = async () => {
      const data = await fetchTopics(searchQuery);
      setTopics(data);
    };
    getTopics();
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Type here..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onIconPress={handleSearch}
        onTouchCancel={() => setSearchQuery('')}
        onEndEditing={handleSearch}
        autoCorrect={false}
        icon={() => <Icon name="search" style={styles.icon} fill="gray" />}
        clearIcon={() => <Icon name="close" style={styles.icon} fill="gray" />}
        style={styles.searchBar}
      />
      <FlatList
        data={topics}
        keyExtractor={(item: Topic) => item.id}
        renderItem={({item, index}) => (
          <View
            style={styles.listItem}
            onTouchEnd={() => navigation.navigate('Topic', item)}>
            <Text style={styles.no}>{index + 1}</Text>
            <Text style={styles.title}>{item.title}</Text>
            {(bookmarks.some(el => el == item.id) && (
              <Icon name="star" style={styles.icon} fill="yellow" />
            )) || <Icon name="star-outline" style={styles.icon} fill="gray" />}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  searchBar: {
    width: '100%',
    marginTop: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    fontSize: 18,
    padding: 10,
  },
  no: {
    width: 40,
    fontSize: 18,
    alignSelf: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: 'black',
  },
});

export default HomeScreen;
