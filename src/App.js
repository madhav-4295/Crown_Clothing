import "./App.css";
import { Routes, Route,} from "react-router-dom";
import Home from "./Routes/home/home.component";
import Navigation from "./Routes/home/navigation/navigation.component";
import Authentication from "./Routes/authentication/authentication.component";
import Shop from "./Routes/shop/shop.component";
import CheckOut from "./Routes/checkout/checkout.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>

        {/* When creating nested routes in React Router, a default child route can be rendered on its parent’s path using the index attribute on the child <Route> and omitting path/. */}

      <Route index element ={<Home />}/>
      <Route path="shop" element={<Shop/>}/>
      <Route path="auth" element={<Authentication />} />
      <Route path="checkout" element = {<CheckOut/>} />
      </Route>
    </Routes>
  );
};
export default App;
