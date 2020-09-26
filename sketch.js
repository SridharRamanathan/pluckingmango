const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var bodies = [];
let boy, boyimage;

function preload() {
	boyimage = loadImage("boy.png");
}

function setup() {
	createCanvas(1400, 700);

	engine = Engine.create();
	world = engine.world;



	//Create the Bodies Here.
	ground = new Ground(width / 2, height, width, 50);
	bodies.push(ground);



	tree = new Tree(width * 3 / 4, 400);
	bodies.push(tree);

	stone = new Stone(250, 600);
	bodies.push(stone);

	launcher = new Launcher(stone.body, { x: 250, y: 580 });
	bodies.push(launcher);

	mango1 = new Mango(800, 300);
	bodies.push(mango1);

	mango2 = new Mango(850, 370);
	bodies.push(mango2);

	mango3 = new Mango(925, 270);
	bodies.push(mango3);

	mango4 = new Mango(980, 330);
	bodies.push(mango4);

	mango5 = new Mango(1090, 220);
	bodies.push(mango5);

	mango6 = new Mango(1200, 380);
	bodies.push(mango6);

	Engine.run(engine);


}


function draw() {
	rectMode(CENTER);
	background("black");

	textSize(25);
	fill("white")
	text("drag to shoot", 200, height / 4);
	text("f to restart", 200, 200);



	for (let i = 0; i < bodies.length; i++) {
		bodies[i].display();
	}

	detectColission(stone, mango1);
	detectColission(stone, mango2);
	detectColission(stone, mango3);
	detectColission(stone, mango4);
	detectColission(stone, mango5);
	detectColission(stone, mango6);

	drawSprites();

	boy = createSprite(300, 575);
	boy.addImage("boy", boyimage);
	boy.scale = 0.1;
}


function keyPressed() {
	if (key == 'f') {
		Body.setPosition(stone.body, { x: 150, y: 560 });
		launcher.attach(stone.body);
	}
}


function mouseDragged() {
	if (launcher.constraint.bodyA)
		Body.setPosition(stone.body, { x: mouseX, y: mouseY });
}

function mouseReleased() {
	launcher.fly();
}

function detectColission(stone, mango) {
	let distance = dist(stone.body.position.x, stone.body.position.y, mango.body.position.x, mango.body.position.y);
	if (distance <= stone.radius + mango.radius) {
		Body.setStatic(mango.body, false);
	}
}