import React from "react"
import { HashRouter, Route, Switch } from "react-router-dom"
import HomePage from "./components/home-page"
import NoMatchPage from "./components/404-page"
import TopHeadline from "./components/top-headline"
import "rsuite/dist/styles/rsuite-default.css"

function App() {
  return (
    <div>
      <HashRouter basename="/">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/topheadline" component={TopHeadline} />
          <Route component={NoMatchPage} />
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
