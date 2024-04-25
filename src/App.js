import "./App.css";
import { Routes, Route,} from "react-router-dom";
import Home from "./Routes/home/home.component";
import Navigation from "./Routes/home/navigation/navigation.component";
import Authentication from "./Routes/authentication/authentication.component";

const Shop = () => {
  return <p> I am in shop </p>;
};
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>

        {/* When creating nested routes in React Router, a default child route can be rendered on its parent’s path using the index attribute on the child <Route> and omitting path/. */}

      <Route index element ={<Home />}/>
      <Route path="shop" element={<Shop/>}/>
      <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};
export default App;
