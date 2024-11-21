import Counter from "./components/Counter";
import GroceryList from "./components/GroceryList";
export default function App() {
  return (
    <div>
      <GroceryList/>

    </div>
  );
}






/*
function AlertButton({ message, children }) {
    return (
    <button onClick={() => alert(message)}>
    {children}
    </button>
    );
    }
    export default function App() {
    return (
    <div>
    <AlertButton message="Hello!">
    Greet
    </AlertButton>
    <AlertButton message="Goodbye">
    Say Goodbye
    </AlertButton>
    </div>
    );
    }

import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App

*/