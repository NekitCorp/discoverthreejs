import { Color, ColorRepresentation, Scene as SceneThree } from "three";

export class Scene extends SceneThree {
    constructor(color: ColorRepresentation) {
        super();
        this.background = new Color(color);

        // Material check.
        // https://discoverthreejs.com/tips-and-tricks/#material-check
        // this.overrideMaterial = new MeshBasicMaterial({ color: "green" });
    }
}
