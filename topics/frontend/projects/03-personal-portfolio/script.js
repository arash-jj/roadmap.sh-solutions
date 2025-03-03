// darkMode logic
document.querySelectorAll(".switch-mode-container button").forEach((e)=>{
    e.addEventListener("click",(elem)=>{
        const targetElement = /** @type {HTMLElement} */ (elem.currentTarget);
        const elementId = targetElement.id;
        if (elementId === "enableLight" ) {
            document.documentElement.setAttribute('data-color-mode', 'light');
            localStorage.setItem('data-color-mode', 'light');
        } else if (elementId === "enableDark") {
            document.documentElement.setAttribute('data-color-mode', 'dark');
            localStorage.setItem('data-color-mode', 'dark');
        }else{
            throw new Error("Button has not FOUND!")
        }
    })
})
if (localStorage.getItem('data-color-mode') === 'dark') {
    document.documentElement.setAttribute('data-color-mode', 'dark');
}
const matcher = window.matchMedia('(prefers-color-scheme: dark)');
if (localStorage.getItem('data-color-mode') === 'dark' ||
    (matcher.matches && !localStorage.getItem('data-color-mode'))) {
    document.documentElement.setAttribute('data-color-mode', 'dark');
}