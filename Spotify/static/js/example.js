d3.json('/api/piechart').then(some => {
    let labels = some.map(elem => elem['Explicit']? 'Explicit Content' : 'Non-explicit Content');
    let values = some.map(elem => elem['Numberexplicit']);
    
    let trace1 = {
        labels: labels,
        values: values,
        type: 'pie'
    };
    
    let data = [trace1];
    
    let layout = {
        title: 'Pie Chart: Amount of explicit content'
    };
    
    Plotly.newPlot("piechart", data, layout);
});


//Api Endpoints for the DropDown Menu
// Function to fetch and update chart based on selected option

function updateChart(endpoint) {
    // Create constant for chart Title 
    const chartTitle = document.getElementById('chartSelector').value;
    //Fetch data
    d3.json(endpoint).then(data => {

        // Assuming the keys are dynamic and vary per endpoint, adjust accordingly
        let xKey, yKey;

        // Example: Adjust based on endpoint
        switch (endpoint) {
            case '/api/chart1':
                xKey = 'danceability'; // Adjust based on actual key in endpoint /api/chart1
                yKey = 'popularity'; // Adjust based on actual key in endpoint /api/chart1
                break;
            case '/api/chart2':
                xKey = 'duration_minutes'; // Adjust based on actual key in endpoint /api/chart2
                yKey = 'popularity'; // Adjust based on actual key in endpoint /api/chart2
                break;
            case '/api/chart3':
                // Example of different keys or structure in /api/chart3
                xKey = 'loudness'; // Adjust based on actual key in endpoint /api/chart3
                yKey = 'popularity'; // Adjust based on actual key in endpoint /api/chart3
                break;
            default:
                console.error('Unknown endpoint:', endpoint);
                return;
        }

        // Extract x and y data dynamically
        let categories = data.map(item => item[xKey]);
        let values = data.map(item => item[yKey]);

        // Log the extracted values for debugging
        console.log('Categories:', categories);
        console.log('Values:', values);

        // Create the Plotly trace
        let trace = {
            x: categories,
            y: values,
            type: 'bar'
        };

        // Define the data and layout for the plot
        let plotData = [trace];
        let plotLayout = {
            title: `${chartTitle}`
        };

        // Clear previous plot
        Plotly.purge("plot");

        // Render the plot
        Plotly.newPlot("plot", plotData, plotLayout);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Initialize with the first option on page load
updateChart('/api/chart1');

// Event listener for dropdown change
document.getElementById('chartSelector').addEventListener('change', function() {
    let selectedOption = this.value;

    // Determine endpoint based on selected option
    let endpoint;
    switch (selectedOption) {
        case 'Danceability vs. Popularity':
            endpoint = '/api/chart1';
            break;
        case 'Duration vs. Popularity':
            endpoint = '/api/chart2';
            break;
        case 'Loudness vs. Popularity':
            endpoint = '/api/chart3';
            break;
        default:
            endpoint = '/api/chart1'; // Default to chart1 if no valid option
            break;
    }

    // Update the chart based on the selected endpoint
    updateChart(endpoint);
});