import axios from 'axios';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCatByBreed } from './js/cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_SuWdXaKUaAUsBmMcezPdxpsApNiENhyHnMzu6svoRao6yBi60Xa4GGe0ubNB02GB';

const select = document.getElementById('breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

const apiUrl = 'https://api.thecatapi.com/v1/';
const breedsUrl = 'breeds';
const searchImagesUrl = 'images/search';

const fetchBreeds = () => {
  select.style.display = 'none';
  axios
    .get(`${apiUrl}${breedsUrl}`)
    .then(response => {
      response.data.forEach(
        item =>
          (select.innerHTML += `<option value="${item.id}">${item.name}</option>`)
      );
      new SlimSelect({
        select: select,
      });
      select.style.display = 'block';
    })
    .catch(er => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    })
    .finally(() => (loader.style.display = 'none'));
};

select.addEventListener('change', () => {
  loader.style.display = 'inline-block';
  const breedId = select.value;
  fetchCatByBreed(breedId, catInfo, loader, axios, apiUrl, searchImagesUrl);
});

fetchBreeds();
