import { BoxGeometry, MathUtils, Mesh, MeshStandardMaterial, TextureLoader } from "three";

const radiansPerSecond = MathUtils.degToRad(30);

export class Cube extends Mesh implements IUpdatable {
    constructor() {
        super(new BoxGeometry(2, 2, 2), Cube.createMaterial());

        this.position.set(4, 0, 4);
        this.rotation.set(-0.5, -0.1, 0.8);
    }

    public tick(delta: number) {
        this.rotation.z += radiansPerSecond * delta;
        this.rotation.x += radiansPerSecond * delta;
        this.rotation.y += radiansPerSecond * delta;
    }

    private static createMaterial() {
        const textureLoader = new TextureLoader();
        const texture = textureLoader.load("/uv-test-col.png");

        const material = new MeshStandardMaterial({ map: texture });

        return material;
    }
}
