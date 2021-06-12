import IDrawable from "./IDrawable";
import Pie from "./Pie";

export default class Slice implements IDrawable {
    public start: number = 0;
    public end: number = 0;
    public value: number = 0;
    public percent: number = 0;
    public color: string = "#0074d9";
    public parentPie!: Pie;
    public label!: string;
    public constructor(value: number, pie: Pie, label: string) {
        this.label = label;
        this.parentPie = pie;
        this.value = value;
        this.parentPie.slices.push(this);
        console.log(this.parentPie);
    }

    calcPercentage(newTotaol: number): void {
        this.percent = (this.value / newTotaol);
    }

    calcEnd(): void {
        this.end = this.start + (360 * (this.percent))
        //          180       + (360 * 0.25);
    }

    update(total: number): void {
        this.calcPercentage(total);
        this.calcEnd();
    }
    public hashLabel(x: string): number {
        let toBeHashed = 0;
        x.split("").forEach(char => toBeHashed += (char.charCodeAt(0) * 100));
        return (toBeHashed * 3);
    }

    draw(): SVGElement {
        this.color = `hsl(${this.hashLabel(this.label)},75%,65%)`;
        this.calcPercentage(this.parentPie.total);
        let slice: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        slice.setAttribute("r", "25");
        slice.setAttribute("cx", "50");
        slice.setAttribute("cy", "50");
        let strokeDash = (((this.percent * 100) * this.parentPie.circumference) / 100);
        slice.style.strokeDasharray = `${strokeDash} ${this.parentPie.circumference}`;
        slice.style.stroke = this.color;
        slice.style.fill = "transparent";
        slice.style.transform = `rotate(${this.start}deg)`;
        slice.classList.add("slice");
        slice.onmousemove = e => {
            let tooltip: HTMLElement = <HTMLElement>document.querySelector('.tooltip');
            tooltip.style.top = e.clientY + "px";
            tooltip.style.left = (e.clientX - tooltip.offsetWidth / 2) + "px";
            tooltip.innerText = `${this.label} : ${this.value}`;
        }

        return slice;
    }
}