import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Customer from "./Pages/Customer/Customer";
import Appointment from "./Pages/Appointment/Appointment";
import Report from "./Pages/Report/Report";
import Vaccine from "./Pages/Vaccine/Vaccine";
import Doctor from "./Pages/Doctor/Doctor";
import Animal from "./Pages/Animal/Animal";

function App() {
  return (
    <Router>
    <Navbar />
    <div>
      <Switch>
        <Route path="/appointment">{<Appointment />}</Route>
        <Route path="/report">{<Report />}</Route>
        <Route path="/vaccine">{<Vaccine />}</Route>
        <Route path="/doctor">{<Doctor />}</Route>
        <Route path="/animal">{<Animal />}</Route>
        <Route path="/customer">{<Customer />}</Route>
        <Route path="/">{<Home />}</Route>
      </Switch>{" "}
    </div>
  </Router>
  );
}

export default App;
