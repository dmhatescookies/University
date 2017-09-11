import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as Groups from './Groups';
import * as Courses from './Courses';
import * as Students from './Students';

// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState;
    weatherForecasts: WeatherForecasts.WeatherForecastsState;
    groups: Groups.GroupsState;
    courses: Courses.CoursesState;
    students: Students.StudentsState;

}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    groups: Groups.reducer,
    courses: Courses.reducer,
    students: Students.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
