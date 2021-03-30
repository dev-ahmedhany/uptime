import './App.css';
import MultiAxisLine from './MultiAxisLine'

function App() {
  return (
    <div className="App">
      <p>
        Cloudflare <code>Worker</code> uptime monitor<br />
          and status page made with 💖 by <a style={{ color: "white" }} href="https://github.com/dev-ahmedhany">Ahmed Hany</a>
      </p>
      <MultiAxisLine />
      <br />
      <a
        className="App-link"
        href="https://github.com/dev-ahmedhany/uptime"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github repo
        </a>
      <br />
    </div>
  );
}

export default App;
