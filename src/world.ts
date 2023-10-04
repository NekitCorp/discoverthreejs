import { Birds } from "./components/birds";
import {
    Camera,
    Controls,
    Lights,
    Loop,
    Renderer,
    Resizer,
    Scene,
    createAxesHelper,
    createGridHelper,
} from "./systems";

export class World {
    private readonly renderer = new Renderer();
    private readonly camera = new Camera();
    private readonly scene = new Scene("skyblue");
    private readonly loop = new Loop(this.camera, this.scene, this.renderer);
    private readonly controls = new Controls(this.camera, this.renderer.domElement);
    private readonly lights = new Lights();

    constructor(container: Element) {
        container.append(this.renderer.domElement);

        // const train = new Train();

        this.loop.updatables.push(this.controls);
        // this.loop.updatables.push(train);

        this.scene.add(this.lights.hemisphereLight, this.lights.directionalLight);

        new Resizer(container, this.camera, this.renderer);

        this.scene.add(createAxesHelper(), createGridHelper());
    }

    public async init() {
        const { flamingo, parrot, stork } = await Birds.load();

        // move the target to the center of the front bird
        this.controls.target.copy(parrot.position);

        this.scene.add(flamingo, parrot, stork);
    }

    public render() {
        this.renderer.render(this.scene, this.camera);
    }

    public start() {
        this.loop.start();
    }

    public stop() {
        this.loop.stop();
    }
}
