import Pie from "./classes/Pie.js";
const container = document.getElementById('pie-chart');
drawChart(container);
function drawChart(div) {
    let pie = new Pie("pie-chart");
    pie.AddSlice(500, "كهرباء");
    pie.AddSlice(500, "ماء");
    pie.AddSlice(2500, "انترنت");
}
