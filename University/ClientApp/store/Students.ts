import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';


export interface StudentsState {
    isLoading: boolean,
    currentStudents: StudentModel[]
}

export interface StudentModel {
    id: number,
    firstName: string,
    lastName: string,
    dateOfBirth: Date
}


interface RequestStudentsAction {
    type: 'REQUEST_STUDENTS'
}

interface ReceiveStudentsAction {
    type: 'RECEIVE_STUDENTS';
    currentStudents: StudentModel[];
}

interface RemoveStudentAction {
    type: 'REMOVE_STUDENT';
    id: number;
    currentStudents: StudentModel[];
}

type KnownAction = RequestStudentsAction | ReceiveStudentsAction | RemoveStudentAction;

export const actionCreators = {
    requestStudents: (): AppThunkAction<KnownAction> => (dispatch, getState) => {

        let fetchTask = fetch(`api/Students`)
            .then(response => response.json() as Promise<StudentModel[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_STUDENTS', currentStudents: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_STUDENTS' });

    },

        removeStudent: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {

        let fetchTask = fetch(`api/Students/` + id, {
            method: 'DELETE'
        })
            .then(response => response.json() as Promise<StudentModel[]>)
            .then(data => {
                dispatch({ type: 'REMOVE_STUDENT', id, currentStudents: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_STUDENTS' });

    }

};

const unloadedState: StudentsState = { currentStudents: [], isLoading: false };

export const reducer: Reducer<StudentsState> = (state: StudentsState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_STUDENTS':
            return {
                currentStudents: state.currentStudents,
                isLoading: true
            };
        case 'RECEIVE_STUDENTS':
            return {
                currentStudents: action.currentStudents,
                isLoading: false
            };
        case 'REMOVE_STUDENT':
            return {
                currentStudents: state.currentStudents.filter((student) => {
                    return action.id !== student.id;
                }),
                isLoading: false
            }
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};



