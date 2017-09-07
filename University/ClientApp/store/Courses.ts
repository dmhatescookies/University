import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';



export interface CourseModel {
    id: number;
    name: string;
}

export let currentCourses: CourseModel[]; 

export const actionCreators = {

    requestCourses() {

          fetch(`api/Courses`)
            .then(response => response.json() as CourseModel[])
            .then(data => currentCourses = data)
            .catch();

          return currentCourses;
        
    }

};



