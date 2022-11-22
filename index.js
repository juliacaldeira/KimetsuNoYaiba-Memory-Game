const button = document.querySelector("button");
button.addEventListener("click", mainGame);
button.addEventListener("click", timer);

let characters = ['./images/tanjiro.jpg',
    './images/nezuko.jpg',
    './images/muzan.jpg',
    './images/inosuke.jpg',
    './images/zenitsu.jpg',
    './images/shinobu.jpg',
    './images/tomioka.jpg',
    './images/kyojuro.jpg',
    './images/uzui.jpg'];
// from html
const back = document.getElementById('background');
const time = document.getElementById('timer');
const min = document.getElementById('min');
const sec = document.getElementById('sec');
// for timer function
let s = 0;
let m = 1;
let timeController = true;
// variables to control cards
let img_card;
let count = 1;
let img_cards = [];
let visibility = 0;

function mainGame() {
    const divStart = document.getElementById('ButtonBackground');
    time.style.visibility = 'visible';

    const imgs = [];

    back.removeChild(button);
    back.removeChild(divStart);

    for(let i=0;i<characters.length;i++) {
        for(let j=0;j<2;j++) {
        let img = new Image();
        img.src = characters[i];
        imgs.push(img);
        };
    };

    shuffleArray(imgs);
    
    for(let i=0;i<characters.length*2;i++) {
        const div = document.createElement('div');
        div.className = 'card';
        div.id = i;

        back.appendChild(div);

        div.addEventListener("click", myListener);

        //problem here and in line 114
        function myListener(){
            showCard(i);
        };

        img_card = document.createElement('div');
        img_card.className = 'imgCard';
        img_card.id = 'img_card'+i;

        img_card.appendChild(imgs[i]);

        div.appendChild(img_card);

    }
   
}

function showCard(id) {
    if(count < 3) {
        const divImgCard = document.getElementById('img_card'+id);
        divImgCard.style.visibility = 'visible';
        img_cards.push(divImgCard.id);
    };
    if (img_cards[0] != img_cards[1]) {
        if (count == 2) {
            verify(img_cards);
        }
        count++;
    } else {
        img_cards.shift();
    };
    
    
    if(visibility == characters.length) {
        timeController = false;
        setTimeout(function() {
            end();
        }, 500);
        
    }

}

function shuffleArray(inputArray){
    inputArray.sort(()=> Math.random() - 0.5);
}

function verify(cubeHTML) {
   let img1 = document.getElementById(cubeHTML[0]).childNodes[0].currentSrc;
   let img2 = document.getElementById(cubeHTML[1]).childNodes[0].currentSrc;
   if (img1 == img2) {
    count = 1;
    img_cards = [];
    visibility++;
    for(let i=0;i<2;i++) {
        // id is equal to last number of imgCard id, which is the same than card id
        let id = document.getElementById(cubeHTML[i]).id.slice(-1);
        document.getElementById(id).removeEventListener("click", myListener);
    }
   } else {
    setTimeout(function() {
        document.getElementById(cubeHTML[0]).style.visibility = 'hidden';
        document.getElementById(cubeHTML[1]).style.visibility = 'hidden';
        count = 1;
        img_cards = [];
    }, 500);
   }
}

function end() {
    for(let i=0;i<characters.length*2;i++) {
        const id = document.getElementById(i);
        id.parentNode.removeChild(id);
    }

    let btn = document.createElement('button');
    btn.id = 'restartBtn';
    btn.textContent = 'Jogar de novo';
    back.appendChild(btn);
}

function timer() { 
    if(timeController) {
    if (s<10) {
        sec.innerText = '0'+s;
    } else if (s<60) {
        sec.innerText = s;
    } else if (s == 60) {
        s = 0;
        sec.innerText = '00';
        if (m<10) {
            min.innerText = '0'+m;
        } else {
            min.innerText = m;
        }
        m++;
    }
        s++;

        setTimeout(timer, 1000);
    }
};

