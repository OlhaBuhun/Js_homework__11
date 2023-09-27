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
      'q' : this.searchQueru,
      'image_type': 'photo',
      'orientation': 'horizontal',
      'safesearch': 'true',
      'per_page': 10,
      'page': this.page,
    };
  
    return axios.get(BASE_URL, {
      params: queryParameters,
    })
    .then( (response)=> {
      // if(!response.ok){
      //   throw new Error()
      // }
      return response.data})
    .then(data => {
      this.incrementPage();
      return data.hits;
      
    })
  };

  incrementPage() {
    this.page += 1;
  };

  resetPage() {
    this.page = 1;
  };

  // get query() {
  //   return this.searchQueru;
  // };

  // set query (newQwuery) {
  //   this.searchQueru = newQwuery;
  // }
}





