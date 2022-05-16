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
  //Big Central Donut
  let radius = 33  // ui: radius
  let tubeRadius = 0.5  // ui: tubeRadius
  let radialSegments = 16  // ui: radialSegments
  let tubularSegments = 24  // ui: tubularSegments
  let geometry = new THREE.TorusGeometry(
      radius, tubeRadius,
      radialSegments, tubularSegments)
  let material = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
  let torus = new THREE.Mesh( geometry, material ) 
  torus.position.x=0
  torus.position.y=0
  torus.position.z=0
  scene.add(torus)

  //Big Central Pyramid
  radius = 10  // ui: radius
  let height = 25  // ui: height
  radialSegments = 4  // ui: radialSegments
  geometry = new THREE.ConeGeometry(radius, height, radialSegments)
  material = new THREE.MeshBasicMaterial( { color: 0x03fc20 } )
  let pyramid = new THREE.Mesh( geometry, material ) 
  pyramid.position.x=0
  pyramid.position.y=0
  pyramid.position.z=-30
  scene.add(pyramid)

  //Big Front Cube

  let width = 4;  // ui: width
  height = 4;  // ui: height
  let depth = 4;  // ui: depth
  let widthSegments = 4;  // ui: widthSegments
  let heightSegments = 4;  // ui: heightSegments
  let depthSegments = 4;  // ui: depthSegments
  geometry = new THREE.BoxGeometry(
      width, height, depth,
      widthSegments, heightSegments, depthSegments);
  material = new THREE.MeshBasicMaterial( { color: 0xfc3d03 } )
  let cube = new THREE.Mesh( geometry, material ) 
  cube.position.x=10
  cube.position.y=-8
  cube.position.z=30
  scene.add(cube)
 
  //Saturn
  radius = 4;  // ui: radius
  widthSegments = 12;  // ui: widthSegments
  heightSegments = 8;  // ui: heightSegments
  geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  material = new THREE.MeshBasicMaterial( { color: 0xf1c681 } )
  let saturn = new THREE.Mesh( geometry, material ) 
  saturn.position.x=-10
  saturn.position.y=-10
  saturn.position.z=25
  scene.add(saturn)

  radius = 4.5  // ui: radius
  tubeRadius = 0.2  // ui: tubeRadius
  radialSegments = 16  // ui: radialSegments
  tubularSegments = 24  // ui: tubularSegments
  geometry = new THREE.TorusGeometry(
      radius, tubeRadius,
      radialSegments, tubularSegments)
  material = new THREE.MeshBasicMaterial( { color: 0x94846c } )
  torus = new THREE.Mesh( geometry, material ) 
  torus.position.x=-10
  torus.position.y=-10
  torus.position.z=25
  torus.rotation.x = Math.PI / 2;
  scene.add(torus)

  //Right Side Ball
  radius = 4;  // ui: radius
  widthSegments = 12;  // ui: widthSegments
  heightSegments = 8;  // ui: heightSegments
  geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  material = new THREE.MeshBasicMaterial( { color: 0xfc03fc } )
  let ball = new THREE.Mesh( geometry, material ) 
  ball.position.x=25
  ball.position.y=5
  ball.position.z=15
  scene.add(ball)

  //Right Side Octahedron

  radius = 5;  // ui: radius
  geometry = new THREE.OctahedronGeometry(radius);
  material = new THREE.MeshBasicMaterial( { color: 0x3d03fc } )
  let octahedron = new THREE.Mesh( geometry, material ) 
  octahedron.position.x=30
  octahedron.position.y=24
  octahedron.position.z=-10
  scene.add(octahedron)


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
