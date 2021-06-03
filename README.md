# uptime

<!--start: description-->

**uptime** monitor and status page, powered by Cloudflare Worker. It's made with 💖 by [Ahmed Hany](https://github.com/dev-ahmedhany).

<!--end: description-->

## 💝 live DEMO

[Aswan University monitor](https://dev-ahmedhany.github.io/uptime/).

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

### How To copy this For your sites
- Clone the Project
  - setup github pages
  - Change homepage url at Package.json file to github pages url
- create Cloudflare Worker
  - change this url at the code https://uptime.aswu.workers.dev/API to yours

<!--end: docs-->

## 📄 License

- Code: [MIT](./LICENSE) © [Ahmed Hany](https://github.com/dev-ahmedhany)
