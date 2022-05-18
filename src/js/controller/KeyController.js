/**
 * Manages key pressing activities.
 */
class KeyController {

  /**
   * Set of boolean variables that tell us if a key was pressed.
   */
  #pressed1
  #pressed2
  #pressed3
  #pressed4

  /**
   * KeyController class constructor.
   */
  constructor() {
    this.#pressed1 = false
    this.#pressed2 = false
    this.#pressed3 = false
    this.#pressed4 = false
  }

  /**
   * On a key pressed, this callback is activated and the event of pressing that key is passed to this function.
   * We need to allow multiple keys to be pressed at the same time and thus, updating multiple behaviours.
   *
   * @param event key pressed event
   */
  onKeyPress = (event) => {
    'use strict'

    switch (event.keyCode) {
      case 49:  // key -> 1
        this.#pressed1 = true
        break
      case 50:  // key -> 2
        this.#pressed2 = true
        break
      case 51:  // key -> 3
        this.#pressed3 = true
        break
      case 52:  // key -> 4
        this.#pressed4 = true
        break
    }
  }

  /**
   * Analyses which keys where pressed and performs the requested actions for those keys.
   *
   * @param context {ContextManagementEngine}
   * @param scene 3.js scene object
   */
  processKeyPressed = (context, scene) => {
    'use strict'

    /* Changes camera angle */
    if (this.#pressed1) {
      context.setCamera(CameraPlugin.FRONTAL)
      this.#pressed1 = false
    }

    /* Changes camera angle */
    if (this.#pressed2) {
      context.setCamera(CameraPlugin.TOP)
      this.#pressed2 = false
    }

    /* Changes camera angle */
    if (this.#pressed3) {
      context.setCamera(CameraPlugin.SIDE)
      this.#pressed3 = false
    }

    /* Updates the wireframe preview state */
    if (this.#pressed4) {
      context.toggleWireframe(scene)
      this.#pressed4 = false
    }

  }

}
