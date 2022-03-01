import calendar from "./calendar.png";
import "./App.css";
import Footer from "./components/Footer";
import Users from "./components/User/Users";
import Event from "./components/Event/Event";

function App() {
  return (
    <div className="App">
      <header>
        <img src={calendar} alt="Calendar Star Logo" />
        <h1>Eventonica</h1>
      </header>

      <main>
        <div className="user-and-events">
          <Users />
          <Event />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
