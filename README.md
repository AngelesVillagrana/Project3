# Spotify Songs Visualization

## Overview

This project aims to visualize Spotify song data to provide insights into various aspects of the songs, such as their explicit content, release dates, and popularity. The data is stored in a PostgreSQL database and presented using a Flask web application. Users can interact with the visualizations to explore the data.

## Project Structure

- **app.py**: Main Flask application file.
- **config.py**: Configuration file containing the database connection string.
- **templates/**: Directory containing HTML templates.
  - **index.html**: Main page template.
  - **link.html**: Additional page template.
- **static/**: Directory containing static files like CSS and JavaScript.
- **README.md**: Project documentation.


## Visualizations

The application provides several visualizations to help users understand the Spotify songs data:

1. **Chart 1**: Number of explicit and non-explicit songs.
   - Endpoint: `/api/chart1`

2. **Chart 2**: Detailed song information.
   - Endpoint: `/api/chart2`

3. **Chart 3**: Additional song details.
   - Endpoint: `/api/chart3`

4. **Pie Chart**: Distribution of explicit songs.
   - Endpoint: `/api/piechart`
  
6. **Timeline/Bar Chart**: Total amount of songs per year and listing of the top 10,
   - Code written inside index.html for troublehsooting (created with charts.js).


## Usage Instructions

- Navigate to the main page to see an overview of the available visualizations.
- Use the links provided to explore different data visualizations.
- The data is dynamically fetched from the PostgreSQL database and displayed in a user-friendly manner.

## Ethical Considerations

When working with data, it is essential to consider ethical implications such as data privacy and accuracy. In this project:

- Data sourced from Spotify is used responsibly, ensuring compliance with Spotify's terms of service.
- Sensitive information is not included, and all data is anonymized.
- The project emphasizes transparency in data processing and visualization.

## References

- [Kaggle Dataset](https://www.kaggle.com/datasets/paradisejoy/top-hits-spotify-from-20002019)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy Documentation](https://www.sqlalchemy.org/)
- [pandas Documentation](https://pandas.pydata.org/)
- [Charts.js' GitHub](https://github.com/chartjs/Chart.js)
