
const instructionText = document.querySelector('.instruction-text')
const board = document.querySelector('.game-board')
const scoreDisplay = document.querySelector('.current-score')
const highScoreDisplay = document.querySelector('.high-score')
const highScoreTitle = document.querySelector('.high-score-title')

        
const gridSize = 20
let gameStarted = false

//defining the position of the snake and food
let snake = [{x: 10, y: 10}];
let food = generateFood()
let direction = 'right'
let gameSpeedDelay = 500
let highScore = 0

function draw(){
    board.innerHTML = ''
    drawFood()
    drawSnake()
    updateScore()
}

//draw the snake
function drawSnake(){
    snake.forEach((segment) => {
        const element = createGameElement('div', 'snake')
        setPosition(element, segment)
        board.appendChild(element)
    })
}

//creating a div for food/snake
function createGameElement(tag, className){
    const element = document.createElement(tag)
    element.className = className
    return element
}

//setting the position of the snake/food
function setPosition(element, position){
    element.style.gridColumn = position.x
    element.style.gridRow = position.y
}

//drawing food
function drawFood(){
    if(gameStarted)
    {
        const foodElement = createGameElement('div', 'food')
        setPosition(foodElement, food)
        board.appendChild(foodElement)
    }
}

// //generate random position for food
function generateFood(){
    let x = Math.round(Math.random() * gridSize) 
    let y = Math.round(Math.random() * gridSize) 
    return {x, y}
}

function moveSnake(){
    const head = {...snake[0]}

    switch (direction){
        case 'up':
            head.y--
            break
        case 'down':
            head.y++
            break;
        case 'left':
            head.x--
            break
        case 'right':
            head.x++
            break
    }

    snake.unshift(head)

    if(head.x === food.x && head.y === food.y){
        food = generateFood()
        updateSpeed()
        //console.log(gameSpeedDelay)
        clearInterval(gameInterval)
        gameInterval = setInterval(() => {
            moveSnake()
            checkCollision()
            draw()
        }, gameSpeedDelay)
        
        updateScore()
        draw()
    }
    else{
        snake.pop()
        //draw()
    } 
}

function gameStart(){
    gameStarted = true
    instructionText.style.display = 'none'
    logo.style.display = 'none'
    gameInterval = setInterval(() => {
        moveSnake()
        checkCollision()
        draw()
    }, gameSpeedDelay)
}

function handleKeyPress(e){
    if( !gameStarted && e.key == " " ||
        !gameStarted && e.code == "Space" ||      
        !gameStarted && e.keyCode == 32 ){
        gameStart()
    }
    else{
        switch (e.keyCode) {
            case 37:
                //left
                direction = 'left'
                break;
            case 38:
                //up
                direction = 'up'
                break;
            case 39:
                //right
                direction = 'right'
                break;
            case 40:
                //dowm
                direction = 'down'
                break;   
            default:
                e.preventDefault()
                break;  
        }
        //moveSnake()
    }
}

function updateSpeed(){
    if(gameSpeedDelay > 150)
        gameSpeedDelay -= 20
}

function checkCollision(){
    console.log('lag gaye0')
    const head = snake[0];
    if(head.x > gridSize || head.y > gridSize || head.x < 1 || head.y < 1){
        console.log('lag gaye')
        resetGame()
    }

    for(let i = 1; i< snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            console.log('lag gaye')
            resetGame()
        }
            
    }
}

function resetGame(){
    updateHighScore()

    stopGame()

    snake = [{x: 10, y: 10}]
    food = generateFood()
    direction = 'right'
    gameSpeedDelay = 500
    updateScore()
    //
}

function updateScore(){
    const currentScore = snake.length - 1
    scoreDisplay.innerHTML = currentScore.toString().padStart(3, '0')
}

function updateHighScore(){
    const currentScore = snake.length - 1
    if(currentScore > highScore){
        console.log(currentScore, highScore)
        highScore = currentScore
        highScoreDisplay.innerHTML = highScore.toString().padStart(3, '0')
    }
    highScoreDisplay.style.display = 'block'
    highScoreTitle.style.display = 'block'
}

function stopGame(){
    clearInterval(gameInterval)
    instructionText.style.display = ''
    logo.style.display = ''
    //food.style.display = 'none'
    gameStarted = false
}

document.addEventListener('keydown', handleKeyPress)
