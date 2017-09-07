import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import Courses from './components/Courses';
import Groups from './components/Groups';
import Students from './components/Students';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={Counter} />
    <Route path='/courses' component={Courses} />
    <Route path='/groups' component={Groups} />
    <Route path='/students' component={Students} />
    <Route path='/fetchdata/:startDateIndex?' component={ FetchData } />
</Layout>;
