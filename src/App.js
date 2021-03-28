import './App.css';
import MultiAxisLine from './MultiAxisLine'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Cloudflare <code>Worker</code> uptime monitor<br />
          and status page made with 💚 by Ahmed Hany
        </p>
        <MultiAxisLine />
        <a
          className="App-link"
          href="https://github.com/dev-ahmedhany/uptime"
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
