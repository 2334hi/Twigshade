
// Environment statistics / positioning
let trees_1x = []; 
let trees_1y = []; 
let trees_1trans = []; 
let tree_1angles = []

let trees_2x = []; 
let trees_2y = []; 
let trees_2trans = []; 

let trees_3x = []; 
let trees_3y = []; 
let trees_3trans = []; 

// First i = numBranches, Second i = angle
let trees_1branches = []; 
let branch1_stats = []; 
let trees_2branches = []; 
let branch2_stats = []; 
let trees_3branches = []; 
let branch3_stats = []; 

// Generated bush positions
let bushes = []; 
let rustlespeed = 3; 
let disturbed = false; 
let releasing = false; 

// Targeting marker
let targetting = false; 
let targetX = -1; 
let targetY = -1; 

// "Rabbit" invaders statistics
let rabbits = []; 
let rabitSpeed = 1; 
let captured = 0; 

// The root of Twigshade
let rootx = 0; 
let rooty = 0; 

// Screen Rumbling controller
let transx = 0; 

// Various settings for scene development
let toggle = false; 
let spawned = false; 
let developed = false; 
let rooted = false; 
let phase0 = true; 
let phase1 = false; 
let toxicated = false; 
let toxins = []; 
let toxinspeed = 3; 
let rot = 54; 
let phase2 = false; 

// Twigshade statistics
let spinspeed = 0; 
let bulbx = 400; //400
let bulby = 500; //475
let travSpeed = 3; 
// Stem attachments
let attachx1 = 0; 
let attachy1 = 0; 
let attachx2 = 0; 
let attachy2 = 0; 
let attachx3 = 0; 
let attachy3 = 0; 
let attachments = [];
let directions = [];

function setup() {
  createCanvas(800, 500);
  
  // Setup initial background
  background(255); 
  fill(0); 
  
  // Setup Region I
  noFill(); 
  for(let i = 0; i < 50; ++i){
    push(); 
    
    let pos1 = round(random(0, 800)); 
    let trans = 0; 
    let treeangle = round(random(-7, 7));
    tree_1angles.push(treeangle); 
    let numBranches = round(random(0, 5)); // round(0, 5)
    // Creates trees of varying display for the environment
    if(i >= 0 && i <= 15){
      trans = 30; 
      trees_1trans.push(trans); 
      trees_2trans.push(trans); 
      trees_3trans.push(trans); 
      
      trees_1x.push(pos1); 
      trees_1y.push(height); 
      trees_1branches.push(numBranches); 
      for(let k = 0; k < numBranches; ++k){
        branch1_stats.push(round(random(0, -250))); 
      }
      grow(pos1, height, pos1, 0, trans, trees_1branches, treeangle); 
       
    } else if(i >= 16 && i <= 35){
      trans = 95; 
      trees_1trans.push(trans); 
      trees_2trans.push(trans); 
      trees_3trans.push(trans); 
      trees_1x.push(pos1); 
      trees_1y.push(height); 
      trees_1branches.push(numBranches); 
      for(let k = 0; k < numBranches; ++k){
        branch1_stats.push(round(random(0, -250))); 
      }
      grow(pos1, height, pos1, 0, trans, trees_1branches, treeangle); 
      
       
    } else if(i >= 36 && i <= 50){
      trans = 350; 
      trees_1trans.push(trans); 
      trees_2trans.push(trans); 
      trees_3trans.push(trans); 
      trees_1x.push(pos1); 
      trees_1y.push(height);
      trees_1branches.push(numBranches); 
      for(let k = 0; k < numBranches; ++k){
        branch1_stats.push(round(random(0, -250))); 
      }
      grow(pos1, height, pos1, 0, trans, trees_1branches, treeangle); 
      // let newTree = new Tree(pos1, height, pos1, 0, trans); 
      // trees.push(newTree); 
      // trees[i].grow(); 
    }
    
    pop(); 
    
  } 
  
}

