import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# loading data frame
def load_students():
    df = pd.read_csv("data.csv")
    return df

# returns students list to StudentList page
@app.route('/students', methods=['GET'])
def get_students():
    students_data = load_students()
    return jsonify(students_data.to_dict(orient="records"))

# returns total student count
@app.route('/student-count', methods=['GET'])
def student_count():
    df = load_students()
    total_students = len(df)
    return jsonify({'total_students': total_students})

# returns Average cgpas
@app.route('/student-averagecgpa', methods=['GET'])
def average_cgpa():
    df = load_students()
    cgpa = df['Cgpa'].mean()
    cgpa=round(cgpa,2)
    return jsonify({'cgpa': cgpa})

# returns High cgpa
@app.route('/student-highcgpa', methods=['GET'])
def high_cgpa():
    df = load_students()
    high = df['Cgpa'].max()
    return jsonify({'cgpa': high})

#completion Rate
@app.route('/student-completionrate', methods=['GET'])
def coursecompletionrate():
    df = load_students()

    df['Course List'] = df['Course Name'].apply(lambda x: [c.strip() for c in x.split(',')])
    all_courses = set(course for courses in df['Course List'] for course in courses)
    total_courses = len(all_courses)

    df['Completed Count'] = df['Course List'].apply(len)
    df['Completion Rate'] = df['Completed Count'].apply(lambda x: round((x / total_courses) * 100, 2))

    avg_completion_rate = round(df['Completion Rate'].mean(), 2)

    return jsonify({'completion_rate': avg_completion_rate})


#Faling Students ka fetch Api
@app.route('/student-failing',methods=['GET'])
def fails():
    count = 0
    df = load_students()
    for index, row in df.iterrows():
        if row['Cgpa'] < 2.0:
            count += 1
    return jsonify({"failing_students": count})


#Top Peforming Department
@app.route('/student-topdept', methods=['GET'])
def topdept():
    df = load_students()
    dept_avg = df.groupby('Department')['Cgpa'].mean()
    top_dept = dept_avg.idxmax()

    return jsonify({'top_dept': top_dept})





if __name__ == '__main__':
    app.run(debug=True)
