import { DirectionalLight, HemisphereLight } from "three";

export class Lights {
    public readonly directionalLight: DirectionalLight;
    public readonly hemisphereLight: HemisphereLight;

    constructor() {
        this.directionalLight = new DirectionalLight("white", 8);
        this.directionalLight.position.set(10, 10, 10);

        this.hemisphereLight = new HemisphereLight("white", "darkslategray", 10);
    }
}
