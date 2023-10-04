import { Color, ColorRepresentation, Scene as SceneThree } from "three";

export class Scene extends SceneThree {
    constructor(color: ColorRepresentation) {
        super();
        this.background = new Color(color);
    }
}
