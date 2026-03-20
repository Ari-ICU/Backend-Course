"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft, ChevronRight, Code2, Copy, Check, Play, RotateCcw,
  Server, Database, Globe, Globe2, Lock, Shield, ShieldAlert, ShieldCheck,
  Search, Send, Activity, Layers, List, RefreshCw, Zap, Sparkles,
  Key, Link as LinkIcon, FileCode, Package, Box, ArrowRight, ArrowLeft,
  Terminal, Rocket, HardDrive, Layout, Workflow,
  Fingerprint, GitBranch, Edit3, Star, Trophy, ShoppingCart, StickyNote, CheckCircle2,
  Menu, X, ChevronDown, User,
} from 'lucide-react';

/* ─── TYPES ──────────────────────────────────────────────────────── */
interface Slide {
  chapter: string;
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
  icon: React.ElementType;
}

/* ─── CHAPTERS ───────────────────────────────────────────────────── */
const CHAPTERS = [
  { id: 'intro',      label: 'មេរៀនទី ១ · មូលដ្ឋានគ្រឹះ PHP', color: '#10b981' },
  { id: 'logic',      label: 'មេរៀនទី ២ · លក្ខខណ្ឌ និងការប្រើ Loop',   color: '#6366f1' },
  { id: 'data',       label: 'មេរៀនទី ៣ · ការគ្រប់គ្រង Array',  color: '#06b6d4' },
  { id: 'forms',      label: 'មេរៀនទី ៤ · ការចាប់ទិន្នន័យពី Form',    color: '#f59e0b' },
  { id: 'db',         label: 'មេរៀនទី ៥ · PHP ជាមួយ Database',   color: '#3b82f6' },
  { id: 'auth',       label: 'មេរៀនទី ៦ · ប្រព័ន្ធ Login និង Session',    color: '#f43f5e' },
  { id: 'files',      label: 'មេរៀនទី ៧ · ការ Upload ឯកសារ',    color: '#f97316' },
  { id: 'oop',        label: 'មេរៀនទី ៨ · ការសរសេរកូដបែប OOP',       color: '#a855f7' },
  { id: 'security',   label: 'មេរៀនទី ៩ · សុវត្ថិភាពកូដ (Security)',  color: '#ec4899' },
  { id: 'project',    label: 'មេរៀនទី ១០ · បង្កើត Project ចុងក្រោយ',   color: '#14b8a6' },
];

