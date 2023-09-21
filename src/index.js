import axios from "axios";
import Notiflix from 'notiflix';


const BASE_URL = 'https://pixabay.com/api/';
const keyApi = '39533790-85df6cbf34193d8f2f0ca09de';

const refs = {
  form: document.querySelector('.search-form'),
  imgGallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more')
};

refs.form.addEventListener('submit', onSearch);
refs.form.addEventListener('click', onLoaderMore);

function onSearch(evt) {
  evt.preventDefault();

  const searchQuery = evt.currentTarget.searchQuery.value;
  console.dir(searchQuery);

  const queryParameters = {
    'key': keyApi,
    'g' : searchQuery,
    'image_type': 'photo',
    'orientation': 'horizontal',
    'safesearch': 'true',
    'per_page': 40,
    'page': 1,
  };

  axios.get(BASE_URL, {
    params: queryParameters,
    // headers: {
    //   Authorization: keyApi
    // }
  })
  .then( (response)=> {
    // console.log(response);
    console.log(response.data);
   
})

};

function onLoaderMore(evt) {

}

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = keyApi;


