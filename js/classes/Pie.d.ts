import IDrawable from "./IDrawable";
import Slice from "./Slice";
export default class Pie implements IDrawable {
    slices: Array<Slice>;
    total: number;
    constructor();
    draw(): SVGElement;
}
