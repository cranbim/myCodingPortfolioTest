let f0
let vs
let na=12


function preload(){
  f0=loadFont("JosefinSans-Regular.ttf")
  //Josefin Sans from Google fonts
  // vs=new VMSquare(300,300,200,50,PI/8)
  // vs=new VMSquareSet(300,300,200,50,PI/8,5,100)
  
}

function setup() {
  createCanvas(600, 600);
  labels=new Labels(
    f0, "Genuary24 #05", 
    "in the style Vera Molnár (RIP)", 
    0.08, 
    400
  )
  vs=new VMGrid(na,12)
}

function draw() {
  background(230);
  vs.run()
  // vs.show()
  //render labels at the end
  labels.run()
}

function VMGrid(na,n){
  let step=width/na
  vmss=[]
  
  for(let j=0; j<na; j++){
    for(let i=0; i<na; i++){
      vmss.push(new VMSquareSet(
        (i+0.5)*step,
        (j+0.5)*step,
        step*1.25,
        step*0.2,
        PI/8,
        n,
        step
      ))
    }
  }
  
  this.run=function(){
    vmss.forEach(function(vms){
      vms.run()
    })
  }
}

function VMSquareSet(x,y,s,ds,da,nn,sr){
  let vss=[]
  let n=floor(random(nn/2)+nn/2)
  for(let i=0; i<n; i++){
    vss.push(new VMSquare(x,y,s-i*sr/n,ds,da))
  }
  
  this.run=function(){
    vss.forEach(function(vs,i){
      vs.run(i)
      vs.show()
    })
  }
}

function VMSquare(x,y,s,ds,da){
  let offset=random(10)
  
  let verts=[
    {aNom:-PI*0.75, rNom:s*0.5},
    {aNom:-PI*0.25, rNom:s*0.5},
    {aNom:PI*0.25, rNom:s*0.5},
    {aNom:PI*0.75, rNom:s*0.5},
  ]
  
  this.run=function(iSq){
    verts.forEach(function(v,i){
      v.a=v.aNom+(noise(
        offset+x*0.01+frameCount*0.01+i*0.1,
        y*0.01+frameCount*0.001
      )-0.5)*2*da
      v.r=v.rNom+ds*(noise(iSq*frameCount*0.0033+x*0.02,y*0.02)-0.5)
      v.x=x+cos(v.a)*v.r+ds*noise(x,y,i/10+frameCount*0.0045)
      v.y=y+sin(v.a)*v.r+ds*noise(x,y,i/12+frameCount*0.0038)
      // console.log()
    })
  }
  
  this.show=function(){
    noFill()
    stroke(0,180)
    strokeWeight(0.1+2*noise(x+frameCount*0.01,y+offset))
    beginShape()
    verts.forEach(function(v){
     vertex(v.x, v.y) 
    })
    endShape(CLOSE)
  }
}

