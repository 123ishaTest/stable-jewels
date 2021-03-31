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
import {DiscreteUpgrade} from "@/ig-template/tools/upgrades/DiscreteUpgrade";
import {UpgradeId} from "@/ig-template/tools/upgrades/UpgradeId";
import {UpgradeType} from "@/ig-template/tools/upgrades/UpgradeType";
import {CurrencyBuilder} from "@/ig-template/features/wallet/CurrencyBuilder";
import {ArrayBuilder} from "@/ig-template/util/ArrayBuilder";
import {SingleLevelUpgrade} from "@/ig-template/tools/upgrades/SingleLevelUpgrade";

export class ActionGenerator extends UpgradesFeature {

    actions: JewelAction[] = [];
    playerLevel: ContinuousExpLevel;

    refreshDurationUpgrade: DiscreteUpgrade;
    maxActionsUpgrade: DiscreteUpgrade;
    negativeRateUpgrade: DiscreteUpgrade;
    betterGems: DiscreteUpgrade;
    highlightNegatives: SingleLevelUpgrade;

    public checkCounter: number = 0;

    constructor() {
        super('action-generator-feature');

        this.playerLevel = new ContinuousExpLevel(100, (level) => {
            return 1 / 8 * (level ** 2 - level + 600 * (2 ** (level / 7) - 2 ** (1 / 7)) / (2 ** (1 / 7) - 1))
        })

        this.refreshDurationUpgrade = new DiscreteUpgrade(UpgradeId.ActionRefreshDuration, UpgradeType.None, "Upgrade refresh duration", 10,
            CurrencyBuilder.createArray(ArrayBuilder.fromStartAndStepAdditive(100, 100, 10), CurrencyType.Sapphire),
            ArrayBuilder.fromStartAndStepAdditive(30, 10, 11),
        )

        this.maxActionsUpgrade = new DiscreteUpgrade(UpgradeId.MaxActions, UpgradeType.None, "Max Actions", 20,
            CurrencyBuilder.createArray(ArrayBuilder.fromStartAndStepAdditive(50, 50, 20), CurrencyType.Emerald),
            ArrayBuilder.fromStartAndStepAdditive(5, 1, 21), 1
        )

        this.negativeRateUpgrade = new DiscreteUpgrade(UpgradeId.NegativeRate, UpgradeType.None, "Negative Chance", 10,
            CurrencyBuilder.createArray(ArrayBuilder.fromStartAndStepAdditive(50, 50, 10), CurrencyType.Ruby),
            ArrayBuilder.fromStartAndStepAdditive(0.5, -0.05, 11), 1
        )


        this.betterGems = new DiscreteUpgrade(UpgradeId.BetterGems, UpgradeType.None, "Better Gem Chance", 25,
            CurrencyBuilder.createArray(ArrayBuilder.fromStartAndStepAdditive(100, 100, 7), CurrencyType.Sapphire).concat(
                CurrencyBuilder.createArray(ArrayBuilder.fromStartAndStepAdditive(100, 100, 7), CurrencyType.Emerald).concat(
                    CurrencyBuilder.createArray(ArrayBuilder.fromStartAndStepAdditive(100, 100, 7), CurrencyType.Ruby).concat(
                        CurrencyBuilder.createArray(ArrayBuilder.fromStartAndStepAdditive(100, 100, 4), CurrencyType.Diamond).concat(
                        )
                    )
                )
            ),
            ArrayBuilder.fromStartAndStepAdditive(0, 0.02, 26), 1
        )

        this.highlightNegatives = new SingleLevelUpgrade(UpgradeId.HighlightNegative, UpgradeType.None, "Highlight Negatives",
            new Currency(200, CurrencyType.Emerald), 1);

        this.upgrades = [
            this.refreshDurationUpgrade,
            this.maxActionsUpgrade,
            this.negativeRateUpgrade,
            this.betterGems,
            this.highlightNegatives
        ]
    }


    start() {
        this.generateNewActions();
    }

    update(delta: number) {
        this.actions.forEach(action => {
            action.perform(delta);
        })

        this.checkCounter += delta;
        if (this.checkCounter >= this.switchTime) {
            this.generateNewActions();
            this.checkCounter = 0;
        }
    }

    get highlightNegativeActions(): boolean {
        return this.highlightNegatives.isBought()
    }

    get switchTime() {
        return this.refreshDurationUpgrade.getBonus();
    }

    get gemImprovement() {
        return this.betterGems.getBonus();
    }

    get negativeProb() {
        return this.negativeRateUpgrade.getBonus()
    }

    get maxActionCount() {
        return this.maxActionsUpgrade.getBonus();
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
        const negativeProb = this.negativeProb;
        const possibleActions = [];
        for (let i = 0; i < 15; i++) {
            possibleActions.push(this.createCurrencyGain(level, negativeProb))
        }
        for (let i = 0; i < 15; i++) {
            possibleActions.push(this.createExpGain(level, negativeProb))
        }
        return Random.fromArray(possibleActions);
    }

    createExpGain(level: number, negativeProb: number) {
        let benefit = Math.floor(3 + Math.pow(level + 2, 2));
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
        const isSapphire = Random.booleanWithProbability(0.7 - this.gemImprovement);
        if (isSapphire) {
            return this.createSapphire(level, isNegative)
        }

        const isEmerald = Random.booleanWithProbability(0.6 - this.gemImprovement);
        if (isEmerald) {
            return this.createEmerald(level, isNegative)

        }
        const isRuby = Random.booleanWithProbability(0.5 - this.gemImprovement);
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

    save(): ActionGeneratorSaveData {
        return {
            ...super.save(),
        };
    }

    load(data: ActionGeneratorSaveData) {
        super.load(data);
    }
}
