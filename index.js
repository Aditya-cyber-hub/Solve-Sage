document.addEventListener('DOMContentLoaded', () => {
    const screen = document.getElementById('screen');
    const keys = document.querySelector('.calculator-keys');
    let cursorPosition = 0;

    // Initialize screen value
    screen.value = '';

    keys.addEventListener('click', event => {
        const { target } = event;
        const { value } = target;

        if (!target.matches('button')) {
            return;
        }

        handleInput(value);
    });

    document.addEventListener('keydown', event => {
        const key = event.key;
        
        if (isFinite(key) || key === '+' || key === '-' || key === '*' || key === '/' || key === '=' || key === 'Enter' || key === 'Backspace' || key === 'Escape' || key === 'c' || key === 'C' || key === 's' || key === 'S' || key === '(' || key === ')' || key === '.' || key === '^') {
            event.preventDefault();
            handleKeyboardInput(key);
        }
    });

    function handleInput(value) {
        const startPos = screen.selectionStart;
        const endPos = screen.selectionEnd;
        const currentExpression = screen.value;

        switch (value) {
            case 'clear':
                screen.value = '';
                break;
            case '=':
                try {
                    screen.value = eval(screen.value.replace(/<sup>2<\/sup>/g, '**2'));
                } catch {
                    screen.value = 'Error';
                }
                break;
            case 'sqrt':
                try {
                    screen.value = Math.sqrt(eval(screen.value));
                } catch {
                    screen.value = 'Error';
                }
                break;
            case '**':
                try {
                    screen.value = Math.pow(eval(screen.value), 2);
                } catch {
                    screen.value = 'Error';
                }
                break;
            case '^2':
                screen.value = currentExpression.slice(0, startPos) + '( )^2' + currentExpression.slice(endPos);
                cursorPosition = startPos + 2; // Move cursor to the space after (
                break;
            case 'backspace':
                handleBackspace();
                break;
            default:
                screen.value = currentExpression.slice(0, startPos) + value + currentExpression.slice(endPos);
                cursorPosition = startPos + value.length; // Move cursor after the inserted value
                break;
        }

        screen.focus();
        screen.setSelectionRange(cursorPosition, cursorPosition);
    }

    function handleKeyboardInput(key) {
        const startPos = screen.selectionStart;
        const endPos = screen.selectionEnd;
        const currentExpression = screen.value;

        switch (key) {
            case 'Enter':
            case '=':
                handleInput('=');
                break;
            case 'Escape':
            case 'c':
            case 'C':
                handleInput('clear');
                break;
            case 's':
            case 'S':
                handleInput('sqrt');
                break;
            case 'Backspace':
                handleBackspace();
                break;
            case '^':
                handleInput('^2');
                break;
            default:
                if (isFinite(key) || key === '+' || key === '-' || key === '*' || key === '/' || key === '(' || key === ')' || key === '.') {
                    handleInput(key);
                }
                break;
        }

        screen.focus();
        screen.setSelectionRange(cursorPosition, cursorPosition);
    }

    function handleBackspace() {
        const startPos = screen.selectionStart;
        const endPos = screen.selectionEnd;
        const currentExpression = screen.value;

        if (startPos === endPos) {
            // Remove single character before cursor
            screen.value = currentExpression.slice(0, startPos - 1) + currentExpression.slice(endPos);
            cursorPosition = startPos - 1;
        } else {
            // Remove selected characters
            screen.value = currentExpression.slice(0, startPos) + currentExpression.slice(endPos);
            cursorPosition = startPos;
        }
    }
});

function redirectToUnitConversion() {
    window.open('https://www.google.com/search?q=unit+conversion', '_blank');
}
