import React, {FC} from 'react'
import {HashRouter} from "react-router-dom";
import Nav from "./components/Nav";
import RouterConfig from "./components/RouterConfig";

const App: FC = () => {
  return (
    <HashRouter>
      <Nav/>
      <RouterConfig />
    </HashRouter>
  );
}

export default App;