/* ─── SLIDE DATA ─────────────────────────────────────────────────── */
const slides: Slide[] = [
  /* ── PHASE 1: PHP FUNDAMENTALS (Week 1–2) ── */
  {
    chapter: 'intro', id: 'PH1-S1', tag: 'Week 1', tagColor: '#10b981',
    title: 'តើអ្វីទៅជា PHP?', subtitle: 'ស្វែងយល់ពី Server-Side', accent: '#10b981',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(16,185,129,0.15) 0%, transparent 55%)',
    content: [
      'PHP មកពីពាក្យពេញថា "Hypertext Preprocessor"។',
      'វាជាភាសា Server-side scripting language ដែលដំណើរការនៅលើ Server (មិនមែនលើ Browser ទេ)។',
      'របៀបដែលវាដើរ៖ Client បញ្ជា -> Server ដំណើរការ PHP -> បញ្ជូនលទ្ធផលជា HTML ឱ្យ Browser បង្ហាញ។',
      'សំណុំឧបករណ៍ (Stacks)៖ LAMP (Linux, Apache, MySQL, PHP) ឬ WAMP (សម្រាប់ Windows)។'
    ],
    syntax: '<?php\n  // PHP code goes here\n?>',
    lab: 'តើការដំណើរការកូដលើ Client-side និង Server-side ខុសគ្នាត្រង់ណាខ្លះ?',
    result: 'យល់ថាកូដ PHP ពិតប្រាកដ គឺសិស្ស ឬអ្នកប្រើ Browser មើលមិនឃើញឡើយ។',
    filename: 'intro.txt',
    code: `Step 1: User requests "index.php"
Step 2: Apache server finds the file
Step 3: PHP engine processes the code
Step 4: Result sent as HTML to Chrome/Safari`,
    icon: Globe,
    terminalOutput: "PHP Status: Working on Server",
  },
  {
    chapter: 'intro', id: 'PH1-S2', tag: 'Week 1', tagColor: '#10b981',
    title: 'ការរៀបចំកម្មវិធី', subtitle: 'XAMPP & Laragon', accent: '#10b981',
    bg: 'radial-gradient(ellipse at 80% 30%, rgba(16,185,129,0.12) 0%, transparent 55%)',
    content: [
      'XAMPP៖ ជាកម្មវិធីដំឡើងម្តងបានទាំង Apache, MySQL និង PHP (ប្រើបានគ្រប់ OS)។',
      'Laragon៖ ជាជម្រើសមួយទៀតដែលសាមញ្ញ និងលឿនសម្រាប់អ្នកប្រើ Windows។',
      'Htdocs៖ ជា Folder សម្រាប់ដាក់រាល់ File PHP ទាំងអស់ដើម្បីឱ្យ Server ដំណើរការបាន។',
      'Localhost៖ របៀបចូលមើល Project របស់អ្នកតាមរយៈ Browser (http://localhost/project-name)។'
    ],
    syntax: 'Project Root: C:/xampp/htdocs/my-app/index.php',
    lab: 'ដំឡើង XAMPP រួចបង្កើត File "index.php" មួយក្នុង Folder htdocs។',
    result: 'សេវាកម្ម Apache ចាប់ផ្ដើមដំណើរការ (រូបតំណាងពណ៌បៃតង)។',
    filename: 'setup.md',
    code: `1. Download XAMPP from apachefriends.org
2. Install & Open Control Panel
3. Start Apache and MySQL
4. Browse to: http://localhost/dashboard`,
    icon: Server,
    terminalOutput: "Apache Server: Running on port 80\nMySQL Server: Running on port 3306",
  },
  {
    chapter: 'intro', id: 'PH1-S3', tag: 'Week 1', tagColor: '#10b981',
    title: 'Syntax មូលដ្ឋាន', subtitle: 'ចាប់ផ្ដើមជាមួយ PHP', accent: '#10b981',
    bg: 'radial-gradient(ellipse at center, rgba(16,185,129,0.1) 0%, transparent 60%)',
    content: [
      'Tag បើក៖ រាល់ Script របស់ PHP ត្រូវតែស្ថិតក្នុង Tag <?php',
      'Tag បិទ៖ បិទដោយ ?> (មិនចាំបាច់បិទទេ បើក្នុង File មានតែកូដ PHP សុទ្ធ)។',
      'ពាក្យបញ្ជា "echo"៖ សម្រាប់បង្ហាញអត្ថបទ ឬ HTML ទៅកាន់អេក្រង់។',
      'សញ្ញា Semicolon៖ រាល់ការបញ្ចប់កូដមួយជួរ ត្រូវតែមានសញ្ញា (;) ជាដាច់ខាត។'
    ],
    syntax: '<?php\n  echo "Hello";\n?>',
    lab: 'សរសេរកូដបង្ហាញឈ្មោះរបស់អ្នក ដោយប្រើ echo ក្នុង Tag <strong>។',
    result: 'ឈ្មោះរបស់អ្នកបង្ហាញជាអក្សរក្រាស់នៅលើ Browser។',
    filename: 'hello.php',
    code: `<?php
echo "Hello World!";
echo "<strong>Welcome to PHP Learning</strong>";`,
    icon: Code2,
    terminalOutput: "Hello World! Welcome to PHP Learning",
  },
  {
    chapter: 'intro', id: 'PH1-S4', tag: 'Week 2', tagColor: '#10b981',
    title: 'Variable និង Data Types', subtitle: 'ការរក្សាទុកទិន្នន័យ', accent: '#10b981',
    bg: 'radial-gradient(ellipse at 30% 70%, rgba(16,185,129,0.1) 0%, transparent 60%)',
    content: [
      'ការបង្កើត Variable៖ ត្រូវចាប់ផ្ដើមដោយសញ្ញា $ ($name, $age)។',
      'Loose Typing៖ PHP មិនបង្ខំឱ្យយើងកំណត់ប្រភេទទិន្នន័យ (ដូចជា String ឬ Int) ជាមុនទេ។',
      'ប្រភេទដែលប្រើច្រើន៖ String (អក្សរ), Integer (លេខ), Float (ទសភាគ), Boolean (ពិត/មិនពិត)។',
      'Case Sensitive៖ $name និង $Name គឺខុសគ្នា (ជា Variable ពីរផ្សេងគ្នា)។'
    ],
    syntax: '$variable_name = value;',
    lab: 'បង្កើត Variable សម្រាប់ឈ្មោះ និងអាយុ រួចប្រើ echo បង្ហាញជាប្រយោគមួយ។',
    result: 'ព័ត៌មានរបស់អ្នកនឹងបង្ហាញមកតាមអ្វីដែលបានកំណត់ក្នុង Variable។',
    filename: 'vars.php',
    code: `<?php
$name = "Ratha";
$age = 21;
$isStudent = true;

echo "Name: $name\\n";
echo "Age: $age\\n";
echo "Student: " . ($isStudent ? 'Yes' : 'No');`,
    icon: FileCode,
    terminalOutput: "Name: Ratha\nAge: 21\nStudent: Yes",
  },
  {
    chapter: 'intro', id: 'PH1-S5', tag: 'Week 2', tagColor: '#10b981',
    title: 'Operators', subtitle: 'ការគណនា និង Logic', accent: '#10b981',
    bg: 'radial-gradient(ellipse at center, rgba(16,185,129,0.08) 0%, transparent 70%)',
    content: [
      'Arithmetic៖ ការគណនាគណិតវិទ្យា (+, -, *, /) និងសំណល់ (%)។',
      'Comparison៖ ការប្រៀបធៀប == (ស្មើ), != (មិនស្មើ), > (ធំជាង), < (តូចជាង)។',
      'Logical៖ បន្សំលក្ខខណ្ឌ && (AND), || (OR), ! (NOT)។',
      'ការភ្ជាប់អក្សរ៖ ប្រើសញ្ញាចុច (.) ដើម្បីយកអក្សរមកបន្តគ្នា ($first . $last)។'
    ],
    syntax: '$total = $a + $b;\nif($a == $b) { ... }',
    lab: 'សាកគណនាតម្លៃទំនិញ 3 មុខបញ្ចូលគ្នា រួចបង្ហាញលទ្ធផលដែលបូករួច។',
    result: 'តម្លៃសរុបត្រូវបានគណនា និងបង្ហាញចេញមកក្រៅយ៉ាងត្រឹមត្រូវ។',
    filename: 'ops.php',
    code: `<?php
$item1 = 10;
$item2 = 20;
$item3 = 5;
$total = $item1 + $item2 + $item3;

echo "Total: $" . $total;`,
    icon: Zap,
    terminalOutput: "Total: $35",
  },

  /* ── PHASE 2: LOGIC & CONTROL (Week 2–3) ── */
  {
    chapter: 'logic', id: 'PH2-S1', tag: 'Week 2', tagColor: '#6366f1',
    title: 'Conditional Statements', subtitle: 'ការសម្រេចចិត្ត', accent: '#6366f1',
    bg: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, transparent 100%)',
    content: [
      'ពាក្យបញ្ជា "if"៖ ដំណើរការកូដលុះត្រាតែលក្ខខណ្ឌមួយពិត (true)។',
      'Else / Elseif៖ ផ្តល់ជម្រើសផ្សេងទៀតប្រសិនបើលក្ខខណ្ឌដំបូងមិនពិត (false)។',
      'ទម្រង់ខ្លី៖ Ternary operator ($age > 18 ? "Adult" : "Minor")។',
      'Logic Flow៖ ចាំបាច់សម្រាប់ការត្រួតពិនិត្យការ Login និងការអនុញ្ញាតចូលប្រើទំព័រ។'
    ],
    syntax: 'if ($age > 18) { echo "Adult"; } else { echo "Minor"; }',
    lab: 'ត្រួតពិនិត្យអ្នកប្រើប្រាស់ថាជា "admin" ឬ "guest" រួចបង្ហាញសារស្វាគមន៍ទៅតាមនោះ។',
    result: 'សារដែលសមស្របនឹងត្រូវបានបង្ហាញផ្អែកលើ variable role។',
    filename: 'logic.php',
    code: `<?php
$role = "admin";

if ($role == "admin") {
    echo "Welcome, Administrator!";
} else {
    echo "Welcome, Guest User.";
}`,
    icon: ShieldCheck,
    terminalOutput: "Welcome, Administrator!",
  },
  {
    chapter: 'logic', id: 'PH2-S2', tag: 'Week 3', tagColor: '#6366f1',
    title: 'ការប្រើ Loop (ការងារដដែលៗ)', subtitle: 'កិច្ចការស្វ័យប្រវត្តិ', accent: '#6366f1',
    bg: 'radial-gradient(ellipse at 10% 80%, rgba(99,102,241,0.08) 0%, transparent 55%)',
    content: [
      'For Loop៖ ប្រើនៅពេលយើងដឹងច្បាស់ថា ចង់ឱ្យវាដើរប៉ុន្មានជុំ (Counter-based)។',
      'While Loop៖ ឱ្យវាដើរចុះឡើង ដរាបណាលក្ខខណ្ឌនៅតែ "ពិត" (True)។',
      'Do-While៖ ប្លែកគេបន្តិច គឺវាដំណើរការមុន ១ដង សិន ទើបឆែកលក្ខខណ្ឌតាមក្រោយ។',
      'Counter Variable៖ ជាតួលេខសម្រាប់គ្រប់គ្រងកុំឱ្យ Loop ដើរមិនឈប់ (Infinite Loop)។'
    ],
    syntax: 'for ($i = 1; $i <= 5; $i++) { echo $i; }',
    lab: 'ប្រើ For Loop ដើម្បីបង្ហាញលេខរៀងពី ១ ដល់ ១០ ជាជួរដេក។',
    result: 'អ្នកនឹងឃើញលេខរៀង (1 2 3 ... 10) បង្ហាញនៅលើអេក្រង់។',
    filename: 'loops.php',
    code: `<?php
for ($i = 1; $i <= 10; $i++) {
    echo $i . " ";
}`,
    icon: RefreshCw,
    terminalOutput: "1 2 3 4 5 6 7 8 9 10",
  },
  {
    chapter: 'logic', id: 'PH2-S3', tag: 'Week 3', tagColor: '#6366f1',
    title: 'ការប្រើ Function', subtitle: 'កូដដែលប្រើឡើងវិញបាន', accent: '#6366f1',
    bg: 'radial-gradient(ellipse at center, rgba(99,102,241,0.04) 0%, transparent 70%)',
    content: [
      'ការបង្កើត (Declaration)៖ ចងក្រងកូដចូលគ្នាជាបណ្តុំ ដើម្បីយកមកប្រើបានច្រើនដង។',
      'Arguments៖ ជាទិន្នន័យដែលយើងបោះចូលទៅក្នុង Function ដើម្បីឱ្យវាធ្វើការ។',
      'Return Statement៖ ប្រើ "return" ដើម្បីបញ្ជូនលទ្ធផលចេញពី Function ត្រឡប់មកវិញ។',
      'ការហៅប្រើ (Calling)៖ គ្រាន់តែហៅឈ្មោះ Function រួចដាក់សញ្ញា () ជាការស្រេច។'
    ],
    syntax: 'function greet($name) { return "Hello " . $name; }',
    lab: 'សរសេរ Function ឈ្មោះ "addNums" ដែលទទួលលេខ ២ រួចបូកបញ្ជូនលទ្ធផលមកវិញ។',
    result: 'Function នឹងគណនាលទ្ធផល រួចបោះតម្លៃដែលបូករួចមកឱ្យយើងបង្ហាញ។',
    filename: 'functions.php',
    code: `<?php
function greet($name) {
    return "Hello " . $name . "!";
}

echo greet("Ratha");`,
    icon: Code2,
    terminalOutput: "Hello Ratha!",
  },

  /* ── PHASE 3: DATA STRUCTURES (Week 3–4) ── */
  {
    chapter: 'data', id: 'PH3-S1', tag: 'Week 3', tagColor: '#06b6d4',
    title: 'Indexed Array', subtitle: 'បញ្ជីរាយនាមតាមលេខរៀង', accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at center, rgba(6,182,212,0.08) 0%, transparent 70%)',
    content: [
      'និយមន័យ៖ ជាការរក្សាទុកទិន្នន័យច្រើនក្នុង Variable តែមួយ ដោយប្រើលេខរៀង (Index)។',
      'Square Brackets []៖ ជារបៀបសរសេរ Array ដែលសាមញ្ញ និងពេញនិយមបំផុតក្នុង PHP។',
      'ការទាញយកទិន្នន័យ៖ ហៅឈ្មោះ Array រួចដាក់លេខរៀងក្នុង [] (ចាប់ផ្ដើមពីលេខ ០)។',
      'Counting៖ ប្រើ Function count($array) ដើម្បីដឹងថាមានទិន្នន័យប៉ុន្មានក្នុង Array។'
    ],
    syntax: '$colors = ["red", "blue", "green"];',
    lab: 'បង្កើត Array តំណាងឱ្យផ្លែឈើ ៣ មុខ រួចបង្ហាញឈ្មោះផ្លែឈើទី ២ មីន។',
    result: 'ឈ្មោះផ្លែឈើដែលស្ថិតក្នុង Index ទី ១ នឹងបង្ហាញលើ Terminal។',
    filename: 'arrays.php',
    code: `<?php
$colors = ["red", "blue", "green"];
echo "First color: " . $colors[0] . "\\n";
echo "Total colors: " . count($colors);`,
    icon: List,
    terminalOutput: "First color: red\nTotal colors: 3",
  },
  {
    chapter: 'data', id: 'PH3-S2', tag: 'Week 4', tagColor: '#06b6d4',
    title: 'Associative Array', subtitle: 'កំណត់ Key តាមចិត្ត', accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at center, rgba(6,182,212,0.08) 0%, transparent 70%)',
    content: [
      'និយមន័យ៖ ប្រើឈ្មោះ (Key) ជំនួសឱ្យលេខរៀង ដើម្បីកំណត់ចំណាំទិន្នន័យ។',
      'Arrow Syntax៖ ប្រើសញ្ញា => ដើម្បីភ្ជាប់ឈ្មោះ Key ទៅកាន់តម្លៃ (Value) របស់វា។',
      'ការប្រើប្រាស់៖ ល្អបំផុតសម្រាប់តំណាងឱ្យព័ត៌មានលម្អិត (User, ផលិតផល, ...)។',
      'Dynamic Access៖ $user["email"] សម្រាប់ទាញយក Email ចេញមកបង្ហាញ។'
    ],
    syntax: '$user = ["name" => "Ratha", "age" => 21];',
    lab: 'បង្កើត Associative Array សម្រាប់ឡានមួយ (Model, Year, Color) រួចបង្ហាញពណ៌ឡាន។',
    result: 'ទិន្នន័យត្រូវបានរក្សាទុកយ៉ាងមានរបៀប ហើយងាយស្រួលទាញយកតាម Key។',
    filename: 'assoc.php',
    code: `<?php
$user = [
  "name" => "Ratha",
  "email" => "ratha@gmail.com",
  "age" => 21
];

echo "User Email: " . $user["email"];`,
    icon: Layers,
    terminalOutput: "User Email: ratha@gmail.com",
  },
  {
    chapter: 'data', id: 'PH3-S3', tag: 'Week 4', tagColor: '#06b6d4',
    title: 'Foreach Loop', subtitle: 'ការរុករកក្នុង Array', accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at center, rgba(6,182,212,0.08) 0%, transparent 70%)',
    content: [
      'Loop ពិសេស៖ ជា loop ដែលបង្កើតឡើងសម្រាប់ទាញទិន្នន័យពី Array មកបង្ហាញ។',
      'ស្វ័យប្រវត្តិ៖ វានឹងដើររហូតទាល់តែអស់ទិន្នន័យក្នុង Array ដោយមិនចាំបាច់រាប់លេខរៀង។',
      'Key/Value៖ យើងអាចទាញយកបានទាំង "ឈ្មោះ Key" និង "តម្លៃ Value" ក្នុងពេលតែមួយ។',
      'ភាពងាយស្រួល៖ ជាវិធីដែលស្អាត និងពេញនិយមបំផុតសម្រាប់បង្ហាញបញ្ជី (List)។'
    ],
    syntax: 'foreach ($array as $item) { ... }',
    lab: 'សាកប្រើ Foreach ដើម្បីបង្ហាញបញ្ជីពណ៌ទាំងអស់ដែលមានក្នុង Array។',
    result: 'ឈ្មោះពណ៌នីមួយៗនឹងបង្ហាញចេញមកក្រៅម្តងមួយៗតាមលំដាប់លំដោយ។',
    filename: 'foreach.php',
    code: `<?php
$colors = ["red", "blue", "green"];

foreach ($colors as $color) {
    echo "Color: $color\\n";
}`,
    icon: RotateCcw,
    terminalOutput: "Color: red\nColor: blue\nColor: green",
  },
  {
    chapter: 'data', id: 'PH3-S4', tag: 'Week 4', tagColor: '#06b6d4',
    title: 'Array Mapping', subtitle: 'ការបំប្លែងទិន្នន័យសរុប', accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at center, rgba(6,182,212,0.08) 0%, transparent 70%)',
    content: [
      'ការបំប្លែង (Transformation)៖ បង្កើត Array ថ្មីមួយ ចេញពីការកែប្រែរាល់ធាតុក្នុង Array ចាស់។',
      'Closures (fn)៖ ប្រើវិធីសរសេរខ្លីៗដើម្បីធ្វើការងារលើធាតុនីមួយៗក្នុង Array។',
      'Original Array៖ Array ដើម គឺមិនមានការផ្លាស់ប្តូរតម្លៃ ឬខូចខាតអ្វីឡើយ។',
      'អត្ថប្រយោជន៍៖ ប្រើច្រើនសម្រាប់គណនាបញ្ចុះតម្លៃ, រៀបចំ Font អក្សរ ឬដូរទម្រង់ទិន្នន័យ។'
    ],
    syntax: 'array_map(fn($x) => $x * 2, $arr);',
    lab: 'ផ្តល់ Array តម្លៃទំនិញ [100, 200, 300] រួចប្រើ array_map ដើម្បីបញ្ចុះតម្លៃ ២០% ទាំងអស់។',
    result: 'អ្នកនឹងទទួលបាន Array ថ្មីដែលមានតម្លៃបញ្ចុះរួចរាល់។',
    filename: 'array_ops.php',
    code: `<?php
$prices = [100, 200, 300];
$discounted = array_map(fn($p) => $p * 0.8, $prices);

echo "New Prices: " . implode(", ", $discounted);`,
    icon: List,
    terminalOutput: "New Prices: 80, 160, 240",
  },
  /* ── PHASE 4: WORKING WITH FORMS (Week 4–5) ── */
  {
    chapter: 'forms', id: 'PH4-S1', tag: 'Week 4', tagColor: '#f59e0b',
    title: 'GET vs POST (តើគួរប្រើមួយណា?)', subtitle: 'វិធីសាស្ត្រផ្ញើទិន្នន័យ', accent: '#f59e0b',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(245,158,11,0.15) 0%, transparent 55%)',
    content: [
      'GET៖ ទិន្នន័យបង្ហាញលើ URL (?id=1)។ ប្រើសម្រាប់តែការស្វែងរក (Search) ឬមើលទិន្នន័យធម្មតា។',
      'POST៖ ទិន្នន័យត្រូវបានលាក់ (មិនបង្ហាញលើ URL)។ ប្រើសម្រាប់ផ្ញើទិន្នន័យសំខាន់ៗដូចជា លេខសម្ងាត់ ជាដើម។',
      '$_POST៖ ជាអថេរពិសេស (Superglobal) សម្រាប់ចាប់យកទិន្នន័យដែលផ្ញើមកពី Form។',
      'សុវត្ថិភាព៖ កុំផ្ញើព័ត៌មានសម្ងាត់តាមរយៈ GET ឱ្យសោះ ព្រោះវានឹងបង្ហាញឱ្យគេឃើញទាំងអស់។'
    ],
    syntax: '$name = $_POST["name"];',
    lab: 'សាកល្បងទទួលឈ្មោះពីការបញ្ជូនតាមរយៈ POST រួចបង្ហាញសារស្វាគមន៍។',
    result: 'ទិន្នន័យត្រូវបានចាប់យកយ៉ាងត្រឹមត្រូវ និងបង្ហាញលើអេក្រង់។',
    filename: 'forms.php',
    code: `<?php
// Mocking a POST request
$_POST["username"] = "Ratha";

$name = $_POST["username"] ?? "Guest";
echo "Submitted Name: " . $name;
?>`,
    icon: Layout,
    terminalOutput: "Submitted Name: Ratha",
  },
  {
    chapter: 'forms', id: 'PH4-S2', tag: 'Week 5', tagColor: '#f59e0b',
    title: 'ការធ្វើ Validation', subtitle: 'ការសម្អាតទិន្នន័យ', accent: '#f59e0b',
    bg: 'radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 70%)',
    content: [
      'ច្បាប់មាស៖ កុំទុកចិត្តរាល់ទិន្នន័យដែលបញ្ចូលមកពីអ្នកប្រើប្រាស់ឱ្យសោះ (Never trust input)។',
      'Sanitization៖ ការលុបចោលតួអក្សរដែលគ្រោះថ្នាក់ (ដូចជាការកាត់ HTML Tags ចេញ)។',
      'Validation៖ ការឆែកមើលថាទិន្នន័យត្រឹមត្រូវតាមទម្រង់ដែលយើងចង់បាន (ឧទាហរណ៍៖ Email)។',
      'XSS Protection៖ ប្រើ htmlspecialchars() ដើម្បីការពារការ Hack ចូលក្នុងវេបសាយ។'
    ],
    syntax: 'htmlspecialchars($input);',
    lab: 'សរសេរកូដសម្អាតអត្ថបទ (String) ដែលមានផ្ទុក HTML Tags ដ៏គ្រោះថ្នាក់។',
    result: 'Tags ទាំងនោះនឹងត្រូវបានបំប្លែងឱ្យទៅជាអត្ថបទធម្មតាវិញដោយសុវត្ថិភាព។',
    filename: 'validation.php',
    code: `<?php
$userInput = "<script>alert('hacked')</script> Hello!";
$safeInput = htmlspecialchars($userInput);

echo $safeInput;
?>`,
    icon: ShieldCheck,
    terminalOutput: "&lt;script&gt;alert('hacked')&lt;/script&gt; Hello!",
  },

  /* ── PHASE 5: PHP + DATABASE (Week 5–6) ── */
  {
    chapter: 'db', id: 'PH5-S1', tag: 'Week 5', tagColor: '#3b82f6',
    title: 'ការភ្ជាប់ទៅកាន់ MySQL (PDO)', subtitle: 'ស្ពានចម្លងទិន្នន័យ', accent: '#3b82f6',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(59,130,246,0.15) 0%, transparent 55%)',
    content: [
      'PDO៖ ជាវិធីសាស្ត្រទំនើប និងមានសុវត្ថិភាពបំផុតសម្រាប់ភ្ជាប់ទៅកាន់ Database ច្រើនប្រភេទ។',
      'Connection Parameters៖ ការកំណត់ Host, ឈ្មោះ Database, Username និង Password។',
      'Try/Catch៖ ប្រើសម្រាប់ឆែកមើលថា តើការភ្ជាប់ទៅកាន់ Database ជោគជ័យ ឬមានបញ្ហាកូដត្រង់ណា។',
      'Persistence៖ ការភ្ជាប់នេះនឹងបន្តរហូតទាល់តែ Script របស់ PHP ដំណើរការចប់។'
    ],
    syntax: '$pdo = new PDO("mysql:host=$h;dbname=$d", $u, $p);',
    lab: 'រៀបចំ Parameters ដែលចាំបាច់សម្រាប់ការភ្ជាប់ Database នៅក្នុង Local Server។',
    result: 'យល់ដឹងពីរបៀបភ្ជាប់ និងការចាប់យក Error ក្នុងករណីភ្ជាប់មិនបាន។',
    icon: Database,
    code: `<?php
$host = "localhost";
$db = "my_database";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    echo "Connection Successful!";
} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}
?>`,
    terminalOutput: "Connection Successful!",
  },
  {
    chapter: 'db', id: 'PH5-S2', tag: 'Week 6', tagColor: '#3b82f6',
    title: 'ប្រតិបត្តិការ CRUD', subtitle: 'ការគ្រប់គ្រងទិន្នន័យ', accent: '#3b82f6',
    bg: 'radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 70%)',
    content: [
      'Read (SELECT)៖ ការទាញយកទិន្នន័យមកបង្ហាញលើគេហទំព័រ។',
      'Create (INSERT)៖ ការរក្សាទុកទិន្នន័យថ្មីចូលទៅក្នុងតារាង (Table)។',
      'Update/Delete៖ ការកែប្រែ ឬលុបទិន្នន័យ (ត្រូវប្រើ WHERE ជានិច្ចដើម្បីកុំឱ្យខូចទិន្នន័យផ្សេង)។',
      'Prepared Statements៖ ចាំបាច់បំផុតដើម្បីការពារកុំឱ្យគេ Hack ចូល Database (SQL Injection)។'
    ],
    syntax: '$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");',
    lab: 'ពន្យល់ពីមូលហេតុដែលយើងប្រើ Prepared Statements ជំនួសឱ្យការសរសេរសំណួរផ្ទាល់។',
    result: 'យល់ដឹងពីរបៀបការពារទិន្នន័យឱ្យមានសុវត្ថិភាពខ្ពស់បំផុត។',
    icon: Database,
    code: `<?php
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$_GET["id"]]);
$user = $stmt->fetch();
echo "Welcome, " . htmlspecialchars($user["name"]);
?>`,
    terminalOutput: "Welcome, Ratha",
  },

  /* ── PHASE 6: AUTHENTICATION (Week 6–7) ── */
  {
    chapter: 'auth', id: 'PH6-S1', tag: 'Week 6', tagColor: '#f43f5e',
    title: 'ការប្រើ Session', subtitle: 'ការចងចាំអ្នកប្រើប្រាស់', accent: '#f43f5e',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(244,63,94,0.15) 0%, transparent 55%)',
    content: [
      'HTTP Stateless： មានន័យថា Browser មិនដែលចងចាំយើងទេ។ Sessions ជួយដោះស្រាយបញ្ហានេះ។',
      'session_start()៖ ជាពាក្យបញ្ជាដែលត្រូវហៅនៅផ្នែកខាងលើបង្អស់នៃគ្រប់ទំព័រ។',
      '$_SESSION៖ ជាអថេរពិសេសសម្រាប់រក្សាទុកទិន្នន័យឱ្យនៅជាប់ ទោះយើងប្តូរទៅទំព័រផ្សេងក៏ដោយ។',
      'ការបិទ Session៖ ជាទូទៅវាបាត់បង់ទៅវិញ នៅពេលយើងបិទ Browser ឬធ្វើការ Logout។'
    ],
    syntax: 'session_start(); $_SESSION["user"] = "id_123";',
    lab: 'សាកល្បងចាប់ផ្ដើម Session រួចរក្សាទុកឈ្មោះក្នុង "user_name" ដើម្បីបង្ហាញនៅទំព័រផ្សេង។',
    result: 'ឈ្មោះដែលបានរក្សាទុក នឹងបង្ហាញមកវិញទោះបីជាយើង Logout រួចចូលមកវិញក៏ដោយ (បើមិនទាន់បិទ Browser)។',
    filename: 'session.php',
    code: `<?php
session_start();
$_SESSION["user_name"] = "Ratha";

echo "Session started for: " . $_SESSION["user_name"];
?>`,
    icon: User,
    terminalOutput: "Session started for: Ratha",
  },
  {
    chapter: 'auth', id: 'PH6-S2', tag: 'Week 7', tagColor: '#f43f5e',
    title: 'ការ Hash លេខសម្ងាត់', subtitle: 'សុវត្ថិភាពទិន្នន័យសម្ងាត់', accent: '#f43f5e',
    bg: 'radial-gradient(ellipse at center, rgba(244,63,94,0.08) 0%, transparent 70%)',
    content: [
      'ច្បាប់សំខាន់៖ ហាមដាច់ខាតកុំរក្សាទុក Password សុទ្ធៗ (Plain-text) ក្នុង Database។',
      'password_hash()៖ ជា Function សម្រាប់បំប្លែង Password ឱ្យទៅជាកូដដែលមើលមិនយល់ (Hash)។',
      'password_verify()៖ ប្រើសម្រាប់ផ្ទៀងផ្ទាត់ Password ដែល User វាយបញ្ជូល ជាមួយ Hash ដែលមានស្រាប់។',
      'យន្តការការពារ៖ PHP ជួយគ្រប់គ្រង Salt ដោយស្វ័យប្រវត្តិដើម្បីសុវត្ថិភាពខ្ពស់បំផុត។'
    ],
    syntax: '$hash = password_hash($pw, PASSWORD_DEFAULT);',
    lab: 'សាកល្បងបង្កើត Hash ចេញពី Password "secret123" រួចផ្ទៀងផ្ទាត់វាវិញ។',
    result: 'អ្នកនឹងឃើញថា Password ត្រូវគ្នាជាមួយ Hash បើទោះជាយើងមើលមិនយល់ពី Hash នោះក៏ដោយ។',
    filename: 'auth.php',
    code: `<?php
$password = "secret123";
$hash = password_hash($password, PASSWORD_DEFAULT);

echo "Hash: " . substr($hash, 0, 20) . "...\\n";

if (password_verify("secret123", $hash)) {
    echo "Password Verified!";
}
?>`,
    icon: Lock,
    terminalOutput: "Hash: $2y$10$...\nPassword Verified!",
  },

  /* ── PHASE 7: FILE HANDLING (Week 7–8) ── */
  {
    chapter: 'files', id: 'PH7-S1', tag: 'Week 7', tagColor: '#f97316',
    title: 'ការ Upload ឯកសារ', subtitle: 'ការគ្រប់គ្រង Assets', accent: '#f97316',
    bg: 'radial-gradient(ellipse at center, rgba(249,115,22,0.08) 0%, transparent 70%)',
    content: [
      'enctype៖ ចាំបាច់ត្រូវដាក់ "multipart/form-data" ក្នុង HTML Form ទើប Upload ឯកសារបាន។',
      '$_FILES៖ ជាអថេរសម្រាប់ផ្ទុកព័ត៌មានឯកសារដូចជា ឈ្មោះ, ប្រភេទ (Type), និងទំហំ (Size)។',
      'move_uploaded_file()៖ ជាពាក្យបញ្ជាសម្រាប់ប្តូរឯកសារពីកន្លែងផ្ញើ ទៅកាន់ Folder ដែលយើងចង់ដាក់។',
      'សុវត្ថិភាព៖ ត្រូវឆែកប្រភេទឯកសារឱ្យច្បាស់ ដើម្បីការពារគេផ្ញើកូដមេរោគមកកាន់ Server។'
    ],
    syntax: 'move_uploaded_file($tmp, $destination);',
    lab: 'ពន្យល់ពីសារៈសំខាន់នៃ $_FILES array ក្នុងដំណើរការ Upload រូបភាព។',
    result: 'យល់ដឹងពីរបៀបគ្រប់គ្រង និងរក្សាទុកឯកសារបានយ៉ាងត្រឹមត្រូវ។',
    icon: HardDrive,
    code: `<?php
if ($_FILES["profile"]["error"] == UPLOAD_ERR_OK) {
    $tmp_name = $_FILES["profile"]["tmp_name"];
    $name = basename($_FILES["profile"]["name"]);
    move_uploaded_file($tmp_name, "uploads/$name");
    echo "File uploaded successfully!";
}
?>`,
    terminalOutput: "File uploaded successfully!",
  },

  /* ── PHASE 8: OOP IN PHP (Week 8–9) ── */
  {
    chapter: 'oop', id: 'PH8-S1', tag: 'Week 8', tagColor: '#a855f7',
    title: 'Classes & Objects', subtitle: 'ស្ថាបត្យកម្មទំនើប', accent: '#a855f7',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(168,85,247,0.15) 0%, transparent 55%)',
    content: [
      'Class៖ ប្រៀបដូចជាប្លង់មេ (Blueprint) សម្រាប់បង្កើត Object (ឧទាហរណ៍៖ Class "User")។',
      'Object៖ ជាតំណាងជាក់ស្តែងនៃ Class នោះ (ឧទាហរណ៍៖ $user1 = new User())។',
      'Properties៖ គឺជា Variable ដែលមាននៅក្នុង Class សម្រាប់រក្សាទិន្នន័យ។',
      'Methods៖ គឺជា Function ដែលមាននៅក្នុង Class សម្រាប់ធ្វើសកម្មភាពផ្សេងៗ។'
    ],
    syntax: 'class User { public $name; }',
    lab: 'បង្កើត Class ឈ្មោះ "Car" មួយដែលមាន Property ឈ្មោះ "brand" និង "model"។',
    result: 'អ្នកអាចបង្កើត Object ជាច្រើនដែលចេញពី Class តែមួយ ប៉ុន្តែមានតម្លៃផ្សេងគ្នា។',
    filename: 'oop.php',
    code: `<?php
class User {
    public $name;

    public function __construct($n) {
        $this->name = $n;
    }

    public function introduce() {
        return "Hi, I am " . $this->name;
    }
}

$user = new User("Ratha");
echo $user->introduce();
?>`,
    icon: Code2,
    terminalOutput: "Hi, I am Ratha",
  },

  /* ── PHASE 9: SECURITY BASICS (Week 9–10) ── */
  {
    chapter: 'security', id: 'PH9-S1', tag: 'Week 9', tagColor: '#ec4899',
    title: 'SQL Injection', subtitle: 'ការគំរាមកំហែងទូទៅ', accent: '#ec4899',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(236,72,153,0.15) 0%, transparent 55%)',
    content: [
      'The Attack៖ ការលួចបញ្ចូលបញ្ជា SQL មិនល្អ តាមរយៈការវាយអត្ថបទក្នុងប្រអប់បញ្ចូលទិន្នន័យ។',
      'គ្រោះថ្នាក់៖ អាចធ្វើឱ្យអ្នកលួច (Hacker) ឆ្លងកាត់ការ Login ឬលុបទិន្នន័យក្នុង DB ទាំងអស់បាន។',
      'ដំណោះស្រាយ៖ ហាមភ្ជាប់កូដ SQL ជាមួយ Variable ផ្ទាល់ ត្រូវតែប្រើ Prepared Statements។',
      'បច្ចេកទេសការពារ៖ ប្រើប្រព័ន្ធ PDO ដើម្បីបំបែកកូដ SQL និងទិន្នន័យឱ្យដាច់ពីគ្នា។'
    ],
    syntax: '$stmt->execute([$unsafe_variable]);',
    lab: 'សាកល្បងពន្យល់ពីភាពខុសគ្នារវាងការសរសេរ SQL បញ្ចូលគ្នាផ្ទាល់ និងការប្រើ PDO Prepare។',
    result: 'យល់ដឹងពីរបៀបការពារទិន្នន័យពីការប៉ុនប៉ង Hack ពីខាងក្រៅ។',
    icon: ShieldAlert,
    code: `<?php
// Secure way (Prepared Statements)
$stmt = $pdo->prepare("SELECT * FROM products WHERE category = ?");
$stmt->execute([$category]);

// DANGEROUS way (Concatenation)
// $sql = "SELECT * FROM users WHERE id = " . $unsafe_id;
?>`,
    terminalOutput: "Data fetched securely.",
  },
  /* ── PHASE 10: FINAL PROJECT (Week 10–12) ── */
  {
    chapter: 'project', id: 'PH10-S1', tag: 'Week 10', tagColor: '#14b8a6',
    title: 'រចនាសម្ព័ន្ធ Folder', subtitle: 'ដំណាក់កាលកសាង (Build)', accent: '#14b8a6',
    bg: 'radial-gradient(ellipse at center, rgba(20,184,166,0.08) 0%, transparent 70%)',
    content: [
      'ការរៀបចំ Folder៖ បង្កើតរចនាសម្ព័ន្ធឱ្យមានរបៀបរៀបរយដូចជា (public/, src/, vendor/)។',
      'Entry Point： ការដឹកនាំរាល់ Request ទាំងអស់ឱ្យមកឆ្លងកាត់ index.php តែមួយគត់។',
      'Database Schema៖ ការបង្កើតតារាង និងទំនាក់ទំនង (Relationship) ឱ្យបានត្រឹមត្រូវសម្រាប់ Project។',
      'គោលដៅ៖ រួមបញ្ចូលរាល់មេរៀនដែលបានរៀនទាំងអស់ ឱ្យក្លាយទៅជាវេបសាយពិតប្រាកដមួយ។'
    ],
    syntax: 'index.php -> controllers/PostController.php',
    lab: 'សាកល្បងគូររចនាសម្ព័ន្ធ Folder សម្រាប់ Project ចុងក្រោយរបស់អ្នក។',
    result: 'ទទួលបានរចនាសម្ព័ន្ធ File ដែលមានរបៀបរៀបរយតាមស្តង់ដារ។',
    icon: Layout,
    code: `# Project Root
/public
  index.php
/src
  /Controllers
  /Models
/vendor
/composer.json`,
  },
  {
    chapter: 'project', id: 'PH10-S2', tag: 'Week 12', tagColor: '#14b8a6',
    title: 'ការដាក់ឱ្យប្រើប្រាស់ (Deployment)', subtitle: 'ការបង្ហោះវេបសាយ (Going Live)', accent: '#14b8a6',
    bg: 'radial-gradient(ellipse at center, rgba(16,185,129,0.08) 0%, transparent 70%)',
    content: [
      'Error Logs៖ ត្រូវបិទ display_errors ក្នុងផលិតកម្ម (Production) ដើម្បីកុំឱ្យគេមើលឃើញព័ត៌មាន Server។',
      'Security Audit៖ ពិនិត្យឡើងវិញនូវរាល់កន្លែងទទួលទិន្នន័យពី User និងកូដ SQL ឱ្យមានសុវត្ថិភាពបំផុត។',
      'Live Server៖ បង្ហោះកូដ (Upload) និងផ្ទេរទិន្នន័យ (Migration) ទៅកាន់ Server ពិតប្រាកដ។',
      'Optimization៖ បង្រួមរូបភាព និង CSS ឱ្យតូចដើម្បីឱ្យវេបសាយដើរបានលឿនបំផុត។'
    ],
    syntax: 'git push production main',
    lab: 'ឆែកមើលទំព័រចុងក្រោយ បើក្នុងផលិតកម្ម (Production) ត្រូវប្រាកដថាគ្មាន Error ណាមួយបង្ហាញមកក្រៅ។',
    result: 'វេបសាយរបស់អ្នកដើរបានយ៉ាងរលូន និងមានសុវត្ថិភាពខ្ពស់។',
    filename: 'launch.php',
    code: `<?php
define("ENVIRONMENT", "production");
if (ENVIRONMENT === "production") {
    ini_set('display_errors', 0);
    echo "Site is LIVE - Security Mode ON.";
}`,
    icon: Rocket,
    terminalOutput: "Site is LIVE - Security Mode ON.",
  },
];

