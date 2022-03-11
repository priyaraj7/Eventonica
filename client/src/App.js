import calendar from "./calendar.png";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import Users from "./components/Users/Users";
import Events from "./components/Events";
import { Container } from "@mui/material";

function App() {
  return (
    <>
      <Container>
        <div className="App">
          {/* <Header /> */}
          <header>
            <img src={calendar} alt="Calendar Star Logo" />
            <h1>Eventonica</h1>
          </header>

          <main>
            <div className="user-and-events">
              <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/events/*" element={<Events />} />
              </Routes>
            </div>
          </main>

          <Footer />
        </div>
      </Container>
    </>
  );
}

export default App;
