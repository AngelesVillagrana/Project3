document.addEventListener('DOMContentLoaded', function() {
    const chartSelector = document.getElementById('chartSelector');
    const descriptionDiv = document.getElementById('descriptionChart');

    const descriptions = {
        'Danceability vs. Popularity': `<br><h3>This chart analyzes the relationship between danceability and popularity of songs from 1999 to 2019.</h3><br>
        <strong>Examples:</strong> "Give It To Me" from Timbaland is the most danceable of all, with a danceability value of 0.97 .<br>
        "You Raise Me Up" from Westlife is the less danceable, with a value of 0.12.<br>`,

        'Duration vs. Popularity': `<br><h3>This chart examines how the duration of songs, measured in minutes, impacts their popularity<br>on Spotify from 1999 to 2019.</h3><br>
        <strong>Examples:</strong> "Mirrors" from Justin Timberlake has the longest duration with a value of 8.06 minutes.<br>
        "Old Town Road" from Lil Nas X has the shortest duration, with a value of 1.88 minutes.<br>`,

        'Loudness vs. Popularity': `<br><h3>This chart explores the correlation between loudness and the popularity of songs over the years 1999 to 2019.</h3><br>
        <strong>Decibels (dB)</strong>: Decibels are a logarithmic unit used to measure the intensity of a sound. A 0 dB level represents a reference point, <br>
        which in the context of digital audio, often represents the maximum possible level of sound.<br> 
        <strong>Average Loudness</strong>: Music tracks are often quieter on average than the maximum possible sound level.<br>
        The loudness values represent the average loudness of the track over its duration, which is why they typically fall in the range of -60 dB to 0 dB.<br>
        <strong>Examples:</strong> "I See Fire - From "The Hobbit - The Desolation..." from Ed Sheeran is the quietest track on average with a loudness value of -20.51.<br>
        "In for the Kill" from La Roux is the loudest one, with a loudness value of -0.27.<br>`
    };

    // Function to fetch and update chart based on selected option
    function updateChart(endpoint) {
        const selectedValue = chartSelector.value;

        // Update the description
        descriptionDiv.innerHTML = descriptions[selectedValue];
       
        // Fetch data
        d3.json(endpoint).then(data => {

            // Determine x and y keys based on endpoint
            let xKey, yKey, xTitle, yTitle;
            switch (endpoint) {
                case '/api/chart1':
                    xKey = 'danceability';
                    yKey = 'popularity';
                    xTitle = 'Danceability'
                    yTitle = 'Popularity'
                    break;
                case '/api/chart2':
                    xKey = 'duration_minutes';
                    yKey = 'popularity';
                    xTitle = 'Duration (Minutes)'
                    yTitle = 'Popularity'
                    break;
                case '/api/chart3':
                    xKey = 'loudness';
                    yKey = 'popularity';
                    xTitle = 'Loudness (dB)'
                    yTitle = 'Popularity'
                    break;
                default:
                    console.error('Unknown endpoint:', endpoint);
                    return;
            }

            // Extract x and y data dynamically
            let categories = data.map(item => item[xKey]);
            let values = data.map(item => item[yKey]);
            let artists = data.map(item => item['artist']);
            let songs = data.map(item => item['song']);

            // Log the extracted values for debugging
            console.log('Categories:', categories);
            console.log('Values:', values);
            console.log('Artists:', artists);
            console.log('Songs:', songs);

            // Create the Plotly trace
            let trace = {
                x: categories,
                y: values,
                type: 'scatter',
                mode: 'markers',
                marker: {
                    color: 'rgba(50, 171, 96, 0.6)',
                    line: {
                        color: 'rgba(50, 171, 96, 1.0)',
                        width: 1
                    }
                },
                text: songs.map((song, index) => `${song} by ${artists[index]}`),
                hoverinfo: 'text'
            };

            // Define the data and layout for the plot
            let plotData = [trace];
            let plotLayout = {
                //title: selectedValue,
                xaxis: {
                    title: xTitle,
                    tickmode: 'linear',
                    tick0: 0,
                    dtick: 1,
                    tickangle: -45,
                    zeroline: false,
                    gridwidth: 2
                },
                yaxis: {
                    title: yTitle, 
                    zeroline: false,
                    gridwidth: 2
                },
                
                margin: {
                    l: 60,
                    r: 30,
                    b: 100,
                    t: 30,
                    pad: 10
                },
                paper_bgcolor: 'rgba(255, 255, 255, 1)',
                plot_bgcolor: 'rgba(255, 255, 255, 1)',
                showlegend: false
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
