import { Group, MathUtils, Mesh, MeshStandardMaterial, SphereGeometry } from "three";

export class MeshGroup extends Group implements IUpdatable {
    private radiansPerSecond = MathUtils.degToRad(30);
    private subGroup1 = new Group();
    private subGroup2 = new Group();

    constructor() {
        super();

        const protoSphere = new Mesh(
            new SphereGeometry(0.25, 16, 16),
            new MeshStandardMaterial({ color: "indigo" })
        );

        this.add(protoSphere);
        this.add(this.subGroup1);
        this.add(this.subGroup2);

        for (let i = 0; i < 1; i += 0.05) {
            const sphere = protoSphere.clone();

            // position the spheres on around a circle
            sphere.position.x = Math.cos(2 * Math.PI * i);
            sphere.position.y = Math.sin(2 * Math.PI * i);

            sphere.scale.multiplyScalar(0.01 + i);

            this.subGroup1.add(sphere);
        }

        for (let i = 0; i < 1; i += 0.05) {
            const sphere = protoSphere.clone();

            // position the spheres on around a circle
            sphere.position.x = Math.cos(2 * Math.PI * i);
            sphere.position.z = Math.sin(2 * Math.PI * i);

            sphere.scale.multiplyScalar(0.01 + i);

            this.subGroup2.add(sphere);
        }

        // every sphere inside the group will be scaled
        this.scale.multiplyScalar(2);
        this.position.set(-4, 0, 4);
    }

    public tick(delta: number) {
        this.subGroup1.rotation.z -= delta * this.radiansPerSecond;
        this.subGroup2.rotation.y += delta * this.radiansPerSecond;
    }
}
