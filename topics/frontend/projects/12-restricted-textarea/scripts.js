// selecting elems
const textArea = document.getElementById("message")
const counter = document.getElementById("digit-counter")
const limit = textArea.getAttribute("maxlength")
// logic 
textArea.addEventListener("input",()=>{
    let currentDigits = textArea.value.length;
    console.log(currentDigits);
    counter.innerText = `${currentDigits} / ${limit}`
    if (currentDigits >= limit) {
        textArea.classList.add("limit-reached")
        counter.classList.add("limit-reached")
    } else {
        textArea.classList.remove("limit-reached")
        counter.classList.remove("limit-reached")
    }
})