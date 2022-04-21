const background = './img/background.png';
const bg_Decor = './img/bg_Decor.png';
const middle_Decor = './img/middle_Decor.png';
const foreground = './img/Foreground.png';
const Ground = './img/Ground.png';
const platform = './img/platform.png';
const platformSmallTall = './img/platformSmallTall.png';
const enemy = './img/enemy.png'
const gold = './img/gold.png'

const kurdistanFlag = './img/kurdistanFlag.png'

//audio
const coinAudio = './audio/coin.wav';
const gameOver = './audio/gameover.wav';
const winning = './audio/winning.wav';
//charecter
const spriteRunLeft = './img/spriteRunLeft.png';
const spriteRunRight = './img/spriteRunRight.png';
const spriteStandLeft = './img/spriteStandLeft.png';
const spriteStandRight = './img/spriteStandRight.png';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
let score = 0;
let gameSpeed =0;
let x =0;
let x2=1000;

//acceleration
const gravity = 1.5;

const keys = {
    right:{
        pressed: false
    },
    left:{
        pressed: false
    }
}

class Player {
    constructor(){
        this.speed = 10;
        this.position = {
            x:100,
            y:100
        }
        //gravity player
        this.velocity = {
            x:0,
            y:0
        }
        this.width = 66
        this.height = 150
        this.image = createImage(spriteStandRight)
        this.frames = 0;
        this.sprites = {
            stand: {
                right: createImage(spriteStandRight),
                left:createImage(spriteStandLeft),
                cropWidth:177,
                width:66
            }
            ,run: {
                right: createImage(spriteRunRight),
                left:createImage(spriteRunLeft),
                cropWidth:341,
                width: 127.875
            }
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177;
    }
    draw(){
        c.drawImage(
            this.currentSprite,
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height
            );
    }
    update(){
        this.frames++;
        if(this.frames > 59 && (this.currentSprite === 
            this.sprites.stand.right || this.currentSprite ===
            this.sprites.run.right)){
            this.frames = 0;
        }else if(this.frames > 29 && (this.currentSprite === 
            this.sprites.run.right || this.currentSprite ===
            this.sprites.run.left )){   
                this.frames = 0;
        }
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if(this.height + this.velocity.y + this.position.y <= canvas.height){
            this.velocity.y += gravity;
        }
        
    }
}
let scrollOffset = 0;



class Platform {
    constructor({x ,y ,image}) {
        this.position = {
            x,
            y,
        }
        this.image = image;
        this.width = image.width;
        this.height = image.height;
}
    draw(){
       c.drawImage(this.image ,this.position.x ,this.position.y);
    }
}

class Layer {
    constructor(image ,speedModifire, y){
        this.x = 0;
        this.y = y;
        this.width = image.width;
        this.height = image.height;
        this.x2 = this.width;
        this.image = image;
        this.speedModifire = speedModifire;
        this.speed = gameSpeed * speedModifire;
    }
    update(){
        this.speed = gameSpeed * this.speedModifire;
        if(this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if(this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);

    }
    draw(){
        c.drawImage(this.image ,this.x ,this.y ,this.width ,this.height);
        c.drawImage(this.image ,this.x2 ,this.y ,this.width ,this.height);
    }
}

class Enemy {
    constructor({x ,y ,image}) {
        this.position = {
            x,
            y,
        }
        this.image = image;
        this.width = 100;
        this.height = 100;
}
    draw(){
       c.drawImage(this.image ,this.position.x ,this.position.y);
    }
    
}

class Gold {
    constructor({x ,y ,image}) {
        this.position = {
            x,
            y,
        }
        this.image = image;
        this.width = 80;
        this.height = 60;
}
    draw(){
       c.drawImage(this.image ,this.position.x ,this.position.y);
    }
    
