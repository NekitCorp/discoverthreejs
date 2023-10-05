import { DirectionalLightHelper } from "three";
import { Birds } from "./components/birds";
import { Cube } from "./components/cube";
import { MeshGroup } from "./components/mesh-group";
import { Train } from "./components/train";
import {
    Camera,
    Controls,
    Lights,
    Loop,
    Renderer,
    Resizer,
    Scene,
    Stats,
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

        const stats = new Stats();
        container.appendChild(stats.dom);

        const train = new Train();
        const cube = new Cube();
        const meshGroup = new MeshGroup();

        this.loop.updatables.push(this.controls, train, cube, meshGroup, stats);

        this.scene.add(
            this.lights.hemisphereLight,
            new DirectionalLightHelper(this.lights.directionalLight),
            train,
            cube,
            meshGroup
        );

        new Resizer(container, this.camera, this.renderer);

        this.scene.add(createGridHelper());
    }

    public async init() {
        const { flamingo, parrot, stork } = await Birds.load();

        // move the target to the center of the front bird
        // this.controls.target.copy(parrot.position);

        this.loop.updatables.push(flamingo, parrot, stork);
        this.scene.add(flamingo, parrot, stork);

        const axes = await createAxesHelper();

        this.scene.add(axes);
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
