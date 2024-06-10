import { Routes, Route } from "react-router-dom";
import Container from '@mui/material/Container';
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Customer from "./Pages/Customer/Customer";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/customer" element={<Customer/>}/>

          </Routes>
      </Container>
    </>
  );
}

export default App;
