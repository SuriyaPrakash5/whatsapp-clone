
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Login from './Login';
import Sidebar from './Sidebar';
import { useStateValue } from './StateProvider';


function App() {

  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">

      {
        !user ? (
          <Login />
        ) : (

          <div className='app__body'>

            <BrowserRouter>
              <Routes>

                <Route path="/rooms/:roomId"
                  element=
                  {
                    <>
                      <Sidebar />
                      <Chat />
                    </>
                  } />
                <Route path="/"
                  element=
                  {
                    <>
                      <Sidebar />
                      <Chat />
                    </>
                  } />
              </Routes>
            </BrowserRouter>



          </div>
        )}

    </div>
  );
}

export default App;
