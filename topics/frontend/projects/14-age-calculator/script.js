// import libraries
import { DateTime } from './node_modules/luxon/build/es6/luxon.js';
import './node_modules/js-datepicker/dist/datepicker.min.js';
// selecting items
const ageInput = document.getElementById("age-input")
const calculateAgeBtn = document.getElementById("calculate-age")
const result = document.getElementById("result")
const exactAge = document.getElementById("exact-age")
// datepicker 
const picker = datepicker(ageInput,{
    formatter:(input , date , instance) =>{
        const age = date.toLocaleDateString("en-GB")
        input.value = age
    },
    maxDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    showAllDates: true,
    onSelect: (instance, date) => {
        if (date instanceof Date) {
            result.style.visibility = 'hidden';
        }
    },
})
// calculator logic
function calculate(dateString) {
    const birth = DateTime.fromFormat(dateString, 'dd/MM/yyyy');
    const nowDate = DateTime.now();
    const diff = nowDate.diff(birth, ['years', 'months', 'days']).toObject();
    const years = Math.floor(diff.years);
    const months = Math.floor(diff.months);
    const days = Math.floor(diff.days);
    let userAge = "";
    if (years) {
        userAge += `${years} year${years === 1 ? '' : 's'} `;
    }
    if (months) {
        userAge += `${months} month${months === 1 ? '' : 's'} `;
    }
    if (days) {
        userAge += `${days} day${days === 1 ? '' : 's'}`;
    }
    return userAge;
}
// date format checking function
function isValidDateFormat(dateString) {
    const date = DateTime.fromFormat(dateString, 'dd/MM/yyyy');
    return date.isValid;
}
// eventListener for calculateAgeBtn
calculateAgeBtn.addEventListener("click", () => {
    const birthdateString = ageInput.value;
    let finalAge = "";
    if (isValidDateFormat(birthdateString)) {
        const age = calculate(birthdateString);
        finalAge = `${age}`;
    } else {
        finalAge = 'Please select your birthdate.';
    }
    exactAge.textContent = finalAge; 
    result.style.visibility = 'visible';
});