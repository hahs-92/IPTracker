
// const map = L.map('mapid', {
//     center: [51.505, -0.09],
//     zoom: 13
// })

let placePoition 

const input = document.querySelector('input')
const button = document.querySelector('.Button')

const map = L.map('mapid')

const URLAPIMAPS = 'https://geo.ipify.org/api/v1?apiKey=at_AwEniPKICA1wLEJS0GpEcwGy0Yb8m'

let latitude = 6.43809
let longitude = -75.33136

const getInfoUser = (e) => {
    // console.log(e)
    let ip = input.value
    const url = `${ URLAPIMAPS}&ipAddress=${ ip }` 

    getData(url)
}

button.addEventListener('click', getInfoUser)


const getData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    
    latitude = data.location.lat
    longitude = data.location.lng

    renderMap(latitude, longitude)
}


// const positionUser = ( position) => {
//     placePoition = [ position.coords.latitude, position.coords.longitude]
//     console.log(placePoition)
// }

// const errorNavigator = (error) => {
//     console.error(error.message)
// }

// navigator.geolocation.getCurrentPosition(positionUser, errorNavigator,{ enableHighAccuracy: true })
// console.log(placePoition)


const renderMap = (lat, lng) => {
    map.setView([lat, lng], 16)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([lat, lng]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
}

renderMap(latitude, longitude)

