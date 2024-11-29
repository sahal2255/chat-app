import { BrowserRouter } from "react-router-dom"
import Navbar from "./component/Navbar"
import Router from "./routes/Router"

function App() {

  return (
    <>
     <BrowserRouter >
     <Navbar />
      <Router />
     </BrowserRouter>
      
    </>
  )
}

export default App
