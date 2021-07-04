logging = true;
c = document.getElementById("myCanvas");
ctx = c.getContext("2d");

width = c.width;
height = c.height;

fgInput = new FGenInput();

intervalInput = id("intervalInput");
startX = id("startX");
startY = id("startY");
startAngle = id("startAngle");
startLength = id("startLength");
depth = id("depth");

itemAngle = id("itemAngle");
itemScale = id("itemScale");

fractalGenerator = undefined;
subscribe();

function start(){
  initValues();
  fractalGenerator = new FractalGenerator(fgInput,ctx);
  fractalGenerator.start();
}
function stop(){
  fractalGenerator.stop();
}
function clear() {
  ctx.clearRect(0,0,width,height);
}
function clearItems() {
  fgInput.items = [];
  updateAddedItemsSection(fgInput.items);
}
function addItem() {
  let item = new Item(Number.parseFloat(itemAngle.value),
  Number.parseFloat(itemScale.value));
  fgInput.items.push(item);
  
  updateAddedItemsSection(fgInput.items);
  //log("new item added");
  //log(item);
}

function initValues(){
  fgInput.intervalTime = Number.parseInt(intervalInput.value);
  fgInput.startX = Number.parseFloat(startX.value);
  fgInput.startY = Number.parseFloat(startY.value);
  fgInput.startAngle = Number.parseFloat(startAngle.value);
  fgInput.startLength = Number.parseFloat(startLength.value);
  fgInput.depth = Number.parseInt(depth.value);
  //log(fgInput) ;
}

function subscribe() {
  id("addItemButton").onclick = function() {
    addItem();
  };
  
  id("startButton").onclick = start;
  id("stopButton").onclick = stop;
  id("clearButton").onclick = clear;
} 

function id(id){
  let element = document.getElementById(id);
  //log("found element by id " + id + ":");
  //log(element);
  return element;
}

function updateAddedItemsSection(items){
  let addedDiv = id("addedItemsDiv");
  
  let itemsContainer = id("addedItemsContainer");
  
  if(itemsContainer != undefined){
    addedDiv.removeChild(itemsContainer);
  }
  
  itemsContainer = document.createElement("div");
  addedDiv.appendChild(itemsContainer);
  
  items.forEach(item => {
  let textEl = document.createTextNode(
    "Angle: " + item.angle + " | "
  + "Scale: " + item.scale);
  
  
  itemsContainer.appendChild(textEl);
  itemsContainer.appendChild(document.createElement("br"));
 });
 itemsContainer.setAttribute("id","addedItemsContainer");
 
 
}

function log(message){
  if(logging == true)
  {
    console.log(message);
  }
  
}
