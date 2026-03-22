'use client';

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor } from "lucide-react";

const GLOBAL_STYLE = (theme: 'dark' | 'light') => `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Serif+Display:ital@0;1&family=Noto+Sans+Khmer:wght@400;700;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: ${theme === 'dark' ? '#0d0d0d' : '#ffffff'};
    --card: ${theme === 'dark' ? '#161616' : '#f9f9f9'};
    --border: ${theme === 'dark' ? '#2a2a2a' : '#eeeeee'};
    --dim: ${theme === 'dark' ? '#666666' : '#888888'};
    --ink: ${theme === 'dark' ? '#f0f0f0' : '#000000'};
    --ghost: ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
    --header-bg: ${theme === 'dark' ? '#080a11' : '#f0f4f8'};
  }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }
  body { background: var(--bg); color: var(--ink); }
  button { cursor: pointer; }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.02); } }
`;

const ACCENT = "#e8ff47", GREEN = "#4ade80", BLUE = "#38bdf8";
const PINK = "#f472b6", ORANGE = "#fb923c", PURPLE = "#a78bfa", TEAL = "#2dd4bf";

// ─────────────────────────────────────────────────────────────
interface Bullet {
  icon: string;
  label: string;
  desc: string;
}

interface SlideData {
  num: string;
  chapter: string;
  chapterColor: string;
  tag: string;
  tagColor: string;
  icon: string; // New field
  title: string;
  subtitle: string;
  body: string;
  bullets: Bullet[];
  code: string | null;
  concept?: string | null;
  syntax?: string | null;
  workflow?: string | null;
  output: string | null;
  tip: string;
}

interface ChapterData {
  name: string;
  color: string;
  nums: string[];
  icon: string; // New field
}

