import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Page from './Page';
import Admin from './Admin';
import Uti from './Uti';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/Admin" element={<Admin />} />
          <Route path="/_Uti" element={<Uti />} />
          <Route path="/" element={<Page home={true} />} />
          <Route path="/:id" element={<Page home={false} />} />
          <Route path="*" element={<Page home={true} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
