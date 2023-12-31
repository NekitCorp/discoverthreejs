import { AnimationMixer, Object3D, Object3DEventMap } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Birds {
    public static async load() {
        const loader = new GLTFLoader();

        const [parrotData, flamingoData, storkData] = await Promise.all([
            loader.loadAsync("./models/Parrot.glb"),
            loader.loadAsync("./models/Flamingo.glb"),
            loader.loadAsync("./models/Stork.glb"),
        ]);

        const parrot = this.setupModel(parrotData);
        parrot.position.set(0, 2.5, 2.5);

        const flamingo = this.setupModel(flamingoData);
        flamingo.position.set(7.5, 2.5, -10);

        const stork = this.setupModel(storkData);
        stork.position.set(0, 0, -10);

        return {
            parrot,
            flamingo,
            stork,
        };
    }

    private static setupModel(data: GLTF): Object3D<Object3DEventMap> & IUpdatable {
        const model = data.scene.children[0] as Object3D<Object3DEventMap> & IUpdatable;
        const clip = data.animations[0];

        const mixer = new AnimationMixer(model);
        const action = mixer.clipAction(clip);
        action.play();

        model.tick = (delta: number) => mixer.update(delta);

        return model;
    }
}
