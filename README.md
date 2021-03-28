# uptime

<!--start: description-->

**Upptime** is the open-source uptime monitor and status page, powered entirely by Cloudflare Worker. It's made with 💚 by [Ahmed Hany](https://github.com/dev-ahmedhany).

<!--end: description-->


<!--start: docs-->


## ⭐ How it works

- Cloudflare Worker is used as an uptime monitor
  - Every 2 minutes, a Worker visits your website to make sure it's up
  - Response time is recorded every visit and saved to KV
  - Graphs of response time are generated every visit
- TODO: GitHub Issues are used for incident reports
  - An issue is opened if an endpoint is down
  - People from your team are assigned to the issue
  - Incidents reports are posted as issue comments
  - Issues are locked so non-members cannot comment on them
  - Issues are closed automatically when your site comes back up
  - Slack notifications are sent on updates
- GitHub Files are used for the status website
  - A simple, beautiful, and accessible react page is generated
  - Fetches data from The Same Worker

_uptime is not affiliated to or endorsed by GitHub._


## 💝 Who's using uptime


## 👩‍💻 Documentation


<!--end: docs-->

## 📄 License

- Code: [MIT](./LICENSE) © [Ahmed Hany](https://github.com/dev-ahmedhany)
