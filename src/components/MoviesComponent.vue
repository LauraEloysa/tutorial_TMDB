<script setup>
import { ref, onMounted } from 'vue';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/store/genre';
import api from '@/plugins/axios'

import { useRouter } from 'vue-router';
const router = useRouter()
const store = useGenreStore();
const isLoading = ref(false);
const moviesGenres = ref([]);
const movies = ref([]);

onMounted(async () => {
  isLoading.value = true;
  await store.getAllGenres('movie');
  moviesGenres.value = store.genres;
  isLoading.value = false;
});

const listMovies = async (genreId) => {
  store.selectedGenre = genreId;
  isLoading.value = true;
  const response = await api.get('discover/movie', {
    params: { with_genres: genreId, language: 'pt-BR' },
  });
  movies.value = response.data.results;
  isLoading.value = false;
};




function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}
</script>

<template>
  <div>
    <h1>Gêneros de Filmes</h1>
    <ul class="genre-list">
      <li v-for="genre in moviesGenres" :key="genre.id" @click="listMovies(genre.id)" class="genre-item"
        :class="{ active: store.selectedGenre === genre.id }">
        {{ genre.name }}
      </li>
    </ul>
  </div>

  <div class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-card">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
        @click="openMovie(movie.id)" />
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">{{ store.formatDate(movie.release_date) }}</p>
        <p class="movie-genres">
          <span v-for="genre_id in movie.genre_ids" :key="genre_id" @click="listMovies(genre_id)">
            {{ store.getGenreName(genre_id) }}
          </span>
        </p>
      </div>
    </div>
  </div>

  <loading v-model:active="isLoading" is-full-page />
</template>


<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  list-style: none;
  padding: 0;
}

.genre-item {
  background-color: #b172ad;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
}

.genre-item:hover {
  background-color: #6a3068;
}

.genre-item.active {
  --bg-size: 400%;
  --color-one: #945493;
  --color-two: #dbabbd;
  background: linear-gradient(90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)) 0 0 / var(--bg-size) 100%;
  animation: move-bg 8s infinite linear;
}

@keyframes move-bg {
  to {
    background-position: var(--bg-size) 0;
  }
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  margin: 2rem 0;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  background: #fff;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  object-fit: cover;
}

.movie-details {
  padding: 0.5rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.movie-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
  margin-top: 0.5rem;
}

.movie-genres span {
  background-color: #ab52a8;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: #91398f;
  box-shadow: 0 0 0.5rem #e185dc;
}
</style>
