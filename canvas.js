let canvas = document.querySelector("canvas")
let context = canvas.getContext("2d")
canvas.height = 900
canvas.width = 900

let cellSize = 30
let rows = canvas.height / cellSize
let columns = canvas.width / cellSize
console.log(rows)
console.log(columns)

let board = [] 
for (let i = 0; i < rows; i++) {
    board[i] = new Array(columns);
}

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
        board[i][j] = false
    }
}

let mouseDown = false
let playing = false




function start(){
    playing = true

}

function pause(){
    playing = false
}



window.addEventListener('mousedown',
    function(event){
        var rect = canvas.getBoundingClientRect();
        if(event.clientX < canvas.height && event.clientY < canvas.height){
            mouseDown = true
            fillCell(event)
        }
    } 
)
window.addEventListener('mouseup',
    function(){
        mouseDown = false
    } 
)


window.addEventListener('mousemove',
    function(event){
        if(mouseDown){
            fillCell(event)
        }
    } 
)
function fillCell(event){
    let yPos = Math.floor(event.clientY / cellSize)
    let xPos = (Math.floor(event.clientX / cellSize))
    console.log(xPos + "," + yPos)
    context.beginPath();
    context.fillRect(cellSize * xPos, cellSize * yPos, cellSize, cellSize);
    context.stroke();

    board[yPos][xPos] = true
    console.log(board)
}

function drawBoard(){
    for(let i =0; i < canvas.height; i = i + cellSize){
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.width, i);
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.stroke();
        context.fillStyle = "red";
    }
    for(let i =0; i < canvas.width; i = i + cellSize){
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.stroke();
        context.fillStyle = "red";
    }
}

function animate(){
    requestAnimationFrame(animate)
    drawBoard()

}


animate()