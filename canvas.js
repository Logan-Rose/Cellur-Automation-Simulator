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

function condition(board, j, i){
    neighbours = []
    if(j == 0 && i == 0){
        neighbours.push(board[j][i+1])
        neighbours.push(board[j+1][i])
        neighbours.push(board[j+1][i+1])
      }else if(j == 0 && i == columns -1){
        neighbours.push(board[j][i-1])
        neighbours.push(board[j+1][i])
        neighbours.push(board[j+1][i-1])
      }else if(j == rows -1 && i ==columns-1){
        neighbours.push(board[j][i-1])
        neighbours.push(board[j-1][i])
        neighbours.push(board[j-1][i-1])
      }else if(j == rows -1 && i == 0){
        neighbours.push(board[j][i+1])
        neighbours.push(board[j-1][i])
        neighbours.push(board[j-1][i+1])
      }else if(j==0){
        neighbours.push(board[j][i-1])
        neighbours.push(board[j+1][i-1])
        neighbours.push(board[j+1][i])
        neighbours.push(board[j+1][i+1])
        neighbours.push(board[j][i+1])
      }else if(j==rows-1){
        neighbours.push(board[j][i-1])
        neighbours.push(board[j-1][i-1])
        neighbours.push(board[j-1][i])
        neighbours.push(board[j-1][i+1])
        neighbours.push(board[j][i+1])
      }else if(i==0){
        neighbours.push(board[j-1][i])
        neighbours.push(board[j+1][i])
        neighbours.push(board[j][i+1])
        neighbours.push(board[j+1][i+1])
        neighbours.push(board[j-1][i+1])
      }else if(i==columns-1){
        neighbours.push(board[j-1][i])
        neighbours.push(board[j+1][i])
        neighbours.push(board[j-1][i-1])
        neighbours.push(board[j][i-1])
        neighbours.push(board[j+1][i-1])
      }else{
        neighbours.push(board[j][i+1])
        neighbours.push(board[j][i-1])
        neighbours.push(board[j+1][i])
        neighbours.push(board[j+1][i+1])
        neighbours.push(board[j+1][i-1])
        neighbours.push(board[j-1][i])
        neighbours.push(board[j-1][i+1])
        neighbours.push(board[j-1][i-1])
    }
    neighbours.filter(isTrue)
    let neighbourCount = neighbours.filter(isTrue).length
    if(neighbourCount!=0){
        console.log(i + "," + j + ":" + neighbourCount)
    }

    if(board[j][i] && (neighbourCount ==2 || neighbourCount == 3)){
        console.log("Alive " + neighbourCount +  true)
        return true
    } else if(!board[j][i] && neighbourCount ==3){
        console.log("Dead " + neighbourCount + true)
        return true
    }else{
        return false
    }

}
function isTrue(x){
    return x
}

function start(){
    playing = true
    context.clearRect(0,0, canvas.width, canvas.height)
    let nextState = []
    for (let i = 0; i < rows; i++) {
        row = []
        for (let j = 0; j < columns; j++) {
            if(condition(board, i, j)){
                row[j] = true
            } else{
                row[j] = false
            }
            nextState[i] = row
        }
    }
    board = nextState
    console.log("next " + nextState)
    console.log("board " + nextState)
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if(board[j][i]){
                fillCell(i,j )
            }
        }
    }


}

function pause(){
    playing = false
}



window.addEventListener('mousedown',
    function(event){
        var rect = canvas.getBoundingClientRect();
        if(event.clientX < canvas.height && event.clientY < canvas.height){
            mouseDown = true
            let yPos = Math.floor(event.clientY / cellSize)
            let xPos = (Math.floor(event.clientX / cellSize))
            fillCell(xPos, yPos)
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
            let yPos = Math.floor(event.clientY / cellSize)
            let xPos = (Math.floor(event.clientX / cellSize))
            fillCell(xPos, yPos)
        }
    } 
)
function fillCell(xPos, yPos){

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