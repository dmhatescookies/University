import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';


export interface CoursesState {
    isLoading: boolean,
    currentCourses: CourseModel[]
}

export interface CourseModel {
    id: number,
    name: string
}


interface RequestCoursesAction {
    type: 'REQUEST_COURSES'
}

interface ReceiveCoursesAction {
    type: 'RECEIVE_COURSES';
    currentCourses: CourseModel[];
}

interface RemoveCoursesAction {
    type: 'REMOVE_COURSE';
    id: number;
    currentCourses: CourseModel[];
}

type KnownAction = RequestCoursesAction | ReceiveCoursesAction | RemoveCoursesAction;

export const actionCreators = {
    requestCourses: (): AppThunkAction<KnownAction> => (dispatch, getState) => {

        let fetchTask = fetch(`api/Courses`)
            .then(response => response.json() as Promise<CourseModel[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_COURSES', currentCourses: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_COURSES' });

    },

    removeCourse: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {

        let fetchTask = fetch(`api/Courses/` + id, {
            method: 'DELETE'
        })
            .then(response => response.json() as Promise<CourseModel[]>)
            .then(data => {
                dispatch({ type: 'REMOVE_COURSE', id, currentCourses: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_COURSES' });

    }

};

const unloadedState: CoursesState = { currentCourses: [], isLoading: false };

export const reducer: Reducer<CoursesState> = (state: CoursesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_COURSES':
            return {
                currentCourses: state.currentCourses,
                isLoading: true
            };
        case 'RECEIVE_COURSES':
            return {
                currentCourses: action.currentCourses,
                isLoading: false
            }
        case 'REMOVE_COURSE':
            return {
                currentCourses: state.currentCourses.filter((course) => {
                    return action.id !== course.id;
                }),
                isLoading: false
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};



