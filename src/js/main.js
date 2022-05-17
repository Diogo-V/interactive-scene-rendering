import ContextManagementEngine from "./context/ContextManagementEngine.js";
import CameraPlugin from "./context/CameraPlugin.js";


/**
 * Holds context object that allows us to control simple plugins (camera, wireframe, ...) that influence the state of
 * the scene.
 */
let context

let scene, renderer

let geometry, material, mesh

let ball

function addTableLeg(obj, x, y, z) {
  'use strict'

  geometry = new THREE.CubeGeometry(2, 6, 2)
  mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(x, y - 3, z)
  obj.add(mesh)
}

function addTableTop(obj, x, y, z) {
  'use strict'
  geometry = new THREE.CubeGeometry(60, 2, 20)
  mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(x, y, z)
  obj.add(mesh)
}

function createBall(x, y, z) {
  'use strict'

  ball = new THREE.Object3D()
  ball.userData = { jumping: true, step: 0 }

  material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
  geometry = new THREE.SphereGeometry(4, 10, 10)
  mesh = new THREE.Mesh(geometry, material)

  ball.add(mesh)
  ball.position.set(x, y, z)

  scene.add(ball)
}


function createTable(x, y, z) {
  'use strict'

  let table = new THREE.Object3D()

  material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

  addTableTop(table, 0, 0, 0)
  addTableLeg(table, -25, -1, -8)
  addTableLeg(table, -25, -1, 8)
  addTableLeg(table, 25, -1, 8)
  addTableLeg(table, 25, -1, -8)

  scene.add(table)

  table.position.x = x
  table.position.y = y
  table.position.z = z
}


/**
 * Creates scene and adds objects to it.
 */
function createScene() {
  'use strict'

  scene = new THREE.Scene()


  scene.add(new THREE.AxisHelper(10))

  //createTable(0, 8, 0)
  //createBall(0, 0, 15)
  buildScene()
}

function buildScene() {
  //Curved Tube
  class CustomSinCurve extends THREE.Curve {
    constructor(scale) {
      super();
      this.scale = scale;
    }
    getPoint(t) {
      const tx = t * 7.5 - 1.5;
      const ty = Math.sin(2 * Math.PI * t);
      const tz = 0;
      return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    }
  }
  
  let path = new CustomSinCurve(10);
  let tubularSegments = 20;  // ui: tubularSegments
  let radius = 2;  // ui: radius
  let radialSegments = 8;  // ui: radialSegments
  let closed = false;  // ui: closed
  let geometry = new THREE.TubeGeometry(
      path, tubularSegments, radius, radialSegments, closed);
  let material = new THREE.MeshBasicMaterial( { color: 0x40ffef } )
  let tube = new THREE.Mesh( geometry, material ) 
  tube.position.x=-115
  tube.position.y=50
  tube.position.z=-20
  scene.add(tube)

  //Big Central Donut
  radius = 90  // ui: radius
  let tubeRadius = 2  // ui: tubeRadius
  radialSegments = 16  // ui: radialSegments
  tubularSegments = 40  // ui: tubularSegments
  geometry = new THREE.TorusGeometry(
      radius, tubeRadius,
      radialSegments, tubularSegments)
  material = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
  let torus = new THREE.Mesh( geometry, material ) 
  torus.position.x=0
  torus.position.y=0
  torus.position.z=0
  scene.add(torus)

  //Big Central Pyramid
  radius = 50  // ui: radius
  let height = 100  // ui: height
  radialSegments = 4  // ui: radialSegments
  geometry = new THREE.ConeGeometry(radius, height, radialSegments)
  material = new THREE.MeshBasicMaterial( { color: 0x03fc20 } )
  let pyramid = new THREE.Mesh( geometry, material ) 
  pyramid.position.x=0
  pyramid.position.y=0
  pyramid.position.z=-150
  scene.add(pyramid)

  //Big Front Cube

  let width = 40;  // ui: width
  height = 40;  // ui: height
  let depth = 40;  // ui: depth
  let widthSegments = 4;  // ui: widthSegments
  let heightSegments = 4;  // ui: heightSegments
  let depthSegments = 4;  // ui: depthSegments
  geometry = new THREE.BoxGeometry(
      width, height, depth,
      widthSegments, heightSegments, depthSegments);
  material = new THREE.MeshBasicMaterial( { color: 0xfc3d03 } )
  let cube = new THREE.Mesh( geometry, material ) 
  cube.position.x=80
  cube.position.y=-60
  cube.position.z=80
  scene.add(cube)
 
  //Saturn
  radius = 24;  // ui: radius
  widthSegments = 12;  // ui: widthSegments
  heightSegments = 8;  // ui: heightSegments
  geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  material = new THREE.MeshBasicMaterial( { color: 0xf1c681 } )
  let saturn = new THREE.Mesh( geometry, material ) 
  saturn.position.x=-80
  saturn.position.y=-50
  saturn.position.z=40
  scene.add(saturn)

  radius = 26  // ui: radius
  tubeRadius = 2  // ui: tubeRadius
  radialSegments = 16  // ui: radialSegments
  tubularSegments = 24  // ui: tubularSegments
  geometry = new THREE.TorusGeometry(
      radius, tubeRadius,
      radialSegments, tubularSegments)
  material = new THREE.MeshBasicMaterial( { color: 0x94846c } )
  torus = new THREE.Mesh( geometry, material ) 
  torus.position.x=-80
  torus.position.y=-50
  torus.position.z=40
  torus.rotation.x = Math.PI / 2;
  scene.add(torus)

  //Right Side Ball
  radius = 15;  // ui: radius
  widthSegments = 12;  // ui: widthSegments
  heightSegments = 8;  // ui: heightSegments
  geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  material = new THREE.MeshBasicMaterial( { color: 0xfc03fc } )
  let ball = new THREE.Mesh( geometry, material ) 
  ball.position.x=130
  ball.position.y=20
  ball.position.z=60
  scene.add(ball)

   //Central Ball
   radius = 5;  // ui: radius
   widthSegments = 12;  // ui: widthSegments
   heightSegments = 8;  // ui: heightSegments
   geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
   material = new THREE.MeshBasicMaterial( { color: 0xbc40ff } )
   ball = new THREE.Mesh( geometry, material ) 
   ball.position.x=30
   ball.position.y=60
   ball.position.z=-170
   scene.add(ball)

  //Right Side Octahedron

  radius = 15;  // ui: radius
  geometry = new THREE.OctahedronGeometry(radius);
  material = new THREE.MeshBasicMaterial( { color: 0x3d03fc } )
  let octahedron = new THREE.Mesh( geometry, material ) 
  octahedron.position.x=75
  octahedron.position.y=50
  octahedron.position.z=-90
  scene.add(octahedron)

  //Triangular Prism
  let radiusTop = 10  // ui: radiusTop
  let radiusBottom = 10 // ui: radiusBottom
  height = 6;  // ui: height
  radialSegments = 3  // ui: radialSegments
  geometry = new THREE.CylinderGeometry(
    radiusTop, radiusBottom, height, radialSegments)
  material = new THREE.MeshBasicMaterial( { color: 0xff7340 } )
  let prism = new THREE.Mesh( geometry, material ) 
  prism.position.x=-110
  prism.position.y=80
  prism.position.z=85
  prism.rotation.x = Math.PI / 6
  prism.rotation.z = Math.PI / 2
  scene.add(prism)

  //Small Right Side Torus
  radius = 10 // ui: radius
  tubeRadius = 2.5  // ui: tubeRadius
  radialSegments = 16  // ui: radialSegments
  tubularSegments = 24  // ui: tubularSegments
  geometry = new THREE.TorusGeometry(
      radius, tubeRadius,
      radialSegments, tubularSegments)
  material = new THREE.MeshBasicMaterial( { color: 0x94846c } )
  torus = new THREE.Mesh( geometry, material ) 
  torus.position.x=87
  torus.position.y=-20
  torus.position.z=-20
  torus.rotation.x = Math.PI / 2;
  scene.add(torus)
}