// ─────────────────────────────────────────────────────────────
const SLIDES: SlideData[] = [
  {
    num: "01", chapter: "Foundations", chapterColor: BLUE,
    tag: "Intro", tagColor: BLUE, icon: "🖥️",
    title: "What is PHP?",
    subtitle: "Server-side · Dynamic web · Request/Response flow",
    body: `PHP (Hypertext Preprocessor) គឺជា **server-side scripting language** ។ PHP ដំណើរការនៅ **server** ─ generate HTML ─ ផ្ញើ HTML ទៅ browser ។ User មើលឃើញតែ HTML, មិនឃើញ PHP source code ។`,
    bullets: [
      { icon: "🖥️", label: "Server-side", desc: "Code ដំណើរការនៅ server ─ មិនមែន browser" },
      { icon: "🔗", label: "Works with HTML", desc: "Embed PHP ក្នុង HTML ដោយ <?php ?> tags" },
      { icon: "⚙️", label: "Backend language", desc: "Handle DB, forms, authentication, file uploads" },
      { icon: "🌍", label: "77% of the web", desc: "WordPress · Wikipedia · Facebook ─ all PHP" },
    ],
    code: `<?php
// ── PHP Request / Response Flow ──────────────────
//
// 1. Browser ── HTTP Request [GET /] ──▶ Apache/Nginx
// 2. Server  ── PHP Engine runs code ──▶ HTML Generated
// 3. Browser ◀── HTTP Response [HTML] ── Server
//
// ───────────────────────────────────────────────

echo "PHP Version: " . phpversion() . "\n";
echo "Server Time: " . date("Y-m-d H:i:s") . "\n";
echo "Hello from the server! 👋";
?>`,
    output: `// Server-side execution result
PHP Version: 8.3.4
Server Time: 2026-03-22 13:50:42
Hello from the server! 👋`,
    syntax: `// ── PHP Basics Syntax ──────────────────────
//
//  echo "s"     : Output string to browser
//  phpversion() : Get current PHP version
//  date("Y-m-d"): Format current timestamp
//  .            : String concatenation (join)
//  "\\n"         : New line (in terminal/cli)
//
// ──────────────────────────────────────────`,
    tip: "PHP ត្រូវ run លើ server (XAMPP/Laragon) ─ browser មិនអាចអាន code PHP ផ្ទាល់បានទេ គឺអានបានតែ HTML ចេញពី server!",
    workflow: `// ── Server Execution Life Cycle ────────────
//
// 1. Client: URL input (វាយ URL ចូល)
// 2. Request: Sent to server (ផ្ញើ request ទៅ server)
// 3. Process: PHP runs at server (PHP ដើរនៅ server)
// 4. Content: HTML generated (បង្កើតជា HTML)
// 5. Render: Browser shows HTML (បង្ហាញលើ browser)
//
// ──────────────────────────────────────────`,
  },
  {
    num: "02", chapter: "Foundations", chapterColor: BLUE,
    tag: "First Code", tagColor: GREEN, icon: "🚀",
    title: "Your First PHP Code",
    subtitle: "<?php ?> · echo · print · comments · semicolon",
    body: `PHP code ត្រូវ wrap ក្នុង **<?php ?>** tags ។ ប្រើ **echo** ឬ **print** ដើម្បី output text ។ Statement ទាំងអស់ចប់ដោយ **semicolon (;)** ─ missing semicolon = Parse Error ។`,
    bullets: [
      { icon: "🏷️", label: "<?php ?>", desc: "PHP tags ─ server processes code inside these" },
      { icon: "📢", label: "echo", desc: "Output text/HTML ─ most used, accepts multiple args" },
      { icon: "🔚", label: "Semicolon ;", desc: "Ends every statement ─ missing = fatal Parse Error!" },
      { icon: "💬", label: "Comments", desc: "// single line   /* multi-line */   # old style" },
    ],
    code: `<?php
// 1. Output Basics
echo "Hello World!";      // Most common
print "Hello Studies";   // Returns 1

// 2. Shorthand Echo (Used inside HTML)
?>
<h2><?= "Welcome to PHP!" ?></h2>
<?php

// 3. Comments in PHP
// Line comment
# Shell-style comment
/* Block comment 
   multiple lines */

// 4. Double vs Single Quotes
$name = "Ratha";
echo "Hello $name";   // Interpolation: Hello Ratha
echo 'Hello $name';   // Literal: Hello $name

// 5. Escaping characters
echo "He said: \"PHP is great\""; 
?>`,
    syntax: `// ── PHP Syntax Foundation ──────────────────
//
//  <?php ... ?> : Standard PHP tags
//  <?= ... ?>   : Shorthand echo tag
//  echo         : Most used output command
//  ;            : REQUIRED at end of line!
//  // or #      : Single-line comment
//  /* ... */    : Multi-line comment block
//
// ──────────────────────────────────────────`,
    output: `Hello World!
Hello Studies
<h2>Welcome to PHP!</h2>

Hello Ratha
Hello $name
He said: "PHP is great"`,
    tip: "ប្រសិនបើ file របស់អ្នកមានតែ code PHP សុទ្ធ (no HTML), អ្នកមិនចាំបាច់ដាក់ tags បិទ ?> នៅចុងក្រោយទេ ដើម្បីការពារ error whitespace!",
    workflow: `// ── Basic Syntax Execution ─────────────────
//
// 1. Search: Find <?php tag (ស្វែងរក tag)
// 2. Context: PHP mode starts (ចូលរបៀប PHP)
// 3. Execute: Process line by line (ដើរតាមបន្ទាត់)
// 4. Output: Send strings to buffer (បញ្ជូនលទ្ធផល)
// 5. Finish: Final HTML ready (HTML រួចរាល់)
//
// ──────────────────────────────────────────`,
  },
  {
    num: "03", chapter: "Foundations", chapterColor: BLUE,
    tag: "Variables", tagColor: ORANGE, icon: "📦",
    title: "Variables",
    subtitle: "$ · naming rules · assignment · var_dump · constants",
    body: `Variable ជា **named container** ដែល store data ។ PHP variables ចាប់ផ្តើមដោយ **$** ─ case-sensitive ─ dynamically typed ។ ប្រើ **var_dump()** debug ─ **define()** ឬ **const** សម្រាប់ constants ។`,
    bullets: [
      { icon: "$", label: "Dollar sign $", desc: "All variables: $name $age $total ─ required prefix" },
      { icon: "=", label: "Assignment =", desc: "$x = 10; ─ = assigns, == compares, === strict compare" },
      { icon: "🔤", label: "Case-sensitive", desc: "$Name ≠ $name ─ completely different variables!" },
      { icon: "🔍", label: "var_dump()", desc: "Shows TYPE + VALUE ─ best debugging tool in PHP" },
    ],
    code: `<?php
// 1. Declaration & Assignment
$username = "ratha_dev";  // String
$age      = 20;           // Integer
$is_admin = true;         // Boolean

// 2. Variable Rules
// $1name = "bad";       // NO: Cannot start with digit
// $my-name = "bad";     // NO: No hyphens allowed
$my_name = "Good ✅";    // YES: Underscore ok

// 3. Case Sensitivity
$color = "blue";
$COLOR = "red";
echo "My car is $color";  // blue

// 4. Debugging with var_dump()
var_dump($username);      // string(9) "ratha_dev"
var_dump($age);           // int(20)

// 5. Constants (Fixed values)
define("SITE_URL", "https://uni.edu");
const API_KEY = "SECRET_123";

// 6. Multiple Assignment
$a = $b = $c = 100;
?>`,
    syntax: `// ── Variable & Constants Syntax ────────────
//
//  $name = v    : Variable (starts with $)
//  define("N",v): Constant (Global)
//  const N = v  : Constant (Scope-bound)
//  var_dump($x) : DEBUG: Type + Value
//  "Hello $v"   : Variable interpolation
//  .            : Join strings together
//
// ──────────────────────────────────────────`,
    output: `My car is blue
string(9) "ratha_dev"
int(20)
a=100, b=100, c=100`,
    tip: "ប្រើ var_dump() ជាជំនួស echo នៅពេល debug ព្រោះវាបង្ហាញទាំង Type (int/string) និង Value ងាយស្រួលយល់!",
    workflow: `// ── Variable Lifecycle ─────────────────────
//
// 1. Allocation: Memory reserved (បម្រុងទុក memory)
// 2. Assignment: Value stored (ដាក់តម្លៃចូល)
// 3. Interaction: Use in logic/math (យកមកប្រើ)
// 4. Mutation: Change value (ប្ដូរតម្លៃថ្មី)
// 5. Cleanup: Auto-removed (សម្អាត memory)
//
// ──────────────────────────────────────────`,
  },
  {
    num: "04", chapter: "Foundations", chapterColor: BLUE,
    tag: "Data Types", tagColor: PINK, icon: "📝",
    title: "Data Types",
    subtitle: "string · int · float · bool · null · array · gettype · casting",
    body: `PHP មាន **8 data types** ─ 4 scalar, 2 compound, 2 special ។ PHP ជា **dynamically typed** ─ type auto-detected ។ ប្រើ **gettype()** ពិនិត្យ type ─ **===** strict comparison ─ **(int)** casting ។`,
    bullets: [
      { icon: "📝", label: "string", desc: '"Hello" or \'World\' ─ text, any length' },
      { icon: "🔢", label: "integer", desc: "42  -5  0 ─ whole numbers, no decimal point" },
      { icon: "📊", label: "float", desc: "3.14  1.5 ─ decimals (PHP internally calls it 'double')" },
      { icon: "✅", label: "boolean", desc: "true / false ─ only two possible values" },
      { icon: "📋", label: "array", desc: '["A","B","C"] ─ ordered list of values' },
      { icon: "∅", label: "NULL", desc: "null ─ no value assigned (different from 0 or \"\")" },
    ],
    code: `<?php
// 1. Scalar Types
$text = "PHP 8";      // string
$year = 2024;         // integer
$rate = 1.5;          // float (double)
$open = true;         // boolean

// 2. Compound Types
$tags = ["web", "dev"]; // array
$obj  = new stdClass(); // object

// 3. Special Types
$empty = null;          // NULL

// 4. Checking Types
echo gettype($year);    // integer
echo gettype($rate);    // double (internal name)

// 5. Explicit Type Casting (Conversion)
$price = (float) "19.99";
$qty   = (int) "5 items";
$valid = (bool) 1;      // true

var_dump($price, $qty, $valid);
?>`,
    syntax: `// ── Data Types & Casting Syntax ────────────
//
//  (int)$val    : Convert to Integer
//  (string)$val : Convert to String
//  (bool)$val   : Convert to Boolean
//  gettype($x)  : Check type name
//  is_int($x)   : True if integer
//  is_array($x) : True if array
//
// ──────────────────────────────────────────`,
    output: `integer
double
float(19.99)
int(5)
bool(true)`,
    tip: " gettype(1.5) នឹងបង្ហាញថា 'double' ─ នេះគឺជាឈ្មោះបច្ចេកទេសក្នុង PHP សម្រាប់ប្រភេទលេខដែលមានក្បៀស (Float)!",
    workflow: `// ── Type Check & Conversion Flow ──────────
//
// 1. Input: Dynamic data arrives (ទទួលទិន្នន័យ)
// 2. Analysis: PHP detects type (សម្គាល់ប្រភេទ)
// 3. Conversion: Force new type (ប្ដូរទៅប្រភេទថ្មី)
// 4. Math: Use for calculation (យកទៅគណនា)
// 5. Debug: Inspect final state (ឆែកលទ្ធផលចុងក្រោយ)
//
// ──────────────────────────────────────────`,
  },

  // ── WEEK 2 ────────────────────────────────────────────────
  {
    num: "05", chapter: "Operators & Flow", chapterColor: ORANGE,
    tag: "Operators", tagColor: ORANGE, icon: "➕",
    title: "Operators",
    subtitle: "arithmetic · comparison · logical · assignment · ??",
    body: `Operators ប្រើដើម្បី **calculate**, **compare** ឬ **combine** values ។ **=== (strict equality)** essential ─ PHP type juggling ជាមួយ == creates dangerous bugs ។ **??** (null coalescing) ─ clean default value pattern ។`,
    bullets: [
      { icon: "➕", label: "Arithmetic", desc: "+ − * / % (modulo) ** (power)" },
      { icon: "⚖️", label: "Comparison", desc: "=== strict  == loose  != !== > < >= <=" },
      { icon: "🔗", label: "Logical", desc: "&& AND   || OR   ! NOT ─ short-circuit evaluation" },
      { icon: "⚡", label: "Assignment", desc: "+= −= *= /= .= (string append) ??= (null assign)" },
    ],
    code: `<?php
$a = 10; $b = 3;

// Arithmetic operators
echo "a + b = " . ($a + $b) . "";  // 13
echo "a - b = " . ($a - $b) . "";  // 7
echo "a * b = " . ($a * $b) . "";  // 30
echo "a / b = " . ($a / $b) . "";  // 3.333...
echo "a % b = " . ($a % $b) . "";  // 1
echo "a ** 2 = " . ($a ** 2) . ""; // 100

// Comparison — STRICT vs LOOSE
var_dump(5 === 5);     // bool(true)
var_dump(5 === "5");   // bool(false)
var_dump(5 ==  "5");   // bool(true)
var_dump(0 ==  "foo"); // bool(false)

// ALWAYS use === in PHP!
var_dump("" === false); // bool(false)
var_dump("" ==  false); // bool(true)

// Logical operators
$age = 20; $score = 85;
var_dump($age >= 18 && $score >= 50); // bool(true)
var_dump($age < 18  || $score >= 50); // bool(true)

// Assignment shorthand
$x = 10;
$x += 5;  echo "x += 5 = $x"; // 15
$x *= 2;  echo "x *= 2 = $x"; // 30

// Null coalescing
$name = $_GET['name'] ?? "Guest";
echo "Hello, $name!";
?>`,
    syntax: `// ── Operators Syntax ──────────────────────
//
//  + - * / % **   : Math operators
//  .              : String join (concatenation)
//  ===            : Strict compare (Value + Type)
//  ==             : Loose compare (DANGEROUS!)
//  &&  ||  !      : AND, OR, NOT
//  ??             : Null check (if null, use default)
//  += -= .=       : Combined assignment
//
// ─────────────────────────────────────────`,
    output: `// Arithmetic operators (+, -, *, /, %, **)
a + b = 13
a - b = 7
a * b = 30
a / b = 3.3333333333333335
a % b = 1
a ** 2 = 100

// Comparison — STRICT vs LOOSE
bool(true)
bool(false)
bool(true)
bool(false)
bool(false)
bool(true)

// Logical operators (&&, ||)
bool(true)
bool(true)

// Assignment & Null Coalescing
x += 5 = 15
x *= 2 = 30
Hello, Guest!`,
    tip: "ALWAYS use === not == ─ in PHP 8, 0 == 'foo' is false, but '' == false is still true. Type juggling is dangerous!",
    workflow: `// ── Operator Execution Priority ────────────
//
// 1. Parentheses ( ) run first (ក្នុងវង់ក្រចកមុនគេ)
// 2. Math: ** then * / % then + - (គុណចែក មុនបូកដក)
// 3. String: . concatenation (ការភ្ជាប់អក្សរ)
// 4. Comparisons (===, !==) (ការប្រៀបធៀប)
// 5. Logical AND (&&) then OR (||) (ការឆែកលក្ខខណ្ឌ)
// 6. Assignment (=) runs LAST! (ការដាក់តម្លៃគឺចុងក្រោយ)
//
// ─────────────────────────────────────────`,
  },
  {
    num: "06", chapter: "Operators & Flow", chapterColor: ORANGE,
    tag: "Strings", tagColor: TEAL, icon: "📏",
    title: "String Functions",
    subtitle: "strlen · trim · str_replace · explode · substr · str_contains",
    body: `PHP មាន **string functions** ជាង 100 built-in ។ ប្រើ **mb_** prefix for Khmer/Unicode ─ regular functions count bytes not characters ។ **explode/implode** ─ convert between string and array ។`,
    bullets: [
      { icon: "📏", label: "strlen / mb_strlen", desc: "String length ─ use mb_ for Unicode/Khmer text" },
      { icon: "✂️", label: "trim / explode", desc: "Remove whitespace / split string into array by separator" },
      { icon: "🔍", label: "str_contains (PHP 8)", desc: "Returns bool ─ cleaner than strpos() !== false" },
      { icon: "🔄", label: "str_replace", desc: "str_replace('old','new',$str) ─ find and replace" },
    ],
    code: `<?php
$text = "  Hello PHP World!  ";

// 1. Basic Cleaning
$clean = trim($text);           // "Hello PHP World!"
echo strlen($clean);           // 17 chars

// 2. Modern search (PHP 8+)
var_dump(str_contains($clean, "PHP"));       // true
var_dump(str_starts_with($clean, "Hello")); // true

// 3. Transformation
echo str_replace("PHP", "Laravel", $clean); // "Hello Laravel World!"
echo strtolower($clean); // "hello php world!"

// 4. Split & Join (Common in CSV)
$csv   = "Dara,Ratha,Sophal";
$names = explode(",", $csv); // String to Array
echo implode(" | ", $names);  // Array to String

// 5. Khmer text (Multi-byte)
$khmer = "សួស្ដី";
echo strlen($khmer);    // 18 (Bytes - Incorrect for Khmer)
echo mb_strlen($khmer); // 6  (Characters - Correct ✅)
?>`,
    syntax: `// ── Common String Functions ───────────────
//
//  strlen() / mb_strlen() : Get length
//  trim($s)               : Remove spaces
//  str_replace(f, r, s)   : Find & Replace
//  explode(sep, $s)       : String → Array
//  implode(sep, $a)       : Array → String
//  str_contains($s, $v)   : Check existence
//
// ──────────────────────────────────────────`,
    output: `17
bool(true)
bool(true)
Hello Laravel World!
hello php world!
Dara | Ratha | Sophal
18
6`,
    tip: "សម្រាប់អក្សរខ្មែរ ត្រូវប្រើ mb_strlen() ជំនួស strlen() ធម្មតា ព្រោះអក្សរខ្មែរប្រើច្រើន bytes ក្នុងមួយតួអក្សរ!",
    workflow: `// ── String Transformation Workflow ─────────
//
// 1. Input: User enters text (បញ្ចូលអក្សរ)
// 2. Clean: trim() whitespace (សម្អាតចន្លោះ)
// 3. Search: str_contains() logic (ស្វែងរកពាក្យ)
// 4. Change: str_replace() words (ជំនួសពាក្យ)
// 5. Output: Formatted result (លទ្ធផលសម្រេច)
//
// ──────────────────────────────────────────`,
  },
  {
    num: "07", chapter: "Operators & Flow", chapterColor: ORANGE,
    tag: "Control Flow", tagColor: BLUE, icon: "🔀",
    title: "If / Else / Match",
    subtitle: "if · elseif · else · match · ternary · null coalescing ??",
    body: `**if/else** ប្រើសម្រាប់ decision making ─ execute code based on condition ។ PHP 8 **match** ─ strict, no fallthrough, returns value ─ cleaner than switch ។ **Ternary** (?:) ─ one-liner ─ **??** safe default ។`,
    bullets: [
      { icon: "❓", label: "if / elseif / else", desc: "Classic conditional ─ chain multiple with elseif" },
      { icon: "🔀", label: "match (PHP 8)", desc: "Strict === ─ no fallthrough ─ returns a value" },
      { icon: "⚡", label: "Ternary ?:", desc: "$x = cond ? 'yes' : 'no' ─ one-line if/else" },
      { icon: "🛡️", label: "?? null coalescing", desc: '$n = $_GET["n"] ?? "Guest" ─ default if null/missing' },
    ],
    code: `<?php
$score = 85;

// 1. Classic if / elseif / else
if ($score >= 90) {
    echo "Excellent! 🥇";
} elseif ($score >= 80) {
    echo "Very Good! 🥈";
} else {
    echo "Keep it up! 📖";
}

// 2. Modern MATCH (PHP 8.0+)
// cleaner, strict, and returns a value
$grade = match(true) {
    $score >= 90 => "A",
    $score >= 80 => "B",
    $score >= 70 => "C",
    default      => "F",
};
echo "Grade: $grade";

// 3. Ternary (Short if/else)
$status = ($score >= 50) ? "Passed ✅" : "Failed ❌";

// 4. Null Coalescing (Safe default)
$user = $_GET['user'] ?? "Guest";
?>`,
    syntax: `// ── Control Flow Cheat Sheet ───────────────
//
//  if (cond) { }     : Conditional block
//  match ($v) { }    : Modern switch (PHP 8)
//  $a ? $b : $c      : Ternary operator
//  $a ?? "default"   : Null check (PHP 7+)
//  ===               : MUST use strict compare
//
// ──────────────────────────────────────────`,
    output: `Very Good! 🥈
Grade: B`,
    tip: "ប្រើ match ជំនួស switch នៅក្នុង PHP 8 ព្រោះវាខ្លីជាង មិនចាំបាច់មាន break និងប្រើ strict comparison (===) ដោយស្វ័យប្រវត្តិ!",
    workflow: `// ── Decision Making Flow ──────────────────
//
// 1. If: Check primary rule (ឆែកលក្ខខណ្ឌចម្បង)
// 2. Elseif: Check alternate (ឆែកលក្ខខណ្ឌបន្ទាប់)
// 3. Match: Map specific value (ផ្គូផ្គងតម្លៃចំៗ)
// 4. Default: Handle everything else (លទ្ធផលចុងក្រោយ)
// 5. Return: Final value chosen (ទទួលបានតម្លៃសម្រេច)
//
// ──────────────────────────────────────────`,
  },
  {
    num: "08", chapter: "Operators & Flow", chapterColor: ORANGE,
    tag: "Loops", tagColor: GREEN, icon: "🔢",
    title: "Loops",
    subtitle: "for · while · do-while · foreach · break · continue",
    body: `Loops ប្រើដើម្បី **repeat code** ។ **foreach** ─ best for arrays ─ use 99% of the time ─ no off-by-one errors ។ **for** ─ when count is known ─ **break** exits loop ─ **continue** skips current iteration ។`,
    bullets: [
      { icon: "🔢", label: "for", desc: "for ($i=0; $i<n; $i++) ─ use when count is known" },
      { icon: "🔄", label: "while", desc: "Checks condition FIRST ─ may run 0 times" },
      { icon: "🔁", label: "do-while", desc: "Checks condition AFTER ─ runs at least once" },
      { icon: "📋", label: "foreach", desc: "Best for arrays ─ foreach ($arr as $key => $val)" },
    ],
    code: `<?php
// 1. FOREACH (99% of your array work)
$fruits = ["Apple", "Banana", "Mango"];
foreach ($fruits as $fruit) {
    echo "Fruit: $fruit";
}

// 2. FOREACH with Keys
$user = ["id" => 1, "name" => "Ratha"];
foreach ($user as $key => $val) {
    echo "$key: $val";
}

// 3. FOR (Fixed count)
for ($i = 1; $i <= 3; $i++) {
    echo "Step $i";
}

// 4. WHILE (Condition-based)
$count = 5;
while ($count > 0) {
    echo $count--;
}

// 5. CONTINUE / BREAK
for ($x = 1; $x <= 10; $x++) {
    if ($x === 5) continue; // Skip 5
    if ($x === 8) break;    // Stop at 8
    echo $x;
}
?>`,
    syntax: `// ── PHP Loop Cheat Sheet ────────────────────
//
//  foreach ($a as $v)     : Best for arrays
//  foreach ($a as $k=>$v) : Access key and value
//  for ($i; $c; $u)       : Fixed repeat count
//  while (cond) { }       : Loop while true
//  break                  : Exit loop immediately
//  continue               : Skip current iteration
//
// ──────────────────────────────────────────`,
    output: `Fruit: Apple
Fruit: Banana
Fruit: Mango
id: 1
name: Ratha
Step 1
Step 2
Step 3
54321
123467`,
    tip: "ប្រើ foreach សម្រាប់ array ជានិច្ច! វាចំណេញពេល ខ្លីជាង និងមិនងាយមាន error (off-by-one errors) ដូច for loop ធម្មតាទេ!",
    workflow: `// ── Iteration Life Cycle ───────────────────
//
// 1. Init: Set start state (កំណត់តម្លៃផ្ដើម)
// 2. Check: Valid condition? (ពិនិត្យលក្ខខណ្ឌ)
// 3. Body: Run logic block (ដំណើរការកូដក្នុង loop)
// 4. Update: Move to next (បង្កើនតម្លៃ ឬប្ដូរ step)
// 5. Exit: Condition failed (ឈប់ដើរនៅពេលលក្ខខណ្ឌខុស)
//
// ──────────────────────────────────────────`,
  },

  // ── WEEK 3 ────────────────────────────────────────────────
  {
    num: "09", chapter: "Functions & Arrays", chapterColor: PINK,
    tag: "Functions", tagColor: PINK, icon: "🧪",
    title: "Functions",
    subtitle: "declare · params · default · return · type hints · arrow fn",
    body: `Function ជា **reusable block of code** ─ declare once, call anywhere ─ DRY principle ។ PHP 8 **type hints** ─ declare param & return types ─ safer, self-documenting code ។ **Arrow functions** (fn) ─ concise one-liners ។`,
    bullets: [
      { icon: "📦", label: "function keyword", desc: "function name($params) { return $val; }" },
      { icon: "↩️", label: "return", desc: "Exits function and sends value back to caller" },
      { icon: "🎯", label: "Default params", desc: 'function greet($n, $lang = "en") ─ optional argument' },
      { icon: "🏷️", label: "Type hints PHP 8", desc: "function add(int $a, int $b): int ─ enforced types" },
    ],
    code: `<?php
// 1. Basic Function
function sayHello(string $name): void {
    echo "Hello, $name!";
}
sayHello("Ratha");

// 2. Return & Type Hinting (PHP 8+)
function multiply(int $a, int $b): int {
    return $a * $b;
}
$res = multiply(5, 4); // 20

// 3. Default Arguments
function greet($name, $msg = "Welcome") {
    echo "$msg, $name!";
}
greet("Sophal");         // Welcome, Sophal!
greet("Dara", "Salute"); // Salute, Dara!

// 4. Modern Arrow Function (fn)
$double = fn(int $n) => $n * 2;
echo $double(10); // 20

// 5. Multiple Returns (using array)
function compute(int $n): array {
    return [$n * 2, $n + 10];
}
[$doubled, $added] = compute(5); // array destructuring
?>`,
    syntax: `// ── Function Cheat Sheet ────────────────────
//
//  function n(type $p): type { } : Full declaration
//  return $val                   : Output from function
//  $p = "default"                : Optional parameter
//  fn($x) => $x * 2              : Arrow function (PHP 7.4+)
//  $f("arg")                     : Calling function
//  void                          : No return value
//
// ──────────────────────────────────────────`,
    output: `Hello, Ratha!
20
Welcome, Sophal!
Salute, Dara!
20
Doubled: 10, Added: 15`,
    tip: "ប្រើ Type Hints (string, int, bool) ក្នុង function ជានិច្ច! វាជួយឲ្យ code របស់អ្នកកាន់តែមានសុវត្ថិភាព និងងាយស្រួលយល់សម្រាប់អ្នកដទៃ (Self-documenting)!",
    workflow: `// ── Function Execution Cycle ────────────────
//
// 1. Call: Invoked with args (ហៅទៅប្រើជាមួយ values)
// 2. Pass: Params into local scope (បញ្ជូនទិន្នន័យចូល)
// 3. Eval: Run internal logic (ដំណើរការកូដខាងក្នុង)
// 4. Result: return generated (បញ្ជូនលទ្ធផលចេញ)
// 5. Destruct: Local scope cleared (សម្អាត memory)
//
// ──────────────────────────────────────────`,
  },
  {
    num: "10", chapter: "Functions & Arrays", chapterColor: PINK,
    tag: "Arrays", tagColor: ORANGE, icon: "📋",
    title: "Arrays",
    subtitle: "indexed · associative · multi-dim · map · filter · reduce",
    body: `Array ជា **list** ដែល store multiple values ។ **Indexed** ─ number keys (0,1,2) ─ **Associative** ─ string keys ─ **Multi-dimensional** ─ arrays inside arrays ─ simulates database rows ─ PDO returns this exact format ។`,
    bullets: [
      { icon: "📋", label: "Indexed", desc: '$arr = ["A","B","C"] ─ access with $arr[0]' },
      { icon: "🗂️", label: "Associative", desc: '$u = ["name"=>"Ratha"] ─ access with $u["name"]' },
      { icon: "🔧", label: "Array functions", desc: "count() sort() array_push() in_array() array_column()" },
      { icon: "⚡", label: "map/filter/reduce", desc: "Functional style ─ transform arrays cleanly" },
    ],
    code: `<?php
// 1. Indexed Array (The List)
$foods = ["Sushi", "Steak", "Pizza"];
echo $foods[0];        // Sushi
$foods[] = "Burger";  // Add to end

// 2. Associative Array (Key => Value)
$user = [
    "name"  => "Ratha",
    "major" => "CS",
    "gpa"   => 3.8
];
echo $user["name"]; // Ratha

// 3. Built-in Array Functions
sort($foods);          // Alpha sort
$count = count($foods); // 4
$has_sushi = in_array("Sushi", $foods); // true

// 4. Modern Mapping & Filtering (PHP 7.4+)
$nums    = [1, 2, 3, 4, 5];
$doubled = array_map(fn($n) => $n * 2, $nums); 
$evens   = array_filter($nums, fn($n) => $n % 2 === 0);

// 5. Multi-dimensional (Like Database Rows)
$matrix = [
    ["name" => "Dara", "grade" => "A"],
    ["name" => "Bona", "grade" => "B"]
];
echo $matrix[0]["name"]; // Dara
?>`,
    syntax: `// ── Array Cheat Sheet ───────────────────────
//
//  [v1, v2]             : Indexed array
//  ["k" => "v"]         : Associative array
//  count($a)            : Get array size
//  array_map(fn, $a)    : Transform array
//  array_filter($a, fn) : Filter elements
//  sort($a)             : Sort indexed array
//  ksort($a)            : Sort by keys
//
// ──────────────────────────────────────────`,
    output: `Sushi
Ratha
Doubled: 2, 4, 6, 8, 10
Evens: 2, 4
Dara`,
    tip: "Multi-dimensional arrays គឺជាទម្រង់ពិតដែលអ្នកនឹងទទួលបានពី Database (PDO fetchAll) ─ វារក្សាទុកទិន្នន័យជាជួរៗ (Rows)!",
    workflow: `// ── Array Manipulation Flow ────────────────
//
// 1. Define: Create structure (រៀបចំរចនាសម្ព័ន្ធ)
// 2. Update: Add/Edit keys (បន្ថែម ឬកែទិន្នន័យ)
// 3. Process: Map/Filter logic (ចម្រាញ់ ឬបំប្លែង)
// 4. Sort: Organize data (រៀបចំលំដាប់លំដោយ)
// 5. Review: iterate with foreach (បង្ហាញលទ្ធផល)
//
// ──────────────────────────────────────────`,
  },

  // ── WEEK 4: OOP ───────────────────────────────────────────
  {
    num: "11", chapter: "OOP", chapterColor: PURPLE,
    tag: "Classes & Objects", tagColor: PURPLE, icon: "🏗️",
    title: "Classes & Objects",
    subtitle: "class · __construct · $this · methods · new · instanceof",
    body: `**OOP** organizes code ជា **objects** ─ bundles data + behavior ។ **Class** ជា blueprint ─ **Object** ជា instance ─ **$this** refers to current object ។ PHP 8 **constructor promotion** ─ declare properties directly in constructor ─ no duplication ។`,
    bullets: [
      { icon: "📐", label: "class", desc: "Blueprint/template ─ defines properties & methods" },
      { icon: "📦", label: "new ClassName()", desc: "Creates an object (instance) from the class" },
      { icon: "🔧", label: "__construct()", desc: "Constructor ─ auto-called when object is created" },
      { icon: "👉", label: "$this->", desc: "Refers to the current object's own data & methods" },
    ],
    code: `<?php
class Student {
    // PHP 8: Constructor Promotion
    // Declare + assign properties directly in constructor!
    public function __construct(
        public string $name,
        public int    $age,
        public float  $gpa = 0.0   // default value
    ) {} // ← empty body, PHP handles assignment

    // Method — uses $this to access own properties
    public function introduce(): string {
        return "Hi! I'm {$this->name}, age {$this->age}.";
    }

    public function getStatus(): string {
        return $this->gpa >= 2.0 ? "Passing ✅" : "At Risk ⚠️";
    }

    // Setter with validation
    public function setGpa(float $gpa): void {
        if ($gpa < 0 || $gpa > 4.0) {
            throw new InvalidArgumentException("GPA must be 0-4.0");
        }
        $this->gpa = $gpa;
    }
}

// Create instances (objects)
$ratha  = new Student("Ratha",  20, 3.5);
$sophal = new Student("Sophal", 22, 1.8);

// Call methods
echo $ratha->introduce();   // Hi! I'm Ratha, age 20.
echo $sophal->introduce();  // Hi! I'm Sophal, age 22.
echo $ratha->getStatus();   // Passing ✅
echo $sophal->getStatus();  // At Risk ⚠️

// Access property
echo $ratha->name;  // Ratha

// Use setter
$ratha->setGpa(3.9);
echo $ratha->gpa;   // 3.9

// instanceof operator
var_dump($ratha instanceof Student); // bool(true)
var_dump($ratha instanceof Student); // bool(true)
?>`,
    syntax: `// ── Class & Object Syntax ─────────────────
//
//  class Name { ... }   : Define class
//  new Name();          : Create object
//  public $p;           : Property (accessible)
//  $this->p             : Internal access
//  $obj->p              : External access
//  __construct(...)     : Initializer
//  $o instanceof Class  : Check type
//
// ─────────────────────────────────────────`,
    output: `// Calling methods
Hi! I'm Ratha, age 20.
Hi! I'm Sophal, age 22.
Passing ✅
At Risk ⚠️

// Accessing property & setter
Ratha
3.9

// instanceof operator
bool(true)`,
    tip: "PHP 8 constructor promotion: write 'public string $name' inside __construct() params ─ no need to declare properties separately!",
    workflow: `// ── Object Instantiation Flow ──────────────
//
// 1. New object created (បង្កើត object ថ្មី)
// 2. __construct() starts (ចាប់ផ្ដើម constructor)
// 3. Properties assigned (ដាក់តម្លៃក្នុង property)
// 4. Object returned (បញ្ជូន object ទៅ variable)
// 5. Method called via -> (ហៅ method មកប្រើ)
//
// ─────────────────────────────────────────`,
  },
  {
    num: "12", chapter: "OOP", chapterColor: PURPLE,
    tag: "Inheritance", tagColor: PURPLE, icon: "🔗",
    title: "Inheritance",
    subtitle: "extends · parent:: · method override · access modifiers",
    body: `**Inheritance** ─ child class (**extends**) gets all properties & methods from parent ─ reuse code ─ DRY ។ **Access modifiers** control visibility ─ public/protected/private ─ **parent::** ─ call parent's version of a method ។`,
    bullets: [
      { icon: "🔗", label: "extends", desc: "class Admin extends User ─ inherit all from User" },
      { icon: "🔒", label: "Access modifiers", desc: "public=anywhere │ protected=class+children │ private=class only" },
      { icon: "🔄", label: "Method override", desc: "Child redefines parent method ─ called polymorphism" },
      { icon: "⬆️", label: "parent::", desc: "parent::__construct() ─ call parent's version explicitly" },
    ],
    code: `<?php
class User {
    protected string $role = "student";

    public function __construct(public string $name) {}

    public function getRole(): string {
        return $this->role;
    }
}

// Inheritance using 'extends'
class Mentor extends User {
    protected string $role = "mentor";

    // Override Parent Method
    public function getRole(): string {
        return "Certified " . parent::getRole();
    }
}

$u = new User("Sokha");
$m = new Mentor("Dara");

echo $u->name . ": " . $u->getRole(); // Sokha: student
echo $m->name . ": " . $m->getRole(); // Dara: Certified mentor
?>`,
    syntax: `// ── Inheritance Cheat Sheet ──────────────────
//
//  class A extends B : A inherits from B
//  parent::method()  : Call parent's version
//  protected         : Visible in self + children
//  private           : Visible in self ONLY
//  final class       : Cannot be inherited
//  final method      : Cannot be overridden
//
// ──────────────────────────────────────────`,
    output: `Sokha: student
Dara: Certified mentor`,
    tip: "ប្រើ protected ជំនួស private ប្រសិនបើអ្នកចង់ឲ្យ child class អាចយក property នោះទៅប្រើបន្តបាន!",
    workflow: `// ── Inheritance Cycle ──────────────────────
//
// 1. Definition: Child extends Parent (កូនស្នងមរតក)
// 2. Access: Inherit all public/protected (ទាញយកសមត្ថភាព)
// 3. Override: Update logic in child (កែសម្រួល logic ថ្មី)
// 4. Reference: parent:: call (ហៅមេត្រឡប់)
// 5. Result: Multi-layered behavior (បានលទ្ធផលច្រើនជាន់)
//
// ──────────────────────────────────────────`,
  },
  {
    num: "13", chapter: "OOP", chapterColor: PURPLE,
    tag: "Abstract & Interface", tagColor: PURPLE, icon: "📜",
    title: "Abstract & Interface",
    subtitle: "abstract class · interface · implements · contracts · polymorphism",
    body: `**Abstract class** ─ cannot instantiate directly ─ defines shared code + forces children to implement abstract methods ─ **IS-A** relationship ។ **Interface** ─ pure contract ─ class can implement **multiple** interfaces ─ **CAN-DO** relationship ។`,
    bullets: [
      { icon: "🏗️", label: "abstract class", desc: "Has abstract methods (no body) ─ child MUST implement" },
      { icon: "📜", label: "interface", desc: "Pure contract ─ only method signatures, zero implementation" },
      { icon: "✅", label: "implements", desc: "class Report implements Printable ─ must provide all methods" },
      { icon: "🔀", label: "Multiple interfaces", desc: "class Foo implements A, B, C ─ unlike extends (only 1 parent)" },
    ],
    code: `<?php
// ABSTRACT: Blueprint that can't be created directly
abstract class Device {
    abstract public function turnOn(): string; // Contract
}

class Laptop extends Device {
    public function turnOn(): string { return "Laptop booting..."; }
}

// INTERFACE: Behavior contract (Can-Do)
interface Rechargeable {
    public function charge(): void;
}

class Smartphone extends Device implements Rechargeable {
    public function turnOn(): string { return "Phone starting..."; }
    public function charge(): void   { echo "Battery: 100%"; }
}

$p = new Smartphone();
echo $p->turnOn();
$p->charge();
?>`,
    syntax: `// ── Abstract vs Interface Cheat Sheet ────────
//
//  abstract class    : Partial blueprint (IS-A)
//  interface         : Pure behavior (CAN-DO)
//  abstract function : No body, child must write it
//  implements        : Connect to an interface
//  extends           : Connect to a parent class
//
// ──────────────────────────────────────────`,
    output: `Phone starting...
Battery: 100%`,
    tip: "ប្រើ Abstract Class សម្រាប់អ្វីដែលជារបស់ដូចគ្នា (IS-A) និងប្រើ Interface សម្រាប់អ្វីដែលជាសមត្ថភាពដូចគ្នា (CAN-DO)!",
    workflow: `// ── Contract Enforcement Flow ───────────────
//
// 1. Define: Abstract/Interface (កំណត់ច្បាប់)
// 2. Extend/Implement: Child class (អនុវត្តច្បាប់)
// 3. Must: Write required methods (ត្រូវតែសរសេរ code)
// 4. Result: Guaranteed consistency (ធានាបានភាពត្រឹមត្រូវ)
// 5. Call: Type-safe behavior (ហៅប្រើដោយទំនុកចិត្ត)
//
// ──────────────────────────────────────────`,
  },
  {
    num: "14", chapter: "OOP", chapterColor: PURPLE,
    tag: "Static & Traits", tagColor: PURPLE, icon: "🧩",
    title: "Static, Traits & Magic",
    subtitle: "static · self:: · trait · use · __toString · namespaces",
    body: `**Static** properties/methods belong to the **class itself** ─ not to any instance ─ call with **ClassName::** ─ shared across all instances ─ useful for counters, singletons ។ **Traits** ─ inject reusable code into any class ─ solves multiple inheritance problem ។`,
    bullets: [
      { icon: "⚡", label: "static", desc: "ClassName::method() ─ no object needed, class-level data" },
      { icon: "🧩", label: "Traits", desc: "trait Logger { } then use Logger; inside any class body" },
      { icon: "✨", label: "Magic methods", desc: "__toString() __get() __set() ─ PHP calls these automatically" },
      { icon: "📁", label: "Namespaces", desc: "namespace App\\Models; ─ organize code, avoid name conflicts" },
    ],
    code: `<?php
// STATIC: Class-level data
class Math {
    public static float $pi = 3.14;
    public static function square(int $n): int {
        return $n * $n;
    }
}
echo Math::$pi;         // 3.14
echo Math::square(4);   // 16

// TRAIT: Reusable mixin
trait Logger {
    public function log(string $msg) {
        echo "[LOG]: $msg";
    }
}

class Database { use Logger; }
class Auth { use Logger; }

$db = new Database();
$db->log("Connecting..."); // from trait
?>`,
    syntax: `// ── Static & Traits Cheat Sheet ──────────────
//
//  static $v          : Shared across all objects
//  self::$v           : Access static inside class
//  Class::$v          : Access static outside class
//  trait T { }        : Reusable code block
//  use T              : Inject trait into class
//  ::                 : Scope Resolution Operator
//
// ──────────────────────────────────────────`,
    output: `3.14
16
[LOG]: Connecting...`,
    tip: "Static properties មិនមែនរបស់ object ទេ តែជារបស់ Class ជារួម! ប្រើវាសម្រាប់អ្វីដែលជា Global settings ឬ Utilities!",
    workflow: `// ── Code Sharing Workflow ──────────────────
//
// 1. Static: Call via Class:: (ហៅប្រើចំឈ្មោះថ្នាក់)
// 2. Trait: define reusable code (បង្កើតកូដសម្រាប់ប្រើឡើងវិញ)
// 3. Use: import into class (បញ្ជ្រាបចូលក្នុងថ្នាក់)
// 4. Execute: Call injected method (ហៅមុខងារថ្មីមកប្រើ)
// 5. Shared: Available everywhere (ប្រើបានគ្រប់ទីកន្លែង)
//
// ──────────────────────────────────────────`,
  },

  // ── WEEK 5: WEB & DATABASE ────────────────────────────────
  {
    num: "15", chapter: "Web & Forms", chapterColor: TEAL,
    tag: "Forms", tagColor: TEAL, icon: "📝",
    title: "Forms (GET & POST)",
    subtitle: "$_GET · $_POST · validate · sanitize · filter_var · XSS",
    body: `PHP handles form submissions via **$_GET** (URL params) and **$_POST** (form body) ។ **NEVER trust user input** ─ always **validate** (check rules) then **sanitize** (clean data) ─ every input is a potential security attack ។`,
    bullets: [
      { icon: "🔍", label: "$_GET", desc: "?name=Ratha in URL ─ visible, use for search/filters" },
      { icon: "📤", label: "$_POST", desc: "Form body ─ hidden from URL ─ use for passwords/mutations" },
      { icon: "🛡️", label: "htmlspecialchars()", desc: "< > & → HTML entities ─ prevents XSS attacks" },
      { icon: "✅", label: "filter_var()", desc: "Validate email, URL, int ─ returns false if invalid" },
    ],
    code: `<?php
// 1. GET: Visible in URL (Search/Filter)
$search = $_GET['q'] ?? "all";

// 2. POST: Secure/Hidden (Forms/Login)
$email = $_POST['email'] ?? "";

// 3. Security: Sanitize for XSS
$safe_html = htmlspecialchars($email);

// 4. Security: Validation
$is_valid = filter_var($email, FILTER_VALIDATE_EMAIL);

// 5. Password Hashing
$hash = password_hash("secret123", PASSWORD_DEFAULT);
?>`,
    syntax: `// ── Secure Form Cheat Sheet ──────────────────
//
//  $_GET['key']        : URL parameters
//  $_POST['key']       : Form body data
//  htmlspecialchars($s): Clean for output (XSS)
//  filter_var($id, F)  : Validate data type
//  password_hash($p, D): Secure store (one-way)
//
// ──────────────────────────────────────────`,
    output: `Email: test@example.com
Is Valid: true
Hash: $2y$10$Y5n2v...`,
    tip: "កុំទុកពាក្យសម្ងាត់ (Passwords) ជាអត្ថបទធម្មតា! ត្រូវប្រើ password_hash() ជានិច្ចដើម្បីសុវត្ថិភាពខ្ពស់បំផុត!",
    workflow: `// ── Data Submission Flow ───────────────────
//
// 1. Form: User types data (បញ្ចូលទិន្នន័យ)
// 2. Method: GET vs POST (ជ្រើសរើសវិធីបញ្ជូន)
// 3. Filter: Validate Input (បញ្ជាក់ភាពត្រឹមត្រូវ)
// 4. Sanitize: Clean for DB/UI (សម្អាតឱ្យមានសុវត្ថិភាព)
// 5. Hash: Secure passwords (បំប្លែងពាក្យសម្ងាត់)
//
// ──────────────────────────────────────────`,
  },
  {
    num: "16", chapter: "Web & Forms", chapterColor: TEAL,
    tag: "Include & Session", tagColor: GREEN, icon: "🔐",
    title: "Include Files & Sessions",
    subtitle: "require_once · partials · session_start · $_SESSION · logout",
    body: `**require_once** ─ include a file once ─ fatal error if missing ─ use for all config/helpers ។ **$_SESSION** ─ store user login state across pages ─ server-side ─ call **session_start()** as very first line ─ before ANY output ។`,
    bullets: [
      { icon: "🔒", label: "require_once", desc: "Include once ─ FATAL error if missing ─ always prefer this" },
      { icon: "🧩", label: "Partials pattern", desc: "header.php, footer.php, config.php ─ modular reusable structure" },
      { icon: "🗝️", label: "session_start()", desc: "Must be FIRST ─ before any echo, whitespace, or HTML!" },
      { icon: "💾", label: "$_SESSION", desc: "Store user login state across pages ─ server-side, secure" },
    ],
    code: `<?php
// config.php
define('SITE_NAME', 'UniPortal');

// 1. Including Files (Modular Code)
require_once 'config.php'; // Fatal error if missing
include 'header.php';      // Warning only

// 2. SESSIONS (Login State)
session_start(); // Must be the VERY FIRST line!

$_SESSION['user'] = "Ratha";
echo "Welcome, " . $_SESSION['user'];

// 3. Clear Session (Logout)
// session_destroy();
?>`,
    syntax: `// ── Includes & Sessions Cheat Sheet ──────────
//
//  require_once    : Critical files (DB, Config)
//  include         : Less critical (UI parts)
//  session_start() : Initialize session engine
//  $_SESSION['k']  : Store data across pages
//  header("Loc:")  : Redirect browser
//
// ──────────────────────────────────────────`,
    output: `Welcome, Ratha`,
    tip: "session_start() ត្រូវតែនៅបន្ទាត់ទី១ ជានិច្ច! បើមាន whitespace ឬ echo មុនវានឹងបណ្ដាលឲ្យមាន Error 'Headers already sent'!",
    workflow: `// ── User Session Lifecycle ──────────────────
//
// 1. Entry: session_start() called (ចាប់ផ្ដើម)
// 2. Verify: Check $_SESSION['user'] (ឆែកព័ត៌មាន)
// 3. Store: Write login info (រក្សាទុកទិន្នន័យ)
// 4. Persistence: Data stays on refresh (រក្សាដដែល)
// 5. Destroy: Terminate on logout (លុបចោលវិញ)
//
// ──────────────────────────────────────────`,
  },
  {
    num: "17", chapter: "Web & Forms", chapterColor: TEAL,
    tag: "Files & Upload", tagColor: ORANGE, icon: "📤",
    title: "File Handling & Upload",
    subtitle: "$_FILES · move_uploaded_file · enctype · validation · security",
    body: `ការ Upload files ក្នុង PHP ត្រូវប្រើ **$_FILES** superglobal ─ Form ត្រូវមាន **enctype="multipart/form-data"** ។ ត្រូវតែ **validate** ប្រភេទ file (extension) និងទំហំ (size) ជានិច្ច ដើម្បីការពារ security ─ ប្រើ **move_uploaded_file()** ដើម្បីរក្សាទុកក្នុង server ។`,
    bullets: [
      { icon: "📤", label: "enctype", desc: "កូដចាំបាច់ក្នុង <form> ដើម្បី upload files: multipart/form-data" },
      { icon: "📁", label: "$_FILES", desc: "Superglobal array ផ្ទុកព័ត៌មាន name, type, size, tmp_name" },
      { icon: "🛡️", label: "Validation", desc: "ឆែក extension (jpg, png) និង size (max 2MB) ដើម្បីសុវត្ថិភាព" },
      { icon: "✅", label: "move_uploaded_file", desc: "ប្តូរទីតាំង file ពី temporary ទៅកាន់ folder ក្នុង project" },
    ],
    code: `<?php
// 1. Form Setup (HTML)
// <form action="upload.php" method="POST" enctype="multipart/form-data">
//    <input type="file" name="my_file">
// </form>

// 2. Handling the Upload (upload.php)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = $_FILES['my_file'];
    
    $name = basename($file['name']);
    $tmp  = $file['tmp_name'];
    $size = $file['size'];
    
    // 3. Security Check (Extension)
    $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
    $allowed = ['jpg', 'png', 'pdf'];
    
    if (in_array($ext, $allowed) && $size < 2000000) {
        $dest = "uploads/" . time() . "_" . $name;
        if (move_uploaded_file($tmp, $dest)) {
            echo "File uploaded successfully! ✅";
        }
    } else {
        echo "Invalid file or too large! ❌";
    }
}
?>`,
    syntax: `// ── File Upload Cheat Sheet ─────────────────
//
//  $_FILES['k']['name']     : Original filename
//  $_FILES['k']['tmp_name'] : Temporary server path
//  $_FILES['k']['size']     : File size in bytes
//  $_FILES['k']['error']    : Error code (0 = success)
//  move_uploaded_file(s, d) : Save file permanently
//  pathinfo(f, PATHINFO_EXTENSION) : Get extension
//
// ──────────────────────────────────────────`,
    output: `File uploaded successfully! ✅`,
    tip: "កុំទុកចិត្តឈ្មោះ file ដែល user ផ្ញើមក! ត្រូវតែបន្ថែម prefix (ដូចជា time()) ទៅកាន់ឈ្មោះ file ដើម្បីទប់ស្កាត់ការជាន់ឈ្មោះគ្នា (File Overwriting)!",
    workflow: `// ── File Upload Workflow ────────────────────
//
// 1. Request: Form with multipart/form-data (ផ្ញើ request)
// 2. Temp: PHP saves file in temp folder (រក្សាទុកបណ្តោះអាសន្ន)
// 3. Inspect: Validate type and size (ពិនិត្យសុវត្ថិភាព)
// 4. Move: move_uploaded_file() to dest (ប្តូរទីតាំងទុកជាអចិន្ត្រៃយ៍)
// 5. Result: Return success/error status (បង្ហាញលទ្ធផល)
//
// ──────────────────────────────────────────`,
  },
  {
    num: "18", chapter: "Web & Database", chapterColor: TEAL,
    tag: "Database PDO", tagColor: BLUE, icon: "🗄️",
    title: "MySQL & PDO",
    subtitle: "PDO connect · prepared statements · CRUD · fetch · fetchAll",
    body: `PHP ភ្ជាប់ MySQL ដោយ **PDO** ─ modern, secure, multi-database ។ **Prepared statements** with **?** placeholders ─ NEVER concatenate user input into SQL ─ prevents SQL Injection ─ the most critical security rule in backend development ។`,
    bullets: [
      { icon: "🔌", label: "PDO connect", desc: "new PDO($dsn, $user, $pass) ─ connect to MySQL" },
      { icon: "🛡️", label: "Prepared statements", desc: "prepare() + execute([$val]) ─ prevents SQL injection" },
      { icon: "📥", label: "fetch()", desc: "One row ─ for detail/show page (WHERE id = ?)" },
      { icon: "📋", label: "fetchAll()", desc: "All rows as array ─ for listing/index page" },
    ],
    code: `<?php
// 1. Connect via PDO
$dsn = "mysql:host=localhost;dbname=school;charset=utf8mb4";
$db = new PDO($dsn, "root", "");

// 2. Create (Securely)
$stmt = $db->prepare("INSERT INTO users (name) VALUES (?)");
$stmt->execute(["Ratha"]);

// 3. Read (Fast)
$users = $db->query("SELECT * FROM users")->fetchAll(PDO::FETCH_ASSOC);

// 4. Update
$db->prepare("UPDATE users SET name = ? WHERE id = ?")
   ->execute(["Dara", 1]);

// 5. Delete
$db->prepare("DELETE FROM users WHERE id = ?")
   ->execute([2]);
?>`,
    syntax: `// ── PDO CRUD Cheat Sheet ─────────────────────
//
//  new PDO()          : Connect to Database
//  prepare()          : Secure query template
//  execute([$v])      : Bind data to template
//  fetch()            : Get one row
//  fetchAll()         : Get all rows in array
//  lastInsertId()     : Get ID of new record
//
// ──────────────────────────────────────────`,
    output: `Connected Successfully!
Record Inserted.
Users: [Dara, Ratha]`,
    tip: "កុំប្រើការបូក string (concatenation) ក្នុង SQL! ត្រូវប្រើ '?' placeholders ជាមួយ prepare() ជានិច្ច ដើម្បីទប់ស្កាត់ SQL Injection!",
    workflow: `// ── Secure DB Operation Flow ────────────────
//
// 1. Connect: Establish PDO link (ភ្ជាប់ទៅ DB)
// 2. Prepare: Design SQL template (រៀបចំប្លង់ SQL)
// 3. Execute: Bind values safely (បញ្ចូលតម្លៃដោយសុវត្ថិភាព)
// 4. Trace: Check success/failure (ពិនិត្យលទ្ធផល)
// 5. Output: Present data to USER (បង្ហាញទិន្នន័យ)
//
// ──────────────────────────────────────────`,
  },
  {
    num: "19", chapter: "Web & Database", chapterColor: TEAL,
    tag: "Full CRUD Project", tagColor: PINK, icon: "📂",
    title: "Mini-Project: SQLite CRUD",
    subtitle: "sqlite connection · create table · insert · fetch · search",
    body: `គ្រោងការណ៍ **Full Project** ─ ប្រើ **SQLite** (គ្មានការតម្លើង SQL server) ។ រួមបញ្ចូលការតភ្ជាប់ DB ─ បង្កើត Table ─ បញ្ចូលទិន្នន័យ (Create) ─ បង្ហាញទិន្នន័យ (Read) ។`,
    bullets: [
      { icon: "📂", label: "database.db", desc: "SQLite keeps everything in ONE file inside your project" },
      { icon: "⚡", label: "Auto-Setup", desc: "CREATE TABLE IF NOT EXISTS runs first to ensure DB is ready" },
      { icon: "🛡️", label: "Prepared Bindings", desc: "execute(['val']) ensures safety against SQL injection" },
      { icon: "🚀", label: "Built-in Server", desc: "php -S localhost:8000 runs the project locally" },
    ],
    code: `<?php
// 1. Connect to SQLite
$db = new PDO("sqlite:database.db");

// 2. Setup table (Auto-runs once)
$db->exec("CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    major TEXT
)");

// 3. Handle Form Submission
$msg = "";
if (isset($_POST['name'])) {
    $name = $_POST['name'];
    $major = $_POST['major'] ?? "General";

    // 🛡️ Validation
    if (empty($name)) {
        $msg = "<div class='alert err'>❌ Error: Name is required!</div>";
    } else {
        $stmt = $db->prepare("INSERT INTO students (name, major) VALUES (?, ?)");
        $stmt->execute([$name, $major]);
        $msg = "<div class='alert ok'>✅ Student saved successfully!</div>";
    }
}

// 3. Fetch Results
$students = $db->query("SELECT * FROM students")->fetchAll(PDO::FETCH_ASSOC);
?>

<!-- HTML Interface -->
<div style="font-family:'Outfit', sans-serif; max-width:400px; margin:0 auto; background:#fff; padding:24px; border-radius:16px; border:1px solid #eee; box-shadow:0 10px 40px rgba(0,0,0,0.04)">
  <h2 style="margin:0 0 4px; font-size:1.4rem; color:#111">Student Register</h2>
  <p style="margin:0 0 20px; font-size:0.85rem; color:#888">Add new students to the database</p>

  <!-- Dynamic Message UI -->
  <style>
    .alert { padding:12px; border-radius:8px; font-size:13px; font-weight:600; margin-bottom:15px; }
    .ok { background:#e6fcf5; color:#0ca678; border:1px solid #c3fae8; }
    .err { background:#fff5f5; color:#fa5252; border:1px solid #ffe3e3; }
  </style>
  <?= $msg ?>
  
  <form method="POST" style="display:flex; flex-direction:column; gap:12px; margin-bottom:24px">
    <input name="name"  placeholder="Enter Student Name" style="padding:12px; border:1px solid #eee; background:#f8f9fa; border-radius:8px; font-size:14px; outline:none">
    <select name="major" style="padding:12px; border:1px solid #eee; background:#f8f9fa; border-radius:8px; font-size:14px; color:#555">
       <option selected>Computer Science</option>
       <option>Business Admin</option>
       <option>Marketing</option>
    </select>
    <button style="background:#111; color:#fff; padding:14px; border:none; border-radius:8px; cursor:pointer; font-weight:700; font-size:14px; transition:0.2s">Save student record</button>
  </form>

  <h3 style="margin:0 0 12px; font-size:0.8rem; color:#aaa; text-transform:uppercase; letter-spacing:0.1em; font-weight:800">Recent Enrolled</h3>
  <div style="display:flex; flex-direction:column; gap:8px">
    <?php foreach($students as $s): ?>
      <div style="background:#fff; padding:14px; border-radius:10px; border:1px solid #f1f1f1; display:flex; justify-content:space-between; align-items:center; box-shadow:0 2px 5px rgba(0,0,0,0.01)">
         <span style="font-weight:600; color:#222; font-size:14px"><?= $s['name'] ?></span>
         <span style="font-size:11px; color:#111; background:#f0f0f0; padding:3px 10px; border-radius:100px; font-weight:700"><?= $s['major'] ?></span>
      </div>
    <?php endforeach; ?>
  </div>
</div>`,
    syntax: `// ── SQLite CRUD Syntax ────────────────────
//
//  sqlite:db.db       : SQLite DSN (Connection string)
//  exec("SQL");       : Run direct query (no results)
//  query("SQL");      : Run select query (has results)
//  prepare("SQL ?");  : Setup secured query template
//  fetchAll(PDO::ASSOC): Get results as array
//
// ─────────────────────────────────────────`,
    output: `// Starting PHP Server...
[Mon Mar 23 10:00:15] PHP 8.3.4 Development Server (http://localhost:8000) started
[Mon Mar 23 10:00:16] DB INIT: SQLite core connected. file="database.db"

// Incoming Traffic:
[Mon Mar 23 10:01:05] [200] GET /index.php 
[Mon Mar 23 10:01:12] [200] POST /index.php (Student: Dara was saved)

// Query Trace (SELECT *):
1. Dara | Computer Science
2. Ratha | Information Technology
3. Sophal | Architecture`,
    workflow: `// ── Local SQLite CRUD Workflow ────────────
//
// 1. Initialize: new PDO("sqlite:database.db") (បង្កើត/ភ្ជាប់ DB)
// 2. Schema: CREATE TABLE runs automatically (រៀបចំ table)
// 3. Input: Receive Form via $_POST (ទទួលទិន្នន័យពី Form)
// 4. Write: secure execute() into DB file (រក្សាទុកក្នុង file)
// 5. Read: Fetch data for HTML list (ទាញយកមកបង្ហាញក្នុងបញ្ជី)
//
// ─────────────────────────────────────────`,
    tip: "SQLite គឺសាកសមបំផុតសម្រាប់គម្រោងខ្នាតតូច ឬការធ្វើ Demo ព្រោះវាមិនត្រូវការតម្លើង Database Server ទេ—គឺប្រើត្រឹមតែ file មួយប៉ុណ្ណោះ!",
  },
];

