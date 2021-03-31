import {JewelAction} from "@/ig-template/features/action-generator/actions/JewelAction";
import {AbstractExpLevel} from "@/ig-template/tools/exp-level/AbstractExpLevel";

export class GainExpAction extends JewelAction {
    _expLevel: AbstractExpLevel
    amount: number;


    constructor(duration: number, expLevel: AbstractExpLevel, amount: number) {
        super(`${amount < 0 ? 'Lose' : 'Gain'} ${amount} EXP`, duration, amount < 0);
        this._expLevel = expLevel;
        this.amount = amount;
    }

    gainReward(): boolean {
        this._expLevel.gainExperience(this.amount);
        return true;
    }

}
