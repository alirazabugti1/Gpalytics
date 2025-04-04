import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS

CORS(app)  # React se CORS issue avoid karne ke liye

def load_students():
    df = pd.read_csv("data.csv")
    print(df.head())  # Debugging ke liye print
    return df.to_dict(orient="records")

# API Route: Student List Ka Data Fetch Karne Ke Liye
@app.route('/students', methods=['GET'])
def get_students():
    students_data = load_students()
    return jsonify(students_data)


if __name__ == '__main__':
    app.run(debug=True)
