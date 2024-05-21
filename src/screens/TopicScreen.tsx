import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import {RootStackScreenProps} from '../navigation/NavigatorTypes';
import {
  addBookmark,
  removeBookmark,
  addNote,
  removeNote,
  selectBookmarks,
  selectNotes,
} from '../state/slices/userSlice';

const TopicScreen = ({route}: RootStackScreenProps<'Topic'>) => {
  const {id, title, content} = route.params;

  const bookmarks = useSelector(selectBookmarks);
  const notes = useSelector(selectNotes);

  const dispatch = useDispatch();

  const handleBookmark = () => {
    if (bookmarks.some(el => el == id)) dispatch(removeBookmark(id));
    else dispatch(addBookmark(id));
  };

  const handleNote = () => {
    if (notes.hasOwnProperty(id)) dispatch(removeNote(id));
    else dispatch(addNote({id, note: 'New Note'}));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={handleBookmark}>{`${
          bookmarks.some(el => el == id) ? 'Remove Bookmark' : 'Add Bookmark'
        }`}</Button>
        <Button onPress={handleNote}>{`${
          notes.hasOwnProperty(id) ? 'Remove Note' : 'Add Note'
        }`}</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    gap: 10,
  },
  title: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default TopicScreen;
