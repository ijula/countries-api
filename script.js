// TODO:
// Search.
// Filter.
// Modal.


const countries_el = document.getElementById('countries');
const darkmode_btn = document.getElementById('dark-mode');
const search_el = document.getElementById('search');
const filter_btn = document.getElementById('filter');
const filter_region = filter_btn.querySelectorAll('li');
const modal = document.getElementById('modal');
const close_btn = document.getElementById('close');

get_countries();


// sort an array by name.common key.
function sort_by_key(array)
{
    return array.sort(function(a, b) {
        //console.log(a.name.common);
        var x = a.name.common;
        var y = b.name.common;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

async function get_countries()
{
    const res = await fetch('https://restcountries.com/v3.1/all');
    const countries = await res.json();

    //console.log(countries); // unsorted, as they come from the API.
    //countries_sorted = sort_by_key(countries);
    sort_by_key(countries);
    //console.log(countries_sorted);

    display_countries(countries);
}

function display_countries(countries)
{
    // clear the element before displaying the countries.
    countries_el.innerHTML = '';

    countries.forEach(country => {
        const country_el = document.createElement('div');
        country_el.classList.add('card');
    
        country_el.innerHTML = `
            <div class="card-header">
                <img src="${country.flags.svg}" alt="Peru">
            </div>
            <div class="card-body">
                <h2 class="country-name">
                    ${country.name.common}
                </h2>
                <p class="country-codes" style="display: none">
                    <strong>Codes: </strong>${country.cca2}, ${country.cca3}
                </p>
                <p class="country-capital">
                    <strong>Capital: </strong>${country.capital}
                </p>
                <p class="country-region">
                    <strong>Region: </strong>${country.region}
                </p>
                <p class="country-population">
                    <strong>Population: </strong>${country.population}
                </p>
            </div>
        `;

        //console.log(typeof country);

        country_el.addEventListener('click', () =>  {
            modal.style.display = 'flex';
            show_country_details(country);
        });

        countries_el.appendChild(country_el);
    });
}

function show_country_details(country)
{
    //console.log(typeof country);
    const modal_body = modal.querySelector('.modal-body');
    const modal_img = modal.querySelector('img');

    modal_img.src = country.flags.svg;

    modal_body.innerHTML = `
        <h2 class=country-name">${country.name.common}</h2>
        <p>
            <strong>Region:</strong>
            ${country.region}
        </p>
    `;
}

// when clicked, toggle the dark class.
darkmode_btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// when clicked, toggle the filter class.
filter_btn.addEventListener('click', () => {
    filter_btn.classList.toggle('open');
});

// close the modal.
close_btn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// search by country name, code or capital.
// apply a style based on the search value from the search input.
search_el.addEventListener('input', (e) => {
    const search_term = e.target.value;
    //console.log(search_term);

    // the search applies to multiple classes.
    const query_list = document.querySelectorAll('.country-name');

    // use the HTML that we already have in the DOM.
    // and only apply a style on it, hiding or showing it.
    query_list.forEach((i) => {
        //console.log("innerText: " + i.innerText);
        if (i.innerText.toLowerCase().includes(search_term.toLowerCase())) {
            // .card -> .card-body -> .country-name.
            i.parentElement.parentElement.style.display = 'block';
        } else {
            // do not show it.
            i.parentElement.parentElement.style.display = 'none';
        }
    });
});

// add a filter on the li inside the .dropdown.
filter_region.forEach(filter => {
    filter.addEventListener('click', (e) => {
        filter_value = filter.innerHTML;
        //console.log(filter_value);

        const query_list = document.querySelectorAll('.country-region');

        // use the HTML that we already have in the DOM.
        // and only apply a style on it, hiding or showing it.
        query_list.forEach((i) => {
            console.log("innerText: " + i.innerText);
            if (i.innerText.includes(filter_value) || filter_value === 'All') {
                i.parentElement.parentElement.style.display = 'block';
            } else {
                // do not show it.
                i.parentElement.parentElement.style.display = 'none';
            }
        });
    });
});
