"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft, ChevronRight, Code2, Copy, Check, RotateCcw,
  Terminal, Rocket, Database, Globe, Lock, Shield, Zap, Layers,
  Server, Package, Workflow, FileCode, ArrowRight, BookOpen,
  GitBranch, Star, Trophy, ShoppingCart, Key, Fingerprint,
  List, RefreshCw, Send, Search, Activity, StickyNote, Play,
  Box, HardDrive, Layout, Edit3, Sparkles, Clock, Palette,
  Menu, X, ChevronDown, ArrowLeft, CheckCircle2
} from 'lucide-react';

/* ─── TYPES ──────────────────────────────────────────────────────── */
interface Slide {
  id: string;
  chapter: string;
  section?: string;
  title: string;
  subtitle: string;
  accent: string;
  bg: string;
  concepts: { label: string; desc: string }[];
  variables?: { label: string; desc: string }[];
  tip: string;
  lab: string;
  result: string;
  code: string;
  filename: string;
  terminal?: string;
  terminalOutput?: string;
  icon: React.ElementType;
}

type DisplayPage = Slide & { subType: 'concept' | 'variables' | 'lab' };

/* ─── CHAPTERS ───────────────────────────────────────────────────── */
const CHAPTERS = [
  { id: 'intro',         label: '01 · Introduction to Laravel',       color: '#f43f5e' },
  { id: 'setup',         label: '02 · Setting Up Laravel',            color: '#e11d48' },
  { id: 'mvc',           label: '03 · Understanding the MVC Pattern',  color: '#f97316' },
  { id: 'routing',       label: '04 · Routes and Controllers',         color: '#eab308' },
  { id: 'resources',     label: '05 · Resources and Controllers',      color: '#22c55e' },
  { id: 'middleware',    label: '06 · Middleware in Laravel',          color: '#06b6d4' },
  { id: 'security',      label: '07 · Security and Protection',        color: '#a855f7' },
  { id: 'restapi',       label: '08 · Understanding REST APIs',        color: '#ec4899' },
  { id: 'database',      label: '09 · Database Overview',              color: '#3b82f6' },
  { id: 'migrations',    label: '10 · Laravel Migrations',             color: '#10b981' },
  { id: 'rawsql',        label: '11 · Working with Raw SQL Queries',   color: '#fb923c' },
  { id: 'eloquent',      label: '12 · Database with Eloquent ORM',     color: '#8b5cf6' },
  { id: 'tinker',        label: '13 · Using Laravel Tinker',           color: '#f59e0b' },
  { id: 'relationships', label: '14 · Eloquent Relationships',         color: '#ef4444' },
  { id: 'onetone',       label: '15 · Eloquent One-to-One',            color: '#14b8a6' },
  { id: 'onetomany',     label: '16 · Eloquent One-to-Many',           color: '#6366f1' },
  { id: 'manytomany',    label: '17 · Eloquent Many-to-Many',          color: '#f43f5e' },
  { id: 'fileupload',    label: '18 · Uploading Files in Laravel',     color: '#84cc16' },
  { id: 'crud',          label: '19 · Building CRUD Operations',       color: '#f97316' },
  { id: 'postman',       label: '20 · API Requests with Postman',      color: '#06b6d4' },
  { id: 'auth',          label: '21 · Authentication: Passport or JWT',color: '#a855f7' },
];

