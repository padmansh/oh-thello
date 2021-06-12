import "./assets/main.css";
import Landing from "./Othello/Landing";
import Board from "./Othello/Board";
import { Route } from "react-router-dom";
import Instructions from "./Othello/Instructions";

const App = () => {
  return (
    <>
      <Route exact path="/" component={Landing} />
      <Route exact path="/board/:mode" component={Board} />
      <Route exact path="/instructions" component={Instructions} />
    </>
  );
};

export default App;
