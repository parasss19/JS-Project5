const canvas = document.querySelector("#draw")            //select canvas
const magicBtn = document.querySelector('#magic-button')  //select magic button
const baseColorPicker = document.querySelector("#base");  // Select color input
const eraseBtn = document.querySelector("#erase-button")
const resetBtn = document.querySelector("#reset-button")


//create context - The context is used for drawing on the canvas. 
const ctx = canvas.getContext('2d')    //'2d' specifies the type of rendering context, enabling 2-d drawing.
ctx.strokeStyle = '#FFD700'            //Defines the color used for strokes(defualt color) 
ctx.lineJoin = 'round'                 //Specifies how two lines join at their "endpoints"
ctx.lineCap = 'round'                  //Specifies the "shape" of the end of a line 
ctx.lineWidth = 10

//Track state
let isDrawing = false;   // Track drawing state(initialy not drawing)
let lastX = 0;           // Store the last mouse X position
let lastY = 0;           // Store the last mouse Y position
let hue = 0;             // track hue (initialy 0)
let isMagicMode = false  //track whether magic btn enabled or not
let isEraseMode = false  //track erase btn


//When mousedown then we start drawing
canvas.addEventListener("mousedown", (e)=>{
    isDrawing = true 
    //update the lastX and lastY
    lastX = e.offsetX
    lastY = e.offsetY 
})

//Now Draw while moving the mouse
canvas.addEventListener("mousemove", (e) =>{
    //console.log(e)
    if(!isDrawing) return   //stop drawing func when mouse is not down

    ctx.beginPath()
    ctx.moveTo(lastX, lastY)         //start from
    ctx.lineTo(e.offsetX, e.offsetY) //go to
    ctx.stroke();
    //update the lastX and lastY
    lastX = e.offsetX
    lastY = e.offsetY

    //Change strokeStyle based on whether isMagicMode true or false
    if(isMagicMode == true){
       ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
       hue++
    }else{
       ctx.strokeStyle = baseColorPicker.value  //Use the selected color
    }

    //Modify strokestyle on mousemove respect erase mode
    ctx.strokeStyle = isEraseMode 
            ? (canvas.style.backgroundColor || "#52525B")
            : (isMagicMode ? `hsl(${hue}, 100%, 50%)` : baseColorPicker.value)
})

//Stop drawing when mouseup and mouseout
canvas.addEventListener("mouseup", () => isDrawing=false)       
canvas.addEventListener("mouseout",() => isDrawing=false)     



//Magic Button Functionality - Here we use hsl() to make magic stroke
magicBtn.addEventListener("click", () =>{
    isMagicMode = !isMagicMode     //toggle isMagicMode 
    if(isMagicMode == true){
        magicBtn.textContent = "Stop magic"
    }else{
        magicBtn.textContent = "Magic Button🪄"
    }
})


//Erase button functionality
eraseBtn.addEventListener("click", ()=>{
    if(isEraseMode){
        isEraseMode = false
        eraseBtn.textContent = "Erase";
        ctx.strokeStyle = baseColorPicker.value
    }else{
        isEraseMode = true
        eraseBtn.textContent = "Stop Erasing";
        ctx.strokeStyle = canvas.style.backgroundColor || "#52525B";  //Set to canvas background color  (#52525B = bg-zinc-600)
    }
})


//Reset button Functionality
resetBtn.addEventListener("click", ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Clear the entire canvas
})