/* ─── SLIDES DATA ────────────────────────────────────────────────── */
const slides: Slide[] = [

  /* ══════════════════════════════════════════════════════
     CHAPTER 1: INTRODUCTION TO LARAVEL
  ══════════════════════════════════════════════════════ */
  {
    id: 'L00-S1', chapter: 'intro',
    section: 'Overview (1/2)',
    title: 'What is Laravel?', subtitle: 'PHP Framework សម្រាប់ Web Artisans',
    accent: '#f43f5e',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(244,63,94,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Modern PHP Framework', desc: 'Laravel គឺជា PHP framework ដែលផ្ដល់ syntax ស្អាត ងាយអាន ─ developer អាចសរសេរ backend web app បានលឿន និងមានលំដាប់ ។' },
      { label: 'Battery-Included', desc: 'Authentication, Routing, Sessions, Caching, Queues ─ features ទាំងនេះ built-in រួចរាល់ ─ មិនចាំបាច់ install ពី zero ។' },
      { label: 'Server-side Rendering', desc: 'PHP រត់នៅ server ─ Laravel generate HTML ─ browser ទទួលបាន complete HTML page ─ user ឃើញ content ភ្លាម ។' },
      { label: 'Market Leader', desc: 'Laravel គឺ PHP framework ពេញនិយមបំផុតលើពិភពលោក ─ ប្រើដោយ startups ធំៗ រហូតដល់ enterprise companies ។' },
    ],
    variables: [
      { label: 'Framework', desc: 'ឧបករណ៍ + library ដែលបានរៀបចំស្រាប់ ─ developer ប្រើ structure របស់វា ដើម្បី build web app បានលឿន ─ ជំនួស code ពី scratch ។' },
      { label: 'Artisan', desc: 'ពាក្យ Laravel ប្រើ ─ មានន័យថា developer ដែល "ប្រឹងធ្វើការងារ" ─ ក្នុង Laravel, Artisan ក៏ជា CLI tool ផងដែរ ។' },
    ],
    tip: 'Laravel ជួយ developer ផ្ដោតលើ business logic ─ មិនចំណាយពេលសរសេរ boilerplate code ─ speed + quality ！',
    lab: 'ស្វែងយល់ពី Laravel philosophy ─ ហេតុអ្វី developer រាប់លាន​នាក់​ជ្រើស​វា​សម្រាប់​ full-stack web apps ។',
    result: 'យល់ច្បាស់ពី purpose របស់ Laravel និងការប្រើប្រាស់ framework ជាទូទៅ ។',
    filename: 'routes/web.php',
    code: `<?php

use Illuminate\\Support\\Facades\\Route;

// Route ធម្មតាក្នុង Laravel
// ស្អាត · ងាយអាន · មានថាមពល

Route::get('/', function () {
    return view('welcome');
});

// Route ជាមួយ Controller
Route::get('/posts', [PostController::class, 'index'])
     ->name('posts.index');

// Route ដែលត្រូវការ login
Route::middleware('auth')->group(function () {
    Route::resource('posts', PostController::class)
         ->except(['index', 'show']);
});`,
    terminal: 'php artisan --version',
    terminalOutput: 'Laravel Framework 11.x.x',
    icon: Globe,
  },

  {
    id: 'L00-S2', chapter: 'intro',
    section: 'Key Features (1/2)',
    title: 'Why Choose Laravel?', subtitle: 'ឧបករណ៍ដ៏ប្រសើរ​សម្រាប់ Web Developer',
    accent: '#f43f5e',
    bg: 'radial-gradient(ellipse at 80% 30%, rgba(244,63,94,0.1) 0%, transparent 50%)',
    concepts: [
      { label: 'Eloquent ORM', desc: 'ការ​ interact ជាមួយ database បែប Object ─ $post->title ជំនួស SQL query ─ code ស្អាត ─ safe ─ ងាយ maintain ។' },
      { label: 'Blade Templating Engine', desc: 'HTML template ដែល mix ជាមួយ PHP logic ─ @if @foreach {{ $var }} ─ browser ទទួលបាន pure HTML ─ user ឃើញ webpage ។' },
      { label: 'Built-in Security', desc: 'CSRF protection ─ XSS prevention ─ SQL injection prevention ─ password hashing ─ ការពារ​ web app ដោយ default ។' },
      { label: 'Complete Ecosystem', desc: 'Laravel Forge (server) ─ Vapor (serverless) ─ Nova (admin panel) ─ Pulse (monitoring) ─ toolset គ្រប់​ phase ។' },
    ],
    variables: [
      { label: 'ORM', desc: 'Object-Relational Mapping ─ technique ដែល map database table ទៅ PHP class ─ Post class = posts table ─ $post object = row ។' },
      { label: 'Blade', desc: 'Templating engine ផ្ដល់​ជាមួយ Laravel ─ compile PHP code ទៅ pure HTML ─ @directive syntax ─ zero overhead ។' },
    ],
    tip: 'Laravel ecosystem គឺ​ជា​ strong point ដ៏ធំបំផុត ─ features ដែលអ្នកត្រូវការ ─ official package មានស្រាប់ ！',
    lab: 'Review high-level features ─ ហេតុអ្វី Laravel ជា "battery-included" framework ─ prototype លឿន ។',
    result: 'ដឹងពី core advantages ─ ហេតុអ្វី Laravel ប្រសើរជាង raw PHP ។',
    filename: 'resources/views/posts/index.blade.php',
    code: `{{-- Blade: mix HTML + PHP logic ─ ស្អាត ─ safe --}}
@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Blog Posts</h1>

    @auth
        {{-- show only when logged in --}}
        <a href="{{ route('posts.create') }}">New Post</a>
    @endauth

    @forelse($posts as $post)
        <article>
            <h2>{{ $post->title }}</h2>
            <p>By {{ $post->author->name }}</p>
        </article>
    @empty
        <p>No posts yet. Be the first!</p>
    @endforelse

    {{ $posts->links() }} {{-- Pagination --}}
</div>
@endsection`,
    icon: Zap,
  },

  {
    id: 'L00-S3', chapter: 'intro',
    section: 'Ecosystem (1/2)',
    title: 'The Laravel Ecosystem', subtitle: 'Toolbox ពេញ​លេញ​សម្រាប់ Web Apps',
    accent: '#f43f5e',
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(244,63,94,0.1) 0%, transparent 60%)',
    concepts: [
      { label: 'Local Development', desc: 'Laravel Herd (macOS/Windows native) ─ ឬ Laravel Sail (Docker) ─ setup environment រហ័ស ─ PHP + MySQL + Redis ។' },
      { label: 'Frontend Options', desc: 'Blade + Tailwind CSS (simple) ─ Livewire (PHP-powered SPA) ─ Inertia.js + React/Vue (modern SPA) ─ ជ្រើសសមស្រប ។' },
      { label: 'Testing', desc: 'Pest PHP + PHPUnit ─ Feature tests, Unit tests ─ ធ្វើ test ងាយ​ ─ write ង​ ─ confidence deploy ។' },
      { label: 'Deployment Pipeline', desc: 'Local (Herd/Sail) → Staging → Production via Forge ─ CI/CD with GitHub Actions ─ professional workflow ។' },
    ],
    variables: [
      { label: 'Livewire', desc: 'Full-stack framework ─ build dynamic UI ដោយ PHP ─ មិនចាំបាច់ write JavaScript ─ real-time updates via AJAX ។' },
      { label: 'Inertia.js', desc: 'Bridge ─ ភ្ជាប់ Laravel backend ជាមួយ React/Vue frontend ─ SPA experience ─ no separate API needed ។' },
    ],
    tip: 'ចាប់ផ្ដើម simple: Blade + SQLite ─ grow ទៅ React + MySQL ─ Laravel scale ជាមួយ app ！',
    lab: 'Identify tools ─ ប្រើ​ deploy ─ ប្រើ scale ─ Laravel web app ─ professional pipeline ។',
    result: 'ដឹងពី Laravel ecosystem ─ tool នីមួយៗ solve problem អ្វី ─ ជ្រើស stack ត្រឹម​ ។',
    filename: 'ecosystem-overview.md',
    code: `# Laravel Web App: Complete Stack

## Local Development
├── Laravel Herd (macOS/Windows) — Native, Fast
└── Laravel Sail (Docker) — Consistent environment

## Frontend
├── Blade + Tailwind CSS — Simple, Server-rendered
├── Livewire — PHP-powered reactive UI
└── Inertia.js + React/Vue — Full SPA experience

## Database
├── MySQL — Production standard
├── PostgreSQL — Advanced features
└── SQLite — Development & Testing

## Deployment & Monitoring
├── Laravel Forge — Server management
├── Laravel Vapor — Serverless on AWS
└── Laravel Pulse — Performance dashboard`,
    icon: Layers,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 2: SETTING UP LARAVEL
  ══════════════════════════════════════════════════════ */
  {
    id: 'L01-S1', chapter: 'setup',
    section: 'Installation',
    title: 'Setting Up Laravel', subtitle: 'ការដំឡើង Web Application ដំបូង',
    accent: '#e11d48',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(225,29,72,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Composer', desc: 'PHP package manager ─ ដូច npm ក្នុង Node.js ─ ប្រើ install Laravel និង third-party libraries ─ "composer global require laravel/installer" ។' },
      { label: 'laravel new', desc: 'Command បង្កើត project ថ្មី ─ "laravel new my-blog" ─ ជ្រើស options: testing framework, database, starter kit ។' },
      { label: 'php artisan serve', desc: 'Built-in development server ─ run web app លើ http://127.0.0.1:8000 ─ ប្រើក្នុង development ─ មិនចាំបាច់ Apache/Nginx ។' },
      { label: 'public/ Folder', desc: 'Web root ─ browser ចូល​ page ដំបូងនៅទីនេះ ─ index.php ជា entry point ─ CSS, JS, images ─ accessible ពី browser ។' },
    ],
    variables: [
      { label: 'Composer', desc: 'PHP Dependency Manager ─ manage packages ─ "composer require package/name" ─ store ក្នុង vendor/ folder ─ ប្រើ autoload ។' },
      { label: 'php artisan', desc: 'Laravel CLI tool ─ command ជាង 100 ─ generate files, run migrations, manage cache, ─ backbone ក្នុង development ។' },
    ],
    tip: 'public/ folder ជា web root ─ browser ចូលដំបូងទីនេះ ─ index.php bootstrap ចូល Laravel ទាំងមូល ！',
    lab: 'ដំឡើង Laravel Installer ─ បង្កើត web app "my-blog" ─ open browser http://localhost:8000 ─ ឃើញ welcome page ។',
    result: 'Welcome page Laravel បង្ហាញ ─ web application ដំណើរការ​ correct លើ local machine ！',
    filename: 'terminal',
    code: `# Step 1: Install Laravel Installer globally
composer global require laravel/installer

# Step 2: Create new web application
laravel new my-blog
# Interactive prompt:
# → Starter Kit: None
# → Testing: Pest
# → Database: MySQL

# Step 3: Enter project folder
cd my-blog

# Step 4: Start development server
php artisan serve
# → App running at http://127.0.0.1:8000

# Step 5: Generate secure APP_KEY
php artisan key:generate`,
    terminal: 'php artisan serve',
    terminalOutput: '   INFO  Server running on [http://127.0.0.1:8000].\n   Press Ctrl+C to stop the server.',
    icon: Rocket,
  },

  {
    id: 'L01-S2', chapter: 'setup',
    section: 'Project Structure',
    title: 'Project Structure', subtitle: 'Folder នីមួយៗ ─ ដំណើរការ​ដូចម្ដេច',
    accent: '#e11d48',
    bg: 'radial-gradient(ellipse at 80% 30%, rgba(225,29,72,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'app/Http/Controllers/', desc: 'Web Controllers ─ handle HTTP request ពី browser ─ logic ─ return HTML view ឬ JSON response ─ "brain" នៃ web page ។' },
      { label: 'resources/views/', desc: 'Blade HTML templates ─ ទំព័រ web ដែល user ឃើញ ─ mix PHP logic + HTML ─ files end .*blade.php ។' },
      { label: 'routes/web.php', desc: 'URL → Controller mapping ─ define ថា URL ណា ─ run Controller method ណា ─ "traffic director" ។' },
      { label: 'database/migrations/', desc: 'Database schema history ─ version control ─ ប្ដូរ table structure ─ team share schema via git ។' },
    ],
    variables: [
      { label: 'app/', desc: 'Core application folder ─ Models, Controllers, Middleware ─ business logic ទាំង​ អស់ ─ NOT accessible ពី browser ─ secure ។' },
      { label: 'resources/', desc: 'Frontend assets ─ Blade views, CSS, JavaScript ─ Vite compile ─ output ទៅ public/ ─ browser access ។' },
    ],
    tip: 'storage/app/public/ ─ upload files ទីនេះ ─ run "php artisan storage:link" ─ files accessible ពី browser ！',
    lab: 'ស្វែងរក resources/views/welcome.blade.php ─ កែ title ─ refresh browser ─ ឃើញ change ។',
    result: 'យល់ path flow: Browser Request → routes/web.php → Controller → Blade View → HTML Response ！',
    filename: 'project-structure.md',
    code: `my-blog/
├── app/
│   ├── Http/
│   │   ├── Controllers/   ← Request handlers (logic)
│   │   └── Middleware/    ← Request guards/filters
│   └── Models/            ← Database models (Eloquent)
├── routes/
│   ├── web.php            ← Browser routes (HTML pages)
│   └── api.php            ← API routes (JSON responses)
├── resources/
│   └── views/             ← Blade HTML templates
│       └── posts/
│           ├── index.blade.php
│           ├── show.blade.php
│           └── create.blade.php
├── public/
│   └── index.php          ← Web entry point
├── database/
│   └── migrations/        ← Schema version history
└── .env                   ← Secrets (NEVER commit!)`,
    icon: HardDrive,
  },

  {
    id: 'L01-S3', chapter: 'setup',
    section: 'Artisan CLI',
    title: 'Artisan CLI', subtitle: 'ឧបករណ៍ Generator ─ Developer មិន​អាច​ខ្វះ',
    accent: '#e11d48',
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(225,29,72,0.1) 0%, transparent 60%)',
    concepts: [
      { label: 'make:controller', desc: '"php artisan make:controller PostController" ─ generate Controller class ─ app/Http/Controllers/ ─ ready ដើម្បី code ។' },
      { label: 'make:model -m', desc: '"php artisan make:model Post -m" ─ generate Model + Migration file ─ ពីរ files ក្នុងពេលតែ​ មួយ ─ "-mc" = +Controller ។' },
      { label: 'route:list', desc: '"php artisan route:list" ─ មើល URL ទាំងអស់ ─ method, path, name, Controller ─ debug routes ។' },
      { label: 'migrate + db:seed', desc: '"php artisan migrate" ─ create tables ─ "php artisan db:seed" ─ insert test data ─ fresh start ។' },
    ],
    tip: '"php artisan make:model Post -mcr" ─ Model + Migration + Controller (resource) ─ 3 files ─ 1 command ！',
    lab: 'Run "php artisan route:list" ─ ស្គាល់ default routes ─ បន្ទាប់ run "php artisan make:model Post -mc" ─ verify files ។',
    result: 'Post.php Model, migration file, PostController.php ─ generated ក្នុង seconds ─ ready to code ！',
    filename: 'terminal',
    code: `# Generate full CRUD scaffold at once
php artisan make:model Post -mcr
# Creates 3 files simultaneously:
# → app/Models/Post.php
# → database/migrations/..._create_posts_table.php
# → app/Http/Controllers/PostController.php

# See all registered web + api routes
php artisan route:list

# Generate blank Blade view file
php artisan make:view posts.index
# → resources/views/posts/index.blade.php

# Reset database + re-run + seed test data
php artisan migrate:fresh --seed`,
    terminal: 'php artisan route:list',
    terminalOutput: `  GET|HEAD  / ................................ welcome
  GET|HEAD  posts .......... posts.index  PostController@index
  GET|HEAD  posts/create ... posts.create PostController@create
  POST      posts .......... posts.store  PostController@store
  GET|HEAD  posts/{post} ... posts.show   PostController@show`,
    icon: Terminal,
  },

  {
    id: 'L01-S4', chapter: 'setup',
    section: '.env Configuration',
    title: '.env Configuration', subtitle: 'Environment Variables ─ Secrets of the App',
    accent: '#e11d48',
    bg: 'radial-gradient(ellipse at center, rgba(225,29,72,0.08) 0%, transparent 70%)',
    concepts: [
      { label: '.env File', desc: 'Store secrets: DB password, mail credentials, API keys ─ NEVER commit ទៅ git ─ .gitignore exclude វា ─ .env.example ជំនួស ។' },
      { label: 'APP_KEY', desc: '32-byte secret string ─ encrypt sessions, cookies, CSRF tokens ─ run "php artisan key:generate" ─ unique per app ។' },
      { label: 'APP_DEBUG=true', desc: 'Development mode ─ show detailed error pages ─ SET FALSE ក្នុង production ─ users មិនឃើញ stack trace ！' },
      { label: 'DB_* Variables', desc: 'DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD ─ connect web app ទៅ MySQL database ─ config once ─ use everywhere ។' },
    ],
    variables: [
      { label: 'Environment', desc: 'Context ដែល app run ─ "local" (development), "staging" (testing), "production" (live) ─ .env ប្ដូរ values per environment ។' },
      { label: 'APP_KEY', desc: 'Cryptographic key ─ 256-bit ─ base64 encoded ─ ប្រើ encrypt/decrypt data ─ change = invalidate all sessions ។' },
    ],
    tip: '.env.example ចូល git (no secrets) ─ .env មិនចូល git ─ team copy .env.example → .env ─ fill own values ！',
    lab: 'Set DB_DATABASE="my_blog" DB_USERNAME="root" ─ run "php artisan migrate" ─ verify tables created ។',
    result: 'Web app connected to MySQL ─ default users, sessions, cache tables auto-created ─ ready to develop ！',
    filename: '.env',
    code: `APP_NAME="My Blog"
APP_ENV=local
APP_KEY=base64:Xm8IyHk2...generated...
APP_DEBUG=true
APP_URL=http://localhost

# Database Connection
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=my_blog
DB_USERNAME=root
DB_PASSWORD=secret

# Mail (use Mailpit for local testing)
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025

# Session & Cache
SESSION_DRIVER=database
CACHE_STORE=redis`,
    icon: Key,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 3: MVC PATTERN
  ══════════════════════════════════════════════════════ */
  {
    id: 'L02-S1', chapter: 'mvc',
    section: 'MVC Architecture',
    title: 'MVC Architecture', subtitle: 'Model – View – Controller Pattern',
    accent: '#f97316',
    bg: 'radial-gradient(ellipse at 30% 20%, rgba(249,115,22,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Model (Data Layer)', desc: 'Eloquent class ─ handle database queries, relationships, business rules ─ $post->title ─ Post::where(...)->get() ─ DATA ។' },
      { label: 'View (Presentation Layer)', desc: 'Blade template ─ HTML ដែល user ឃើញ ─ display data ─ no business logic ─ resources/views/ ─ DISPLAY ។' },
      { label: 'Controller (Logic Layer)', desc: 'Receive HTTP request ─ call Model ─ pass data to View ─ return response ─ "middleman" ─ app/Http/Controllers/ ─ LOGIC ។' },
      { label: 'Request Flow', desc: 'Browser → Router → Middleware → Controller → Model → View → HTML Response → Browser ─ cycle ។' },
    ],
    variables: [
      { label: 'MVC', desc: 'Model-View-Controller ─ software design pattern ─ separate concerns ─ code ស្អាត ─ easy maintain ─ team collaborate ─ industry standard ។' },
      { label: 'Separation of Concerns', desc: 'Principle ─ code ដែល handle data ─ code ដែល display ─ code ដែល logic ─ ដាច់ពីគ្នា ─ ងាយ test ─ ងាយ change ។' },
    ],
    tip: 'Fat Models, Skinny Controllers ─ business logic ក្នុង Model ─ Controller គ្រាន់​ coordinate ─ clean code ！',
    lab: 'Trace ទំព័រ /posts: routes/web.php → PostController@index → Post::all() → posts/index.blade.php ។',
    result: 'យល់ MVC flow ─ ដឹងថា code ណាដាក់ Model, Controller, View ─ architecture ច្បាស់ ！',
    filename: 'mvc-request-flow.php',
    code: `// ── 1. BROWSER requests GET /posts ──────────

// ── 2. ROUTER matches URL to Controller ──────
Route::get('/posts', [PostController::class, 'index']);

// ── 3. MIDDLEWARE checks auth, CSRF, rate limit ──

// ── 4. CONTROLLER coordinates the response ───
class PostController extends Controller
{
    public function index()
    {
        // ── 5. MODEL queries database ──────────
        $posts = Post::where('published', true)
                     ->with('author')    // Eager load
                     ->latest()
                     ->paginate(10);

        // ── 6. VIEW renders HTML with data ─────
        return view('posts.index', compact('posts'));
    }
}

// ── 7. BLADE VIEW renders to HTML page ───────
// ── 8. HTML RESPONSE sent back to browser ────`,
    icon: Layers,
  },

  {
    id: 'L02-S2', chapter: 'mvc',
    section: 'MVC in Practice',
    title: 'MVC in Practice', subtitle: 'Code ពិត​ ─ MVC ក្នុង Laravel Web App',
    accent: '#f97316',
    bg: 'radial-gradient(ellipse at 75% 60%, rgba(249,115,22,0.1) 0%, transparent 55%)',
    concepts: [
      { label: 'Blade as View', desc: '@foreach, {{ $var }}, @if, @auth ─ mix PHP logic ក្នុង HTML ─ browser ទទួល pure HTML ─ ស្អាត ─ safe ។' },
      { label: 'Eloquent as Model', desc: 'Post::latest()->paginate(10) ─ return Collection of Post objects ─ no raw SQL ─ ងាយ​ read ─ safe ។' },
      { label: 'Controller Methods', desc: 'index() list page ─ show() detail page ─ create()/store() form ─ edit()/update() modify ─ destroy() delete ។' },
      { label: 'view() Helper', desc: 'return view("posts.index", compact("posts")) ─ map ទៅ resources/views/posts/index.blade.php ─ dot = folder separator ។' },
    ],
    tip: 'view("posts.index") ─ dot notation ─ "posts/index.blade.php" ─ nested folders ─ clean path ！',
    lab: 'Build: Route → PostController::index() ─ return view("posts.index") ─ display $posts list in browser ។',
    result: 'Browser ឃើញ list of posts ─ fetched from database ─ rendered as HTML ─ MVC cycle complete ！',
    filename: 'app/Http/Controllers/PostController.php',
    code: `<?php
namespace App\\Http\\Controllers;

use App\\Models\\Post;

class PostController extends Controller
{
    // GET /posts → List page (index)
    public function index()
    {
        $posts = Post::published()   // Scope: where published=true
                     ->with('author') // Eager load author
                     ->latest()       // Order by newest
                     ->paginate(10);  // 10 per page

        return view('posts.index', compact('posts'));
        // → resources/views/posts/index.blade.php
    }

    // GET /posts/{post} → Detail page (show)
    public function show(Post $post)
    {
        // Route-Model Binding: auto-fetch by ID
        $post->increment('views');
        return view('posts.show', compact('post'));
    }
}`,
    icon: Server,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 4: ROUTES AND CONTROLLERS
  ══════════════════════════════════════════════════════ */
  {
    id: 'L03-S1', chapter: 'routing',
    section: 'Routes',
    title: 'Routes in Laravel', subtitle: 'URL Mapping ─ Request ទៅ Response',
    accent: '#eab308',
    bg: 'radial-gradient(ellipse at 20% 40%, rgba(234,179,8,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'HTTP Verbs', desc: 'Route::get() ─ view pages ─ post() ─ submit forms ─ put()/patch() ─ update data ─ delete() ─ remove data ─ match HTTP method ！' },
      { label: 'Route Parameters', desc: '/posts/{post} ─ dynamic URL segment ─ {post} passed ទៅ Controller as argument ─ /posts/5 → $post = 5 ។' },
      { label: 'Named Routes', desc: '->name("posts.show") ─ generate URL: route("posts.show", $post) ─ ប្ដូរ URL ─ code ផ្សេង​ not break ─ DRY principle ！' },
      { label: 'Route Groups', desc: 'Share prefix/middleware ─ Route::prefix("admin")->middleware("auth") ─ apply ទៅ routes ច្រើន ─ clean code ។' },
    ],
    variables: [
      { label: 'Named Route', desc: 'Route ដែលមានឈ្មោះ ─ reference by name ─ route("posts.show") ─ generate URL ─ URL change ─ code still work ─ flexible ។' },
      { label: 'Route Parameter', desc: 'Dynamic segment ក្នុង URL ─ /posts/{id} ─ {slug} ─ value ─ pass ទៅ Controller ─ type-hint → auto-fetch from DB ។' },
    ],
    tip: 'ប្រើ Named Routes ALWAYS ─ ប្ដូរ /posts ទៅ /articles ─ update routes/web.php ─ code ផ្សេង not break ！',
    lab: 'Add route /blog/{slug} → BlogController@show ─ name "blog.show" ─ test in browser ─ verify slug ។',
    result: '/blog/my-first-post loads BlogController@show ─ $slug = "my-first-post" ─ routing correct ！',
    filename: 'routes/web.php',
    code: `<?php
use App\\Http\\Controllers\\PostController;
use App\\Http\\Controllers\\PageController;

// ─── Static Pages ────────────────────────────
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/about', [PageController::class, 'about'])->name('about');

// ─── Blog Posts (manual routes) ──────────────
Route::get('/posts', [PostController::class, 'index'])
     ->name('posts.index');
Route::get('/posts/{post}', [PostController::class, 'show'])
     ->name('posts.show');
Route::get('/posts/{post}/edit', [PostController::class, 'edit'])
     ->name('posts.edit');
Route::patch('/posts/{post}', [PostController::class, 'update'])
     ->name('posts.update');

// ─── Route Group: Auth required ───────────────
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
         ->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'show'])
         ->name('profile');
});

// ─── Admin Prefix Group ───────────────────────
Route::prefix('admin')->name('admin.')->middleware(['auth','role:admin'])
     ->group(function () {
         Route::get('/users', [AdminUserController::class, 'index'])
              ->name('users');
     });`,
    icon: Globe,
  },

  {
    id: 'L03-S2', chapter: 'routing',
    section: 'Controllers',
    title: 'Controllers', subtitle: 'Web Request Handlers ─ Logic Layer',
    accent: '#eab308',
    bg: 'radial-gradient(ellipse at 75% 35%, rgba(234,179,8,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'Route-Model Binding', desc: 'Type-hint Post $post ─ Laravel auto-fetch from DB by ID ─ 404 if not found ─ ដ​ code ─ safe ─ clean ！' },
      { label: 'Return Types', desc: 'view() ─ HTML pages ─ redirect() ─ after form submit ─ back() ─ previous page ─ response()->json() ─ API ។' },
      { label: 'Request Validation', desc: '$request->validate([rules]) ─ validate before process ─ auto redirect back with errors ─ security ！' },
      { label: 'PRG Pattern', desc: 'Post-Redirect-Get ─ after store/update/destroy ALWAYS redirect ─ prevent duplicate form submission ─ browser refresh safe ！' },
    ],
    variables: [
      { label: 'PRG Pattern', desc: 'Post-Redirect-Get ─ form submit (POST) → process → redirect (GET) → show page ─ browser refresh ─ no duplicate submit ─ UX standard ។' },
      { label: 'Route-Model Binding', desc: 'Laravel auto-inject Model instance ─ Controller method receives $post object ─ not ID ─ no findOrFail() needed ─ magic ！' },
    ],
    tip: 'After POST ─ ALWAYS redirect ─ ប្រសិន​ browser refresh ─ no duplicate form submission ─ PRG pattern ！',
    lab: 'Create PostController ─ index() return view with $posts ─ show(Post $post) return view with $post ។',
    result: 'Controller handle browser requests ─ fetch data ─ pass to Blade template ─ display HTML ！',
    filename: 'app/Http/Controllers/PostController.php',
    code: `<?php
namespace App\\Http\\Controllers;

use App\\Models\\Post;
use Illuminate\\Http\\Request;

class PostController extends Controller
{
    // GET /posts → List all posts
    public function index()
    {
        $posts = Post::with('author')->latest()->paginate(12);
        return view('posts.index', compact('posts'));
    }

    // GET /posts/{post} → Single post page
    public function show(Post $post) // Auto-fetched by ID!
    {
        return view('posts.show', compact('post'));
    }

    // POST /posts → Save + redirect
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body'  => 'required|string|min:10',
        ]);

        auth()->user()->posts()->create($validated);

        // PRG: always redirect after POST
        return redirect()->route('posts.index')
                         ->with('success', 'Post published!');
    }
}`,
    terminal: 'php artisan make:controller PostController --resource',
    terminalOutput: '   INFO  Controller [app/Http/Controllers/PostController.php] created successfully.',
    icon: Server,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 5: RESOURCES AND CONTROLLERS
  ══════════════════════════════════════════════════════ */
  {
    id: 'L04-S1', chapter: 'resources',
    section: 'Resource Routes',
    title: 'Resource Controllers', subtitle: 'RESTful Web Routes ─ 1 Line = 7 Routes',
    accent: '#22c55e',
    bg: 'radial-gradient(ellipse at 15% 50%, rgba(34,197,94,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Route::resource()', desc: '1 line → 7 web routes: index, create, store, show, edit, update, destroy ─ full CRUD web app ─ clean routes/web.php ！' },
      { label: '7 Standard Web Actions', desc: 'index=list page ─ create=new form ─ store=save ─ show=detail ─ edit=edit form ─ update=save changes ─ destroy=delete ។' },
      { label: 'Partial Resource', desc: '->only(["index","show"]) ─ read-only pages ─ ->except(["destroy"]) ─ no delete ─ customise actions per use case ។' },
      { label: 'Nested Resource', desc: 'Route::resource("posts.comments") ─ /posts/1/comments ─ nested URL ─ parent-child relationship ─ ->shallow() ។' },
    ],
    variables: [
      { label: 'Resource Controller', desc: 'Controller ─ follow REST conventions ─ 7 standard methods ─ "php artisan make:controller --resource" ─ boilerplate ។' },
      { label: 'RESTful', desc: 'REST principles apply ─ web routes ─ URL structure ─ /posts (list) /posts/1 (show) /posts/1/edit (edit form) ─ standard ។' },
    ],
    tip: '"php artisan make:controller PostController --resource --model=Post" ─ generates methods with type-hints ！',
    lab: 'Replace 7 individual routes with Route::resource("posts") ─ verify route:list ─ same result ！',
    result: 'php artisan route:list ─ 7 posts.* routes ─ same behavior ─ cleaner code ─ standard structure ！',
    filename: 'routes/web.php',
    code: `// BEFORE: 7 individual routes (messy, repetitive)
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/create', [PostController::class, 'create']);
Route::post('/posts', [PostController::class, 'store']);
Route::get('/posts/{post}', [PostController::class, 'show']);
Route::get('/posts/{post}/edit', [PostController::class, 'edit']);
Route::patch('/posts/{post}', [PostController::class, 'update']);
Route::delete('/posts/{post}', [PostController::class, 'destroy']);

// AFTER: 1 line = same 7 routes (clean!)
Route::resource('posts', PostController::class);

// Read-only pages (blog readers, no create/edit)
Route::resource('tags', TagController::class)
     ->only(['index', 'show']);

// Nested: /posts/{post}/comments/{comment}
Route::resource('posts.comments', CommentController::class)
     ->shallow();`,
    terminal: 'php artisan route:list --path=posts',
    terminalOutput: `  GET|HEAD  posts ................. posts.index   PostController@index
  POST      posts ................. posts.store   PostController@store
  GET|HEAD  posts/create .......... posts.create  PostController@create
  GET|HEAD  posts/{post} .......... posts.show    PostController@show
  PUT|PATCH posts/{post} .......... posts.update  PostController@update
  DELETE    posts/{post} .......... posts.destroy PostController@destroy
  GET|HEAD  posts/{post}/edit ..... posts.edit    PostController@edit`,
    icon: Workflow,
  },

  {
    id: 'L04-S2', chapter: 'resources',
    section: 'Blade Views',
    title: 'Blade Views for Resources', subtitle: 'Standard Web View Structure ─ DRY Templates',
    accent: '#22c55e',
    bg: 'radial-gradient(ellipse at 80% 40%, rgba(34,197,94,0.1) 0%, transparent 55%)',
    concepts: [
      { label: 'Naming Convention', desc: 'posts/index.blade.php (list) ─ posts/show.blade.php (detail) ─ posts/create.blade.php (form) ─ follow Laravel standard ។' },
      { label: '@extends Layout', desc: 'Child views extend master layout ─ @extends("layouts.app") ─ DRY ─ nav/footer ─ write once ─ used everywhere ！' },
      { label: '@section Content', desc: '@section("content") fill @yield("content") in layout ─ page-specific HTML ─ template inheritance ─ clean ។' },
      { label: 'route() Helper in Blade', desc: 'route("posts.edit", $post) → /posts/5/edit ─ named route URL ─ ប្ដូរ URL ─ Blade update automatic ！' },
    ],
    tip: 'Create layouts/app.blade.php first ─ all views extend it ─ nav change once = update everywhere ！',
    lab: 'Create views/posts/index.blade.php ─ extend layout ─ loop $posts ─ show title + link ─ pagination ។',
    result: '/posts renders HTML list ─ each post linked to show page ─ proper web app UX ─ DRY code ！',
    filename: 'resources/views/posts/index.blade.php',
    code: `@extends('layouts.app')

@section('title', 'All Blog Posts')

@section('content')
<div class="container mx-auto py-8">

    {{-- Flash success message --}}
    @if(session('success'))
        <div class="alert alert-success mb-4">
            {{ session('success') }}
        </div>
    @endif

    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Blog Posts</h1>
        @auth
            {{-- Only show to logged-in users --}}
            <a href="{{ route('posts.create') }}"
               class="btn btn-primary">+ New Post</a>
        @endauth
    </div>

    @forelse($posts as $post)
        <article class="card mb-4 p-6">
            <h2 class="text-xl font-semibold">
                <a href="{{ route('posts.show', $post) }}">
                    {{ $post->title }}
                </a>
            </h2>
            <p class="text-gray-500">
                By {{ $post->author->name }} ·
                {{ $post->created_at->diffForHumans() }}
            </p>
        </article>
    @empty
        <p>No posts yet. Be the first to publish!</p>
    @endforelse

    {{-- Auto-generated pagination links --}}
    {{ $posts->links() }}
</div>
@endsection`,
    icon: Layout,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 6: MIDDLEWARE
  ══════════════════════════════════════════════════════ */
  {
    id: 'L05-S1', chapter: 'middleware',
    section: 'Built-in Middleware',
    title: 'Middleware in Laravel', subtitle: 'Request Guards ─ Filter ─ Security Layer',
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at 25% 55%, rgba(6,182,212,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'What is Middleware?', desc: 'Code ─ run BETWEEN browser request → Controller ─ inspect ─ modify ─ reject request ─ "security checkpoint" ។' },
      { label: 'auth Middleware', desc: 'Check ─ user logged in ─ redirect ទៅ /login ─ ប្រសិន​ not authenticated ─ protect dashboard, profile, admin pages ─ automatic ！' },
      { label: 'verified Middleware', desc: 'Require email verification ─ block access ─ until user confirms email ─ combine: middleware(["auth","verified"]) ។' },
      { label: 'throttle Middleware', desc: 'Rate limiting ─ throttle:60,1 = 60 requests/minute ─ protect API endpoints ─ prevent abuse/DDoS ─ auto 429 response ។' },
    ],
    variables: [
      { label: 'Middleware', desc: 'Layer ─ ចន្លោះ​ HTTP request និង Controller ─ execute code ─ before/after ─ filter ─ transform ─ reject request ─ pipeline ។' },
      { label: 'Pipeline', desc: 'Request pass through ─ multiple Middleware layers ─ one by one ─ like security checkpoints at airport ─ each check different thing ។' },
    ],
    tip: 'Middleware run EVERY request ─ keep fast ─ no heavy DB queries ─ global middleware affect all pages ！',
    lab: 'Add ->middleware("auth") to /dashboard ─ visit logged out ─ observe auto-redirect to /login ។',
    result: 'Unauthenticated users cannot access dashboard ─ redirected to login automatically ─ secure ！',
    filename: 'routes/web.php',
    code: `// Protect single web page
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware('auth')
    ->name('dashboard');

// Protect group of web pages together
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::get('/settings', [SettingsController::class, 'edit']);

    // Create/edit/delete need auth (index/show are public)
    Route::resource('posts', PostController::class)
         ->except(['index', 'show']);
});

// Admin-only pages with role check
Route::middleware(['auth', 'role:admin'])
     ->prefix('admin')
     ->name('admin.')
     ->group(function () {
         Route::get('/users', [AdminUserController::class, 'index'])
              ->name('users');
         Route::get('/analytics', [AnalyticsController::class, 'index'])
              ->name('analytics');
     });`,
    icon: Lock,
  },

  {
    id: 'L05-S2', chapter: 'middleware',
    section: 'Custom Middleware',
    title: 'Custom Middleware', subtitle: 'Build Your Own Request Guards',
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at 80% 30%, rgba(6,182,212,0.1) 0%, transparent 55%)',
    concepts: [
      { label: 'handle() Method', desc: 'Core logic: check condition → abort/redirect ─ ឬ call $next($request) ─ continue to Controller ─ "doorkeeper" ។' },
      { label: 'Before Middleware', desc: 'Code before $next($request) ─ run BEFORE Controller ─ e.g. check permission ─ set locale ─ log request ។' },
      { label: 'After Middleware', desc: 'Code after $next($request) ─ run AFTER response generated ─ e.g. add response headers ─ log response time ។' },
      { label: 'Middleware Parameters', desc: '->middleware("role:admin,editor") ─ pass arguments via ":" separator ─ $next($request, $role) ─ flexible ！' },
    ],
    tip: 'abort(403) ─ API/AJAX ─ redirect() ─ browser web pages ─ ជ្រើស correct response type per context ！',
    lab: 'Build CheckSubscription middleware ─ free users + posts > 3 ─ redirect ទៅ /upgrade page ។',
    result: 'Free users hit limit ─ see upgrade page ─ paid users continue ─ subscription gate working ！',
    filename: 'app/Http/Middleware/CheckSubscription.php',
    code: `<?php
namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;

class CheckSubscription
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        // Free plan: maximum 3 posts allowed
        if ($user && $user->plan === 'free') {
            if ($user->posts()->count() >= 3) {
                // Redirect browser users to upgrade page
                return redirect()->route('upgrade')
                    ->with('warning',
                        'ចំនួន post ដល់ limit ─ Upgrade ដើម្បី publish បន្ថែម!');
            }
        }

        // All good: pass request to Controller
        return $next($request);
    }
}

// Apply in routes/web.php:
Route::post('/posts', [PostController::class, 'store'])
     ->middleware(['auth', CheckSubscription::class]);`,
    terminal: 'php artisan make:middleware CheckSubscription',
    terminalOutput: '   INFO  Middleware [app/Http/Middleware/CheckSubscription.php] created successfully.',
    icon: Shield,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 7: SECURITY
  ══════════════════════════════════════════════════════ */
  {
    id: 'L06-S1', chapter: 'security',
    section: 'Web Security',
    title: 'Security in Laravel', subtitle: 'Built-in Web App Protection ─ Default Safe',
    accent: '#a855f7',
    bg: 'radial-gradient(ellipse at 10% 30%, rgba(168,85,247,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'CSRF Protection', desc: '@csrf ─ every form ─ hidden _token ─ Laravel validate ─ POST/PUT/DELETE ─ block forged requests from other websites ！' },
      { label: 'XSS Prevention', desc: '{{ $var }} ─ auto-escape HTML ─ <script> → &lt;script&gt; ─ neutralized ─ use {!! !!} ONLY for trusted HTML ─ careful ！' },
      { label: 'SQL Injection Prevention', desc: 'Eloquent + Query Builder ─ use PDO prepared statements ─ user input NEVER injected into raw SQL ─ safe by default ！' },
      { label: 'Mass Assignment Protection', desc: '$fillable whitelist ─ users cannot inject "role"=>"admin" via form submission ─ protect Model attributes ！' },
    ],
    variables: [
      { label: 'CSRF', desc: 'Cross-Site Request Forgery ─ attack ─ trick user browser ─ submit form ─ your website ─ without knowledge ─ @csrf token prevent ។' },
      { label: 'XSS', desc: 'Cross-Site Scripting ─ hacker inject <script> via input ─ run in victim browser ─ steal cookies/session ─ {{ }} prevent in Blade ។' },
    ],
    tip: 'Security checklist: @csrf forms ─ {{ }} output ─ $fillable models ─ validate before save ─ all 4 ！',
    lab: 'Remove @csrf from form ─ submit ─ see 419 Page Expired ─ add back ─ works ─ CSRF confirmed ！',
    result: 'CSRF protection working ─ forged requests blocked ─ Laravel security confirmed ─ web app safe ！',
    filename: 'resources/views/posts/create.blade.php',
    code: `<form method="POST" action="{{ route('posts.store') }}"
      enctype="multipart/form-data">

    {{-- Required! Laravel validates this token --}}
    @csrf

    {{-- XSS safe: {{ }} auto-escapes HTML --}}
    <label>Title</label>
    <input name="title"
           value="{{ old('title') }}"
           class="@error('title') border-red-500 @enderror">

    @error('title')
        {{-- Validation error message --}}
        <p class="text-red-500 text-sm">{{ $message }}</p>
    @enderror

    <label>Content</label>
    <textarea name="body">{{ old('body') }}</textarea>

    {{-- For EDIT forms: spoof HTTP method --}}
    {{-- @method('PATCH') --}}

    <button type="submit">Publish Post</button>
</form>

{{-- ⚠ DANGER: never use {!! !!} with user input --}}
{{-- {!! $userInput !!} ← XSS vulnerability! --}}`,
    icon: Shield,
  },

  {
    id: 'L06-S2', chapter: 'security',
    section: 'Authorization',
    title: 'Authorization: Gates & Policies', subtitle: 'Who Can Do What ─ Permission System',
    accent: '#a855f7',
    bg: 'radial-gradient(ellipse at 80% 70%, rgba(168,85,247,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'Authentication vs Authorization', desc: 'Authentication: "តើ​អ្នក​ជា​នរណា?" (login) ─ Authorization: "តើ​អ្នក​អាច​ធ្វើ​អ្វី?" (permissions) ─ different concepts ！' },
      { label: 'Policy Classes', desc: 'PostPolicy class ─ methods: view, create, update, delete ─ linked to Post model ─ centralized permission logic ។' },
      { label: '@can in Blade', desc: '@can("update", $post) → show Edit button ─ @cannot("delete", $post) → hide Delete ─ UI based on permissions ！' },
      { label: '$this->authorize()', desc: 'Controller: $this->authorize("update", $post) ─ throw 403 if unauthorized ─ protect beyond UI ─ double security ！' },
    ],
    variables: [
      { label: 'Policy', desc: 'PHP class ─ define permissions ─ per Model ─ PostPolicy: can user X ─ update post Y? ─ centralized ─ reusable ─ testable ។' },
      { label: 'Gate', desc: 'Simple closure permission check ─ Gate::define("admin", fn($user) => $user->role === "admin") ─ use for simple checks ។' },
    ],
    tip: 'Show/hide UI with @can ─ ALSO protect Controller with authorize() ─ UI alone not enough security ！',
    lab: 'Create PostPolicy ─ update/delete ─ only owner ($user->id === $post->user_id) ─ apply view + controller ។',
    result: 'Edit/Delete buttons ─ only visible to post owner ─ direct URL access ─ also blocked 403 ！',
    filename: 'app/Policies/PostPolicy.php',
    code: `<?php
namespace App\\Policies;

use App\\Models\\Post;
use App\\Models\\User;

class PostPolicy
{
    // Can this user edit this post?
    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }

    // Admin can also delete any post
    public function delete(User $user, Post $post): bool
    {
        return $user->id === $post->user_id
               || $user->role === 'admin';
    }
}

{{-- In Blade view: show/hide based on permission --}}
@can('update', $post)
    <a href="{{ route('posts.edit', $post) }}">✏ Edit</a>
@endcan

@can('delete', $post)
    <form method="POST" action="{{ route('posts.destroy', $post) }}">
        @csrf @method('DELETE')
        <button onclick="return confirm('Delete?')">🗑 Delete</button>
    </form>
@endcan`,
    icon: Fingerprint,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 8: REST APIs
  ══════════════════════════════════════════════════════ */
  {
    id: 'L07-S1', chapter: 'restapi',
    section: 'REST Principles',
    title: 'Understanding REST APIs', subtitle: 'JSON APIs ─ Web ─ Mobile ─ Frontend',
    accent: '#ec4899',
    bg: 'radial-gradient(ellipse at 40% 20%, rgba(236,72,153,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'REST Principles', desc: 'Stateless ─ every request self-contained ─ no session ─ Resource-based URLs ─ HTTP methods define action ─ consistent ។' },
      { label: 'HTTP Methods', desc: 'GET=read ─ POST=create ─ PUT/PATCH=update ─ DELETE=remove ─ match verb to action ─ /posts (noun) + GET (verb) ！' },
      { label: 'JSON Response', desc: '{"data": {...}, "message": "ok"} ─ standard structure ─ status codes 200/201/404/422 ─ consistent API design ។' },
      { label: 'API vs Web Routes', desc: 'web.php → HTML pages + sessions ─ api.php → JSON + token auth ─ different guards ─ different middleware ─ separate ។' },
    ],
    variables: [
      { label: 'REST', desc: 'Representational State Transfer ─ architectural style ─ stateless ─ resource-based URLs ─ HTTP methods ─ industry standard ─ scalable ។' },
      { label: 'Stateless', desc: 'Server store nothing ─ between requests ─ each request contains all info needed ─ token sent every time ─ scalable ─ simple ។' },
    ],
    tip: 'REST URLs ─ nouns (resources): /api/posts ✓ ─ /api/getPosts ✗ ─ HTTP method defines the action ！',
    lab: 'Design REST API ─ blog: list, get, create, update, delete posts ─ URLs + methods + response codes ។',
    result: 'Clean REST API: GET /api/posts ─ POST /api/posts ─ PATCH /api/posts/{id} ─ DELETE ─ standard ！',
    filename: 'api-design.md',
    code: `# Blog REST API Design
# Base URL: https://myblog.com/api/v1

# ─── Read Operations ──────────────────────────
GET  /posts        → 200 { data: [...], links: {pagination} }
GET  /posts/{id}   → 200 { data: {...post} }
                   → 404 { message: "Post not found" }

# ─── Write Operations (auth required) ─────────
POST   /posts      → 201 { data: {...newPost} }
                   → 422 { errors: { title: ["required"] } }
PATCH  /posts/{id} → 200 { data: {...updatedPost} }
DELETE /posts/{id} → 204 No Content

# ─── Required Headers ─────────────────────────
Content-Type: application/json
Accept: application/json
Authorization: Bearer <sanctum_token>

# ─── POST /posts Body ─────────────────────────
{
    "title": "My New Post",
    "body": "Content here...",
    "category_id": 1
}`,
    icon: Globe,
  },

  {
    id: 'L07-S2', chapter: 'restapi',
    section: 'Building APIs',
    title: 'Building APIs in Laravel', subtitle: 'API Routes ─ Controllers ─ Resources',
    accent: '#ec4899',
    bg: 'radial-gradient(ellipse at 70% 80%, rgba(236,72,153,0.1) 0%, transparent 55%)',
    concepts: [
      { label: 'routes/api.php', desc: 'Auto-prefixed /api ─ stateless (no session middleware) ─ returns JSON ─ separate from web routes ─ token auth ។' },
      { label: 'API Resource Classes', desc: 'Transform Eloquent Model → consistent JSON ─ hide sensitive fields ─ format dates ─ control output structure ！' },
      { label: 'Route::apiResource()', desc: 'Like resource() ─ without create/edit (no form pages needed for API) ─ 5 routes instead of 7 ─ clean ។' },
      { label: 'Accept: application/json', desc: 'Send this header ─ Laravel return JSON errors ─ instead of HTML redirect ─ proper API behavior ！' },
    ],
    tip: 'Always return PostResource ─ not raw $post ─ control exactly what data leave your web app ！',
    lab: 'Create API PostController ─ index() return PostResource::collection ─ test with curl/Postman ។',
    result: 'GET /api/posts → {"data": [...]} JSON ─ consistent ─ safe ─ ready for frontend/mobile ！',
    filename: 'app/Http/Resources/PostResource.php',
    code: `<?php
namespace App\\Http\\Resources;

use Illuminate\\Http\\Resources\\Json\\JsonResource;

class PostResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'         => $this->id,
            'title'      => $this->title,
            'body'       => $this->body,
            'slug'       => $this->slug,
            'author'     => [
                'id'     => $this->user->id,
                'name'   => $this->user->name,
                'avatar' => $this->user->avatar_url,
            ],
            'tags'       => TagResource::collection(
                                $this->whenLoaded('tags')
                            ),
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
            // ⚠ Never expose: password, remember_token!
        ];
    }
}

// ─── In routes/api.php ───────────────────────
Route::apiResource('posts', PostController::class);

// ─── In API Controller ───────────────────────
public function index() {
    return PostResource::collection(
        Post::with('author','tags')->paginate(15)
    );
}`,
    icon: Package,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 9: DATABASE OVERVIEW
  ══════════════════════════════════════════════════════ */
  {
    id: 'L08-S1', chapter: 'database',
    section: 'Database Overview',
    title: 'Database Overview', subtitle: 'Laravel Database ─ 3 Layers ─ ជ្រើស​ Right Tool',
    accent: '#3b82f6',
    bg: 'radial-gradient(ellipse at 20% 40%, rgba(59,130,246,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Supported Databases', desc: 'MySQL (production standard) ─ PostgreSQL (advanced features) ─ SQLite (development/testing simple) ─ SQL Server ។' },
      { label: 'Raw SQL', desc: 'DB::select("SQL") ─ fastest ─ maximum performance ─ complex JOINs ─ reports ─ use when Eloquent too slow ។' },
      { label: 'Query Builder', desc: 'DB::table("posts")->where(...)->get() ─ safe ─ chainable ─ no ORM overhead ─ middle ground ─ fluent ។' },
      { label: 'Eloquent ORM', desc: 'Post::published()->with("author")->paginate(10) ─ objects ─ relationships ─ cleanest ─ recommended for web apps ！' },
    ],
    variables: [
      { label: 'ORM', desc: 'Object-Relational Mapper ─ map database table ─ PHP class ─ row ─ object ─ interact with DB ─ using PHP syntax ─ no raw SQL ។' },
      { label: 'Query Builder', desc: 'Fluent interface ─ build SQL queries ─ using PHP method chains ─ DB::table()->where()->get() ─ safe ─ readable ─ flexible ។' },
    ],
    tip: 'MySQL ─ most web apps ─ SQLite ─ unit tests ─ configure in config/database.php + .env ！',
    lab: 'Run "php artisan db:show" ─ see tables ─ "php artisan db:table users" ─ see columns ─ explore ។',
    result: 'Understand database layers ─ know when Eloquent vs Query Builder vs Raw SQL ─ right tool ！',
    filename: 'app/Http/Controllers/DashboardController.php',
    code: `use Illuminate\\Support\\Facades\\DB;
use App\\Models\\Post;

// ── 1. RAW SQL ─ Complex reports, max performance ──
$topAuthors = DB::select('
    SELECT u.name, COUNT(p.id) AS post_count
    FROM users u
    LEFT JOIN posts p ON p.user_id = u.id
    GROUP BY u.id
    ORDER BY post_count DESC
    LIMIT 5
');

// ── 2. QUERY BUILDER ─ Safe, chainable, no ORM ───
$recentPosts = DB::table('posts')
    ->where('published', true)
    ->whereDate('created_at', '>=', now()->subDays(7))
    ->orderByDesc('created_at')
    ->limit(10)
    ->get();

// ── 3. ELOQUENT ORM ─ Recommended for web apps ───
$posts = Post::published()
             ->with('author', 'tags', 'category')
             ->latest()
             ->paginate(10);`,
    icon: Database,
  },

  {
    id: 'L08-S2', chapter: 'database',
    section: 'Seeders & Factories',
    title: 'Seeders & Factories', subtitle: 'Test Data ─ Development Database',
    accent: '#3b82f6',
    bg: 'radial-gradient(ellipse at 85% 60%, rgba(59,130,246,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'Factories', desc: 'Define fake data structure ─ PostFactory ─ generate realistic posts ─ Faker library ─ name, email, text ─ randomized ។' },
      { label: 'Seeders', desc: 'DatabaseSeeder.php ─ orchestrate factories ─ "php artisan db:seed" ─ populate database ─ test data ─ development ។' },
      { label: 'Relationships in Factories', desc: 'User::factory()->hasPosts(10)->create() ─ user + 10 posts ─ one command ─ proper FK relationships ！' },
      { label: 'migrate:fresh --seed', desc: 'Drop all + re-migrate + seed ─ clean slate ─ development reset ─ "php artisan migrate:fresh --seed" ！' },
    ],
    tip: 'Seed realistic data ─ test pagination with 100+ records ─ UI looks different with real content ！',
    lab: 'Create UserFactory + PostFactory ─ seed 10 users each 5 posts ─ verify in browser ─ verify tinker ។',
    result: '50 realistic posts in database ─ pagination works ─ web app looks like real production ！',
    filename: 'database/seeders/DatabaseSeeder.php',
    code: `<?php
namespace Database\\Seeders;

use App\\Models\\User;
use App\\Models\\Post;
use App\\Models\\Tag;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create fixed admin user for testing
        User::factory()->create([
            'name'  => 'Admin User',
            'email' => 'admin@myblog.com',
            'role'  => 'admin',
        ]);

        // Create 10 regular users, each with 5 posts
        User::factory(10)
            ->hasPosts(5)  // Relationship factory
            ->create();

        // Create 15 tags for categorization
        Tag::factory(15)->create();

        // Create some featured posts
        Post::factory(5)->create(['is_featured' => true]);
    }
}`,
    terminal: 'php artisan migrate:fresh --seed',
    terminalOutput: '   INFO  Dropping all tables.\n   INFO  Running migrations.\n   INFO  Seeding database.\n   DONE  DatabaseSeeder ran successfully.',
    icon: Database,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 10: MIGRATIONS
  ══════════════════════════════════════════════════════ */
  {
    id: 'L09-S1', chapter: 'migrations',
    section: 'Creating Migrations',
    title: 'Laravel Migrations', subtitle: 'Version Control ─ Database Schema',
    accent: '#10b981',
    bg: 'radial-gradient(ellipse at 30% 30%, rgba(16,185,129,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'What are Migrations?', desc: 'PHP files ─ describe database changes ─ team share schema via git ─ no more manual SQL files ─ version history ！' },
      { label: 'Schema Builder API', desc: '$table->string() ─ ->text() ─ ->boolean() ─ ->foreignId() ─ fluent ─ readable ─ auto generate correct SQL ─ clean ។' },
      { label: 'up() and down()', desc: 'up() ─ apply change (create table) ─ down() ─ reverse it (drop table) ─ enable rollback ─ safe development ！' },
      { label: 'Foreign Keys', desc: '$table->foreignId("user_id")->constrained()->cascadeOnDelete() ─ DB-level integrity ─ auto delete child records ！' },
    ],
    variables: [
      { label: 'Migration', desc: 'PHP class ─ describe ONE database change ─ "create posts table" ─ "add views column" ─ tracked ─ versioned ─ reversible ។' },
      { label: 'Schema Builder', desc: 'Fluent PHP API ─ define table structure ─ $table->string("title") ─ compile to correct SQL ─ any database ─ readable ！' },
    ],
    tip: 'NEVER edit old migrations ─ create new ones ─ old = history ─ treat like git commits ─ team safe ！',
    lab: 'Create migration "posts" table ─ id, title, body, slug (unique), user_id (FK), timestamps ─ migrate ។',
    result: 'Posts table created ─ proper columns + foreign key ─ schema version controlled ─ team can reproduce ！',
    filename: 'database/migrations/create_posts_table.php',
    code: `<?php
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();              // BIGINT unsigned auto-increment PK
            $table->string('title');   // VARCHAR(255) ─ required
            $table->string('slug')->unique(); // SEO URL ─ must be unique
            $table->longText('body'); // Full article content
            $table->string('cover_image')->nullable(); // Optional cover
            $table->boolean('published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->unsignedBigInteger('views')->default(0);

            // Foreign key → users table
            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete(); // delete posts when user deleted

            $table->timestamps(); // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};`,
    terminal: 'php artisan migrate',
    terminalOutput: '   INFO  Running migrations.\n   2024_01_01_000002_create_posts_table .......... 12ms DONE',
    icon: Database,
  },

  {
    id: 'L09-S2', chapter: 'migrations',
    section: 'Modifying Tables',
    title: 'Modifying Existing Tables', subtitle: 'Add Column ─ Rollback ─ Migration Status',
    accent: '#10b981',
    bg: 'radial-gradient(ellipse at 75% 70%, rgba(16,185,129,0.1) 0%, transparent 55%)',
    concepts: [
      { label: 'Add Column Migration', desc: '"add_X_to_Y_table" naming ─ Schema::table() (not create) ─ $table->string("col")->after("x") ─ existing data safe ！' },
      { label: 'migrate:rollback', desc: 'Undo last migration batch ─ calls down() ─ safe in development ─ NEVER use in production ─ loses data ！' },
      { label: 'migrate:fresh', desc: 'Drop ALL tables + re-migrate + seed ─ development clean reset ─ DESTROYS all data ─ development ONLY ！' },
      { label: 'migrate:status', desc: '"php artisan migrate:status" ─ see which migrations ran ─ which pending ─ debug schema issues ─ useful ！' },
    ],
    tip: 'Production: php artisan migrate (safe) ─ Development: migrate:fresh --seed (full reset) ─ NEVER mix ！',
    lab: 'Create migration "add_meta_to_posts_table" ─ add meta_description column ─ run migrate ─ verify ។',
    result: 'Posts table has new column ─ existing data preserved ─ schema updated safely ─ no data loss ！',
    filename: 'database/migrations/add_meta_to_posts_table.php',
    code: `<?php
// php artisan make:migration add_meta_to_posts_table

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            // Add new column after existing one
            $table->string('meta_description', 160)
                  ->nullable()
                  ->after('body');

            $table->string('meta_keywords')
                  ->nullable()
                  ->after('meta_description');
        });
    }

    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn(['meta_description', 'meta_keywords']);
        });
    }
};`,
    terminal: 'php artisan migrate:status',
    terminalOutput: `  Ran?   Migration
  ✓      2024_01_01_000000_create_users_table
  ✓      2024_01_01_000001_create_sessions_table
  ✓      2024_01_02_000001_create_posts_table
  Pending  2024_01_03_000001_add_meta_to_posts_table`,
    icon: GitBranch,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 11: RAW SQL
  ══════════════════════════════════════════════════════ */
  {
    id: 'L10-S1', chapter: 'rawsql',
    section: 'Raw SQL Queries',
    title: 'Raw SQL Queries', subtitle: 'Direct Database ─ Reports ─ Complex Queries',
    accent: '#fb923c',
    bg: 'radial-gradient(ellipse at 20% 60%, rgba(251,146,60,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'DB::select()', desc: 'Execute raw SELECT ─ return array of stdClass objects ─ always use ? bindings ─ NEVER concatenate user input ！' },
      { label: 'DB::insert() / update()', desc: 'Execute INSERT/UPDATE ─ return boolean ─ use for bulk operations ─ custom SQL ─ Eloquent too slow ─ reports ។' },
      { label: 'DB::statement()', desc: 'DDL statements ─ stored procedures ─ CREATE INDEX ─ ALTER TABLE ─ arbitrary SQL ─ flexible ─ powerful ។' },
      { label: 'When to Use Raw SQL', desc: 'Complex JOINs ─ GROUP BY reports ─ window functions ─ analytics dashboard ─ when Eloquent generates slow queries ។' },
    ],
    variables: [
      { label: 'Prepared Statement', desc: 'SQL query ─ placeholders (?) ─ database compile ─ then bind values ─ injection-safe ─ DB::select("SQL", [values]) ─ use always ！' },
      { label: 'SQL Injection', desc: 'Attack ─ hacker inject SQL ─ via user input ─ "OR 1=1" ─ dump database ─ prevent: prepared statements ─ bindings ─ ALWAYS ！' },
    ],
    tip: 'ALWAYS use ? or :named bindings ─ NEVER concatenate user input ─ SQL injection kills web apps ！',
    lab: 'Write raw SQL ─ COUNT posts per user ─ JOIN users + posts ─ ORDER BY count DESC ─ LIMIT 5 ។',
    result: 'Dashboard "Top 5 Authors" ─ raw SQL ─ faster than Eloquent ─ complex aggregate report ！',
    filename: 'app/Http/Controllers/ReportController.php',
    code: `use Illuminate\\Support\\Facades\\DB;

// ─── Analytics Dashboard ─ Top Authors ────────
$topAuthors = DB::select('
    SELECT
        u.id,
        u.name,
        u.email,
        COUNT(p.id)        AS post_count,
        SUM(p.views)       AS total_views,
        MAX(p.published_at) AS last_published
    FROM users u
    LEFT JOIN posts p ON p.user_id = u.id
                      AND p.published = 1
    WHERE u.created_at >= :since
    GROUP BY u.id, u.name, u.email
    HAVING post_count > 0
    ORDER BY total_views DESC
    LIMIT 10
', ['since' => now()->subYear()->toDateString()]);

// ─── SAFE: bindings protect against SQL injection ─
// ─── UNSAFE: never do this! ────────────────────
// $name = $_GET['search']; // ← user input
// DB::select("... WHERE name = '$name'"); // ← INJECTION!`,
    icon: Database,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 12: ELOQUENT ORM
  ══════════════════════════════════════════════════════ */
  {
    id: 'L11-S1', chapter: 'eloquent',
    section: 'Eloquent ORM',
    title: 'Eloquent ORM', subtitle: 'Object-Relational Mapping ─ Database as Objects',
    accent: '#8b5cf6',
    bg: 'radial-gradient(ellipse at 35% 25%, rgba(139,92,246,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Active Record Pattern', desc: 'Post class = posts table ─ $post object = one row ─ methods: save(), delete(), update() ─ interact database ─ elegant ！' },
      { label: 'CRUD Methods', desc: 'Post::create() ─ find($id) ─ where()->get() ─ update() ─ delete() ─ no raw SQL ─ PHP objects ─ clean ─ safe ─ readable ！' },
      { label: '$fillable', desc: 'Whitelist mass-assignable columns ─ protect against "role"="admin" injection via form ─ security ─ required ！' },
      { label: 'Local Scopes', desc: 'Post::published()->featured()->latest()->get() ─ reusable chainable query conditions ─ DRY ─ readable ─ testable ！' },
    ],
    variables: [
      { label: 'Active Record', desc: 'Design pattern ─ Model class represents table ─ instance represents row ─ methods on object → DB operations ─ intuitive ─ OOP ។' },
      { label: '$casts', desc: 'Automatic type conversion ─ "published_at" => "datetime" ─ PHP DateTime object ─ "settings" => "array" ─ JSON ─ transparent ！' },
    ],
    tip: 'Add $casts: "published_at" => "datetime" ─ "settings" => "array" ─ auto-convert ─ no manual parsing ！',
    lab: 'Create Post model ─ $fillable ─ published() scope ─ test in Tinker: Post::published()->count() ─ verify ។',
    result: 'Post::published()->with("author")->paginate(10) ─ clean ─ readable ─ efficient web query ！',
    filename: 'app/Models/Post.php',
    code: `<?php
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Builder;
use Illuminate\\Database\\Eloquent\\SoftDeletes;

class Post extends Model
{
    use SoftDeletes; // Soft delete: sets deleted_at, not real delete

    protected $fillable = [
        'title', 'slug', 'body', 'cover_image',
        'published', 'published_at', 'user_id',
    ];

    protected $casts = [
        'published'    => 'boolean',    // "1" → true
        'published_at' => 'datetime',   // string → DateTime
        'views'        => 'integer',
    ];

    // ─── Local Scope: reusable query ─────────
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true)
                     ->whereNotNull('published_at');
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }
}`,
    icon: Layers,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 13: TINKER
  ══════════════════════════════════════════════════════ */
  {
    id: 'L12-S1', chapter: 'tinker',
    section: 'Laravel Tinker',
    title: 'Laravel Tinker', subtitle: 'Interactive Shell ─ Test ─ Debug ─ Prototype',
    accent: '#f59e0b',
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(245,158,11,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'What is Tinker?', desc: 'REPL shell ─ full Laravel context ─ test Models ─ helpers ─ services ─ ប្រើ​ without browser ─ instant feedback ！' },
      { label: 'Test Queries Live', desc: 'Post::published()->count() ─ User::find(1)->posts ─ see results immediately ─ prototype Eloquent ─ before write Controller ！' },
      { label: 'Create Test Data', desc: 'Post::factory()->create() ─ User::factory(5)->create() ─ generate test data ─ directly from terminal ─ fast ！' },
      { label: 'Debug Web Issues', desc: 'Test relationships ─ check values ─ verify logic ─ inspect data ─ faster than writing temporary routes ─ developer tool ！' },
    ],
    variables: [
      { label: 'REPL', desc: 'Read-Eval-Print Loop ─ interactive programming ─ type command ─ execute ─ see result ─ type again ─ fast feedback loop ─ Tinker ！' },
      { label: 'PsySH', desc: 'PHP REPL ─ powers Laravel Tinker ─ features: autocomplete ─ history ─ show docs ─ professional shell ─ "php artisan tinker" ！' },
    ],
    tip: 'Tinker ជា developer best friend ─ prototype Eloquent queries first ─ then write Controller code ！',
    lab: 'Open Tinker ─ create 1 user ─ create 3 posts ─ query posts via user relationship ─ verify ។',
    result: '$user->posts ─ return Collection of 3 posts ─ relationship confirmed ─ before writing views ！',
    filename: 'terminal',
    code: `# Open Laravel Tinker shell
php artisan tinker

# ─── Create test data ─────────────────────────
$user = User::factory()->create([
    'name'  => 'Ratha Keo',
    'email' => 'ratha@myblog.com',
]);

# ─── Create posts via relationship ────────────
$user->posts()->create([
    'title'        => 'Hello Laravel World',
    'slug'         => 'hello-laravel',
    'body'         => 'My very first blog post content',
    'published'    => true,
    'published_at' => now(),
]);

# ─── Test Eloquent queries ────────────────────
Post::published()->count();           // → 1
Post::with('author')->latest()->get(); // → Collection
$user->posts->pluck('title');         // → ["Hello Laravel World"]

# ─── Test Helpers ─────────────────────────────
Str::slug('Hello World!');  // → "hello-world"
now()->format('d/m/Y');     // → "20/03/2025"`,
    terminal: 'php artisan tinker',
    terminalOutput: 'Psy Shell v0.12.3 (PHP 8.3) by Justin Hileman\n> Post::published()->count()\n= 12\n> User::find(1)->posts->count()\n= 5\n> Str::slug("Hello World!")\n= "hello-world"',
    icon: Terminal,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 14: RELATIONSHIPS OVERVIEW
  ══════════════════════════════════════════════════════ */
  {
    id: 'L13-S1', chapter: 'relationships',
    section: 'Relationships Overview',
    title: 'Eloquent Relationships', subtitle: 'ការ​ connect Models ─ ទំនាក់​ទំនង Data',
    accent: '#ef4444',
    bg: 'radial-gradient(ellipse at 25% 45%, rgba(239,68,68,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'One-to-One (1:1)', desc: 'User ↔ Profile ─ user ម្នាក់ ─ profile តែ​ ─ hasOne / belongsTo ─ exclusive pairing ─ profiles.user_id FK ។' },
      { label: 'One-to-Many (1:N)', desc: 'User → Posts ─ user ម្នាក់ ─ posts ច្រើន ─ hasMany / belongsTo ─ most common web app relationship ！' },
      { label: 'Many-to-Many (N:N)', desc: 'Post ↔ Tags ─ post ─ tags ច្រើន ─ tag ─ posts ច្រើន ─ needs pivot table ─ belongsToMany ─ post_tag table ។' },
      { label: 'Eager Loading', desc: 'Post::with("author", "tags") ─ solve N+1 problem ─ 2 queries instead of 101 ─ must use in production ！' },
    ],
    variables: [
      { label: 'N+1 Problem', desc: '1 query fetch 50 posts ─ loop: 50 queries fetch each author ─ total: 51 queries ─ SLOW ─ Eager Loading fix: with() ─ 2 queries ！' },
      { label: 'Eager Loading', desc: 'Load relationships upfront ─ Post::with("author") ─ 2 queries total ─ no matter how many posts ─ performance critical ！' },
    ],
    tip: 'N+1 Problem ─ loop $post->author without with() ─ 1 + N queries ─ ALWAYS use with() in Controller ！',
    lab: 'Test N+1 vs Eager Loading ─ DB::enableQueryLog() ─ compare query count with/without with() ─ verify ។',
    result: 'Posts page ─ 51 queries → 2 queries ─ web app performance ─ better with eager loading ！',
    filename: 'app/Http/Controllers/PostController.php',
    code: `// ─── N+1 Problem: BAD ─────────────────────────
$posts = Post::all();          // Query 1: fetch all posts
foreach ($posts as $post) {
    echo $post->author->name;  // Query 2,3,4... per post!
    // 50 posts = 51 total queries! Very SLOW!
}

// ─── Eager Loading: GOOD ───────────────────────
$posts = Post::with(['author', 'tags'])->get(); // 2 queries total

// ─── Check query count (development debug) ─────
DB::enableQueryLog();
$posts = Post::with('author')->paginate(10);
$count = count(DB::getQueryLog()); // Should be 2, not 11!

// ─── In Controller: always eager load ──────────
public function index()
{
    $posts = Post::published()
                 ->with(['author', 'tags', 'category'])
                 ->latest()
                 ->paginate(12);

    return view('posts.index', compact('posts'));
}`,
    icon: Workflow,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 15: ONE-TO-ONE
  ══════════════════════════════════════════════════════ */
  {
    id: 'L14-S1', chapter: 'onetone',
    section: 'One-to-One',
    title: 'One-to-One Relationship', subtitle: 'hasOne & belongsTo ─ Exclusive Pairing',
    accent: '#14b8a6',
    bg: 'radial-gradient(ellipse at 30% 20%, rgba(20,184,166,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Use Case', desc: 'User ↔ Profile (bio, avatar, social links) ─ User ↔ Settings ─ exclusive one-to-one ─ each user: exactly one profile ។' },
      { label: 'hasOne()', desc: 'User model: hasOne(Profile::class) ─ FK "user_id" lives IN profiles table ─ return single Model ─ not Collection ！' },
      { label: 'belongsTo()', desc: 'Profile model: belongsTo(User::class) ─ inverse side ─ $profile->user ─ return User object ─ navigation back ！' },
      { label: 'firstOrCreate()', desc: '$user->profile()->firstOrCreate([]) ─ get existing OR create new ─ safe ─ no duplicate ─ convenient ！' },
    ],
    variables: [
      { label: 'hasOne', desc: 'Method on "parent" Model ─ User hasOne Profile ─ FK ─ child table ─ return single Eloquent object ─ null if none ─ eager load ！' },
      { label: 'belongsTo', desc: 'Method on "child" Model ─ Profile belongsTo User ─ FK ─ same table ─ return parent Model ─ access parent data ─ navigate ！' },
    ],
    tip: 'FK lives on "belongsTo" side ─ profiles.user_id references users.id ─ NOT users.profile_id ！',
    lab: 'Build Profile system ─ Profile model + migration (user_id FK, bio, avatar) + hasOne/belongsTo ─ test ។',
    result: '$user->profile->bio ─ $profile->user->name ─ both work ─ bidirectional navigation ！',
    filename: 'app/Models/User.php',
    code: `// ─── User Model ───────────────────────────────
class User extends Model
{
    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
        // FK: profiles.user_id → users.id
    }
}

// ─── Profile Model ────────────────────────────
class Profile extends Model
{
    protected $fillable = ['user_id', 'bio', 'avatar', 'website'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

// ─── In Web Controller ────────────────────────
public function show(User $user)
{
    $user->load('profile'); // Eager load
    return view('users.show', compact('user'));
}

// ─── In Blade View ────────────────────────────
// <p>{{ $user->profile->bio }}</p>
// <img src="{{ $user->profile->avatar }}">
// <p>{{ $user->profile->website }}</p>`,
    icon: Layers,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 16: ONE-TO-MANY
  ══════════════════════════════════════════════════════ */
  {
    id: 'L15-S1', chapter: 'onetomany',
    section: 'One-to-Many',
    title: 'One-to-Many Relationship', subtitle: 'hasMany & belongsTo ─ Most Common',
    accent: '#6366f1',
    bg: 'radial-gradient(ellipse at 60% 30%, rgba(99,102,241,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Use Case', desc: 'User → Posts ─ Post → Comments ─ Category → Products ─ most common relationship ─ web apps ─ parent has many children ！' },
      { label: 'hasMany()', desc: 'User model: hasMany(Post::class) ─ return Collection ─ FK "user_id" in posts table ─ $user->posts ─ all posts by user ！' },
      { label: 'belongsTo()', desc: 'Post model: belongsTo(User::class) ─ $post->author ─ return single User object ─ FK on Post side ─ navigate to parent ！' },
      { label: 'Create via Relationship', desc: '$user->posts()->create([...]) ─ auto-set user_id ─ no manual assignment ─ clean ─ safe ─ best practice ！' },
    ],
    variables: [
      { label: 'hasMany', desc: 'Method on "one" side ─ User hasMany Posts ─ return Collection ─ dynamic property: $user->posts ─ method: $user->posts() Builder ！' },
      { label: 'Collection', desc: 'Laravel collection ─ array of Model objects ─ powerful methods: filter(), map(), pluck(), count() ─ chainable ─ elegant ！' },
    ],
    tip: '$user->posts (property) = loaded Collection ─ $user->posts() (method) = QueryBuilder ─ chain where() ！',
    lab: 'Define User hasMany Posts ─ Post belongsTo User ─ test $user->posts()->latest()->get() Tinker ─ verify ។',
    result: '$user->posts ─ all user posts ─ $post->author ─ post owner ─ bidirectional navigation ─ works ！',
    filename: 'app/Models/Post.php',
    code: `// ─── User Model ───────────────────────────────
class User extends Model
{
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
        // FK: posts.user_id → users.id
    }
}

// ─── Post Model ───────────────────────────────
class Post extends Model
{
    // "author" = custom name (not "user")
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}

// ─── In Web Controller ────────────────────────
public function store(Request $request)
{
    // Auto-sets user_id = currently logged in user
    $post = auth()->user()->posts()->create([
        'title' => $request->title,
        'slug'  => Str::slug($request->title),
        'body'  => $request->body,
    ]);

    return redirect()->route('posts.show', $post)
                     ->with('success', 'Post published!');
}`,
    icon: GitBranch,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 17: MANY-TO-MANY
  ══════════════════════════════════════════════════════ */
  {
    id: 'L16-S1', chapter: 'manytomany',
    section: 'Many-to-Many',
    title: 'Many-to-Many Relationship', subtitle: 'belongsToMany ─ Pivot Table',
    accent: '#f43f5e',
    bg: 'radial-gradient(ellipse at 40% 60%, rgba(244,63,94,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Use Case', desc: 'Post ↔ Tags ─ User ↔ Roles ─ Student ↔ Courses ─ each side ─ belongs to many of the other side ─ needs pivot table ！' },
      { label: 'Pivot Table', desc: '"post_tag" table ─ post_id + tag_id columns ─ alphabetical naming ─ Laravel find automatically ─ store relationship ！' },
      { label: 'belongsToMany()', desc: 'Both models use belongsToMany() ─ Post::with("tags") → load all tags ─ symmetric relationship ─ elegant ！' },
      { label: 'sync() / attach() / detach()', desc: '$post->tags()->sync([1,2,3]) ─ set exact tags ─ attach() adds ─ detach() removes ─ manage relationship ！' },
    ],
    variables: [
      { label: 'Pivot Table', desc: 'Junction table ─ store Many-to-Many relationship ─ post_tag: post_id + tag_id ─ each row = one connection ─ bridging table ！' },
      { label: 'sync()', desc: 'Sync relationships ─ pass array of IDs ─ removes old ─ adds new ─ perfect for checkbox forms ─ atomic operation ─ clean ！' },
    ],
    tip: 'sync([1,2,3]) ─ remove tags not in array ─ add new ones ─ perfect for tag checkbox form ！',
    lab: 'Build tag system ─ posts, tags, post_tag tables ─ form checkboxes ─ sync on save ─ display tags ！',
    result: 'Blog posts have tags ─ tag pages list posts ─ M:N working in web app ─ complete system ！',
    filename: 'app/Models/Post.php',
    code: `// ─── Post Model ───────────────────────────────
class Post extends Model
{
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
        // Auto-uses "post_tag" pivot table
    }
}

// ─── Tag Model ────────────────────────────────
class Tag extends Model
{
    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class);
    }
}

// ─── In Web Controller (handle tag form) ──────
public function update(Request $request, Post $post)
{
    $this->authorize('update', $post);

    $post->update($request->validated());

    // Sync tags from checkbox form input [1, 3, 7]
    $post->tags()->sync($request->input('tags', []));

    return redirect()->route('posts.show', $post)
                     ->with('success', 'Post updated!');
}

// ─── In Blade View ────────────────────────────
// @foreach($post->tags as $tag)
//     <a href="{{ route('tags.show', $tag) }}"
//        class="badge">{{ $tag->name }}</a>
// @endforeach`,
    icon: Workflow,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 18: FILE UPLOADING
  ══════════════════════════════════════════════════════ */
  {
    id: 'L17-S1', chapter: 'fileupload',
    section: 'File Upload',
    title: 'Uploading Files in Laravel', subtitle: 'Images ─ Storage ─ Web Access',
    accent: '#84cc16',
    bg: 'radial-gradient(ellipse at 30% 40%, rgba(132,204,22,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'enctype="multipart/form-data"', desc: 'REQUIRED HTML form attribute ─ without it ─ $_FILES empty ─ file data never reach Laravel ─ must include ！' },
      { label: 'File Validation Rules', desc: '"required|image|mimes:jpeg,png,webp|max:2048" ─ validate before store ─ security first ─ reject dangerous files ！' },
      { label: 'Storage Disks', desc: '"public" disk = web-accessible (storage/app/public) ─ "local" disk = private ─ configure in config/filesystems.php ។' },
      { label: 'php artisan storage:link', desc: 'Create symlink: public/storage → storage/app/public ─ makes files web-accessible ─ run once after install ！' },
    ],
    variables: [
      { label: 'Storage Disk', desc: 'Named filesystem configuration ─ "public" = web accessible ─ "local" = private ─ "s3" = Amazon S3 ─ swap easily ─ config ！' },
      { label: 'Symlink', desc: 'Symbolic link ─ shortcut ─ public/storage → storage/app/public ─ browser access /storage/file.jpg ─ stored securely ─ link ！' },
    ],
    tip: 'NEVER store uploads in public/ directly ─ use storage/ + storage:link ─ Storage::url() for web path ！',
    lab: 'Build cover image upload ─ form + validation + store("covers","public") + display in Blade view .',
    result: 'Post form accept image ─ saved to storage ─ displayed on post page ─ proper web URL ！',
    filename: 'app/Http/Controllers/PostController.php',
    code: `public function store(Request $request)
{
    $validated = $request->validate([
        'title'       => 'required|string|max:255',
        'body'        => 'required|string|min:10',
        'cover_image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
    ]);

    // Handle file upload safely
    if ($request->hasFile('cover_image')) {
        // Store to storage/app/public/covers/
        // Returns path: "covers/randomname.jpg"
        $validated['cover_image'] = $request->file('cover_image')
            ->store('covers', 'public');
    }

    $post = auth()->user()->posts()->create($validated);

    return redirect()->route('posts.show', $post)
                     ->with('success', 'Post published!');
}

// Delete old file when replacing
public function update(Request $request, Post $post)
{
    if ($request->hasFile('cover_image')) {
        // Delete old file first
        Storage::disk('public')->delete($post->cover_image);
        $post->cover_image = $request->file('cover_image')
                                      ->store('covers', 'public');
    }
}`,
    icon: HardDrive,
  },

  {
    id: 'L17-S2', chapter: 'fileupload',
    section: 'Display Files',
    title: 'Displaying Uploaded Files', subtitle: 'Storage::url() ─ Blade Templates',
    accent: '#84cc16',
    bg: 'radial-gradient(ellipse at 75% 65%, rgba(132,204,22,0.1) 0%, transparent 55%)',
    concepts: [
      { label: 'Storage::url()', desc: 'Storage::url($post->cover_image) → /storage/covers/abc.jpg ─ correct web-accessible URL ─ use in Blade img src ！' },
      { label: 'Handle Nullable Files', desc: '@if($post->cover_image) show image ─ @else show placeholder ─ graceful fallback ─ good UX ─ no broken images ！' },
      { label: 'Storage::disk()->delete()', desc: 'Delete old file before replacing ─ Storage::disk("public")->delete($path) ─ prevent orphan files ─ cleanup ！' },
      { label: 'File URL in JSON API', desc: 'Storage::url($this->cover_image) in Resource class ─ return full URL in JSON ─ frontend use directly ─ clean ！' },
    ],
    tip: 'Delete old file when replacing ─ Storage::disk("public")->delete($old) ─ prevent orphan files ！',
    lab: 'Display cover in posts/show.blade.php ─ handle nullable ─ show placeholder if no image ─ verify ！',
    result: 'Post page shows cover image ─ correct path ─ missing cover shows placeholder ─ good UX ！',
    filename: 'resources/views/posts/show.blade.php',
    code: `@extends('layouts.app')

@section('content')
<article class="max-w-3xl mx-auto py-12">

    {{-- Cover Image with fallback ──────────── --}}
    @if($post->cover_image)
        <img src="{{ Storage::url($post->cover_image) }}"
             alt="{{ $post->title }}"
             class="w-full h-72 object-cover rounded-2xl mb-8
                    shadow-lg">
    @else
        <div class="w-full h-72 bg-gray-100 rounded-2xl mb-8
                    flex items-center justify-center">
            <span class="text-gray-400 text-lg">📷 No cover image</span>
        </div>
    @endif

    {{-- Post Meta ──────────────────────────── --}}
    <div class="flex gap-4 mb-6 text-sm text-gray-500">
        @foreach($post->tags as $tag)
            <a href="{{ route('tags.show', $tag) }}"
               class="bg-gray-100 px-3 py-1 rounded-full">
                {{ $tag->name }}
            </a>
        @endforeach
    </div>

    <h1 class="text-4xl font-bold mb-4">{{ $post->title }}</h1>

    <p class="text-gray-500 mb-8">
        By <strong>{{ $post->author->name }}</strong> ·
        {{ $post->published_at->format('d M Y') }} ·
        {{ number_format($post->views) }} views
    </p>

    <div class="prose max-w-none">
        {!! nl2br(e($post->body)) !!}
    </div>

</article>
@endsection`,
    icon: Layout,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 19: CRUD OPERATIONS
  ══════════════════════════════════════════════════════ */
  {
    id: 'L18-S1', chapter: 'crud',
    section: 'Full CRUD',
    title: 'Building CRUD Operations', subtitle: 'Create ─ Read ─ Update ─ Delete Web Pages',
    accent: '#f97316',
    bg: 'radial-gradient(ellipse at 50% 20%, rgba(249,115,22,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Full CRUD Flow', desc: 'index (list) → show (detail) → create+store (new) → edit+update (modify) → destroy (delete) ─ complete cycle ！' },
      { label: 'PRG Pattern', desc: 'Post-Redirect-Get ─ after store/update/destroy ALWAYS redirect ─ prevent duplicate form submission ─ browser refresh safe ！' },
      { label: 'Flash Messages', desc: 'redirect()->with("success","Saved!") ─ @if(session("success")) show banner @endif ─ user feedback ─ good UX ！' },
      { label: 'Soft Deletes', desc: 'use SoftDeletes ─ set deleted_at ─ data preserved ─ $post->restore() if needed ─ data safety ─ "trash" feature ！' },
    ],
    variables: [
      { label: 'Flash Message', desc: 'Session data ─ survive ONE redirect ─ then gone ─ show success/error message ─ after form submission ─ one-time notification ！' },
      { label: 'Soft Delete', desc: 'Mark record deleted ─ set deleted_at timestamp ─ NOT actually delete ─ excluded from queries ─ restore possible ─ safe ！' },
    ],
    tip: 'Add SoftDeletes ─ every important Model ─ users accidentally delete ─ data is precious ─ restore easy ！',
    lab: 'Build complete Post CRUD ─ 7 routes + views (index, create, show, edit) + all Controller methods ！',
    result: 'Full-featured blog CMS ─ create/read/update/delete posts ─ validation ─ flash messages ─ working ！',
    filename: 'app/Http/Controllers/PostController.php',
    code: `public function store(Request $request)
{
    $data = $request->validate([
        'title'       => 'required|string|max:255',
        'body'        => 'required|string|min:10',
        'cover_image' => 'nullable|image|max:2048',
    ]);

    if ($request->hasFile('cover_image')) {
        $data['cover_image'] = $request->file('cover_image')
                                        ->store('covers','public');
    }

    $post = auth()->user()->posts()->create($data);

    // PRG: redirect after POST with flash message
    return redirect()->route('posts.index')
                     ->with('success', 'Post published! 🎉');
}

public function destroy(Post $post)
{
    $this->authorize('delete', $post); // Policy check

    // Delete cover image from storage
    if ($post->cover_image) {
        Storage::disk('public')->delete($post->cover_image);
    }

    $post->delete(); // Soft delete: sets deleted_at

    return redirect()->route('posts.index')
                     ->with('success', 'Post moved to trash.');
}`,
    icon: Zap,
  },

  {
    id: 'L18-S2', chapter: 'crud',
    section: 'Forms & Validation UI',
    title: 'CRUD Forms & Validation UI', subtitle: 'Create ─ Edit Forms ─ Error Messages',
    accent: '#f97316',
    bg: 'radial-gradient(ellipse at 20% 75%, rgba(249,115,22,0.1) 0%, transparent 55%)',
    concepts: [
      { label: '@method("PATCH")', desc: 'HTML forms ─ support GET/POST only ─ @method("PATCH") spoof PUT ─ edit forms ─ Laravel intercept ─ process correct ！' },
      { label: '@error Directive', desc: '@error("title") ─ render error message if validation fails ─ per-field errors ─ red text below input ─ clear UX ！' },
      { label: 'old() Helper', desc: 'old("title", $post->title ?? "") ─ show last submitted value on error ─ existing value on edit ─ user friendly ！' },
      { label: 'Flash Message in Layout', desc: '@if(session("success")) green banner ─ in layouts/app.blade.php ─ works ALL pages ─ DRY ─ one place ！' },
    ],
    tip: 'Put flash message display ─ layouts/app.blade.php ─ works all pages ─ write once ─ DRY principle ！',
    lab: 'Build create.blade.php + edit.blade.php ─ reuse form partial @include("posts._form") ─ DRY ！',
    result: 'Create + edit forms work ─ validation errors inline ─ old values preserved ─ PRG pattern ─ UX good ！',
    filename: 'resources/views/posts/_form.blade.php',
    code: `{{-- Reusable form partial: posts/_form.blade.php --}}
<div class="space-y-6">

    {{-- Title field with validation error ──── --}}
    <div>
        <label class="block font-semibold mb-2 text-gray-700">
            Title <span class="text-red-500">*</span>
        </label>
        <input type="text" name="title"
               value="{{ old('title', $post->title ?? '') }}"
               placeholder="Enter post title..."
               class="w-full border rounded-xl px-4 py-3 text-gray-900
                      focus:ring-2 focus:ring-orange-400 outline-none
                      @error('title') border-red-500 bg-red-50 @enderror">

        @error('title')
            <p class="text-red-500 text-sm mt-1 flex items-center gap-1">
                ⚠ {{ $message }}
            </p>
        @enderror
    </div>

    {{-- Content / Body field ──────────────── --}}
    <div>
        <label class="block font-semibold mb-2 text-gray-700">Content</label>
        <textarea name="body" rows="12"
                  class="w-full border rounded-xl px-4 py-3
                         @error('body') border-red-500 @enderror"
                  placeholder="Write your post content..."
        >{{ old('body', $post->body ?? '') }}</textarea>
        @error('body')
            <p class="text-red-500 text-sm mt-1">⚠ {{ $message }}</p>
        @enderror
    </div>

    {{-- Cover Image upload ─────────────────── --}}
    <div>
        <label class="block font-semibold mb-2 text-gray-700">
            Cover Image
        </label>
        <input type="file" name="cover_image" accept="image/*"
               class="block w-full text-gray-600">
        @error('cover_image')
            <p class="text-red-500 text-sm mt-1">⚠ {{ $message }}</p>
        @enderror
    </div>

    <button type="submit"
            class="w-full bg-orange-500 text-white font-bold py-3
                   rounded-xl hover:bg-orange-600 transition">
        {{ isset($post) ? 'Update Post' : 'Publish Post' }}
    </button>
</div>`,
    icon: Edit3,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 20: POSTMAN
  ══════════════════════════════════════════════════════ */
  {
    id: 'L19-S1', chapter: 'postman',
    section: 'Postman Basics',
    title: 'Testing APIs with Postman', subtitle: 'Create ─ Send ─ Verify API Requests',
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at 60% 40%, rgba(6,182,212,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Collections', desc: 'Group API requests by resource (Posts, Users, Auth) ─ share ជាមួយ team ─ version control ─ organized testing ！' },
      { label: 'Headers', desc: 'Content-Type: application/json ─ Accept: application/json ─ Authorization: Bearer token ─ required for every request ！' },
      { label: 'Request Body', desc: 'raw → JSON tab ─ type {"title":"..."} ─ POST/PUT requests use body ─ must match API validation rules ！' },
      { label: 'Environment Variables', desc: '{{BASE_URL}}, {{AUTH_TOKEN}} ─ switch dev/staging/production ─ one click ─ reuse across requests ─ DRY ！' },
    ],
    variables: [
      { label: 'Collection', desc: 'Postman folder ─ group related API requests ─ Blog API: Auth, Posts, Users, Comments ─ organized ─ shareable ─ export ！' },
      { label: 'Environment', desc: 'Postman variable set ─ {{BASE_URL}} = http://localhost/api ─ switch environments ─ one click ─ all requests update ！' },
    ],
    tip: 'Add Accept: application/json header ─ Laravel return JSON errors ─ not HTML redirect ─ important ！',
    lab: 'Test Blog API ─ GET /api/posts → POST /api/posts → PATCH /api/posts/1 → DELETE ─ verify each ！',
    result: 'Postman collection ─ Auth + CRUD tests ─ all 200/201/204/422 responses verified ─ API working ！',
    filename: 'postman-test-script.js',
    code: `// Postman Test Scripts (Tests tab)
// ─── Run after every request ──────────────────

// Test 1: Status code correct
pm.test("Status 200 OK", () => {
    pm.response.to.have.status(200);
});

// Test 2: Response has data
pm.test("Response has posts array", () => {
    const body = pm.response.json();
    pm.expect(body).to.have.property('data');
    pm.expect(body.data).to.be.an('array');
});

// ─── After POST /api/posts (201 Created) ──────
pm.test("Post created with ID", () => {
    pm.response.to.have.status(201);
    const post = pm.response.json().data;
    pm.expect(post.id).to.be.a('number');
    pm.expect(post.title).to.be.a('string');
    // Save for next request
    pm.environment.set("POST_ID", post.id);
});

// ─── Pre-request Script ─ Auto set token ──────
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('AUTH_TOKEN')
});`,
    icon: Send,
  },

  {
    id: 'L19-S2', chapter: 'postman',
    section: 'Sanctum Auth',
    title: 'Sanctum Token in Postman', subtitle: 'Authenticate API Requests ─ Bearer Token',
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at 30% 80%, rgba(6,182,212,0.1) 0%, transparent 55%)',
    concepts: [
      { label: 'Login to Get Token', desc: 'POST /api/login ─ receive plaintext token ─ copy to Authorization: Bearer ─ use in protected requests ！' },
      { label: 'auth:sanctum Guard', desc: 'Route::middleware("auth:sanctum") ─ validate Bearer token ─ 401 if missing/expired ─ protect API routes ！' },
      { label: 'Token Revocation', desc: '$user->tokens()->delete() ─ logout all devices ─ $user->currentAccessToken()->delete() ─ current session ！' },
      { label: '422 Validation Errors', desc: 'Accept: application/json ─ Laravel return field errors as JSON ─ not HTML redirect ─ proper API behavior ！' },
    ],
    tip: 'Postman Collection Authorization ─ set Bearer Token ─ use {{AUTH_TOKEN}} ─ all requests inherit ！',
    lab: 'POST /api/login ─ copy token ─ use Bearer header ─ access GET /api/user ─ verify 200 vs 401 ！',
    result: 'With token: 200 user data ─ Without: 401 Unauthorized ─ Wrong: 422 Validation error ─ correct ！',
    filename: 'routes/api.php',
    code: `<?php
use App\\Http\\Controllers\\Api\\AuthController;
use App\\Http\\Controllers\\Api\\PostController;

// ─── Public Routes (no auth needed) ──────────
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// ─── Protected Routes (Bearer token required) ─
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', fn($req) => $req->user());
    Route::post('/logout', [AuthController::class, 'logout']);

    // Full Blog API
    Route::apiResource('posts', PostController::class);
    Route::get('/my-posts', [PostController::class, 'myPosts']);
});

// ─── In AuthController::login() ──────────────
// public function login(Request $request) {
//     $credentials = $request->validate([
//         'email'    => 'required|email',
//         'password' => 'required',
//     ]);
//     if (!auth()->attempt($credentials)) {
//         return response()->json(['message' => 'Invalid credentials'], 401);
//     }
//     $token = auth()->user()->createToken('api')->plainTextToken;
//     return response()->json(['token' => $token, 'user' => auth()->user()]);
// }`,
    icon: Lock,
  },

  {
    id: 'L19-S3', chapter: 'postman',
    section: 'HTTP Status Codes',
    title: 'HTTP Status Codes', subtitle: 'API Response Codes ─ ស្ដង់ដារ HTTP',
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.12) 0%, transparent 55%)',
    concepts: [
      { label: '200 OK & 201 Created', desc: '200: request successful ─ data returned ─ GET/PATCH ─ 201: new resource created successfully ─ after POST ─ return new data ！' },
      { label: '204 No Content', desc: 'Request successful ─ no data return ─ ប្រើ after DELETE successful ─ body empty ─ correct behavior ─ standard ！' },
      { label: '401 & 403 Errors', desc: '401 Unauthorized: មិនទាន់ login ─ no token ─ 403 Forbidden: logged in ─ but no permission ─ different scenarios ！' },
      { label: '404 & 422 Errors', desc: '404 Not Found: URL/ID not exist ─ 422 Unprocessable: validation failed ─ errors per field ─ tell client what wrong ！' },
    ],
    variables: [
      { label: 'HTTP Status Code', desc: '3-digit number ─ server tell client result ─ 2xx success ─ 4xx client error ─ 5xx server error ─ standard ─ universal ！' },
      { label: '422 Unprocessable', desc: 'Validation failed ─ correct HTTP code for form validation errors ─ body: {"errors": {"field": ["message"]}} ─ standard ！' },
    ],
    tip: 'Return correct status codes ─ response()->json($data, 201) ─ abort(403) ─ API clients depend on them ！',
    lab: 'Create route return 201 for POST ─ trigger 404 ─ trigger 422 in Postman ─ verify each code ！',
    result: 'API uses correct status codes ─ standard behavior ─ frontend/mobile can handle responses properly ！',
    filename: 'app/Http/Controllers/Api/PostController.php',
    code: `<?php

// ─── 2xx: Successful Responses ────────────────

// 200 OK: data returned
return response()->json(['data' => $post], 200);
// or simply:
return new PostResource($post); // default 200

// 201 Created: new resource
return response()->json(['data' => $post], 201);
// or:
return (new PostResource($post))
           ->response()->setStatusCode(201);

// 204 No Content: success, nothing to return
return response()->noContent(); // After DELETE

// ─── 4xx: Client Error Responses ──────────────

// 401 Unauthorized: not logged in
if (!auth('api')->user()) {
    return response()->json(['message' => 'Unauthenticated.'], 401);
}

// 403 Forbidden: logged in but no permission
$this->authorize('delete', $post); // throws 403 automatic

// 404 Not Found: resource not exist
abort(404, 'Post not found.');

// 422 Validation Failed: automatic via validate()
$data = $request->validate([
    'title' => 'required|string|max:255',
    'body'  => 'required|string',
]);
// → 422 + {"errors":{"title":["The title field is required."]}}`,
    icon: Activity,
  },

  /* ══════════════════════════════════════════════════════
     CHAPTER 21: AUTH — PASSPORT / JWT
  ══════════════════════════════════════════════════════ */
  {
    id: 'L20-S1', chapter: 'auth',
    section: 'Auth Overview',
    title: 'Authentication Overview', subtitle: 'Passport vs JWT vs Sanctum ─ ជ្រើស​ Right Tool',
    accent: '#a855f7',
    bg: 'radial-gradient(ellipse at 20% 20%, rgba(168,85,247,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Sanctum', desc: 'Session auth (web Blade pages) + Token auth (SPA/mobile) ─ simple ─ lightweight ─ 90% of web apps ─ recommended start ！' },
      { label: 'Passport', desc: 'Full OAuth2 server ─ issue tokens to third-party clients ─ authorization code flow ─ complex ─ powerful ─ need OAuth2 ！' },
      { label: 'JWT (tymon/jwt-auth)', desc: 'JSON Web Tokens ─ stateless ─ self-contained ─ no DB lookup ─ microservices ─ mobile APIs ─ scales horizontal ！' },
      { label: 'Laravel Breeze/Jetstream', desc: 'Starter kits: Breeze (simple) ─ Jetstream (full-featured) ─ auth scaffolding ─ minutes ─ login/register ready ！' },
    ],
    variables: [
      { label: 'OAuth2', desc: 'Open standard ─ authorization protocol ─ "Login with Google/GitHub" ─ issue tokens to third-party apps ─ Passport implement this ！' },
      { label: 'JWT', desc: 'JSON Web Token ─ Header.Payload.Signature ─ base64 encoded ─ self-contained ─ verify without DB ─ stateless ─ signed ─ compact ！' },
    ],
    tip: 'Start with Sanctum + Breeze ─ upgrade Passport only when OAuth2 provider role needed ─ YAGNI ！',
    lab: 'Install Breeze: composer require laravel/breeze ─ php artisan breeze:install ─ test register/login ！',
    result: 'Full web auth ─ register ─ login ─ logout ─ forgot password ─ email verify ─ all pages ready ！',
    filename: 'terminal',
    code: `# ─── Option A: Sanctum + Breeze ─────────────
# Best for: most web apps, SPAs, mobile APIs
composer require laravel/breeze --dev
php artisan breeze:install blade  # Blade + Tailwind
php artisan migrate
npm install && npm run dev
# → /login, /register, /dashboard all ready!

# ─── Option B: Passport ──────────────────────
# Best for: OAuth2 provider, third-party token issuance
composer require laravel/passport
php artisan passport:install
# → Full OAuth2: authorize, token, refresh endpoints

# ─── Option C: JWT (tymon/jwt-auth) ──────────
# Best for: microservices, stateless APIs, mobile
composer require tymon/jwt-auth
php artisan vendor:publish \\
    --provider="Tymon\\JWTAuth\\Providers\\LaravelServiceProvider"
php artisan jwt:secret
# → Stateless JWT tokens, no DB session storage`,
    terminal: 'php artisan breeze:install blade',
    terminalOutput: '   INFO  Breeze scaffolding installed successfully.\n   Please run:\n          php artisan migrate\n          npm install && npm run dev',
    icon: Fingerprint,
  },

  {
    id: 'L20-S2', chapter: 'auth',
    section: 'JWT Authentication',
    title: 'JWT Authentication', subtitle: 'Stateless Token Auth ─ Mobile & API',
    accent: '#a855f7',
    bg: 'radial-gradient(ellipse at 80% 70%, rgba(168,85,247,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'JWT Structure', desc: 'Header.Payload.Signature ─ Base64 encoded ─ carry user info inside token ─ server verify signature ─ no DB lookup ！' },
      { label: 'Stateless Advantage', desc: 'Server store nothing ─ scale horizontally ─ any server verify token ─ no shared session storage ─ microservices ！' },
      { label: 'Token Expiry (TTL)', desc: 'Tokens expire after TTL minutes ─ client refresh before expiry ─ get new token ─ security best practice ！' },
      { label: 'auth("api") Guard', desc: 'config/auth.php: api guard driver = "jwt" ─ auth("api")->user() ─ auth("api")->attempt() ─ login ─ verify ！' },
    ],
    variables: [
      { label: 'TTL', desc: 'Time-To-Live ─ JWT lifetime ─ default 60 minutes ─ after expiry ─ client must refresh ─ ឬ login again ─ security measure ！' },
      { label: 'Refresh Token', desc: 'Long-lived token ─ exchange for new access token ─ when expired ─ user stays logged in ─ without re-entering password ！' },
    ],
    tip: 'Store JWT in httpOnly cookie (not localStorage) ─ XSS cannot steal httpOnly cookies ─ more secure ！',
    lab: 'Build JWT login API ─ POST /api/login → token ─ GET /api/profile protected ─ test Postman ！',
    result: 'Stateless API auth ─ login → JWT token → Bearer header → access protected routes ─ working ！',
    filename: 'app/Http/Controllers/Api/AuthController.php',
    code: `<?php
namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;

class AuthController extends Controller
{
    // POST /api/login → get JWT token
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json([
                'message' => 'Email ឬ Password មិនត្រឹមត្រូវ'
            ], 401);
        }

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60,
            'user'         => auth('api')->user(),
        ]);
    }

    // GET /api/profile → current user info
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    // POST /api/refresh → new token before expire
    public function refresh()
    {
        return response()->json([
            'access_token' => auth('api')->refresh(),
            'token_type'   => 'bearer',
        ]);
    }

    // POST /api/logout → invalidate token
    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'Logged out successfully']);
    }
}`,
    icon: Key,
  },

  {
    id: 'L20-S3', chapter: 'auth',
    section: 'Conclusion',
    title: 'To Be Continued...', subtitle: 'Next: Advanced Projects ─ Real-world Apps',
    accent: '#a855f7',
    bg: 'radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, transparent 70%)',
    concepts: [
      { label: 'E-commerce API', desc: 'Build full-featured shop backend ─ products, cart, orders API ─ Stripe payment integration ─ real web project ─ coming soon ！' },
      { label: 'Social Network', desc: 'Follow system ─ real-time notifications ─ WebSockets via Reverb ─ advanced Eloquent relationships ─ coming soon ！' },
      { label: 'What You Mastered', desc: 'Laravel setup ─ MVC ─ Routes ─ Middleware ─ Security ─ REST API ─ Database ─ Eloquent ─ CRUD ─ Auth ─ solid foundation ！' },
      { label: 'Next Steps', desc: 'Practice daily ─ build something real ─ read Laravel docs ─ join community ─ Laracasts ─ open source contribute ─ grow ！' },
    ],
    tip: 'Best way to learn Laravel ─ build something real every day ─ theory + practice ─ consistency ！',
    lab: 'Review all concepts ─ build small CRUD app from scratch ─ no tutorial ─ test yourself ─ grow ！',
    result: 'Solid Laravel foundation ─ ready for advanced topics ─ real-world project building ─ confident ！',
    filename: 'next-steps.md',
    code: `// Your Laravel Journey So Far...

$mastered = [
    '01 Introduction to Laravel',
    '02 Setting Up & Project Structure',
    '03 MVC Architecture',
    '04 Routes and Controllers',
    '05 Resource Controllers',
    '06 Middleware',
    '07 Security & Authorization',
    '08 REST APIs',
    '09 Database Overview',
    '10 Migrations',
    '11 Raw SQL Queries',
    '12 Eloquent ORM',
    '13 Laravel Tinker',
    '14 Eloquent Relationships',
    '15 One-to-One',
    '16 One-to-Many',
    '17 Many-to-Many',
    '18 File Uploads',
    '19 CRUD Operations',
    '20 Postman & API Testing',
    '21 Authentication (Passport/JWT)',
];

echo "Chapters mastered: " . count($mastered);
// → 21 chapters complete!
echo "\\nNext: Build your real-world project! 🚀";`,
    icon: Rocket,
  },
];

