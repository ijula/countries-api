// TODO:
// API Call
// Dark mode toggle.
// Search
// Filter
// Modal

get_countries();

async function get_countries() {
    const res = await fetch('https://restcountries.com/v3.1/all');
    const countries = await res.json();

    console.log(countries);
}
