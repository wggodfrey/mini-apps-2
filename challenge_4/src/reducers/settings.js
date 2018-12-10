const defaultSettings= {
  size: 20,
  difficulty: 20,
} 

const settingsReducer = (state = defaultSettings, action) => {
  switch (action.type) {
    
    case 'UPDATE_SETTINGS':
      return action.payload;

    default:
      return state;

  }
}

export default settingsReducer;

