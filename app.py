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

@app.route('/api')
def api():

    with engine.connect() as conn:

        findf=pd.read_sql('Select * From met_clean',con=conn)
        dfgroup=findf[['quality','residual sugar']].groupby('quality').mean()
        dfgroup.reset_index(inplace=True)

    return dfgroup.to_json(orient='records')