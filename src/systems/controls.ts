import { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class Controls extends OrbitControls implements IUpdatable {
    constructor(camera: Camera, canvas: HTMLElement) {
        super(camera, canvas);

        this.enableDamping = true;
        // this.autoRotate = true;
        // this.autoRotateSpeed = 1;
        // this.minDistance = 5;
        // this.maxDistance = 20;
    }

    public tick() {
        this.update();
    }
}
