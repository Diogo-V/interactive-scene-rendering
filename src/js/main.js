class Main {

  /**
   * Holds scene (where all the components are going to be put).
   */
  #scene

  /**
   * Holds context object that allows us to control simple plugins (camera, wireframe, ...) that influence the state of
   * the scene.
   */
  #context

  /**
   * Component that will render 3.js objects in our scene (we set this to the max size of the screen).
   */
  #renderer

  /**
   * Plugin that will control the key pressing.
   */
  #controller

  /**
   * Holds articulated object.
   */
  #compound

  /**
   * Holds clock value and determines delta time. This allows for pcs with lower fps to still get a good image.
   */
  #clock

  /**
   * Main class constructor.
   */
  constructor() {

    /* Builds components required to manage, control and display our scene */
    this.#renderer = Main.#initRenderer()
    this.#compound = new CompoundObject()
    this.#scene = this.#initScene()
    this.#context = new ContextManagementEngine(this.getScene())
    this.#controller = new KeyController()
    this.#clock = new THREE.Clock(true)

    /* Renders everything in the UI */
    this.#display()

    /* Adds key handling method to the program. This will, latter on, allow us to rotate and change camera perspective
     * after a user input a key */
    window.addEventListener("keydown", function(event) {
      this.getController().onKeyPress(event)
    }.bind(this))

  }

  /**
   * Creates scene and adds objects to it.
   */
  #initScene() {
    'use strict'

    /* Creates scene  */
    let scene = new THREE.Scene()

    /* Adds rest of objects to the scene */
    this.#buildScene(scene)

    return scene
  }

  /**
   * Initializes component that will render 3.js objects in our scene.
   *
   * @return {THREE.WebGLRenderer}
   */
  static #initRenderer() {
    'use strict'

    /*  (we set this to the max size of the screen) */
    let renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    return renderer
  }

  /**
   * Returns scene object (holds all other objects in the screen).
   *
   * @return {THREE.Scene}
   */
  getScene() { return this.#scene }

  /**
   * Returns compound object.
   *
   * @return {CompoundObject}
   */
  getCompound() { return this.#compound }

  /**
   * Returns context.
   *
   * @return {ContextManagementEngine}
   */
  getContext() { return this.#context }

  /**
   * Returns WebGL renderer.
   *
   * @return {THREE.WebGLRenderer}
   */
  getRenderer() { return this.#renderer }

  /**
   * Returns three.js clock.
   *
   * @return {THREE.Clock}
   */
  getClock() { return this.#clock }

  /**
   * Returns key pressing controller.
   *
   * @return {KeyController}
   */
  getController() { return this.#controller }

  /**
   * Adds objects to the scene.
   */
  #buildScene = (scene) => {
    'use strict'

    //Curved Tube
    class CustomSinCurve extends THREE.Curve {
      constructor(scale) {
        super()
        this.scale = scale
      }
      getPoint(t) {
        const tx = t * 7.5 - 1.5
        const ty = Math.sin(2 * Math.PI * t)
        const tz = 0
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale)
      }
    }

    // Left "S"
    let path = new CustomSinCurve(10)
    let tubularSegments = 20  // ui: tubularSegments
    let radius = 1  // ui: radius
    let radialSegments = 8  // ui: radialSegments
    let closed = false  // ui: closed
    let geometry = new THREE.TubeGeometry(
      path, tubularSegments, radius, radialSegments, closed)
    let material = new THREE.MeshBasicMaterial( { color: 0x40ffef } )
    let tube = new THREE.Mesh( geometry, material )
    tube.position.x = -95
    tube.position.y = 65
    tube.position.z = -25
    scene.add(tube)

    // Big Central Donut *
    radius = 90  // ui: radius
    let tubeRadius = 1  // ui: tubeRadius
    radialSegments = 16  // ui: radialSegments
    tubularSegments = 40  // ui: tubularSegments
    geometry = new THREE.TorusGeometry(
      radius, tubeRadius,
      radialSegments, tubularSegments)
    material = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
    let torus = new THREE.Mesh( geometry, material )
    torus.position.x = 0
    torus.position.y = 0
    torus.position.z = 0
    scene.add(torus)

    // Big Central Pyramid
    radius = 40  // ui: radius
    let height = 105  // ui: height
    radialSegments = 4  // ui: radialSegments
    geometry = new THREE.ConeGeometry(radius, height, radialSegments)
    material = new THREE.MeshBasicMaterial( { color: 0x03fc20 } )
    let pyramid = new THREE.Mesh( geometry, material )
    pyramid.position.x = 0
    pyramid.position.y = 0
    pyramid.position.z = -140
    scene.add(pyramid)

    // Big Front Cube *
    let width = 50  // ui: width
    height = 50  // ui: height
    let depth = 50  // ui: depth
    let widthSegments = 4  // ui: widthSegments
    let heightSegments = 4 // ui: heightSegments
    let depthSegments = 4  // ui: depthSegments
    geometry = new THREE.BoxGeometry(
      width, height, depth,
      widthSegments, heightSegments, depthSegments)
    material = new THREE.MeshBasicMaterial( { color: 0xfc3d03 } )
    let cube = new THREE.Mesh( geometry, material )
    cube.position.x = 51.5
    cube.position.y = -75
    cube.position.z = 75
    scene.add(cube)

    // Saturn *
    radius = 24  // ui: radius
    widthSegments = 12  // ui: widthSegments
    heightSegments = 8  // ui: heightSegments
    geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
    material = new THREE.MeshBasicMaterial( { color: 0xf1c681 } )
    let saturn = new THREE.Mesh( geometry, material )
    saturn.position.x = -90
    saturn.position.y = -50
    saturn.position.z = 35
    scene.add(saturn)

    radius = 26  // ui: radius
    tubeRadius = 1  // ui: tubeRadius
    radialSegments = 16  // ui: radialSegments
    tubularSegments = 24  // ui: tubularSegments
    geometry = new THREE.TorusGeometry(
      radius, tubeRadius,
      radialSegments, tubularSegments)
    material = new THREE.MeshBasicMaterial( { color: 0x94846c } )
    torus = new THREE.Mesh( geometry, material )
    torus.position.x = -90
    torus.position.y = -50
    torus.position.z = 35
    torus.rotation.x = Math.PI / 2
    scene.add(torus)

    // Right Side Ball *
    radius = 15  // ui: radius
    widthSegments = 12  // ui: widthSegments
    heightSegments = 8  // ui: heightSegments
    geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
    material = new THREE.MeshBasicMaterial( { color: 0xfc03fc } )
    let ball = new THREE.Mesh( geometry, material )
    ball.position.x = 125
    ball.position.y = 10
    ball.position.z = 60
    scene.add(ball)

    // Central Ball *
    radius = 5  // ui: radius
    widthSegments = 12  // ui: widthSegments
    heightSegments = 8 // ui: heightSegments
    geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
    material = new THREE.MeshBasicMaterial( { color: 0xbc40ff } )
    ball = new THREE.Mesh( geometry, material )
    ball.position.x = 30
    ball.position.y = 70
    ball.position.z = -180
    scene.add(ball)

    // Right Side Octahedron *
    radius = 10  // ui: radius
    geometry = new THREE.OctahedronGeometry(radius)
    material = new THREE.MeshBasicMaterial( { color: 0x3d03fc } )
    let octahedron = new THREE.Mesh( geometry, material )
    octahedron.position.x = 70
    octahedron.position.y = 50
    octahedron.position.z = -85
    scene.add(octahedron)

    // Triangular Prism
    let radiusTop = 10  // ui: radiusTop
    let radiusBottom = 10 // ui: radiusBottom
    height = 6  // ui: height
    radialSegments = 3  // ui: radialSegments
    geometry = new THREE.CylinderGeometry(
      radiusTop, radiusBottom, height, radialSegments)
    material = new THREE.MeshBasicMaterial( { color: 0xff7340 } )
    let prism = new THREE.Mesh( geometry, material )
    prism.position.x = -115
    prism.position.y = 85
    prism.position.z = 85
    prism.rotation.x = Math.PI / 6
    prism.rotation.z = Math.PI / 2
    scene.add(prism)

    // Small Right Side Torus *
    radius = 10 // ui: radius
    tubeRadius = 2.5  // ui: tubeRadius
    radialSegments = 16  // ui: radialSegments
    tubularSegments = 24  // ui: tubularSegments
    geometry = new THREE.TorusGeometry(
      radius, tubeRadius,
      radialSegments, tubularSegments)
    material = new THREE.MeshBasicMaterial( { color: 0x94846c } )
    torus = new THREE.Mesh( geometry, material )
    torus.position.x= 80
    torus.position.y= -27.5
    torus.position.z= -15
    torus.rotation.x = Math.PI / 2
    scene.add(torus)

    // TODO: start -> THREE OBJECTS TO MOVE

    let cubesGroup = new THREE.Group()

    // Cube on Cube
    width = 4  // ui: width
    height = 4  // ui: height
    depth = 4  // ui: depth
    widthSegments = 5  // ui: widthSegments
    heightSegments = 5  // ui: heightSegments
    depthSegments = 5  // ui: depthSegments
    geometry = new THREE.BoxGeometry(
      width, height, depth,
      widthSegments, heightSegments, depthSegments)
    material = new THREE.MeshBasicMaterial( { color: 0xfc9803 } )
    cube = new THREE.Mesh( geometry, material )
    cube.position.x = 0
    cube.position.y = -18
    cube.position.z = -45
    cubesGroup.add(cube)

    width = 20  // ui: width
    height = 4  // ui: height
    depth = 20 // ui: depth
    widthSegments = 3  // ui: widthSegments
    heightSegments = 3  // ui: heightSegments
    depthSegments = 3 // ui: depthSegments
    geometry = new THREE.BoxGeometry(
      width, height, depth,
      widthSegments, heightSegments, depthSegments)
    material = new THREE.MeshBasicMaterial( { color: 0xfc9803 } )
    cube = new THREE.Mesh( geometry, material )
    cube.position.x = 0
    cube.position.y = -22
    cube.position.z = -45
    cubesGroup.add(cube)

    this.getCompound().setPrimary(cubesGroup)

    // Cone
    radius = 5  // ui: radius
    height = 10  // ui: height
    radialSegments = 30  // ui: radialSegments
    geometry = new THREE.ConeGeometry(radius, height, radialSegments)
    material = new THREE.MeshBasicMaterial( { color: 0xfc03e3 } )
    let cone = new THREE.Mesh( geometry, material )
    cone.position.x = 0
    cone.position.y = 5
    cone.position.z = -45
    cone.rotation.x = Math.PI
    this.getCompound().setSecondary(cone)

    // Curved Tube
    class CustomSinCurve2 extends THREE.Curve {
      constructor(scale) {
        super()
        this.scale = scale
      }
      getPoint(t) {
        const tx = t * 3
        const ty = Math.sin(Math.PI * t)
        const tz = 0
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale)
      }
    }

    path = new CustomSinCurve2(5)
    tubularSegments = 20  // ui: tubularSegments
    radius = 1  // ui: radius
    radialSegments = 8  // ui: radialSegments
    closed = false  // ui: closed
    geometry = new THREE.TubeGeometry(
      path, tubularSegments, radius, radialSegments, closed)
    material = new THREE.MeshBasicMaterial( { color: 0xe3274f } )
    tube = new THREE.Mesh( geometry, material )
    tube.position.x = -45
    tube.position.y = 0
    tube.position.z = -45
    tube.rotation.z = Math.PI/5
    this.getCompound().setTertiary(tube)

    scene.add(this.getCompound().getGroup())

    // TODO: end -> objects to move

  }

  /**
   * Cleans previous scene from the UI and displays the new objects after they have been updated.
   */
  #display = () => {
    'use strict'
    this.getRenderer().render(this.getScene(), this.getContext().getCamera())
  }

  /**
   * Defines the update life-cycle event. In this function, we update the state/position of each object in the scene
   * before they get 'displayed' in the UI again.
   */
  #update = () => {

    /* Gets the elapsed time from the previous frame. This makes fps smoother in lower end pc's */
    let delta = this.getClock().getDelta()

    /* Prompts key controller to check which keys were pressed and to delegate actions to the various components */
    this.getController().processKeyPressed(this.getContext(), this.getScene(), this.getCompound(), delta)

  }

  /**
   * Main UI loop control function. Is executed 60 times per second to achieve 60 frames/s. We update and then display
   * all items in an infinite loop.
   */
  animate = () => {
    'use strict'

    /* Update + Display life cycle */
    this.#update()
    this.#display()

    /* Tells browser to call the animate function again after 1/60 seconds */
    requestAnimationFrame(this.animate)
  }

}
