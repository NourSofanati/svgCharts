import Pie from "./classes/Pie.js";
import Slice from "./classes/Slice.js";


const container: HTMLDivElement = <HTMLDivElement>document.getElementById('pie-chart');
drawChart(container);

function drawChart(div: HTMLDivElement) {
    let pie: Pie = new Pie("pie-chart");
    pie.AddSlice(500, "كهرباء")
    pie.AddSlice(500, "ماء")
    pie.AddSlice(2500, "انترنت")
    pie.AddSlice(55000, "طعام")
}