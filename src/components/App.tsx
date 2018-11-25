import * as React from "react";

// components
import Sleep from "./pages/sleep";
import Stayup from "./pages/stayup";
import Header from "./modules/Header";
import Bank from "./pages/bank";
import Settings from "./pages/settings";

import { BrowserRouter, Route, Switch } from "react-router-dom";

interface State {
  sleeping: boolean;
}

export default class App extends React.Component<{}, State> {

  constructor(props) {
    super(props);

    this.state = {
      sleeping: false
    }
  }

  componentDidMount() {
    window.addEventListener("deviceorientation", this.deviceorientationHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("deviceorientation", this.deviceorientationHandler);
  }

  updateSleepStatus = (status: boolean) => () => {
    this.setState({
      sleeping: status
    })
  };

  deviceorientationHandler = (e) => {
    let { beta } = e;
    if(beta < 0) {
      beta *= -1;
    }
    this.setState({
      sleeping: !!(beta >= 150)
    })
  }

  render() {
    const Comp = this.state.sleeping ? Sleep : Stayup;
    return (
      <div className={`app-container ${this.state.sleeping ? 'sleep' : 'stayup'}`}>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={Comp} />
            <Route exact={true} path="/bank" component={Bank} />
            <Route exact={true} path="/settings" component={Settings} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}