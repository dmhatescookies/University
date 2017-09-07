import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';



export interface StudentModel {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
}

export let currentStudents: StudentModel[]; 

export const actionCreators = {

    requestStudents() {

          fetch(`api/Students`)
            .then(response => response.json() as StudentModel[])
            .then(data => currentStudents = data)
            .catch();

          return currentStudents;
        
    }

};



