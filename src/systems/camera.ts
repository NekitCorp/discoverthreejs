import { PerspectiveCamera } from "three";

const METERS_PER_SECOND = 2;
const MIN_ZOOM = 5;
const MAX_ZOOM = 20;

export class Camera extends PerspectiveCamera implements IUpdatable {
    private zoomDirection: 1 | -1 = 1;

    constructor() {
        super(35, 1, 0.1, 100);

        this.position.set(-1.5, 1.5, 6.5);
    }

    public tick(delta: number) {
        if (this.position.z >= MAX_ZOOM) {
            this.zoomDirection = -1;
        }
        if (this.position.z <= MIN_ZOOM) {
            this.zoomDirection = 1;
        }

        this.position.z += this.zoomDirection * METERS_PER_SECOND * delta;
    }
}
