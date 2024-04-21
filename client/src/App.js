import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import EventList from "./EventList";
import UserProvider from "./UserProvider";
import EventListProvider from "./EventListProvider";
import EventProvider from "./EventProvider";
import EventRoute from "./EventRoute";

function App() {
  return (
    <div style={componentStyle()}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <EventListProvider>
                    <EventList />
                  </EventListProvider>
                }
              />
              <Route
                path="eventDetail"
                element={
                  <EventProvider>
                    <EventRoute />
                  </EventProvider>
                }
              />
              <Route path="*" element={"not found"} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#187bcd",
  };
}

export default App;
