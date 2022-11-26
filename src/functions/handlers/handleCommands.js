const { REST } = require(`@discordjs/rest`)
const { Routes } = require(`discord-api-types/v9`);
const fs = require(`fs`);
const config = require(`../../config.json`);
commandArray = [];

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(`.js`));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        client.commands.set(command.name, command);
        commandArray.push(command);
        console.log(
          `Command: ${folder}/${file} - ${command.name} has pass though the handler!`
        );
      }
    }

    const rest = new REST({ version: `9` }).setToken(process.env.token);
    try {
      console.log(`Started refreshing application slash commands!`);
      console.log(commandArray)

      /*await rest.put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), {
        body: commandArray
      });*/
      client.guilds.cache.get(config.GUILD_ID).commands.set(commandArray)

      console.log(`Successfully reloaded application slash commands!`);
    } catch (error) {
      console.error(error);
    }
  };
};
