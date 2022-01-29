// TODO:
// API Call
// Dark mode toggle.
// Search
// Filter
// Modal

get_countries();
const countries_el = document.getElementById('countries');


async function get_countries()
{
    const res = await fetch('https://restcountries.com/v3.1/all');
    const countries = await res.json();

    console.log(countries);
    display_countries(countries);
}

function display_countries(countries)
{
    for (let i = 0; i < countries.length; i++) {
        const country_el = document.createElement('div');
        country_el.classList.add('card');
    
        country_el.innerHTML = `
            <div class="card-header">
                <img src="${countries[i].flags.svg}" alt="Peru">
            </div>
            <div class="card-body">
                <h2>${countries[i].name.common}</h2>
                <p><strong>Population: </strong>${countries[i].population}</p>
                <p><strong>Region: </strong>${countries[i].region}</p>
                <p><strong>Capital: </strong>${countries[i].capital}</p>
            </div>
        `;
        countries_el.appendChild(country_el);
    }
    
}
