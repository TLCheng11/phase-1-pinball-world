const gameList = document.querySelector(".game-list");
const gameName = document.querySelector("#detail-title");
const gameImg = document.querySelector("#detail-image");
const highScore = document.querySelector("#detail-high-score");
let gameData;
let id;

//show games from database
fetch("http://localhost:3000/games")
.then(res => res.json())
.then(data => {
    gameData = data;
    data.forEach(game => {
        const h5 = document.createElement("h5");
        h5.textContent = `${game.name} (${game.manufacturer_name})`
        gameList.append(h5);

        //add listen on click event to show game info
        h5.addEventListener("click", e => {
            showGame(game);
        })
    })
    //show first game details
    showGame(data[0]);
})

//show first game detials

function showGame(game) {
    gameName.textContent = game.name;
    gameImg.src = game.image;
    highScore.textContent = game.high_score;
    id = game.id;
}

//to update high score
document.querySelector("#high-score-form").addEventListener("submit", e => {
    e.preventDefault();
    highScore.textContent = e.target["score-input"].value;
    gameData[id - 1].high_score = parseInt(e.target["score-input"].value);
    e.target.reset();
})