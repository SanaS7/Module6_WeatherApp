var APIKey = "1bce31e4e577d559702e83704f2186a6"

// var Url = `api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`
var cityName = "London"
const button = document.querySelector('button')
const input = document.querySelector('#Search')
const nameLabel = document.querySelector('#nameLabel')
const nameImg = document.querySelector('.nameImg')
const tempLabel = document.querySelector('#tempLabel')
const windLabel = document.querySelector('#windLabel')
const humLabel = document.querySelector('#humLabel')
const history = document.querySelector('.history')

console.dir(input)

const updatePage = ({ list, city }) => {


    let iconLocation = list[0].weather[0].icon
    // console.dir(data.list.weather)
    // console.log(`&#${data.list[0].weather[0].icon}`);
    nameImg.src = `https://openweathermap.org/img/wn/${iconLocation}.png`;
    nameImg.alt = 'icon'
    nameLabel.innerHTML = `${city.name} (${list[0].dt_txt.split(' ')[0]}) ${nameImg.outerHTML}`

    tempLabel.textContent = `Temp: ${list[0].main.temp}`
    windLabel.textContent = `Wind: ${list[0].wind.speed} MPH`
    humLabel.textContent = `Humidity: ${list[0].main.humidity}`


    for (let i = 1; i < 6; i++) {
        let div = document.querySelector(`.foreCast-${i}`)
        let children = div.children;
        children[0].innerHTML = `${list[i].dt_txt.split(' ')[0]}`;
        children[2].innerHTML = `Temp: ${list[i].main.temp}`
        children[3].innerHTML = `Wind: ${list[i].wind.speed} MPH`
        children[4].innerHTML = `humidity: ${list[i].main.humidity}`
        iconLocation = list[i].weather[0].icon
        children[1].src = `https://openweathermap.org/img/wn/${iconLocation}.png`

    }

}
const makeRequest = (value) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=${APIKey}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            let lat = data[0].lat;
            let lon = data[0].lon;
            console.log(lat + " and " + lon)
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`)
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    {
                        updatePage(data)
                    }
                })
        })
}
const updateHistory = ()=>{
    let localData = localStorage.getItem('myData')
    console.log(localData.split(','));
    for (const item of localData.split(',')) {
        let lab = document.createElement('label')
        lab.innerHTML=item;
        lab.addEventListener('click',()=>{
            makeRequest(lab.innerHTML)
        })
        history.appendChild(lab)

    }

}
button.addEventListener('click', (e) => {
    e.preventDefault()
    if (input.value == "") {
        console.log("nothing");
    }
    else {
        city = input.value;
        let oldData = localStorage.getItem('myData');
        if (oldData.split(',').includes(input.value)) {

        }
        else {
            localStorage.setItem('myData', (oldData ? (oldData + "," + input.value) : input.value))
            updateHistory()
        }
        console.log(localStorage.getItem('myData'))
        makeRequest(city)
    }


})

