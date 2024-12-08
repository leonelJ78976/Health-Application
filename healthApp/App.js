import React, { useState } from 'react';
import Navigation from './Navigation';  

const App = () => {
  const [username, setUsername] = useState(null); 

  return (
    <Navigation username={username} setUsername={setUsername} />
  );
};

export default App;