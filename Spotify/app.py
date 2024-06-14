from flask import Flask,render_template
from config import CONNSTRING

from sqlalchemy import create_engine
import pandas as pd

engine=create_engine(CONNSTRING)

app = Flask(__name__,static_folder='static',template_folder='templates')

@app.route("/")
def hello_world():
    return render_template('index.html')

@app.route('/link')
def link():
    return render_template('link.html')

#@app.route('/api')
# def api():

#     with engine.connect() as conn:

#         findf=pd.read_sql('Select * From songs',con=conn)

#     return dfgroup.to_json(orient='records')

@app.route('/api/chart1')
def chart1_data():
    with engine.connect() as conn:
        df = pd.read_sql('SELECT distinct(explicit) as "Explicit", count(song) as "Numberexplicit" FROM songs group by Explicit', con=conn)  # Modify query as needed
    return df.to_json(orient='records')

@app.route('/api/chart2')
def chart2_data():
    with engine.connect() as conn:
        df = pd.read_sql('SELECT * FROM songs', con=conn)  # Modify query as needed
    return df.to_json(orient='records')

@app.route('/api/chart3')
def chart3_data():
    with engine.connect() as conn:
        df = pd.read_sql('SELECT * FROM songs', con=conn)  # Modify query as needed
    return df.to_json(orient='records')

@app.route('/api/piechart')
def piechart_data():
    with engine.connect() as conn:
        df = pd.read_sql('SELECT distinct(explicit) as "Explicit", count(song) as "Numberexplicit" FROM songs group by Explicit', con=conn)  # Modify query as needed
    return df.to_json(orient='records')

if __name__ == '__main__':
    app.run(debug=True)