const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_URLS = {
  articles: `${API_BASE_URL}/articles`
};

export default API_URLS;
