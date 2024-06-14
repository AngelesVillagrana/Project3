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
    title: 'Pie Chart: Amount of explicit content'
    };
    Plotly.newPlot("piechart", data, layout);
});

//Api Endpoints for the DropDown Menu
// Set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

// Append the svg object to the body of the page
const svg = d3.select("#graph")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);


// Function to fetch and render chart data
function fetchAndRenderChart(apiEndpoint) {
    d3.json(apiEndpoint).then(function(data) {
        // Clear previous chart
        svg.selectAll("*").remove();
         // Check if data is empty
        if (!data.length) {
            svg.append("text")
               .attr("x", width / 2)
               .attr("y", height / 2)
               .attr("text-anchor", "middle")
               .text("No data available");
            return;
        }

        // Determine the max values for scales
        const maxDuration = d3.max(data, d => d.duration_minutes);
        const maxPopularity = d3.max(data, d => d.popularity);
        
        // X axis: duration
        const x = d3.scaleLinear()
                    .domain([0, maxDuration])
                    .range([ 0, width ]);
        svg.append("g")
           .attr("transform", `translate(0,${height})`)
           .call(d3.axisBottom(x));

        // Y axis: popularity
        const y = d3.scaleLinear()
                    .domain([0, maxPopularity])
                    .range([ height, 0]);
        svg.append("g")
           .call(d3.axisLeft(y));

        // Add dots
        svg.append('g')
           .selectAll("dot")
           .data(data)
           .enter()
           .append("circle")
             .attr("cx", d => x(d.duration_minutes))
             .attr("cy", d => y(d.popularity))
             .attr("r", 5)
             .attr("class", "dot")
             .style("fill", "#69b3a2");
    }).catch(function(error) {
        console.error('Error fetching data:', error);
    });
}

// Event listener for the dropdown menu
document.getElementById('chartSelector').addEventListener('change', function() {
    const selectedValue = this.value;
    let apiEndpoint;
    if (selectedValue === 'chart1') {
        apiEndpoint = '/api/chart1';
    } else if (selectedValue === 'Duration vs. Popularity') {
        apiEndpoint = '/api/chart2';
    } else if (selectedValue === 'chart3') {
        apiEndpoint = '/api/chart3';
    }
    fetchAndRenderChart(apiEndpoint);
});

// Initial load
fetchAndRenderChart('/api/chart1'); // Default chart


d3.json('/api/chart2').then(data => {
    // Extract relevant data from the JSON response
    let duration = data.map(item => item['duration_minutes']); // Change 'Category' to the appropriate key from your data
    let popularity = data.map(item => item['popularity']); // Change 'Value' to the appropriate key from your data

    // Log the extracted values for debugging
    console.log(duration);

    // Create the Plotly trace
    let trace = {
        x: duration,
        y: popularity,
        type: 'bar'
    };

    // Define the data and layout for the plot
    let plotData = [trace];
    let plotLayout = {
        title: 'Chart: Duration vs. Popularity' // Adjust title as needed
    };

    // Render the plot
    Plotly.newPlot("Duration vs. Popularity", plotData, plotLayout);
});
