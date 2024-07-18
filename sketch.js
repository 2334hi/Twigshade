let trees = [];

let rootx = 0; 
let rooty = 0; 

let transx = 0; 

let toggle = false; 
let spawned = false; 
let developed = false; 
let rooted = false; 

let spinspeed = 0; 

let bulbx = 400; //400
let bulby = 500; //475
let travSpeed = 3; 

let attachx1 = 0; 
let attachy1 = 0; 
let attachx2 = 0; 
let attachy2 = 0; 
let attachx3 = 0; 
let attachy3 = 0; 
let attachments = [];
let directions = [];

function setup() {
  let cnb = createCanvas(800, 500);
  cnb.parent("p5-canvas-container");
  
  // Setup initial background
  background(255); 
  fill(0); 
  
  // Setup Region I
  noFill(); 
  for(let i = 0; i < 50; ++i){
    push();
    //translate(width/2, height/2); 
    let pos1 = round(random(0, 800)); 
    let trans = 0; 
    
    if(i >= 0 && i <= 15){
      trans = 30; 
      let newTree = new Tree(pos1, height, pos1, 0, trans); 
      trees.push(newTree); 
      trees[i].grow(); 
    } else if(i >= 16 && i <= 35){
      let trans = 95; 
      let newTree = new Tree(pos1, height, pos1, 0, trans); 
      trees.push(newTree); 
      trees[i].grow(); 
    } else if(i >= 36 && i <= 50){
      let trans = 350; 
      let newTree = new Tree(pos1, height, pos1, 0, trans); 
      trees.push(newTree); 
      trees[i].grow(); 
    }
    
    pop(); 
    
  } 
  
}

function draw() {
  
  background(62, 130, 121); 
  
  // Screenshake Mechanic
  if(toggle){
    if(transx <= 3){
      transx += 3; 
    } else if(transx >= 3){
      transx -= 3;
    }

    translate(transx, 0); 
    translate(0, 0); 
  }

  
  for(let i = 0; i < 50; ++i){
    trees[i].grow(); 
  }
  
  strokeWeight(1); 
  fill(10, 77, 1); 
  rect(0, 450, 800, 50); 
  
  
  spawnTShade(bulbx, bulby); 
  if(bulby >= 200){
    bulby -= 3; 
    toggle = true; 
  } else {
    toggle = false; 
    spawned = true; 
  }
  
  if(spawned){
    
    if(!developed){
      develop(bulbx, bulby + 50);
    }
    
    strokeWeight(20); 
    stroke(5, 135, 16);

    line(bulbx, bulby + 50, attachments[0], attachments[1]);
    line(bulbx, bulby + 50, attachments[2], attachments[3]);
    line(bulbx, bulby + 50, attachments[4], attachments[5]);
    for(let i = 0; i < attachments.length; ++i){
      if(i % 2 == 0){
        if(attachments[i] > 0 && attachments[i] < 800){
          attachments[i] += directions[i];
        }
      } else{
        if(attachments[i] > 0 && attachments[i] < 500){
          attachments[i] += directions[i];
        }
      }
    }
    
    rooted = true; 

    // if(rooted){
    //   bulbx += 5; 
    //   bulbx -= 4; 
    // }
  } 
  
  if(rooted){
    bloom(bulbx, bulby, spinspeed); 
    spinspeed += 3; 
    
   
    if(bulbx <= 325){
      travSpeed = -travSpeed; 
    } else if(bulbx >= 475){
      travSpeed = -travSpeed;
    } 
    
    bulbx += travSpeed;
    
    
  }
  
}

class Tree{
  
  constructor(x1, y1, x2, y2, trans){
    this.x1 = x1; 
    this.y1 = y1; 
    this.x2 = x2; 
    this.y2 = y2; 
    this.trans = trans; 
    
    this.angle = round(random(-7, 7)); 
    this.numBranches = round(random(0, 5));
    
    this.branches = []; 
    for(let i = 0; i < this.numBranches; ++i){
      this.branches.push(round(random(0, -250))); 
    }
    
  }
  
  grow(){
    push(); 
    translate(width/2, height/2); 
    rotate(radians(this.angle)); 
    strokeWeight(25); 
    stroke(54, 24, 8, this.trans); 
    line(this.x1 - 400, this.y1 + 250, this.x2 - 400, this.y2 - 300);
    noStroke();  
    fill(54, 24, 8, this.trans); 
        
    for(let i = 0; i < this.branches.length; ++i){
      let direction; 
      if(i % 2 == 0){
        direction = (this.x1 - 400) + 45;
      } else {
        direction = (this.x1 - 400) - 45;
      }
      
      triangle((this.x1 - 400), this.branches[i], (this.x1 - 400), this.branches[i] + 15, direction, this.branches[i] + 15);
    } 
    pop(); 
  }
  
  printBranchTest(){
    print(this.branches[0]);
  }
  
  branch(){
    push(); 
    translate(width/2, height/2); 
    rotate(radians(this.angle)); 
    
    pop(); 
  }
  
}

function spawnTShade(x, y){
  stroke(35, 105, 44); 
  strokeWeight(30); 
  line(x, y, x, 500); 
  strokeWeight(1); 
  stroke(0); 
  fill(79, 4, 13); // Better red
  circle(x, y, 75); 
  
  
  push();
  translate(x, y); 
  // for(let i = 0; i < 5; ++i){
  //   ellipse(25, 0, 75, 40); 
  // }
  strokeWeight(3); 
  stroke(66, 9, 28); // Red
  
  rotate(radians(-45));
  ellipse(15, 15, 95, 45); 
  
  rotate(radians(-90));
  ellipse(15, -15, 95, 45); 
  
  pop();
  
}

function develop(x, y){
  
  for(let i = 0; i < 3; ++i){
    let xdir = round(random(-10, 10));
    let ydir = round(random(-10, 10));
    directions.push(xdir); 
    directions.push(ydir); 
    
    attachments.push(x); 
    attachments.push(y); 
  }
  
  developed = true; 
  
  // line(x, y, attachx1, attachx2);
}

function bloom(x, y, spinspeed){
  
  push();
  strokeWeight(1);
  stroke(0);
  translate(x, y); 
  fill(79, 4, 13); 
  rotate(radians(spinspeed)); 
  
  ellipse(rootx, rooty - 40, 50, 100); 
  rotate(radians(45));
  ellipse(rootx, rooty - 40, 50, 100);
  rotate(radians(45));
  ellipse(rootx, rooty - 40, 50, 100);
  rotate(radians(45));
  ellipse(rootx, rooty - 40, 50, 100);
  rotate(radians(45));
  ellipse(rootx, rooty - 40, 50, 100);
  rotate(radians(45));
  ellipse(rootx, rooty - 40, 50, 100);
  rotate(radians(45));
  ellipse(rootx, rooty - 40, 50, 100);
  rotate(radians(45));
  ellipse(rootx, rooty - 40, 50, 100);
  
  
  stroke(43, 29, 32); 
  fill(0); 
   
  // Pretty cool effect note to self
  // translate(5, 5); 
  
  circle(rootx, rooty, 100); 
  pop();
   
  
}




