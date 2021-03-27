# uptime

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dev-ahmedhany/uptime)

<!--start: description-->

**Upptime** is the open-source uptime monitor and status page, powered entirely by Cloudflare Worker. It's made with 💚 by your friends at [Ahmed](https://github.com/dev-ahmedhany).

<!--end: description-->


<!--start: docs-->


## ⭐ How it works

- Cloudflare Worker is used as an uptime monitor
  - Every 2 minutes, a Worker visits your website to make sure it's up
  - Response time is recorded every visit and saved to KV
  - TODO: Graphs of response time are generated every day
- TODO: GitHub Issues are used for incident reports
  - An issue is opened if an endpoint is down
  - People from your team are assigned to the issue
  - Incidents reports are posted as issue comments
  - Issues are locked so non-members cannot comment on them
  - Issues are closed automatically when your site comes back up
  - Slack notifications are sent on updates
- TODO: GitHub Pages are used for the status website
  - A simple, beautiful, and accessible PWA is generated
  - Built with Svelte and Sapper
  - Fetches data from this repository using the GitHub API

_uptime is not affiliated to or endorsed by GitHub._


## 💝 Who's using uptime


## 👩‍💻 Documentation


<!--end: docs-->

## 📄 License

- Code: [MIT](./LICENSE) © [Ahmed](https://github.com/dev-ahmedhany)
