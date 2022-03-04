import calendar from "./calendar.png";
import "./App.css";
import Footer from "./components/Footer";
import Users from "./components/Users/Users";
import Events from "./components/Events/Event";
import { Container } from "@mui/material";

function App() {
  return (
    <Container>
      <div className="App">
        <header>
          <img src={calendar} alt="Calendar Star Logo" />
          <h1>Eventonica</h1>
        </header>

        <main>
          <div className="user-and-events">
            <Users />
            <Events />
          </div>
        </main>

        <Footer />
      </div>
    </Container>
  );
}

export default App;
