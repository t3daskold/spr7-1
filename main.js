// Базовий клас обробників
class Handler {
    constructor(successor = null) {
        this.successor = successor;
    }

    handleRequest(request) {
        if (this.successor) {
            this.successor.handleRequest(request);
        }
    }
}

// Конкретний обробник для додавання чисел
class AddHandler extends Handler {
    handleRequest(request) {
        if (request.operation === 'add') {
            console.log(`${request.num1} + ${request.num2} = ${request.num1 + request.num2}`);
        } else {
            super.handleRequest(request);
        }
    }
}

// Конкретний обробник для віднімання чисел
class SubtractHandler extends Handler {
    handleRequest(request) {
        if (request.operation === 'subtract') {
            console.log(`${request.num1} - ${request.num2} = ${request.num1 - request.num2}`);
        } else {
            super.handleRequest(request);
        }
    }
}

// Клас, який представляє запит
class Request {
    constructor(operation, num1, num2) {
        this.operation = operation;
        this.num1 = num1;
        this.num2 = num2;
    }
}

// Використання шаблону "Ланцюг відповідальності"
const addHandler = new AddHandler();
const subtractHandler = new SubtractHandler(addHandler);

// Спробуємо викликати обробку для різних операцій
const request1 = new Request('add', 5, 3);
const request2 = new Request('subtract', 8, 4);
const request3 = new Request('multiply', 2, 6); // Не буде оброблено жодним із обробників

subtractHandler.handleRequest(request1); // Виведе: 5 + 3 = 8
subtractHandler.handleRequest(request2); // Виведе: 8 - 4 = 4
subtractHandler.handleRequest(request3); // Не виведе нічого, оскільки операція не підтримується
