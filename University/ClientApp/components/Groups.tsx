import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as GroupsState from '../store/Groups';

type GroupsProps =
    GroupsState.GroupsState
    & typeof GroupsState.actionCreators 
    & RouteComponentProps<{ startDateIndex: string }>; 

class Groups extends React.Component<GroupsProps, {}> {
    componentDidMount() {
        this.props.requestGroups();
    }

    componentDidReceiveProps(nextProps: GroupsProps) {
        this.props.requestGroups();
    }

    public render() {
        return <div>
            <h1>Groups</h1>
            {this.renderGroupsTable()}
            {this.props.isLoading ? <span>Loading...</span> : []}
        </div>;
    }

    private renderGroupsTable() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {this.props.currentGroups.map(group =>
                    <tr key={group.id}>
                        <td>{group.id}</td>
                        <td>{group.name}</td>
                        <td><button onClick={() => { this.props.removeGroup(group.id) }}>Remove</button></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }

}

export default connect(
    (state: ApplicationState) => state.groups,
    GroupsState.actionCreators                
)(Groups) as typeof Groups;
