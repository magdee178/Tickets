const { warn, error, debug } = require("./controllers/logger");
const { Client, Collection, ActivityType } = require("discord.js");
const { version } = require('./package.json');
const { readdirSync } = require("fs");
const { join } = require("path");

if (process.version.slice(1).split(".")[0] < 16) {
    error(`Please update to Node 16 or higher.`);
    process.exit(1);
}

/**
 * The Discord client instance
 * @typedef {Bot} Bot
 * @extends {Client}
 */
class Bot extends Client {
    constructor() {
        super({
            intents: 32767
        });

        const locales = [];
        readdirSync(join(__dirname, 'locales'))
            .filter(file => file.endsWith('.json'))
            .forEach((file) => {
                locales.push(file.replace('.json', ''))
            });

        this.commands = new Collection();
        debug(`Successfully loaded ${locales.length} locales`);
        this.slashCommands = new Collection();
        this.config = require('./config/config.json');
        debug(`Successfully loaded config`);
        this.languages = require('i18n');
        debug(`Successfully loaded languages`);
        
        this.languages.configure({
            locales: locales,
            directory: join(__dirname, 'locales'),
            defaultLocale: 'en',
            retryInDefaultLocale: true,
            objectNotation: true,
            register: global,

            logWarnFn: function(msg) {
                warn(msg);
            },

            logErrorFn: function(msg) {
                error(msg);
            },

            missingKeyFn: function(locale, key) {
                return key;
            },

            mustacheConfig: {
                tags: ["{{", "}}"],
                disable: false
            }
        });
        this.languages.setLocale(this.config.LANGUAGE);
        debug(`Successfully set language to ${this.config.LANGUAGE}`);
        this.version = version;
    }
};

const client = new Bot();
module.exports = client;

// Initializing the project
require("./handler")(client);

client.login(process.env.TOKEN || client.config.TOKEN);
const url = `https://twitch.tv/4egy`
client.on('ready', () => {
       client.user.setStatus("idle")
            const activities_list = [
        `/help`,
              `/ping`,
              `/about`
      ];

      setInterval(() => {
        const index = Math.floor(Math.random() * activities_list.length);
        client.user.setActivity(activities_list[index], { type: 'STREAMING', url: url });
      }, 10000);
  //you can replace "#"
  console.log(`Bot Name: ${client.user.tag}`)
  console.log(`Bot ID: ${client.user.id}`)
  console.log(`guilds: ${client.guilds.cache.size}`)

  const express = require('express');
  const app = express();
  const port = 4000 || 3000;

    app.all('/', (req, res) => {  
      res.send(`Done!`);
      res.end();
});
  const { createLogger, transports, format } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, 'Logs', 'Errors.json') }),
  ],
});

 let antiCrashLogged = false;

process.on('unhandledRejection', (reason, p) => {
  if (!antiCrashLogged) {
    console.error('[antiCrash] :: Unhandled Rejection/Catch');
    console.error(reason, p);
    logger.error('[antiCrash] :: Unhandled Rejection/Catch', { reason, p });
    antiCrashLogged = true;
  }
});

  process.on('uncaughtException', (err, origin) => {
  if (!antiCrashLogged) {
    console.error('[antiCrash] :: Uncaught Exception/Catch');
    console.error(err, origin);
    logger.error('[antiCrash] :: Uncaught Exception/Catch', { err, origin });
    antiCrashLogged = true;
  }
});

  process.on('uncaughtExceptionMonitor', (err, origin) => {
  if (!antiCrashLogged) {
    console.error('[antiCrash] :: Uncaught Exception/Catch (MONITOR)');
    console.error(err, origin);
    logger.error('[antiCrash] :: Uncaught Exception/Catch (MONITOR)', { err, origin });
    antiCrashLogged = true;
  }
});
  
app.listen(port, () => debug(`Bot running on http://localhost:${port}`));
})
          
