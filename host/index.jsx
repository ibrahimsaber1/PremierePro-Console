// Main function to execute code from the console
function executeConsoleCode(codeString) {
    try {
        // Prepare a function that will evaluate the code and properly format the result
        var result = eval("(function() { try { var result = " + codeString + "; return formatResult(result); } catch(e) { return 'ERROR:' + e.toString(); } })()");
        return result;
    } catch (e) {
        return "ERROR:" + e.toString();
    }
}

// Helper function to format different types of results
function formatResult(result) {
    if (result === undefined) {
        return "undefined";
    } else if (result === null) {
        return "null";
    } else if (typeof result === "string") {
        return '"' + result + '"';
    } else if (typeof result === "number" || typeof result === "boolean") {
        return result.toString();
    } else if (result instanceof Array) {
        return formatArray(result);
    } else if (typeof result === "object") {
        return formatObject(result);
    } else {
        return result.toString();
    }
}

// Format array results
function formatArray(arr) {
    try {
        var result = "[";
        
        // Limit to first 100 items for very large arrays
        var length = Math.min(arr.length, 100);
        var hasMore = arr.length > 100;
        
        for (var i = 0; i < length; i++) {
            if (i > 0) result += ", ";
            
            // Handle circular references and deeply nested structures
            try {
                result += formatResult(arr[i]);
            } catch (e) {
                result += "[Object]";
            }
            
            // Avoid very long results
            if (result.length > 1000) {
                return result + "... (truncated)";
            }
        }
        
        if (hasMore) {
            result += ", ... (" + (arr.length - 100) + " more items)";
        }
        
        return result + "]";
    } catch (e) {
        return "[Error formatting array: " + e.toString() + "]";
    }
}

// Format object results (traverse properties)
function formatObject(obj) {
    try {
        // Special case for Premiere Pro objects that might have a toString method
        if (typeof obj.toString === "function") {
            var stringRepresentation = obj.toString();
            if (stringRepresentation !== "[object Object]") {
                return stringRepresentation;
            }
        }
        
        var result = "{";
        var props = [];
        var propCount = 0;
        
        // Collect properties
        for (var prop in obj) {
            if (propCount >= 20) {
                props.push("... (more properties)");
                break;
            }
            
            try {
                var value = obj[prop];
                var valueStr;
                
                // Handle circular references and deeply nested structures
                try {
                    // For Premiere Pro objects, often just showing the property name is enough
                    if (typeof value === "object" && value !== null) {
                        valueStr = "[Object]";
                    } else {
                        valueStr = formatResult(value);
                    }
                } catch (e) {
                    valueStr = "[Object]";
                }
                
                props.push(prop + ": " + valueStr);
                propCount++;
            } catch (e) {
                props.push(prop + ": [Error accessing property]");
                propCount++;
            }
        }
        
        result += props.join(", ");
        return result + "}";
    } catch (e) {
        return "[Error formatting object: " + e.toString() + "]";
    }
}