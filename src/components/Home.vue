<script setup lang="ts">
import Navbar from './Navbar.vue';
import { ref, onMounted, nextTick } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { MoviesController } from "../shared/MoviesController";
import type { Movie } from "../shared/movie";
import { useRouter } from "vue-router"
import { signedIn } from "../auth"
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()

const movie_results = ref<Movie[]>([]);

const sliderRef = ref<HTMLDivElement | null>(null);
const canScrollLeft = ref(true);
const canScrollRight = ref(true);

const updateArrows = () => {
  if (!sliderRef.value) return;
  const el = sliderRef.value;
  canScrollLeft.value = el.scrollLeft > 0;
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
};

const scrollLeft = () => {
  sliderRef.value?.scrollBy({ left: -300, behavior: 'smooth' });
  setTimeout(updateArrows, 300);
};

const scrollRight = () => {
  sliderRef.value?.scrollBy({ left: 300, behavior: 'smooth' });
  setTimeout(updateArrows, 300);
};

onMounted(async () => {
    movie_results.value = await MoviesController.getTopTen();
    await nextTick();
    updateArrows();
})

async function addToWatchlist(movieId: number) {
  if (!signedIn.value) {
    router.push("/signin")
    return
  }

  try {
    const res = await fetch("/api/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ movieId })
    })

    if (!res.ok) throw new Error("Ekleme başarısız")
    alert("Watchlist'e eklendi!")
  } catch (err: any) {
    alert(err.message)
  }
}
</script>

