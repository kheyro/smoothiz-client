class StateLoader {
  static loadState() {
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

  static saveState(state) {
    try {
      const serializedState = JSON.stringify({ auth: state.auth });
      localStorage.setItem('auth', serializedState);
    } catch (err) {
      console.log(err);
    }
  }
}

export default StateLoader;
