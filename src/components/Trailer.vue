<script setup lang="ts">
import Navbar from './Navbar.vue';
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { MoviesController } from "../shared/MoviesController";
import type { Movie } from "../shared/movie";

const route = useRoute();
const movie = ref<Movie | null | any>(null);

onMounted(async () => {
  const id = Number(route.params.id);
  if (!isNaN(id)) {
    movie.value = await MoviesController.getMovieById(id);
  }
});
</script>

<template>
    <Navbar />

  <div class="video-container">
    <video
      :src="movie?.trailer_url"
      autoplay
      muted
      playsinline
      controls
      class="video-player"
    ></video>
  </div>
</template>

<style scoped>
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
}

.video-player {
  max-width: 90vw;
  max-height: 80vh;
  border-radius: 8px;
}
</style>