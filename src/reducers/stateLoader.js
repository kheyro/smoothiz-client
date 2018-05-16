import React from 'react';

class StateLoader {
  loadState() {
    try {
      const serializedState = localStorage.getItem('auth');
      const token = localStorage.getItem('token');
      // token === null to check for token presence, if not, log him out
      if (serializedState === null || token === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }

  saveState(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('auth', serializedState);
    } catch (err) {
      console.log(err);
    }
  }
}

export default StateLoader;
