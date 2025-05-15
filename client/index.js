// Initialize the CSInterface
var csInterface = new CSInterface();

// Get DOM elements
var codeInput = document.getElementById('code-input');
var consoleOutput = document.getElementById('console-output');
var executeButton = document.getElementById('execute-button');
var clearButton = document.getElementById('clear-button');

// Execute code function
function executeCode() {
    var code = codeInput.value.trim();
    if (!code) return;
    
    // Add command to console output
    var commandDiv = document.createElement('div');
    commandDiv.className = 'command';
    commandDiv.textContent = '> ' + code;
    consoleOutput.appendChild(commandDiv);
    
    // Add result placeholder
    var resultDiv = document.createElement('div');
    resultDiv.className = 'result';
    resultDiv.textContent = 'Executing...';
    consoleOutput.appendChild(resultDiv);
    
    // Scroll to bottom
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
    
    // Execute code in ExtendScript
    var encodedCode = encodeURIComponent(code);
    csInterface.evalScript('executeCode(decodeURIComponent("' + encodedCode + '"))', function(result) {
        if (result.startsWith('ERROR:')) {
            resultDiv.className = 'error';
            resultDiv.textContent = result.substring(6); // Remove ERROR: prefix
        } else {
            resultDiv.textContent = result;
        }
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    });
}

// Event listeners
executeButton.addEventListener('click', executeCode);

clearButton.addEventListener('click', function() {
    consoleOutput.innerHTML = '';
});

// Allow executing code with Ctrl+Enter or Cmd+Enter
codeInput.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        executeCode();
        e.preventDefault();
    }
});