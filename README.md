# Spotify Songs Visualization

## Purpose

- Analyze and visualize data of Spotify top hits from 1999 to 2019.
- Provide insight into music trends over two decades.
- Facilitate interactive data exploration to discover patterns in popular music. 

The data is stored in a PostgreSQL database and presented using a Flask web application. Users can interact with the visualizations to explore the data.

## Dataset Description

- Data Source: Kaggle
- Number of Records: 1500+

Key Fields:

- Song Title
- Artist
- Year
- Popularity
- Duration
- Explicit (True/False)
- Duration minutes
- Danceability
- Loudness

Tools and Technologies

- Python: Main programming language.
- Flask: Back-end framework.
- SQLAlchemy: ORM for database interaction.
- D3.js, Plotly and Charts.js: Libraries for data visualization.
- PostgreSQL: Database used.
- HTML/CSS and JavaScript: For the user interface.

## Visualizations

The application provides several visualizations to help users understand the Spotify songs data:

1. **Chart 1**: Danceability VS Popularity
2. **Chart 2**: Duration VS Popularity
3. **Chart 3**: Loudness VS Popularity
4. **Pie Chart**: Explicit Content  
5. **Pie Chart**: Songs Per Year
6. **Timeline/Bar Chart**: Total amount of songs per year and listing of the top 10

![image](https://github.com/user-attachments/assets/acdc695d-3e58-49d2-a2b0-0e5d065c2019)
![image](https://github.com/user-attachments/assets/430f0e00-1bad-4eb6-92d4-6278fe9dd734)
![image](https://github.com/user-attachments/assets/8630c235-f329-42d2-8b89-43ccaafe3b19)

## Final thoughts

- This analysis enhances the understanding of music trends over time.
- It provides valuable insights for record labels, producers, and artists to identify what resonates with audiences.
- The data reflects broader cultural and social trends through the lens of popular music.
- The findings can help shape marketing strategies based on popularity trends and audience preferences.

Throught Spotify's top hits from 1999 to 2019, uncovering key trends in song attributes like danceability, loudness, duration, and popularity. The visualizations highlight how musical preferences have evolved over two decades, offering insights for:

🎵 Artists & Producers – Understanding what makes a hit song.
📊 Record Labels – Identifying trends to guide marketing strategies.
🌍 Cultural Analysts – Observing how music reflects societal shifts.

### Key Takeaways
- Popularity is strongly linked to danceability and moderate song duration.
- Loudness trends show shifts in production styles.

🔍 Future Work:

- Expand the dataset to include recent years (2020–present).
- Incorporate machine learning to predict future hits.
- Analyze lyrics for sentiment and thematic trends.

Thanks for checking out this project! Feel free to contribute, fork, or suggest improvements.

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
