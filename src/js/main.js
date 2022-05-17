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
   * Main class constructor.
   */
  constructor() {

    /* Builds components required to manage, control and display our scene */
    this.#renderer = Main.#initRenderer()
    this.#scene = this.#initScene()
    this.#context = new ContextManagementEngine(this.getScene())

    /* Renders everything in the UI */
    this.#display()

    /* Adds key handling method to the program. This will, latter on, allow us to rotate and change camera perspective
     * after a user input a key */
    window.addEventListener("keydown", this.#onKeyDown)

  }

  /**
   * Creates scene and adds objects to it.
   */
  #initScene() {
    'use strict'

    /* Creates scene  */
    let scene = new THREE.Scene()

    /* TODO: debug object */
    scene.add(new THREE.AxisHelper(10))

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
   * Returns key pressing controller.
   *
   * @return {Controller}
   */
  getController() { return this.#controller }

  /**
   * On a key pressed, this callback is activated and the event of pressing that key is passed to this function.
   * We need to allow multiple keys to be pressed at the same time and thus, updating multiple behaviours.
   *
   * @param event key pressed event
   */
  #onKeyDown(event) {
    'use strict'

    switch (event.keyCode) {
      case 49:  // key -> 1
        this.getContext().setCamera(CameraPlugin.FRONTAL)
        break
      case 50:  // key -> 2
        this.getContext().setCamera(CameraPlugin.TOP)
        break
      case 51:  // key -> 3
        this.getContext().setCamera(CameraPlugin.SIDE)
        break
      case 52:  // key -> 4
        this.getContext().toggleWireframe()
        break
      case 69:  //E
      case 101: //e
        this.getScene().traverse(function (node) {
          if (node instanceof THREE.AxisHelper) {
            node.visible = !node.visible
          }
        })
        break
    }
  }

  /**
   * Adds objects to the scene.
   */
  #buildScene(scene) {
    'use strict'

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
   * Cleans previous scene from the UI and displays the new objects after they have been updated.
   */
  #display() {
    'use strict'
    this.getRenderer().render(this.getScene(), this.getContext().getCamera())
  }

  /**
   * Defines the update life-cycle event. In this function, we update the state/position of each object in the scene
   * before they get 'displayed' in the UI again.
   */
  #update() {

    /* Updates wireframe of all the objects in the scene */
    if (this.getContext().getWireframeJustToggledControl()) {
      this.getScene().traverse(function (node) {
        if (node instanceof THREE.Mesh) {
          node.material.wireframe = !node.material.wireframe
        }
      })
      this.getContext().resetWireframeJustToggledControl()
    }

  }

  /**
   * Main UI loop control function. Is executed 60 times per second to achieve 60 frames/s. We update and then display
   * all items in an infinite loop.
   */
  animate() {
    'use strict'

    /* Update + Display life cycle */
    this.#update()
    this.#display()

    /* Tells browser to call the animate function again after 1/60 seconds */
    requestAnimationFrame(this.animate)
  }

}
