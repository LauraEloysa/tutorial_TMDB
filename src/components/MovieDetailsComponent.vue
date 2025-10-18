<script setup>
import { defineProps, onMounted } from 'vue';
import { useMovieStore } from '@/store/movies';
const movieStore = useMovieStore();

const props = defineProps({
  movieId: {
    type: [String, Number],
    required: true,
  },
});

const movieId = Number(props.movieId);

onMounted(async () => {
  await movieStore.getMovieDetail(movieId);
});
</script>
<template>
  <div class="main">
    <div class="background-shape">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="content">
      <div class="image-box">
        <img
          :src="`https://image.tmdb.org/t/p/w300${movieStore.currentMovie.poster_path}`"
          :alt="movieStore.currentMovie.title"
        />
      </div>

      <div class="details">
        <h2>Venha ver este filme incrível</h2>
        <h1 class="highlight">{{ movieStore.currentMovie.title }}</h1>
        <p class="tagline">{{ movieStore.currentMovie.tagline }}</p>
        <p class="overview">{{ movieStore.currentMovie.overview }}</p>
        <p>Orçamento: ${{ movieStore.currentMovie.budget }}</p>
        <p>Avaliação: {{ movieStore.currentMovie.vote_average }}</p>

        <div class="buttons">
          <button class="primary">Assistir agora</button>
          <button class="secondary">Mais informações</button>
        </div>
      </div>
    </div>
  </div>

  <p class="prod-label">Produtoras</p>
  <div class="companies">
    <template
      v-for="company in movieStore.currentMovie.production_companies"
      :key="company.id"
    >
      <img
        v-if="company.logo_path"
        :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
        :alt="company.name"
      />
      <p v-else>{{ company.name }}</p>
    </template>
  </div>
</template>

<style scoped>
.main {
  position: relative;
  background: #ffc5ff86;
  border-radius: 1rem;
  margin: 4vw;
  padding: 3rem 8rem;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

.background-shape {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.background-shape span {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 182, 193, 0.4);
  animation: float 12s ease-in-out infinite;
  z-index: 0;
}
.background-shape span:nth-child(1) {
  width: 100px;
  height: 100px;
  top: 3%;
  left: 5%;
}

.background-shape span:nth-child(2) {
  width: 150px;
  height: 150px;
  top: 26%;
  left: 35%;
  background: rgba(221, 160, 221, 0.3);
}

.background-shape span:nth-child(3) {
  width: 120px;
  height: 120px;
  bottom: 5%;
  left: 15%;
  background: rgba(255, 192, 203, 0.4);
}

.background-shape span:nth-child(4) {
  width: 200px;
  height: 200px;
  bottom: 15%;
  right: 28%;
  background: rgba(255, 105, 180, 0.25);
}

.background-shape span:nth-child(5) {
  width: 70px;
  height: 70px;
  top: 25%;
  right: 10%;
  background: rgba(238, 130, 238, 0.3);
}
@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(180deg);
  }
  100% {
    transform: translateY(0) rotate(360deg);
  }
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
}

.image-box img {
  width: 25vw;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 0 1.5rem rgba(255, 105, 180, 0.4);
  object-fit: cover;
}

.details {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.details h2 {
  font-size: 1.2rem;
  color: #7f077e;
  margin-bottom: 0.5rem;
}

.details .highlight {
  font-size: 2.5rem;
  color: #9f379e;
  font-weight: 900;
}

.details .tagline {
  font-size: 1.2rem;
  color: #7f077e;
  font-style: italic;
}

.details .overview {
  color: #555;
  line-height: 1.5;
}

.buttons {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.primary,
.secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

.primary {
  background: #7f077e;
  color: white;
}

.primary:hover {
  background: #690568;
}

.secondary {
  background: transparent;
  border: 2px solid #7f077e;
  color: #7f077e;
}

.secondary:hover {
  background: #fce4ec;
}

.prod-label {
  font-weight: bold;
  color: #b30086;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 3rem;
}

.companies {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.companies img {
  width: 80px;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(255, 105, 180, 0.3);
}

.companies p {
  font-weight: bold;
  color: #9f379e;
  text-align: center;
  font-size: 0.9rem;
}

</style>
