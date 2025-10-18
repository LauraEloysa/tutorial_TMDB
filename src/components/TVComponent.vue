<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';

const isLoading = ref(false);
const genres = ref([]);
const tvShows = ref([]);
const selectedGenre = ref(null);


const getAllGenres = async () => {
  const response = await api.get('genre/tv/list', { params: { language: 'pt-BR' } });
  genres.value = response.data.genres;
};


const listTv = async (genreId) => {
  selectedGenre.value = genreId;
  isLoading.value = true;

  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  });

  tvShows.value = response.data.results;
  isLoading.value = false;
};

onMounted(async () => {
  isLoading.value = true;
  await getAllGenres();
  isLoading.value = false;
});
</script>

<template>
  <div>
    <h1>Gêneros de programas de TV</h1>
    <ul class="genre-list">
      <li v-for="genre in genres" :key="genre.id" class="genre-item"
          :class="{ active: selectedGenre === genre.id }"
          @click="listTv(genre.id)">
        {{ genre.name }}
      </li>
    </ul>
  </div>

  <div class="shows-list">
    <div v-for="show in tvShows" :key="show.id" class="shows-card">
      <img :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`" :alt="show.original_name" />
      <div class="shows-details">
        <p class="shows-title">{{ show.original_name }}</p>
        <p class="shows-release-date">{{ show.first_air_date }}</p>
           <p class="show-genres">
  <span v-for="genre_id in show.genre_ids" :key="genre_id">
    {{ genres.find(g => g.id === genre_id)?.name }}
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
    gap: 1.3rem;
    list-style: none;
    padding: 0;
}

.genre-item {
    background-color: #b172ad;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    color: #fff;
}

.genre-item:hover {
    background-color: #6a3068;
    cursor: pointer;
    transition: 0.5s;
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

.shows-list {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    justify-content: center;
    margin: 2rem 0;
}

.shows-card {
    width: 15rem;
    height: 30rem;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 0.5rem #000;
    background: #fff;
}

.shows-card img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
}

.shows-details {
    padding: 0.5rem;
}

.shows-title {
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.3rem;
    height: 3.2rem;
}

.show-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
  margin-top: 0.5rem;
}

.show-genres span {
  background-color: #ab52a8;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.show-genres span:hover {
  cursor: pointer;
  background-color: #91398f;
  box-shadow: 0 0 0.5rem #e185dc;
}
</style>
