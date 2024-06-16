

const { Client } = require('pg');
const { CONNSTRING } = require('./config'); // Import the connection string from config.py

// Connect to PostgreSQL using the connection string
const client = new Client({
  connectionString: CONNSTRING
});

// Function to fetch data and generate the selected chart
function generateChart(selectedChart) {
  let query, chartLabel, xDataKey, yDataKey;

  // Define query and chart details based on the selected chart
  switch(selectedChart) {
    case 'chart1':
      query = `SELECT popularity, tempo FROM songs;`;
      chartLabel = 'Popularity vs Tempo';
      xDataKey = 'tempo';
      yDataKey = 'popularity';
      break;
    case 'chart2':
      query = `SELECT popularity, duration_ms FROM songs;`;
      chartLabel = 'Popularity vs Duration (ms)';
      xDataKey = 'duration_ms';
      yDataKey = 'popularity';
      break;
    case 'chart3':
      query = `SELECT popularity, genre FROM songs;`;
      chartLabel = 'Popularity vs Genre';
      xDataKey = 'genre';
      yDataKey = 'popularity';
      break;
    default:
      console.error('Invalid chart selected.');
      return;
  }

  client.connect()
    .then(() => {
      return client.query(query);
    })
    .then(result => {
      const data = result.rows;

      // Create chart using Chart.js
      const ctx = document.getElementById('myChart').getContext('2d');
      const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: chartLabel,
            data: data.map(row => ({ x: row[xDataKey], y: row[yDataKey] })),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom'
            },
            y: {
              min: 0,
              max: 100
            }
          }
        }
      });
    })
    .catch(error => console.error('Error executing query', error))
    .finally(() => client.end()); // Close the database connection after use
}

// Event listener for dropdown menu change
document.getElementById('chartSelector').addEventListener('change', function() {
  const selectedChart = this.value;
  generateChart(selectedChart); // Generate chart based on the selected option
});

// Generate the initial chart on page load
generateChart('chart1'); // Default to chart1
