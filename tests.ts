const typescript = {
  testTitle: "Basic TypeScript MCQ Test",
  questions: [
    {
      id: 1,
      type: "objective",
      question: "What is the correct file extension for a TypeScript file?",
      options: [".js", ".ts", ".tsx", ".jsx"],
      correctAnswer: ".ts",
      expectedPoints: 1,
    },
    {
      id: 2,
      type: "objective",
      question:
        "Which keyword is used to define a variable that cannot be reassigned?",
      options: ["let", "var", "const", "type"],
      correctAnswer: "const",
      expectedPoints: 1,
    },
    {
      id: 3,
      type: "objective",
      question: "How do you specify a variable of type number?",
      options: [
        "let age: number;",
        "let age = number;",
        "let number age;",
        "let age: Number;",
      ],
      correctAnswer: "let age: number;",
      expectedPoints: 1,
    },
    {
      id: 4,
      type: "objective",
      question: 'What does the "any" type represent?',
      options: [
        "A specific type",
        "Any possible type",
        "Only string",
        "Only boolean",
      ],
      correctAnswer: "Any possible type",
      expectedPoints: 1,
    },
    {
      id: 5,
      type: "objective",
      question: "Which operator is used for type assertion?",
      options: ["as", "::", "=>", "?."],
      correctAnswer: "as",
      expectedPoints: 1,
    },
    {
      id: 6,
      type: "objective",
      question:
        "How do you define an interface named Person with property name of type string?",
      options: [
        "interface Person { name: string; }",
        "type Person = { name: string; }",
        "class Person { name: string; }",
        "enum Person { name: string; }",
      ],
      correctAnswer: "interface Person { name: string; }",
      expectedPoints: 1,
    },
    {
      id: 7,
      type: "objective",
      question: "Which of these is a correct way to import a default export?",
      options: [
        'import { MyComponent } from "./MyComponent";',
        'import MyComponent from "./MyComponent";',
        'import * as MyComponent from "./MyComponent";',
        'require("./MyComponent");',
      ],
      correctAnswer: 'import MyComponent from "./MyComponent";',
      expectedPoints: 1,
    },
    {
      id: 8,
      type: "objective",
      question: "What will be the type of variable declared as const x = 5?",
      options: ["number", "5", "const", "any"],
      correctAnswer: "5",
      expectedPoints: 1,
    },
    {
      id: 9,
      type: "objective",
      question: "Which method compiles TypeScript code to JavaScript?",
      options: ["tsc", "ts-node", "npm run build", "webpack"],
      correctAnswer: "tsc",
      expectedPoints: 1,
    },
    {
      id: 10,
      type: "objective",
      question: "How do you specify that a function returns a string?",
      options: [
        "function greet(): string { ... }",
        "function greet() => string { ... }",
        "function greet() { return string; }",
        "function greet(): { return; }",
      ],
      correctAnswer: "function greet(): string { ... }",
      expectedPoints: 1,
    },
  ],
};

const javascript = {
  testTitle: "Basic JavaScript Knowledge Assessment",
  questions: [
    {
      id: 1,
      type: "subjective",
      question:
        "What keyword is used to declare a block-scoped variable that can be reassigned?",
      options: "",
      correctAnswer: "let",
      expectedPoints: 1,
    },
    {
      id: 2,
      type: "subjective",
      question: "Which keyword declares a constant that cannot be reassigned?",
      options: "",
      correctAnswer: "const",
      expectedPoints: 1,
    },
    {
      id: 3,
      type: "subjective",
      question: "What is the output of the expression: 2 + '2' ?",
      options: "",
      correctAnswer: "22",
      expectedPoints: 1,
    },
    {
      id: 4,
      type: "subjective",
      question:
        "Name the method used to add an element to the end of an array.",
      options: "",
      correctAnswer: "push",
      expectedPoints: 1,
    },
    {
      id: 5,
      type: "subjective",
      question: "How do you write a single-line comment in JavaScript?",
      options: "",
      correctAnswer: "// comment text",
      expectedPoints: 1,
    },
    {
      id: 6,
      type: "subjective",
      question:
        "What will the following code log? \n\nconsole.log(typeof NaN);",
      options: "",
      correctAnswer: "number",
      expectedPoints: 1,
    },
    {
      id: 7,
      type: "subjective",
      question:
        "Which built-in method converts a JSON string into a JavaScript object?",
      options: "",
      correctAnswer: "JSON.parse",
      expectedPoints: 1,
    },
    {
      id: 8,
      type: "subjective",
      question: "What is the difference between == and === in JavaScript?",
      options: "",
      correctAnswer:
        "== compares values with type coercion, while === compares both value and type without coercion.",
      expectedPoints: 1,
    },
    {
      id: 9,
      type: "subjective",
      question:
        "Write a short arrow function that takes two numbers and returns their sum.",
      options: "",
      correctAnswer: "(a, b) => a + b",
      expectedPoints: 1,
    },
    {
      id: 10,
      type: "subjective",
      question:
        "How do you create an empty object using object literal notation?",
      options: "",
      correctAnswer: "{}",
      expectedPoints: 1,
    },
  ],
};

