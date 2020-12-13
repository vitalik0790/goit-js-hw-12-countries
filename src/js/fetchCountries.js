const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

export default function fetchCountrie(searchQuery) {
    return fetch(`${BASE_URL}${searchQuery}`).then(response => response.json());
}
