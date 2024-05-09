function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(220);
  ambientLight(150,150,150)
  pointLight(0, 0, 255, mouseX, mouseY, -250);
  push()
  translate(0,-50,00)
  rotateY(frameCount/100)
  rotateZ(frameCount/50)
  fill(255,135,0)
  box(100)
  pop()
  push()
  translate(0,0,-100)
  // rotateY(frameCount/100)
  fill(0,135,200)
  ellipse(0,0,100)
  pop()
  
}