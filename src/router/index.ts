import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Signin from '../components/Signin.vue'
import Signup from '../components/Signup.vue'
import Find from '../components/Find.vue'
import MovieDetail from '../components/MovieDetail.vue'
import Ratings from '../components/Ratings.vue'
import Reviews from '../components/Reviews.vue'
import Trailer from '../components/Trailer.vue'
import ReviewForm from '../components/ReviewForm.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/signin', component: Signin },
  { path: '/register', component: Signup },
  { path: '/find', component: Find },
  { path: '/movie/:id', component: MovieDetail },
  { path: '/ratings/:id', component: Ratings },
  { path: '/reviews/:id', component: Reviews },
  { path: '/trailer/:id', component: Trailer },
  { path: '/movies/:movieId/review', component: ReviewForm },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router