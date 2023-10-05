import StatsAddon from "three/addons/libs/stats.module.js";

export class Stats extends StatsAddon implements IUpdatable {
    constructor() {
        super();
    }

    public tick = () => {
        this.update();
    };
}
