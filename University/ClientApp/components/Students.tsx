import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as students from '../store/Students';


let data: students.StudentModel[] = [];

export default class Students extends React.Component<RouteComponentProps<{}>, {}>{

    componentWillMount() {
        data = students.actionCreators.requestStudents();
    }

    public render() {

        return <div>
            <h1>Students</h1>
            {this.renderStudentsTable()}
        </div>;
    }


    public renderStudentsTable() {

        if (data) {
            return <table className='table'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of birth</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(student =>
                        <tr key={student.firstName}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.dateOfBirth}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        }

    }
}

