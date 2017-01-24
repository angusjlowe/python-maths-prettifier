from __future__ import division
import string
from flask import Flask
from flask import render_template
from flask import request
from flask import json
from sympy import latex

app = Flask(__name__)
letters = string.lowercase[:26]
allCharacters = ''
for c in letters:
    allCharacters += c + " "
a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z = symbols(allCharacters)


@app.route("/")
def index():
    return render_template('home.html')

@app.route("/", methods=["POST"])
def convert():
    pythonEquation = request.json['input']
    try:
        latexEquation = latex(eval(pythonEquation))
        return json.dumps({'status': 'OK', 'equation': latexEquation})
        print latexEquation
    except:
        return json.dumps({'status': 'err', 'equation': ' '})

if __name__ == '__main__':
     app.debug = True
     port = int(os.environ.get("PORT", 5000))
     app.run(host='0.0.0.0', port=port)
