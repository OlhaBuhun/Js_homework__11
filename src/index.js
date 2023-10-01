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


async function onSearch(evt) {
 try { evt.preventDefault();
  refs.imgGallery.innerHTML = '';

  newsApi.searchQueru = evt.currentTarget.searchQuery.value;
  console.log(newsApi.searchQueru);
  newsApi.resetPage();
  Notiflix.Loading.standard({
    backgroundColor: 'rgba(0,0,0,0)',
  })
  if(!newsApi.searchQueru){
        throw new Error()
      }
  const hits = await newsApi.axiosRequest();
  Notiflix.Loading.remove();
  appendMarkup(hits);
  Notiflix.Notify.success(
    `Hooray! We found ${newsApi.totalHits} images.`,
    {
      timeout: 6000,
      width: '500px',
    },
  );

  }catch(e){
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      timeout: 6000,
      width: '500px',
    },
  );
}
  
};

function onLoad(entries, observer){
  entries.forEach(entry => {
    if(entry.isIntersecting){
      Notiflix.Loading.standard({
        backgroundColor: 'rgba(0,0,0,0)',
      })
      newsApi.axiosRequest()
      .then(hits => {
        Notiflix.Loading.remove();
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









