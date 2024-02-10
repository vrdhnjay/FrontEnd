import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import List from "./routes/List";
import NotFound from "./routes/NotFound";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieSecure: true,
});
function App() {
  return (
    <AuthProvider store={store}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<AuthOutlet fallbackPath="/login" />}>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<List />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