<template>
    <Navbar/>

    <main class="ipc-page-wrapper ipc-page-wrapper--baseAlt">
            <div class="ipc-page-content-container ipc-page-content-container--full sc-242d0d66-0 ceUXDg">
                <div id="ipc-wrap-background-id" style="position:absolute;width:100%;height:100%"></div>
                <div class="ipc-page-content-container ipc-page-content-container--center sc-40c7f91c-0 ffpBnp">
                    <div class="ipc-page-grid ipc-page-grid--bias-left sc-7404859-0 gVLfbJ page-grid">
                        <div id="top-ten" class="sc-b7651f91-0 foGmIn"></div>
                        <section
                            class="ipc-page-section ipc-page-section--baseAlt ipc-page-grid__item ipc-page-grid__item--span-3">
                            <div class="top-ten">
                                <div
                                    class="ipc-title ipc-title--baseAlt ipc-title--subsection-title ipc-title--subsection-title--reduced ipc-title--on-textPrimary">
                                    <hgroup>
                                        <h3 class="ipc-title__text ipc-title__text--reduced">{{ t('top10') }}
                                        </h3>
                                    </hgroup>
                                </div>
                                <div class="sc-e3008202-0 ghlkuX">
                                    <div class="item-enter-done">
                                        <div class="ipc-shoveler ipc-shoveler--base ipc-shoveler--page0">
                                            <div v-if="canScrollLeft" @click="scrollLeft"
                                                class="ipc-shoveler__arrow ipc-shoveler__arrow--visible ipc-shoveler__arrow--right ipc-pager ipc-pager--visible ipc-pager--left ipc-pager--large">
                                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"
                                                    class="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon"
                                                    viewBox="0 0 24 24" fill="currentColor" role="presentation">
                                                    <path
                                                        d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div ref="sliderRef"
                                                class="ipc-sub-grid ipc-sub-grid--page-span-3 ipc-sub-grid--nowrap ipc-shoveler__grid">
                                                <div v-for="(movie, index) in movie_results" :key="movie.id"
                                                    class="ipc-poster-card ipc-poster-card--baseAlt ipc-poster-card--media-radius ipc-poster-card--dynamic-width topten-title ipc-sub-grid-item ipc-sub-grid-item--span-2">
                                                    <div
                                                        class="ipc-poster ipc-poster--baseAlt ipc-poster--media-radius ipc-poster--dynamic-width ipc-poster-card__poster ipc-sub-grid-item ipc-sub-grid-item--span-2">
                                                        <div class="ipc-media ipc-media--poster-27x40 ipc-image-media-ratio--poster-27x40 ipc-media--media-radius ipc-media--baseAlt ipc-media--poster-m ipc-poster__poster-image poster-card-image ipc-media__img"
                                                            style="width: 100%;">
                                                            <img :alt="index+1 + '. ' + movie.title" class="ipc-image" loading="lazy"
                                                                :src="movie.poster_url"
                                                                width="140">
                                                        </div>
                                                        <div
                                                            class="ipc-watchlist-ribbon ipc-focusable ipc-watchlist-ribbon--m ipc-watchlist-ribbon--baseAlt ipc-watchlist-ribbon--onImage ipc-poster__watchlist-ribbon poster-card-watchlist-ribbon">
                                                            <svg class="ipc-watchlist-ribbon__bg" width="24px"
                                                                height="34px" viewBox="0 0 24 34"
                                                                xmlns="http://www.w3.org/2000/svg" role="presentation">
                                                                <polygon class="ipc-watchlist-ribbon__bg-ribbon"
                                                                    fill="#000000"
                                                                    points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343">
                                                                </polygon>
                                                                <polygon class="ipc-watchlist-ribbon__bg-hover"
                                                                    points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343">
                                                                </polygon>
                                                                <polygon class="ipc-watchlist-ribbon__bg-shadow"
                                                                    points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049">
                                                                </polygon>
                                                            </svg>
                                                            <div class="ipc-watchlist-ribbon__icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24"
                                                                    class="ipc-icon ipc-icon--add ipc-icon--inline"
                                                                    viewBox="0 0 24 24" fill="currentColor"
                                                                    role="presentation">
                                                                    <path
                                                                        d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z">
                                                                    </path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <a class="ipc-lockup-overlay ipc-focusable" href="#">
                                                            <div class="ipc-lockup-overlay__screen"></div>
                                                        </a>
                                                    </div>
                                                    <div
                                                        class="ipc-rating-star-group ipc-poster-card__rating-star-group sc-181c6ba1-0 dbMqWz">
                                                        <span
                                                            class="ipc-rating-star ipc-rating-star--baseAlt ipc-rating-star--imdb ipc-rating-star-group--imdb">
                                                            <svg width="24" height="24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="ipc-icon ipc-icon--star-inline"
                                                                viewBox="0 0 24 24" fill="currentColor"
                                                                role="presentation">
                                                                <path
                                                                    d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z">
                                                                </path>
                                                            </svg>
                                                            <span class="ipc-rating-star--rating">{{ movie.rating }}</span>
                                                        </span>
                                                        <button
                                                            class="ipc-rate-button ipc-rating-star-group--unrated ipc-rate-button--unrated ipc-rate-button--baseAlt">
                                                            <span
                                                                class="ipc-rating-star ipc-rating-star--baseAlt ipc-rating-star--rate">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24"
                                                                    class="ipc-icon ipc-icon--star-border-inline"
                                                                    viewBox="0 0 24 24" fill="currentColor"
                                                                    role="presentation">
                                                                    <path
                                                                        d="M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.51l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.81.45-2.348-.785-2.446zm-10.726 8.89l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z">
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <router-link class="ipc-poster-card__title ipc-poster-card__title--clamp-2 ipc-poster-card__title--clickable"
                                                        :to="{ path: `/movie/${movie.id}` }">
                                                        <span>{{ index + 1 }}. {{ movie.title }}</span>
                                                    </router-link>
                                                    <div class="ipc-poster-card__actions">
                                                        <button
                                                            @click="addToWatchlist(movie.id!)"
                                                            class="ipc-btn ipc-btn--full-width ipc-btn--center-align-content ipc-btn--default-height ipc-btn--core-baseAlt ipc-btn--theme-baseAlt ipc-btn--button-radius ipc-btn--on-accent2 ipc-secondary-button">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24"
                                                                class="ipc-icon ipc-icon--add ipc-btn__icon ipc-btn__icon--pre"
                                                                viewBox="0 0 24 24" fill="currentColor"
                                                                role="presentation">
                                                                <path
                                                                    d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z">
                                                                </path>
                                                            </svg>
                                                            <span class="ipc-btn__text">{{ t('watchlist') }}</span>
                                                        </button>
                                                        <div class="sc-7ac894be-0 iQdPig justify--space-around">
                                                            <router-link class="ipc-btn ipc-btn--single-padding ipc-btn--center-align-content ipc-btn--default-height ipc-btn--core-baseAlt ipc-btn--theme-baseAlt ipc-btn--button-radius ipc-btn--on-textPrimary ipc-text-button card-action-button"
                                                                :to="{ path: `/trailer/${movie.id}` }">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24"
                                                                    class="ipc-icon ipc-icon--play-arrow ipc-btn__icon ipc-btn__icon--pre"
                                                                    viewBox="0 0 24 24" fill="currentColor"
                                                                    role="presentation">
                                                                    <path
                                                                        d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z">
                                                                    </path>
                                                                </svg>
                                                                <span class="ipc-btn__text">
                                                                    <div class="trailers-button-text">{{ t('trailer') }}</div>
                                                                </span>
                                                            </router-link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="canScrollRight" @click="scrollRight" class="ipc-shoveler__arrow ipc-shoveler__arrow--visible ipc-shoveler__arrow--right ipc-pager ipc-pager--visible ipc-pager--right ipc-pager--large">
                                                <svg width="24" height="24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="ipc-icon ipc-icon--chevron-right-inline ipc-icon--inline ipc-pager-icon"
                                                    viewBox="0 0 24 24" fill="currentColor" role="presentation">
                                                    <path
                                                        d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
    </main>
</template>

<style scoped>
</style>