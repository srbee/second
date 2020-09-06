let figure1
let figure2
let old
let zslider
let fslider
let zeta
function preload(){
  
  //figure1=loadImage("fig1.jpg")
  //figure2=loadImage("fig2.jpg")
  
}//end of function preload()
 

function setup() {
  
  w = displayWidth
  h = displayHeight 
  createCanvas(w,h);
  strokeWeight(1)
  textSize(16)
  textFont('Helvetica')
  textStyle(NORMAL)
  background('yellow')
  stroke('red')
  strokeWeight(1)
  t=0
  mySlider()
  zslider.changed(myrefresh)
  fslider.changed(myrefresh)
  drawCoods()
  
}

function myrefresh(){
  background("yellow")
  t=0
   
 }


function drawCoods()
{
 
  translate(w/500,height/2)
  yy=-68
  line(-width,yy,width,yy);//Xcood
  line(0,-height,0,height);//Ycood
  //text('Tran Resp of 2nd Order Syst to Step Input',width/5,-height/2.2)
}

function mySlider()
{
  zslider = createSlider(0, 1, .11,0.11);
  zslider.position(w/30, h/10);
  zslider.style('width', '80px');
  fslider = createSlider(1, 10, 9,1);
  fslider.position(w/6, h/10);
  fslider.style('width', '80px');
}

 



function draw() {
  //image(figure1,10,340,400,350)
  //image(figure2,400,340,700,350)
  drawCoods()
  zeta=zslider.value()
  f=fslider.value()
  zetaSq=zeta*zeta
  
  sampFactor=200;
  tStep=1/(sampFactor*f)
  
  wn=2*PI*f
  wnSq=wn*wn
  wd=wn*(sqrt(1-zetaSq))
  A=wn/wd
  t=t+tStep
  //print(t*1000)
  
  B=exp(-1*zeta*wn*t)
  phi=acos(zeta)
  y=(1-A*B*sin(wd*t+phi))*100
  circle(t*1000,-y-70,15);//transient response
  push()
   stroke('blue')
   circle(t*1000,-100-70,1);//input step
  
  pop()
  text("Damping fact = "+zeta,w/30,-height/2.45)
 text("Nat freq = "+f+" Hz",w/6,-height/2.45)
  push();
   stroke('yellow')
  text('- time -> ',t*1000,-64)
  text('_| step input -> ',t*1000,-174)
  push();stroke('acqua')
  textSize(10)
  text('out',t*1000,1.0*(-y-70))
  pop()
  pop()
  push();textSize(20);stroke('acqua')
 text('Transient Response of 2nd Order System to Step Input',w/30,-h/2.15)
  pop()
  old=-y
 
  if ((t*1000) > 600) { myrefresh() }
}//end of function draw()
