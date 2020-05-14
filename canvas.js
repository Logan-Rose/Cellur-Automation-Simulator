const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")
canvas.height = 900
canvas.width = 900

const cellSize = 30
const rows = canvas.height / cellSize
const columns = canvas.width / cellSize
var cell;
console.log(rows)
console.log(columns)


window.addEventListener('mousemove',
    function(event){
        let yPos = Math.floor(event.clientY / cellSize)
        let xPos = (Math.floor(event.clientX / cellSize))
        console.log(xPos + "," + yPos)
        context.beginPath();
        context.fillRect(cellSize * xPos, cellSize * yPos, cellSize, cellSize);
        context.stroke();
    } 
)

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