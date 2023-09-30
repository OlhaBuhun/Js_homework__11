import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApi from "./pixabay-api";




const refs = {
  form: document.querySelector('.search-form'),
  imgGallery: document.querySelector('.gallery'),
  guard: document.querySelector('.is-guard'),
};

refs.form.addEventListener('submit', onSearch);
// Notiflix.Block.arrows('.search-form');

const newsApi = new NewsApi();

const options = {
  root: null,
  rootMargin: "200px",
  threshold: 1.0,
};

const observer = new IntersectionObserver(onLoad, options);


function onSearch(evt) {
  evt.preventDefault();
  refs.imgGallery.innerHTML = '';

  newsApi.searchQueru = evt.currentTarget.searchQuery.value;
  console.log(newsApi.searchQueru);
  newsApi.resetPage();

  if(!newsApi.searchQueru){
        throw new Error()
      }
  newsApi.axiosRequest()
  .then(hits => {
       appendMarkup(hits);
      //  gallery.refresh();
  });
  
};

function onLoad(entries, observer){
  entries.forEach(entry => {
    if(entry.isIntersecting){
      newsApi.axiosRequest()
      .then(hits => {
       appendMarkup(hits);
       if(newsApi.page === Math.ceil(newsApi.totalHits/newsApi.per_page)){
        Notiflix.Notify.failure(
          'We are sorry, but you have reached the end of search results.',
          {
            timeout: 10000,
            width: '500px',
          },
        );
        observer.unobserve(refs.guard);
       }
  })
    }
  })
}


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
  
  const gallery = new SimpleLightbox('.photo-card a', {
    captionDelay: 250,
    docClose: 'true'
  });
 
  observer.observe(refs.guard);
  gallery.refresh();

  const { height: cardHeight } = refs.imgGallery
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  }); 
  
 
}









