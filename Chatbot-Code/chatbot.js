const Chatbot = {
  defaultResponses: {
    'hello hi': `Hello! How can I help you?`,
    'hey': `Hey there! What can I do for you?`,
    'good morning': `Good morning! Hope you're having a great start to your day.`,
    'good night': `Good night! Sleep well.`,
    'how are you': `I'm doing great! How can I help you?`,
    'what is your name': `I'm Chatbot, your friendly virtual assistant!`,
    'who created you': `I was built by you, right here in this React project!`,
    'how old are you': `I don't have an age, I'm just lines of code!`,
    'what can you do': `I can flip a coin, roll a dice, tell you the date and time, tell a joke, do simple math, and chat a bit. Try me!`,
    'help': `Sure! You can ask me to flip a coin, roll a dice, tell today's date, tell the time, tell a joke, or do basic math like "5 + 3".`,

    'flip a coin': function () {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return 'Sure! You got heads';
      } else {
        return 'Sure! You got tails';
      }
    },
    'roll a dice': function () {
      const diceResult = Math.floor(Math.random() * 6) + 1;
      return `Sure! You got ${diceResult}`;
    },
    'roll two dice': function () {
      const a = Math.floor(Math.random() * 6) + 1;
      const b = Math.floor(Math.random() * 6) + 1;
      return `You rolled ${a} and ${b} (total: ${a + b})`;
    },
    'pick a random number': function () {
      const num = Math.floor(Math.random() * 100) + 1;
      return `Your random number is ${num}`;
    },

    'what is the date today': function () {
      const now = new Date();
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const month = months[now.getMonth()];
      const day = now.getDate();
      return `Today is ${month} ${day}`;
    },
    'what time is it': function () {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `Right now it's ${hours}:${minutes}`;
    },
    'what day is it': function () {
      const days = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
      ];
      return `Today is ${days[new Date().getDay()]}`;
    },

    'tell me a joke': function () {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "Why did the developer go broke? Because they used up all their cache.",
        "There are 10 types of people in the world: those who understand binary and those who don't.",
        "Why do Java developers wear glasses? Because they don't see sharp.",
        "A SQL query walks into a bar, sees two tables and asks: 'Can I join you?'"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    },
    'tell me a fact': function () {
      const facts = [
        "Honey never spoils.",
        "Bananas are berries, but strawberries aren't.",
        "The first computer bug was an actual moth stuck in a relay.",
        "Octopuses have three hearts.",
        "A group of flamingos is called a 'flamboyance'."
      ];
      return facts[Math.floor(Math.random() * facts.length)];
    },
    'inspire me': function () {
      const quotes = [
        "Code is like humor. When you have to explain it, it's bad.",
        "First, solve the problem. Then, write the code.",
        "Simplicity is the soul of efficiency.",
        "Every great app was once just an idea someone decided to build.",
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    },

    'calculate': function (message) {
      // Very simple calculator: handles "3 + 4", "10 * 2", "8 / 2", "9 - 5"
      const match = message.match(/(-?\d+(\.\d+)?)\s*([+\-*/])\s*(-?\d+(\.\d+)?)/);
      if (!match) {
        return `I can do simple math like "5 + 3" or "10 / 2". Try that format!`;
      }
      const a = parseFloat(match[1]);
      const op = match[3];
      const b = parseFloat(match[4]);
      let result;
      switch (op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = b !== 0 ? a / b : 'undefined (division by zero)'; break;
      }
      return `The result is ${result}`;
    },

    'tell me about yourself': `I'm a simple chatbot built with plain JavaScript and connected to a React front end. I can answer a few fixed questions and do some fun tricks!`,
    'i love you': `Aww, that's sweet! I'm just code, but I appreciate you!`,
    'are you human': `Nope, I'm just a chatbot made of JavaScript and good intentions.`,
    'are you real': `I'm real code running in your browser, but not a real person!`,
    'what is the weather': `I can't check live weather yet, but I hope it's nice outside!`,

    'thank': 'No problem! Let me know if you need help with anything else!',
    'bye': `Goodbye! Have a great day!`,
    'good bye': `See you later!`,
  },

  additionalResponses: {},

  unsuccessfulResponse: `Sorry, I didn't quite understand that. Type "help" to see what I can do!`,

  emptyMessageResponse: `Sorry, it looks like your message is empty. Please make sure you send a message and I will give you a response.`,

  addResponses: function (additionalResponses) {
    this.additionalResponses = {
      ...this.additionalResponses,
      ...additionalResponses
    };
  },

  getResponse: function (message) {
    if (!message) {
      return this.emptyMessageResponse;
    }

    // Let simple math expressions like "5 + 3" go straight to the calculator,
    // regardless of how close they match other response keys.
    if (/-?\d+(\.\d+)?\s*[+\-*/]\s*-?\d+(\.\d+)?/.test(message)) {
      return this.defaultResponses['calculate'](message);
    }

    // This spread operator (...) combines the 2 objects.
    const responses = {
      ...this.defaultResponses,
      ...this.additionalResponses,
    };

    const {
      ratings,
      bestMatchIndex,
    } = this.stringSimilarity(message, Object.keys(responses));

    const bestResponseRating = ratings[bestMatchIndex].rating;
    if (bestResponseRating <= 0.3) {
      return this.unsuccessfulResponse;
    }

    const bestResponseKey = ratings[bestMatchIndex].target;
    const response = responses[bestResponseKey];

    if (typeof response === 'function') {
      return response(message);
    } else {
      return response;
    }
  },

  getResponseAsync: function (message) {
    return new Promise((resolve) => {
      // Pretend it takes some time for the chatbot to response.
      setTimeout(() => {
        resolve(this.getResponse(message));
      }, 1000);
    });
  },

  compareTwoStrings: function (first, second) {
    first = first.replace(/\s+/g, '')
    second = second.replace(/\s+/g, '')

    if (first === second) return 1;
    if (first.length < 2 || second.length < 2) return 0;

    let firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const bigram = first.substring(i, i + 2);
      const count = firstBigrams.has(bigram)
        ? firstBigrams.get(bigram) + 1
        : 1;

      firstBigrams.set(bigram, count);
    };

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const bigram = second.substring(i, i + 2);
      const count = firstBigrams.has(bigram)
        ? firstBigrams.get(bigram)
        : 0;

      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
  },

  stringSimilarity: function (mainString, targetStrings) {
    const ratings = [];
    let bestMatchIndex = 0;

    for (let i = 0; i < targetStrings.length; i++) {
      const currentTargetString = targetStrings[i];
      const currentRating = this.compareTwoStrings(mainString, currentTargetString)
      ratings.push({target: currentTargetString, rating: currentRating})
      if (currentRating > ratings[bestMatchIndex].rating) {
        bestMatchIndex = i
      }
    }

    const bestMatch = ratings[bestMatchIndex]

    return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
  },
};

// Define the randomUUID() function if it doesn't exist.
function uuidPolyfill() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
    const randomNumber = Math.random() * 16 | 0;
    const result = char === 'x' ? randomNumber : (randomNumber & 0x3 | 0x8);
    return result.toString(16);
  });
}

// This code allows Chatbot to be used in both the browser and
// in NodeJS. This is called UMD (Universal Module Definition).
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory();
  } else {
    // Create a fallback if window.crypto is undefined.
    if (typeof root.crypto === 'undefined') {
      try {
        root.crypto = {};
      } catch (e) {}
    }

    // Create a fallback crypto.randomUUID() function.
    if (root.crypto && typeof root.crypto.randomUUID !== 'function') {
      try {
        root.crypto.randomUUID = uuidPolyfill;
      } catch (e) {}
    }

    // Browser global
    root.Chatbot = factory();
    root.chatbot = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  return Chatbot;
}));