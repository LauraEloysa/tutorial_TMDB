import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useGenreStore = defineStore('genre', () => {
  const genres = ref([]);
  const selectedGenre = ref(null);

  const getAllGenres = async (type) => {
    const response = await api.get(`genre/${type}/list?language=pt-BR`);
    genres.value = response.data.genres;
  };

  const getGenreName = (id) => {
    const genre = genres.value.find((g) => g.id === id);
    return genre ? genre.name : '';
  };

  const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

  return { genres, selectedGenre, getAllGenres, getGenreName, formatDate };
});
