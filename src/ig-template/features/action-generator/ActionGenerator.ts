import {UpgradesFeature} from "@/ig-template/features/UpgradesFeature";
import {ContinuousExpLevel} from "@/ig-template/tools/exp-level/ContinuousExpLevel";
import {Features} from "@/ig-template/Features";
import {ActionGeneratorSaveData} from "@/ig-template/features/action-generator/ActionGeneratorSaveData";
import {JewelAction} from "@/ig-template/features/action-generator/actions/JewelAction";
import {GainExpAction} from "@/ig-template/features/action-generator/actions/GainExpAction";
import {Random} from "@/ig-template/tools/probability/Random";
import {GainCurrencyAction} from "@/ig-template/features/action-generator/actions/GainCurrencyAction";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";
import {Currency} from "@/ig-template/features/wallet/Currency";

export class ActionGenerator extends UpgradesFeature {

    actions: JewelAction[] = [];
    playerLevel: ContinuousExpLevel;


    public readonly GENERATOR_CHECK_TIME: number = 60;
    public checkCounter: number = 0;

    constructor() {
        super('action-generator-feature');

        this.playerLevel = new ContinuousExpLevel(100, (level) => {
            return 1 / 8 * (level ** 2 - level + 600 * (2 ** (level / 7) - 2 ** (1 / 7)) / (2 ** (1 / 7) - 1))
        },)
    }


    start() {
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
        const level = this.playerLevel.getLevel();
        const negativeProb = 0.2;
        const possibleActions = [];
        for (let i = 0; i < 15; i++) {
            possibleActions.push(this.createCurrencyGain(level, negativeProb))
        }
        for (let i = 0; i < 10; i++) {
            possibleActions.push(this.createExpGain(level, negativeProb))
        }
        return Random.fromArray(possibleActions);
    }

    createExpGain(level: number, negativeProb: number) {
        let benefit = Math.floor(3 + level ^ 2);
        let duration = Random.fuzzInt(benefit * 3, 0.3);
        const isNegative = Random.booleanWithProbability(negativeProb);
        if (isNegative) {
            benefit *= -4 / 5;
            duration /= 8;
        }
        return new GainExpAction(duration, this.playerLevel, Random.fuzzInt(benefit, 0.2))
    }

    createCurrencyGain(level: number, negativeProb: number): GainCurrencyAction {
        const isNegative = Random.booleanWithProbability(negativeProb);
        const isSapphire = Random.booleanWithProbability(0.7);
        if (isSapphire) {
            return this.createSapphire(level, isNegative)
        }

        const isEmerald = Random.booleanWithProbability(0.6);
        if (isEmerald) {
            return this.createEmerald(level, isNegative)

        }
        const isRuby = Random.booleanWithProbability(0.5);
        if (isRuby) {
            return this.createRuby(level, isNegative)
        }
        return this.createDiamond(level, isNegative)
    }

    createSapphire(level: number, isNegative: boolean) {
        if (isNegative) {
            level = Math.min(1, level - 5);
        }
        let benefit = Random.intBetween(10, 10 + 6 * level)
        if (isNegative) {
            benefit *= -1;
        }
        return new GainCurrencyAction(10, new Currency(benefit, CurrencyType.Sapphire), this._wallet)
    }

    createEmerald(level: number, isNegative: boolean) {
        if (isNegative) {
            level = Math.min(1, level - 3);
        }
        let benefit = Random.intBetween(6, 6 + 4 * level)
        if (isNegative) {
            benefit *= -1;
        }
        return new GainCurrencyAction(30, new Currency(benefit, CurrencyType.Emerald), this._wallet)
    }

    createRuby(level: number, isNegative: boolean) {
        if (isNegative) {
            level = Math.min(1, level - 2);
        }
        let benefit = Random.intBetween(3, 3 + 3 * level)
        if (isNegative) {
            benefit *= -1;
        }
        return new GainCurrencyAction(60, new Currency(benefit, CurrencyType.Ruby), this._wallet)
    }

    createDiamond(level: number, isNegative: boolean) {
        let benefit = isNegative ? -1 : 1 + Math.floor(level / 5);
        if (isNegative) {
            benefit *= -1;
        }
        return new GainCurrencyAction(120, new Currency(benefit, CurrencyType.Diamond), this._wallet)
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
