import './styles.css';

// import { notice } from '@pnotify/core';
// import '@pnotify/core/dist/BrightTheme.css';
// import '@pnotify/core/dist/Material.css';
// import '@pnotify/core/dist/PNotify.css';
// import 'material-design-icons/iconfont/material-icons.css';
import debounce from 'lodash.debounce';
// import countries from './js/fetchCountries';

const finder = document.querySelector('.finder');
const content = document.querySelector('.content');

const createMarkup = (country) => {
    return `
    <li>
    <h2>${country.name}</h2>
    <h2>Capital: ${country.capital}</h2>
    <h2>Population: ${country.population}</h2>
    <h2>Languages: ${country.languages[0].name}</h2>
    <img src="${country.flag}" width="100">
    </li>
    `;
};
const getData = (e) => {
    fetch(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
        .then(response => {
            // console.log(response.json());
            return response.json()
        })
        .then((data) => {
            content.innerHTML = `<ul>${data.reduce((acc, item) => {
                acc += createMarkup(item);
                return acc;
            }, "")}</ul>`;
        });

};



finder.addEventListener('input', getData)


