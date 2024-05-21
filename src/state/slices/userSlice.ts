import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface UserState {
  bookmarks: string[];
  notes: Record<string, string>;
}

const initialState: UserState = {
  bookmarks: [],
  notes: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addBookmark(state, action: PayloadAction<string>) {
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
      };
    },
    removeBookmark(state, action: PayloadAction<string>) {
      return {
        ...state,
        bookmarks: [...state.bookmarks.filter(el => el != action.payload)],
      };
    },
    addNote(state, action: PayloadAction<{id: string; note: string}>) {
      return {
        ...state,
        notes: {...state.notes, [action.payload.id]: action.payload.note},
      };
    },
    removeNote(state, action: PayloadAction<string>) {
      const notes = {...state.notes};
      delete notes[action.payload];

      return {
        ...state,
        notes,
      };
    },
  },
});

export const selectBookmarks = (state: RootState) => state.user.bookmarks;
export const selectNotes = (state: RootState) => state.user.notes;
export const {addBookmark, removeBookmark, addNote, removeNote} =
  userSlice.actions;
export default userSlice.reducer;
