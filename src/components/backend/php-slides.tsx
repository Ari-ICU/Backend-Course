"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ChevronLeft, ChevronRight, Code2, Copy, Check, Play, RotateCcw,
  Server, Database, Globe, Globe2, Lock, Shield, ShieldAlert, ShieldCheck,
  Search, Send, Activity, Layers, List, RefreshCw, Zap, Sparkles,
  Key, Link as LinkIcon, FileCode, Package, Box, ArrowRight,
  Terminal, Rocket, HardDrive, Layout, Workflow,
  Fingerprint, GitBranch, Edit3, Star, Trophy, ShoppingCart, StickyNote,
} from 'lucide-react';

/* ─── SLIDE DATA ─────────────────────────────────────────────────── */
interface Slide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  accent: string;
  bg: string;
  content: string[];
  lab: string;
  result: string;
  syntax: string;
  code: string;
  filename?: string;
  terminal?: string;
  terminalOutput?: string;
  showPreview?: boolean;
  icon: React.ElementType;
}

const slides: Slide[] = [
  /* ─── MONTH 1: PHP FOUNDATION ─── */
  /* WEEK 1: PHP Essentials */
  /* Day 1: Tools & Intro */
  {
    id: "W1-D1-S0", 
    title: "Choose Your IDE", 
    subtitle: "The Developer's Cockpit",
    tag: "PHP Foundation", tagColor: "#34d399", accent: "#10b981",
    bg: "radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.12) 0%, transparent 60%)",
    filename: "ide.md",
    content: [
      "VS Code (Free): The industry standard. FAST and flexible.",
      "https://code.visualstudio.com/",
      "PHPStorm (Professional): Deep intelligence for PHP.",
      "https://www.jetbrains.com/phpstorm/",
      "Antigravity AI: Your Pro-level real-time AI coding collaborator.",
      "https://antigravity.ai/",
      "Pro Tip: Install 'PHP Intelephense' for perfect autocomplete.",
    ],
    lab: "Download and install VS Code or PHPStorm on your machine.",
    result: "Successfully established a professional local development environment.",
    syntax: `Code Editor + Terminal = Power`,
    code: `/* RECOMMENDED EXTENSIONS */\n\n- PHP Intelephense\n- PHP Debug (Xdebug Support)\n- Tailwind CSS IntelliSense`,
    icon: Layout,
  },
  {
    id: "W1-D1-S1", 
    title: "The Backend Engine", 
    subtitle: "What is PHP?",
    tag: "PHP Foundation", tagColor: "#34d399", accent: "#10b981",
    bg: "radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.12) 0%, transparent 60%)",
    filename: "theory.md",
    content: [
      "Definition: Hypertext Preprocessor — a server-side language.",
      "Role: Processes data, talks to DBs, and serves dynamic HTML.",
      "Market Share: Powers ~77% of the web (including WordPress).",
      "Ecosystem: Robust, mature, and remarkably fast in version 8.x.",
    ],
    lab: "Research how PHP differs from client-side Javascript.",
    result: "Understood that PHP hidden on server while JS runs in browser.",
    syntax: `Client <--- HTML --- Server [PHP + SQL]`,
    code: `/* PHP ARCHITECTURE */\n\n1. User requests page.php\n2. Server executes PHP code\n3. PHP pulls data from Database\n4. Server sends ONLY HTML to browser`,
    icon: Globe,
  },
  {
    id: "W1-D1-S2", 
    title: "Server Environment", 
    subtitle: "XAMPP & Localhost",
    tag: "PHP Foundation", tagColor: "#34d399", accent: "#10b981",
    bg: "radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.12) 0%, transparent 60%)",
    filename: "Setup Guide",
    content: [
      "Local Server: Apache or Nginx is needed to 'run' PHP.",
      "Bundles: XAMPP/Laragon provide PHP + Apache + MySQL.",
      "Homebrew: Preferred for Mac users (brew install php).",
      "Document Root: The 'htdocs' folder where your files live.",
    ],
    lab: "Install PHP 8.2+ and check version in terminal.",
    result: "Terminal shows 'PHP 8.x.x (cli)' successfully.",
    syntax: `php -v            # Check version\nphp -S localhost:8000 # Built-in server`,
    code: `# To start a quick server without XAMPP:\ncd your-project-folder\nphp -S localhost:8000`,
    terminal: "php -v",
    terminalOutput: "PHP 8.2.12 (cli) (built: Oct 24 2023)\nCopyright (c) The PHP Group\nZend Engine v4.2.12",
    icon: HardDrive,
  },
  {
    id: "W1-D1-S3", 
    title: "First Echo", 
    subtitle: "Hello PHP World",
    tag: "PHP Foundation", tagColor: "#34d399", accent: "#10b981",
    bg: "radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.12) 0%, transparent 60%)",
    filename: "index.php",
    content: [
      "Open Tag: Every script must start with <?php",
      "Semicolons: Every statement MUST end with a ;",
      "Echo: The primary command for printing text to the screen.",
      "Comments: Use // for single line or /* */ for blocks.",
    ],
    lab: "Echo your name and current date using the date() function.",
    result: "Browser displays: 'Hello, [Your Name]! Today is 2026-03-19'.",
    syntax: `<?php\necho "Text";\n?>`,
    code: `<?php\n\n// My first backend script\necho "Hello, Ratha! ";\n\n/* Show the current year */\necho "Copyright " . date("Y");`,
    terminal: "php index.php",
    terminalOutput: "Hello, Ratha! Copyright 2026",
    showPreview: true,
    icon: Terminal,
  },
  {
    id: "W1-D1-S4", 
    title: "PHP in HTML", 
    subtitle: "The Injection Power",
    tag: "PHP Foundation", tagColor: "#34d399", accent: "#10b981",
    bg: "radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.12) 0%, transparent 60%)",
    filename: "welcome.php",
    content: [
      "Mixing: PHP can be injected directly into HTML files.",
      "Short Tags: Use <?= 'Text' ?> as a shortcut for echo.",
      "Logic Flow: Wrap HTML inside PHP conditions for dynamic UIs.",
      "Rendering: The user never sees the <?php tags in the source.",
    ],
    lab: "Create an H1 tag and use PHP to put your name inside it.",
    result: "HTML h1 rendered with dynamic PHP content.",
    syntax: `<h1><?= $title; ?></h1>`,
    code: `<!DOCTYPE html>\n<html>\n<body>\n    <h1>Welcome</h1>\n    <p>Server Time: <?php echo date("H:i:s"); ?></p>\n</body>\n</html>`,
    terminalOutput: `<!DOCTYPE html>\n<html>\n<body>\n    <h1>Welcome</h1>\n    <p>Server Time: 16:44:08</p>\n</body>\n</html>`,
    showPreview: true,
    icon: Layout,
  },

  /* Day 2: Data & Storage */
  {
    id: "W1-D2-S1", 
    title: "Variables & Types", 
    subtitle: "Memory for your data",
    tag: "PHP Foundation", tagColor: "#818cf8", accent: "#6366f1",
    bg: "radial-gradient(ellipse at 70% 30%, rgba(99,102,241,0.12) 0%, transparent 60%)",
    filename: "variables.php",
    content: [
      "Dollar Sign: All variables start with $ (e.g., $price).",
      "Case Sensitive: $User and $user are different.",
      "Loose Typing: No need to declare 'String' or 'Int'.",
      "Types: String, Integer, Float, Boolean, Array, Object, NULL.",
    ],
    lab: "Create variables for a Product: Name, Price, and IsAvailable.",
    result: "Defined $name (string), $price (float), and $active (bool).",
    syntax: `$varName = value;`,
    code: `<?php\n\n$title = "PHP Course"; // String\n$price = 49.99;          // Float\n$qty = 10;                // Integer\n$isFull = false;          // Boolean\n\necho "Course: $title costs $price";`,
    terminal: "php variables.php",
    terminalOutput: "Course: PHP Course costs $49.99",
    icon: Code2,
  },
  {
    id: "W1-D2-S2", 
    title: "Operators", 
    subtitle: "Math & Logic",
    tag: "PHP Foundation", tagColor: "#818cf8", accent: "#6366f1",
    bg: "radial-gradient(ellipse at 70% 30%, rgba(99,102,241,0.12) 0%, transparent 60%)",
    filename: "math.php",
    content: [
      "Arithmetic: +, -, *, /, % (Modulus).",
      "Assignment: =, +=, -=, *=.",
      "Concatenation: The dot (.) is used to join strings.",
      "Increment: ++$x (pre) vs $x++ (post).",
    ],
    lab: "Calculate the total price for 3 items with 10% tax.",
    result: "Formula: ($price * 3) * 1.1.",
    syntax: `$total = $subtotal . " USD";`,
    code: `<?php\n\n$price = 100;\n$tax = 0.10;\n\n$total = $price + ($price * $tax);\n\necho "The total is: " . $total . " USD";`,
    terminal: "php math.php",
    terminalOutput: "The total is: 110 USD",
    icon: Sparkles,
  },
  {
    id: "W1-D2-S3", 
    title: "Indexed Arrays", 
    subtitle: "Ordered Lists",
    tag: "PHP Foundation", tagColor: "#818cf8", accent: "#6366f1",
    bg: "radial-gradient(ellipse at 70% 30%, rgba(99,102,241,0.12) 0%, transparent 60%)",
    filename: "arrays.php",
    content: [
      "Index: Starts at 0, not 1.",
      "Creation: Use [] (modern) or array() (old).",
      "Count: Use count($arr) to get the length.",
      "Push: $arr[] = 'new' adds to the end.",
    ],
    lab: "Create a list of 5 colors. Print the 3rd color.",
    result: "Correctly accessed index 2 of the array.",
    syntax: `$colors = ["Red", "Blue"];\necho $colors[0];`,
    code: `<?php\n\n$students = ["Sok", "Chea", "Bora"];\n\n// Add new student\n$students[] = "Dara"; \n\necho "Total students: " . count($students) . "\\n";\necho "Third student is: " . $students[2];`,
    terminal: "php arrays.php",
    terminalOutput: "Total students: 4\nThird student is: Bora",
    icon: List,
  },
  {
    id: "W1-D2-S4", 
    title: "Assoc Arrays", 
    subtitle: "The Bridge Operator (=>)",
    tag: "PHP Foundation", tagColor: "#818cf8", accent: "#6366f1",
    bg: "radial-gradient(ellipse at 70% 30%, rgba(99,102,241,0.12) 0%, transparent 60%)",
    filename: "users.php",
    content: [
      "Key-Value: Map custom keys to values (like ID -> Name).",
      "Bridge: Use => to link key to value.",
      "Access: $user['email'] returns the value.",
      "Nesting: Arrays can contain other arrays.",
    ],
    lab: "Build a user profile with name, email, and role.",
    result: "Created a complex data structure for a user.",
    syntax: `[ "key" => "value" ]`,
    code: `<?php\n\n$profile = [\n    "username" => "ratha_dev",\n    "email" => "ratha@example.com",\n    "followers" => 1200\n];\n\necho "User: " . $profile["username"];\necho "\\nEmail: " . $profile["email"];`,
    terminal: "php users.php",
    terminalOutput: "User: ratha_dev\nEmail: ratha@example.com",
    icon: LinkIcon,
  },

  /* Day 3: Logic & Control */
  {
    id: "W1-D3-S1", 
    title: "Conditionals", 
    subtitle: "If / Else Statements",
    tag: "PHP Foundation", tagColor: "#22d3ee", accent: "#06b6d4",
    bg: "radial-gradient(ellipse at 30% 70%, rgba(6,182,212,0.12) 0%, transparent 60%)",
    filename: "logic.php",
    content: [
      "If: Runs code if condition is TRUE.",
      "Else: Runs code if condition is FALSE.",
      "Elseif: Checks a second condition if the first fails.",
      "Braces: {} wrap the block of code to execute.",
    ],
    lab: "Check if $grade is >= 50. Echo 'Pass' or 'Fail'.",
    result: "Logical flow correctly branching based on input.",
    syntax: `if (cond) { ... } else { ... }`,
    code: `<?php\n\n$hour = date("H");\n\nif ($hour < 12) {\n    echo "Good Morning!";\n} elseif ($hour < 18) {\n    echo "Good Afternoon!";\n} else {\n    echo "Good Evening!";\n}`,
    terminal: "php logic.php",
    terminalOutput: "Good Afternoon!",
    icon: ShieldCheck,
  },
  {
    id: "W1-D3-S2", 
    title: "Comparisons", 
    subtitle: "Strict vs Loose",
    tag: "PHP Foundation", tagColor: "#22d3ee", accent: "#06b6d4",
    bg: "radial-gradient(ellipse at 30% 70%, rgba(6,182,212,0.12) 0%, transparent 60%)",
    filename: "compare.php",
    content: [
      "==: Loose equality (1 == '1' is true).",
      "===: Strict equality (1 === '1' is false) — Best Practice.",
      "!= / !==: Inequalities.",
      ">, <, >=, <=: Numeric comparisons.",
    ],
    lab: "Test comparison between integer 10 and string '10'.",
    result: "Understood why === is safer for security.",
    syntax: `$a === $b // Check type AND value`,
    code: `<?php\n\n$password = "12345";\n\n// Strict check is safer\nif ($password === 12345) {\n    echo "Logged In";\n} else {\n    echo "Invalid Type!";\n}`,
    terminal: "php compare.php",
    terminalOutput: "Invalid Type!",
    icon: Lock,
  },
  {
    id: "W1-D3-S3", 
    title: "Logical Ops", 
    subtitle: "Complex conditions",
    tag: "PHP Foundation", tagColor: "#22d3ee", accent: "#06b6d4",
    bg: "radial-gradient(ellipse at 30% 70%, rgba(6,182,212,0.12) 0%, transparent 60%)",
    filename: "security.php",
    content: [
      "&& (AND): Both conditions must be true.",
      "|| (OR): At least one must be true.",
      "! (NOT): Reverses the boolean value.",
      "Combined: if ($isLoggedIn && $isAdmin).",
    ],
    lab: "Allow entry only if user has an 'Active' status AND is 18+.",
    result: "Restricted content based on multiple conditions.",
    syntax: `if ($age > 18 && $id === true)`,
    code: `<?php\n\n$is_admin = true;\n$is_blocked = false;\n\nif ($is_admin && !$is_blocked) {\n    echo "Welcome to Dashboard";\n} else {\n    echo "Access Denied";\n}`,
    terminal: "php security.php",
    terminalOutput: "Welcome to Dashboard",
    icon: ShieldAlert,
  },
  {
    id: "W1-D3-S4", 
    title: "Switch / Match", 
    subtitle: "Multiple values",
    tag: "PHP Foundation", tagColor: "#22d3ee", accent: "#06b6d4",
    bg: "radial-gradient(ellipse at 30% 70%, rgba(6,182,212,0.12) 0%, transparent 60%)",
    filename: "roles.php",
    content: [
      "Switch: Better for checking many values of one variable.",
      "Break: Stops the execution once a match is found.",
      "Default: Fallback if no cases match.",
      "Match (PHP 8): Cleaner, returnable version of switch.",
    ],
    lab: "Assign a message based on user role: 'admin', 'editor', 'guest'.",
    result: "Used switch to handle 3 different roles.",
    syntax: `switch($role) { case 'admin': ... }`,
    code: `<?php\n\n$role = "admin";\n\nswitch ($role) {\n    case "admin":\n        echo "Full Access granted";\n        break;\n    case "editor":\n        echo "Edit access only";\n        break;\n    default:\n        echo "View only";\n}`,
    terminal: "php roles.php",
    terminalOutput: "Full Access granted",
    icon: Activity,
  },

  /* Day 4: Repetition & Reusability */
  {
    id: "W1-D4-S1", 
    title: "The Foreach King", 
    subtitle: "Looping through life",
    tag: "PHP Foundation", tagColor: "#fbbf24", accent: "#f59e0b",
    bg: "radial-gradient(ellipse at 60% 40%, rgba(245,158,11,0.12) 0%, transparent 60%)",
    filename: "loop.php",
    content: [
      "Foreach: The industry standard for arrays.",
      "Syntax: foreach ($array as $value).",
      "Keys: foreach ($array as $key => $value).",
      "Dynamic: Automatically stops at the end of the data.",
    ],
    lab: "Loop through [10, 20, 30] and echo 'Price: [number]'.",
    result: "Dynamically generated 3 lines of output.",
    syntax: `foreach ($arr as $v)`,
    code: `<?php\n\n$colors = ["Red", "Green", "Blue"];\n\nforeach ($colors as $color) {\n    echo "I love $color\\n";\n}`,
    terminal: "php loop.php",
    terminalOutput: "I love Red\nI love Green\nI love Blue",
    showPreview: true,
    icon: RotateCcw,
  },
  {
    id: "W1-D4-S2", 
    title: "While & For", 
    subtitle: "Traditional loops",
    tag: "PHP Foundation", tagColor: "#fbbf24", accent: "#f59e0b",
    bg: "radial-gradient(ellipse at 60% 40%, rgba(245,158,11,0.12) 0%, transparent 60%)",
    filename: "counter.php",
    content: [
      "For: Used when you know the total loop count.",
      "While: Used when you loop 'until' something happens.",
      "Infinity: Beware of while(true) without a break!",
      "Structure: (Init; Condition; Increment).",
    ],
    lab: "Count from 10 down to 1 using a for loop.",
    result: "Countdown visible in terminal.",
    syntax: `for ($i=0; $i<5; $i++)`,
    code: `<?php\n\n// Classic For\nfor ($i = 1; $i <= 3; $i++) {\n    echo "Step $i\\n";\n}\n\n// While\n$c = 0;\nwhile ($c < 2) {\n    echo "Counting...\\n";\n    $c++;\n}`,
    terminal: "php counter.php",
    terminalOutput: "Step 1\nStep 2\nStep 3\nCounting...\nCounting...",
    icon: RefreshCw,
  },
  {
    id: "W1-D4-S3", 
    title: "Intro to Functions", 
    subtitle: "Don't Repeat Yourself (DRY)",
    tag: "PHP Foundation", tagColor: "#fbbf24", accent: "#f59e0b",
    bg: "radial-gradient(ellipse at 60% 40%, rgba(245,158,11,0.12) 0%, transparent 60%)",
    filename: "functions.php",
    content: [
      "Functions: Reusable blocks of code stored in memory.",
      "Naming: CamelCase or snake_case are common.",
      "Parameters: Variables passed into the function.",
      "Arguments: The actual values provided when calling.",
    ],
    lab: "Write a function greet($name) that echoes 'Hi [name]!'.",
    result: "Successfully reused code by calling greet('Ratha').",
    syntax: `function myFunc($p) { ... }`,
    code: `<?php\n\nfunction showUser($name) {\n    echo "User: " . $name . "\\n";\n}\n\nshowUser("Alice");\nshowUser("Bob");`,
    terminal: "php functions.php",
    terminalOutput: "User: Alice\nUser: Bob",
    icon: Zap,
  },
  {
    id: "W1-D4-S4", 
    title: "Returns & Scopes", 
    subtitle: "Sending data back",
    tag: "PHP Foundation", tagColor: "#fbbf24", accent: "#f59e0b",
    bg: "radial-gradient(ellipse at 60% 40%, rgba(245,158,11,0.12) 0%, transparent 60%)",
    filename: "calculation.php",
    content: [
      "Return: Ends function execution and gives back a value.",
      "Local Scope: Variables inside functions stay inside.",
      "Global Scope: Variables outside are not accessible inside (usually).",
      "Type Hinting: function add(int $a): int { }.",
    ],
    lab: "Create a function add($a, $b) that returns the sum.",
    result: "Calculated sum and used it in a calculation outside.",
    syntax: `return $result;`,
    code: `<?php\n\nfunction calculateTax($sub) {\n    return $sub * 0.10;\n}\n\n$tax = calculateTax(500);\necho "Tax to pay: $$tax";`,
    terminal: "php calculation.php",
    terminalOutput: "Tax to pay: $50",
    icon: Sparkles,
  },

  /* Day 5: OOP & Advanced */
  {
    id: "W1-D5-S1", 
    title: "OOP: Classes", 
    subtitle: "The Blueprint",
    tag: "PHP Foundation", tagColor: "#fb923c", accent: "#f97316",
    bg: "radial-gradient(ellipse at 25% 55%, rgba(249,115,22,0.12) 0%, transparent 60%)",
    filename: "User.php",
    content: [
      "Class: The model or template (e.g., User).",
      "Properties: Data held by the class.",
      "Visibility: public, private, protected.",
      "Instance: A concrete realization (e.g., $me = new User()).",
    ],
    lab: "Define a class 'Car' with $brand property.",
    result: "Created a template to build multiple Car objects.",
    syntax: `class MyClass { ... }`,
    code: `<?php\n\nclass User {\n    public $username;\n}\n\n$ratha = new User();\n$ratha->username = "Ratha";\n\necho "Active User: " . $ratha->username;`,
    terminal: "php User.php",
    terminalOutput: "Active User: Ratha",
    icon: Box,
  },
  {
    id: "W1-D5-S2", 
    title: "OOP: Methods", 
    subtitle: "Object Actions",
    tag: "PHP Foundation", tagColor: "#fb923c", accent: "#f97316",
    bg: "radial-gradient(ellipse at 25% 55%, rgba(249,115,22,0.12) 0%, transparent 60%)",
    filename: "Product.php",
    content: [
      "Methods: Functions defined within a class.",
      "$this: Refers to the current object instance.",
      "Calling: Use the arrow operator ($obj->method()).",
      "Logic: Methods handle the behavior of the object.",
    ],
    lab: "Add a method 'getDiscountedPrice()' to a Product class.",
    result: "The object now calculates its own discounted price.",
    syntax: `$this->property`,
    code: `<?php\n\nclass Product {\n    public $price = 100;\n\n    public function getPrice() {\n        return $this->price;\n    }\n}\n\n$p = new Product();\necho "Price is: " . $p->getPrice();`,
    terminal: "php Product.php",
    terminalOutput: "Price is: 100",
    icon: Workflow,
  },
  {
    id: "W1-D5-S3", 
    title: "OOP: Construct", 
    subtitle: "Magic initialization",
    tag: "PHP Foundation", tagColor: "#fb923c", accent: "#f97316",
    bg: "radial-gradient(ellipse at 25% 55%, rgba(249,115,22,0.12) 0%, transparent 60%)",
    filename: "Construct.php",
    content: [
      "__construct: Runs automatically when 'new' is called.",
      "Purpose: Setting initial data for the object.",
      "Parameters: Pass data into object on creation.",
      "Magic Method: Starts with double underscores.",
    ],
    lab: "Pass 'MacBook' and 1200 into a Product constructor.",
    result: "Object initialized with data in one line.",
    syntax: `public function __construct()`,
    code: `<?php\n\nclass Course {\n    public $name;\n\n    public function __construct($n) {\n        $this->name = $n;\n    }\n}\n\n$api = new Course("PHP API");\necho "Course initialized: " . $api->name;`,
    terminal: "php Construct.php",
    terminalOutput: "Course initialized: PHP API",
    icon: Sparkles,
  },
  {
    id: "W1-D5-S4", 
    title: "Week 1 Finale", 
    subtitle: "Foundation Complete",
    tag: "PHP Foundation", tagColor: "#34d399", accent: "#10b981",
    bg: "radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.12) 0%, transparent 60%)",
    filename: "Pro Challenge",
    content: [
      "Recap: You learned Setup, Variables, Logic, Loops, and OOP.",
      "Next Level: Building solid backend systems with pure PHP.",
      "Milestone: You can now build CLI tools and simple scripts.",
      "Pro Tip: Use Antigravity AI to debug and refactor your logic.",
    ],
    lab: "Build a mini system that loops through users and echoes their roles.",
    result: "Synthesized all Week 1 knowledge into a working project.",
    syntax: `DONE: Week 1 Foundation`,
    code: `<?php\n\n// --- ZERO TO PRO STATUS ---\n\n1. Setup OK ✅\n2. Logic OK ✅\n3. Loops OK ✅\n4. Classes OK ✅\n\nMOVING TO WEEK 2...`,
    terminal: "php --version",
    terminalOutput: "PHP Mastery: Level 1 ACHIEVED\nProceeding to the next modules...",
    icon: Trophy,
  },


];

