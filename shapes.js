/**
 * @param {Point} startPoint start point
 * @param {Number} length Length
 * 
 * @param {CanvasRenderingContext2D} context 2D context
 **/
function Line(startPoint,length,angle,context,animate,animationTime)
{
  this.startPoint = new Point(startPoint.x,startPoint.y);
  let _length = length;
  let _angle = angle;
  let _lineWidth = _length / 12;
 
  let _animate = (typeof animate == "boolean")?animate:false;
  let _animationTime = (typeof animationTime == "number")?animationTime:0;
  let _animationMaxFPS = 30;
  let _animationPieceDistance = 13;
  let _animationMaxFrames = (_animationMaxFPS/1000) * animationTime;
  
  this.endPoint = calculateEndPoint(this.startPoint,_length,_angle);
  
  this.draw = function(){
    if(_animate
    && _length > 2*_animationPieceDistance
    && _animationMaxFrames > 1
    ){
      drawAnimatedPath(this.startPoint,this.endPoint);
    }
    else {
      drawPath(this.startPoint,this.endPoint);
    }
  };
  
  
  this.getAngle = function(){
    return _angle;
  }
  this.getLength = function() {
    return _length;
  }
  
  
  // Private methods
  function drawAnimatedPath(startP,endP){
    //let dis = distance(startP,endP);
    
    
    let count = Math.floor(_length / _animationPieceDistance) + 1;
    if(count > _animationMaxFrames){
      count = _animationMaxFrames;
    }
    //log("count: " + count);
    
    let animLength = _length / count;
    let animSP = startP;
    let timeout = _animationTime / count;
    
    let drownCount = 0;
    
    //log("anim length: " + animLength);
    //log("animSP: ");
    //log(animSP);
    //log("timeout: " + timeout);
    
    drawPart();
    
    function drawPart(){
      let ep = calculateEndPoint(animSP,animLength,_angle);
      drawPath(animSP,ep);
      
      drownCount++;
      
      if(drownCount < count){
        animSP = ep;
        setTimeout(drawPart,timeout);
      }
    }
    
  }
 /* 
  function distance(startP,endP){
    let d2 = Math.pow(startP.x - endP.x,2) + Math.pow(startP.y - endP.y,2);
    
    return Math.sqrt(d2);
  }
  */
  function drawPath(startP,endP) {
    context.beginPath();
    context.lineWidth = _lineWidth;
    context.moveTo(startP.x, startP.y);
    context.lineTo(endP.x, endP.y);
    context.stroke();
    
    
  }
  function calculateEndPoint(sp,len,ang) {
    
    let radian = ang * Math.PI / 180; // if you're using degrees instead of radians
   
   /*
    log(sp);
    log(len);
    log(ang); */
    
    let x = (len * Math.cos(radian)) + sp.x;
    
    //log(typeof startPoint.x);
    
    //log(" (" +x + ")=(" + upLevel.length + ")*(" + cos(radian) + ")+(" + upLevel.startPoint.x +")");
   
    let y = (len * Math.sin(radian)) + sp.y;
    
    let ep = new Point(x,y);
    
    //log(ep);
    
    return ep;
  }
}

function Point(x,y) 
{
  this.x = x;
  this.y = y;
}


