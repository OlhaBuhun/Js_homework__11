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
  rootMargin: "300px",
  threshold: 1.0,
};

const observer = new IntersectionObserver(onLoad, options);


function onSearch(evt) {
  evt.preventDefault();
  refs.imgGallery.innerHTML = '';

  newsApi.searchQueru = evt.currentTarget.searchQuery.value;

  newsApi.resetPage();
  newsApi.axiosRequest()
  .then(hits => {
       appendMarkup(hits);
      //  gallery.refresh();
  });
  
};

function onLoad(entries, observer){
  console.log(entries);
  console.log(observer);
  entries.forEach(entry => {
    if(entry.isIntersecting){
      newsApi.axiosRequest()
      .then(hits => {
       appendMarkup(hits);
       if(newsApi.page*40 === newsApi.totalHits){
        // Notiflix.Notify.warning('We are sorry, but you have reached the end of search results.');
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
    // captionsData:'alt',
    // captionPosition: 'bottom',
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

// new SimpleLightbox('.photo-card a', {
//   captionsData:'alt',
//   captionPosition: 'bottom',
//   captionDelay: 250,
//   docClose: 'true'
// });



// gallery.refresh(); // Next Image



