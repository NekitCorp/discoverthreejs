import { BoxGeometry, CylinderGeometry, Group, MathUtils, Mesh, MeshStandardMaterial } from "three";

type Meshes = {
    nose: Mesh;
    cabin: Mesh;
    chimney: Mesh;
    smallWheelRear: Mesh;
    smallWheelCenter: Mesh;
    smallWheelFront: Mesh;
    bigWheel: Mesh;
};

export class Train extends Group implements IUpdatable {
    private readonly wheelSpeed = MathUtils.degToRad(24);
    private meshes: Meshes;

    constructor() {
        super();

        this.meshes = this.createMeshes();

        this.add(
            this.meshes.nose,
            this.meshes.cabin,
            this.meshes.chimney,
            this.meshes.smallWheelRear,
            this.meshes.smallWheelCenter,
            this.meshes.smallWheelFront,
            this.meshes.bigWheel
        );

        this.position.set(2, 0, -4);
    }

    public tick(delta: number) {
        this.meshes.bigWheel.rotation.y += this.wheelSpeed * delta;
        this.meshes.smallWheelRear.rotation.y += this.wheelSpeed * delta;
        this.meshes.smallWheelCenter.rotation.y += this.wheelSpeed * delta;
        this.meshes.smallWheelFront.rotation.y += this.wheelSpeed * delta;
    }

    private createMeshes(): Meshes {
        const geometries = this.createGeometries();
        const materials = this.createMaterials();

        const cabin = new Mesh(geometries.cabin, materials.body);
        cabin.position.set(1.5, 1.4, 0);

        const chimney = new Mesh(geometries.chimney, materials.detail);
        chimney.position.set(-2, 1.9, 0);

        const nose = new Mesh(geometries.nose, materials.body);
        nose.position.set(-1, 1, 0);
        nose.rotation.z = Math.PI / 2;

        const smallWheelRear = new Mesh(geometries.wheel, materials.detail);
        smallWheelRear.position.y = 0.5;
        smallWheelRear.rotation.x = Math.PI / 2;

        const smallWheelCenter = smallWheelRear.clone();
        smallWheelCenter.position.x = -1;

        const smallWheelFront = smallWheelRear.clone();
        smallWheelFront.position.x = -2;

        const bigWheel = smallWheelRear.clone();
        bigWheel.position.set(1.5, 0.9, 0);
        bigWheel.scale.set(2, 1.25, 2);

        return {
            nose,
            cabin,
            chimney,
            smallWheelRear,
            smallWheelCenter,
            smallWheelFront,
            bigWheel,
        };
    }

    private createMaterials() {
        const body = new MeshStandardMaterial({
            color: "firebrick",
            flatShading: true,
        });

        const detail = new MeshStandardMaterial({
            color: "darkslategray",
            flatShading: true,
        });

        return {
            body,
            detail,
        };
    }

    private createGeometries() {
        const cabin = new BoxGeometry(2, 2.25, 1.5);

        const nose = new CylinderGeometry(0.75, 0.75, 3, 12);

        const wheel = new CylinderGeometry(0.4, 0.4, 1.75, 16);

        const chimney = new CylinderGeometry(0.3, 0.1, 0.5);

        return {
            cabin,
            nose,
            wheel,
            chimney,
        };
    }
}
