document.addEventListener('DOMContentLoaded', ()=>{
const statusGrid = Array.from(document.querySelectorAll('.gridStatus div'))
const displayWidth = 4
const displayIndex =0 
let nextRandom = 0
let timer
const pause = document.querySelector('.pause')
const stop = document.querySelector('.stop')
const gridArray = Array.from(document.querySelectorAll('.grids div'))
const Row = 10
const colors = [
    'url(images/blue_block.png)',
    'url(images/pink_block.png)',
    'url(images/purple_block.png)',
    'url(images/peach_block.png)',
    'url(images/yellow_block.png)'
  ]


const lTetrisBlock = [
    [1,Row+2,Row*2+2,2],
    [Row,Row+1,Row+2,2],
    [1,Row+1,Row*2+1,Row*2],
    [Row,Row*2,Row*2+1,Row*2+2],
]

const zTetrisBlock = [
    [0, Row, Row + 1, Row * 2 + 1],
    [Row + 1, Row + 2, Row * 2, Row * 2 + 1],
    [0, Row, Row + 1, Row * 2 + 1],
    [Row + 1, Row + 2, Row * 2, Row * 2 + 1]
]

const tTetrisBlock = [
    [1, Row, Row + 1, Row + 2],
    [1, Row + 1, Row + 2, Row * 2 + 1],
    [Row, Row + 1, Row + 2, Row * 2 + 1],
    [1, Row, Row + 1, Row * 2 + 1]
]

const oTetrisBlock = [
    [0, 1, Row, Row + 1],
    [0, 1, Row, Row + 1],
    [0, 1, Row, Row + 1],
    [0, 1, Row, Row + 1]
]

const iTetrisBlock = [
    [1, Row + 1, Row * 2 + 1, Row * 3 + 1],
    [Row, Row + 1, Row + 2, Row + 3],
    [1, Row + 1, Row * 2 + 1, Row * 3 + 1],
    [Row, Row + 1, Row + 2, Row + 3]
]

const Tetriminoes = [lTetrisBlock,zTetrisBlock,tTetrisBlock,oTetrisBlock,iTetrisBlock]

let currentRotation = 0
let currentPosition = 4
let random = Math.floor(Math.random()*Tetriminoes.length)
let selected = Tetriminoes[random][currentRotation]


function move(e){
    if (e.keyCode === 37){
        moveLeft()
    } else if(e.keyCode === 38){
        rotate()
    }
    else if(e.keyCode === 39){
        moveRight()
    }
}

document.addEventListener('keyup', move)

function draw(){
    selected.forEach(index => {
        gridArray[currentPosition + index].classList.add('block1')
        gridArray[currentPosition + index].style.backgroundImage = colors[random]
    })
}

function unDraw(){
    selected.forEach(index => {
        gridArray[currentPosition + index].classList.remove('block1')
        gridArray[currentPosition + index].style.backgroundImage ='none'
    })
}

function moveLeft(){
    unDraw()
    const isAtLeft = selected.some(index => (currentPosition + index) % Row === 0)

    if(!isAtLeft) currentPosition -=1

    if(selected.some(index => gridArray[currentPosition + index].classList.contains('invincible'))){
        currentPosition +=1
    }
    draw()
}

function moveRight(){
    unDraw()
    const isAtRight = selected.some(index => (currentPosition + index) % Row === Row - 1)

    if(!isAtRight) currentPosition +=1

    if(selected.some(index => gridArray[currentPosition + index].classList.contains('invincible'))){
        currentPosition -=1
    }
    draw()
}

function rotate(){
    unDraw()
    currentRotation++
    if(currentRotation === selected.length){
        currentRotation = 0
    }
    selected = Tetriminoes[random][currentRotation]
    draw()
}



function moveDown(){
    unDraw()
    currentPosition += Row
    draw()
    freeze()
}


pause.addEventListener('click',() => {
    if(timer){
        clearInterval(timer)
        timer=null
    }else{
        draw()
        timer = setInterval(moveDown , 500);
        // nextRandom = Math.floor(Math.random()* Tetriminoes.length)
        displayShape()
    }
})

// stop.addEventListener('click',() => {
//     if(timer){
//         clearInterval(timer)
//         timer = null
//     }
// })

function freeze(){
    if(selected.some(index => gridArray[currentPosition + index + Row].classList.contains('invincible'))){
        selected.forEach(index => gridArray[index + currentPosition].classList.add('invincible'))

        random = nextRandom
        nextRandom = Math.floor(Math.random() * Tetriminoes.length)
        selected = Tetriminoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
    }
}


miniTetramino = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
    [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
    [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1]

]

function displayShape(){
statusGrid.forEach(grid =>{
    grid.classList.remove('block1')
    grid.style.backgroundImage = 'none'
})

miniTetramino[nextRandom].forEach(index=>{
    statusGrid[displayIndex + index] .style.backgroundImage = colors[nextRandom]
})
}

})
