import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
    <Navbar />

    <main className="flex-shrink-0">
      <div className="container">
        <h1 className="mt-5">Main Content</h1>
      </div>
    </main>

    <Footer />
    </>
  );
}

export default App;
