import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";

export class Loop {
    public updatables: IUpdatable[] = [];
    private clock = new Clock();

    constructor(private camera: PerspectiveCamera, private scene: Scene, private renderer: WebGLRenderer) {}

    public start() {
        this.renderer.setAnimationLoop(() => {
            const delta = this.clock.getDelta();
            this.tick(delta);
            this.renderer.render(this.scene, this.camera);
        });
    }

    public stop() {
        this.renderer.setAnimationLoop(null);
    }

    public tick(delta: number) {
        for (const object of this.updatables) {
            object.tick(delta);
        }
    }
}
