var irc = require("irc");
var path = require("path");
var fs = require("fs");
const { Console } = require("console");

var lisp = require("./interpreters/lisp.js");

var config =
{
    channels: ["#fossbay"],
    server: "irc.freenode.com",
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
    else if(text.substr(0, prefix.length + 5) == prefix + "lisp ")
    {
        var result = lisp.parse(text.substr(prefix.length + 5, text.length));
        bot.send("PRIVMSG", channel, result != null ? result.toString() : "Error!");
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
