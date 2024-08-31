import { NotBot } from '@discordx/utilities'
import type { Interaction, Message } from 'discord.js'
import { IntentsBitField } from 'discord.js'
import { Client } from 'discordx'
import { ErrorHandler } from './guards/error-handler.js'

export const bot = new Client({
    // To use only guild command
    botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

    // Discord intents
    intents: [
        IntentsBitField.Flags.Guilds,
        // IntentsBitField.Flags.GuildMembers,
        // IntentsBitField.Flags.GuildMessages,
        // IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildVoiceStates,
        // IntentsBitField.Flags.MessageContent,
    ],

    // Debug logs are disabled in silent mode
    silent: false,

    // Configuration for @SimpleCommand
    // simpleCommand: {
    //   prefix: "!",
    // },

    presence: { status: 'invisible' },
    guards: [NotBot, ErrorHandler],
})

bot.once('ready', () => {
    // Make sure all guilds are cached
    // await bot.guilds.fetch();

    // Synchronize applications commands with Discord
    void bot.initApplicationCommands()

    // To clear all guild commands, uncomment this line,
    // This is useful when moving from guild commands to global commands
    // It must only be executed once
    //
    //  await bot.clearApplicationCommands(
    //    ...bot.guilds.cache.map((g) => g.id)
    //  );

    console.log('Bot started')
})

bot.on('interactionCreate', (interaction: Interaction) => {
    bot.executeInteraction(interaction)
})

bot.on('messageCreate', (message: Message) => {
    void bot.executeCommand(message)
})
