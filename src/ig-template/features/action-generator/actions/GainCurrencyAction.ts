import {JewelAction} from "@/ig-template/features/action-generator/actions/JewelAction";
import {Currency} from "@/ig-template/features/wallet/Currency";
import {Wallet} from "@/ig-template/features/wallet/Wallet";

export class GainCurrencyAction extends JewelAction {
    _wallet: Wallet;
    currency: Currency;


    constructor(duration: number, currency: Currency, wallet: Wallet) {
        super(`${currency.amount < 0 ? 'Lose' : 'Gain'} ${currency.amount} ${currency.type}`, duration, currency.amount < 0);
        this.currency = currency;
        this._wallet = wallet;
    }

    gainReward(): boolean {
        this._wallet.gainCurrency(this.currency);
        return true;
    }

}
