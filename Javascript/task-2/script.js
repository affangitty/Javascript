const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let expression = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C") {
            expression = "";
            display.value = "";
            return;
        }

        if (value === "=") {
            try {
                expression = eval(expression).toString();
                display.value = expression;
            } catch(err) {
                display.value = err;
                expression = "";
            }
            return;
        }

        expression += value;
        display.value = expression;
    });
});