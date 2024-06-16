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

//Update the chart and description based on the selected option.

document.addEventListener('DOMContentLoaded', function() {
    const chartSelector = document.getElementById('chartSelector');
    const descriptionDiv = document.getElementById('descriptionChart');

    const descriptions = {
        'Danceability vs. Popularity': 'This chart analyzes the relationship between danceability and popularity of songs from 2000 to 2019.',
        'Duration vs. Popularity': 'This chart examines how the duration of songs impacts their popularity on Spotify from 2000 to 2019.',
        'Loudness vs. Popularity': 'This chart explores the correlation between loudness and the popularity of songs over the years 2000 to 2019.'
    };

    // Function to fetch and update chart based on selected option
    function updateChart(endpoint) {
        const selectedValue = chartSelector.value;

        // Update the description
        descriptionDiv.textContent = descriptions[selectedValue];
       
        // Fetch data
        d3.json(endpoint).then(data => {

            // Determine x and y keys based on endpoint
            let xKey, yKey;
            switch (endpoint) {
                case '/api/chart1':
                    xKey = 'danceability';
                    yKey = 'popularity';
                    break;
                case '/api/chart2':
                    xKey = 'duration_minutes';
                    yKey = 'popularity';
                    break;
                case '/api/chart3':
                    xKey = 'loudness';
                    yKey = 'popularity';
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
                title: selectedValue
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
    chartSelector.addEventListener('change', function() {
        let selectedOption = chartSelector.value;

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
                console.error('Invalid selection:', selectedOption);
                return;
        }

        // Update the chart based on the selected endpoint
        updateChart(endpoint);
    });
});
