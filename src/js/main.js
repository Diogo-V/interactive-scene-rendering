import ContextManagementEngine from "./context/ContextManagementEngine.js";
import CameraPlugin from "./context/CameraPlugin.js";

let scene, renderer

let context

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

  createTable(0, 8, 0)
  createBall(0, 0, 15)
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
  if (ball.userData.jumping) {  // TODO: mainly used for debug. Should be removed :)
    ball.userData.step += 0.04
    ball.position.y = Math.abs(30 * (Math.sin(ball.userData.step)))
    ball.position.z = 15 * (Math.cos(ball.userData.step))
  }

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
