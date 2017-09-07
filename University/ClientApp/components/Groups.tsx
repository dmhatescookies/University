import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as groups from '../store/Groups';


let data: groups.GroupModel[] = [];

export default class Groups extends React.Component<RouteComponentProps<{}>, {}>{

    componentWillMount() {
        data = groups.actionCreators.requestGroups();
    }

    public render() {

        return <div>
            <h1>Groups</h1>
            {this.renderGroupsTable()}
        </div>;
    }


    public renderGroupsTable() {

        if (data) {
            return <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(group =>
                        <tr key={group.name}>
                            <td>{group.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        }

    }
}

