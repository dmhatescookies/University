import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';



export interface GroupModel {
    id: number;
    name: string;
}

export let currentGroups: GroupModel[];

export const actionCreators = {

    requestGroups() {

        fetch(`api/Groups`)
            .then(response => response.json() as GroupModel[])
            .then(data => currentGroups = data)
            .catch();

        return currentGroups;

    }

};



