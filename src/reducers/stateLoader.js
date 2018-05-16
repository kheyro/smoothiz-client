import React from 'react';

class StateLoader {
  loadState() {
    try {
      const serializedState = localStorage.getItem('auth');
      if (serializedState === null) {
        return undefined;
      } else {
        return JSON.parse(serializedState);
      }
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
