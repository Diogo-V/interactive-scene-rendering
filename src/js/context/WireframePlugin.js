/**
 * Manages state of wireframe preview.
 */
export default class WireframePlugin {

  /**
   * Tells us if the wireframe is currently being shown or not.
   */
  #isShown

  /**
   * WireframePlugin class constructor.
   */
  constructor() {
    this.#isShown = false
  }

  /**
   * Gets current show state.
   *
   * @return {boolean} preview state
   */
  getState() {
    return this.#isShown
  }

  /**
   * Flips the current wireframe state.
   */
  toggleState() {
    this.#isShown = !this.#isShown
  }

}
