import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/students"
          element={<StudentList />}
        />

        <Route
          path="/add"
          element={<AddStudent />}
        />

        <Route
          path="/edit/:id"
          element={<EditStudent />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;