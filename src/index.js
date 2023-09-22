import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApi from "./pixabay-api";


const refs = {
  form: document.querySelector('.search-form'),
  imgGallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more')
};

const newsApi = new NewsApi();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoaderMore);

function onSearch(evt) {
  evt.preventDefault();

  newsApi.searchQueru = evt.currentTarget.searchQuery.value;
  newsApi.resetPage();
  newsApi.axiosRequest();

};

function onLoaderMore(evt) {
  newsApi.axiosRequest();
}



