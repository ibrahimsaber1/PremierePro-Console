// Execute code and return the result
function executeCode(code) {
    try {
        var result = eval(code);
        return formatOutput(result);
    } catch (e) {
        return "ERROR:" + e.toString();
    }
}

// Format the output
function formatOutput(result) {
    if (result === undefined) {
        return "undefined";
    } else if (result === null) {
        return "null";
    } else if (typeof result === "object") {
        try {
            // Special case for Premiere Pro objects with toString
            if (typeof result.toString === "function") {
                var str = result.toString();
                if (str !== "[object Object]") {
                    return str;
                }
            }
            
            // For arrays
            if (result instanceof Array) {
                var arrayStr = "[";
                for (var i = 0; i < Math.min(result.length, 50); i++) {
                    if (i > 0) arrayStr += ", ";
                    arrayStr += formatOutput(result[i]);
                }
                if (result.length > 50) arrayStr += ", ...";
                return arrayStr + "]";
            }
            
            // For objects
            var objStr = "{";
            var props = [];
            var count = 0;
            
            for (var prop in result) {
                if (count >= 15) {
                    props.push("...");
                    break;
                }
                
                try {
                    props.push(prop + ": " + formatOutput(result[prop]));
                } catch (e) {
                    props.push(prop + ": [Object]");
                }
                
                count++;
            }
            
            return objStr + props.join(", ") + "}";
        } catch (e) {
            return "[Object]";
        }
    } else {
        return result.toString();
    }
}