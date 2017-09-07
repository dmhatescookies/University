import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as courses from '../store/Courses';


let data: courses.CourseModel[] = [];

export default class Courses extends React.Component<RouteComponentProps<{}>, {}>{

    componentWillMount() {
        data = courses.actionCreators.requestCourses();
    }

    public render() {

        return <div>
            <h1>Courses</h1>
            {this.renderCoursesTable()}
        </div>;
    }


    public renderCoursesTable() {

        if (data) {
            return <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(course =>
                        <tr key={course.name}>
                            <td>{course.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        }

    }
} 

