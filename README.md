
## TalentCruiter 🚀
Basically it is a Slack native app that is designed for recruiters and people who try to network between them and find individuals with certain skills to be able to communicate better and link up quicker than using dozens of apps like LinkedIn, WhatsApp Messenger, and while also being in their the electronic workplace. It's an innovative idea that saves time and helps anyone operate more efficiently.

## Background
Well basically a close relative of mine works as a manager in a company and another very close friend of mine works as an HR agent for a big multinational company. Both people have the same problem: they find it overwhelming to get a grasp of different people from dozens of different apps. This is due to these apps being unfamiliar to them as their work space is heavily based on Slack and maybe some other app.While the idea didn't come to me at first, after a week of brainstorming to make something innovative and efficient and helpful that would be simple enough for me as a beginner to comprehend, it struck me.I got into work and after a week of brainstorming, one hour of coding, half an hour of debugging, and another one and a half hours of optimizing my readme and presentation, here we are. 

##  Live Demo & Testing

A public demo workspace is available for testing TalentCruiter.

### Demo Workspace in Slack

https://hackclub.enterprise.slack.com/archives/C0BAVVCBQTD

### Want to test it?

    1. Open the demo website.
    2. Join the Slack workspace.
    3. Navigate to the demo channel.
    4. Type a few commands and explore the bot's features.

### Notes

* Most commands reply only to the user who runs them.

Have fun testing TalentCruiter! 

---

#  Installation

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/TalentBOT.git
cd TalentBOT
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
SLACK_BOT_TOKEN=your_bot_token
SLACK_APP_TOKEN=your_app_token
GEMINI_API_TOKEN=your_gemini_api_token
DATABASE_PATH=./database.sqlite
```

## 4. Start the Bot

```bash
npm start
```

---

#  Database

TalentCruiter uses SQLite for persistent data storage.

The database is automatically created during the first startup if it does not already exist.

---

#  Production Deployment (systemd)

Create a service file:

```bash
sudo nano /etc/systemd/system/talentbot.service
```

Example configuration:

```ini
[Unit]
Description=TalentBOT Slack Application
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/TalentBOT
ExecStart=/usr/bin/node index.js
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable talentbot
sudo systemctl start talentbot
```

Check service status:

```bash
sudo systemctl status talentbot
```

View logs:

```bash
journalctl -u talentbot -f
```

---

#  Built With

* Node.js
* Slack Bolt
* SQLite

---

#  Commands
/talent-ping – Checks the current latency of the bot to make sure it is connected and responding quickly.

/talent-iknow [talent1, talent2, ...] – Lets you add and save new talents or skills directly onto your user profile in the database.

/talent-show – Displays a clean, formatted list of all the talents you have currently registered under your name.

/talent-forget [talent1, talent2, ...] – Removes specific skills or talents from your profile that you no longer want to track.

/talent-find [talent] – Searches the workspace database to find and list all other users who have registered that specific skill.

/talent-reset – Completely clears out your profile, wiping all your registered talents from the database so you can start fresh.

/talent-help – Pulls up a quick reference message explaining how to use all the commands and their correct spacing syntax.


---

#  What I Learned

This project was created to learn:

Slack

SQLite

JavaScript

Server

DevOps

---

# 📖 Resources Used

* Slack Bolt Documentation
* SQLite Documentation
* Node.js Documentation
* Hack Club Resources

---

#  Credits & Acknowledgments

This project was built, debugged, and shipped with support from the following resources:

### Hack Club

Massive thanks to the Hack Club community for the inspiration, infrastructure server guides, and the constant push to build and ship meaningful open-source software. 

### Gemini (Google AI)

I used gemini for a more efficient search of the SQlite library.

---

#  Author

Made with ❤️ by **Rosario Alexandros Morabito**

---











## Tutorial

https://www.youtube.com/watch?v=scg_uwLflSw

