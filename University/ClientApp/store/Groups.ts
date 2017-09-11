import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';


export interface GroupsState {
    isLoading: boolean,
    currentGroups: GroupModel[]
}

export interface GroupModel {
    id: number,
    name: string
}


interface RequestGroupsAction {
    type: 'REQUEST_GROUPS'
}

interface ReceiveGroupsAction {
    type: 'RECEIVE_GROUPS';
    currentGroups: GroupModel[];
}

type KnownAction = RequestGroupsAction | ReceiveGroupsAction;

export const actionCreators = {
    requestGroups: (): AppThunkAction<KnownAction> => (dispatch, getState) => {

        let fetchTask = fetch(`api/Groups`)
            .then(response => response.json() as Promise<GroupModel[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_GROUPS', currentGroups: data });
                });

            addTask(fetchTask);
            dispatch({ type: 'REQUEST_GROUPS'});

    }
};

const unloadedState: GroupsState = { currentGroups: [], isLoading: false };

export const reducer: Reducer<GroupsState> = (state: GroupsState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_GROUPS':
            return {
                currentGroups: state.currentGroups,
                isLoading: true
            };
        case 'RECEIVE_GROUPS':
            return {
                currentGroups: action.currentGroups,
                isLoading: false
            }
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};