/* ─── SYNTAX HIGHLIGHTER ─────────────────────────────────────────── */
const PHP_KW = new Set([
  'php','echo','return','if','else','elseif','foreach','for','while',
  'class','extends','implements','namespace','use','new','public',
  'protected','private','static','function','fn','array','string',
  'int','float','bool','void','null','true','false','require',
  'include','throw','try','catch','match','readonly','const',
]);

const HighlightedCode = ({ code }: { code: string }) => {
  const tokenize = (line: string): React.ReactNode => {
    if (/^\s*(\/\/|#|\/\*|\*)/.test(line))
      return <span style={{ color: '#6b7280', fontStyle: 'italic' }}>{line}</span>;
    if (/^\s*{{--/.test(line))
      return <span style={{ color: '#6b7280', fontStyle: 'italic' }}>{line}</span>;

    const parts = line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\$[a-zA-Z_]\w*|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_]\w*\b)/g);
    return parts.map((p, i) => {
      if (!p) return null;
      if (p.startsWith('$')) return <span key={i} style={{ color: '#fbbf24' }}>{p}</span>;
      if (PHP_KW.has(p)) return <span key={i} style={{ color: '#f87171', fontWeight: 700 }}>{p}</span>;
      if (p.startsWith('"') || p.startsWith("'")) return <span key={i} style={{ color: '#86efac' }}>{p}</span>;
      if (/^\d/.test(p)) return <span key={i} style={{ color: '#c084fc' }}>{p}</span>;
      if (/^[A-Z]/.test(p)) return <span key={i} style={{ color: '#fbbf24' }}>{p}</span>;
      return <span key={i} style={{ color: '#e2e8f0' }}>{p}</span>;
    });
  };

  return (
    <div className="font-mono text-sm leading-6 whitespace-pre"
      style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace" }}>
      {code.split('\n').map((line, i) => (
        <div key={i} className="min-h-[1.5rem]">{tokenize(line)}</div>
      ))}
    </div>
  );
};

/* ─── CODE PANEL ─────────────────────────────────────────────────── */
const CodePanel = ({
  code: initialCode, terminal, terminalOutput: initialOutput, accent, filename,
}: {
  code: string; terminal?: string; terminalOutput?: string; accent: string; filename: string;
}) => {
  const [tab, setTab] = useState<'code' | 'terminal'>('code');
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(initialOutput);
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const hlRef = useRef<HTMLDivElement>(null);
  const lines = code.split('\n');

  useEffect(() => { setCode(initialCode); setOutput(initialOutput); }, [initialCode, initialOutput]);

  const copy = () => {
    navigator.clipboard.writeText(tab === 'code' ? code : (output || ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const syncScroll = () => {
    if (taRef.current && hlRef.current) {
      hlRef.current.scrollTop = taRef.current.scrollTop;
      hlRef.current.scrollLeft = taRef.current.scrollLeft;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#07090f] rounded-2xl overflow-hidden border border-white/8">
      {/* Tab bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d1117] border-b border-white/5 flex-none">
        <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/5">
          {(['code', 'terminal'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                tab === t ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}>
              {t === 'code' ? <Code2 className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
              {t === 'code' ? 'កូដ' : 'Terminal'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={async () => {
            setTab('terminal');
            setRunning(true);
            await new Promise(r => setTimeout(r, 800));
            setRunning(false);
          }}
            disabled={running}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              running ? 'bg-zinc-800 text-zinc-500' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
            }`}>
            <Play className={`w-3 h-3 ${running ? 'animate-pulse' : ''}`} />
            {running ? 'កំពុងដំណើរការ...' : 'ដំណើរការ'}
          </button>
          <button onClick={() => { setCode(initialCode); setOutput(initialOutput); }}
            className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-white/5 transition-all">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button onClick={copy}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
              copied ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}>
            {copied ? <><Check className="w-3 h-3" />ចម្លងរួច</> : <><Copy className="w-3 h-3" />ចម្លង</>}
          </button>
        </div>
      </div>

      {/* File bar */}
      <div className="flex items-center gap-3 px-4 py-2 bg-[#0d1117]/60 border-b border-white/5 flex-none">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/40" />
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2.5 py-1">
          <FileCode className="w-3 h-3" style={{ color: accent }} />
          <span className="text-[10px] font-mono text-zinc-400">
            {tab === 'code' ? filename : 'bash — terminal'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {tab === 'code' ? (
          <div className="flex h-full overflow-hidden">
            <div className="flex-none w-10 bg-[#07090f] border-r border-white/5 pt-4 flex flex-col items-end pr-3 select-none overflow-hidden">
              {lines.map((_, i) => (
                <div key={i} className="text-[11px] font-mono text-zinc-700 leading-6 min-h-[1.5rem]">{i + 1}</div>
              ))}
            </div>
            <div className="relative flex-1 overflow-hidden">
              <div ref={hlRef} className="absolute inset-0 overflow-auto p-4 pointer-events-none" style={{ scrollbarWidth: 'none' }}>
                <HighlightedCode code={code} />
              </div>
              <textarea ref={taRef} value={code} onChange={e => setCode(e.target.value)} onScroll={syncScroll}
                className="absolute inset-0 w-full h-full bg-transparent text-transparent resize-none outline-none p-4 font-mono text-sm leading-6 border-none overflow-auto selection:bg-purple-500/25"
                style={{ fontFamily: "'JetBrains Mono',monospace", whiteSpace: 'pre', overflowWrap: 'normal' }}
                spellCheck={false} wrap="off" />
            </div>
          </div>
        ) : (
          <div className="p-6 font-mono text-sm leading-relaxed overflow-auto h-full">
            <div className="flex gap-2 text-zinc-500 mb-3">
              <span style={{ color: accent }}>➜</span>
              <span className="text-blue-400">~/php-app</span>
              <span className="text-zinc-600 font-bold">$</span>
              <span className="text-zinc-200">{terminal || 'php index.php'}</span>
            </div>
            {running ? (
              <div className="flex flex-col gap-2 animate-pulse text-zinc-500">
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" /> 
                  Standard Output Processing...
                </span>
                <div className="h-[1px] bg-white/5 w-full my-2" />
              </div>
            ) : output ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400/50">
                  <CheckCircle2 className="w-3 h-3" /> ដំណើរការជោគជ័យ
                </div>
                <pre className="text-zinc-200 indent-2 whitespace-pre-wrap font-bold">{output}</pre>
              </div>
            ) : (
              <div className="text-zinc-600 animate-pulse italic">No output yet. Click 'Run' to execute.</div>
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
  const chapterParam = searchParams.get('chapter') || 'intro';

  // ISOLATE SLIDES: Only show slides for the active chapter
  const activeSlides = slides.filter(s => s.chapter === chapterParam);
  const displaySlides = activeSlides.length > 0 ? activeSlides : slides.filter(s => s.chapter === 'intro');

  const slideParam = searchParams.get('slide');
  const initialSlide = slideParam ? Math.max(0, Math.min(parseInt(slideParam) - 1, displaySlides.length - 1)) : 0;

  const [current, setCurrent] = useState(initialSlide);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dir, setDir] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const slide = displaySlides[current];
  const Icon = slide.icon;
  const progress = ((current + 1) / displaySlides.length) * 100;
  const chapterInfo = CHAPTERS.find(c => c.id === slide.chapter)!;

  useEffect(() => {
    const saved = localStorage.getItem('php_slide_notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const saveNote = (val: string) => {
    const next = { ...notes, [slide.id]: val };
    setNotes(next);
    localStorage.setItem('php_slide_notes', JSON.stringify(next));
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('slide', (current + 1).toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [current]);

  const goTo = useCallback((idx: number, d: number) => {
    if (isAnimating) return;
    setDir(d);
    setIsAnimating(true);
    setTimeout(() => { setCurrent(idx); setIsAnimating(false); }, 280);
  }, [isAnimating]);

  const next = () => goTo((current + 1) % displaySlides.length, 1);
  const prev = () => goTo((current - 1 + displaySlides.length) % displaySlides.length, -1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, isAnimating]);

  const variants = {
    enter: (d: number) => ({ y: d * 30, opacity: 0, scale: 0.98 }),
    center: { y: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ y: d * -30, opacity: 0, scale: 0.98 }),
  };

  return (
    <div className="min-h-screen text-white flex flex-col overflow-hidden"
      style={{ background: '#07090f', fontFamily: "'Inter','DM Sans',system-ui,sans-serif" }}>

      <div className="fixed inset-0 pointer-events-none transition-all duration-700" style={{ background: slide.bg }} />
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.04) 0%, transparent 60%)' }} />

      {/* ── CHAPTER NAV BAR (CONSISTENT WITH LARAVEL) ── */}
      <div className="relative z-[60] flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5 bg-black/60 backdrop-blur-2xl custom-header">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/courses/backend" 
            className="group flex items-center gap-3 px-3 sm:px-4 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 shadow-xl">
            <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors hidden lg:block">Exit</span>
          </Link>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-5 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/12 hover:border-white/30 transition-all active:scale-95 shadow-2xl overflow-hidden max-w-[150px] sm:max-w-none">
            <div className={`w-7 h-7 rounded-lg flex-none flex items-center justify-center transition-all duration-300 ${isMenuOpen ? 'bg-white text-black rotate-0' : 'bg-black/40 text-zinc-400 group-hover:text-white'}`}>
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div key="x" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                    <X className="w-3.5 h-3.5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}>
                    <Menu className="w-3.5 h-3.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex flex-col items-start leading-tight overflow-hidden">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 hidden sm:block">Curriculum Map</span>
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-sm font-bold text-white tracking-tight truncate">{chapterInfo.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-600 flex-none transition-transform duration-500 ${isMenuOpen ? 'rotate-180 text-white' : ''}`} />
              </div>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-3 sm:gap-8 transition-all">
          <div className="hidden sm:flex flex-col items-end gap-1.5 min-w-[100px] md:min-w-[140px]">
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="text-zinc-500 uppercase tracking-widest font-black hidden lg:block">Chapter Mastery</span>
              <span className="text-white font-black bg-white/10 px-1.5 py-0.5 rounded-md">{Math.round(progress)}%</span>
            </div>
            <div className="w-24 md:w-44 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
                style={{ background: chapterInfo.color }} />
            </div>
          </div>
          <div className="h-10 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button onClick={prev} className="w-10 h-10 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all active:scale-90 border border-white/5 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center min-w-[40px] sm:min-w-[45px]">
               <span className="text-[9px] font-black text-zinc-600 uppercase tracking-tighter mb-0.5 hidden xs:block">Slide</span>
               <span className="text-sm font-mono text-zinc-500 flex items-center gap-1 leading-none">
                 <span className="text-white font-bold">{current + 1}</span>
                 <span className="text-zinc-800">/</span>
                 <span>{displaySlides.length}</span>
               </span>
            </div>
            <button onClick={next} className="w-10 h-10 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all active:scale-90 border border-white/5 flex items-center justify-center">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── CHAPTER OVERLAY MENU (FULLY RESPONSIVE) ── */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md pointer-events-auto"
            />
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="relative w-full max-w-5xl max-h-full bg-[#0d1117] border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] flex flex-col pointer-events-auto overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto px-6 py-8 sm:p-12 scrollbar-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {CHAPTERS.map((ch, i) => {
                    const isActive = ch.id === chapterParam;
                    return (
                      <button key={ch.id} 
                        onClick={() => {
                          router.push(`?chapter=${ch.id}`);
                          setIsMenuOpen(false);
                        }}
                        className={`group relative flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl transition-all duration-300 border ${
                          isActive 
                            ? 'bg-white/5 border-white/20 shadow-xl' 
                            : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10 hover:-translate-y-1'
                        }`}>
                        
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-500 overflow-hidden flex-none ${
                           isActive ? 'scale-110 shadow-2xl' : 'opacity-60 filter group-hover:opacity-100 group-hover:scale-105'
                        }`}
                        style={{ 
                          background: isActive ? ch.color : `${ch.color}25`, 
                          color: isActive ? '#000' : ch.color,
                          border: isActive ? 'none' : `1.5px solid ${ch.color}40`
                        }}>
                          {String(i + 1).padStart(2, '0')}
                        </div>

                        <div className="flex flex-col items-start leading-snug overflow-hidden text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}
                              style={{ color: ch.color }}>
                              Part {i + 1}
                            </span>
                            {isActive && (
                              <span className="text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 rounded bg-white text-black uppercase tracking-tighter">Current</span>
                            )}
                          </div>
                          <span className={`text-sm sm:text-[15px] font-bold tracking-tight transition-all truncate w-full ${isActive ? 'text-white' : 'text-zinc-200 group-hover:text-white'}`}>
                            {ch.label.split(' · ')[1] || ch.label}
                          </span>
                        </div>

                        {isActive && (
                          <div className="ml-auto w-2.5 h-2.5 rounded-full animate-pulse flex-none" style={{ background: ch.color, boxShadow: `0 0 12px ${ch.color}` }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex-none p-6 sm:px-12 sm:py-8 bg-black/20 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                   <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">
                      ការរុករកវគ្គសិក្សា
                   </div>
                   <div className="hidden lg:flex items-center gap-2 text-zinc-600 text-[10px] font-bold">
                      <span className="w-1 h-1 rounded-full bg-zinc-700" />
                      ជ្រើសរើសមេរៀនដើម្បីទៅកាន់ស្លាយទាំងនោះដោយផ្ទាល់
                   </div>
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono text-zinc-500 bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                   FULLSTACK ACADEMY • មូលដ្ឋានគ្រឹះ PHP
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="relative z-10 flex-1 flex flex-col lg:flex-row overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={`left-${current}`} custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="flex-none lg:w-[45%] flex flex-col p-6 lg:p-10 xl:p-14 lg:border-r border-white/6 overflow-y-auto gap-6">

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-none border border-white/10"
                style={{ background: `${slide.accent}18` }}>
                <Icon className="w-6 h-6" style={{ color: slide.accent }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] px-2 py-0.5 rounded-full border"
                    style={{ color: slide.tagColor, borderColor: `${slide.tagColor}40`, background: `${slide.tagColor}12` }}>
                    {slide.tag}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-700">{slide.id}</span>
                </div>
                <h1 className="text-3xl xl:text-4xl font-black leading-tight text-white tracking-tighter">{slide.title}</h1>
                <p className="text-sm text-white/40 font-bold uppercase tracking-widest mt-1">{slide.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {slide.content.map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="rounded-xl border p-4 flex items-center gap-4"
                  style={{ borderColor: `${slide.accent}20`, background: `${slide.accent}05` }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-none" style={{ background: slide.accent }} />
                  <p className="text-sm text-zinc-300 leading-relaxed font-medium">{text}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border p-4 flex gap-3" style={{ background: `${slide.accent}08`, borderColor: `${slide.accent}25` }}>
                <Play className="w-4 h-4 flex-none mt-0.5" style={{ color: slide.accent }} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1.5" style={{ color: slide.accent }}>លំហាត់អនុវត្ត</p>
                  <p className="text-sm text-white font-semibold leading-relaxed">{slide.lab}</p>
                </div>
              </div>
              <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4 flex gap-3">
                <Check className="w-4 h-4 flex-none mt-0.5 text-emerald-400" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 text-emerald-400">លទ្ធផលរំពឹងទុក</p>
                  <p className="text-sm text-white font-semibold leading-relaxed">{slide.result}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 mt-auto">
              <button onClick={prev} className="p-3 rounded-xl bg-white/5 border border-white/8 hover:text-white transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next} className="flex-1 py-3 px-5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
                style={{ background: slide.accent, color: '#000' }}>
                {current === displaySlides.length - 1 ? 'ចាប់ផ្តើមវគ្គនេះឡើងវិញ' : 'ស្លាយបន្ទាប់'}
                <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => setShowNotes(!showNotes)}
                className={`p-3 rounded-xl border transition-all ${
                  showNotes ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-white/5 border-white/8 text-zinc-500 hover:text-white'
                }`}>
                <StickyNote className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex-none lg:w-[55%] flex flex-col p-4 lg:p-8 xl:p-10 gap-4 overflow-hidden">
          <div className="flex items-center gap-2 flex-none">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/8 bg-white/5"
              style={{ color: slide.accent }}>
              <Terminal className="w-3.5 h-3.5" /> កន្លែងសាកល្បងកូដ
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 font-mono text-[10px] text-zinc-500">
              {slide.filename || 'sandbox.php'}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={`code-${current}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="flex-1 overflow-hidden">
              <CodePanel code={slide.code} terminal={slide.terminal} terminalOutput={slide.terminalOutput}
                accent={slide.accent} filename={slide.filename || 'sandbox.php'} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {showNotes && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28 }}
            className="fixed inset-y-0 right-0 w-80 bg-[#12151e] border-l border-white/8 z-[100] p-6 flex flex-col pt-24 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-amber-400">កំណត់ចំណាំមេរៀន</h3>
              <button onClick={() => setShowNotes(false)} className="text-zinc-600 hover:text-white"><List className="w-5 h-5" /></button>
            </div>
            <textarea autoFocus value={notes[slide.id] || ''} onChange={e => saveNote(e.target.value)}
              placeholder="កត់ត្រានូវអ្វីដែលអ្នកបានរៀន..."
              className="flex-1 w-full bg-black/40 rounded-xl p-4 text-sm text-zinc-300 resize-none outline-none border border-white/5 focus:border-amber-500/30 font-mono" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