// ── CHAPTER GROUPS for TOC ────────────────────────────────────
const CHAPTERS: ChapterData[] = [
  { name: "Foundations", color: BLUE, nums: ["01", "02", "03", "04"], icon: "🧱" },
  { name: "Operators & Flow", color: ORANGE, nums: ["05", "06", "07", "08"], icon: "⚙️" },
  { name: "Functions & Arrays", color: PINK, nums: ["09", "10"], icon: "📦" },
  { name: "OOP", color: PURPLE, nums: ["11", "12", "13", "14"], icon: "🏛️" },
  { name: "Web & Database", color: TEAL, nums: ["15", "16", "17", "18", "19"], icon: "🌐" },
];

// ── SYNTAX HIGHLIGHTER ────────────────────────────────────────
const PHP_KW = new Set(["php", "echo", "print", "return", "if", "else", "elseif", "foreach", "for", "while", "do", "class", "extends", "implements", "interface", "abstract", "trait", "use", "new", "public", "protected", "private", "static", "readonly", "function", "fn", "array", "string", "int", "float", "bool", "void", "null", "true", "false", "require", "require_once", "include", "throw", "try", "catch", "match", "const", "switch", "case", "break", "continue", "die", "isset", "empty", "unset", "exit", "header", "session_start", "define", "self", "parent", "sprintf", "date"]);
const SQL_KW = new Set(["SELECT", "FROM", "WHERE", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "ORDER", "BY", "LIMIT", "AND", "OR", "NOT", "IN", "IS", "NULL", "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "JOIN", "ON"]);

function hl(code: string) {
  return code.split('\n').map((line: string, li: number) => {
    const t = line.trim();
    if (t.startsWith('//') || t.startsWith('#') || t.startsWith('*') || t.startsWith('/*'))
      return <div key={li} style={{ color: '#6b8e6b', fontStyle: 'italic', minHeight: '1.65em' }}>{line}</div>;
    if (t.startsWith('--'))
      return <div key={li} style={{ color: '#6b8e6b', fontStyle: 'italic', minHeight: '1.65em' }}>{line}</div>;
    if (/^\s*<[^?]/.test(line))
      return <div key={li} style={{ color: '#79c0ff', minHeight: '1.65em' }}>{line}</div>;
    const parts = line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\$[a-zA-Z_]\w*|\b\d+(?:\.\d+)?\b|\b[A-Z_]{2,}\b|\b[a-zA-Z_]\w*\b)/g);
    return (
      <div key={li} style={{ minHeight: '1.65em' }}>
        {parts.map((p: string, i: number) => {
          if (!p) return null;
          if (p.startsWith('$')) return <span key={i} style={{ color: '#ffd700' }}>{p}</span>;
          if (p.startsWith('"') || p.startsWith("'")) return <span key={i} style={{ color: '#98d98e' }}>{p}</span>;
          if (PHP_KW.has(p)) return <span key={i} style={{ color: '#ff7b72', fontWeight: 700 }}>{p}</span>;
          if (SQL_KW.has(p)) return <span key={i} style={{ color: '#ffa07a', fontWeight: 700 }}>{p}</span>;
          if (/^\d/.test(p)) return <span key={i} style={{ color: '#b19cd9' }}>{p}</span>;
          if (/^[A-Z_]{2,}$/.test(p)) return <span key={i} style={{ color: '#56b3d8' }}>{p}</span>;
          return <span key={i} style={{ color: 'inherit' }}>{p}</span>;
        })}
      </div>
    );
  });
}

