import logo from './logo.svg';
import './App.css';
import MultiAxisLine from './MultiAxisLine'

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Cloudflare-powered <code>open-source</code> uptime monitor <br />
          and status page made with ♥ by Ahmed Hany
        </p>
        <MultiAxisLine />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github repo
        </a>
      </header>
    </div>
  );
}

export default App;
