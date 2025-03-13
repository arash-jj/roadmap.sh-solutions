// selecting items
const dropDownButton = document.getElementById("dropDownButton")
const listOfItems = document.getElementById("listOfItems")
const items = document.querySelectorAll(".dropDownItem")
let itemSelected 
// creating check icon
let check = document.createElement("span")
let img = document.createElement("img")
img.src = "../../../../assets/image-stuff/check.svg"
img.alt = "check"
check.appendChild(img)
// events
dropDownButton.addEventListener("click",()=>{
    dropDownButton.classList.toggle("active")
    listOfItems.classList.toggle("active")
})
items.forEach(element=>{
    element.addEventListener("click",(elem)=>{
        element.appendChild(check)
        document.querySelector(".dropDownBtn span").innerText = elem.target.innerText
        dropDownButton.classList.remove("active")
        listOfItems.classList.remove("active")
    })
})
