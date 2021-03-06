// import icon from '../assets/icon-location.svg'

//ELEMENTOS DEL DOM
const input = document.querySelector('input')
const button = document.querySelector('.Button')
const subTitles = document.querySelectorAll('h2')
const alert = document.querySelector('h3')
const loader = document.querySelector('.Loader')

//INICIALIZAR MAP 
const map = L.map('mapid')
//URL BASE
const URLAPIMAPS = 'https://geo.ipify.org/api/v1?apiKey=at_AwEniPKICA1wLEJS0GpEcwGy0Yb8m'

let latitude, longitude, ip, city, timezone, isp

//FUNCIONES
const updateValues = (ip, city, timezone, isp) => {
    let values = [ ...subTitles ]
    values[0].innerText = ip
    values[1].innerText = city
    values[2].innerText = `UTF${ timezone }`
    values[3].innerText = isp
}

const getInfoUser = () => {
    loader.className = 'Loader'
    let ip = input.value
    let url

    if(typeof(id) === 'string') {
        url = `${ URLAPIMAPS}&ipAddress=${ ip }` 
    } else {
        url = `${ URLAPIMAPS}&domain=${ ip }` 
    }
    getData(url)
}

const getData = async (url) => {
    alert.innerText =''
    try {     
        const response = await fetch(url)
        const data = await response.json()
        
        ip = data.ip
        city = data.location.city
        latitude = data.location.lat
        longitude = data.location.lng
        timezone = data.location.timezone
        isp = data.isp
    
        updateValues(ip, city, timezone, isp)
        renderMap(latitude, longitude)
        loader.className = 'Loader__disable'
    } catch (error) {
        alert.innerText = 'Ha ocurrido un error, intentelo nuevamente¬°¬°'
        console.error(error.message)
    }
}

const inicializate =  () => {
    getData(URLAPIMAPS)
    console.log('start...')
}

const myIcon = L.icon({
    iconUrl: 'src/assets/icon-location.svg',
    iconSize: [38, 65],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: null,
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

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
    
    L.marker([lat, lng], { icon: myIcon }).addTo(map)
        .bindPopup('It¬īs here¬°')
        .openPopup();
}


button.addEventListener('click', getInfoUser)
window.onload = () => inicializate()
