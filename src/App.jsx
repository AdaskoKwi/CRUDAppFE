import React, {useEffect, useState} from 'react'
import Student from "./components/Student.jsx";

const App = () => {
    const [studentList, setStudentList] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [dataChanged, setDataChanged] = useState(false);

    const API_URL = `http://localhost:8080/api/v1/students`;

    const handleStudentNameChange = (event) => {
        event.preventDefault();
        setStudentName(event.target.value);
    }

    const handleStudentEmailChange = (event) => {
        event.preventDefault();
        setStudentEmail(event.target.value);
    }

    const deleteStudentData = async (id) => {
        const DELETE_API_URL = API_URL + `/${id}`;

        console.log(DELETE_API_URL);

        try {
            const response = await fetch(DELETE_API_URL, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error("Couldn't delete student data");
            }

            setDataChanged(!dataChanged);

            console.log("Student deleted successfully")
        } catch (error) {
            console.error(error);
        }
    }

    const sendStudentData = async (name, email) => {
        const POST_API_URL = API_URL + `/add`;

        try {
            const response = await fetch(POST_API_URL, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({name: name, email: email})
            });

            if (!response.ok) {
                throw new Error("Couldn't send student data");
            }
            setStudentName("");
            setStudentEmail("");

            setDataChanged(!dataChanged);

            console.log("Student data sent successfully");
        } catch (error) {
            console.error(error);
        }
    }

    const getStudentData = async () => {
        try {
            const response = await fetch(API_URL, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error("Couldn't fetch from API.");
            }

            const data = await response.json();
            setStudentList(data);

            console.log("Student data fetched successfully");
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getStudentData();
    }, [dataChanged]);


    return (
        <div className={"app-container"}>
            <header>
                <h1>Spring + React CRUD App</h1>
            </header>

            <section>
                <div className={"input-form"}>
                    <form>
                        <input
                            autoFocus={true}
                            type="text"
                            placeholder="Student full name"
                            value={studentName}
                            onChange={handleStudentNameChange}
                        />
                        <input
                            type="text"
                            placeholder="Student email"
                            value={studentEmail}
                            onChange={handleStudentEmailChange}
                        />
                        <button
                            onClick={() => sendStudentData(studentName, studentEmail)}
                            type={"button"}>Add Student
                        </button>
                    </form>
                </div>

                <div className={"student-list"}>
                    {studentList.length > 0 ?
                        studentList.map((student, index) => (
                            <Student
                                student={student}
                                index={index}
                                deleteStudent={deleteStudentData}
                            />
                        ))
                        : ''}
                </div>
            </section>
        </div>
    )
}
export default App
