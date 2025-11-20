import { defineStore } from 'pinia';
import { reactive } from 'vue';
import api from '../api';

export const useGlobalStore = defineStore('global', () => {
  // --- User state ---
  const user = reactive({
    token: localStorage.getItem('token'),
    id: null,
    email: null,
    isAdmin: false
  });

  // --- User functions ---
  async function getUserDetails(token) {
    if (!token) 
    {
      user.token = null;
      user.id = null;
      user.username = null;
      user.email = null;
      user.isAdmin = false;
      return;
    }

    try {
      const { data } = await api.get('/users/details');
      	user.token = token;
        user.id = data.user._id;
        user.username = data.user.username;
      	user.email = data.user.email;
        user.isAdmin = data.user.isAdmin;
    } catch (err) {
      console.error('Failed to get user details:', err);

      user.token = null;
      user.id = null;
      user.username = null;
      user.email = null;
      user.isAdmin = false;
    }
  }

  return {
    user,
    getUserDetails
  };
});