/**
 * On a key pressed, this callback is activated and the event of pressing that key is passed to this function.
 * We need to allow multiple keys to be pressed at the same time and thus, updating multiple behaviours.
 *
 * @param event key pressed event
 */
function onKeyDown(event) {
  'use strict'

  switch (event.keyCode) {
    case 49:  // key -> 1
      context.setCamera(CameraPlugin.FRONTAL)
      break
    case 50:  // key -> 2
      context.setCamera(CameraPlugin.TOP)
      break
    case 51:  // key -> 3
      context.setCamera(CameraPlugin.SIDE)
      break
    case 52:  // key -> 4
      context.toggleWireframe()
      break
    case 83:  //S
    case 115: //s
      ball.userData.jumping = !ball.userData.jumping
      break
    case 69:  //E
    case 101: //e
      scene.traverse(function (node) {
        if (node instanceof THREE.AxisHelper) {
          node.visible = !node.visible
        }
      })
      break
  }
}


/**
 * Cleans previous scene from the UI and displays the new objects after they have been updated.
 */
function display() {
  'use strict'
  renderer.render(scene, context.getCamera())
}


/**
 * Defines the update life-cycle event. In this function, we update the state/position of each object in the scene
 * before they get 'displayed' in the UI again.
 */
function update() {

  // Updates ball state
  /*if (ball.userData.jumping) {  // TODO: mainly used for debug. Should be removed :)
    ball.userData.step += 0.04
    ball.position.y = Math.abs(30 * (Math.sin(ball.userData.step)))
    ball.position.z = 15 * (Math.cos(ball.userData.step))
  }*/

  /* Updates wireframe of all the objects in the scene */
  if (context.getWireframeJustToggledControl()) {
    scene.traverse(function (node) {
      if (node instanceof THREE.Mesh) {
        node.material.wireframe = !node.material.wireframe
      }
    })
    context.resetWireframeJustToggledControl()
  }

}


/**
 * Initializes main components such as the scene, render and camera.
 */
function init() {
  'use strict'
  
  /* Initializes component that will render 3.js objects in our scene (we set this to the max size of the screen) */
  renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  
  /* Initializes scene (where all the components are going to be put) and camera (component that is going to allow us
   * to 'observe' the scene */
  createScene()
  context = new ContextManagementEngine()

  /* Renders everything in the UI */
  display()
  
  /* Adds key handling method to the program. This will, latter on, allow us to rotate and change camera perspective
   * after a user input a key */
  window.addEventListener("keydown", onKeyDown)
}


/**
 * Main UI loop control function. Is executed 60 times per second to achieve 60 frames/s. We update and then display
 * all items in an infinite loop.
 */
function animate() {
  'use strict'

  /* Update + Display life cycle */
  update()
  display()

  /* Tells browser to call the animate function again after 1/60 seconds */
  requestAnimationFrame(animate)

}


/* Exports both main functions that are going to be used in our index.html */
export { init, animate, scene }
