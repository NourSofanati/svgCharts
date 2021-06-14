export default class Slice {
    constructor(value, pie, label) {
        this.start = 0;
        this.end = 0;
        this.value = 0;
        this.percent = 0;
        this.color = "#0074d9";
        this.label = label;
        this.parentPie = pie;
        this.value = value;
        this.parentPie.slices.push(this);
        console.log(this.parentPie);
    }
    calcPercentage(newTotaol) {
        this.percent = (this.value / newTotaol);
    }
    calcEnd() {
        this.end = this.start + (360 * (this.percent));
        //          180       + (360 * 0.25);
    }
    update(total) {
        this.calcPercentage(total);
        this.calcEnd();
    }
    hashLabel(x) {
        let toBeHashed = 0;
        x.split("").forEach(char => toBeHashed += (char.charCodeAt(0) * 100));
        return (toBeHashed * 3);
    }
    draw() {
        this.color = `hsl(${this.hashLabel(this.label)},95%,65%)`;
        this.calcPercentage(this.parentPie.total);
        let slice = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        slice.setAttribute("r", "25");
        slice.setAttribute("cx", "50");
        slice.setAttribute("cy", "50");
        let strokeDash = (((this.percent * 100) * this.parentPie.circumference) / 100);
        slice.classList.add("--svgchart-slice");
        slice.classList.add("--svgchart-circle");
        slice.style.stroke = this.color;
        slice.style.fill = "transparent";
        slice.style.transform = `rotate(${-90 + this.start}deg)`;
        slice.onmousemove = e => {
            let tooltip = document.querySelector('.--svgchart-tooltip');
            tooltip.style.top = e.clientY + "px";
            tooltip.style.left = (e.clientX - tooltip.offsetWidth / 2) + "px";
            tooltip.innerText = `${this.label} : ${this.value}`;
        };
        setTimeout(() => {
            slice.style.strokeDasharray = `${strokeDash} ${this.parentPie.circumference}`;
        }, 50);
        return slice;
    }
}
