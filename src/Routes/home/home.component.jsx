import { Outlet } from "react-router-dom";
import Directory from "../../Components/directory/directory.component"
const Home = () => {
 
    return (
        <div>
            {/* Position of outlet in the code decides where the component will render */}
            <Directory />
            <Outlet/>


        </div>
    );
  };
export default Home;