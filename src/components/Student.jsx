import React from 'react'

const Student = ({student : {name, email, id}, index, deleteStudent}) => {
    return (
        <div className={"student"}>
            <p>
                {index + 1}: {name}, {email}
                <button className={"delete-button"} onClick={() => deleteStudent(id)}>❌</button>
            </p>

        </div>
    )
}
export default Student