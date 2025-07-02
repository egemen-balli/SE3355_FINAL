import { createI18n } from 'vue-i18n'

const browserLang = navigator.language.startsWith('tr') ? 'tr' : 'en'

const savedLang = localStorage.getItem('lang')
const defaultLang = savedLang || browserLang

export const i18n = createI18n({
  legacy: false,
  locale: defaultLang,
  fallbackLocale: 'en',
  messages: {
    en: {
      language:'EN',
      menu:'Menu',
      dropdownAll: 'All',
      dropdownTitles:'Titles',
      dropdownTvepisodes:'TV Episodes',
      dropdownCelebs:'Celebs',
      dropdownCompanies:'Companies',
      dropdownKeywords:'Keywords',
      dropdownAdvancedSearch:'Advanced Search',
      searchBar:'Search IMDb',
      watchlist:'Watchlist',
      signIn:'Sign in',
      top10: 'Top 10 on IMDb this week',
      trailer:'Trailer',
    },
    tr: {
      language:'TR',
      menu:'Menü',
      dropdownAll: 'Tümü',
      dropdownTitles:'Filmler',
      dropdownTvepisodes:'Dizi Bölümleri',
      dropdownCelebs:'Ünlüler',
      dropdownCompanies:'Şirketler',
      dropdownKeywords:'Anahtar Kelimeler',
      dropdownAdvancedSearch:'Gelişmiş Arama',
      searchBar:'IMDb\'de Ara',
      watchlist:'İzleme Listesi',
      signIn:'Giriş yap',
      top10: 'IMDb\'de bu hafta en popüler 10 yapım',
      trailer:'Fragman',
    }
  }
})
