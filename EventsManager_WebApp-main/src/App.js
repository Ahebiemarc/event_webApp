import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import SingleEvent from "./screens/SingleEvent";
import UserProfile from "./screens/UserProfile";
import Events from "./screens/Events";
import Signup from "./screens/Signup";
import Page404 from "./screens/Page404";
import About from './screens/About';
import Contact from "./screens/Contact";
import PageTitle from "./components/PageTitle";
import UpdateProfile from "./screens/UpdateProfile";
import UpdateEvent from "./screens/UpdateEvent";

function App() {


 

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={
        <>
        <PageTitle title="évènement Acceuil | Voici le site" />
        <Home />
        </>
        } />
        <Route path="/profile" element={
        <>
        <PageTitle title="Profile  | Votre Profile" />
        <UserProfile />
        </>
        } />
        <Route path="/update-profile" element={
        <>
        <PageTitle title="Modifier son Profile  | Vous pouvez modifier votre Profile" />
        <UpdateProfile />
        </>
        } />
        <Route path="/events" element={
        <>
        <PageTitle title="évènements | Voici les évènements disponible" />
        <Events />
        </>
        } />
        <Route path="/event/:id" element={
        <>
        <PageTitle title="évènement | en savoir plus" />
        <SingleEvent />
        </>
        } />
      
        <Route path="/update-event/:id" element={
        <>
        <PageTitle title="ton évènement | post ton évènement" />
        <UpdateEvent />
        </>
        } />
        <Route path="/signup" element={
        <>
        <PageTitle title="Inscription | Incris toi pour plus d'avantage" />
        <Signup />
        </>
        } />
        <Route path="/about" element={
        <>
        <PageTitle title="A propos de nous | Veuillez en savoir plus sur nous" />
        <About />
        </>
        } />
        <Route path="/contact-us" element={
        <>
        <PageTitle title="Nous contactz | Vous pouvez nous contacter" />
        <Contact />
        </>
        } />
        
        <Route path="*" element={
        <>
        <PageTitle title="Page 404| Service indisponible" />
        <Page404 />
        </>
        }/>

        
      </Routes>

    </BrowserRouter>
  );
}

export default App;
