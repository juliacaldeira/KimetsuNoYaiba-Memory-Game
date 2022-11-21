const button = document.querySelector("button");
button.addEventListener("click", addElement);

let characters = ['./images/tanjiro.jpg',
    './images/nezuko.jpg',
    './images/muzan.jpg',
    './images/inosuke.jpg',
    './images/zenitsu.jpg'];
let img_card;
let count = 1;
let img_cards = [];
let visibility = 0;
const back = document.getElementById('background');

function addElement() {
    const divStart = document.getElementById('ButtonBackground');
    const imgs = [];
    const imgs_srcs = [];

    back.removeChild(button);
    back.removeChild(divStart);

    for(let i=0;i<characters.length;i++){
        imgs_srcs.push(characters[i]);
        imgs_srcs.push(characters[i]);
    }

    for(let i=0;i<characters.length*2;i++) {
        let img = new Image();
        img.src = imgs_srcs[i];
        img.id = 'char_imgs';
        imgs[i] = img;
    }

    shuffleArray(imgs);
    
    for(let i=0;i<characters.length*2;i++) {
        const div = document.createElement('div');
        div.className = 'card';
        div.id = i;

        back.appendChild(div);

        div.addEventListener("click", function(){showCard(div.id)}, false);

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
        end();
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
    let endDiv = document.createElement('div');
    endDiv.id = 'endDiv';
    endDiv.innerText = 'Parabéns. Você terminou em '+time.textContent;
    if (parseInt(min) < 1) {
    endDiv.innerHTML += '<br> &starf;&starf;&starf;';
    } else if (min < 2) {
    endDiv.innerHTML += '<br> &starf;&starf;';
    } else {
    endDiv.innerHTML += '<br> &starf;';
    }
    console.log(parseInt(min) > 1);
    back.appendChild(endDiv);
    back.appendChild(btn);
}


