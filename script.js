// TODO:
// Search.
// Filter.
// Modal.

get_countries();

const countries_el = document.getElementById('countries');
const darkmode_btn = document.getElementById('dark-mode');
const search_el = document.getElementById('search');
const filter_btn = document.getElementById('filter');
const filter_region = filter_btn.querySelectorAll('li');


async function get_countries()
{
    const res = await fetch('https://restcountries.com/v3.1/all');
    const countries = await res.json();

    console.log(countries);
    display_countries(countries);
}

function display_countries(countries)
{
    // clear the element before displaying the countries.
    countries_el.innerHTML = '';

    for (let i = 0; i < countries.length; i++) {
        const country_el = document.createElement('div');
        country_el.classList.add('card');
    
        country_el.innerHTML = `
            <div class="card-header">
                <img src="${countries[i].flags.svg}" alt="Peru">
            </div>
            <div class="card-body">
                <h2 class="country-name">
                    ${countries[i].name.common}
                </h2>
                <p class="country-capital">
                    <strong>Capital: </strong>${countries[i].capital}
                </p>
                <p class="country-region">
                    <strong>Region: </strong>${countries[i].region}
                </p>
                <p class="country-population">
                    <strong>Population: </strong>${countries[i].population}
                </p>
            </div>
        `;
        countries_el.appendChild(country_el);
    }
}

// when clicked, toggle the dark class.
darkmode_btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// when clicked, toggle the filter class.
filter_btn.addEventListener('click', () => {
    filter_btn.classList.toggle('open');
});

// search by country name.
// apply a style based on the search value from the search input.
search_el.addEventListener('input', (e) => {
    const search_term = e.target.value;
    //console.log(search_term);

    // the search applies to multiple classes.
    const query_list = document.querySelectorAll('.country-name, .country-capital');
    
    // use the HTML that we already have in the DOM.
    // and only apply a style on it, hiding or showing it.
    query_list.forEach((name) => {
        console.log(name.innerText);

        if (name.innerText.toLowerCase().includes(search_term.toLowerCase())) {
            name.parentElement.parentElement.style.display = 'block';
        } else {
            // do not show it.
            name.parentElement.parentElement.style.display = 'none';
        }
    });
});



//console.log(filter_region);