/* ─── PHP SYNTAX HIGHLIGHTER ─────────────────────────────────────── */
const PHP_KEYWORDS = new Set([
  'php','echo','print','return','if','else','elseif','foreach','for',
  'while','do','switch','case','break','continue','class','extends',
  'implements','interface','trait','namespace','use','new','public',
  'protected','private','static','abstract','final','function','fn',
  'array','string','int','float','bool','void','null','true','false',
  'require','include','require_once','include_once','throw','try',
  'catch','finally','match','readonly','const','enum',
]);

const HighlightedCode = ({ code }: { code: string }) => {
  const tokenizeLine = (line: string): React.ReactNode => {
    if (line.trimStart().startsWith('//') || line.trimStart().startsWith('#'))
      return <span style={{ color: '#6b7280', fontStyle: 'italic' }}>{line}</span>;
    if (line.trimStart().startsWith('/*') || line.trimStart().startsWith('*'))
      return <span style={{ color: '#6b7280', fontStyle: 'italic' }}>{line}</span>;

    const parts = line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\$[a-zA-Z_]\w*|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_]\w*\b)/g);
    return parts.map((part, i) => {
      if (!part) return null;
      if (part.startsWith('$')) return <span key={i} style={{ color: '#fbbf24' }}>{part}</span>;
      if (PHP_KEYWORDS.has(part)) return <span key={i} style={{ color: '#f87171', fontWeight: 700 }}>{part}</span>;
      if (part.startsWith('"')) {
        const internalParts = part.split(/(\$[a-zA-Z_]\w*)/g);
        return (
          <span key={i} style={{ color: '#86efac' }}>
            {internalParts.map((ip, j) => 
              ip.startsWith('$') 
                ? <span key={j} style={{ color: '#fbbf24', fontWeight: 600 }}>{ip}</span>
                : ip
            )}
          </span>
        );
      }
      if (part.startsWith("'")) return <span key={i} style={{ color: '#86efac' }}>{part}</span>;
      if (/^\d/.test(part)) return <span key={i} style={{ color: '#c084fc' }}>{part}</span>;
      if (/^[A-Z]/.test(part)) return <span key={i} style={{ color: '#fbbf24' }}>{part}</span>;
      return <span key={i} style={{ color: '#e2e8f0' }}>{part}</span>;
    });
  };

  return (
    <div className="font-mono text-sm leading-6 whitespace-pre"
      style={{ fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace" }}>
      {code.split('\n').map((line, i) => (
        <div key={i} className="min-h-[1.5rem]">{tokenizeLine(line)}</div>
      ))}
    </div>
  );
};

/* ─── SYNTAX PANEL ───────────────────────────────────────────────── */
const SyntaxPanel = ({ syntax, accent }: { syntax: string; accent: string }) => {
  if (!syntax) return null;
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: `${accent}30`, background: `${accent}08` }}>
      <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: `${accent}20` }}>
        <Code2 className="w-3 h-3" style={{ color: accent }} />
        <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: accent }}>Syntax Reference</span>
      </div>
      <div className="p-3 text-xs leading-6 font-mono whitespace-pre text-zinc-300 overflow-x-auto"
        style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace" }}>
        {syntax.split('\n').map((line, i) => (
          <div key={i} className="min-h-[1.5rem]">
            {line.trimStart().startsWith('//') || line.trimStart().startsWith('#')
              ? <span style={{ color: '#6b7280', fontStyle: 'italic' }}>{line}</span>
              : line}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── CODE VIEWER ────────────────────────────────────────────────── */
const CodeViewer = ({ code: initialCode, terminal, terminalOutput: initialOutput, accent, title, showPreview }: { code: string; terminal?: string; terminalOutput?: string; accent: string; title: string; showPreview?: boolean }) => {
  const [activeTab, setActiveTab] = useState<'code' | 'terminal' | 'preview'>('code');
  const [code, setCode] = useState(initialCode);
  const [terminalOutput, setTerminalOutput] = useState(initialOutput);
  const [copied, setCopied] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  // Sync state when slide changes
  useEffect(() => {
    setCode(initialCode);
    setTerminalOutput(initialOutput);
  }, [initialCode, initialOutput]);

  const lines = code.split('\n');

  const copy = () => {
    const textToCopy = activeTab === 'code' ? code : (terminalOutput || '');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const syncScroll = () => {
    if (taRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = taRef.current.scrollTop;
      highlightRef.current.scrollLeft = taRef.current.scrollLeft;
    }
  };

  const simulateExecution = (newCode: string) => {
    // If the code is identical to initial, don't simulate (keep hardcoded output)
    if (newCode.trim() === initialCode.trim()) {
      setTerminalOutput(initialOutput);
      return;
    }

    if (title.includes('.php')) {
      // Improved regex to capture more of the echo statement
      const echoRegex = /(?:echo|print)\s+["'](.*?)["'](?:\s*\.\s*\.[^;]+)?;/g;
      const shortEchoRegex = /<\?=\s+["'](.*?)["']\s*\?>/g;
      
      let outputs: string[] = [];
      let match;
      
      while ((match = echoRegex.exec(newCode)) !== null) {
        outputs.push(match[1]);
      }
      while ((match = shortEchoRegex.exec(newCode)) !== null) {
        outputs.push(match[1]);
      }

      if (outputs.length > 0) {
        setTerminalOutput(outputs.join('\n'));
      }
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCode(val);
    simulateExecution(val);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#080c14] overflow-hidden">
      {/* Top Controller Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d1117] border-b border-white/5 flex-none">
        <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'code' 
                ? 'bg-white/10 text-white shadow-lg' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Code Editor
          </button>
          <button
            onClick={() => {
              setActiveTab('terminal');
              simulateExecution(code);
            }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'terminal' 
                ? 'bg-white/10 text-white shadow-lg' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Terminal
          </button>
          
          {showPreview && (
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'preview' 
                  ? 'bg-white/10 text-white shadow-lg' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Preview
            </button>
          )}
        </div>

        <button
          className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
          onClick={() => {
            setCode(initialCode);
            setTerminalOutput(initialOutput);
          }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* File Info Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1117]/50 border-b border-white/5 flex-none">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/40" />
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2.5 py-1">
            <FileCode className="w-3 h-3" style={{ color: accent }} />
            <span className="text-[10px] font-mono text-zinc-400">
              {activeTab === 'code' ? title : activeTab === 'terminal' ? 'bash — terminal' : 'browser — preview'}
            </span>
          </div>
        </div>
        <button 
          onClick={copy}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
            copied 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
        </button>
      </div>

      {/* Editor Content */}
      <div className="flex-1 relative overflow-hidden bg-[#080c14]">
        {activeTab === 'code' ? (
          <div className="flex h-full overflow-hidden">
            <div className="flex-none w-10 bg-[#080c14] border-r border-white/5 pt-4 pb-4 flex flex-col items-end pr-3 overflow-hidden select-none">
              {lines.map((_, i) => (
                <div key={i} className="text-[11px] font-mono text-zinc-700 leading-6 min-h-[1.5rem]">{i + 1}</div>
              ))}
            </div>
            <div className="relative flex-1 overflow-hidden">
              <div ref={highlightRef} className="absolute inset-0 overflow-auto p-4 pt-4 pointer-events-none" style={{ scrollbarWidth: 'none' }}>
                <HighlightedCode code={code} />
              </div>
              <textarea 
                ref={taRef} 
                value={code} 
                onChange={handleCodeChange}
                onScroll={syncScroll}
                className="absolute inset-0 w-full h-full bg-transparent text-transparent resize-none outline-none p-4 pt-4 font-mono text-sm leading-6 border-none overflow-auto selection:bg-emerald-500/25"
                style={{ fontFamily: "'JetBrains Mono',monospace", whiteSpace: 'pre', overflowWrap: 'normal' }}
                spellCheck={false} wrap="off" />
            </div>
          </div>
        ) : activeTab === 'terminal' ? (
          <div className="p-6 font-mono text-sm leading-relaxed overflow-auto h-full">
            <div className="flex gap-2 text-zinc-500 mb-2">
              <span className="text-emerald-500">➜</span>
              <span className="text-blue-400">~/php-project</span>
              <span className="text-zinc-600 font-bold">$</span>
              <span className="text-zinc-200">{terminal || (title.includes('index.php') || title.includes('script.php') ? "php index.php" : "php artisan serve")}</span>
            </div>
            <div className="text-zinc-200 mt-4 h-full">
              {terminalOutput ? (
                <pre className="whitespace-pre-wrap">{terminalOutput}</pre>
              ) : (
                <div className="text-zinc-400 animate-pulse">
                   &gt; No server output yet.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-white p-8 overflow-auto text-black">
             {terminalOutput ? (
               <div dangerouslySetInnerHTML={{ __html: terminalOutput }} />
             ) : (
               <div className="text-zinc-400 italic">No preview available. Run the code first.</div>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function PHPLessonContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSlide = Math.max(0, Math.min(parseInt(searchParams.get('slide') || '1') - 1, slides.length - 1));

  const [current, setCurrent] = useState(initialSlide);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dir, setDir] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});

  const slide = slides[current];
  const IconComp = slide.icon;
  const progress = ((current + 1) / slides.length) * 100;

  // Persistence for notes
  useEffect(() => {
    const saved = localStorage.getItem('php_masterclass_notes');
    if (saved) setUserNotes(JSON.parse(saved));
  }, []);

  const saveNote = (val: string) => {
    const next = { ...userNotes, [slide.id]: val };
    setUserNotes(next);
    localStorage.setItem('php_masterclass_notes', JSON.stringify(next));
  };

  useEffect(() => {
    const mod = searchParams.get('module');
    if (mod) {
      const moduleMap: Record<string, number> = {
        '01': 0,  // W1-D1
        '02': 28, // W3-D1
        '03': 38, // W5-D1
        '04': 50, // W7-D1
        '05': 60, // W9-D1
        '06': 71, // W11-D1
      };
      if (moduleMap[mod] !== undefined) {
        setCurrent(moduleMap[mod]);
      }
    }
  }, []); // Only on mount

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('slide', (current + 1).toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [current]);

  const goTo = useCallback((idx: number, direction: number) => {
    if (isAnimating) return;
    setDir(direction);
    setIsAnimating(true);
    setTimeout(() => { setCurrent(idx); setIsAnimating(false); }, 300);
  }, [isAnimating]);

  const next = () => goTo((current + 1) % slides.length, 1);
  const prev = () => goTo((current - 1 + slides.length) % slides.length, -1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, isAnimating]);

  const variants = {
    enter: (d: number) => ({ x: d * 50, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:  (d: number) => ({ x: d * -50, opacity: 0, scale: 0.97 }),
  };

  return (
    <div className="min-h-screen text-white flex flex-col overflow-hidden"
      style={{ background: '#080c14', fontFamily: "'Inter','DM Sans',system-ui,sans-serif" }}>

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none transition-all duration-700" style={{ background: slide.bg }} />
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 70%)' }} />

      {/* ── HEADER ── */}
      <header className="relative z-20 flex items-center gap-4 px-6 py-4 border-b border-white/8 bg-black/20 backdrop-blur-xl flex-none mt-16 lg:mt-0">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/10 flex-none"
          style={{ background: `${slide.accent}20` }}>
          <IconComp className="w-4 h-4" style={{ color: slide.accent }} />
        </div>
        <div className="flex-none">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">Month 1-3 · Weeks 1–12</p>
          <p className="text-sm font-black text-white tracking-tight uppercase">PHP Masterclass</p>
        </div>

        <div className="flex-1 mx-6 hidden md:block">
          <div className="h-0.5 bg-white/8 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: slide.accent }} />
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
              showNotes 
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' 
              : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <StickyNote className="w-3.5 h-3.5" />
            {userNotes[slide.id] ? 'Edit Notes' : 'Take Notes'}
          </button>
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border"
            style={{ color: slide.tagColor, borderColor: `${slide.tagColor}40`, background: `${slide.tagColor}12` }}>
            {slide.tag}
          </span>
          <span className="text-xs font-mono text-zinc-600 ml-1">
            {current + 1}<span className="text-zinc-800">/{slides.length}</span>
          </span>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* LEFT — Lesson content */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={`left-${current}`} custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="flex-none lg:w-1/2 flex flex-col justify-between p-7 lg:p-12 xl:p-16 lg:border-r border-white/8 overflow-y-auto">

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl font-black tabular-nums leading-none flex-none pt-1"
                  style={{ color: `${slide.accent}35`, fontFamily: "'JetBrains Mono',monospace" }}>
                  {slide.id}
                </div>
                <div>
                  <h1 className="text-3xl xl:text-5xl font-black leading-tight text-white mb-2 group-hover:text-blue-400 tracking-tighter italic">
                    {slide.title}
                  </h1>
                  <p className="text-lg xl:text-xl text-white/50 font-bold uppercase tracking-widest">💡 {slide.subtitle}</p>
                </div>
              </div>

              <div className="space-y-3">
                {slide.content.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }} className="flex items-start gap-3">
                    <div className="w-2.5 h-2.5 rounded-full mt-2.5 flex-none shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ background: slide.accent }} />
                    {item.startsWith('http') ? (
                      <a href={item} target="_blank" rel="noopener noreferrer" 
                        className="text-lg xl:text-2xl text-blue-400 hover:text-blue-300 underline underline-offset-8 transition-colors break-all">
                        {item}
                      </a>
                    ) : (
                      <p className="text-lg xl:text-2xl text-white leading-relaxed font-medium tracking-tight whitespace-pre-line">{item}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              <SyntaxPanel syntax={slide.syntax} accent={slide.accent} />

              <div className="space-y-3">
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="rounded-2xl border p-4 flex gap-3.5"
                  style={{ background: `${slide.accent}0a`, borderColor: `${slide.accent}28` }}>
                  <Play className="w-4 h-4 flex-none mt-1" style={{ color: slide.accent }} />
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] mb-2" style={{ color: slide.accent }}>🛠 Lab Exercise</p>
                    <p className="text-lg xl:text-xl text-white leading-relaxed font-bold">{slide.lab}</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="rounded-2xl border p-4 flex gap-3.5 bg-emerald-500/5 border-emerald-500/15">
                  <Check className="w-4 h-4 flex-none mt-1 text-emerald-400" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] mb-2 text-emerald-400">✅ Expected Result</p>
                    <p className="text-lg xl:text-xl text-white leading-relaxed font-bold">{slide.result}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-10 lg:mt-0">
              <button onClick={prev}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2 group">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold hidden sm:inline">Previous</span>
              </button>
              <button onClick={next}
                className="flex-1 py-3.5 px-6 rounded-2xl font-black text-xs active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/20"
                style={{ background: slide.accent, color: '#000' }}>
                {current === slides.length - 1 ? 'Start Again' : 'Next Lesson'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* RIGHT — Code viewer */}
        <div className="flex-none lg:w-1/2 flex flex-col overflow-hidden p-4 lg:p-8 xl:p-12 gap-4">
          <div className="flex items-center justify-between flex-none">
            <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1.5 border border-white/8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest shadow-inner"
                style={{ background: `${slide.accent}25`, color: slide.accent }}>
                <Terminal className="w-4 h-4" /> 💻 Interactive Implementation
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={`code-${current}`}
              initial={{ opacity: 0, y: 12, scale: 0.99 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }} 
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="flex-1 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <CodeViewer 
                code={slide.code} 
                terminal={slide.terminal} 
                terminalOutput={slide.terminalOutput} 
                accent={slide.accent} 
                title={slide.filename || (slide.id.startsWith('W1') ? 'index.php' : (slide.id.startsWith('W4') ? 'view.blade.php' : 'app/Http/Controllers/Controller.php'))} 
                showPreview={slide.showPreview}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* --- NOTES PANEL (Overlay) --- */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-80 bg-[#161b22] border-l border-white/10 z-[100] shadow-2xl p-6 flex flex-col pt-24"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-amber-400">Student Notes</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1">Slide {slide.id}</p>
              </div>
              <button onClick={() => setShowNotes(false)} className="text-zinc-500 hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <textarea
              autoFocus
              value={userNotes[slide.id] || ''}
              onChange={(e) => saveNote(e.target.value)}
              placeholder="Type your notes for this slide here... (Auto-saves)"
              className="flex-1 w-full bg-black/40 rounded-2xl p-4 text-sm font-medium text-zinc-300 resize-none outline-none border border-white/5 focus:border-amber-500/40 transition-all placeholder:text-zinc-700 font-mono"
            />

            <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <p className="text-[10px] text-amber-500/70 font-bold uppercase leading-relaxed">
                💡 Tip: Use notes to save lab results, snippets, or questions for your mentor.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
