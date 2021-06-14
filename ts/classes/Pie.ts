import IDrawable from "./IDrawable";
import Slice from "./Slice.js";

export default class Pie implements IDrawable {
    public static count: number = 0;
    public id!: number;
    public slices: Array<Slice> = new Array<Slice>();
    public circumference: number = 0;
    public total: number = 0;
    containerName: string;
    public constructor(containerName: string) {
        this.containerName = containerName;
    }



    public SetCircumference(radius: number) {
        this.circumference = 2 * Math.PI * radius;
        this.id = Pie.count++;
    }

    public AddSlice(value: number, label: string = "fff") {
        this.total += value;
        let newSlice: Slice = new Slice(value, this, label);
        this.updateChildren();
    }

    updateChildren() {
        this.slices = this.slices.sort((a, b) => a.value + b.value);
        this.slices.forEach((slice, sliceIdx) => {
            slice.parentPie = this;
            if (sliceIdx != 0) {
                slice.start = this.slices[sliceIdx - 1].end;
            } else {
                slice.start = 0
            }
            slice.update(this.total);
        });
        this.draw(this.containerName);
    }


    public draw(containerName: string): void {
        this.containerName = containerName;
        const container = document.getElementById(containerName)!;
        container.innerHTML = ``;
        let newBase: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let overlay = document.createElement('div');
        overlay.setAttribute("style", `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        z-index: 2;
        border-radius: 50%;
        opacity: .5;
        background: radial-gradient(transparent, rgba(0, 0, 0, 0.9));
        pointer-events: none;`);
        container.appendChild(overlay);
        container.style.width = "250px";
        container.style.height = "250px";
        container.style.position = "relative";
        newBase.setAttribute("viewBox", "0 0 100 100");
        newBase.classList.add("--svgchart-circle");
        newBase.style.position = "relative";
        newBase.style.width = "250px";
        newBase.style.height = "250px";
        newBase.onmouseenter = () => {
            let tooltip: HTMLElement = <HTMLElement>document.querySelector('.--svgchart-tooltip');
            tooltip.style.opacity = "1";
        }
        newBase.onmouseleave = () => {
            let tooltip: HTMLElement = <HTMLElement>document.querySelector('.--svgchart-tooltip');
            tooltip.style.opacity = "0";
        }
        this.SetCircumference(25);
        container.appendChild(newBase);
        this.slices.forEach((slice, sliceIdx) => {
            newBase.appendChild(slice.draw());
        })
        //return newBase;
    }
}