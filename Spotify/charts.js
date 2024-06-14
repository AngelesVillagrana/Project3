document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.getElementById('myChart').getContext('2d');
    let currentChart;

    async function fetchData(endpoint) {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    function transformData(rawData, xDataKey, yDataKey) {
        return rawData.map(item => ({
            x: item[xDataKey],
            y: item[yDataKey]
        }));
    }

    async function generateChart(selectedChart) {
        let endpoint, chartLabel, xDataKey, yDataKey;

        switch (selectedChart) {
            case 'chart1':
                endpoint = '/api/chart1';
                chartLabel = 'Popularity vs Tempo';
                xDataKey = 'tempo';
                yDataKey = 'popularity';
                break;
            case 'chart2':
                endpoint = '/api/chart2';
                chartLabel = 'Popularity vs Duration (ms)';
                xDataKey = 'duration_ms';
                yDataKey = 'popularity';
                break;
            case 'chart3':
                endpoint = '/api/chart3';
                chartLabel = 'Popularity vs Genre';
                xDataKey = 'genre';
                yDataKey = 'popularity';
                break;
            default:
                console.error('Invalid chart selected.');
                return;
        }

        const rawData = await fetchData(endpoint);
        const chartData = transformData(rawData, xDataKey, yDataKey);

        if (currentChart) {
            currentChart.destroy();
        }

        currentChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: chartLabel,
                    data: chartData,
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
    }

    document.getElementById('chartSelector').addEventListener('change', function() {
        const selectedChart = this.value;
        generateChart(selectedChart);
    });

    generateChart('chart1'); // Default to chart1
});
