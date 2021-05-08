var bot = require("../ircbot.js");

function parse(program, channel)
{
    tokens = tokenize(program);
    
    for(var i = 0; i < tokens.length; i++)
    {
        var ret = null;
        if(tokens[i] == "(")
        {
            var result = parseFunction(program, 0, channel);
            if(result == null)
                return null;

            ret = result[0];
            i = result[1];
        }
        else
        {
            bot.send("PRIVMSG", channel, i.toString() + ": error: expected token '('");
            return null;
        }

        return ret;
    }
}

function parseFunction(program, i, channel)
{
    i++;
    switch(tokens[i])
    {
        case "max":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;          
            var b;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;

                b = result[0];
                i = result[1];
            }
            else
            {
                b = parseFloat(tokens[i]);
            }

            if(isNaN(b))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            if(tokens[i] != ")")
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                return null;
            }

            return [Math.max(a, b), i];
        }
        
        case "min":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;          
            var b;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;

                b = result[0];
                i = result[1];
            }
            else
            {
                b = parseFloat(tokens[i]);
            }

            if(isNaN(b))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            if(tokens[i] != ")")
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                return null;
            }

            return [Math.min(a, b), i];
        }

        case "+":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }
            
            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }
            
            i++;
            while(true)
            {
                if(i == tokens.length)
                {
                    bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                    return null;
                }
                
                var b;
                
                if(tokens[i] == ")")
                {
                    break;
                }
                else if(tokens[i] == "(")
                {
                    var result = parseFunction(program, i, channel);
                    if(result == null)
                        return null;
                    
                    b = result[0];
                    i = result[1];
                }
                else
                {
                    b = parseFloat(tokens[i]);
                }
                
                if(isNaN(b))
                {
                    bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                    return null;
                }

                a += b;
                i++;
            }

            return [a, i];
        }

        case "-":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            while(true)
            {
                if(i == tokens.length)
                {
                    bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                    return null;
                }
                
                var b;
                
                if(tokens[i] == ")")
                {
                    break;
                }
                else if(tokens[i] == "(")
                {
                    var result = parseFunction(program, i, channel);
                    if(result == null)
                        return null;

                    b = result[0];
                    i = result[1];
                }
                else
                {
                    b = parseFloat(tokens[i]);
                }

                if(isNaN(b))
                {
                    bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                    return null;
                }
            
                a -= b;
                i++;
            }

            return [a, i];
        }

        case "*":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            while(true)
            {
                if(i == tokens.length)
                {
                    bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                    return null;
                }
                
                var b;
                
                if(tokens[i] == ")")
                {
                    break;
                }
                else if(tokens[i] == "(")
                {
                    var result = parseFunction(program, i, channel);
                    if(result == null)
                        return null;

                    b = result[0];
                    i = result[1];
                }
                else
                {
                    b = parseFloat(tokens[i]);
                }

                if(isNaN(b))
                {
                    bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                    return null;
                }
            
                a *= b;
                i++;
            }

            return [a, i];
        }

        case "/":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            while(true)
            {
                if(i == tokens.length)
                {
                    bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                    return null;
                }
                
                var b;
                
                if(tokens[i] == ")")
                {
                    break;
                }
                else if(tokens[i] == "(")
                {
                    var result = parseFunction(program, i, channel);
                    if(result == null)
                        return null;

                    b = result[0];
                    i = result[1];
                }
                else
                {
                    b = parseFloat(tokens[i]);
                }

                if(isNaN(b))
                {
                    bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                    return null;
                }
            
                a /= b;
                i++;
            }

            return [a, i];
        }

        case "1+":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            if(tokens[i] != ")")
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                return null;
            }

            return [a + 1, i];
        }

        case "1-":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            if(tokens[i] != ")")
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                return null;
            }

            return [a - 1, i];
        }

        case "abs":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            if(tokens[i] != ")")
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                return null;
            }

            return [Math.abs(a), i];
        }

        case "remainder":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;          
            var b;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;

                b = result[0];
                i = result[1];
            }
            else
            {
                b = parseFloat(tokens[i]);
            }

            if(isNaN(b))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            if(tokens[i] != ")")
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                return null;
            }

            return [a % b, i];
        }

        case "modulo":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;          
            var b;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;

                b = result[0];
                i = result[1];
            }
            else
            {
                b = parseFloat(tokens[i]);
            }

            if(isNaN(b))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            if(tokens[i] != ")")
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                return null;
            }

            return [modulo(a, b), i];
        }

        case "quotient":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;          
            var b;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;

                b = result[0];
                i = result[1];
            }
            else
            {
                b = parseFloat(tokens[i]);
            }

            if(isNaN(b))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            if(tokens[i] != ")")
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                return null;
            }

            return [Math.floor(a / b), i];
        }

        case "floor":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            if(tokens[i] != ")")
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                return null;
            }

            return [Math.floor(a), i];
        }

        case "ceiling":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            if(tokens[i] != ")")
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                return null;
            }

            return [Math.ceil(a), i];
        }

        case "truncate":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            if(tokens[i] != ")")
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                return null;
            }

            return [Math.trunc(a), i];
        }

        case "round":
        {
            i++;
            var a;

            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i, channel);
                if(result == null)
                    return null;
                
                a = result[0];
                i = result[1];
            }
            else
            {
                a = parseFloat(tokens[i]);
            }

            if(isNaN(a))
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected numeric value");
                return null;
            }

            i++;
            if(tokens[i] != ")")
            {
                bot.send("PRIVMSG", channel, i.toString() + ": error: expected token ')'");
                return null;
            }

            return [Math.round(a), i];
        }

        default:
            bot.send("PRIVMSG", channel, i.toString() + ": error: unexpected token '" + tokens[i] + "'");
            return null;
    }
}

function tokenize(program)
{
    var tokens = program.split("(").join(" ( ").split(")").join(" ) ").split(" ");

    while(true)
    {
        const index = tokens.indexOf("");
        if (index > -1)
            tokens.splice(index, 1);
        else
            break;
    }

    return tokens;
}

function modulo(a, b)
{
    return a - b * Math.floor(a/b)
}

module.exports =
{
    parse: parse
};
