class CompoundObject {

  /**
   * Holds main object of this composition.
   */
  #primary

  /**
   * Holds secondary object of this composition.
   */
  #secondary

  /**
   * Holds tertiary object of this composition.
   */
  #tertiary

  /**
   * Three.js group object that is going to be added to the scene.
   */
  #group

  /**
   * CompoundObject class constructor.
   */
  constructor() {
    this.#group = new THREE.Group()
  }

  /**
   * Sets primary object.
   *
   * @param primary {THREE.Mesh}
   */
  setPrimary(primary) {
    this.getGroup().add(primary)
    this.#primary = primary
  }

  /**
   * Sets secondary object.
   *
   * @param secondary {THREE.Mesh}
   */
  setSecondary(secondary) {
    this.getGroup().add(secondary)
    this.#secondary = secondary
  }

  /**
   * Sets tertiary object.
   *
   * @param tertiary {THREE.Mesh}
   */
  setTertiary(tertiary) {
    this.getGroup().add(tertiary)
    this.#tertiary = tertiary
  }

  /**
   * Gets primary object.
   *
   * @return {THREE.Mesh}
   */
  getPrimary() { return this.#primary }

  /**
   * Gets secondary object.
   *
   * @return {THREE.Mesh}
   */
  getSecondary() { return this.#secondary }

  /**
   * Gets tertiary object.
   *
   * @return {THREE.Mesh}
   */
  getTertiary() { return this.#tertiary }

  /**
   * Gets scene group.
   *
   * @return {THREE.Group}
   */
  getGroup() { return this.#group }

  /**
   * Moves articulated object in input direction by changing the position values of the group.
   *
   * @param direction {Direction}
   */
  move(direction) {
    switch (direction) {
      case Direction.UP:
        this.getGroup().position.y += __MOVE_STEP
        break
      case Direction.DOWN:
        this.getGroup().position.y -= __MOVE_STEP
        break
      case Direction.LEFT:
        this.getGroup().position.x -= __MOVE_STEP
        break
      case Direction.RIGHT:
        this.getGroup().position.x += __MOVE_STEP
        break
      case Direction.FORWARD:
        this.getGroup().position.z += __MOVE_STEP
        break
      case Direction.BACKWARDS:
        this.getGroup().position.z -= __MOVE_STEP
        break
    }
  }

}

const __MOVE_STEP = 1
