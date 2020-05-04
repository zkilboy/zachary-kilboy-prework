showWins = document.querySelector('#wins');
showAnsw = document.querySelector('#currAnsw');
showGCou = document.querySelector('#guesRema');
showGFal = document.querySelector('#guesFals');
const answers = ["mario", "luigi", "bowser", "peach", "link", "zelda", "ganon", "samus"]
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let answ;
let guesList = [];
let wins = 0;
let guesFals = [];
let guesRema = 12;
let prioAnsw;
let game = {
    outbound: function(){
        showGCou.innerText=guesRema;
        showGFal.innerText=guesFals;
        showAnsw.innerHTML=guesList.join(" ");
        showWins.innerText="Wins: " + wins;
    },
    nGame: function(){
        answ = answers[Math.floor(Math.random()*answers.length)].toLocaleUpperCase();
        guesList = [];
        guesFals = [];
        guesRema = 12;
        for(let i = 0; i < answ.length; i++){
            guesList[i] = "_";
        }
        this.outbound();
    },
    imageQue: function(){
        var image = document.getElementById('stage');
        var chaImg = `assets/images/${prioAnsw}.png`;
        image.src = chaImg;
    },
    audioQue: function(){
        var audio = document.getElementById('music');
        var song = `assets/audio/${prioAnsw}.mp3`;
        audio.src = song;
        audio.play();
    },
    stageSet: function(){
        var lastChar = document.querySelector('#character');
        lastChar.innerText = prioAnsw;
        this.imageQue();
        this.audioQue();
    },
    guessedFlash: function(){
        var guesLeft = document.getElementById('GRFlag');
        var guesPrio = document.getElementById('AGFlag');
        guesLeft.style.color = (guesLeft.style.color=='red') ? 'black':'red';
        guesPrio.style.color = (guesPrio.style.color=='red') ? 'black':'red';
        setTimeout(function(){
            guesLeft.style.color = (guesLeft.style.color=='black') ? 'red':'black';
            guesPrio.style.color = (guesPrio.style.color=='black') ? 'red':'black';
        }, 500);
        console.log('flash');
    },
    gotFlash: function(){
        var goteem = document.getElementById('curCha');
        goteem.style.color = (goteem.style.color=='red') ? 'black':'red';
        setTimeout(function(){
            goteem.style.color = (goteem.style.color=='black') ? 'red':'black';
        }, 500);
        console.log('flash');
    },
    checkWin: function(){
        if(guesList.join("") === answ){
            document.getElementById('winSong').play();
            alert('You got it!');
            wins++;
            prioAnsw = answ;
            game.nGame();
            game.stageSet();
        }
    },
    checkLose: function(){
        if(guesRema < 1){
            console.log('loss condition');
            document.getElementById('losSong').play();
            alert(`It was ${answ}, try again!`);
            prioAnsw = answ;
            game.nGame();
            game.stageSet();
        }
    },
    checkStroke: function(guess){
        console.log('alive');
        if(answ.includes(guess)){
            console.log('yes');
            for(var i = 0; i < answ.length; i++){
                if(answ[i] == guess){
                    guesList[i] = guess;
                }
            }
            game.checkWin();
        }
        else{
            console.log('no');
            guesFals.push(guess);
            guesRema--;
            game.checkLose();
        }
        game.outbound();
    },
    getStroke: function(event){
        var stroke = event.key.toUpperCase();
        if(guesList.includes(stroke)){
            console.log('got it');
            game.gotFlash();
        }
        else{
            if ((alphabet.includes(stroke))&&!(guesFals.includes(stroke))) {
                game.checkStroke(stroke);
            }
            else{
                game.guessedFlash();
            }
        }
    }
};
document.addEventListener('keydown', game.getStroke);
game.nGame();