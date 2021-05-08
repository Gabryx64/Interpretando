var irc = require("irc");

var scheme = require("./interpreters/scheme.js");

if(process.argv.length < 4)
{
    console.error("Usage: node ircbot.js {SERVER} \"{CHANNEL1}\" \"[CHANNEL2]\" \"[CHANNEL3]\"...")
    process.exit(-1);
}

process.argv.shift();
process.argv.shift();

var config =
{
    server: process.argv.shift(),
    channels: process.argv,
    botName: "Interpretando",
    userName: "interpret",
    autoRejoin: false,
    autoConnect: true,
    floodProtection: true,
    floodProtectionDelay: 3000
};
 
var bot = new irc.Client(config.server, config.botName, { channels: config.channels, userName: config.userName});
var prefix = ";";
 
function OnMessage(from, channel, text, message)
{
    console.log(channel + ">", from + ">", text);
    
    if(text == prefix + "info")
    {
        bot.send("PRIVMSG", channel, "Interpretando - An IRC Bot that inteprets code");
        bot.send("PRIVMSG", channel, "Made by Gabryx86_64");
    }
    if(text == prefix + "help")
    {
        bot.send("PRIVMSG", channel, "Interpretando - An IRC Bot that inteprets code");
        bot.send("PRIVMSG", channel, "Usage: \";{language} {code}\"");
        bot.send("PRIVMSG", channel, "Languages: scheme");
        bot.send("PRIVMSG", channel, "Error format: \"{token index}: error: {error}\"");
        bot.send("PRIVMSG", channel, "Other commands:");
        bot.send("PRIVMSG", channel, "    - ;info -> sends info about Interpretando");
        bot.send("PRIVMSG", channel, "    - ;help -> sends usages, languages and commands list");
    }
    else if(text.substr(0, prefix.length + 7) == prefix + "scheme ")
    {
        var result = scheme.parse(text.substr(prefix.length + 7, text.length), channel);
        if(result != null)
            bot.send("PRIVMSG", channel, isNaN(result) ? result : result.toString());
    }
}
bot.addListener("message", OnMessage);
bot.addListener("action", OnMessage);
 
function OnJoin(channel, nick, msgobj)
{
    if (nick.toLowerCase() == config.botName.toLowerCase())
    {
        console.log("Bot has joined channel", channel);
    }
}
bot.addListener("join", OnJoin);
 
function OnError(message)
{
    console.log("IRC Error:", message);
}
bot.addListener("error", OnError);

function send(command, channel, str)
{
    bot.send(command, channel, str);
}

module.exports.send = send;
