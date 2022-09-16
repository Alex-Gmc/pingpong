const c = document.querySelector('canvas').getContext('2d')

const k = {
    c: false,
    b: false,
}

window.addEventListener('keydown',(e)=>{
    if(e.keyCode == 38){k.c = true}
    if(e.keyCode == 40){k.b = true}
    // alert(e.keyCode)
    if(e.keyCode == 80){if(!ball.gameOver){ball.start = !ball.start}}
    if(e.keyCode == 82){location.reload()}
    if(e.keyCode == 83){if(!ball.gameOver){ball.start=true}}
})

window.addEventListener('keyup',(e)=>{
    if(e.keyCode == 38){k.c = false}
    if(e.keyCode == 40){k.b = false}
})


class Pad {
    constructor(c,k,ball){
        this.ball = ball
        this.k = k
        this.c = c
        this.w = 10
        this.h = 60
        this.x = 0
        this.s = 5
        this.y = (this.c.canvas.height / 2) - (this.h / 2)
    }

    draw() {
        this.c.fillStyle = 'black'
        this.colisor()
        this.move()
        c.fillRect(this.x,this.y,this.w,this.h)
    }

    move() {
        if(this.k.b && this.y + this.h <= this.c.canvas.height){
            this.y += this.s
        }

        if(this.k.c && this.y >= 0){
            this.y -= this.s
        }
    }

    colisor() {

        if(this.y <= ball.y + ball.h && this.y + this.h >= ball.y && this.x + this.w >= ball.x){
            ball.dx *= -1
            ball.s += 0.03
        }
    }
}

const ball = {
    x: c.canvas.width / 2 - 5,
    y: c.canvas.height / 2 - 5,
    dx: 1.24,
    dy: 1,
    w: 10,
    h: 10,
    s: 4.5,
    gameOver: false,
    start: false,

    draw() {
        this.move()
        this.goal()
        c.fillStyle = 'salmon'
        c.fillRect(this.x,this.y,this.w,this.h)
    },

    move() {
        if(this.start){
            this.x += this.s * this.dx
            this.y += this.s * this.dy

            if(this.x >= c.canvas.width - this.w || this.x <= 0){
                this.dx *= -1
            }
            if(this.y <= 0 || this.y + this.h >= c.canvas.height){
                this.dy *= -1
            }
        }
    },

    goal() {
        if(this.x + this.w >= c.canvas.width || this.x <= 0 ){
            c.font = '50px  serif'
            c.textAlign = 'center'
            c.textBaseline = 'middle'
            c.fillStyle = 'black'
            c.fillText('GOOOAAALL!!',c.canvas.width/2,c.canvas.height/2)
            this.start = false
            this.gameOver = true
        }
    }
}


const pad = new Pad(c,k)
const enemy = new Pad(c,k)
enemy.s = 4
enemy.x = c.canvas.width - enemy.w
enemy.move = ()=>{
    if(ball.x + ball.w/2 >= c.canvas.width / 2 && ball.dx >0 && enemy.y > 0 && enemy.y + enemy.h <= c.canvas.height){
        if(ball.y + ball.h /2 > enemy.y + enemy.h / 2){
            enemy.y += enemy.s
        }
        if(ball.y + ball.h /2 < enemy.y + enemy.h / 2){
            enemy.y -= enemy.s
        }
    }else{
        if(enemy.y + enemy.h / 2 > c.canvas.height /2 ){
            enemy.y -= enemy.s
        }
        if(enemy.y + enemy.h / 2 < c.canvas.height /2 ){
            enemy.y += enemy.s
        }
    }
}
enemy.colisor = ()=>{
    if(enemy.y <= ball.y + ball.h && enemy.y + enemy.h >= ball.y && ball.x + ball.w >= enemy.x){
        ball.dx *= -1
        ball.s += 0.03
    }
}


function loop() {
    
    c.clearRect(0,0,c.canvas.width,c.canvas.height)
    enemy.draw()
    pad.draw()
    ball.draw()
    

    requestAnimationFrame(loop)
}

loop()