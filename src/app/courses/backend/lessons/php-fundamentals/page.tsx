"use client";

import BackendGenericSlides, { Slide } from "@/components/backend/lessons/backend-generic-slides";
import { ArrowLeft, Code, Zap, Layers, Terminal, Cpu, ShieldCheck, Database, Globe, MousePointer2, Settings, List, Repeat, Layout, Save, Lock, Rocket, Eye, User, Key } from "lucide-react";
import Link from "next/link";


const phpSlides: Slide[] = [
  // ── 01 · Hero ──────────────────────────────────────────────────────────────
  {
    type: 'hero',
    title: 'PHP Foundations',
    subtitle: 'Module 01 · Server-Side Programming',
    content: 'Welcome to the engine of the web. PHP powers over 75% of the internet. In this module, we transition from static HTML to dynamic, server-side scripting — learning how to process data, manage sessions, and build interactive applications.',
    icon: Code,
  },

  // ── 02 · Concept: What is PHP? ─────────────────────────────────────────────
  {
    type: 'concept',
    title: 'Server-Side Scripting',
    subtitle: 'The PHP Request Lifecycle',
    content: 'Unlike HTML/CSS which runs in the browser, PHP runs on the server. When a user requests a page, the server executes the PHP code, generates a plain HTML document, and sends only the HTML back to the user. The browser never sees your PHP logic.',
    icon: Globe,
    callout: 'Think of PHP as a "factory" that builds the HTML page on-demand based on variables like user login status or database content.',
    keyPoints: [
      'PHP stands for "Hypertext Preprocessor"',
      'Runs on the server (Apache, Nginx, or Built-in PHP server)',
      'Interacts with Databases and File Systems',
      'Browser receives only the generated output (usually HTML)',
    ],
  },

  // ── 03 · Code: PHP Tags & Basics ──────────────────────────────────────────
  {
    type: 'code',
    title: 'PHP Tags & Comments',
    subtitle: 'Escaping from HTML',
    content: 'A PHP file can contain HTML, but any PHP code must be wrapped in <?php ... ?> tags. You can echo text directly into the page or use comments to document your logic for other developers.',
    icon: Terminal,
    language: 'php',
    codeFileName: 'index.php',
    codeSnippet: `<?php
// This is a single-line comment
/* This is a multi-line
   comment block */

echo "<h1>Hello from PHP!</h1>";

# Another way to do a single-line comment

?>
<p>This is standard HTML outside the tags.</p>

<?php
echo "<p>Back in PHP mode.</p>";`,
    keyPoints: [
      '<?php ... ?> — the standard tags for PHP blocks',
      'echo — the primary command for outputting text/HTML',
      '// and /* */ — for code documentation',
      'Semicolon (;) — required after every PHP statement',
    ],
  },

  // ── 04 · Concept: Data Types ───────────────────────────────────────────────
  {
    type: 'concept',
    title: 'Syntax & Data Types',
    subtitle: 'The Building Blocks',
    content: 'PHP is a loosely typed language, meaning you don\'t have to explicitly declare the type of a variable. However, it still uses strict types internally: Integers for numbers, Strings for text, Booleans for logic, and Arrays for collections.',
    icon: Layers,
    keyPoints: [
      'String: "John Doe" or \'PHP\'',
      'Integer: 42, -5, 0',
      'Float (Double): 10.5, 3.14',
      'Boolean: true or false',
      'Array: [1, 2, 3] or ["name" => "Ratha"]',
      'NULL: A variable with no value',
    ],
  },

  // ── 05 · Code: Variables & Operators ───────────────────────────────────────
  {
    type: 'code',
    title: 'Variables & Arithmetic',
    subtitle: 'Storing and Calculating',
    content: 'Variables start with a dollar sign ($). You use them to store data that can change throughout your script. Arithmetic operators (+, -, *, /) allow you to perform calculations on numeric data.',
    icon: Zap,
    language: 'php',
    codeFileName: 'math.php',
    codeSnippet: `<?php
$price = 100;
$taxRate = 0.15;
$quantity = 3;

$taxAmount = $price * $taxRate;
$total = ($price + $taxAmount) * $quantity;

echo "Item Price: $" . $price . "<br>";
echo "Total for $quantity items: $" . $total;

// The dot (.) is used for string concatenation`,
    keyPoints: [
      '$variableName — variables are case-sensitive',
      'Concatenation (.) — used to join strings together',
      'Arithmetic (+, -, *, /, %) — standard mathematical operations',
      'Assignment (=) — assigns a value to a variable',
    ],
  },

  // ── 06 · Diagram: Logic Gates ──────────────────────────────────────────────
  {
    type: 'diagram',
    title: 'Comparison & Logical Operators',
    subtitle: 'Making Decisions',
    content: 'Control structures rely on comparison operators (==, !=, <, >) to determine if a condition is true or false. Logical operators (&&, ||, !) allow you to combine multiple conditions.',
    icon: ShieldCheck,
    diagramNodes: [
      { label: '$age >= 18', desc: 'Comparison (True/False)', color: '#6366f1' },
      { label: 'AND (&&)',    desc: 'Both must be true',      color: '#8b5cf6' },
      { label: 'OR (||)',     desc: 'One must be true',       color: '#10b981' },
      { label: 'Result',      desc: 'Execute if true',        color: '#f59e0b' },
    ],
  },

  // ── 07 · Code: Control Flow ────────────────────────────────────────────────
  {
    type: 'code',
    title: 'If-Else Statements',
    subtitle: 'Branching Logic',
    content: 'Conditional statements allow your application to behave differently based on different inputs. This is the foundation of interactivity in web development.',
    icon: Settings,
    language: 'php',
    codeFileName: 'auth.php',
    codeSnippet: `<?php
$isLoggedIn = true;
$userRole = 'admin';

if ($isLoggedIn && $userRole === 'admin') {
    echo "Welcome back, Admin!";
} elseif ($isLoggedIn) {
    echo "Welcome back, User!";
} else {
    echo "Please log in to continue.";
}

// Ternary operator (Shorthand)
$message = $isLoggedIn ? 'Online' : 'Offline';`,
    keyPoints: [
      'if / elseif / else — basic branching structure',
      '=== (Strict) vs == (Loose) — always prefer === for security',
      'Ternary (? :) — shorthand for simple if-else',
      'Switch Statements — useful for many fixed options',
    ],
  },

  // ── 08 · Code: Switch Case ────────────────────────────────────────────────
  {
    type: 'code',
    title: 'Switch Case',
    subtitle: 'Managing Multi-Choice',
    content: 'When you have many possible outcomes for a single variable, a switch statement is often cleaner and easier to read than multiple if-elseif blocks.',
    icon: List,
    language: 'php',
    codeFileName: 'colors.php',
    codeSnippet: `<?php
$favColor = "red";

switch ($favColor) {
    case "red":
        echo "Your favorite color is red!";
        break;
    case "blue":
        echo "Your favorite color is blue!";
        break;
    case "green":
        echo "Your favorite color is green!";
        break;
    default:
        echo "We don't know your favorite color.";
}

// Important: break is required to prevent "fall-through"`,
    keyPoints: [
      'case — a specific value to check',
      'break — exits the switch block',
      'default — runs if no case matches',
      'Multiple cases can share the same code block',
    ],
  },

  // ── 09 · Quiz: Control Flow ───────────────────────────────────────────────
  {
    type: 'quiz',
    title: 'Logic Check',
    subtitle: 'Knowledge Check',
    content: '',
    icon: ShieldCheck,
    question: 'How many echo statements will execute in this code? $x=5; if($x > 0){ echo "A"; } if($x < 10){ echo "B"; } else { echo "C"; }',
    options: [
      {
        text: 'Only A',
        correct: false,
        explanation: 'Both conditions involve independent if statements or if/else blocks. $x > 0 is true (echo A). The second block is $x < 10 which is also true (echo B).',
      },
      {
        text: 'A and B',
        correct: true,
        explanation: 'Correct. The first "if" is independent. The second "if" and its "else" are separate. Since $x satisfies both $x > 0 and $x < 10, both A and B are printed.',
      },
      {
        text: 'A and C',
        correct: false,
        explanation: 'The else (C) only runs if the second if ($x < 10) is false. Since 5 < 10 is true, C will never execute.',
      },
      {
        text: 'Only B',
        correct: false,
        explanation: 'PHP executes script sequentially. The first condition is evaluated first and evaluates to true.',
      },
    ],
  },

  // ── 10 · Concept: Loops ───────────────────────────────────────────────────
  {
    type: 'concept',
    title: 'Loops: While and For',
    subtitle: 'Repeating Tasks',
    content: 'Loops are used to execute the same block of code repeatedly as long as a certain condition is met. This is essential for rendering lists or processing large sets of data.',
    icon: Repeat,
    keyPoints: [
      'While Loop: Runs while a condition is true (don\'t know how many times).',
      'For Loop: Runs a specific number of times (know exactly how many).',
      'Do-While: Guarateed to run at least once before checking condition.',
      'Infinite Loop: A mistake where the condition never becomes false.',
    ],
  },

  // ── 11 · Code: Iteration in Practice ──────────────────────────────────────
  {
    type: 'code',
    title: 'For & While Loops',
    subtitle: 'Counting and Checking',
    content: 'A for loop is structured with initialization, condition, and increment. A while loop is simpler, relying only on a condition evaluated at the start of each iteration.',
    icon: Repeat,
    language: 'php',
    codeFileName: 'loops.php',
    codeSnippet: `<?php
// For Loop: Count 1 to 5
for ($i = 1; $i <= 5; $i++) {
    echo "Iteration: $i <br>";
}

echo "<hr>";

// While Loop: Countdown
$count = 5;
while ($count > 0) {
    echo "Countdown: $count <br>";
    $count--;
}
echo "Blast off!";`,
    keyPoints: [
      '$i++ — incrementing the counter',
      'Condition — the loop stops when this is false',
      'HTML inside echo — loops are great for building HTML tables/lists',
    ],
  },

  // ── 12 · Concept: Arrays ──────────────────────────────────────────────────
  {
    type: 'concept',
    title: 'Arrays & Data Structures',
    subtitle: 'Managing Collections',
    content: 'Arrays allow you to store multiple values in a single variable. PHP supports Indexed Arrays (numeric keys) and Associative Arrays (descriptive string keys).',
    icon: List,
    keyPoints: [
      'Indexed Array: $colors = ["Red", "Green", "Blue"];',
      'Associative Array: $user = ["name" => "Ratha", "age" => 25];',
      'Multidimensional Arrays: Arrays containing other arrays.',
      'count() — function to get the number of items in an array.',
    ],
  },

  // ── 13 · Code: Foreach Loop ───────────────────────────────────────────────
  {
    type: 'code',
    title: 'The Foreach Loop',
    subtitle: 'Simplifying Array Traversal',
    content: 'The foreach loop is specifically designed to work with arrays. It iterates through every element without needing an manual counter or index, making it the most used loop in PHP.',
    icon: Repeat,
    language: 'php',
    codeFileName: 'arrays.php',
    codeSnippet: `<?php
$students = ["Sok", "Sao", "Srey"];

echo "<ul>";
foreach ($students as $name) {
    echo "<li>Student: $name</li>";
}
echo "</ul>";

$prices = ["Apple" => 1.5, "Orange" => 2.0];
foreach ($prices as $fruit => $price) {
    echo "$fruit costs $$price <br>";
}`,
    keyPoints: [
      'as $item — extracts the value for each element',
      'as $key => $value — extracts both the key and the value',
      'Highly readable — best for rendering database results',
    ],
  },

  // ── 14 · Code: Custom Functions ───────────────────────────────────────────
  {
    type: 'code',
    title: 'User-Defined Functions',
    subtitle: 'Reusable Code Blocks',
    content: 'Functions allow you to group code into a named block that can be called multiple times with different inputs (parameters). They should generally perform one specific task.',
    icon: Cpu,
    language: 'php',
    codeFileName: 'functions.php',
    codeSnippet: `<?php
function calculateDiscount($price, $percentage = 10) {
    $discount = $price * ($percentage / 100);
    return $price - $discount;
}

$iphone = calculateDiscount(1000, 20); // 800
$macbook = calculateDiscount(2000);     // 1800 (uses default 10%)

echo "iPhone: $$iphone, Macbook: $$macbook";`,
    keyPoints: [
      'function name() — declaration syntax',
      'Parameters — inputs passed into the function',
      'Default Values — percentage = 10 sets a fallback',
      'Return — passes the result back to the caller',
    ],
  },

  // ── 15 · Concept: Form Handling ───────────────────────────────────────────
  {
    type: 'concept',
    title: 'Web Features: GET & POST',
    subtitle: 'Capturing User Input',
    content: 'PHP uses superglobals like $_GET and $_POST to capture data sent from HTML forms. GET sends data through the URL (visible), while POST sends it in the request body (invisible).',
    icon: MousePointer2,
    callout: 'Always use POST for sensitive data like passwords. Use GET for non-sensitive data like search queries or filters.',
    keyPoints: [
      '$_GET — parameters visible in URL (?id=5)',
      '$_POST — safer, large data, hidden from URL',
      'action — the PHP file that processes the form',
      'method — specifies whether to use GET or POST',
    ],
  },

  // ── 16 · Code: Form Processing ────────────────────────────────────────────
  {
    type: 'code',
    title: 'Basic Form Handling',
    subtitle: 'Interacting with Users',
    content: 'Processing a form involves checking if the request method is POST, and then accessing the values from the $_POST array using the "name" attribute of the HTML inputs.',
    icon: Layout,
    language: 'php',
    codeFileName: 'process.php',
    codeSnippet: `<!-- HTML Form -->
<form action="process.php" method="POST">
    <input type="text" name="username" placeholder="Name">
    <button type="submit">Submit</button>
</form>

<?php
// PHP Processing (in process.php)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['username'];
    echo "Hello, " . htmlspecialchars($name);
}
?>`,
    keyPoints: [
      '$_SERVER["REQUEST_METHOD"] — identifies how the form was submitted',
      'htmlspecialchars() — CRITICAL for security (prevents XSS)',
      'isset() — check if a form field exists before using it',
    ],
  },

  // ── 17 · Concept: Web Security ────────────────────────────────────────────
  {
    type: 'concept',
    title: 'Basic Security Measures',
    subtitle: 'Protecting Your App',
    content: 'Never trust user input. Hackers can submit malicious scripts through your forms. Two primary defenses at this stage are sanitization (removing unwanted characters) and validation (checking if data meets rules).',
    icon: ShieldCheck,
    keyPoints: [
      'XSS (Cross-Site Scripting): Prevent by using htmlspecialchars().',
      'SQL Injection: Prevent by using Prepared Statements (will learn in DB section).',
      'Validation: Check if an email is actually a valid email format.',
      'Sanitization: Stripping HTML tags from user comments.',
    ],
  },

  // ── 18 · Code: Sessions & Cookies ─────────────────────────────────────────
  {
    type: 'code',
    title: 'Managing State: Sessions',
    subtitle: 'Persistent User Data',
    content: 'HTTP is stateless, meaning the server forgets the user after each request. Sessions solve this by storing data on the server with a unique browser ID, allowing features like "Login" to work.',
    icon: Lock,
    language: 'php',
    codeFileName: 'session.php',
    codeSnippet: `<?php
session_start(); // Must be the FIRST line!

$_SESSION['user'] = "Admin";
$_SESSION['role'] = "Editor";

echo "Session started for " . $_SESSION['user'];

// To clear:
// session_destroy();`,
    keyPoints: [
      'session_start() — initializes or resumes a session',
      '$_SESSION — a global associative array for session data',
      'Data is stored on server — safer than cookies for secrets',
      'Cookies — small files stored on the user\'s local browser',
    ],
  },

  // ── 19 · Concept: Database Connectivity ───────────────────────────────────
  {
    type: 'concept',
    title: 'PHP & MySQL',
    subtitle: 'Database Integration',
    content: 'Modern PHP applications use PDO (PHP Data Objects) to connect to databases. PDO is more secure and supports multiple database types like MySQL, SQLite, and PostgreSQL with the same code syntax.',
    icon: Database,
    keyPoints: [
      'Connection String: host, dbname, user, password',
      'Dsn (Data Source Name): Defines the connection driver',
      'Prepared Statements: The only safe way to run queries with variables.',
      'Fetch Modes: How we get the data (as associative array, object, etc.)',
    ],
  },

  // ── 20 · Code: Connecting to DB ───────────────────────────────────────────
  {
    type: 'code',
    title: 'Database Connection (PDO)',
    subtitle: 'Establishing a Link',
    content: 'We use a try-catch block to handle connection errors gracefully. Once connected, we can execute SQL queries to retrieve or save data.',
    icon: Save,
    language: 'php',
    codeFileName: 'db.php',
    codeSnippet: `<?php
$host = 'localhost';
$db   = 'my_blog';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully!";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}`,
    keyPoints: [
      'new PDO() — creates the connection object',
      'ATTR_ERRMODE — tells PDO to throw exceptions on SQL errors',
      'catch(PDOException) — captures errors without crashing the server',
    ],
  },

  // ── 21 · Code: Prepared Statements & CRUD ─────────────────────────────────
  {
    type: 'code',
    title: 'CRUD Operations',
    subtitle: 'Create, Read, Update, Delete',
    content: 'CRUD is the backbone of most web applications. Here we see how to use Prepared Statements to safely update and delete data from our database based on user IDs.',
    icon: ShieldCheck,
    language: 'php',
    codeFileName: 'crud.php',
    codeSnippet: `<?php
// 1. READ (Select)
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$userId]);
$user = $stmt->fetch();

// 2. UPDATE
$update = $pdo->prepare("UPDATE users SET name = ? WHERE id = ?");
$update->execute(["New Name", $userId]);

// 3. DELETE
$delete = $pdo->prepare("DELETE FROM users WHERE id = ?");
$delete->execute([$userId]);

// 4. CREATE (Insert)
$insert = $pdo->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
$insert->execute(["Sok", "sok@example.com"]);`,
    keyPoints: [
      'UPDATE — uses the SET keyword to change values',
      'DELETE — always include a WHERE clause or you\'ll wipe the table',
      'rowCount() — check how many rows were affected by an update/delete',
      'lastInsertId() — get the ID of the row you just created',
    ],
  },

  // ── 22 · Code: REST API Login ─────────────────────────────────────────────
  {
    type: 'code',
    title: 'REST API Login',
    subtitle: 'JSON & Security',
    content: 'Modern apps often use PHP as a backend API. This code shows how to accept a JSON payload, verify a hashed password, and return a JSON response — the foundation of headless authentication.',
    icon: Key,
    language: 'php',
    codeFileName: 'api/login.php',
    codeSnippet: `<?php
header("Content-Type: application/json");

// Capture JSON input
$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

// 1. Fetch user by email
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

// 2. Verify Hashed Password
if ($user && password_verify($password, $user['password'])) {
    echo json_encode([
        "status" => "success",
        "message" => "Login successful",
        "user_id" => $user['id']
    ]);
} else {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
}`,
    keyPoints: [
      'password_verify() — safely checks a plain text password against a hash',
      'json_encode() — converts PHP arrays into JSON for the frontend',
      'file_get_contents(\'php://input\') — reads raw data from the request body',
      'http_response_code(401) — sets the Unauthorised header correctly',
    ],
  },

  // ── 23 · Diagram: Project Alpha Preview ───────────────────────────────────
  {
    type: 'diagram',
    title: 'Project Preview',
    subtitle: 'The Contact Manager Dashboard',
    content: 'A preview of the architecture we are building for Project Alpha. It combines everything learned: Forms, Sessions, Database CRUD, and secure API responses.',
    icon: Eye,
    diagramNodes: [
      { label: 'Login.php',    desc: 'Auth UI + session_start', color: '#6366f1' },
      { label: 'Dashboard',    desc: 'List All Contacts (READ)', color: '#8b5cf6' },
      { label: 'Add/Edit modal', desc: 'CREATE & UPDATE Logic',   color: '#10b981' },
      { label: 'Delete button', desc: 'DELETE Logic + Confirm',  color: '#ef4444' },
      { label: 'MySQL',        desc: 'Persistent Store',         color: '#f59e0b' },
    ],
  },

  // ── 24 · Concept: Object Oriented Programming ──────────────────────────
  {
    type: 'concept',
    title: 'Intro to OOP',
    subtitle: 'Classes & Objects',
    content: 'Professional PHP (and Laravel) is built on Object Oriented Programming. Instead of writing separate functions, we group data and behavior into "Classes". Think of a Class as a blueprint (e.g., "Car") and an Object as the actual instance (e.g., your "Toyota").',
    icon: Code,
    keyPoints: [
      'Class: The blueprint (properties and methods).',
      'Object: An instance created with the "new" keyword.',
      'Properties: Variables belonging to the class (public/private).',
      'Methods: Functions belonging to the class.',
    ],
  },

  // ── 25 · Code: Classes & Namespaces ───────────────────────────────────────
  {
    type: 'code',
    title: 'Namespaces & PSR-4',
    subtitle: 'Organizing Large Apps',
    content: 'Namespaces prevent name collisions (e.g., having two "User" classes). They also allow Composer to "autoload" your files automatically based on the directory structure. This eliminates the need for manual "include" or "require" statements.',
    icon: Layers,
    language: 'php',
    codeFileName: 'User.php',
    codeSnippet: `<?php
namespace App\\Models;

class User {
    public string $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function sayHello() {
        return "Hello, I am {$this->name}";
    }
}

// ── In another file ─────────────────────────────────
// use App\\Models\\User;
// $user = new User("Ratha");`,
    keyPoints: [
      'namespace — defines the "address" of the class',
      'use — imports a class from another namespace',
      '__construct — the function that runs on "new Class()"',
      'visibility (public/private) — controls access to data',
    ],
  },

  // ── 26 · Concept: Composer Essentials ─────────────────────────────────────
  {
    type: 'concept',
    title: 'Composer: Dependency Manager',
    subtitle: 'The Heart of the Ecosystem',
    content: 'Composer is the tool that manages external PHP libraries. It is how we install Laravel, testing tools like Pest, or security packages. It handles "Autoloading" so you can use any class in your project instantly.',
    icon: Database,
    keyPoints: [
      'composer.json: Lists the libraries your project needs.',
      'composer.lock: Pins exact versions for production.',
      'vendor/: The folder where all external code lives.',
      'composer require: The command to add a new library.',
    ],
  },

  // ── 27 · Hero: Review ──────────────────────────────────────────────────────
  {
    type: 'hero',
    title: 'Foundations Complete',
    subtitle: 'PHP Specialist Graduation',
    content: 'You have mastered the foundations: from basic syntax and logic to web features, database connectivity, and the transition to Object Oriented Architecture. You are now fully equipped for the Laravel Masterclass.',
    icon: ShieldCheck,
  },

  // ── 28 · Hero: Project Alpha ───────────────────────────────────────────────
  {
    type: 'hero',
    title: 'Launch Project Alpha',
    subtitle: 'The Capstone Challenge',
    content: 'Challenge: Build a secure "Contact Manager" using PHP and MySQL. Implement search (GET), addition (POST), user login (Sessions), and organize your code using Classes and Namespaces.',
    icon: Rocket,
  }
];

export default function PhpFundamentalsLessonPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <nav
        className="px-8 py-5 sticky top-0 z-50 border-b"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/courses/backend"
            className="group flex items-center gap-2.5 text-sm font-medium transition-colors"
            style={{ color: '#7a7a7a' }}
          >
            <ArrowLeft size={15} />
            <span style={{ letterSpacing: '0.01em' }}>Back to Roadmap</span>
          </Link>

          <div
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest"
            style={{ borderColor: 'rgba(0,0,0,0.08)', color: '#b8b8b8', letterSpacing: '0.16em' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#bf4e20' }}
            />
            Module 01 · PHP Foundations
          </div>
        </div>
      </nav>

      <BackendGenericSlides lessonTitle="PHP Specialist Core" slides={phpSlides} />
    </main>
  );
}