// Initialize the CSInterface
const csInterface = new CSInterface();

// Get DOM elements
const codeInput = document.getElementById('code-input');
const consoleOutput = document.getElementById('console-output');
const executeButton = document.getElementById('execute-button');
const clearConsoleButton = document.getElementById('clear-console');
const quickCommandButtons = document.querySelectorAll('.command-buttons button');

// Execute code function
function executeCode() {
    const code = codeInput.value.trim();
    
    if (!code) return;
    
    // Add command to console output
    const commandEntry = document.createElement('div');
    commandEntry.className = 'output-entry';
    
    const commandLine = document.createElement('div');
    commandLine.className = 'command';
    commandLine.textContent = '> ' + code;
    commandEntry.appendChild(commandLine);
    
    // Create a placeholder for the result
    const resultLine = document.createElement('div');
    resultLine.className = 'result';
    resultLine.textContent = 'Executing...';
    commandEntry.appendChild(resultLine);
    
    consoleOutput.appendChild(commandEntry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight; // Scroll to bottom
    
    // Execute the code in ExtendScript
    csInterface.evalScript(`executeConsoleCode("${escapeCode(code)}")`, function(result) {
        if (result.startsWith('ERROR:')) {
            resultLine.className = 'error';
            resultLine.textContent = result.substring(6); // Remove the 'ERROR:' prefix
        } else {
            resultLine.textContent = result;
        }
        consoleOutput.scrollTop = consoleOutput.scrollHeight; // Scroll to bottom again after result
    });
}

// Escape code for safe passing to ExtendScript
function escapeCode(code) {
    return code.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

// Event listeners
executeButton.addEventListener('click', executeCode);

clearConsoleButton.addEventListener('click', function() {
    consoleOutput.innerHTML = '';
});

// Allow executing code with Ctrl+Enter or Cmd+Enter
codeInput.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        executeCode();
        e.preventDefault();
    }
});

// Quick commands
quickCommandButtons.forEach(button => {
    button.addEventListener('click', function() {
        const command = this.getAttribute('data-command');
        codeInput.value = command;
        executeCode();
    });
});

// Add a welcome message when the extension loads
window.addEventListener('load', function() {
    const welcomeEntry = document.createElement('div');
    welcomeEntry.className = 'output-entry';
    
    const welcomeLine = document.createElement('div');
    welcomeLine.className = 'command';
    welcomeLine.textContent = '> Welcome to Premiere Pro Console';
    welcomeEntry.appendChild(welcomeLine);
    
    const infoLine = document.createElement('div');
    infoLine.className = 'result';
    infoLine.innerHTML = 'Type ExtendScript code and press Execute (or Ctrl+Enter)<br>Try a quick command below to get started.';
    welcomeEntry.appendChild(infoLine);
    
    consoleOutput.appendChild(welcomeEntry);
});