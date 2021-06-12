import IDrawable from "./IDrawable";
import Pie from "./Pie";
export default class Slice implements IDrawable {
    start: number;
    end: number;
    percent: number;
    color: string | undefined;
    parentPie: Pie;
    constructor(percentage: number, pie: Pie);
    calcStart(): number;
    draw(): SVGElement;
}
