import calendar from "./calendar.png";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Users from "./components/Users/Users";
import Events from "./components/Events";
import { AppBar, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Button, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";

function App() {
  return (
    <>
      <Container>
        <div className="App">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: "#2E3B55" }}>
              <Toolbar>
                <img src={calendar} alt="Calendar Star Logo" />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Eventonica
                </Typography>
                {/* <h1>/h1> */}

                <Button
                  href="/"
                  fullWidth={true}
                  style={{ justifyContent: "flex-end" }}
                >
                  users
                </Button>
                <Button
                  href="/events"
                  fullWidth={true}
                  style={{ justifyContent: "flex-end" }}
                >
                  events
                </Button>
              </Toolbar>
            </AppBar>
          </Box>

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