// ── MOCK PHP EXECUTOR ──────────────────────────────────────────
function simulatePHP(code: string, isPost: boolean = false, stripHtml: boolean = false): string {
  const vars: Record<string, any> = {
    _GET: { name: "Guest", search: "Coffee" },
    _POST: isPost ? { name: "New Student", major: "Design" } : {},
    _SESSION: { user_name: "Ratha" },
    students: [
      { id: 1, name: "Dara", major: "Computer Science" },
      { id: 2, name: "Ratha", major: "Information Technology" }
    ]
  };
  if (isPost) {
    vars.students.push({ id: 3, name: "New Student", major: "Marketing" });
  }
  const consts: Record<string, any> = {
    'PHP_VERSION': '8.3.4'
  };
  
  // Helper to resolve PHP-style expressions to JS equivalents
  const evalExpr = (expr: string): any => {
    try {
      let js = expr.trim();
      // 1. Handle string interpolation: "Hello $name"
      js = js.replace(/"([^"]*)"/g, (_, content) => {
        return '`' + content.replace(/\$([a-zA-Z_]\w*)/g, '${vars["$1"]}') + '`';
      });
      // 2. Handle concatenation . -> +
      js = js.replace(/(?<!\d)\.|\.(?!\d)/g, ' + ');
      // 3. Handle casting: (int), (float), (string), (bool)
      js = js.replace(/\(int\)/g, 'Number');
      js = js.replace(/\(float\)/g, 'Number');
      js = js.replace(/\(string\)/g, 'String');
      js = js.replace(/\(bool\)/g, 'Boolean');
      // 4. Handle superglobals: $_GET['x']
      js = js.replace(/\$_([A-Z]+)\[['"](.*?)['"]\]/g, "vars._$1['$2']");
      // Handle isset specifically
      js = js.replace(/isset\(\s*\$_POST\[['"](.*?)['"]\]\s*\)/g, "vars._POST['$1'] !== undefined");
      js = js.replace(/empty\(\s*([\s\S]*?)\s*\)/g, "(!$1 || $1.length === 0)");

      // 5. Handle remaining variables: $var -> vars.var
      js = js.replace(/\$([a-zA-Z_][\w]*)/g, (_, v) => {
        if (v === 'this') return 'this';
        return `vars['${v}']`;
      });
      // 6. Provide built-in PHP functions
      const builtins = {
        gettype: (v: any) => {
          if (v === null) return "NULL";
          if (Array.isArray(v)) return "array";
          if (typeof v === 'number') return Number.isInteger(v) ? "integer" : "double";
          if (typeof v === 'boolean') return "boolean";
          return typeof v;
        },
        is_int: (v: any) => Number.isInteger(v),
        is_integer: (v: any) => Number.isInteger(v),
        is_float: (v: any) => typeof v === 'number' && !Number.isInteger(v),
        is_double: (v: any) => typeof v === 'number' && !Number.isInteger(v),
        is_string: (v: any) => typeof v === 'string',
        is_bool: (v: any) => typeof v === 'boolean',
        is_null: (v: any) => v === null,
        is_array: (v: any) => Array.isArray(v),
        min: (arr: any[]) => Math.min(...arr),
        max: (arr: any[]) => Math.max(...arr),
      };

      return new Function('vars', 'consts', 'builtins', `
        const { gettype, is_int, is_integer, is_float, is_double, is_string, is_bool, is_null, is_array, min, max } = builtins;
        try { return (${js}); } catch(e) { return undefined; }
      `)(vars, consts, builtins);
    } catch (e) { return undefined; }
  };

  const formatValue = (val: any) => {
    if (val === null || val === undefined) return "";
    if (val === false) return ""; 
    if (val === true) return "1";  
    return String(val);
  };

  const formatVarDump = (val: any) => {
    if (val === null || val === undefined) return "NULL";
    if (typeof val === 'number') return `${Number.isInteger(val) ? 'int' : 'float'}(${val})`;
    if (typeof val === 'string') return `string(${val.length}) "${val}"`;
    if (typeof val === 'boolean') return `bool(${val ? 'true' : 'false'})`;
    return "unknown";
  };

  const processedCode = code.replace(/<\?=\s*([\s\S]*?)\s*\?>/g, '<?php echo $1; ?>');
  const tokens = processedCode.split(/(<\?php[\s\S]*?\?>)/g);
  let buffer = "";

  const execPHP = (token: string) => {
    let cleanBlock = token.replace(/<\?php/g, '').replace(/\?>/g, '').trim();
    const lines = cleanBlock.split('\n');
    let skip = false;
    let braceCount = 0;

    for (let line of lines) {
      let t = line.trim();
      t = t.split('//')[0].split('#')[0].trim();
      if (!t) continue;

      if (skip) {
        if (t.includes('{')) braceCount++;
        if (t.includes('}')) {
          if (braceCount === 0) skip = false;
          else braceCount--;
        }
        continue;
      }

      if (t.startsWith('if')) {
        const m = t.match(/if\s*\((.*)\)/);
        if (m && !evalExpr(m[1])) {
           if (t.includes('{')) skip = true;
        }
        continue;
      }
      if (t === '{' || t === '}') continue;

      const statements = t.split(';');
      for (let s of statements) {
        let stmt = s.trim();
        if (!stmt) continue;
        
        // Foreach start
        const feMatch = stmt.match(/foreach\s*\(\s*\$([a-zA-Z_]\w*)\s*as\s*\$([a-zA-Z_]\w*)\s*\)\s*:/);
        if (feMatch) return { type: 'loop_start', array: feMatch[1], item: feMatch[2] };
        if (stmt === 'endforeach') return { type: 'loop_end' };

        // Simple local parser
        const assignMatch = stmt.match(/^\$([a-zA-Z_]\w*)\s*([\+\-\*\/%]|(?:\?\?))?=\s*(.+)$/);
        if (assignMatch) {
          const [, name, op, expr] = assignMatch;
          const val = evalExpr(expr);
          if (!op) vars[name] = val;
          else if (op === '??') { if (!vars[name]) vars[name] = val; }
          else {
            const current = vars[name] || 0;
            if (op === '+') vars[name] = current + val;
            if (op === '-') vars[name] = current - val;
            if (op === '*') vars[name] = current * val;
            if (op === '/') vars[name] = current / val;
            if (op === '%') vars[name] = current % val;
          }
          continue;
        }
        if (stmt.startsWith('echo ') || stmt.startsWith('print ')) {
          const rawArgs = stmt.replace(/^(echo|print)\s+/, '').trim();
          const parts = rawArgs.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
          parts.forEach(p => buffer += formatValue(evalExpr(p)));
          continue;
        }
        if (stmt.match(/^var_dump\((.*)\)$/)) {
           buffer += formatVarDump(evalExpr(stmt.match(/^var_dump\((.*)\)$/)![1])) + "\n";
           continue;
        }
        evalExpr(stmt);
      }
    }
    return { type: 'normal' };
  };

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.startsWith('<?php')) {
      const res = execPHP(token);
      if (res.type === 'loop_start' && res.array && res.item) {
        // Collect loop body
        let bodyTokens: string[] = [];
        let j = i + 1;
        let depth = 1;
        while (j < tokens.length) {
          if (tokens[j].includes('foreach') && tokens[j].includes(':')) depth++;
          if (tokens[j].includes('endforeach')) depth--;
          if (depth === 0) break;
          bodyTokens.push(tokens[j]);
          j++;
        }
        // Run loop
        const dataArr = vars[res.array] || [];
        if (Array.isArray(dataArr)) {
          dataArr.forEach(itemVal => {
            vars[res.item] = itemVal;
            // Process body tokens
            for (let subToken of bodyTokens) {
              if (subToken.startsWith('<?php')) execPHP(subToken);
              else buffer += subToken;
            }
          });
        }
        i = j; // skip to endforeach
      }
    } else {
      buffer += token;
    }
  }
  
  if (stripHtml) {
     return buffer.replace(/<[^>]*>/g, '').trim() || "(no output)";
  }
  return buffer || "(no output)";
}

// ── CODE PANEL ────────────────────────────────────────────────
function CodePanel({ code: initialCode, output, syntax, workflow, showPreview, accent, theme }: { 
  code: string, 
  output: string | null, 
  syntax?: string | null, 
  workflow?: string | null, 
  showPreview?: boolean,
  accent: string, 
  theme: 'dark' | 'light' 
}) {
  const [tab, setTab] = useState('code');
  const [code, setCode] = useState(initialCode);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [mockPost, setMockPost] = useState(false);

  // Sync state when slide changes
  useEffect(() => { setCode(initialCode); setIsEditing(false); setMockPost(false); }, [initialCode]);

  useEffect(() => {
    if (tab === 'preview') {
      const timer = setTimeout(() => {
        const preview = document.querySelector('.browser-preview');
        if (preview) {
           const btn = preview.querySelector('button');
           if (btn) {
              btn.onclick = (e) => {
                e.preventDefault();
                setMockPost(true);
              };
           }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [tab, code, mockPost]);

  const copy = () => {
    const textToCopy = tab === 'code' ? code : tab === 'syntax' ? (syntax || '') : tab === 'workflow' ? (workflow || '') : (output || '');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };

  const runCode = () => {
    setIsRunning(true);
    setTab('output');
    setTimeout(() => setIsRunning(false), 800);
  };

  const currentOutput = (tab === 'preview' || code !== initialCode)
    ? simulatePHP(code, mockPost, tab === 'output')
    : (output || '(no output)');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--card)', borderRadius: 14, overflow: 'hidden', border: `1px solid var(--border)`, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: `1px solid var(--border)`, background: 'var(--header-bg)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
          </div>
          <div style={{ width: 1, height: 14, background: 'var(--border)', margin: '0 4px' }} />
          <button
            onClick={runCode}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 6, border: 'none',
              background: isRunning ? '#28c84030' : ACCENT,
              color: '#000', fontSize: 9, fontWeight: 900, fontFamily: 'Space Mono,monospace',
              transition: 'all 0.2s', transform: isRunning ? 'scale(0.95)' : 'none'
            }}
          >
            {isRunning ? 'RUNNING...' : 'RUN CODE ▶'}
          </button>
        </div>

        <div style={{ display: 'flex', background: '#000', borderRadius: 8, padding: 2, gap: 1, border: '1px solid var(--border)' }}>
          {[['code', 'PHP'], ['syntax', 'SYNTAX'], ['workflow', 'WORKFLOW'], ['preview', 'PREVIEW'], ['output', 'OUTPUT']].map(([v, lbl]) => (
            ((v === 'code' || v === 'output') || (v === 'syntax' && syntax) || (v === 'workflow' && workflow) || (v === 'preview' && showPreview)) && (
              <button
                key={v}
                onClick={() => setTab(v)}
                style={{
                  padding: '5px 12px', borderRadius: 6, border: 'none',
                  background: tab === v ? (theme === 'dark' ? '#222' : '#eee') : 'transparent',
                  color: tab === v ? accent : 'var(--dim)',
                  fontSize: 9, fontWeight: 800, fontFamily: 'Space Mono,monospace',
                  transition: 'all 0.15s'
                }}
              >
                {lbl}
              </button>
            )
          ))}
        </div>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{ background: 'none', border: 'none', color: isEditing ? ACCENT : 'var(--dim)', fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono,monospace' }}
          >
            {isEditing ? '✓ SAVED' : 'EDIT'}
          </button>
          <button onClick={copy} style={{ background: 'none', border: 'none', color: copied ? GREEN : 'var(--dim)', fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono,monospace' }}>
            {copied ? '✓ COPIED' : 'COPY'}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 0, position: 'relative', background: tab === 'output' ? '#050505' : 'transparent' }}>
        {isRunning && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
            <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 12, color: ACCENT, animation: 'pulse 1s infinite' }}>executing php runtime...</div>
          </div>
        )}

        <div style={{ padding: '24px', height: '100%' }}>
          {tab === 'code'
            ? (isEditing
              ? <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Tab') {
                    e.preventDefault();
                    const target = e.target as HTMLTextAreaElement;
                    const start = target.selectionStart;
                    const end = target.selectionEnd;
                    const newValue = code.substring(0, start) + "  " + code.substring(end);
                    setCode(newValue);
                    // Using a slight delay to ensure the re-render happens before setting selection
                    setTimeout(() => {
                      target.selectionStart = target.selectionEnd = start + 2;
                    }, 0);
                  }
                }}
                spellCheck={false}
                style={{
                  width: '100%', height: '100%', minHeight: 300,
                  background: 'none', border: 'none', outline: 'none',
                  color: 'var(--ink)', fontFamily: 'Space Mono,monospace', fontSize: 12.5, lineHeight: 1.75,
                  resize: 'none', padding: 0
                }}
              />
              : <pre style={{ margin: 0, fontFamily: 'Space Mono,monospace', fontSize: 12.5, lineHeight: 1.75 }}>{hl(code)}</pre>
            )
            : tab === 'syntax'
              ? <pre style={{ margin: 0, fontFamily: 'Space Mono,monospace', fontSize: 12.5, lineHeight: 1.75, color: accent, whiteSpace: 'pre-wrap' }}>{syntax}</pre>
            : tab === 'workflow'
              ? <pre style={{ margin: 0, fontFamily: 'Space Mono,monospace', fontSize: 12.5, lineHeight: 1.75, color: '#f0f0f0', whiteSpace: 'pre-wrap' }}>{workflow}</pre>
            : tab === 'preview'
              ? <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: accent, opacity: 0.6, marginBottom: 15, borderBottom: '1px solid #222', paddingBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                    <span>PREVIEW — BROWSER ENGINE</span>
                    <span>127.0.0.1:8000</span>
                  </div>
                  <div 
                    className="browser-preview"
                    style={{ 
                      flex: 1,
                      padding: '24px', 
                      background: '#fff', 
                      color: '#333', 
                      borderRadius: 12, 
                      overflowY: 'auto',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                    dangerouslySetInnerHTML={{ __html: currentOutput }}
                  />
                </div>
              : <div>
                <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: accent, opacity: 0.6, marginBottom: 15, borderBottom: '1px solid #222', paddingBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{code === initialCode ? 'TERMINAL — PHP 8.3.4' : 'SIMULATION — MOCK PHP RUNNER'}</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
                <pre style={{ margin: 0, fontFamily: 'Space Mono,monospace', fontSize: 12.5, lineHeight: 1.75, color: GREEN, whiteSpace: 'pre-wrap' }}>
                  <span style={{ color: accent, marginRight: 10 }}>$ php runtime.php</span>
                  {'\n'}{currentOutput}
                  {'\n\n'}<span style={{ color: accent, animation: 'blink 1s infinite' }}>_</span>
                </pre>
                {code !== initialCode && (
                  <button
                    onClick={() => setCode(initialCode)}
                    style={{ marginTop: 20, background: 'none', border: `1px solid #333`, color: '#666', fontSize: 9, padding: '4px 10px', borderRadius: 4, fontFamily: 'Space Mono,monospace' }}
                  >
                    RESET CODE TO ORIGINAL
                  </button>
                )}
              </div>
          }
        </div>
      </div>
    </div>
  );
}