    delete(){
        this.position.y = 10000;
    }
}




function createImage(imageSrc){
    const image1 = new Image();
    image1.src = imageSrc;
    return image1;
}

let player = new Player();
let platforms = [];
let layers = [];
let enemys = [];
let golds = [];

function Init(){

gameSpeed = 0;
 player = new Player();

 platforms = [
                    new Platform({
                        x:createImage(platform).width *4 + 500 + createImage(platform).width -
                        createImage(platformSmallTall).width ,y:300 ,image:createImage(platformSmallTall)
                    }),new Platform({
                        x:createImage(platform).width *5 + 900 + createImage(platform).width -
                        createImage(platformSmallTall).width ,y:300 ,image:createImage(platformSmallTall)
                    }),new Platform({
                        x:createImage(platform).width *5 + 1500 + createImage(platform).width -
                        createImage(platformSmallTall).width ,y:300 ,image:createImage(platformSmallTall)
                    }),new Platform({
                        x:-1 ,y:470 ,image:createImage(platform)
                    }),new Platform({
                        x:createImage(platform).width - 3 ,y:470 ,image:createImage(platform)
                    }),new Platform({
                        x:createImage(platform).width *2 + 100 ,y:470 ,image:createImage(platform)
                    }),new Platform({
                        x:createImage(platform).width *3 + 300 ,y:470 ,image:createImage(platform)
                    }),new Platform({
                        x:createImage(platform).width *4 + 500 ,y:470 ,image:createImage(platform)
                    }),new Platform({
                        x:createImage(platform).width *5 + 900 ,y:470 ,image:createImage(platform)
                    }),new Platform({
                        x:createImage(platform).width *5 + 3000 ,y:470 ,image:createImage(platform)
                    })];

                    const layer1 = new Layer(createImage(background), 0,0);
                    const layer2 = new Layer(createImage(bg_Decor), 0.1,0);
                    const layer3 = new Layer(createImage(middle_Decor), 0.2,0);
                    const layer4 = new Layer(createImage(foreground), 0.3,0);
                    const layer5 = new Layer(createImage(Ground), 0.4,370);
                    layers = [layer1 ,layer2 ,layer3 ,layer4 ,layer5];

                    scrollOffset = 0;
                    
                    enemys = [
                        new Enemy({
                            x:800,
                            y:390,
                            image:createImage(enemy)
                        }),new Enemy({
                            x:800 * 2,
                            y:390,
                            image:createImage(enemy)
                        }),new Enemy({
                            x:800 * 2 + 100,
                            y:390,
                            image:createImage(enemy)
                        }),new Enemy({
                            x:800 * 4,
                            y:390,
                            image:createImage(enemy)
                        }),new Enemy({
                            x:800 * 6,
                            y:390,
                            image:createImage(enemy)
                        }),new Enemy({
                            x:800 * 7,
                            y:390,
                            image:createImage(enemy)
                        }),new Enemy({
                            x:800 * 9,
                            y:390,
                            image:createImage(enemy)
                        }),
                    ];

                    golds = [
                        new Gold({
                            x:600,
                            y:410,
                            image:createImage(gold)
                        }),new Gold({
                            x:700 * 2,
                            y:410,
                            image:createImage(gold)
                        }),new Gold({
                            x:700 * 2 + 100,
                            y:410,
                            image:createImage(gold)
                        }),new Gold({
                            x:700 * 4,
                            y:410,
                            image:createImage(gold)
                        }),new Gold({
                            x:700 * 6,
                            y:410,
                            image:createImage(gold)
                        }),new Gold({
                            x:450 * 8,
                            y:410,
                            image:createImage(gold)
                        }),new Gold({
                            x:500 * 8,
                            y:410,
                            image:createImage(gold)
                        }),new Gold({
                            x:550 * 8,
                            y:410,
                            image:createImage(gold)
                        }),new Gold({
                            x:500 * 11,
                            y:410,
                            image:createImage(gold)
                        }),new Gold({
                            x:500 * 12,
                            y:410,
                            image:createImage(gold)
                        }),new Gold({
                            x:500 * 15,
                            y:410,
                            image:createImage(gold)
                        }),new Gold({
                            x:510 * 18,
                            y:410,
                            image:createImage(gold)
                        }),new Gold({
                            x:520 * 18,
                            y:410,
                            image:createImage(gold)
                        }),
                    ];
                    score = 0;
                   
}

let audio = new Audio();
audio.src = coinAudio;
let audio1 = new Audio();
audio1.src = gameOver;
let audio2 = new Audio();
audio2.src = winning;


                    
//loop for gravity
function animate() {
    c.fillStyle = 'white';
    c.fillRect(0 ,0 ,canvas.width ,canvas.height);
   
    layers.forEach(layer => {
        layer.update();
        layer.draw();
    });

    enemys.forEach(enemy => {
        enemy.draw();
    })
    golds.forEach(gold => {
        gold.draw();
    })

    platforms.forEach(platform => {
        platform.draw();
    })
    player.update();

    
    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = player.speed;
    }else if((keys.left.pressed && player.position.x > 100 ) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)){
        player.velocity.x = -player.speed;
    }else{
        player.velocity.x = 0
        if(keys.right.pressed){
            scrollOffset +=player.speed;
            platforms.forEach(platform => {
                platform.position.x -= player.speed;
            })
            enemys.forEach(enemy => {
                enemy.position.x -= player.speed;
            })
            golds.forEach(gold => {
                gold.position.x -= player.speed;
            })
            gameSpeed =10;
            
        }else if(keys.left.pressed && scrollOffset > 0){
            scrollOffset -=player.speed;
            platforms.forEach(platform => {
                platform.position.x += player.speed;
            })
            enemys.forEach(enemy => {
                enemy.position.x += player.speed;
            })
            golds.forEach(gold => {
                gold.position.x += player.speed;
            })
            gameSpeed =-10;
        }
        
    }
    

