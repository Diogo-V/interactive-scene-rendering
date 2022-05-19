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

  #pressedUpArrow
  #pressedDownArrow
  #pressedLeftArrow
  #pressedRightArrow
  #pressedD
  #pressedC

  #pressedQ
  #pressedW
  #pressedA
  #pressedS
  #pressedZ
  #pressedX

  /**
   * KeyController class constructor.
   */
  constructor() {
    this.#pressed1 = false
    this.#pressed2 = false
    this.#pressed3 = false
    this.#pressed4 = false

    this.#pressedUpArrow = false
    this.#pressedDownArrow = false
    this.#pressedLeftArrow = false
    this.#pressedRightArrow = false
    this.#pressedD = false
    this.#pressedC = false

    this.#pressedQ = false
    this.#pressedW = false
    this.#pressedA = false
    this.#pressedS = false
    this.#pressedZ = false
    this.#pressedX = false
  }

  /**
   * On a key pressed, this callback is activated and the event of pressing that key is passed to this function.
   * We need to allow multiple keys to be pressed at the same time and thus, updating multiple behaviours.
   *
   * @param event key pressed event
   */
  onKeyPress = (event) => {
    'use strict'

    /* We need to use if's instead of switch case to allow for multiple keys pressing */
    if (event.keyCode === 49) this.#pressed1 = true
    if (event.keyCode === 50) this.#pressed2 = true
    if (event.keyCode === 51) this.#pressed3 = true
    if (event.keyCode === 52) this.#pressed4 = true

    if (event.keyCode === 38) this.#pressedUpArrow = true
    if (event.keyCode === 40) this.#pressedDownArrow = true
    if (event.keyCode === 37) this.#pressedLeftArrow = true
    if (event.keyCode === 39) this.#pressedRightArrow = true
    if (event.keyCode === 68) this.#pressedD = true
    if (event.keyCode === 67) this.#pressedC = true

    if (event.keyCode === 81) this.#pressedQ = true
    if (event.keyCode === 87) this.#pressedW = true
    if (event.keyCode === 65) this.#pressedA = true
    if (event.keyCode === 83) this.#pressedS = true
    if (event.keyCode === 90) this.#pressedZ = true
    if (event.keyCode === 88) this.#pressedX = true

  }

  /**
   * Analyses which keys where pressed and performs the requested actions for those keys.
   *
   * @param context {ContextManagementEngine}
   * @param scene 3.js scene object
   * @param compound {CompoundObject}
   * @param delta {number}
   */
  processKeyPressed = (context, scene, compound, delta) => {
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

    /* Moves articulated object up */
    if (this.#pressedUpArrow) {
      compound.move(Direction.UP, delta)
      this.#pressedUpArrow = false
    }

    /* Moves articulated object down */
    if (this.#pressedDownArrow) {
      compound.move(Direction.DOWN, delta)
      this.#pressedDownArrow = false
    }

    /* Moves articulated object to the left */
    if (this.#pressedLeftArrow) {
      compound.move(Direction.LEFT, delta)
      this.#pressedLeftArrow = false
    }

    /* Moves articulated object to the right */
    if (this.#pressedRightArrow) {
      compound.move(Direction.RIGHT, delta)
      this.#pressedRightArrow = false
    }

    /* Moves articulated object backwards */
    if (this.#pressedD) {
      compound.move(Direction.BACKWARDS, delta)
      this.#pressedD = false
    }

    /* Moves articulated object forward */
    if (this.#pressedC) {
      compound.move(Direction.FORWARD, delta)
      this.#pressedC = false
    }

    /* Rotates articulated object to the left */
    if (this.#pressedQ) {
      compound.rotate(Rank.PRIMARY, Side.LEFT, delta)
      this.#pressedQ = false
    }

    /* Rotates articulated object to the right */
    if (this.#pressedW) {
      compound.rotate(Rank.PRIMARY, Side.RIGHT, delta)
      this.#pressedW = false
    }

    /* Rotates secondary articulated object to the left */
    if (this.#pressedA) {
      compound.rotate(Rank.SECONDARY, Side.LEFT, delta)
      this.#pressedA = false
    }

    /* Rotates secondary articulated object to the right */
    if (this.#pressedS) {
      compound.rotate(Rank.SECONDARY, Side.RIGHT, delta)
      this.#pressedS = false
    }

    /* Rotates tertiary articulated object to the left */
    if (this.#pressedZ) {
      compound.rotate(Rank.TERTIARY, Side.LEFT, delta)
      this.#pressedZ = false
    }

    /* Rotates tertiary articulated object to the right */
    if (this.#pressedX) {
      compound.rotate(Rank.TERTIARY, Side.RIGHT, delta)
      this.#pressedX = false
    }

  }

}