function draw() {
  
  if(!phase1){
    background(62, 130, 121); 
  } else {
    background(25, 22, 38); 
  }
  
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

  
  for(let i = 0; i < 50; ++i){ // Ensuring trees stay on screen
    
    grow(trees_1x[i], trees_1y[i], trees_1x[i], 0, trees_1trans[i], trees_1branches, tree_1angles[i]); 
    
  }
  
  strokeWeight(1); 
  fill(10, 77, 1); 
  rect(0, 450, 800, 50); 
  generatebushes(); 
  
  rabbit(); // Spawns the rabbit invaders
  
  // Rocks
  push(); 
  translate(50, 425); 
  rotate(radians(45)); 
  fill(73, 74, 64); 
  stroke(0); 
  rect(0, -35, 100, 75); 
  rotate(radians(-90)); 
  rect(-15, 75, 100, 75); 
  pop(); 
  
  fill(207, 194, 14);
  text("Slain: ", 50, 50);
  text(captured, 90, 50); 
  
  if(releasing){ // When the beast returns to slumber
    toggle = true; 
    disturbed = false; 
    spawned = false; 
    developed = false; 
    rooted = false; 
    bulbx = 400;
    bulby = 500; 
    toggle = false; 
    releasing = false; 
    rabbits = []; 
    if(phase1 == true){
      phase2 = true; 
    } else{
      phase1 = true; 
    }
  }
  
  // The following lines detect whether the entity is fully awoken. 
  if(!spawned){ 
    fill(255); 
    text("Tap the bushes to awaken an entity and protect these woods...", 415, 50); 
  }
  
  if(disturbed){
    spawnTShade(bulbx, bulby); 
    if(!developed){
      if(bulby >= 200){
        bulby -= 2; 
        toggle = true; 
      } else {
        toggle = false; 
        spawned = true; 
      }
    }
  }

  if(phase1){
    phase1arena(); 
  }
  
  if(spawned){
    
    if(!developed){
      develop(bulbx, bulby + 50);
    }
    
    strokeWeight(20); 
    if(!phase1){
      stroke(5, 135, 16);
    } else{
      stroke(32, 23, 43); 
    }
    

    line(bulbx, bulby + 50, attachments[0], attachments[1]);
    line(bulbx, bulby + 50, attachments[2], attachments[3]);
    line(bulbx, bulby + 50, attachments[4], attachments[5]);
    for(let i = 0; i < attachments.length; ++i){
      if(i % 2 == 0){
        if(attachments[i] > 0 && attachments[i] < 800 && attachments[i + 1] < 500 && attachments[i + 1] > 0){
          attachments[i] += directions[i];
        }
      } else{
        if(attachments[i] > 0 && attachments[i] < 500 && attachments[i-1] < 800 && attachments[i-1] > 0){
          attachments[i] += directions[i];
        }
      }
    }
    
    rooted = true; 

  } 
  // It is fully awoken when it is "rooted", thus giving chase to the rabbits
  if(rooted){
    bloom(bulbx, bulby, spinspeed); 
    spinspeed += 3; 
    chase(); 
    
  }
  
}

// Grow Tree Function. Takes varying positions in the backround
// and plants trees of varying transprancy to produce a depth effect. 
function grow(x1, y1, x2, y2, trans, branches, angle){
    push(); 
    translate(width/2, height/2); 
    rotate(radians(angle)); 
    strokeWeight(25); 
    if(!phase1){
      stroke(54, 24, 8, trans); 
    } else{
      stroke(rot, 24, 8, trans); 
      rot -= 3;
    }
    
    line(x1 - 400, y1 + 250, x2 - 400, y2 - 300);
    noStroke();  
    fill(54, 24, 8, trans); 
        
    for(let i = 0; i < branches.length; ++i){
      
      
      for(let k = 0; k < branch1_stats[i]; ++k){
        let direction = 0; 
        if(i % 2 == 0){
          direction = (x1 - 400) + 45;
        } else {
          direction = (x1 - 400) - 45;
        }
        
        // triangle((x1 - 400), branch, (x1 - 400), branch + 15, direction, branch + 15);
      }
      
    } 
    pop(); 
}

