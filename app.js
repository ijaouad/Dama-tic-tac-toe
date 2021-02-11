let x = '<span class="x">X</span>';
let o = '<span class="o">O</span>';

let playerX = document.querySelector('#player-x');
let playerO = document.querySelector('#player-o');

startPlay();

let damas = document.querySelectorAll('.dm');
damas.forEach(dama => {
    dama.addEventListener('click', () => {
        Playing(dama);
    })
})

let turn = 1;


//Switch the turn between the two players
const Playing = (dama) => {
    
    if (turn >= 9) {
        setTimeout(()=>{
            nextRound()
        }, 1000)
    }
    
    if (dama.innerHTML != "") {
        return;
    }
    
    if (playerX.checked) {
        dama.innerHTML = x;
        playerO.checked = true;
    } else if (playerO.checked) {
        dama.innerHTML = o;
        playerX.checked = true;
    }

    turn++;

    checkWinner();
}


//Choose a player randomly
function startPlay() {

    let randomNumber = Math.floor(Math.random() * 10) + 1;

    if (randomNumber % 2 == 0) {
        playerX.checked = true;
    } else {
        playerO.checked = true;
    }
}


//Clear Dama style to play next round
const nextRound = () => {
    damas.forEach(dama => {
        dama.innerHTML = "";
        dama.classList.remove('winner');
    });

    turn = 1;

    if (scoreX > scoreO) {
        playerX.checked = true;
    } else if (scoreX < scoreO) {
        playerO.checked = true;        
    } else {
        startPlay();
    }
}


// Winning Conditions
const winningConditions = [
    [1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 6, 9], [4, 5, 6], [7, 8, 9], [3, 5, 7], [3, 6, 9]
]

let scoreX = 0;
let scoreO = 0;

// Check for Winner 
const checkWinner = () => {
    winningConditions.forEach(cdt => {
        if (equals(cdt[0], cdt[1], cdt[2])) {
            let winner;
            for (let i = 0; i < cdt.length; i++) {
                winner = document.getElementById(cdt[i]);
                winner.classList.add('winner');
                turn = 10;
            }

            winner.innerHTML == x ? scoreX++ : scoreO++;
            
            document.querySelector('#x-score').innerHTML = scoreX;
            document.querySelector('#o-score').innerHTML = scoreO;
            
            setTimeout(()=>{
                nextRound()
            }, 1000)
        } 
    })
}


// Check if a condition got fulfilled
const equals = (a, b, c) => {

    let w = document.getElementById(a).innerHTML;
    let y = document.getElementById(b).innerHTML;
    let z = document.getElementById(c).innerHTML;

    if(w == y && y == z && w != '') {
        return true;
    }

    return false;
}


// Reset the Dama to Replay from 0
let replay = document.querySelector('#replay');
replay.addEventListener('click', () => {
    location.reload();
})
