import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ExpenseDashboardPage from '../pages/ExpenseDashboardPage';
import AddExpensePage from '../pages/AddExpensePage';
import EditExpensePage from '../pages/EditExpensePage';
import NotFoundPage from '../pages/NotFoundPage';
import Header from '../components/Header';

const LinkingPages = () => (
  <BrowserRouter>
    <div>
      <Header/>
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default LinkingPages;
