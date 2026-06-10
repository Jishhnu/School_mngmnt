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
import ProtectedRoute from "./components/ProtectedRoute";

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
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <StudentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditStudent />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;