// Main spawn function for creature
function spawnTShade(x, y){
  stroke(35, 105, 44); 
  strokeWeight(30); 
  line(x, y, x, 500); 
  stroke(26, 115, 10); 
  line(x, y, x + 25, 500);
  stroke(71, 161, 55); 
  line(x, y, x - 25, 500);

  strokeWeight(1); 
  stroke(0); 
  if(!phase1){
    fill(79, 4, 13); // Better red
  } else{
    fill(48, 14, 92);
  }
  
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


function develop(x, y){ // Spawn assistance function
  
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

function bloom(x, y, spinspeed){ // Blooms the flower on Twigshade
  
  push();
  strokeWeight(1);
  stroke(0);
  translate(x, y); 
  if(!phase1){
    fill(79, 4, 13);
  } else{
    fill(48, 14, 92); 
  }
   
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
  translate(6, 6); 
  
  circle(rootx, rooty, 100); 
  stroke(159, 173, 156); 
  
  fill(159, 173, 156);
  for(let i = 0; i < 10; ++i){
    triangle(rootx + round(random(-35, 35)), rooty + round(random(-35, 35)), rootx + round(random(-35, 35)), rooty + round(random(-35, 35)), rootx + rootx + round(random(-35, 35)), rooty + round(random(-35, 35)));
  }
  
  pop();
   
}

// Bush generating function
function generatebushes(){
  noStroke(); 
  if(!phase1){
    fill(77, 97, 66);
  } else{
    fill(77, 48, 28); 
  }
  
  if(bushes.length == 0){
    for(let i = 0; i < 12; ++i){
      let x = round(random(0, 800));
      let y = round(random(400, 425)); 
      bushes.push(x); 
      bushes.push(y); 
    }
  }
  
  for(let i = 0; i < bushes.length; i += 2){
    rect(bushes[i], bushes[i+1], 100, 65);
    circle(bushes[i] + 15, bushes[i+1], 50);
    circle(bushes[i] + 15, bushes[i+1] + 30, 50); 
    circle(bushes[i] + 15, bushes[i+1] + 45, 50); 

    circle(bushes[i] + 45, bushes[i+1], 50); 

    circle(bushes[i] + 75, bushes[i+1], 50); 
    circle(bushes[i] + 85, bushes[i+1] + 30, 50); 
    circle(bushes[i] + 85, bushes[i+1] + 45, 50); 
  }
  
}

function rabbit(){ // This function controls rabbit movement speeds before 
  push();           // and during Twigshade encounter. 
  fill(54, 53, 50); 
  stroke(0); 
  translate(400, 425);  

  
  if(rabbits.length == 0){
    for(let i = 0; i < 8; ++i){
      let x = round(random(-200, 200)); 
      let y = 0; 
 
      ellipse(x, y, 25, 50);
      rabbits.push(x); 
    }
  }
  
  if(toxicated){
    rabitSpeed = 0.5;
  }
  
  for(let i = 0; i < rabbits.length; ++i){ // Produces rabits in varying
                                            // positions. 
    if(!disturbed){
      let speed = round(random(-5, 5)); 

      rabbits[i] += speed; 
    } else if(disturbed && rooted){
      if(rabbits[i] >= 0){
        rabbits[i] += rabitSpeed; 
        print(rabitSpeed); 
        
      } else if(rabbits[i] < 0){
        rabbits[i] -= rabitSpeed; 
      }
    }
    
    ellipse(rabbits[i], 0, 25, 50); 
    circle(rabbits[i] + 10, 15, 20); 
    strokeWeight(3); 
    line(rabbits[i] + 5, -15, rabbits[i] + 10, -25); 
    line(rabbits[i] - 5, -15, rabbits[i] - 10, -25); 
    
  }
  
  pop(); 
  
}

function chase(){ // Twigshade gives chase to the invaders. 
  
  if(rooted && disturbed){
    for(let i = 0; i < rabbits.length; ++i){
      if(targetting == false){
        if(rabbits[i] >= -400 && rabbits[i] <= 400){

          targetting = true; 
          targetX = i; //rabbits[i] + 400
          targetY = 425; 
        }
      }
      if(targetting == false){ // No more prey
        bulbx = lerp(bulbx, 400, 0.01); 
        bulby = lerp(bulby, 250, 0.01); 
        if(!phase1){
          text("Mutation Ready... R", 450, 50);
        } else {
          fill(255); 
          text("Invaders cleared... return to slumber R", 450, 50); 
        }
      }
      if(rabbits[targetX] + 400 < 0 || rabbits[targetX] + 400 > 800){
        targetting = false; // Prey out of bounds
      }
      
    }
  }
  
  if(targetting){ // Chasing prey currently 
    bulbx = lerp(bulbx, rabbits[targetX] + 400, 0.02); 
    bulby = lerp(bulby, targetY, 0.01);
    if((bulbx + 15 >= rabbits[targetX] + 400 || bulbx - 15 <= rabbits[targetX] + 400) && (bulby + 10 >= targetY && bulby - 10 <= targetY)){
      captured += 1; 
      
      rabbits[targetX] += (400 + 1000);
    }
    fill(207, 194, 14); 
    
    print(captured); 
  }
}

function rustle(x, y){ // Making a rustle in the bush. 
  for(let i = 0; i < bushes.length; i += 2){
    bushes[i] += rustlespeed; 
    bushes[i+1] += rustlespeed; 
  }
  rustlespeed = -rustlespeed; 
  
  let disb = round(random(0, 3)); 
  if(disb == 2){
    print("Beast has been disturbed"); 
    disturbed = true; 
  }
  
}

function phase1arena(){ // Mutation occurs
  push(); 
  fill(113, 94, 138, 110); 
  if(toxicated == false){
    for(let i = 0; i < 20; ++i){
      let x = round(random(0, 800)); 
      let y = round(random(0, 500)); 
      toxins.push(x);
      toxins.push(y);
    }
    toxicated = true; 
  }
  
  for(let i = 0; i < toxins.length; i += 2){
    noStroke(); 
    toxins[i] += toxinspeed; 
    if(toxins[i] < 0){
      toxins[i] = 800; 
    }
    
    if(toxins[i] > 800){
      toxins[i] = 0; 
    }
    
    circle(toxins[i], toxins[i+1], 50); 
    
  }
  pop(); 
}

// The following are key player inputs that continue the scene. 
function mousePressed(){
  if(mouseY >= 390 && mouseY <= 475 && disturbed == false){
    rustle(mouseX, mouseY); 
  }
}

function keyReleased(){
  if(key == "R" || key=="r"){
    releasing = true; 
  }
}
