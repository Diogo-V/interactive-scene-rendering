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
