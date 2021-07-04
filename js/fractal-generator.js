
/**
 * @param {FGenInput} fGenInput
 * @param {CanvasRenderingContext2D} context
 **/
function FractalGenerator(fGenInput,context)
{
  let items = fGenInput.items;
  
  let isStopped = true;
  let _isAnimated = true;
  let _color = new Color(60,40,0);
  
  this.start = function(){
    isStopped = false;
    
    
    context.strokeStyle = _color.hex();
    
    let startPoint = new Point(fGenInput.startX,fGenInput.startY);
    let firstShape = createShape(startPoint,fGenInput.startLength,fGenInput.startAngle);
    
    let currentShapes = [firstShape];
    
    let depth = fGenInput.depth;
    let intervalTime = fGenInput.intervalTime;
    
    setTimeout(iteration,intervalTime);
    
    function iteration(){
      //log(currentShapes);
      //drawShapes(currentShapes);
      depth--;
      
      if(depth <= 0){
        return;
      }
      
      _color.addG(15);
      _color.addR(-10);
      context.strokeStyle = _color.hex();
      
       
      currentShapes = generate(currentShapes);
      
      if(isStopped != true){
        setTimeout(iteration,intervalTime);
      }
    }
  };
  this.stop = function() {
    isStopped = true;
  };
  
  
  // Private methods
  function createShape(startPoint,length,angle){
    
    let line = new Line(startPoint,length,angle,context,_isAnimated,fGenInput.intervalTime);
    
    line.draw();
    //log(ine);
    //log(length);
    //log(angle);
    
    return line;
  }
  function generate(currentShapes){
   
    let newShapes = [];
    currentShapes.forEach(shape => {
      let shapes = getNewShapes(shape);
      newShapes = newShapes.concat(shapes);
      
      
    });
    
    return newShapes;
  }
  function getNewShapes(currentShape){
    let newShapes = [];
    
    items.forEach(item => {
      let newShape = createShape(currentShape.endPoint,
      currentShape.getLength()*item.scale,
      (currentShape.getAngle()+item.angle)%360);
      
    
      
      newShapes.push(newShape);
    });
    
    return newShapes;
  }
  function drawShapes(shapes){
    shapes.forEach(shape=> shape.draw());
  }
}

function FGenInput()
{
  this.intervalTime = 1;
  this.startX = 0;
  this.startY = 0;
  this.startAngle = 0;
  this.startLength = 1;
  this.depth = 10;
  
  this.items = new Array();
  
}
/**
 * @param {number} angle
 * @param {number} scale
 **/
function Item(angle,scale)
{
  this.angle = typeof angle != 'undefined' ? angle : 0;
  this.scale = typeof scale != "undefined" ? scale : 1;
}

function Color(r,g,b){
  let R = normalize(r);
  let G = normalize(g);
  let B = normalize(b);
  
  this.addR = function(v){
    R = normalize(R+v);
  }
  this.addG = function(v){
    G = normalize(G+v);
  }
  this.addB = function(v){
    B = normalize(G+v);
  }
  
  this.hex = function(){
    return "#" + componentToHex(R) + componentToHex(G) + componentToHex(B);
  };
  
  this.multiply = function(m){
    R = normalize(R * m);
    G = normalize(G * m);
    B = normalize(B * m);
  };
  
  this.multiplyRGB = function(rm,gm,bm) {
    R = normalize(R * rm);
    G = normalize(G * gm);
    B = normalize(B * bm);
  };
  
  
  function normalize(n){
    n = n>255?255:n;
    return Math.floor(n);
  }
  
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
}