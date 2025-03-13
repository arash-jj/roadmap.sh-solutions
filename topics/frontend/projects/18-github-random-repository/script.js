// selecting elements from DOM
const selectLanguage = document.getElementById("languageSelector")
const content = document.getElementById("content")
const stateText = document.getElementById("stateText")
stateText.textContent = "Please Select a Language"
const btn = document.getElementById("btn")
btn.style.display = 'none'
// using state management system
const stateHandler = (state)=>{
    switch (state) {
        case 'loading':
            stateText.textContent = "Loading please wait..."
            break;
        case 'success':
            btn.style.display = 'block'
            content.classList.remove("error")
            btn.classList.remove("error")
            break;
            case 'error':
                content.classList.add("error")
                stateText.innerText = "Error fetching repositories."
                btn.classList.add("error")
                btn.textContent = "Click to retry"
                btn.style.display = 'block'
            break;
        default:
            stateText.textContent = ""
            break;
    }
}
// fetching Languages 
async function languages() {
    try {
        const res = await fetch("https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json")
        const data = await res.json()
        data.forEach(elem => {
            const options = document.createElement("option")
            options.value = elem.title
            options.textContent = elem.title
            selectLanguage.appendChild(options)
        });
    } catch (error) {
        stateHandler('error')
    }
}
// language selector handler
async function languageHandler() {
    const language = selectLanguage.value
    stateHandler('loading')
    try {
        const res = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`)
        const data = await res.json()
        stateHandler('success')
        const randomNumber  = Math.floor(Math.random() * data.items.length)
        const randomRepo =  data.items[randomNumber]
        // creating elements to show data on DOM
		content.innerHTML = `
        <h2>${randomRepo.name}</h2>
        <p>${randomRepo.description || 'No description available'}</p>
        <div class="repo-info">
        <p>
            <i class="fas fa-star"></i> ${randomRepo.stargazers_count}
        </p>
        <p>
            <i class="fas fa-code-branch"></i> ${randomRepo.forks_count}
        </p>
        <p>
            <i class="fas fa-exclamation-circle"></i> ${randomRepo.open_issues_count}
        </p>
            <a href="${randomRepo.html_url}" target="_blank">View on GitHub</a>
        </div>
        `
    } catch (error) {
        stateHandler('error')
        btn.addEventListener("click",languages)
    }
}
btn.addEventListener("click",languageHandler)
selectLanguage.addEventListener("change",languageHandler)
languages()