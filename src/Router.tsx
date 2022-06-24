import { BrowserRouter, Switch,Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import NotFound from "./routes/NotFound";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path='/:coinId'>
          <Coin />
        </Route>
        <Route path='/'>
          <Coins />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
