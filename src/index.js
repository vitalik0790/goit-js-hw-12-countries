import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

import fetchCountries from './js/fetchCountries'
import debounce from 'lodash.debounce';

import countryList from './templates/country-list.hbs';
import countryCard from './templates/country-card.hbs';


const refs = {
    input: document.querySelector('.input'),
    output: document.querySelector('.result'),
};

refs.input.addEventListener('input', onSearchInput);

function onSearchInput(e) {
    if (!e.target.value) {
        refs.output.innerHTML = '';
        return;
    }
    fetchCountries(e.target.value)
        .then(countries => {
            if (countries.status === 404) {
                return Promise.reject(
                    'The country for your request was not found.Please try again',
                );
            }

            if (countries.length > 10) {
                error({
                    text: 'Too many matches found.Please enter a more specific query!',
                });
                return;
            }

            countries.length >= 2
                ? renderCountriesList(countries)
                : renderCountryCard(countries);
        })
        .catch(err => {
            error({
                text: err,
            });
        });
}

function renderCountriesList(countries) {
    refs.output.innerHTML = countryList(countries);
}
function renderCountryCard(countries) {
    refs.output.innerHTML = countryCard(countries);
}






