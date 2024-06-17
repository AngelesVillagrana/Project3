document.addEventListener('DOMContentLoaded', function() {
    const chartSelector = document.getElementById('chartSelector2');
    const descriptionDiv = document.getElementById('descriptionChart2');

    const descriptions = {
        'Explicit content': '<br><h3>This chart explores the number of songs with explicit content and the non-explicit ones.<br></h3>',
        'Songs per year': '<br><h3>This chart gives us the percentage of songs per year on the top 2000.</br></h3>'
    };

    // Function to fetch and update chart based on selected option
    function updateChart(endpoint) {
        const selectedValue = chartSelector.value;

        // Update the description
        descriptionDiv.innerHTML = descriptions[selectedValue];
       
        // Fetch data
        d3.json(endpoint).then(data => {

            // Determine x and y keys based on endpoint
            let labelsKey, valueKey;
            switch (endpoint) {
                case '/api/piechart1':
                    labelsKey = 'Explicit';
                    valueKey = 'Numberexplicit';
                    
                    break;
                case '/api/piechart2':
                    labelsKey = 'Year';
                    valueKey= 'songs';
                    break;
                default:
                    console.error('Unknown endpoint:', endpoint);
                    return;
            }

            // Extract labels and values dynamically
            let labels = data.map(item => item[labelsKey]);
            let values = data.map(item => item[valueKey]);

            // Log the extracted values for debugging
            console.log('Labels:', labels);
            console.log('Values:', values);

            // Create the Plotly trace
            let trace = {
                labels: labels,
                values: values,
                type: 'pie'
            };

            // Define the data and layout for the plot
            let plotData = [trace];
            let plotLayout = {
                title: selectedValue
            };

            // Clear previous plot
            Plotly.purge("piechart");

            // Render the plot
            Plotly.newPlot("piechart", plotData, plotLayout);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    // Initialize with the first option on page load
    updateChart('/api/piechart1');

    // Event listener for dropdown change
    chartSelector.addEventListener('change', function() {
        let selectedOption = chartSelector.value;

        // Determine endpoint based on selected option
        let endpoint;
        switch (selectedOption) {
            case 'Explicit content':
                endpoint = '/api/piechart1';
                break;
            case 'Songs per year':
                endpoint = '/api/piechart2';
                break;
            default:
                console.error('Invalid selection:', selectedOption);
                return;
        }

        // Update the chart based on the selected endpoint
        updateChart(endpoint);
    });
});