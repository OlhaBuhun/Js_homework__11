import axios from "axios";

export default class NewsApi {
  constructor() {
    this.searchQueru = '';
    this.page = 1;
  }

  axiosRequest() {
    const BASE_URL = 'https://pixabay.com/api/';
    const keyApi = '39533790-85df6cbf34193d8f2f0ca09de';

    const queryParameters = {
      'key': keyApi,
      'g' : this.searchQueru,
      'image_type': 'photo',
      'orientation': 'horizontal',
      'safesearch': 'true',
      'per_page': 40,
      'page': this.page,
    };
  
    axios.get(BASE_URL, {
      params: queryParameters,
    })
    .then( (response)=> {
      // console.log(response.data);
      return response.data
    })
    .then(data => {
      this.incrementPage();
    })
  };

  incrementPage() {
    this.page += 1;
  };

  resetPage() {
    this.page = 1;
  };

  get query() {
    return this.searchQueru;
  };

  set query (newQwuery) {
    this.searchQueru = newQwuery;
  }
}





