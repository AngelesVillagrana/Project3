
d3.json('/api').then(some=>{
    let quality=some.map(elem=>{
        return elem.quality
    });

    let sugar=some.map(elem=>{
        return elem['residual sugar']
    });

    console.log(sugar)

    let trace1 = {
    x: quality,
    y: sugar,
    type: 'bar'
    };

    let data = [trace1];

    let layout = {
    title: 'My Plot'
    };

    Plotly.newPlot("plot", data, layout);
});

