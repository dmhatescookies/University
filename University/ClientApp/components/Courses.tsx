import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as CoursesState from '../store/Courses';

type CoursesProps =
    CoursesState.CoursesState
    & typeof CoursesState.actionCreators
    & RouteComponentProps<{ startDateIndex: string }>;

class Courses extends React.Component<CoursesProps, {}> {
    componentDidMount() {
        this.props.requestCourses();
    }

    componentDidReceiveProps(nextProps: CoursesProps) {
        this.props.requestCourses();
    }

    public render() {
        return <div>
            <h1>Courses</h1>
            {this.renderCoursesTable()}
        </div>;
    }

    private renderCoursesTable() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {this.props.currentCourses.map(course =>
                    <tr key={course.id}>
                        <td>{course.name}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }

}

export default connect(
    (state: ApplicationState) => state.courses,
    CoursesState.actionCreators
)(Courses) as typeof Courses;
