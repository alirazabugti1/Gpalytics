from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import re
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

#Api Calls for Graph's Page
@app.route('/avg_cgpa')
def avg_cgpa():
    df=load_students()
    avg_cgpa = df.groupby('Semester')['Cgpa'].mean().round(2).to_dict()
    return jsonify(avg_cgpa)


@app.route('/api/top_departments_gpa')
def top_departments_gpa():
    df=load_students()
    result = df.groupby('Department')['Cgpa'].mean().reset_index()
    result = result.sort_values(by='Cgpa', ascending=False)
    data = [{'name': row['Department'], 'value': round(row['Cgpa'], 2)} for index, row in result.iterrows()]
    return jsonify(data)


@app.route('/api/student_performance_distribution')
def student_performance_distribution():
    df=load_students()
    bins = [2.0, 2.5, 3.0, 3.5, 4.0]
    labels = ['2.0-2.5', '2.5-3.0', '3.0-3.5', '3.5-4.0']
    df['CgpaRange'] = pd.cut(df['Cgpa'], bins=bins, labels=labels, right=True)
    result = df['CgpaRange'].value_counts().sort_index()
    data = [{'name': index, 'value': int(count)} for index, count in result.items()]
    return jsonify(data)


@app.route('/api/subject_wise_performance')
def subject_wise_performance():
    df=load_students()
    subjects = {}
    for index, row in df.iterrows():
        courses = row['Course Name'].split(',')
        for course in courses:
            course = course.strip()
            if course not in subjects:
                subjects[course] = []
            subjects[course].append(row['Attendance'])
    data = [{'name': subject, 'value': round(sum(att_list)/len(att_list), 2)} for subject, att_list in subjects.items()]
    return jsonify(data)


@app.route('/api/top_performing_students')
def top_performing_students():
    df=load_students()
    result = df[['Name', 'Cgpa']].drop_duplicates().sort_values(by='Cgpa', ascending=False).head(4)
    data = [{'name': row['Name'], 'value': round(row['Cgpa'], 2)} for index, row in result.iterrows()]
    return jsonify(data)


# Load CSV data
data = pd.read_csv("data.csv")
@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_query = request.json.get("query", "").lower()

    # HIGHEST CGPA
    if "highest cgpa" in user_query:
        max_cgpa = data["Cgpa"].max()
        student = data[data["Cgpa"] == max_cgpa].iloc[0]
        return jsonify(response=f"{student['Name']} from {student['Department']} has the highest CGPA of {max_cgpa}.")

    # LOWEST CGPA 
    if "lowest cgpa" in user_query or "low cgpa" in user_query:
        min_cgpa = data["Cgpa"].min()
        student = data[data["Cgpa"] == min_cgpa].iloc[0]
        return jsonify(response=f"{student['Name']} from {student['Department']} has the lowest CGPA of {min_cgpa}.")

    #MATCH BY ROLL NUMBER (ID)
    roll_match = re.search(r'\b(sp\d{2}|fa\d{2})[-\s]?([a-z]+)[-\s]?(\d+)', user_query)
    if roll_match:
        roll_parts = roll_match.groups()
        roll_id = "-".join(part.upper() for part in roll_parts)
        matched = data[data["Rollnumber"].str.upper() == roll_id]
        if not matched.empty:
            student = matched.iloc[0]
            return jsonify(response=f"Student {student['Name']} ({student['Rollnumber']}) from {student['Department']}, CGPA: {student['Cgpa']}.")
        else:
            return jsonify(response="No student found with that ID.")

    # CGPA COMPARISON QUERIES 
    cgpa_match = re.search(r'cgpa\s*(>|<|=)\s*(\d+(\.\d+)?)', user_query)
    if cgpa_match:
        operator, value, _ = cgpa_match.groups()
        value = float(value)
        if operator == ">":
            filtered = data[data["Cgpa"] > value]
        elif operator == "<":
            filtered = data[data["Cgpa"] < value]
        elif operator == "=":
            filtered = data[data["Cgpa"] == value]

        if not filtered.empty:
            names = ", ".join(filtered["Name"].unique())
            return jsonify(response=f"Students with CGPA {operator} {value}: {names}")
        else:
            return jsonify(response=f"No students found with CGPA {operator} {value}.")

    # COURSE COMPLETION
    if "completed" in user_query and "not" not in user_query:
        completed = data[data["Course Completion Status"].str.lower() == "completed"]
        names = ", ".join(completed["Name"].unique())
        return jsonify(response=f"Students who completed their courses: {names}")

    if "not completed" in user_query or "failed" in user_query:
        incomplete = data[data["Course Completion Status"].str.lower() != "completed"]
        names = ", ".join(incomplete["Name"].unique())
        return jsonify(response=f"Students who have not completed their courses: {names}")

    # COUNT OF COMPLETED / NOT COMPLETED 
    if "how many" in user_query:
        if "completed" in user_query:
            count = data[data["Course Completion Status"].str.lower() == "completed"].shape[0]
            return jsonify(response=f"{count} students have completed their courses.")
        if "not completed" in user_query or "failed" in user_query:
            count = data[data["Course Completion Status"].str.lower() != "completed"].shape[0]
            return jsonify(response=f"{count} students have not completed their courses.")

    # SEARCH BY NAME
    name_match = re.search(r'name\s*is\s*(\w+\s*\w*)', user_query)
    if name_match:
        name_query = name_match.group(1).strip().lower()
        matched = data[data["Name"].str.lower().str.contains(name_query)]
        if not matched.empty:
            student = matched.iloc[0]
            return jsonify(response=f"{student['Name']} ({student['Rollnumber']}), CGPA: {student['Cgpa']}, Dept: {student['Department']}")
        else:
            return jsonify(response="No student found with that name.")

    # TOTAL STUDENTS
    if "how many students" in user_query or "total students" in user_query:
        total = data.shape[0]
        return jsonify(response=f"There are {total} students in total.")

    # AVERAGE CGPA 
    if "average cgpa" in user_query:
        avg = round(data["Cgpa"].mean(), 2)
        return jsonify(response=f"The average CGPA is {avg}.")

    # FILTER BY DEPARTMENT 
    dept_match = re.search(r'(bscs|bsse|beee)', user_query)
    if dept_match:
        dept = dept_match.group(1).upper()
        filtered = data[data["Department"].str.upper() == dept]
        if not filtered.empty:
            names = ", ".join(filtered["Name"].unique())
            return jsonify(response=f"Students in {dept}: {names}")
        else:
            return jsonify(response=f"No students found in {dept}.")

    # FALLBACK
    return jsonify(response="❌ I couldn't understand that query. Try asking about CGPA, name, ID, or course completion.")

if __name__ == '__main__':
    app.run(debug=True)
