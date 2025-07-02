<template>
  <form @submit.prevent="submitReview" class="review-form">
    <h3>Yorum Ekle</h3>

    <div>
      <label for="title">Title</label>
      <input v-model="title" id="title" required />
    </div>

    <div>
      <label for="description">Description</label>
      <textarea v-model="description" id="description" required></textarea>
    </div>

    <div>
      <label for="rating">Puan</label>
      <input v-model.number="rating" type="number" min="1" max="10" required />
    </div>

    <div>
      <label for="country">Country</label>
      <select v-model="country" required>
        <option disabled value="">Choose Country</option>
        <option value="tr">Turkey</option>
        <option value="us">United States</option>
        <option value="de">Germany</option>
        <option value="in">India</option>
        <option value="uk">United Kingdom</option>
      </select>
    </div>

    <button type="submit">Send</button>

    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { ReviewsController } from "../shared/ReviewsController"
import { fetchUser, user, signedIn, signOut } from '../auth'

const route = useRoute()
const movieId = Number(route.params.movieId)

const title = ref("")
const description = ref("")
const rating = ref<number>(5)
const country = ref("")
const message = ref("")
const error = ref("")

async function submitReview() {
  error.value = ""
  message.value = ""

  try {
    await ReviewsController.addReview(
      movieId,
      title.value,
      description.value,
      rating.value,
      country.value
    )
    message.value = "Yorum başarıyla eklendi!"
    title.value = ""
    description.value = ""
    rating.value = 5
    country.value = ""
  } catch (err: any) {
    error.value = err.message
  }
}

onMounted(() => {
  fetchUser()
})
</script>

<style scoped>
label {
    color: white;
}

.review-form {
  border: 1px solid #ccc;
  padding: 1rem;
  max-width: 400px;
}
.review-form input,
.review-form textarea,
.review-form select {
  width: 100%;
  margin-bottom: 0.5rem;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>