// ── BULLET CARD ───────────────────────────────────────────────
function BulletCard({ bullet, accent }: { bullet: Bullet, accent: string }) {
  return (
    <div style={{ display: 'flex', gap: 10, padding: '10px 12px', background: 'var(--card)', border: `1px solid var(--border)`, borderRadius: 9, alignItems: 'flex-start' }}>
      <div style={{ width: 30, height: 30, borderRadius: 7, flexShrink: 0, background: accent + '15', border: `1px solid ${accent}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontFamily: 'Space Mono,monospace', color: accent, fontWeight: 700 }}>{bullet.icon}</div>
      <div>
        <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 11, color: accent, fontWeight: 700, marginBottom: 2 }}>{bullet.label}</div>
        <div style={{ fontSize: 12, color: 'var(--dim)', lineHeight: 1.5 }}>{bullet.desc}</div>
      </div>
    </div>
  );
}

// ── SLIDE ─────────────────────────────────────────────────────
function Slide({ slide, current, total, onNext, onPrev, theme, toggleTheme }: {
  slide: SlideData,
  current: number,
  total: number,
  onNext: () => void,
  onPrev: () => void,
  theme: 'dark' | 'light',
  toggleTheme: () => void
}) {
  const accent = slide.tagColor;
  const rb = (t: string) => t.split(/\*\*(.*?)\*\*/g).map((p: string, i: number) =>
    i % 2 === 1 ? <strong key={i} style={{ color: accent }}>{p}</strong> : <span key={i}>{p}</span>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 22px', borderBottom: `1px solid var(--border)`, flexShrink: 0, background: 'var(--header-bg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18, marginRight: 2 }}>{slide.icon}</span>
          <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 13, fontWeight: 700, color: ACCENT }}>PHP<span style={{ color: 'var(--ink)' }}>_</span>101</span>
          <span style={{ color: 'var(--border)' }}>│</span>
          <span style={{ padding: '2px 8px', borderRadius: 4, background: slide.chapterColor + '18', border: `1px solid ${slide.chapterColor}30`, color: slide.chapterColor, fontSize: 9, fontFamily: 'Space Mono,monospace', fontWeight: 700, letterSpacing: '0.07em' }}>
            {slide.chapter}
          </span>
          <span style={{ padding: '2px 8px', borderRadius: 4, background: accent + '12', border: `1px solid ${accent}25`, color: accent, fontSize: 9, fontFamily: 'Space Mono,monospace', fontWeight: 700 }}>
            {slide.tag}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px',
              borderRadius: 6, border: `1px solid var(--border)`,
              background: 'var(--card)', color: theme === 'dark' ? ACCENT : '#000',
              fontFamily: 'Space Mono,monospace', fontSize: 9, fontWeight: 700
            }}
          >
            <Monitor size={12} />
            {theme.toUpperCase()}
          </button>
          <div style={{ display: 'flex', gap: 3 }}>
            {SLIDES.map((_, i) => (
              <div key={i} style={{ width: i === current ? 16 : 4, height: 4, borderRadius: 3, background: i === current ? accent : i < current ? accent + '40' : (theme === 'dark' ? '#1e1e1e' : '#e0e0e0'), transition: 'all 0.3s' }} />
            ))}
          </div>
          <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: 'var(--dim)' }}>{slide.num}/{String(total).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* LEFT */}
        <div style={{ width: '38%', minWidth: 290, padding: '22px 22px 14px', overflowY: 'auto', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: 'DM Serif Display,serif', fontSize: 32, fontWeight: 400, color: 'var(--ink)', lineHeight: 1.1, margin: '0 0 5px' }}>{slide.title}</h1>
            <p style={{ fontFamily: 'Space Mono,monospace', fontSize: 9.5, color: 'var(--dim)', margin: 0 }}>{slide.subtitle}</p>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.75, color: theme === 'dark' ? '#bbb' : '#444', fontFamily: "'Noto Sans Khmer',sans-serif", margin: 0 }}>
            {rb(slide.body)}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: slide.bullets.length > 4 ? '1fr 1fr' : '1fr', gap: 6 }}>
            {slide.bullets.map((b, i) => <BulletCard key={i} bullet={b} accent={accent} />)}
          </div>
          {/* Tip */}
          <div style={{ marginTop: 'auto', padding: '11px 13px', borderRadius: 9, background: accent + '08', border: `1px solid ${accent}22`, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 11.5, lineHeight: 1.6, color: accent + 'cc', margin: 0, fontFamily: "'Noto Sans Khmer',sans-serif" }}>{slide.tip}</p>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ flex: 1, padding: 16, background: 'rgba(0,0,0,0.22)', display: 'flex', flexDirection: 'column' }}>
        {slide.code
            ? <CodePanel 
                code={slide.code} 
                output={slide.output} 
                syntax={slide.syntax} 
                workflow={slide.workflow} 
                showPreview={slide.title === "Your First PHP Code" || slide.chapter === "Web & Database" || slide.num === "15"}
                accent={accent} 
                theme={theme} 
              />
            : slide.concept
              ? <div style={{ flex: 1, background: 'var(--header-bg)', border: '1px solid var(--border)', borderRadius: 14, padding: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <pre style={{ fontFamily: 'Space Mono,monospace', fontSize: 13, lineHeight: 2.2, color: theme === 'dark' ? '#3a5a3a' : '#226b22', textAlign: 'left', whiteSpace: 'pre', margin: 0 }}>{slide.concept}</pre>
              </div>
              : null
          }
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 22px', borderTop: `1px solid var(--border)`, flexShrink: 0, background: 'var(--bg)' }}>
        <button onClick={onPrev} disabled={current === 0} style={{ padding: '8px 16px', borderRadius: 7, border: `1px solid var(--border)`, background: current === 0 ? 'transparent' : 'var(--card)', color: current === 0 ? 'var(--border)' : 'var(--dim)', fontFamily: 'Space Mono,monospace', fontSize: 10 }}>← PREV</button>
        <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: 'var(--border)' }}>← → arrow keys · Esc = menu</span>
        <button onClick={onNext} style={{ padding: '8px 20px', borderRadius: 7, border: 'none', background: accent, color: '#000', fontFamily: 'Space Mono,monospace', fontSize: 10, fontWeight: 700 }}>
          {current === total - 1 ? 'RESTART ↺' : 'NEXT →'}
        </button>
      </div>
    </div>
  );
}

// ── TABLE OF CONTENTS ─────────────────────────────────────────
function TOC({ onStart, onGoTo, theme, toggleTheme }: { onStart: () => void, onGoTo: (idx: number) => void, theme: 'dark' | 'light', toggleTheme: () => void }) {
  return (
    <div style={{ height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '36px 24px 28px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36, position: 'relative' }}>
        {/* Theme Toggle in Header/Hero */}
        <button
          onClick={toggleTheme}
          style={{
            position: 'relative', top: 0, right: 0,
            padding: '8px 12px', borderRadius: 8,
            border: `1px solid var(--border)`,
            background: theme === 'dark' ? 'transparent' : '#000',
            color: theme === 'dark' ? 'var(--ink)' : '#fff',
            fontFamily: 'Space Mono,monospace', fontSize: 10, fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <Monitor size={14} />
          {theme === 'dark' ? 'PROJECTOR MODE' : 'DARK MODE'}
        </button>
        <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: ACCENT, letterSpacing: '0.2em', marginBottom: 12, textTransform: 'uppercase' }}>University Course · 19 Lessons</div>
        <h1 style={{ fontFamily: 'DM Serif Display,serif', fontSize: 52, fontWeight: 400, color: 'var(--ink)', lineHeight: 1.05, margin: '0 0 12px' }}>
          PHP<br /><em style={{ color: ACCENT }}>Programming</em>
        </h1>
        <p style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: 'var(--dim)', maxWidth: 400, lineHeight: 1.8 }}>
          Step-by-step: Foundations → Operators → Functions → Arrays → OOP → Web → Database
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 32 }}>
        {CHAPTERS.map(ch => (
          <div key={ch.name}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}>
              <div style={{ width: 3, height: 16, background: ch.color, borderRadius: 2 }} />
              <span style={{ fontSize: 16, marginRight: 2 }}>{ch.icon}</span>
              <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, fontWeight: 700, color: ch.color, letterSpacing: '0.08em' }}>{ch.name}</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(185px,1fr))', gap: 7 }}>
              {ch.nums.map(num => {
                const s = SLIDES.find(sl => sl.num === num);
                if (!s) return null;
                const idx = SLIDES.indexOf(s);
                return (
                  <button key={num} onClick={() => onGoTo(idx)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 11px', background: 'var(--card)', border: `1px solid var(--border)`, borderRadius: 8, cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s' }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = ch.color + '65'; e.currentTarget.style.background = ch.color + '09'; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--card)'; }}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 6, background: ch.color + '20', color: ch.color, fontFamily: 'Space Mono,monospace', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
                      <span style={{ position: 'absolute', top: 2, left: 4, fontSize: 8, opacity: 0.6 }}>{s.num}</span>
                      <span style={{ fontSize: 16 }}>{s.icon}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', fontFamily: 'Space Mono,monospace', lineHeight: 1.2 }}>{s.title}</div>
                      <div style={{ fontSize: 9, color: 'var(--dim)', marginTop: 2 }}>{s.tag}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button onClick={onStart} style={{ padding: '13px 44px', borderRadius: 8, border: 'none', background: ACCENT, color: '#000', fontFamily: 'Space Mono,monospace', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em' }}>
        START FROM LESSON 01 →
      </button>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────
export default function PHPSlides() {
  const [screen, setScreen] = useState('toc');
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');


  const goTo = useCallback((idx: number) => {
    setDir(idx > current ? 1 : -1); setCurrent(idx); setScreen('slide');
  }, [current]);

  const next = useCallback(() => {
    if (current < SLIDES.length - 1) { setDir(1); setCurrent(c => c + 1); }
    else { setScreen('toc'); setCurrent(0); }
  }, [current]);

  const prev = useCallback(() => {
    if (current > 0) { setDir(-1); setCurrent(c => c - 1); }
  }, [current]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (screen !== 'slide') return;
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') setScreen('toc');
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [screen, next, prev]);

  const slide = SLIDES[current]!;

  return (
    <div style={{ width: '100%', height: '100vh', background: 'var(--bg)', color: 'var(--ink)', overflow: 'hidden', fontFamily: "'Noto Sans Khmer','Inter',sans-serif" }}>
      <style>{GLOBAL_STYLE(theme)}</style>
      {/* grid texture */}
      <div style={{ position: 'fixed', inset: 0, opacity: theme === 'dark' ? 0.02 : 0.05, pointerEvents: 'none', backgroundImage: `linear-gradient(${theme === 'dark' ? '#fff' : '#000'} 1px,transparent 1px),linear-gradient(90deg,${theme === 'dark' ? '#fff' : '#000'} 1px,transparent 1px)`, backgroundSize: '32px 32px' }} />
      {/* accent glow */}
      {screen === 'slide' && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', transition: 'background 0.6s', background: `radial-gradient(ellipse at 75% 15%, ${slide.tagColor}10 0%, transparent 55%)` }} />
      )}
      <AnimatePresence mode="wait">
        {screen === 'toc' ? (
          <motion.div key="toc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
            <TOC onStart={() => { setCurrent(0); setScreen('slide'); }} onGoTo={goTo} theme={theme} toggleTheme={toggleTheme} />
          </motion.div>
        ) : (
          <motion.div key={`s${current}`} initial={{ opacity: 0, x: dir * 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -dir * 20 }} transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }} style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
            <Slide slide={slide} current={current} total={SLIDES.length} onNext={next} onPrev={prev} theme={theme} toggleTheme={toggleTheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}