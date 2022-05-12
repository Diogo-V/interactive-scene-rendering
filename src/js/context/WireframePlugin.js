/**
 * Manages state of wireframe preview.
 */
export default class WireframePlugin {

  /**
   * Tells us if the wireframe is currently being shown or not.
   */
  #isShown

  /**
   * Tells us if the user toggled the wireframe preview in this current iteration of the event loop.
   */
  #wasJustToggled

  /**
   * WireframePlugin class constructor.
   */
  constructor() {
    this.#isShown = false
    this.#wasJustToggled = false
  }

  /**
   * Gets justToggled status.
   *
   * @return {boolean} if true then it was toggled in the last iteration of the event loop
   */
  getWasToggled() {
    return this.#wasJustToggled
  }

  /**
   * Flips the current wireframe state.
   */
  toggleState() {
    this.#isShown = !this.#isShown
    this.#wasJustToggled = true
  }

  /**
   * Clears previous control variable value.
   */
  resetWasToggled() {
    this.#wasJustToggled = false
  }

}