/* ─── SYNTAX HIGHLIGHTER ─────────────────────────────────────────── */
const PHP_KW = new Set([
  'php', 'echo', 'return', 'if', 'else', 'elseif', 'foreach', 'for', 'while',
  'class', 'extends', 'implements', 'namespace', 'use', 'new', 'public',
  'protected', 'private', 'static', 'function', 'fn', 'array', 'string',
  'int', 'float', 'bool', 'void', 'null', 'true', 'false', 'require',
  'include', 'throw', 'try', 'catch', 'match', 'readonly', 'const',
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
    <div className="font-mono text-lg leading-relaxed whitespace-pre"
      style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace" }}>
      {code.split('\n').map((line, i) => (
        <div key={i} className="min-h-[1.8rem]">{tokenize(line)}</div>
      ))}
    </div>
  );
};

/* ─── THEME ANIMATIONS ───────────────────────────────────────────── */
const ThemeAnimation = ({ accent, slideId, title, chapter }: {
  accent: string; slideId: string; title: string; chapter: string;
}) => {
  const isWhatIs = title.toLowerCase().includes('what is');
  const isFeatures = title.toLowerCase().includes('why') || title.toLowerCase().includes('choose');
  const isEcosystem = title.toLowerCase().includes('ecosystem');
  const isSetup = chapter === 'setup';

  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };
  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'spring' as const, damping: 12 } }
  };

  return (
    <motion.div
      variants={containerVariants} initial="initial" animate="animate"
      className="relative w-full h-full flex items-center justify-center bg-[#07090f]/50 rounded-[2rem] border border-white/8 overflow-hidden backdrop-blur-3xl"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: accent }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 w-full max-w-md p-8">
        {isWhatIs && (
          <div className="flex flex-col items-center gap-12">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="relative w-48 h-48 flex items-center justify-center">
              {[Globe, Lock, Database, List, Shield, Zap].map((Icon, i) => (
                <motion.div key={i}
                  className="absolute p-4 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl"
                  style={{
                    top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}%`,
                    left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}>
                  <Icon size={24} style={{ color: accent }} />
                </motion.div>
              ))}
              <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                <Box size={40} className="text-black" />
              </div>
            </motion.div>
            <div className="text-center space-y-4">
              <motion.h3 variants={itemVariants} className="text-3xl font-black text-white tracking-tight">The "Battery-Included" Core</motion.h3>
              <motion.p variants={itemVariants} className="text-zinc-400 font-medium leading-relaxed">Everything you need, right out of the box.</motion.p>
            </div>
          </div>
        )}

        {isFeatures && (
          <div className="space-y-8">
            {[
              { label: 'Expressive Syntax', icon: Edit3, desc: 'Code reads like English' },
              { label: 'Infinite Scalability', icon: Rocket, desc: 'Grows with your app' },
              { label: 'Security First', icon: Shield, desc: 'Protected by default' },
            ].map((f, i) => (
              <motion.div key={i} variants={itemVariants}
                className="group flex items-center gap-6 p-6 rounded-[1.5rem] bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/[0.08] transition-all">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-black/40 group-hover:scale-110 transition-transform">
                  <f.icon size={28} style={{ color: accent }} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{f.label}</h4>
                  <p className="text-zinc-500 font-medium">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {isEcosystem && (
          <div className="relative h-[400px] w-full flex items-center justify-center mt-10">
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }}
              className="w-32 h-32 rounded-full bg-white flex items-center justify-center relative z-20 shadow-[0_0_80px_rgba(255,255,255,0.3)]">
              <Layers size={48} className="text-black" />
            </motion.div>
            {[
              { label: 'Forge', icon: Server, x: -140, y: -60 },
              { label: 'Vapor', icon: Rocket, x: 140, y: -60 },
              { label: 'Nova', icon: Key, x: -100, y: 120 },
              { label: 'Pulse', icon: Activity, x: 100, y: 120 },
            ].map((e, i) => (
              <motion.div key={i}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ x: e.x, y: e.y, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 50 }}
                className="absolute flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl group-hover:bg-white/10 transition-colors">
                  <e.icon size={24} style={{ color: accent }} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{e.label}</span>
              </motion.div>
            ))}
          </div>
        )}

        {isSetup && (
          <div className="flex flex-col items-center gap-10">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
              className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              <Terminal size={80} style={{ color: accent }} />
              <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-0 left-0 h-1 bg-current opacity-30" style={{ color: accent }} />
            </motion.div>
            <div className="text-center space-y-4">
              <motion.div variants={itemVariants} className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Preparing Environment</motion.div>
              <h3 className="text-3xl font-black text-white tracking-tight">System Foundation</h3>
              <p className="text-zinc-500 font-medium max-w-[280px] mx-auto leading-relaxed text-sm">ត្រៀម​ machine ─ Laravel-ready ─ before we build !</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ─── CODE PANEL ─────────────────────────────────────────────────── */
const CodePanel = ({
  code: initialCode, terminal, terminalOutput: initialOutput, accent, filename, subType
}: {
  code: string; terminal?: string; terminalOutput?: string; accent: string; filename: string;
  subType: 'concept' | 'variables' | 'lab';
}) => {
  const [tab, setTab] = useState<'code' | 'terminal'>('code');
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(initialOutput);
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const hlRef = useRef<HTMLDivElement>(null);
  const lines = code.split('\n');

  useEffect(() => {
    setCode(initialCode);
    setOutput(initialOutput);
    setTab(subType === 'lab' ? 'code' : 'terminal');
  }, [initialCode, initialOutput, subType]);

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
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d1117] border-b border-white/5 flex-none">
        <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/5">
          {(['code', 'terminal'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${tab === t ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
              {t === 'code' ? <Code2 className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
              {t === 'code' ? 'Code' : 'Terminal'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={async () => {
            setTab('terminal'); setRunning(true);
            await new Promise(r => setTimeout(r, 800));
            setRunning(false);
          }}
            disabled={running}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${running ? 'bg-zinc-800 text-zinc-500' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'}`}>
            <Play className={`w-3 h-3 ${running ? 'animate-pulse' : ''}`} />
            {running ? 'កំពុងដំណើរការ...' : 'ដំណើរការ'}
          </button>
          <button onClick={() => { setCode(initialCode); setOutput(initialOutput); }}
            className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-white/5 transition-all">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button onClick={copy}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${copied ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'}`}>
            {copied ? <><Check className="w-3 h-3" />បានចម្លង</> : <><Copy className="w-3 h-3" />ចម្លង</>}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-2 bg-[#0d1117]/60 border-b border-white/5 flex-none">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/40" />
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2.5 py-1">
          <FileCode className="w-3 h-3" style={{ color: accent }} />
          <span className="text-[10px] font-mono text-zinc-400">{tab === 'code' ? filename : 'bash — terminal'}</span>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {tab === 'code' ? (
          <div className="flex h-full overflow-hidden">
            <div className="flex-none w-12 bg-[#07090f] border-r border-white/5 pt-4 flex flex-col items-end pr-4 select-none overflow-hidden">
              {lines.map((_, i) => (
                <div key={i} className="text-[13px] font-mono text-zinc-700 leading-relaxed min-h-[1.5rem]">{i + 1}</div>
              ))}
            </div>
            <div className="relative flex-1 overflow-hidden">
              <div ref={hlRef} className="absolute inset-0 overflow-auto p-4 pointer-events-none" style={{ scrollbarWidth: 'none' }}>
                <HighlightedCode code={code} />
              </div>
              <textarea ref={taRef} value={code} onChange={e => setCode(e.target.value)} onScroll={syncScroll}
                className="absolute inset-0 w-full h-full bg-transparent text-transparent resize-none outline-none p-4 font-mono text-[13px] leading-relaxed border-none overflow-auto selection:bg-purple-500/25"
                style={{ fontFamily: "'JetBrains Mono',monospace", whiteSpace: 'pre', overflowWrap: 'normal' }}
                spellCheck={false} wrap="off" />
            </div>
          </div>
        ) : (
          <div className="p-8 font-mono text-[14px] leading-relaxed overflow-auto h-full text-white">
            <div className="flex gap-2 text-zinc-500 mb-4">
              <span style={{ color: accent }}>➜</span>
              <span className="text-blue-400">~/my-blog</span>
              <span className="text-zinc-400 font-bold">$</span>
              <span className="text-white">{terminal || 'php artisan serve'}</span>
            </div>
            {output
              ? <pre className="text-white whitespace-pre-wrap font-bold">{output}</pre>
              : <div className="text-zinc-600 animate-pulse">No output yet. Click ដំណើរការ to run.</div>
            }
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function LaravelSlide() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chapterParam = searchParams.get('chapter') || 'intro';

  const displayPages = useMemo(() => {
    const filtered = slides.filter(s => s.chapter === chapterParam);
    const result: DisplayPage[] = [];
    filtered.forEach(s => {
      result.push({ ...s, subType: 'concept' });
      if (s.variables && s.variables.length > 0) {
        result.push({ ...s, subType: 'variables' });
      }
      if (s.lab && s.lab.length > 0) {
        result.push({ ...s, subType: 'lab' });
      }
    });
    return result.length > 0 ? result : [{ ...slides[0], subType: 'concept' }];
  }, [chapterParam]);

  const slideParam = searchParams.get('slide');
  const initialSlide = slideParam
    ? Math.max(0, Math.min(parseInt(slideParam) - 1, displayPages.length - 1))
    : 0;

  const [current, setCurrent] = useState(initialSlide);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [dir, setDir] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const s = slideParam ? parseInt(slideParam) - 1 : 0;
    if (s !== current) {
      setCurrent(Math.max(0, Math.min(s, displayPages.length - 1)));
    }
  }, [chapterParam, slideParam, displayPages.length]);

  const goTo = useCallback((idx: number, d: number) => {
    if (isAnimating) return;
    setDir(d); setIsAnimating(true);
    const params = new URLSearchParams(searchParams.toString());
    if (idx === 0) params.delete('slide');
    else params.set('slide', String(idx + 1));
    router.push(`?${params.toString()}`, { scroll: false });
    setTimeout(() => { setCurrent(idx); setIsAnimating(false); }, 250);
  }, [isAnimating, router, searchParams]);

  useEffect(() => {
    const saved = localStorage.getItem('laravel_notes_v4');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const slide = displayPages[current] || displayPages[0];
  const Icon = slide.icon;
  const progress = ((current + 1) / displayPages.length) * 100;
  const chapterInfo = CHAPTERS.find(c => c.id === slide.chapter) || CHAPTERS[0];

  const saveNote = (val: string) => {
    const next = { ...notes, [slide.id]: val };
    setNotes(next);
    localStorage.setItem('laravel_notes_v4', JSON.stringify(next));
  };

  const next = useCallback(() => {
    if (current < displayPages.length - 1) { goTo(current + 1, 1); return; }
    const ci = CHAPTERS.findIndex(c => c.id === chapterParam);
    if (ci < CHAPTERS.length - 1) { setDir(1); router.push(`?chapter=${CHAPTERS[ci + 1].id}`); }
  }, [current, displayPages.length, chapterParam, goTo, router]);

  const prev = useCallback(() => {
    if (current > 0) { goTo(current - 1, -1); return; }
    const ci = CHAPTERS.findIndex(c => c.id === chapterParam);
    if (ci > 0) {
      setDir(-1);
      router.push(`?chapter=${CHAPTERS[ci - 1].id}`);
    }
  }, [current, chapterParam, goTo, router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const variants = {
    enter: (d: number) => ({ y: d * 30, opacity: 0, scale: 0.98 }),
    center: { y: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ y: d * -30, opacity: 0, scale: 0.98 }),
  };

  const hasCode = !!(slide.code || slide.terminal);
  const hasAnimation = chapterParam === 'intro' || (!hasCode && chapterParam === 'setup');
  const isFullWidth = !hasCode && !hasAnimation;

  return (
    <div className="min-h-screen text-white flex flex-col overflow-hidden"
      style={{ background: '#07090f', fontFamily: "'Inter','DM Sans',system-ui,sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none transition-all duration-700" style={{ background: slide.bg }} />
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.04) 0%, transparent 60%)' }} />

      {/* ── HEADER ── */}
      <div className="relative z-[60] border-b border-white/5 bg-black/60 backdrop-blur-2xl">
        <div className="max-w-[1800px] mx-auto w-full flex items-center justify-between px-6 lg:px-14 py-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/courses/backend"
              className="group flex items-center gap-3 px-3 sm:px-4 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95">
              <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors hidden lg:block">ចាកចេញ</span>
            </Link>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-5 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/12 hover:border-white/30 transition-all active:scale-95 max-w-[200px] sm:max-w-none">
              <div className={`w-7 h-7 rounded-lg flex-none flex items-center justify-center transition-all duration-300 ${isMenuOpen ? 'bg-white text-black' : 'bg-black/40 text-zinc-400 group-hover:text-white'}`}>
                <AnimatePresence mode="wait">
                  {isMenuOpen
                    ? <motion.div key="x" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}><X className="w-3.5 h-3.5" /></motion.div>
                    : <motion.div key="menu" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}><Menu className="w-3.5 h-3.5" /></motion.div>
                  }
                </AnimatePresence>
              </div>
              <div className="flex flex-col items-start leading-tight overflow-hidden">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 hidden sm:block">ផែនទីមេរៀន</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white tracking-tight truncate">{chapterInfo.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-zinc-600 flex-none transition-transform duration-500 ${isMenuOpen ? 'rotate-180 text-white' : ''}`} />
                </div>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-8">
            <div className="hidden sm:flex flex-col items-end gap-1.5 min-w-[100px] md:min-w-[140px]">
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="text-zinc-500 uppercase tracking-widest font-black hidden lg:block">ភាពស្ទាត់ជំនាញ</span>
                <span className="text-white font-black bg-white/10 px-1.5 py-0.5 rounded-md">{Math.round(progress)}%</span>
              </div>
              <div className="w-24 md:w-44 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ background: chapterInfo.color }} />
              </div>
            </div>
            <div className="h-10 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button onClick={prev} className="w-10 h-10 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all active:scale-90 border border-white/5 flex items-center justify-center">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="text-sm font-mono text-zinc-500 flex items-center gap-1 leading-none">
                  <span className="text-white font-bold">{current + 1}</span>
                  <span className="text-zinc-800">/</span>
                  <span>{displayPages.length}</span>
                </span>
              </div>
              <button onClick={next} className="w-10 h-10 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all active:scale-90 border border-white/5 flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── CHAPTER MENU ── */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 pointer-events-none">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md pointer-events-auto" />
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="relative w-full max-w-5xl max-h-full bg-[#0d1117] border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] flex flex-col pointer-events-auto overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-8 sm:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {CHAPTERS.map((ch, i) => {
                    const isActive = ch.id === chapterParam;
                    return (
                      <button key={ch.id}
                        onClick={() => {
                          const params = new URLSearchParams();
                          params.set('chapter', ch.id);
                          router.push(`?${params.toString()}`);
                          setCurrent(0);
                          setIsMenuOpen(false);
                        }}
                        className={`group relative flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 border ${isActive ? 'bg-white/5 border-white/20' : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-all flex-none ${isActive ? 'scale-110' : 'opacity-60 group-hover:opacity-100'}`}
                          style={{ background: isActive ? ch.color : `${ch.color}25`, color: isActive ? '#000' : ch.color, border: isActive ? 'none' : `1.5px solid ${ch.color}40` }}>
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div className="flex flex-col items-start leading-snug overflow-hidden text-left">
                          {isActive && <span className="text-[7px] font-black px-1.5 py-0.5 rounded bg-white text-black uppercase tracking-tighter mb-1">បច្ចុប្បន្ន</span>}
                          <span className={`text-xs font-bold truncate w-full ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                            {ch.label.split(' · ')[1] || ch.label}
                          </span>
                        </div>
                        {isActive && <div className="ml-auto w-2 h-2 rounded-full animate-pulse flex-none" style={{ background: ch.color }} />}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex-none p-6 sm:px-10 sm:py-5 bg-black/20 border-t border-white/5 flex items-center justify-between gap-4">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">21 Chapters · Laravel Web Application Development</div>
                <div className="text-[10px] font-mono text-zinc-600 bg-white/5 px-3 py-1 rounded-lg border border-white/5">FULLSTACK ACADEMY · LARAVEL 11</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MAIN LAYOUT ── */}
      <main className={`relative z-10 flex-1 flex flex-col ${isFullWidth ? 'items-center justify-center p-8 lg:p-20' : 'lg:flex-row'} overflow-hidden max-w-[1800px] mx-auto w-full`}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={`left-${current}`} custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className={`flex flex-col gap-8 transition-all duration-500 ${isFullWidth
              ? 'max-w-5xl w-full p-12 lg:p-24 bg-white/[0.02] rounded-[4rem] border border-white/8 shadow-2xl backdrop-blur-3xl overflow-y-auto'
              : 'flex-none lg:w-[45%] p-8 lg:p-14 xl:p-20 lg:border-r border-white/6 overflow-y-auto'}`}>

            {/* Title Block */}
            <div className="flex items-center gap-6 mb-4">
              <div className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center flex-none border border-white/10 shadow-2xl"
                style={{ background: `${slide.accent}15` }}>
                <Icon className="w-8 h-8" style={{ color: slide.accent }} />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-lg border"
                    style={{ color: chapterInfo.color, borderColor: `${chapterInfo.color}30`, background: `${chapterInfo.color}10` }}>
                    {chapterInfo.label}
                  </span>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/5">
                    <div className={`w-1.5 h-1.5 rounded-full ${slide.subType === 'concept' ? 'bg-blue-500 animate-pulse' : slide.subType === 'variables' ? 'bg-purple-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}`} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                      {slide.subType === 'concept' ? 'ទ្រឹស្តី' : slide.subType === 'variables' ? 'ពាក្យគន្លឹះ' : 'ការអនុវត្ត'}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-zinc-700 ml-auto">{slide.id}</span>
                </div>
                <h1 className="text-[42px] font-black leading-[1.1] text-white tracking-[-0.02em] mb-3">{slide.title}</h1>
                <p className="text-[18px] text-[#94a3b8] leading-relaxed font-medium">{slide.subtitle}</p>
              </div>
            </div>

            {/* Content */}
            {slide.subType === 'concept' ? (
              <div className="grid grid-cols-1 gap-4">
                {slide.concepts.map((c, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="rounded-2xl border p-7 flex flex-col gap-3 hover:bg-white/[0.02] transition-all"
                    style={{ borderColor: `${slide.accent}20`, background: `${slide.accent}05` }}>
                    <span className="text-[14px] font-extrabold uppercase tracking-widest mb-2.5" style={{ color: slide.accent }}>{c.label}</span>
                    <p className="text-[20px] leading-relaxed text-white font-medium">{c.desc}</p>
                  </motion.div>
                ))}
              </div>
            ) : slide.subType === 'variables' ? (
              <div className="grid grid-cols-1 gap-4">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-50 px-1" style={{ color: slide.accent }}>Technical Dictionary</div>
                {slide.variables?.map((v, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="rounded-2xl border p-7 flex flex-col gap-3 group hover:bg-white/[0.02] transition-all bg-white/[0.01] border-white/5">
                    <span className="text-[22px] font-black font-mono tracking-tight" style={{ color: slide.accent }}>{v.label}</span>
                    <p className="text-[18px] leading-relaxed text-white font-medium">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="rounded-2xl border p-6 flex gap-4"
                  style={{ background: `${slide.accent}08`, borderColor: `${slide.accent}20` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-none border"
                    style={{ background: `${slide.accent}15`, borderColor: `${slide.accent}25` }}>
                    <Play className="w-5 h-5" style={{ color: slide.accent }} />
                  </div>
                  <div>
                    <p className="text-[14px] font-extrabold uppercase tracking-widest mb-3 opacity-70" style={{ color: slide.accent }}>គោលបំណង</p>
                    <p className="text-[22px] text-white font-bold leading-normal">{slide.lab}</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                  className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-none border border-amber-500/20">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[14px] font-extrabold text-amber-500 uppercase tracking-widest block mb-3">PRO TIP</span>
                    <p className="text-[18px] text-amber-200/90 leading-relaxed font-medium italic">« {slide.tip} »</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-none border border-emerald-500/20">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[14px] font-extrabold text-emerald-400 uppercase tracking-widest block mb-3">លទ្ធផលរំពឹងទុក</span>
                    <p className="text-[18px] text-white font-medium leading-relaxed">{slide.result}</p>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Nav */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5">
              <button onClick={prev}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center group shadow-xl">
                <ChevronLeft className="w-6 h-6 text-zinc-400 group-hover:text-white" />
              </button>
              <button onClick={next}
                className="flex-1 h-14 rounded-2xl font-black text-[13px] uppercase tracking-[0.2em] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group overflow-hidden relative"
                style={{ background: slide.accent, color: '#000' }}>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                <span className="relative z-10">{current === displayPages.length - 1 ? 'បញ្ចប់មេរៀន' : 'ស្លាយបន្ទាប់'}</span>
                <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setShowNotes(!showNotes)}
                className={`w-14 h-14 rounded-2xl border transition-all shadow-xl flex items-center justify-center ${showNotes ? 'bg-amber-500/20 border-amber-500/40 text-amber-500' : 'bg-white/5 border-white/10 text-zinc-500 hover:text-white'}`}>
                <StickyNote className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* RIGHT PANEL */}
        {!isFullWidth && (
          <div className="flex-none lg:w-[55%] flex flex-col p-4 lg:p-8 xl:p-10 gap-4 overflow-hidden">
            {hasAnimation ? (
              <ThemeAnimation accent={slide.accent} slideId={slide.id} title={slide.title} chapter={chapterParam} />
            ) : (
              <>
                <div className="flex items-center gap-2 flex-none">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/8 bg-white/5"
                    style={{ color: slide.accent }}>
                    <Terminal className="w-3.5 h-3.5" />
                    Interactive Code Editor
                  </div>
                  <div className="ml-auto text-[10px] font-mono text-zinc-700 hidden sm:block">← → Navigate</div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={`code-${current}`}
                    initial={{ opacity: 0, scale: 0.99, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.99, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                    className="flex-1 overflow-hidden">
                    <CodePanel
                      code={slide.code}
                      filename={slide.filename}
                      accent={slide.accent}
                      terminalOutput={slide.terminalOutput}
                      subType={slide.subType as any}
                    />
                  </motion.div>
                </AnimatePresence>
              </>
            )}
          </div>
        )}
      </main>

      {/* ── NOTES PANEL ── */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-80 bg-[#12151e] border-l border-white/8 z-[100] shadow-2xl p-6 flex flex-col pt-24">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-amber-400">កំណត់ចំណាំ</h3>
                <p className="text-[10px] text-zinc-600 font-bold uppercase mt-0.5">{slide.id} · {slide.title}</p>
              </div>
              <button onClick={() => setShowNotes(false)} className="text-zinc-600 hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <textarea autoFocus
              value={notes[slide.id] || ''}
              onChange={e => saveNote(e.target.value)}
              placeholder="កត់ត្រានៅទីនេះ... (រក្សាទុកដោយស្វ័យប្រវត្តិ)"
              className="flex-1 w-full bg-black/40 rounded-xl p-4 text-sm text-zinc-300 resize-none outline-none border border-white/5 focus:border-amber-500/30 transition-all placeholder:text-zinc-700 font-mono"
            />
            <p className="mt-4 text-[10px] text-zinc-700 font-bold uppercase">Auto-saved to localStorage per slide</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}