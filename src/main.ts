import "./style.css";
import { World } from "./world";

async function main() {
    const id = "scene-container";
    const container = document.getElementById(id);

    if (container === null) {
        throw new Error(`Container #${id} doesn't exist.`);
    }

    const world = new World(container);

    // complete async tasks
    await world.init();

    world.start();
}

main().catch((err) => {
    console.error(err);
});
