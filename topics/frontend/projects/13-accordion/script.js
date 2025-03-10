// selecting elements
const accordions = document.querySelectorAll(".accordion")
accordions.forEach((elem)=>{
    elem.addEventListener("click",()=>{
        elem.classList.toggle("active")
    })
})