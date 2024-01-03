function Labels(f0, message1,message2,wRel,life){
  l1=new Label(f0, message1,width*wRel*0.3, height*(1-wRel*2),width*wRel,life,30)
  l2=new Label(f0, message2, width*wRel*0.3,height*(1-wRel*1),width*wRel,life,90)
  
  this.run=function(){
    textFont(f0)
    l1.show()
    l1.run()
    l2.show()
    l2.run()
  }
}

function Label(f0, message,x,y,s,life,delay){
  let charDataA=[]
  let charA=[]
  let chars=message.split('')
  let tx=x
  let ty=y
  let fade=1
  let ttl=life+delay
  
  for(let i=0; i<chars.length; i++){
    let charData={
                    c:chars[i],
                 }
    let thisBounds=f0.textBounds(chars[i],tx,ty,s)
    charData.w=thisBounds.w
    charData.h=thisBounds.h
    charData.x=tx
    charData.y=ty
    charData.w=thisBounds.w
    tx+=thisBounds.w+s*0.035
    charDataA.push(charData)
    charA.push(new CharSpot(charData,150,s,life-100))
  }
  // console.log(charDataA)
  
  this.run=function(){
    if(ttl>0){
      ttl--
    } else if(fade>0){
      fade-=0.01
    }
    if(fade>0){
      charA.forEach(function(ch,i){
        if(frameCount>delay+i*5){
          ch.release()
        }
        ch.run()
        ch.show(fade)
      })
    }
    return fade>0
  }
  
  this.show=function(){
    fill(255,150*fade)
    noStroke()
    rectMode(CORNER)
    rect(0,y-s*0.35,width,s)
    charDataA.forEach(function(cd){
      // stroke(0,200,200)
      // noFill()
      // ellipse(cd.x,cd.y,5)
      // fill(0)
      // noStroke()
      // textAlign(CENTER,CENTER)
      // textSize(s*(frameCount%100)/100)
      // text(cd.c,cd.x+cd.w/2,cd.y)
    })
  }
}

function CharSpot(cData,yNom,s,life){
  let released=false
  let dy=yNom
  let vy=0
  let slow=0.93
  let settled=false
  let grow=0
  let growth=0.25
  let ttlMax=life
  let ttl=ttlMax
  let ttdMax=30
  let ttd=ttdMax
  
  this.release=function(){
    released=true
  }
  
  this.run=function(){
    if(released){
      if(settled){
        if(ttl>0){
          ttl--
        } else {
          if(ttd>0){
            ttd--
          }
        }
        grow+=(1-growth)/40
        grow*=slow
        growth+=grow
      } else {
        settled=(abs(0-dy)<1 && abs(vy)<2)
        vy+=(0-dy)/40
        vy*=slow
        dy+=vy
      }
    }
  }
  
  this.show=function(fade){
    
    if(true){
      fill(0,255*fade)
      noStroke()
      textAlign(CENTER,CENTER)
      textSize(s*0.9*growth*(ttd/ttdMax))
      text(cData.c,cData.x+cData.w/2,cData.y+dy)
    } else {
      // fill(100)
      // noStroke()
      // ellipse(cData.x+cData.w/2, cData.y+dy,5)
    }
  }
}