const hintpython = {
  testTitle: "Python Proficiency Test - Medium Level",
  questions: [
    {
      id: 1,
      type: "objective",
      question: "Which of the following data types is immutable in Python?",
      options: ["list", "dictionary", "set", "tuple"],
      hint: "Think about objects that cannot be changed after creation.",
      correctAnswer: "tuple",
      expectedPoints: 1,
    },
    {
      id: 2,
      type: "objective",
      question: "What is the output of: print(type([]) is list)",
      options: ["True", "False", "None", "Error"],
      hint: "type([]) returns the class of the empty list.",
      correctAnswer: "True",
      expectedPoints: 1,
    },
    {
      id: 3,
      type: "objective",
      question:
        "Which of the following statements correctly opens a file for appending?",
      options: [
        "open('data.txt', 'r')",
        "open('data.txt', 'w')",
        "open('data.txt', 'a')",
        "open('data.txt', 'x')",
      ],
      hint: "Appending adds data to the end without truncating the file.",
      correctAnswer: "open('data.txt', 'a')",
      expectedPoints: 1,
    },
    {
      id: 4,
      type: "objective",
      question:
        "What will be the value of x after executing the following code?\n\nx = [1, 2, 3]\nx += [4, 5]\n",
      options: ["[1, 2, 3, 4, 5]", "[1, 2, 3, [4, 5]]", "[4, 5]", "Error"],
      hint: "The += operator extends the list in place.",
      correctAnswer: "[1, 2, 3, 4, 5]",
      expectedPoints: 1,
    },
    {
      id: 5,
      type: "objective",
      question:
        "Which built-in function can be used to convert an integer to its binary representation as a string?",
      options: ["bin()", "hex()", "oct()", "format()"],
      hint: "The function starts with 'b' and returns a string prefixed with '0b'.",
      correctAnswer: "bin()",
      expectedPoints: 2,
    },
    {
      id: 6,
      type: "objective",
      question:
        "Consider the following code snippet:\n\ndef foo(a, b=[]):\n    b.append(a)\n    return b\n\nprint(foo(1))\nprint(foo(2))\nWhat is the output?",
      options: ["[1]\\n[2]", "[1]\\n[1, 2]", "[1, 2]\\n[1, 2]", "Error"],
      hint: "Default mutable arguments are evaluated once at function definition time.",
      correctAnswer: "[1]\\n[1, 2]",
      expectedPoints: 2,
    },
    {
      id: 7,
      type: "objective",
      question:
        "Which of the following statements about Python's GIL (Global Interpreter Lock) is true?",
      options: [
        "It allows multiple native threads to execute Python bytecode simultaneously.",
        "It prevents any form of concurrency in Python programs.",
        "It ensures that only one thread executes Python bytecode at a time.",
        "It is only present in Python implementations written in Java.",
      ],
      hint: "The GIL is a mutex that protects access to Python objects.",
      correctAnswer:
        "It ensures that only one thread executes Python bytecode at a time.",
      expectedPoints: 2,
    },
    {
      id: 8,
      type: "objective",
      question:
        "What is the result of the following list comprehension?\n\n[ (x, y) for x in [1, 2] for y in [3, 4] if x != y ]",
      options: [
        "[(1, 3), (1, 4), (2, 3), (2, 4)]",
        "[(1, 3), (2, 4)]",
        "[(1, 3), (1, 4), (2, 3), (2, 4), (1, 1), (2, 2)]",
        "[]",
      ],
      hint: "The condition filters out pairs where the two elements are equal.",
      correctAnswer: "[(1, 3), (1, 4), (2, 3), (2, 4)]",
      expectedPoints: 2,
    },
    {
      id: 9,
      type: "objective",
      question:
        "Which of the following statements will correctly create a generator that yields squares of numbers from 0 to 4?",
      options: [
        "[x**2 for x in range(5)]",
        "(x**2 for x in range(5))",
        "{x**2 for x in range(5)}",
        "list(x**2 for x in range(5))",
      ],
      hint: "Generators use parentheses, not brackets.",
      correctAnswer: "(x**2 for x in range(5))",
      expectedPoints: 2,
    },
    {
      id: 10,
      type: "objective",
      question: "In Python, what does the expression 'a is b' evaluate?",
      options: [
        "Whether a equals b in value",
        "Whether a and b refer to the same object in memory",
        "Whether a is greater than b",
        "Whether a is a subclass of b",
      ],
      hint: "The 'is' operator checks identity, not equality.",
      correctAnswer: "Whether a and b refer to the same object in memory",
      expectedPoints: 2,
    },
  ],
};

