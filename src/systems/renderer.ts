import { WebGLRenderer } from "three";

export class Renderer extends WebGLRenderer {
    constructor() {
        super({ antialias: true });
    }
}
