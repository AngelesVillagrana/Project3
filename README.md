# Spotify Songs Visualization

## Purpose

This project aims to visualize Spotify song data to provide insights into various aspects of the songs, such as their explicit content, release dates, and popularity. The data is stored in a PostgreSQL database and presented using a Flask web application. Users can interact with the visualizations to explore the data.

## How to Use and Interact with the Project

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/spotify-top-hits-visualization.git
    cd spotify-top-hits-visualization
    ```

2. **Set Up the Environment**:
    - Install the required Python packages:
        ```bash
        pip install -r requirements.txt
        ```

3. **Set Up the Database**:
    - Ensure you have PostgreSQL installed and running.
    - Create a database named `Songs_Spotify`.
    - Update the `CONNSTRING` in `app.py` with your PostgreSQL username and password.

4. **Run the Flask Application**:
    ```bash
    python app.py
    ```

5. **Access the Application**:
    - Open a web browser and navigate to `http://localhost:5000` (or the specified port if changed).

6. **Interact with the Visualizations**:
    - Use the dropdown menu to select different charts and visualizations.
    - Explore the insights provided by the charts on song popularity and other metrics.


## Visualizations

The application provides several visualizations to help users understand the Spotify songs data:

1. **Chart 1**: Danceability VS Popularity
   - Endpoint: `/api/chart1`

2. **Chart 2**: Duration VS Popularity
   - Endpoint: `/api/chart2`

3. **Chart 3**: Loudness VS Popularity
   - Endpoint: `/api/chart3`

4. **Pie Chart**: Explicit Content
   - Endpoint: `/api/piechart`
  
5. **Pie Chart**: Songs Per Year
   - Endpoint: `/api/piechart2`
  
6. **Timeline/Bar Chart**: Total amount of songs per year and listing of the top 10,
   - Code written inside index.html for troublehsooting (created with charts.js).


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
