// selecting elements from DOM
const temperatureInput = document.getElementById("temperature")
const fromUnit = document.getElementById("fromUnit")
const toUnit = document.getElementById("toUnit")
const convertBtn = document.getElementById("convert")
const result = document.getElementById("result")

// checking inputs value for convert btn
function checkInputs() {
    temperatureInput.value && fromUnit.value && toUnit.value ? convertBtn.disabled = false : convertBtn.disabled = true
}
temperatureInput.addEventListener('input', checkInputs);
fromUnit.addEventListener('change', checkInputs);
toUnit.addEventListener('change', checkInputs);

// Temperature conversion logic
function convert(temperature, from, to) {
    if (from === to) {
        return temperature;
    }
    let convertResult;
    if (from === "Fahrenheit") {
        if (to === "Celsius") {
            convertResult = (temperature - 32) * 5 / 9;
        } else if (to === "Kelvin") {
            convertResult = (temperature - 32) * 5 / 9 + 273.15;
        }
    } else if (from === "Celsius") {
        if (to === "Fahrenheit") {
            convertResult = (temperature * 9 / 5) + 32;
        } else if (to === "Kelvin") {
            convertResult = temperature + 273.15;
        }
    } else if (from === "Kelvin") {
        if (to === "Celsius") {
            convertResult = temperature - 273.15;
        } else if (to === "Fahrenheit") {
            convertResult = (temperature - 273.15) * 9 / 5 + 32;
        }
    }
    return convertResult;
}
// show the result by clicking on convert btn
convertBtn.addEventListener("click",()=>{
    const temperature = parseFloat(temperatureInput.value);
    const from = fromUnit.value;
    const to = toUnit.value;
    const resultValue = convert(temperature, from, to)
    result.textContent = `${temperature} ${from} is ${resultValue} ${to}`
})