function parse(program)
{
    tokens = tokenize(program);
    
    if(tokens[0] == "(")
    {
        var result = parseFunction(program, 0);
        if(result == null)
            return null;
        
        return result[0];
    }
    else
    {
        return null;
    }

}

function parseFunction(program, i)
{
    i++;
    switch(tokens[i])
    {
        case "+":
        {
            i++;
            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i);
                if(result == null)
                    return null;
            }

            var a = parseFloat(tokens[i]);
            i++;
            while(true)
            {
                if(i == tokens.length)
                    return null;
                
                var b;
                
                if(tokens[i] == ")")
                {
                    break;
                }
                else if(tokens[i] == "(")
                {
                    var result = parseFunction(program, i);
                    if(result == null)
                        return null;

                    b = result[0];
                    i = result[1];
                }
                else
                {
                    b = parseFloat(tokens[i]);
                }
            
                a += b;
                i++;
            }

            return [a, i];
        } break;

        case "-":
        {
            i++;
            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i);
                if(result == null)
                    return null;
            }

            var a = parseFloat(tokens[i]);
            i++;
            while(true)
            {
                if(i == tokens.length)
                    return null;
                
                var b;
                
                if(tokens[i] == ")")
                {
                    break;
                }
                else if(tokens[i] == "(")
                {
                    var result = parseFunction(program, i);
                    if(result == null)
                        return null;

                    b = result[0];
                    i = result[1];
                }
                else
                {
                    b = parseFloat(tokens[i]);
                }
            
                a -= b;
                i++;
            }

            return [a, i];
        } break;

        case "*":
        {
            i++;
            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i);
                if(result == null)
                    return null;
            }

            var a = parseFloat(tokens[i]);
            i++;
            while(true)
            {
                if(i == tokens.length)
                    return null;
                
                var b;
                
                if(tokens[i] == ")")
                {
                    break;
                }
                else if(tokens[i] == "(")
                {
                    var result = parseFunction(program, i);
                    if(result == null)
                        return null;

                    b = result[0];
                    i = result[1];
                }
                else
                {
                    b = parseFloat(tokens[i]);
                }
            
                a *= b;
                i++;
            }

            return [a, i];
        } break;

        case "/":
        {
            i++;
            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i);
                if(result == null)
                    return null;
            }

            var a = parseFloat(tokens[i]);
            i++;
            while(true)
            {
                if(i == tokens.length)
                    return null;
                
                var b;
                
                if(tokens[i] == ")")
                {
                    break;
                }
                else if(tokens[i] == "(")
                {
                    var result = parseFunction(program, i);
                    if(result == null)
                        return null;

                    b = result[0];
                    i = result[1];
                }
                else
                {
                    b = parseFloat(tokens[i]);
                }
            
                a /= b;
                i++;
            }

            return [a, i];
        } break;

        case "mod":
        case "rem":
        {
            i++;
            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i);
                if(result == null)
                    return null;
            }

            var a = parseFloat(tokens[i]);
            i++;
            while(true)
            {
                if(i == tokens.length)
                    return null;
                
                var b;
                
                if(tokens[i] == ")")
                {
                    break;
                }
                else if(tokens[i] == "(")
                {
                    var result = parseFunction(program, i);
                    if(result == null)
                        return null;

                    b = result[0];
                    i = result[1];
                }
                else
                {
                    b = parseFloat(tokens[i]);
                }
            
                a %= b;
                i++;
            }

            return [a, i];
        } break;

        case "pow":
        {
            i++;
            if(tokens[i] == "(")
            {
                var result = parseFunction(program, i);
                if(result == null)
                    return null;
            }

            var a = parseFloat(tokens[i]);
            i++;
            while(true)
            {
                if(i == tokens.length)
                    return null;
                
                var b;
                
                if(tokens[i] == ")")
                {
                    break;
                }
                else if(tokens[i] == "(")
                {
                    var result = parseFunction(program, i);
                    if(result == null)
                        return null;

                    b = result[0];
                    i = result[1];
                }
                else
                {
                    b = parseFloat(tokens[i]);
                }
            
                a **= b;
                i++;
            }

            return [a, i];
        } break;

        default:
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

module.exports =
{
    parse: parse
}
