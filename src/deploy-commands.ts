import { REST, Routes } from 'discord.js';
import { client_id, guild_id, token } from '../config.json';
import fs from 'node:fs';
import path from 'node:path';

const commands = [];

/* Dynamically set the list of commands to client.commands */
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

/* Construct and prepare an instance of the REST module */
const rest = new REST().setToken(token);

/* deploy commands */
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        /* The put method is used to fully refresh all commands in the guild with the current set */
        const data = await rest.put(
            Routes.applicationCommands(client_id),
            { body: commands },
        );

        console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();