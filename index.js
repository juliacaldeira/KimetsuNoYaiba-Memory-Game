const button = document.querySelector("button");
button.addEventListener("click", addElement);

let characters = ['./images/tanjiro.jpg',
    './images/nezuko.jpg',
    './images/muzan.jpg',
    './images/inosuke.jpg',
    './images/zenitsu.jpg'];
let cube;
let count = 0;
let cubes = [];
let visibility = 0;

function addElement() {
    let back = document.getElementById('background');
    let divStart = document.getElementById('ButtonBackground');
    let imgs = [];
    let imgs_srcs = [];

    back.removeChild(button);
    back.removeChild(divStart);

    for(let i=0;i<characters.length;i++){
        imgs_srcs.push(characters[i]);
        imgs_srcs.push(characters[i]);
    }

    for(let i=0;i<10;i++) {
        let img = new Image();
        img.src = imgs_srcs[i];
        img.width = 200;
        img.height = 200;
        imgs[i] = img;
    }

    shuffleArray(imgs);
    
    for(let i=0;i<10;i++) {
        let div = document.createElement('div');
        div.className = 'card';
        div.id = i;

        back.appendChild(div);

        div.addEventListener("click", function(){round(div.id)}, false);

        cube = document.createElement('div');
        cube.className = 'cube';
        cube.id = 'cube'+i;

        cube.appendChild(imgs[i]);

        div.appendChild(cube);

    }

    const timer = document.createElement('div');
    timer.id = 'timer';
    timer.textContent = '00:00';
    back.appendChild(timer);
    

    
}

function round(id) {
    count++;
    if (count < 3) {
        const divCube = document.getElementById('cube'+id);
        divCube.style.visibility = 'visible';
        cubes.push(divCube.id);
    }
    if (count == 2) {
        verify(cubes);
    }
    
    if(visibility == 5) {
        //timer(false);
        end();
    }

}

function shuffleArray(inputArray){
    inputArray.sort(()=> Math.random() - 0.5);
}

function verify(cubeHTML) {
   let img1 = document.getElementById(cubeHTML[0]).childNodes[0].currentSrc;
   let img2 = document.getElementById(cubeHTML[1]).childNodes[0].currentSrc;
   console.log(img1, img2);
   if (img1 == img2) {
    count = 0;
    cubes = [];
    visibility++;
   } else {
    setTimeout(function() {
        document.getElementById(cubeHTML[0]).style.visibility = 'hidden';
        document.getElementById(cubeHTML[1]).style.visibility = 'hidden';
        count = 0;
        cubes = [];
    }, 500);
   }
}

function end() {
    for(let i=0;i<10;i++) {
        const id = document.getElementById(i);
        id.parentNode.removeChild(id);
    }
    const back = document.getElementById('background');
    let endDiv = document.createElement('div');
    endDiv.id = 'endScreen';
    endDiv.textContent = 'Parabéns! Você ganhou!';
    let btn = document.createElement('button');
    btn.id = 'restartBtn';
    btn.textContent = 'Jogar de novo';
    back.appendChild(endDiv);
    back.appendChild(btn);
}


