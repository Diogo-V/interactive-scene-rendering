/**
 * Manages state of wireframe preview.
 */
class WireframePlugin {

  /**
   * WireframePlugin class constructor.
   */
  constructor() { }

  /**
   * Flips the current wireframe state.
   *
   * @param scene 3.js scene object
   */
  toggleState(scene) {

    /* Updates wireframe of all the objects in the scene */
    scene.traverse(function (node) {
      if (node instanceof THREE.Mesh) {
        node.material.wireframe = !node.material.wireframe
      }
    })

  }

}
