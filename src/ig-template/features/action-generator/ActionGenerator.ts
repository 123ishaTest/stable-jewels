import {UpgradesFeature} from "@/ig-template/features/UpgradesFeature";
import {ContinuousExpLevel} from "@/ig-template/tools/exp-level/ContinuousExpLevel";
import {Features} from "@/ig-template/Features";
import {ActionGeneratorSaveData} from "@/ig-template/features/action-generator/ActionGeneratorSaveData";
import {JewelAction} from "@/ig-template/features/action-generator/actions/JewelAction";
import {GainExpAction} from "@/ig-template/features/action-generator/actions/GainExpAction";

export class ActionGenerator extends UpgradesFeature {

    actions: JewelAction[] = [];
    playerLevel: ContinuousExpLevel;

    public readonly GENERATOR_CHECK_TIME: number = 60;
    public checkCounter: number = 0;

    constructor() {
        super('action-generator-feature');

        this.playerLevel = new ContinuousExpLevel(100, (level) => {
            return 1 / 8 * (level ** 2 - level + 600 * (2 ** (level / 7) - 2 ** (1 / 7)) / (2 ** (1 / 7) - 1))
        })
        this.generateNewActions();
    }

    get switchTime() {
        return 60;
    }

    get maxActionCount() {
        return 5;
    }

    initialize(features: Features) {
        this._wallet = features.wallet;

    }

    private generateNewActions() {
        const activeMemory = this.actions.map(action => {
            return action.isStarted;
        })
        this.actions = [];
        for (let i = 0; i < this.maxActionCount; i++) {
            this.actions.push(this.getAction())
        }
        this.actions.forEach((action, index) => {
            action.isStarted = activeMemory[index];
        })

    }

    private getAction(): JewelAction {
        return new GainExpAction(3, this.playerLevel, 10);
    }

    update(delta: number) {
        this.actions.forEach(action => {
            action.perform(delta);
        })

        this.checkCounter += delta;
        if (this.checkCounter >= this.GENERATOR_CHECK_TIME) {
            this.generateNewActions();
            this.checkCounter = 0;
        }

    }


    save(): ActionGeneratorSaveData {
        return {
            ...super.save(),
        };
    }

    load(data: ActionGeneratorSaveData) {
        super.load(data);
    }
}
