import React from 'react';
import Route from './components/Route';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TaskManager from './components/TaskManager';

const App = () => {
  return (
    <>
    <Navbar />

    <div className="container-fluid">
      <div className="row">
        <Sidebar />
      </div>
    </div>

    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <Route path="/">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Articles</h1>
          <div className="btn-toolbar mb-2 mb-md-0"></div>
        </div>
      </Route>
      <Route path="/tasks">
        <TaskManager />
      </Route>
    </main>
    </>
  );
}

export default App;
