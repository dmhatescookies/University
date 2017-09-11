import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as StudentsState from '../store/Students';

type StudentsProps =
    StudentsState.StudentsState
    & typeof StudentsState.actionCreators
    & RouteComponentProps<{ startDateIndex: string }>;

class Students extends React.Component<StudentsProps, {}> {
    componentDidMount() {
        this.props.requestStudents();
    }

    componentDidReceiveProps(nextProps: StudentsProps) {
        this.props.requestStudents();
    }

    public render() {
        return <div>
            <h1>Students</h1>
            {this.renderStudentsTable()}
            {this.props.isLoading ? <span>Loading...</span> : []}
        </div>;
    }

    private renderStudentsTable() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Date of birth</th>
                </tr>
            </thead>
            <tbody>
                {this.props.currentStudents.map(student =>
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.dateOfBirth}</td>
                        <td><button onClick={() => { this.props.removeStudent(student.id) }}>Remove</button></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }

}

export default connect(
    (state: ApplicationState) => state.students,
    StudentsState.actionCreators
)(Students) as typeof Students;
