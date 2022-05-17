/**
 * Describes scene's plugin's context. Also helps manage them.
 */
class ContextManagementEngine {

  /**
   * Holds camera plugin. This camera plugin will manage the cameras state and switch between them.
   */
  #camera

  /**
   * Holds wireframe plugin. Toggles the preview of wireframes in all the created objects.
   */
  #wireframe

  /**
   * ContextManagementEngine class constructor.
   */
  constructor(scene) {
    this.#camera = new CameraPlugin(scene)
    this.#wireframe = new WireframePlugin()
  }

  /**
   * Gets currently being used camera in the scene.
   *
   * @return {THREE.Camera} camera
   */
  getCamera() {
    return this.#camera.getCurrentCamera()
  }

  /**
   * Updates currently being used camera.
   *
   * @param newCameraType type of the new camera
   */
  setCamera(newCameraType) {
    this.#camera.setCamera(newCameraType)
  }

  /**
   * Updates wireframe preview state.
   */
  toggleWireframe() {
    this.#wireframe.toggleState()
  }

  /**
   * If true, then the user just toggled the wireframe state, and it means that we should update the objects' state.
   *
   * @return {boolean} control value
   */
  getWireframeJustToggledControl() {
    return this.#wireframe.getWasToggled()
  }

  /**
   * Resets the toggled value and sets it to false.
   */
  resetWireframeJustToggledControl() {
    this.#wireframe.resetWasToggled()
  }

}
