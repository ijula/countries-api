// TODO:
// Dark mode toggle.
// Search.
// Filter.
// Modal.

get_countries();
const countries_el = document.getElementById('countries');
const darkmode_btn = document.getElementById('dark-mode');


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
                <h2>${countries[i].name.common}</h2>
                <p><strong>Capital: </strong>${countries[i].capital}</p>
                <p><strong>Region: </strong>${countries[i].region}</p>
                <p><strong>Population: </strong>${countries[i].population}</p>
            </div>
        `;
        countries_el.appendChild(country_el);
    }
}

darkmode_btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});