const testTosubj = {
  title: "Python Basics Assessment",
  timeSpent: 82,
  numberOfQuestions: 5,
  answers: [
    {
      question: {
        id: 1,
        type: "objective",
        question:
          "Which of the following is the correct way to print 'Hello, World!' in Python?",
        options: [
          "print('Hello, World!')",
          "echo 'Hello, World!'",
          "console.log('Hello, World!')",
          "printf('Hello, World!')",
        ],
        hint: "Use the built-in print function.",
        correctAnswer: "print('Hello, World!')",
        expectedPoints: 1,
      },
      userAnswer: "print('Hello, World!')",
    },
    {
      question: {
        id: 2,
        type: "objective",
        question:
          "What is the output of the following code?\n\nx = 5\ny = 2\nprint(x // y)",
        options: ["2", "2.5", "3", "Error"],
        hint: "The // operator performs floor division.",
        correctAnswer: "2",
        expectedPoints: 1,
      },
      userAnswer: "2",
    },
    {
      question: {
        id: 3,
        type: "objective",
        question:
          "Which data type is used to store an ordered, immutable collection of items in Python?",
        options: ["list", "tuple", "set", "dictionary"],
        hint: "It cannot be changed after creation.",
        correctAnswer: "tuple",
        expectedPoints: 1,
      },
      userAnswer: "tuple",
    },
    {
      question: {
        id: 4,
        type: "objective",
        question:
          "How do you create a function named 'add' that returns the sum of two parameters a and b?",
        options: [
          "def add(a, b): return a + b",
          "function add(a, b) { return a + b; }",
          "let add = (a, b) => a + b;",
          "add(a, b) = a + b",
        ],
        hint: "Use the def keyword and a colon.",
        correctAnswer: "def add(a, b): return a + b",
        expectedPoints: 1,
      },
      userAnswer: "def add(a, b): return a + b",
    },
    {
      question: {
        id: 5,
        type: "objective",
        question: "Which keyword is used to handle exceptions in Python?",
        options: ["catch", "except", "error", "finally"],
        hint: "It follows a try block.",
        correctAnswer: "except",
        expectedPoints: 1,
      },
      userAnswer: "except",
    },
  ],
  difficulty: "Easy",
};

const resultobject = {
  title: "JavaScript Basics Assessment",
  result: "Passed",
  resultLabel: "Average",
  correctAnswers: 3,
  totalQuestions: 5,
  timeSpent: 32,
  accuracyRate: 60,
  aiInsight:
    "Great job on the fundamentals—you correctly identified constant declarations, JSON parsing, and the typeof NaN result. The missed questions were the single-line comment syntax and the precise arrow function form, which are easy to mix up with similar options. Reviewing comment styles and practicing arrow function variations will sharpen those areas. You completed the test in a moderate amount of time, giving yourself room to think through each item; with a bit more speed you can boost confidence even further. Keep up the effort, and focus on those small details for an even stronger performance next time.",
};