    //win condition
    if(scrollOffset > createImage(platform).width *5 + 3050){
        
        
        Init();
        audio2.play();
    }

    //lose condition
    if(player.position.y > canvas.height){
        Init();
        audio1.play();
    }

    //platform condition
    platforms.forEach(platform => {
        if(player.position.y + player.height <= platform.position.y 
            && player.height + player.position.y + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x 
            && player.position.x <= platform.position.x + platform.width){

                player.velocity.y = 0 
        }
        
    })
    enemys.forEach(enemy => {
        if(player.position.y + player.height <= enemy.position.y - 20
            && player.height + player.position.y + player.velocity.y >= enemy.position.y
            && player.position.x + player.width  >= enemy.position.x 
            && player.position.x <= enemy.position.x + enemy.width ){
                audio1.play();
                Init();
        }else if(player.position.x + player.width  <= enemy.position.x  + enemy.width
            && player.width + player.position.x + player.velocity.x  >= enemy.position.x 
            && player.position.y + player.height >= enemy.position.y 
            && player.position.y <= enemy.position.y + enemy.height){
                audio1.play();
                Init();
        }
    })
    golds.forEach(gold => {
        if(player.position.y + player.height <= gold.position.y 
            && player.height + player.position.y + player.velocity.y >= gold.position.y
            && player.position.x + player.width  >= gold.position.x 
            && player.position.x <= gold.position.x + gold.width ){
                audio.play();
                gold.delete();
                score +=1;
        }else if(player.position.x + player.width  <= gold.position.x  + gold.width
            && player.width + player.position.x + player.velocity.x  >= gold.position.x 
            && player.position.y + player.height >= gold.position.y 
            && player.position.y <= gold.position.y + gold.height){
                audio.play();
                gold.delete();
                score +=1;
        }
    })

    

    
    
    c.fillText('score: ' + score ,10 ,50);
    c.drawImage(createImage(kurdistanFlag), 924, 0 , 100 ,100)
    requestAnimationFrame(animate);
}

animate();
Init();


addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
        case 65:
            //Left Button (A)
            keys.left.pressed = true;
            player.currentSprite = player.sprites.run.left;
            player.currentCropWidth = player.sprites.run.cropWidth;
            player.width = player.sprites.run.width
            break;
        case 89:
            //Down Button (S)
            break;
        case 68:
            //Right Button (D)
            keys.right.pressed = true;
            player.currentSprite = player.sprites.run.right;
            player.currentCropWidth = player.sprites.run.cropWidth;
            player.width = player.sprites.run.width
            break;
        case 87:
            //Up Button (W)
            player.velocity.y -= 25;
            break;
    }
})

addEventListener('keyup', ({keyCode}) => {
    switch(keyCode){
        case 65:
            //Left Button (A)
            keys.left.pressed = false;
            player.currentSprite = player.sprites.stand.left;
            player.currentCropWidth = player.sprites.stand.cropWidth;
            player.width = player.sprites.stand.width
            gameSpeed =0;
            break;
        case 89:
            //Down Button (S)
            break;
        case 68:
            //Right Button (D) 
            keys.right.pressed = false;
            player.currentSprite = player.sprites.stand.right;
            player.currentCropWidth = player.sprites.stand.cropWidth;
            player.width = player.sprites.stand.width
            gameSpeed = 0;
            break;
        case 87:
            //Up Button (W)
            break;
    }
})