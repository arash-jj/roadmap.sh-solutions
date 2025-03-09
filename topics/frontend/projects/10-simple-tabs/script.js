document.addEventListener("DOMContentLoaded",()=>{
    // selecting tabs btn & tabs 
    const btns = document.querySelectorAll(".tabs-btn")
    const tabs = document.querySelectorAll(".tab")
    // switching tabs logic
    btns.forEach(elem =>{
        elem.addEventListener("click",()=>{
            tabs.forEach(e => e.classList.remove("active"));
            // selecting btns attribute
            const btnsAttribute = elem.getAttribute("tab-id")
            document.getElementById(btnsAttribute).classList.add("active")
        });
    });
});