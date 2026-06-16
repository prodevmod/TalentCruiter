require("dotenv").config();

// Initialize SQLite database
const Database = require("better-sqlite3");
const sqlDb = new Database("talent.db");

sqlDb.exec(`
  CREATE TABLE IF NOT EXISTS user_skills (
    user_id TEXT NOT NULL,
    skill TEXT NOT NULL,
    PRIMARY KEY (user_id, skill)
  );
`);
// Initialize Slack Bolt app
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/talent-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
 });

app.command("/talent-iknow", async ({ command, ack, respond }) => {
  await ack();
  if (!command.text) {
    await respond({ text: "Please provide a list of talents separated by commas." });
    return;
  }
  const talents = command.text.split(",").map((talent) => talent.trim());
  const userId = command.user_id;
  await ack();
  // Test: Respond with the list of talents the user knows
  // await respond({ text: `User <@${userId}> knows the following talents: ${talents.join(", ")}` });

  const insertStatement = sqlDb.prepare("INSERT OR IGNORE INTO user_skills (user_id, skill) VALUES (?, ?)");
  for (const talent of talents) {
    insertStatement.run(userId, talent);

  await respond({ text: `Succesfully saved talents! You know the following talents: ${talents.join(", ")}` });
  }
});

app.command("/talent-show", async ({ command, ack, respond }) => {
  await ack();
  const userId = command.user_id;
  const selectStatement = sqlDb.prepare("SELECT skill FROM user_skills WHERE user_id = ?");
  const rows = selectStatement.all(userId);
  if (rows.length === 0) {
    await respond({ text: "You haven't added any talents yet. Use /talent-iknow to add your talents." });
  } else {
    const talents = rows.map((row) => row.skill);
    await respond({ text: `You know the following talents: ${talents.join(", ")}` });
  }
});

app.command("/talent-forget", async ({ command, ack, respond }) => {
  await ack();
  if (!command.text) {
    await respond({ text: "Please provide a list of talents to forget, separated by commas." });
    return;
  }
  const talentsToForget = command.text.split(",").map((talent) => talent.trim());
  const userId = command.user_id;
  const deleteStatement = sqlDb.prepare("DELETE FROM user_skills WHERE user_id = ? AND skill = ?");
  for (const talent of talentsToForget) {
    deleteStatement.run(userId, talent);
  }
  await respond({ text: `Successfully removed the following talents: ${talentsToForget.join(", ")}` });
});

app.command("/talent-find", async ({ command, ack, respond }) => {
  await ack();
  if (!command.text) {
    await respond({ text: "Please provide a talent to search for." });
    return;
  }
  const talentToFind = command.text.trim();
  const selectStatement = sqlDb.prepare("SELECT user_id FROM user_skills WHERE skill = ?");
  const rows = selectStatement.all(talentToFind);
  if (rows.length === 0) {
    await respond({ text: `No users found with the talent: ${talentToFind}` });
  } else {
    const userMentions = rows.map((row) => `<@${row.user_id}>`);
    await respond({ text: `Users with the talent "${talentToFind}": ${userMentions.join(", ")}` });
  }
});

app.command("/talent-reset", async ({ command, ack, respond }) => {
  await ack();
  const userId = command.user_id;
  const deleteStatement = sqlDb.prepare("DELETE FROM user_skills WHERE user_id = ?");
  deleteStatement.run(userId);
  await respond({ text: "Your talents have been reset." });
});

app.command("/talent-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/talent-ping - Check bot latency
/talent-iknow [talent1, talent2, ...] - Add talents you know
/talent-show - Show your talents
/talent-forget [talent1, talent2, ...] - Remove talents you no longer know
/talent-find [talent] - Find users with a specific talent
/talent-reset - Reset your talents
/talent-help - Show this help message`
  });
});



(async () => {
  await app.start();
  console.log("bot is running!");
})();