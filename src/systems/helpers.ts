import { AxesHelper, GridHelper, Mesh, MeshBasicMaterial } from "three";
import {
    TextGeometry,
    TextGeometryParameters,
} from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

async function createAxesHelper() {
    const size = 3;
    const axes = new AxesHelper(size);
    axes.position.set(-5.5, 0, -5.5);

    const loader = new FontLoader();
    const font = await loader.loadAsync("./helvetiker_regular.typeface.json");
    const textParameters: TextGeometryParameters = {
        font,
        size: 5,
        height: 1,
    };

    var textX = new Mesh(
        new TextGeometry("X", textParameters),
        new MeshBasicMaterial({ color: "red", opacity: 0.5, transparent: true })
    );
    var textY = new Mesh(
        new TextGeometry("Y", textParameters),
        new MeshBasicMaterial({ color: "green", opacity: 0.5, transparent: true })
    );
    var textZ = new Mesh(
        new TextGeometry("Z", textParameters),
        new MeshBasicMaterial({ color: "darkblue", opacity: 0.5, transparent: true })
    );

    textX.position.x = size;
    textY.position.y = size;
    textZ.position.z = size;

    const scale = 0.03;
    textX.scale.set(scale, scale, scale);
    textY.scale.set(scale, scale, scale);
    textZ.scale.set(scale, scale, scale);

    axes.add(textX, textY, textZ);

    return axes;
}

function createGridHelper() {
    const helper = new GridHelper(10, 25);
    return helper;
}

export { createAxesHelper, createGridHelper };
