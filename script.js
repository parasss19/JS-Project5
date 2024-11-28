const canvas = document.querySelector("#draw")

//create context - The context is used for drawing on the canvas. 
const ctx = canvas.getContext('2d')    //'2d' specifies the type of rendering context, enabling 2-d drawing.
ctx.strokeStyle = '#FFD700'            //Defines the color used for strokes 
ctx.lineJoin = 'round'                 //Specifies how two lines join at their "endpoints"
ctx.lineCap = 'round'                  //Specifies the "shape" of the end of a line 

let isDrawing = false;   // Track drawing state(initialy not drawing)
let lastX = 0;           // Store the last mouse X position
let lastY = 0;           // Store the last mouse Y position

//When mousedown then we start drawing
canvas.addEventListener("mousedown", (e)=>{
    isDrawing = true 
    //update the lastX and lastY
    lastX = e.offsetX
    lastY = e.offsetY 
})

//Now Draw while moving the mouse
canvas.addEventListener("mousemove", (e) =>{
    if(!isDrawing) return   //stop drawing func when mouse is not down
    
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)         //start from
    ctx.lineTo(e.offsetX, e.offsetY) //go to
    ctx.stroke()
    
    //update the lastX and lastY
    lastX = e.offsetX
    lastY = e.offsetY
})

//Stop drawing when mouseup and mouseout
canvas.addEventListener("mouseup", () => isDrawing=false)       
canvas.addEventListener("mouseout",() => isDrawing=false)     

