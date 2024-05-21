import axios from 'axios';
import {Topic} from '../types/topic';

const API_URL = 'http://localhost:3000/topics';

export const fetchTopics = async (searchQuery: string) => {
  try {
    const {data} = await axios.get(`${API_URL}`);
    const result = data.filter(
      ({id, title, content}: Topic) =>
        title.includes(searchQuery) || content?.includes(searchQuery),
    );
    return result;
  } catch (error) {
    console.error('Failed to fetch topics:', error);
    throw error;
  }
};
