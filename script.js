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
    countries_sorted = sort_by_key(countries);
    console.log(countries_sorted);

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
                <p class="country-codes" style="display: none">
                    <strong>Codes: </strong>${countries[i].cca2}, ${countries[i].cca3}
                </p>
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
        console.log("name.innerText: " + i.innerText);
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
        //console.log(filter.innerHTML);

        const query_list = document.querySelectorAll('.country-region');
        if (filter.innerHTML === 'All') {
            query_list.forEach((i) => {
                i.parentElement.parentElement.style.display = 'block';
            });
        } else {
            // use the HTML that we already have in the DOM.
            // and only apply a style on it, hiding or showing it.
            query_list.forEach((i) => {
                //console.log("name.innerText: " + i.innerText);
                if (i.innerText.toLowerCase().includes(filter.innerHTML.toLowerCase())) {
                    i.parentElement.parentElement.style.display = 'block';
                } else {
                    // do not show it.
                    i.parentElement.parentElement.style.display = 'none';
                }
            });
        }
    });
});
