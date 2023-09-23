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
  newsApi.axiosRequest().then(appendMarkup);
  gallery.refresh()
  
};

function onLoaderMore(evt) {
  newsApi.axiosRequest().then(appendMarkup);
  gallery.refresh()
  
};

function renderCard(arr) {
  return arr.map (({webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
  ` <div class="photo-card">
    <a class="gallery__link" href="${largeImageURL}">
    <img class="gallery__image" src="${webformatURL}" alt="${tags} 
     loading="lazy" />
    <div class="info">
    <p class="info-item">
    Likes
      <b>${likes}</b>
    </p>
    <p class="info-item">
    Views
      <b>${views}</b>
    </p>
    <p class="info-item">
    Comments
      <b>${comments}</b>
    </p>
    <p class="info-item">
    Downloads
      <b>${downloads}</b>
    </p>
  </div>
  </a>
</div>`).join('');

}

function appendMarkup(hits) {
  refs.imgGallery.insertAdjacentHTML('beforeend', renderCard(hits));
  // let gallery = $('.photo-card a').simpleLightbox();
  let gallery = new SimpleLightbox('.photo-card a', {
    // captionsData:'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    docClose: 'true'
  });
}

// new SimpleLightbox('.photo-card a', {
//   captionsData:'alt',
//   captionPosition: 'bottom',
//   captionDelay: 250,
//   docClose: 'true'
// });



// gallery.refresh(); // Next Image

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.

