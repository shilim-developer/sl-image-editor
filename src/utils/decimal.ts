import Decimal from "decimal.js";

// 判断是否为运算符
function isOperator(char: string) {
  const operators = ["+", "-", "*", "/", "^"];
  return operators.includes(char);
}

// 判断是否是函数
function isFun(char: string) {
  const operators = ["sin", "cos", "tan"];
  return operators.includes(char);
}

// 获取运算符优先级
function getPrecedence(op: string) {
  switch (op) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    case "^":
      return 3;
    default:
      return 0;
  }
}

// 中缀表达式转换为后缀表达式
export function infixToPostfix(expression: string) {
  let output = [];
  let stack = [];
  let currentToken: string = "";
  let tokens = expression.split("");

  for (let i = 0; i < tokens.length; i++) {
    currentToken += tokens[i].trim();

    // 如果是运算符
    if (isOperator(currentToken)) {
      // 如果是运算符
      while (
        stack.length > 0 &&
        isOperator(stack[stack.length - 1]) &&
        getPrecedence(stack[stack.length - 1]) >= getPrecedence(currentToken)
      ) {
        output.push(stack.pop()); // 弹出栈中优先级高于当前运算符的运算符
      }
      stack.push(currentToken); // 当前运算符入栈
      currentToken = "";
    } else if (currentToken.includes("(")) {
      // 左括号或者函数，直接入栈
      stack.push(currentToken);
      currentToken = "";
    } else if (currentToken === ")") {
      // 右括号，弹出栈中的运算符直到遇到左括号
      while (stack.length > 0 && !stack[stack.length - 1].includes("(")) {
        output.push(stack.pop());
      }
      const popStr = stack.pop(); // 弹出左括号
      // 如果是函数，增加函数运算符
      if (popStr !== "(") {
        output.push(popStr?.replace("(", ""));
      }
      currentToken = "";
    } else if (
      !isNaN(parseFloat(currentToken)) &&
      (i + 1 === tokens.length ||
        (tokens[i + 1] !== "." && isNaN(parseFloat(tokens[i + 1]))))
    ) {
      output.push(currentToken);
      currentToken = "";
    }
  }

  // 将栈中剩余的运算符输出到输出列表
  while (stack.length > 0) {
    output.push(stack.pop());
  }

  return output.join(" ");
}

// 计算后缀表达式
export function evaluatePostfix(expression: string): Decimal {
  let stack: Decimal[] = [];
  let tokens = expression.split(/\s+/); // 根据空格分隔表达式

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i].trim();

    if (!isNaN(parseFloat(token))) {
      // 如果是数字，压入栈中
      stack.push(new Decimal(token));
    } else if (isOperator(token)) {
      // 如果是运算符，弹出栈顶的两个操作数进行运算
      let operand2 = stack.pop()!;
      let operand1 = stack.pop()!;
      let result = new Decimal(0);

      switch (token) {
        case "+":
          result = operand1.plus(operand2);
          break;
        case "-":
          result = operand1.minus(operand2);
          break;
        case "*":
          result = operand1.times(operand2);
          break;
        case "/":
          result = operand1.dividedBy(operand2);
          break;
        case "^":
          result = operand1.toPower(operand2);
          break;
        default:
          break;
      }

      // 将运算结果压入栈中
      stack.push(result);
    } else if (isFun(token)) {
      // 如果是函数运算符，弹出栈顶的一个数操作数进行运算
      let operand = stack.pop()!;
      let result = new Decimal(0);

      switch (token) {
        case "sin":
          result = operand.sin();
          break;
        case "cos":
          result = operand.cos();
          break;
        case "tan":
          result = operand.tan();
          break;
        default:
          break;
      }

      // 将运算结果压入栈中
      stack.push(result);
    }
  }

  // 栈顶元素即为表达式的计算结果
  return stack.pop()!;
}

export function decimalEvaluate(expression: string) {
  const infixToPostfixExpression = infixToPostfix(expression);
  return evaluatePostfix(infixToPostfixExpression);
}
