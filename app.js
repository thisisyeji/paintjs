const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fillBtn = document.getElementById("jsFill");
const brushBtn = document.getElementById("jsBrush");
const eraseBtn = document.getElementById("jsErase");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");


const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let brushing = true;
let filling = false;
let erasing = false;

function stopPainting(event) {
  painting = false;
}

function startPainting(event) {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(erasing) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
  }
  if(!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleFillClick(event) {
  filling = true;
  brushing = false;
  erasing = false;
  ctx.strokeStyle = ctx.fillStyle;
  fillBtn.classList.remove("button_opacity");
  brushBtn.classList.add("button_opacity");
  eraseBtn.classList.add("button_opacity");
}

function handleBrushClick(event) {
  brushing = true;
  filling = false;
  erasing = false;
  ctx.strokeStyle = ctx.fillStyle;
  fillBtn.classList.add("button_opacity");
  brushBtn.classList.remove("button_opacity");
  eraseBtn.classList.add("button_opacity");
}

function handleEraseClick(event) {
  brushing = false;
  filling = false;
  erasing = true;
  fillBtn.classList.add("button_opacity");
  brushBtn.classList.add("button_opacity");
  eraseBtn.classList.remove("button_opacity");
} 

function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handelCM(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS"; // a 태그의 attribute
  link.click();
}

function handleClearClick(event) {
  if(confirm("Are you sure to delete all?") == true) {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}


if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting); // 마우스를 캔버스에 클릭한 상태로 있을 때 함수 실행
  canvas.addEventListener("mouseup", stopPainting); // 마우스를 캔버스에서 뗐을 때
  canvas.addEventListener("mouseleave", stopPainting) // 마우스를 캔버스 밖으로 뺐을 때
  canvas.addEventListener("click", handleCanvasClick)
  canvas.addEventListener("contextmenu", handelCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {range.addEventListener("input", handleRangeChange);}

if(fillBtn) {fillBtn.addEventListener("click", handleFillClick);}

if(brushBtn) {brushBtn.addEventListener("click", handleBrushClick);}

if(eraseBtn) {eraseBtn.addEventListener("click", handleEraseClick);}

if(clearBtn) {clearBtn.addEventListener("click", handleClearClick);}

if(saveBtn) {saveBtn.addEventListener("click", handleSaveClick);}


