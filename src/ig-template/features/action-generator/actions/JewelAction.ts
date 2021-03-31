import {AbstractAction} from "@/ig-template/tools/actions/AbstractAction";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";

export abstract class JewelAction extends AbstractAction {
    isLocked: boolean = false;
    isNegative: boolean;

    protected constructor(description: string, duration: number, isNegative: boolean) {
        super(description, duration, Infinity, new NoRequirement());
        this.isNegative = isNegative;
    }
}
