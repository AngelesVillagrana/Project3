d3.json('/api/piechart').then(some=>{
    let explicit=some.map(elem=>{
        return elem['Explicit']
    });
    let numb =some.map(elem=>{
        return elem ['Numberexplicit']
    })
    console.log(numb)
    let trace1 = {
    x: explicit,
    y: numb,
    type: 'bar'
    };
    let data = [trace1];
    let layout = {
    title: 'My Plot'
    };
    Plotly.newPlot("plot", data, layout);
});