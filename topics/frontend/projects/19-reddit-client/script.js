// selecting elements 
const addLaneBtn = document.getElementById("add-lane-btn")
const popup = document.getElementById("popup")
const subredditInput = document.getElementById("subreddit-input")
const addBtn = document.getElementById("add-btn")
const lanesWrapper = document.getElementById("lanes-wrapper")

// hide and show the popup section 
addLaneBtn.addEventListener("click",()=>{
    popup.classList.toggle("show")
})

// get the subreddit of input value
addBtn.addEventListener("click",()=>{
    const subredditSubject = subredditInput.value.trim()
    popup.classList.remove("show")
    addLane(subredditSubject)
    subredditInput.value = ''
})
// add lane to DOM
function addLane(subredditSubject) {
    const lane = document.createElement("div")
    lane.className = "laneContainer"
    lane.innerHTML = `
    <div class="lane-header">
        <h3>./r/${subredditSubject}</h3>
        <div class="lane-options">
            <button class="options-button">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#b">
                        <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
                    </svg>
                </span>
            </button>
            <div class="options-menu">
                <button class="refresh-lane">Refresh</button>
                <button class="delete-lane">Delete</button>
            </div>
        </div>
    </div>
    <div class="posts" id="${subredditSubject}-posts">Loading...</div>
    `
    lanesWrapper.appendChild(lane)
    // Add event listener to toggle options menu
    const optionsButton = lane.querySelector('.options-button');
    const optionsMenu = lane.querySelector('.options-menu');
    optionsButton.addEventListener('click', () => {
        optionsMenu.classList.toggle('show');
    });
    // Add event listener to refresh lane
    const refreshButton = lane.querySelector('.refresh-lane');
    refreshButton.addEventListener('click', () => {
        optionsMenu.classList.remove("show")
        document.getElementById(`${subredditSubject}-posts`).innerHTML = "Loading..."
        fetchPosts(subredditSubject)
    });
    // Add event listener to delete lane
    const deleteButton = lane.querySelector('.delete-lane');
    deleteButton.addEventListener('click', () => {
        optionsMenu.classList.remove("show")
        lane.remove();
    });
    fetchPosts(subredditSubject)
}
// fetch posts from Reddit API
async function fetchPosts(subredditSubject) {
    try {
        const res = await fetch(`https://www.reddit.com/r/${subredditSubject}.json`)
        const data = await res.json()
        const postContainer = document.getElementById(`${subredditSubject}-posts`)
        postContainer.innerHTML = ''
        data.data.children.forEach(e => {
        const post = postElem(e.data)
        postContainer.appendChild(post)
        });
    } catch (error) {
        throw new Error('Subreddit not found');
    }
}
// create post element
function postElem(postData) {
    const redditPost = document.createElement("div")
    redditPost.className = "post" 
    // go to Reddit by click on the posts
    redditPost.addEventListener("click",()=>{
        open('https://reddit.com' + postData.permalink , '_blank');
    })
    // post vote
    const postVotes = document.createElement("div")
    postVotes.className = "votes"
    const upVotes = document.createElement("button");
    upVotes.className = "up-votes"
    upVotes.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='20px' viewBox='0 -960 960 960' width='20px' fill='#b'><path d='M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z'/></svg>"
    const voteCount = document.createElement('span');
    voteCount.className = "vote-count"
    voteCount.textContent = postData.ups;
    postVotes.appendChild(upVotes)
    postVotes.appendChild(voteCount)
    // post content
    const postContent = document.createElement("div")
    postContent.className = "post-content"
    const postTitle = document.createElement('h4');
    postTitle.className = "post-title"
    postTitle.textContent = postData.title;
    const postAuthor = document.createElement('p');
    postAuthor.className = "post-author"
    postAuthor.textContent = 'By: ' + postData.author;
    // set the parts
    postContent.appendChild(postTitle)
    postContent.appendChild(postAuthor)
    redditPost.appendChild(postVotes)
    redditPost.appendChild(postContent)
    return redditPost
}