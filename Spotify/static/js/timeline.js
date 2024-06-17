//import Bokeh from "Bokeh"

fetch('/api/timeline')
            .then(response => response.json())
            .then(data => {
                // Process the data
                let yearCounts = {};
                let topSongsByYear = {};

                data.forEach(row => {
                    let year = row.year;
                    if (!yearCounts[year]) {
                        yearCounts[year] = 0;
                        topSongsByYear[year] = [];
                    }
                    yearCounts[year]++;
                    topSongsByYear[year].push(row);
                });

                // Sort top songs by popularity for each year and keep top 10
                for (let year in topSongsByYear) {
                    topSongsByYear[year].sort((a, b) => b.popularity - a.popularity);
                    topSongsByYear[year] = topSongsByYear[year].slice(0, 10);
                }

                // Prepare data for Chart.js
                let years = Object.keys(yearCounts);
                let counts = Object.values(yearCounts);

                // Create the timeline chart
                let ctx = document.getElementById('timelineChart').getContext('2d');
                let timelineChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: years,
                        datasets: [{
                            label: 'Number of Songs',
                            data: counts,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Year'
                                }
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Number of Songs'
                                }
                            }
                        },
                        onClick: function (event, activeElements) {
                            if (activeElements.length > 0) {
                                let index = activeElements[0].index;
                                let year = years[index];
                                let topSongs = topSongsByYear[year];

                                // Populate the table with the top 10 songs
                                let tbody = document.getElementById('topSongsTable').getElementsByTagName('tbody')[0];
                                tbody.innerHTML = ''; // Clear previous data
                                topSongs.forEach(song => {
                                    let row = tbody.insertRow();
                                    row.insertCell(0).innerText = song.title;
                                    row.insertCell(1).innerText = song.artist;
                                    row.insertCell(2).innerText = song.popularity;
                                });
                            }
                        }
                    }
                });
            });