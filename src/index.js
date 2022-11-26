const { Client, Collection, GatewayIntentBits } = require(`discord.js`);
const { Player } = require("discord-player");
const fs = require(`fs`);
const config = require(`./config.json`);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
  disableMentions: "everyone",
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

require(`dotenv`).config();

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(`.js`));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

player = new Player(client, config.music.discordPlayer);

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(process.env.TOKEN);
