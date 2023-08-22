import { Notify } from 'notiflix/build/notiflix-notify-aio';

const renderInfo = (data, catInfo) => {
  const info = data.breeds[0];
  catInfo.innerHTML = `<img src="${data.url}" loading="lazy" class="cat-img"></img><div class="cat-info-text"><h2>${info.name}</h2><p>${info.description}</p><p><b>Temperament</b>:${info.temperament}</p></div>`;
};

const fetchCatByBreed = (
  breedId,
  catInfo,
  loader,
  error,
  axios,
  apiUrl,
  searchImagesUrl
) => {
  catInfo.innerHTML = '';
  catInfo.setAttribute('hidden', '');
  const searchParams = new URLSearchParams({
    breed_ids: breedId,
  });
  axios
    .get(`${apiUrl}${searchImagesUrl}?${searchParams}`)
    .then(response => {
      renderInfo(response.data[0], catInfo);
    })
    .catch(() => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    })
    .finally(() => (loader.style.display = 'none'));
};

export { fetchCatByBreed };
