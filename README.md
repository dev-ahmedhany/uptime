# uptime

<!--start: description-->

**uptime** monitor and status page, powered by Cloudflare Worker. It's made with 💖 by [Ahmed Hany](https://github.com/dev-ahmedhany).

<!--end: description-->

## 💝 live DEMO

[Aswan University monitor](https://uptime.aswu.workers.dev/).

<!--start: docs-->

## ⭐ How it works

- Cloudflare Worker is used as an uptime monitor
  - Every 2 minutes, a Worker visits your website to make sure it's up
  - Response time is recorded every visit and saved to KV
  - Graphs of response time are generated every visit
- GitHub Files are used for the status website
  - A simple, beautiful, and accessible react page
  - Fetches data from The Same Worker

## 👩‍💻 Documentation

TODO

<!--end: docs-->

## 📄 License

- Code: [MIT](./LICENSE) © [Ahmed Hany](https://github.com/dev-ahmedhany)
