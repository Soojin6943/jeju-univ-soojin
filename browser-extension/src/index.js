//form fields
const form = document.querySelector('.form-data');

const region = document.querySelector('.region-name');
const apiKey = document.querySelector('.api-key');

// results
const errors = document.querySelector('.errors');
const loading = document.querySelector('.loading');
const results = document.querySelector('.result-container');
const usage = document.querySelector('.carbon-usage');
const fossilfuel = document.querySelector('.fossil-fuel');
const myregion = document.querySelector('.my-region');
const clearBtn = document.querySelector('.clear-btn');




// 어디에 위치하던 호출이 정상적으로 가능 (유지 보수 편리)
// async function displayCarbonUsage(apiKey, region) {

// }
const calculateColer = async(value) => {
    let co2Scale = [0, 150, 600, 750, 800];
    let colors = ['#2AA364', '#F5EB4D', '#9E4229', '#381D02', '#381D02'];

    let closestNum = co2Scale.sort((a, b) => {
        return Math.abs(a - value) - Math.abs(b - value);
    }) [0];
    console.log(value + ' is closest to ' + closestNum);
    let num = (element) => element.findIndex(num);

    let closestColor = colors[scaleIndex];
    console.log(scaleIndex, closestColor);

    chrome.runtime.sendMessage({action: 'updateIcon', value: {color: closestColor}});
};

const displayCarbonUsage = async(apiKey, region) => {
    try{
        await axios.get('https://api.co2signal.com/v1/latest', {
            params: { // 노출되는 정보
                countryCode: region,
            },
            headers: { // 노출되면 안되는 정보
                'auth-token' : apiKey,
            },
        })
       
        .then ((response) => {
            let CO2 = Math.floor(response.data.data.carbonIntensity);

            // calculateColor(CO2)

            loading.style.display  ='none';
            form.style.display = 'none';
            myregion.textContent = region;
            usage.textContent = Math.round(response.data.data.carbonIntensity) + ' grams (grams CO2 emitted per kilowatt hour';
            fossilfuel.textContent = response.data.data.fossilFuelPercentage.toFixed(2) + '% (percentage of fossil fuels used to generate electricity)';
            results.style.display = 'block';
        });
    } catch (error) {
        console.log(error);
        loading.style.display = 'none';
        results.style.display = 'none';
        errors.textContent = 'Sorry, we have no data for the region you have requested.';
    }
}

// setUpUser 함수: apiKey, regionName 로컬 저장소 값 설정
function setUpUser(apiKey, regionName) {
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('regionName', regionName);
    loading.style.display = 'block';
    errors.textContent = '';
    clearBtn.style.display = 'block';
    displayCarbonUsage(apiKey, regionName);
}

// handleSubmit 함수: form 제출 처리
function handleSubmit(e) {
    e.preventDefault();
    setUpUser(apiKey.value, region.value);
}


// init() 함수 추가
function init() {
    const storedApiKey = localStorage.getItem('apiKey');
    const storedRegion = localStorage.getItem('regionName');

    // set icon to be generic green
    // todo

    if (storedApiKey === null || storedRegion === null) {
        form.style.display = 'block';
        results.style.display = 'none';
        loading.style.display = 'none';
        clearBtn.style.display = 'none';
        errors.textContent = '';
    } else {
        displayCarbonUsage(storedApiKey, storedRegion);
        results.style.display = 'none';
        form.style.display = 'none';
        clearBtn.style.display = 'block';
    }

    chrome.runtime.sendMessage({
        action: 'updateIcon',
            value: {
                color: 'green',
    }, });
};


// reset 함수 추가
function reset(e) {
    e.preventDefault();
    localStorage.removeItem('regionName');
    init();
}

// 리스너 추가
form.addEventListener('submit', (e) => handleSubmit(e));
clearBtn.addEventListener('click', (e) => reset(e));

init();