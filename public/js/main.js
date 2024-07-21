const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityname');
const city_name = document.getElementById('city_name');

const day = document.getElementById('day');
const dateMonth = document.getElementById('today_day');

const temp1 = document.getElementById('temp1');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');

const getCurrentDay = () => {
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let currentTime = new Date();
    let day = weekDay[currentTime.getDay()];
    return day;
}
day.innerText = getCurrentDay();

const getCurrentDate = () => {
    const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; 
    let currentTime = new Date();
    let month = Months[currentTime.getMonth()];
    let date = currentTime.getDate();
    return `${date} ${month}`;
}
dateMonth.innerText = getCurrentDate();

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal == ""){
        city_name.innerText = `Please write the name before you search`;
        datahide.classList.add('data_hide');
    }
    else{
        try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=caff1a3244c81c555a1ad96aadbc4929`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        const arrData = [data];
        console.log(arrData);
        temp1.innerText = arrData[0].main.temp;

        city_name.innerText = `${arrData[0].sys.country}, ${arrData[0].name}`;

        const tempMood = arrData[0].weather[0].main;
        if(tempMood == "Clear"){
            temp_status.innerHTML = "<i class = 'fas fa-sun' style = 'color : #eccc68;'></i>"
        }
        else if(tempMood == "Clouds"){
            temp_status.innerHTML = "<i class = 'fas fa-cloud' style = 'color : #f1f2f6;'></i>"
        }
        else if(tempMood == "Rain"){
            temp_status.innerHTML = "<i class = 'fas fa-cloud-rain' style = 'color : #a4b0be;'></i>"
        }
        else{
            temp_status.innerHTML = "<i class = 'fas fa-sun' style = 'color : #eccc68;'></i>"
        }
        datahide.classList.remove('data_hide');
        
        }
        catch{
            city_name.innerText = `Please enter the city name properly`;
            datahide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click', getInfo);
