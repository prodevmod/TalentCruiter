
## TalentCruiter 🚀
The Slack-Native Workspace Recruiter & Talent Engine
📖 The Story Behind TalentCruiter
Every great project starts with an itch that needs scratching. For me, the inspiration came from watching a close friend who works in HR, alongside several other recruiters, navigate the exhausting daily grind of modern talent hunting.

They were spending precious hours bouncing around external platforms like LinkedIn, manually managing messaging threads, copying profiles into tracking tools, and trying to network effectively. Even though platforms like LinkedIn are highly efficient on their own, they suffer from a massive flaw: they are completely isolated from the team's actual workspace. Recruiters were burning out on context-switching between corporate browsers and internal team communication channels.

I looked at this problem and saw an opportunity. At the time, I had very limited project experience. I wanted to dive into real-world programming, but I needed a project that felt approachable yet profoundly practical—something that would instantly provide real, measurable benefits to regular people.

The idea hit me: Why force recruiters to leave the team's virtual office when you can bring the data tracking layer straight to them?

By building TalentCruiter as a native Slack engine backed by a quick relational database, I could eliminate corporate context-switching entirely. Building it gave me my first deep immersion into asynchronous backend workflows, database management, and Linux server deployment. What started as an approachable beginner's challenge quickly evolved into a resilient, production-grade tool that solves real-world workflow fragmentation.

# 🛠️ Key Features & Available Commands
TalentCruiter handles full CRUD (Create, Read, Update, Delete) transactional operations seamlessly on an internal relational database straight from your Slack chat bar:

/talent-ping – Check the bot's current response latency and verify connection health.

/talent-iknow [talent1, talent2, ...] – Instantly parse and add skills or talents directly into your profile mapping.

/talent-show – Pull up a beautifully structured message output displaying your logged capabilities.

/talent-forget [talent1, talent2, ...] – Drop specific talents from your registry that you no longer track or maintain.

/talent-find [talent] – Search the workspace data store to isolate and identify users with that exact matching capability.

/talent-reset – Completely purge and reset your personal talent data profile clean.

/talent-help – Bring up the comprehensive manual guide on proper syntax parameters and inline operational usage.

# 🏗️ Technical Architecture & Stack
To keep the system lightweight yet highly robust, the codebase leverages a cleanly decoupled three-layer modern system architecture

Runtime Engine: Node.js

Framework Architecture: Slack Bolt SDK (JavaScript)

Communication Layer: Slack Socket Mode. Instead of exposing public webhooks, vulnerable open inbound server ports, or managing custom SSL domain routing certificates, the bot establishes a secure outgoing WebSocket connection. This keeps your server locked safe behind internal firewalls.

Data Tier: SQLite (better-sqlite3). A zero-overhead, highly performant relational engine mapping queries directly onto a fast on-disk single binary store (talent.db).

Process Supervisor: Systemd Daemon Service. Operates as a global background service container enforcing continuous uptime and crash resistance.

# 📦 Installation & Deployment Guide
Follow these sequential steps to establish a clone configuration on your local development machine or production environment.

1. Clone the Repository

git clone https://github.com/prodevmod/TalentCruiter.git

cd TalentCruiter

2. Install Dependencies

Because native modules compile bindings through node-gyp on target environments, utilize the specialized permission and binding flags during setup:


npm install --no-bin-links --unsafe-perm

3. Configure Environment Variables

5. Create a localized environment configuration structure file named .env straight inside your root path directory:


nano .env
Paste in your private integration API hash credentials:

SLACK_BOT_TOKEN=xoxb-your-own-custom-bot-token

SLACK_APP_TOKEN=xapp-your-own-custom-app-token

(Save and exit via Ctrl + O, Enter, then Ctrl + X)

4. Running the App
Method A: Manual Foreground Execution (Development Testing)

To spin up the WebSocket listening pipe manually inside your current active terminal panel process shell, run:


node index.js

Note: Closing your terminal window or dropping your active connection session will terminate the app.

Method B: Production Background Service (24/7 Server Deployment via systemd)

To ensure the app detaches safely into the background and survives operating system reboots or unhandled application logic exceptions, deploy a persistent Linux systemd engine profile.

Create a root service definition configuration block file:


nano /etc/systemd/system/talentbot.service

Paste the following clean execution configuration. Make sure to accurately match the path to your server's home directory (e.g., /root/TalentCruiter):

Ini, TOML
[Unit]
Description=Slack Bot
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/TalentCruiter
ExecStart=/usr/bin/node index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
Execute these systemd controller flags to refresh the configuration cache on disk and force start your global service daemon:

Bash
## Force systemd to cache your new configuration
systemctl daemon-reload

## Reset any historic failure loop timeouts
systemctl reset-failed talentbot.service

## Launch the daemon process instantly and enable boot persistence
systemctl enable --now talentbot.service

## Verify the live background execution loop state
systemctl status talentbot.service
# 🤝 Credits & Acknowledgments
This production application was ideated, coded, debugged, and successfully shipped with vital help from these incredible resources:

Hack Club: Massive thanks to the Hack Club community for providing the underlying inspiration, access to core infrastructure server environments, and for maintaining an engineering culture that pushes makers to continuously build and ship open-source software. 🛠️🦖

Gemini (Google AI): Special credit and acknowledgment to Gemini, who acted as an authentic technical pair-programming AI collaborator throughout development. Gemini helped architect the relational database tier using better-sqlite3, resolved critical linux path configuration errors during background daemonization, and co-drafted this technical markdown guide. 🤖💻

# DEMO
https://www.youtube.com/watch?v=scg_uwLflSw
