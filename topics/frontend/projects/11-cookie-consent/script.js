// Check if consent is already given
document.addEventListener("DOMContentLoaded",()=>{
    if(!localStorage.getItem("cookieConsent")){
        setTimeout(() => {
            document.querySelector(".cookie-container").style.display =  "block"
        }, 2000);
    }
})
// If user accepts cookie
document.getElementById('accept-cookies').addEventListener("click",()=>{
    localStorage.setItem("cookieConsent", "true")
    document.querySelector(".cookie-container").style.display =  "none"
})
// If user did not accept cookie
document.getElementById("close").addEventListener("click",()=>{
    document.querySelector(".cookie-container").style.display =  "none"
})