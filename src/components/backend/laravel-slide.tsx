"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  Menu, X, ChevronDown, ArrowLeft,
} from 'lucide-react';

/* ─── TYPES ──────────────────────────────────────────────────────── */
interface Slide {
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  accent: string;
  bg: string;
  concepts: { label: string; desc: string }[];
  tip: string;
  lab: string;
  result: string;
  code: string;
  filename: string;
  terminal?: string;
  terminalOutput?: string;
  icon: React.ElementType;
}

/* ─── CHAPTERS ───────────────────────────────────────────────────── */
const CHAPTERS = [
  { id: 'setup',        label: '01 · សេចក្តីផ្តើម និងការដំឡើង',  color: '#f43f5e' },
  { id: 'routing',      label: '02 · Routing និង Controller',  color: '#f97316' },
  { id: 'blade',        label: '03 · Blade Engine',   color: '#22c55e' },
  { id: 'database',     label: '04 · Database និង Eloquent',  color: '#06b6d4' },
  { id: 'forms',        label: '05 · Form និង Validation',   color: '#eab308' },
  { id: 'auth',         label: '06 · Auth និង Security', color: '#a855f7' },
  { id: 'crud',         label: '07 · ប្រតិបត្តិការ CRUD',       color: '#ec4899' },
  { id: 'queues',       label: '08 · Queues និង Jobs',  color: '#fb923c' },
  { id: 'advanced',     label: '09 · មុខងារកម្រិតខ្ពស់',       color: '#3b82f6' },
  { id: 'api',          label: '10 · API និង Sanctum',  color: '#10b981' },
  { id: 'frontend',     label: '11 · Frontend Integration',  color: '#fbbf24' },
  { id: 'deploy',       label: '12 · ការដាក់ឱ្យដំណើរការ',     color: '#8b5cf6' },
  { id: 'todo',         label: '13 · កម្មវិធី Todo App',  color: '#0ea5e9' },
  { id: 'assignment',   label: '14 · គម្រោង E-commerce',  color: '#f472b6' },
];

/* ─── SLIDE DATA ─────────────────────────────────────────────────── */
const slides: Slide[] = [
  /* ── CHAPTER 1: SETUP ── */
  {
    id: 'L01-S1', chapter: 'setup',
    title: 'ប្រព័ន្ធ Ecosystem របស់ Laravel', subtitle: 'Herd, Sail និង Composer',
    accent: '#f43f5e',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(244,63,94,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Laravel Herd', desc: 'ផ្លូវដែលលឿនបំផុតទៅកាន់ Laravel: Zero-config PHP, Nginx និង DNS សម្រាប់ macOS។' },
      { label: 'Laravel Sail', desc: 'ការអភិវឌ្ឍន៍ផ្អែកលើ Docker ដើម្បីភាពស៊ីសង្វាក់គ្នារវាង Windows/Linux/Mac។' },
      { label: 'Composer', desc: 'PHP Package Manager: អ្នកគ្រប់គ្រងកញ្ចប់ដ៏សំខាន់សម្រាប់ Laravel dependencies។' },
      { label: 'env Config', desc: 'ការកំណត់កណ្តាលសម្រាប់ Database, mail និង app keys។' },
    ],
    tip: 'ប្រសិនបើប្រើ Mac? ប្រើ Herd។ វាលឿនជាង Docker ៥ដងសម្រាប់ការដំណើរការ PHP នៅលើ local។',
    lab: 'ដំឡើង Herd ឬ Sail ហើយបង្កើតគម្រោង Laravel ដំបូងរបស់អ្នក: laravel new my-app។',
    result: 'កម្មវិធី Laravel ថ្មីដែលដំណើរការនៅលើ localhost ឬ domain .test។',
    filename: 'terminal',
    code: `# 1. Install Laravel globally
composer global require laravel/installer

# 2. Spawn a new galaxy
laravel new nebula-project

# 3. Choose your starter kit
# -> None / Breeze / Jetstream`,
    terminal: 'laravel new nebula-project',
    terminalOutput: '   INFO  Galaxy [nebula-project] created successfully.',
    icon: Rocket,
  },
  {
    id: 'L01-S2', chapter: 'setup',
    title: 'រចនាសម្ព័ន្ធ Folder', subtitle: 'កន្លែងផ្ទុកឯកសារនីមួយៗ',
    accent: '#f43f5e',
    bg: 'radial-gradient(ellipse at 80% 30%, rgba(244,63,94,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'app/', desc: 'ផ្ទុក Models, Controllers និង Middleware logic។' },
      { label: 'routes/', desc: 'ផែនទី URL: web.php សម្រាប់ views, api.php សម្រាប់ endpoints។' },
      { label: 'resources/', desc: 'ផ្ទុក Assets: Blade, CSS (Tailwind) និង JS (Vite)។' },
      { label: 'database/', desc: 'ប្រវត្តិ Schema: Migrations និង Seeders។' },
    ],
    tip: 'ផ្តោតលើ app/ និង routes/ ជាមុនសិន។ ពួកវាគឺជាខួរក្បាលនៃប្រតិបត្តិការរបស់អ្នក។',
    lab: 'ចូលទៅក្នុង app/ directory ហើយស្វែងរកកន្លែងដែល Controllers ត្រូវបានរក្សាទុក។',
    result: 'យល់ច្បាស់ពីរចនាសម្ព័ន្ធ Folder ស្តង់ដាររបស់ Laravel។',
    filename: 'folders.md',
    code: `project/
├── app/          ← Business Logic
├── routes/       ← URLs
├── resources/    ← Views & Assets
├── database/     ← Schema
└── config/       ← Settings`,
    icon: HardDrive,
  },
  {
    id: 'L01-S3', chapter: 'setup',
    title: 'Artisan CLI', subtitle: 'កម្មវិធីការងាររបស់អ្នកអភិវឌ្ឍន៍',
    accent: '#f43f5e',
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(244,63,94,0.1) 0%, transparent 60%)',
    concepts: [
      { label: 'php artisan', desc: 'ចំណុចប្រទាក់បញ្ជា (CLI) ដែលមកជាមួយ Laravel។' },
      { label: 'Scaffolding', desc: 'បង្កើត Models, Controllers និង Migrations ក្នុងរយៈពេលប៉ុន្មានវិនាទី។' },
      { label: 'Maintenance', desc: 'ពាក្យបញ្ជាសម្រាប់សម្អាត Cache, ដំណើរការ Tasks និង Migrations។' },
      { label: 'Tinker', desc: 'REPL សម្រាប់ធ្វើអន្តរកម្មជាមួយ DB និង Models ក្នុងពេលវេលាជាក់ស្តែង។' },
    ],
    tip: 'វាយ "php artisan list" ដើម្បីមើលឧបករណ៍ដ៏មានឥទ្ធិពលរាប់រយដែលមាន។',
    lab: 'បើក Terminal ហើយវាយ "php artisan tinker" បន្ទាប់មកវាយ "1 + 1"។',
    result: 'REPL បង្ហាញលទ្ធផល "2" ដែលបញ្ជាក់ថា Artisan កំពុងដំណើរការ។',
    filename: 'artisan.sh',
    code: `# Create a new model + migration + controller
php artisan make:model Task -mc

# List all your apps routes
php artisan route:list

# Launch the interactive logic shell
php artisan tinker`,
    terminal: 'php artisan list',
    terminalOutput: '   Laravel Framework 11.0.0\n   Usage: command [options] [arguments]',
    icon: Terminal,
  },
  {
    id: 'L01-S4', chapter: 'setup',
    title: 'ការកំណត់ Configuration', subtitle: 'Dotenv និង App Keys',
    accent: '#f43f5e',
    bg: 'radial-gradient(ellipse at center, rgba(244,63,94,0.08) 0%, transparent 70%)',
    concepts: [
      { label: '.env File', desc: 'រក្សាទុកទិន្នន័យសំខាន់ៗដូចជា DB Passwords និង API Keys (កុំ push ទៅ git!)។' },
      { label: '.env.example', desc: 'គំរូសម្រាប់សហការីក្នុងការបំពេញការកំណត់ local ផ្ទាល់ខ្លួនរបស់ពួកគេ។' },
      { label: 'App Key', desc: 'ខ្សែអក្សរ ៣២ តួអង្គដែលមានសុវត្ថិភាពសម្រាប់ការអ៊ីនគ្រីបទិន្នន័យ។' },
      { label: 'config/', desc: 'ឯកសារ PHP ដែលអានពី .env សម្រាប់ការកំណត់ទូទាំងកម្មវិធី។' },
    ],
    tip: 'ប្រសិនបើគេហទំព័របង្ហាញកំហុស decryption សូមដំណើរការ php artisan key:generate។',
    lab: 'បើកឯកសារ .env ហើយប្តូរ DB_DATABASE ទៅជា "academy_db"។',
    result: 'កម្មវិធីត្រូវបានកំណត់ឱ្យស្វែងរក Database ឈ្មោះ "academy_db"។',
    filename: '.env',
    code: `APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:Abc123...
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306`,
    icon: Key,
  },

  /* ── CHAPTER 2: ROUTING & CONTROLLERS ── */
  {
    id: 'L02-S1', chapter: 'routing',
    title: 'Route Engine', subtitle: 'ការភ្ជាប់ URL ទៅកាន់ Logic',
    accent: '#f97316',
    bg: 'radial-gradient(ellipse at 30% 50%, rgba(249,115,22,0.15) 0%, transparent 60%)',
    concepts: [
      { label: 'Static Routes', desc: 'ភ្ជាប់ URL ផ្ទាល់ទៅកាន់ View ឬ Callback (ឧទាហរណ៍: /about)។' },
      { label: 'Route Params', desc: 'ផ្នែកឌីណាមិកដូចជា /user/{id} សម្រាប់ទាញយកទិន្នន័យ។' },
      { label: 'Named Routes', desc: 'ប្រើ route("home") ក្នុងកូដដើម្បីការពារបញ្ហាដាច់ Link។' },
      { label: 'Grouping', desc: 'អនុវត្ត Prefix ឬ Middleware រួមគ្នាទៅលើ Routes ជាច្រើន។' },
    ],
    tip: 'តែងតែដាក់ឈ្មោះឱ្យ Routes របស់អ្នកដោយប្រើ ->name("...")។ វាធ្វើឱ្យ URL របស់អ្នកងាយស្រួលប្តូរ។',
    lab: 'បង្កើត Route /hello/{name} ដែលបង្ហាញការសួរសុខទុក្ខត្រឡប់មកវិញ។',
    result: 'ចូលទៅកាន់ /hello/ari នឹងឃើញ "Hello, ari" នៅក្នុង Browser។',
    filename: 'routes/web.php',
    code: `<?php
    
use Illuminate\\Support\\Facades\\Route;

Route::get('/', fn() => view('welcome'));

// Parameters with a name
Route::get('/user/{id}', function ($id) {
    return "Profile: $id";
})->name('user.profile');`,
    icon: Globe,
  },
  {
    id: 'L02-S2', chapter: 'routing',
    title: 'Controllers', subtitle: 'ខួរក្បាលនៃប្រតិបត្តិការ',
    accent: '#f97316',
    bg: 'radial-gradient(ellipse at 70% 40%, rgba(249,115,22,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'make:controller', desc: 'បង្កើត Class ថ្មីនៅក្នុង app/Http/Controllers។' },
      { label: 'Methods', desc: 'គិតថា Methods គឺជា "សកម្មភាព" (Actions) ដូចជា list, save, delete។' },
      { label: 'Namespacing', desc: 'រក្សាកូដរបស់អ្នកឱ្យមានរបៀបរៀបរយ និងការពារការជាន់ឈ្មោះគ្នា។' },
      { label: 'Return types', desc: 'Controllers គួរតែផ្តល់ត្រឡប់មកវិញនូវ view(), redirect() ឬ json()។' },
    ],
    tip: 'រក្សា web.php ឱ្យស្អាត។ កូដ Logic ទាំងអស់គួរតែស្ថិតនៅក្នុង Controllers។',
    lab: 'បង្កើត ProjectController និងសរសេរ Method "index" ដែលផ្តល់ត្រឡប់មកវិញនូវ View។',
    result: 'Controller ថ្មីត្រូវបានបង្កើត និងភ្ជាប់ទៅកាន់ Route ដោយជោគជ័យ។',
    filename: 'app/Http/Controllers/ProjectController.php',
    code: `<?php

namespace App\\Http\\Controllers;

class ProjectController extends Controller {
    public function index() {
        return view('projects.index');
    }
}`,
    terminal: 'php artisan make:controller ProjectController',
    terminalOutput: '   INFO  Controller created successfully.',
    icon: Server,
  },
  {
    id: 'L02-S3', chapter: 'routing',
    title: 'Route-Model Binding', subtitle: 'ផ្លូវកាត់ដ៏អស្ចារ្យ',
    accent: '#f97316',
    bg: 'radial-gradient(ellipse at center, rgba(249,115,22,0.08) 0%, transparent 70%)',
    concepts: [
      { label: 'Implicit Binding', desc: 'Laravel ទាញយកទិន្នន័យពី DB ដោយស្វ័យប្រវត្តិនូវរាល់ពេលដែល Parameter ដូចឈ្មោះ Model។' },
      { label: 'IDs', desc: 'តាមលំនាំដើម Laravel ស្វែងរកតាមរយៈ Column "id"។' },
      { label: 'Keys', desc: 'អ្នកអាចប្តូរការស្វែងរកទៅ "slug" សម្រាប់ SEO friendly URLs។' },
      { label: '404 Handling', desc: 'Laravel បង្ហាញទំព័រ 404 ដោយស្វ័យប្រវត្តិប្រសិនបើមិនឃើញទិន្នន័យ។' },
    ],
    tip: 'ការប្រើ (Task $task) ជា type-hint ជំនួសឱ្យការសរសេរ "Task::findOrFail($id)"។',
    lab: 'កែសម្រួល Route ឱ្យប្រើ Implicit Model Binding សម្រាប់ Model "Task"។',
    result: 'កូដខ្លីជាងមុន ស្អាតជាងមុន និងរៀបចំទិន្នន័យដែលបាត់ដោយស្វ័យប្រវត្តិ។',
    filename: 'routes/web.php',
    code: `use App\\Models\\Task;

// Laravel fetches the Task from DB for you!
Route::get('/tasks/{task}', function (Task $task) {
    return $task->title;
});`,
    icon: Zap,
  },
  {
    id: 'L02-S4', chapter: 'routing',
    title: 'សេចក្តីផ្តើមអំពី Middleware', subtitle: 'អ្នកយាមច្រកទ្វារ',
    accent: '#f97316',
    bg: 'radial-gradient(ellipse at 10% 80%, rgba(249,115,22,0.06) 0%, transparent 60%)',
    concepts: [
      { label: 'Filters', desc: 'ស្រទាប់ Middleware ដែលកូដត្រូវឆ្លងកាត់មុនពេលទៅដល់ Controller។' },
      { label: 'Verification', desc: 'ប្រើសម្រាប់ Auth, CSRF និងការផ្ទៀងផ្ទាត់ប្រសិនបើអ្នកប្រើប្រាស់ជា Admin។' },
      { label: 'Global vs Route', desc: 'ដំណើរការលើរាល់ការស្នើសុំ ឬសម្រាប់តែ URL ជាក់លាក់។' },
      { label: 'Chaining', desc: 'អនុវត្ត Guards ច្រើនដោយប្រើ ->middleware(["auth", "verified"])។' },
    ],
    tip: 'គិតថា Middleware ដូចជាម៉ាស៊ីនស្កែនសុវត្ថិភាពនៅព្រលានយន្តហោះ៖ ទប់ស្កាត់អ្វីដែលមិនល្អ និងអនុញ្ញាតអ្វីដែលល្អ។',
    lab: 'ចាក់សោ Route ដើម្បីឱ្យតែអ្នកប្រើប្រាស់ដែលបាន Log in ប៉ុណ្ណោះដែលអាចចូលបាន។',
    result: 'អ្នកប្រើប្រាស់ដែលមិនទាន់ Log in នឹងត្រូវបញ្ជូនត្រឡប់ទៅទំព័រ Login។',
    filename: 'routes/web.php',
    code: `Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth']);`,
    icon: Lock,
  },

  /* ── CHAPTER 3: BLADE TEMPLATING ── */
  {
    id: 'L03-S1', chapter: 'blade',
    title: 'Blade Engine', subtitle: 'Elegant PHP Views',
    accent: '#22c55e',
    bg: 'radial-gradient(ellipse at 20% 60%, rgba(34,197,94,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Echoing', desc: 'ប្រើ {{ $variable }} ដើម្បីបង្ហាញទិន្នន័យដោយសុវត្ថិភាព។' },
      { label: 'Logic', desc: '@if, @foreach, @empty - រចនាសម្ព័ន្ធគ្រប់គ្រងសាមញ្ញ។' },
      { label: 'Shortcuts', desc: '@isset និង @auth សម្រាប់ពិនិត្យលក្ខខណ្ឌរហ័ស។' },
      { label: 'Security', desc: '@csrf បង្កើត keys សម្ងាត់សម្រាប់ការការពារ Form ដោយស្វ័យប្រវត្តិ។' },
    ],
    tip: 'Laravel ការពាររាល់ខ្លឹមសារក្នុង {{ }} តាមលំនាំដើម។ ប្រើ {!! !!} សម្រាប់តែខ្សែអក្សរ HTML ដែលទុកចិត្តប៉ុណ្ណោះ។',
    lab: 'បង្កើតទំព័រដែលបង្ហាញ "Welcome" លុះត្រាតែអ្នកប្រើប្រាស់បានបញ្ជាក់អត្តសញ្ញាណ។',
    result: 'អ្នកប្រើប្រាស់ឃើញខ្លឹមសារឌីណាមិកផ្អែកលើស្ថានភាពរបស់ពួកគេ។',
    filename: 'home.blade.php',
    code: `@auth
    <h1>Welcome, {{ Auth::user()->name }}</h1>
@else
    <h1>Please Login</h1>
@endauth`,
    icon: Layout,
  },
  {
    id: 'L03-S2', chapter: 'blade',
    title: 'Template Inheritance', subtitle: 'Master Layouts',
    accent: '#22c55e',
    bg: 'radial-gradient(ellipse at 80% 20%, rgba(34,197,94,0.12) 0%, transparent 55%)',
    concepts: [
      { label: '@extends', desc: 'ទំព័រស្ដង់ដារដែលទទួលមរតកពីរចនាសម្ព័ន្ធពី Master Parent View។' },
      { label: '@yield', desc: 'Parent កំណត់ "ចន្លោះ" ដែលមាតិកាកូននឹងចូលទៅដាក់។' },
      { label: '@section', desc: 'កូនបំពេញចន្លោះនោះជាមួយនឹង HTML ជាក់លាក់របស់វា។' },
      { label: '@include', desc: 'បញ្ជូលផ្នែកតូចៗដូចជា Navigation ឬ Footers ចូលទៅក្នុងទំព័រណាមួយ។' },
    ],
    tip: 'Layouts ធ្វើឱ្យការថែទាំមានភាពងាយស្រួល។ ប្តូរ Navbar តែម្តង វានឹងប្តូរនៅគ្រប់ទីកន្លែង!',
    lab: 'បង្កើត "layout.blade.php" ហើយហៅវាមកប្រើនៅក្នុងទំព័រ "contact.blade.php"។',
    result: 'ទំព័រទំនាក់ទំនងបង្ហាញ Header និង Footer ពី Layout។',
    filename: 'resources/views/contact.blade.php',
    code: `@extends('layouts.app')

@section('content')
    <p>Contact us at support@app.com</p>
@endsection`,
    icon: Box,
  },
  {
    id: 'L03-S3', chapter: 'blade',
    title: 'Blade Components', subtitle: 'Modular UI Design',
    accent: '#22c55e',
    bg: 'radial-gradient(ellipse at center, rgba(34,197,94,0.08) 0%, transparent 70%)',
    concepts: [
      { label: 'Tags', desc: 'ប្រើ <x-name /> សម្រាប់ UI elements ដែលអាចប្រើឡើងវិញបានយ៉ាងស្អាត។' },
      { label: 'Slots', desc: 'កំណត់កន្លែងដែល HTML បន្ថែមនឹងត្រូវដាក់នៅក្នុង Component។' },
      { label: 'Attributes', desc: 'បញ្ជូនទិន្នន័យ ឬ CSS classes ទៅកាន់ Component ដូចជា Standard HTML Attributes។' },
      { label: 'Reusability', desc: 'បង្កើតតែម្តងសម្រាប់៖ Button, Input, Modal, Alert — ហើយប្រើបានគ្រប់ទីកន្លែង។' },
    ],
    tip: 'Components គឺជាស្ទីលទំនើប។ ប្រើពួកវាសម្រាប់រចនាប្រព័ន្ធ (Design System) របស់អ្នក។',
    lab: 'បង្កើត "Alert" component ដែលអាចប្រើឡើងវិញបាន និងទទួលយក "type" (success/error)។',
    result: 'បដាព្រមាន (Alert banners) ដែលស្អាត និងមានរបៀបរៀបរយចេញពីឯកសារតែមួយ។',
    filename: 'views/components/alert.blade.php',
    code: `<div class="p-4 rounded {{ $type == 'error' ? 'bg-red-500' : 'bg-green-500' }}">
    {{ $slot }}
</div>

<!-- Usage -->
<x-alert type="success">Mission Accomplished!</x-alert>`,
    icon: Box,
  },
  {
    id: 'L03-S4', chapter: 'blade',
    title: 'Stacks & Pushes', subtitle: 'Dynamic Asset Loading',
    accent: '#22c55e',
    bg: 'radial-gradient(ellipse at 10% 80%, rgba(34,197,94,0.06) 0%, transparent 60%)',
    concepts: [
      { label: '@stack', desc: 'ដាក់កន្លែងសម្រាប់ Scripts/Styles នៅក្នុង Layout របស់អ្នក។' },
      { label: '@push', desc: 'បញ្ជូនកូដពីទំព័រជាក់លាក់ណាមួយទៅក្នុង Layout Stack នោះ។' },
      { label: 'Conditional Loading', desc: 'ផ្ទុក Script សម្រាប់តែទំព័រ "Location" ប៉ុណ្ណោះ។' },
      { label: 'Efficiency', desc: 'រក្សា JS bundle ឱ្យតូចដោយផ្ទុកតែអ្វីដែលត្រូវការ។' },
    ],
    tip: 'ប្រើ Stacks ដើម្បីរក្សា Footer របស់អ្នកឱ្យស្អាត។ មិនមានកូដ <script> រាយប៉ាយទៀតទេ!',
    lab: 'បញ្ជូន JS "alert" ជាក់លាក់មួយទៅក្នុង Footer នៃទំព័រទំនាក់ទំនង។',
    result: 'កូដដំណើរការតែលើទំព័រដែលបានកំណត់ប៉ុណ្ណោះ។',
    filename: 'resources/views/master.blade.php',
    code: `<!DOCTYPE html>
<html>
<body>
    @yield('content')
    @stack('scripts')
</body>
</html>

<!-- Child page -->
@push('scripts')
    <script>console.log("Contact Page Loaded");</script>
@endpush`,
    icon: List,
  },

  /* ── CHAPTER 4: DATABASE & ELOQUENT ── */
  {
    id: 'L04-S1', chapter: 'database',
    title: 'Migrations & Schema', subtitle: 'Database Version Control',
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at 15% 45%, rgba(6,182,212,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Migrations', desc: 'ឯកសារប្លង់ (Blueprint) សម្រាប់បង្កើត ឬកែសម្រួល Database Tables។' },
      { label: 'Schema Builder', desc: 'Fluent API: $table->string("name") ដើម្បីកំណត់ Column យ៉ាងងាយស្រួល។' },
      { label: 'Rollbacks', desc: 'មានកំហុសមែនទេ? ត្រឡប់ការ Migration ចុងក្រោយវិញដោយប្រើពាក្យបញ្ជាតែមួយ។' },
      { label: 'Team Sync', desc: 'មិនចាំបាច់ផ្ញើ SQL dumps; គ្រាន់តែដំណើរការ "migrate" ដើម្បីឱ្យទិន្នន័យសហការីទាន់សម័យ។' },
    ],
    tip: 'ចាត់ទុក Migrations ដូចជា Git សម្រាប់ Database របស់អ្នក។ កុំប្តូរ Tables ដោយផ្ទាល់។',
    lab: 'បង្កើត Migration សម្រាប់ "posts" table ដែលមាន Field title និង body។',
    result: 'បង្កើត Table បានជោគជ័យ ដែលត្រូវបានបញ្ជាក់នៅក្នុង Terminal។',
    filename: 'create_posts_table.php',
    code: `Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title'); // varchar(255)
    $table->text('body');    // long text
    $table->timestamps();    // created_at & updated_at
});`,
    terminal: 'php artisan migrate',
    terminalOutput: '   INFO  Running migrations.\\n   DONE  CreatePostsTable successfully.',
    icon: Database,
  },
  {
    id: 'L04-S2', chapter: 'database',
    title: 'Eloquent Models', subtitle: 'Object-Relational Mapping',
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at 85% 55%, rgba(6,182,212,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'Active Record', desc: 'រាល់ Model class តំណាងឱ្យ Table មួយ; រាល់ Object តំណាងឱ្យ Row មួយ។' },
      { label: 'Fluent Queries', desc: 'Post::where("active", true)->get() គឺងាយស្រួលយល់ដូចភាសាអង់គ្លេស។' },
      { label: 'Fillables', desc: 'បញ្ជីសុវត្ថិភាពសម្រាប់ Field ដែលអាចត្រូវបានប្តូរក្នុងពេលតែមួយ (Bulk Update)។' },
      { label: 'Casting', desc: 'បម្លែង JSON strings ទៅជា Arrays (ឬ Dates) ដោយស្វ័យប្រវត្តិ។' },
    ],
    tip: 'Eloquent models គឺជាបេះដូងនៃ Data logic របស់អ្នក។ រក្សាពួកវាឱ្យខ្លី និងងាយយល់។',
    lab: 'បង្កើត User model ថ្មី កំណត់ឈ្មោះរបស់វា ហើយរក្សាទុកវាទៅក្នុង Database។',
    result: 'ទិន្នន័យថ្មីបង្ហាញនៅក្នុង users table របស់អ្នក។',
    filename: 'app/Models/Post.php',
    code: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Post extends Model {
    protected $fillable = ['title', 'body', 'user_id'];
    
    // Automatic JSON casting
    protected $casts = ['settings' => 'array'];
}`,
    icon: Layers,
  },
  {
    id: 'L04-S3', chapter: 'database',
    title: 'ទំនាក់ទំនងរវាង Tables (Relationships)', subtitle: 'ការភ្ជាប់ទំនាក់ទំនងទិន្នន័យ',
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at center, rgba(6,182,212,0.08) 0%, transparent 70%)',
    concepts: [
      { label: 'One-to-One', desc: 'អ្នកប្រើប្រាស់ម្នាក់មាន Profile តែមួយគត់។' },
      { label: 'One-to-Many', desc: 'Post មួយមាន Comments ច្រើន; នេះគឺជាការតភ្ជាប់ទូទៅបំផុត។' },
      { label: 'Many-to-Many', desc: 'សិស្ស និងមេរៀន៖ សិស្សច្រើននាក់រៀនមេរៀនច្រើន។' },
      { label: 'Eager Loading', desc: 'ប្រើ User::with("posts") ដើម្បីការពារបញ្ហាល្បឿន "N+1"។' },
    ],
    tip: 'តែងតែប្រើ Eager Loading នៅពេលប្រើ Loop ដើម្បីរក្សា Database ឱ្យដំណើរការលឿន!',
    lab: 'កំណត់ទំនាក់ទំនង "hasMany" នៅក្នុង User model សម្រាប់ blog posts របស់ពួកគេ។',
    result: 'អ្នកអាចប្រើ $user->posts ហើយទទួលបានបណ្តុំទិន្នន័យយ៉ាងស្អាត។',
    filename: 'app/Models/User.php',
    code: `public function posts() {
    return $this->hasMany(Post::class);
}

// In the controller:
$users = User::with('posts')->get();`,
    icon: Workflow,
  },
  {
    id: 'L04-S4', chapter: 'database',
    title: 'Factories & Seeders', subtitle: 'ការផលិតទិន្នន័យយ៉ាងច្រើន',
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(6,182,212,0.06) 0%, transparent 60%)',
    concepts: [
      { label: 'Seeders', desc: 'បំពេញទិន្នន័យស្តង់ដារទៅក្នុង Database។' },
      { label: 'Factories', desc: 'អ្នកបង្កើតទិន្នន័យ "ក្លែងក្លាយ" (Fake data) សម្រាប់សាកល្បង (ដោយប្រើ Faker)។' },
      { label: 'Mass Creation', desc: 'បង្កើត Users ចំនួន ១,០០០ នាក់ក្នុងរយៈពេល ១ វិនាទីដើម្បីតេស្តល្បឿន។' },
      { label: 'Refresh', desc: 'លុប និងបំពេញទិន្នន័យក្នុង DB ឡើងវិញគ្រប់ពេលដោយប្រើពាក្យបញ្ជាតែមួយ។' },
    ],
    tip: 'ប្រើ Factories ក្នុងកំឡុងពេលអភិវឌ្ឍន៍ ដើម្បីមើលថា UI របស់អ្នកមើលទៅដូចម្តេចជាមួយនឹងខ្លឹមសារពិតៗ។',
    lab: 'ដំណើរការ Seeder ដើម្បីបំពេញគម្រោងរបស់អ្នកជាមួយនឹង blog posts ក្លែងក្លាយចំនួន ៥០។',
    result: 'UI របស់កម្មវិធីមានទិន្នន័យពេញលេញដោយមិនចាំបាច់វាយបញ្ចូលដោយដៃ។',
    filename: 'database/seeders/DatabaseSeeder.php',
    code: `public function run(): void {
    // Generate 10 random users
    User::factory(10)->create();
    
    // Generate 50 posts for the first user
    Post::factory(50)->create([
        'user_id' => 1
    ]);
}`,
    terminal: 'php artisan db:seed',
    terminalOutput: '   INFO  Seeding database.\\n   DONE  DatabaseSeeder successfully.',
    icon: Database,
  },

  /* ── CHAPTER 5: FORMS & VALIDATION ── */
  {
    id: 'L05-S1', chapter: 'forms',
    title: 'Form និង CSRF', subtitle: 'ការបញ្ជូនទិន្នន័យដោយសុវត្ថិភាព',
    accent: '#eab308',
    bg: 'radial-gradient(ellipse at 50% 10%, rgba(234,179,8,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'CSRF Shield', desc: 'Token សម្ងាត់ដែលការពារការវាយប្រហារ Cross-Site Request Forgery។' },
      { label: 'POST Action', desc: 'រាល់ផ្ទាំងដែលប្តូរទិន្នន័យត្រូវតែជា POST (ឬ PUT/DELETE តាមរយៈ spoofing)។' },
      { label: 'Method Spoofing', desc: 'HTML forms អនុញ្ញាតតែ GET/POST; ប្រើ @method("PATCH") សម្រាប់ការ Update។' },
      { label: 'Persistence', desc: 'ប្រើ helper old() ដើម្បីរក្សាតម្លៃដែលបានបញ្ចូលបន្ទាប់ពី Validation បរាជ័យ។' },
    ],
    tip: 'តែងតែដាក់ @csrf។ បើគ្មានវាទេ Laravel នឹងទប់ស្កាត់ការស្នើសុំរបស់អ្នកជាមួយនឹងកំហុស 419។',
    lab: 'បង្កើត Form ដែលផ្ញើ title និង body ទៅកាន់ "update" route ដោយប្រើ PATCH method។',
    result: 'ការបញ្ជូនទិន្នន័យដំណើរការយ៉ាងល្អឥតខ្ចោះជាមួយនឹងសុវត្ថិភាពពេញលេញ។',
    filename: 'edit_post.blade.php',
    code: `<form action="/posts/{{ $id }}" method="POST">
    @csrf
    @method('PATCH')
    
    <input name="title" value="{{ old('title', $post->title) }}">
    <button>Submit</button>
</form>`,
    icon: Edit3,
  },
  {
    id: 'L05-S2', chapter: 'forms',
    title: 'Validation Logic', subtitle: 'ការត្រួតពិនិត្យទិន្នន័យ',
    accent: '#eab308',
    bg: 'radial-gradient(ellipse at 50% 90%, rgba(234,179,8,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'Declarative Rules', desc: 'ប្រើ "required|email|unique:users" ដើម្បីបញ្ជាក់ពីអ្វីដែលអ្នករំពឹងទុក។' },
      { label: 'Automatic Redirects', desc: 'Laravel បញ្ជូនអ្នកប្រើប្រាស់ត្រឡប់ទៅ Form វិញដោយស្វ័យប្រវត្តិប្រសិនបើ Validation បរាជ័យ។' },
      { label: 'Inline Errors', desc: 'ប្រើ @error directive ដើម្បីបង្ហាញសារកំហុសពណ៌ក្រហមនៅក្រោមប្រអប់បញ្ចូលនីមួយៗ។' },
      { label: 'Security', desc: 'Validation គឺជាខ្សែការពារទីមួយរបស់អ្នកប្រឆាំងនឹងការបញ្ចូលទិន្នន័យមិនល្អទៅក្នុង Database។' },
    ],
    tip: 'កុំទុកចិត្តទិន្នន័យរបស់អ្នកប្រើប្រាស់។ ប្រសិនបើ Field មិនមាននៅក្នុង $validated array របស់អ្នកទេ កុំរក្សាទុកវា!',
    lab: 'សរសេរ Validation rule សម្រាប់ "slug" ដែលត្រូវតែមានតែមួយគត់ (Unique) នៅក្នុង posts table។',
    result: 'ប្រព័ន្ធបដិសេធ slug ដែលស្ទួនគ្នា និងបង្ហាញសារកំហុសយ៉ាងសមរម្យ។',
    filename: 'UserController.php',
    code: `public function store(Request $request) {
    $data = $request->validate([
        'email' => 'required|email|unique:users',
        'age'   => 'integer|min:18',
    ]);
    
    User::create($data); // Safe & clean
}`,
    icon: Search,
  },
  {
    id: 'L05-S3', chapter: 'forms',
    title: 'Form Requests', subtitle: 'ការសំអាត Controller ឱ្យស្អាត',
    accent: '#eab308',
    bg: 'radial-gradient(ellipse at center, rgba(234,179,8,0.08) 0%, transparent 70%)',
    concepts: [
      { label: 'Separation', desc: 'ផ្លាស់ប្តូរ Validation ដែលស្មុគស្មាញចេញពី Controller ទៅក្នុង Class ផ្ទាល់ខ្លួនរបស់វា។' },
      { label: 'Authorization', desc: 'Method authorize() អនុញ្ញាតឱ្យអ្នកត្រួតពិនិត្យថា តើអ្នកប្រើប្រាស់ត្រូវបានអនុញ្ញាតឱ្យបញ្ជូន Form នេះដែរឬទេ។' },
      { label: 'Rules Method', desc: 'កន្លែងរួមមួយយ៉ាងស្អាតសម្រាប់ការផ្ទៀងផ្ទាត់ Logic ទាំងអស់របស់អ្នក។' },
      { label: 'Reusability', desc: 'ចែករំលែក Validation rules ដូចគ្នាទៅកាន់ Controllers ជាច្រើន។' },
    ],
    tip: 'ប្រសិនបើ Method ក្នុង Controller របស់អ្នកមានការ Validation លើសពី ៥ បន្ទាត់ សូមបង្កើត Form Request។',
    lab: 'បង្កើត StorePostRequest ហើយផ្លាស់ប្តូរ Validation rules របស់អ្នកទៅក្នុងនោះ។',
    result: 'Controller ឥឡូវនេះមានកូដយ៉ាងខ្លី និងស្អាត។',
    filename: 'app/Http/Requests/StorePostRequest.php',
    code: `public function rules(): array {
    return [
        'title' => 'required|max:255',
        'tags'  => 'array|min:1',
    ];
}

// In Controller:
public function store(StorePostRequest $request) { ... }`,
    terminal: 'php artisan make:request StorePostRequest',
    terminalOutput: '   INFO  Request created successfully.',
    icon: Workflow,
  },
  {
    id: 'L05-S4', chapter: 'forms',
    title: 'Flash Messaging', subtitle: 'ការផ្តល់ដំណឹងត្រឡប់មកវិញ',
    accent: '#eab308',
    bg: 'radial-gradient(ellipse at 90% 10%, rgba(234,179,8,0.06) 0%, transparent 60%)',
    concepts: [
      { label: 'Flash Session', desc: 'ទិន្នន័យដែលមានក្នុងរយៈពេលតែមួយទំព័រប៉ុណ្ណោះ (ល្អឥតខ្ចោះសម្រាប់សារ "ជោគជ័យ!")។' },
      { label: 'with() Helper', desc: 'ប្រើ ->with("status", "Saved") ទៅលើការ Redirect របស់អ្នកសម្រាប់សារងាយៗ។' },
      { label: 'UI Feedback', desc: 'ពិនិត្យ if(session("success")) នៅក្នុង Blade header ដើម្បីបង្ហាញបដាព័ត៌មាន។' },
      { label: 'Persistence', desc: 'កំហុសផ្សេងៗក៏ត្រូវបានបញ្ជូនដោយស្វ័យប្រវត្តិតាមរយៈ validator ផងដែរ។' },
    ],
    tip: 'អ្នកប្រើប្រាស់ចូលចិត្តការឆ្លើយតប។ តែងតែប្រាប់ពួកគេនៅពេលដែលពួកគេ "រក្សាទុក" បានជោគជ័យ!',
    lab: 'បញ្ជូនទៅកាន់ទំព័រដើមវិញជាមួយនឹងសារស្ថានភាព "Post Created"។',
    result: 'បទពិសោធន៍អ្នកប្រើប្រាស់ (UX) ល្អជាមួយនឹងបដាពណ៌បៃតងដែលបញ្ជាក់ពីសកម្មភាពបានសម្រេច។',
    filename: 'PostController.php',
    code: `return redirect('/posts')
    ->with('success', 'New post is live!');

// In Blade:
@if (session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
@endif`,
    icon: Activity,
  },

  /* ── CHAPTER 6: AUTHENTICATION & SECURITY ── */
  {
    id: 'L06-S1', chapter: 'auth',
    title: 'យុទ្ធសាស្ត្រ Authentication', subtitle: 'Breeze, Jetstream និង Fortify',
    accent: '#a855f7',
    bg: 'radial-gradient(ellipse at 0% 0%, rgba(168,85,247,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Starter Kits', desc: 'Breeze (Minimal/Blade/Inertia) និង Jetstream (Pro/Livewire) ជួយចាប់ផ្តើមកម្មវិធីរបស់អ្នកយ៉ាងរហ័ស។' },
      { label: 'Automation', desc: 'Laravel រៀបចំ Login, Registration, Password Resets និង Verification មកស្រាប់តែម្តង។' },
      { label: 'Secure Storage', desc: 'Password ត្រូវបាន Hash ដោយស្វ័យប្រវត្តិតាមរយៈ Argon2 ឬ Bcrypt — ដែលជាស្តង់ដារខ្ពស់ក្នុងឧស្សាហកម្ម។' },
      { label: 'Guard System', desc: 'កំណត់ពីរបៀបដែលអ្នកប្រើប្រាស់ត្រូវបានផ្ទៀងផ្ទាត់ (Session សម្រាប់ web, Token សម្រាប់ API)។' },
    ],
    tip: 'កុំព្យាយាមបង្កើតប្រព័ន្ធ Auth ខ្លួនឯងឡើងវិញ។ ប្រព័ន្ធ Auth របស់ Laravel ត្រូវបានតេស្តយ៉ាងហ្មត់ចត់ និងមានសុវត្ថិភាពសម្រាប់អ្នកប្រើប្រាស់រាប់លាននាក់។',
    lab: 'ដំឡើង Laravel Breeze ហើយដំណើរការ migrations ដើម្បីបើកដំណើរការ Dashboard។',
    result: 'ប្រព័ន្ធ Auth ពេញលេញដែលដំណើរការលើ Local machine របស់អ្នកភ្លាមៗ។',
    filename: 'terminal',
    code: `# 1. Install Breeze
composer require laravel/breeze --dev
php artisan breeze:install blade

# 2. Build the database
php artisan migrate`,
    icon: Fingerprint,
    terminal: 'php artisan breeze:install',
    terminalOutput: '   INFO  Authentication scaffolding installed.',
  },
  {
    id: 'L06-S2', chapter: 'auth',
    title: 'Authorization Gates', subtitle: 'ស្រទាប់កំណត់សិទ្ធិ (Permissions)',
    accent: '#a855f7',
    bg: 'radial-gradient(ellipse at 100% 100%, rgba(168,85,247,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'Gates', desc: 'ការត្រួតពិនិត្យ true/false រហ័សសម្រាប់សកម្មភាពទូទៅ (ឧទាហរណ៍: "is-admin")។' },
      { label: 'Policies', desc: 'Class ដែលប្រមូលផ្តុំ Logic កំណត់សិទ្ធិសម្រាប់ Model ជាក់លាក់ (ឧទាហរណ៍: PostPolicy)។' },
      { label: 'Middleware Gate', desc: 'កំណត់ការចូលប្រើប្រាស់ Routes ផ្អែកលើតួនាទី (Roles) របស់អ្នកប្រើប្រាស់។' },
      { label: 'Guest Access', desc: 'រៀបចំខ្លឹមសារសម្រាប់អ្នកចូលមើលធម្មតា ធៀបនឹងអ្នកប្រើប្រាស់ដែលបានចុះឈ្មោះក្នុង Templates របស់អ្នក។' },
    ],
    tip: 'Authentication ពិនិត្យថា តើអ្នកជា "នរណា"។ Authorization ពិនិត្យថា តើអ្នកត្រូវបាន "អនុញ្ញាតឱ្យធ្វើអ្វី"។',
    lab: 'បង្កើត Policy ដែលអនុញ្ញាតឱ្យតែអ្នកប្រើប្រាស់ប្តូរ ឬលុប Post របស់ខ្លួនឯងប៉ុណ្ណោះ។',
    result: 'អ្នកប្រើប្រាស់ដែលមិនមានសិទ្ធិ នឹងត្រូវបានទប់ស្កាត់ពីសកម្មភាពលុប ឬកែប្រែ។',
    filename: 'app/Policies/PostPolicy.php',
    code: `public function delete(User $user, Post $post) {
    return $user->id === $post->user_id;
}

// Use in Blade:
@can('delete', $post)
    <button>Delete</button>
@endcan`,
    icon: Shield,
  },
  {
    id: 'L06-S3', chapter: 'auth',
    title: 'Sanctum & API Tokens', subtitle: 'សុវត្ថិភាពសម្រាប់ Mobile និង SPA',
    accent: '#a855f7',
    bg: 'radial-gradient(ellipse at center, rgba(168,85,247,0.08) 0%, transparent 70%)',
    concepts: [
      { label: 'Token Issuance', desc: 'បង្កើត Token សម្រាប់ Mobile apps ដើម្បីចូលប្រើ API របស់អ្នក។' },
      { label: 'Abilities', desc: 'កំណត់សិទ្ធិជាក់លាក់ឱ្យ tokens (ឧទាហរណ៍ "read-only" ធៀបនឹង "delete-posts")។' },
      { label: 'SPA Auth', desc: 'ប្រើ stateful cookies សម្រាប់ React/Vue frontends ជំនួសឱ្យ manual tokens។' },
      { label: 'Revocation', desc: 'ងាយស្រួល "Log Out" ពីគ្រប់ឧបករណ៍ដោយលុប tokens ទាំងអស់របស់ User នោះ។' },
    ],
    tip: 'ប្រើ Sanctum សម្រាប់ API auth សាមញ្ញ។ វាស្រួលជាង OAuth2/Passport សម្រាប់គម្រោងភាគច្រើន។',
    lab: 'បង្កើត Personal Access Token ថ្មីតាមរយៈ Tinker ហើយប្រើវាដើម្បីចូលប្រើ Protected Route។',
    result: 'បញ្ជាក់ពីការចូលប្រើ API ដោយប្រើ Bearer Token authentication។',
    filename: 'api.php',
    code: `$token = $user->createToken('mobile-app')->plainTextToken;

// Protected API Route
Route::middleware('auth:sanctum')->get('/user', ...);`,
    icon: Key,
  },
  {
    id: 'L06-S4', chapter: 'auth',
    title: 'Socialite', subtitle: 'Login ជាមួយ GitHub/Google',
    accent: '#a855f7',
    bg: 'radial-gradient(ellipse at 10% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)',
    concepts: [
      { label: 'OAuth Made Easy', desc: 'វិធីសាស្ត្រស្តង់ដារដើម្បីភ្ជាប់ជាមួយ Social Providers រាប់រយ។' },
      { label: 'Redirect Flow', desc: 'បញ្ជូន User ទៅកាន់ Google -> ពួកគេយល់ព្រម -> ពួកគេត្រឡប់មកកម្មវិធីវិញជាមួយទិន្នន័យ។' },
      { label: 'User Sync', desc: 'បង្កើតទិន្នន័យ User ក្នុង DB ដោយស្វ័យប្រវត្តិនូវរាល់ពេលដែលពួកគេ Login តាម Social។' },
      { label: 'Security', desc: 'មិនចាំបាច់គ្រប់គ្រង Passwords ទៀតទេ; ទុកចិត្តលើសុវត្ថិភាពរបស់ Providers ធំៗ។' },
    ],
    tip: 'Social login បង្កើនអត្រាចុះឈ្មោះប្រើប្រាស់ ដោយធ្វើឱ្យ "Sign Up" ក្លាយជាការ Click តែម្តង។',
    lab: 'កំណត់រចនាសម្ព័ន្ធ Google driver នៅក្នុង config/services.php។',
    result: 'លំហូរនៃ Social login ត្រូវបានរៀបរយ និងរួចរាល់សម្រាប់ការសាកល្បង។',
    filename: 'AuthController.php',
    code: `return Socialite::driver('github')->redirect();

// Callback logic
$user = Socialite::driver('github')->user();
Auth::login($user);`,
    icon: Globe,
  },

  /* ── CHAPTER 7: CRUD OPERATIONS ── */
  {
    id: 'L07-S1', chapter: 'crud',
    title: 'Resourceful CRUD', subtitle: 'វដ្តការងារស្តង់ដារ',
    accent: '#ec4899',
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(236,72,153,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Index', desc: 'បង្ហាញបញ្ជីទិន្នន័យទាំងអស់ (ឧទាហរណ៍: បញ្ជី Blog Posts ទាំងអស់)។' },
      { label: 'Show', desc: 'បង្ហាញទិន្នន័យតែមួយ (ឧទាហរណ៍: មើល Post លេខ ៥)។' },
      { label: 'Create/Store', desc: 'រៀបចំ Form "បង្កើតថ្មី" និងរក្សាទុកទៅក្នុង DB។' },
      { label: 'Update/Delete', desc: 'ការគ្រប់គ្រងការកែប្រែ និងការលុបទិន្នន័យដោយសុវត្ថិភាព។' },
    ],
    tip: 'ប្រើ Resource controllers។ "php artisan make:controller PostController --resource" នឹងបង្កើតរាល់ methods ឱ្យអ្នក។',
    lab: 'បង្កើត Post CRUD ពេញលេញ៖ មុខងារ Create, Page, List និង Delete។',
    result: 'កម្មវិធីអាចគ្រប់គ្រងទិន្នន័យយ៉ាងមានប្រសិទ្ធភាពពី UI។',
    filename: 'routes/web.php',
    code: `// One line for 7 routes!
Route::resource('posts', PostController::class);`,
    icon: Zap,
  },
  {
    id: 'L07-S2', chapter: 'crud',
    title: 'Mass Assignment', subtitle: 'សុវត្ថិភាព និងការ Whitelisting',
    accent: '#ec4899',
    bg: 'radial-gradient(ellipse at 10% 30%, rgba(236,72,153,0.12) 0%, transparent 55%)',
    concepts: [
      { label: '$fillable', desc: 'កំណត់ Field ណាខ្លះដែលអាចត្រូវបានប្តូរជា Bulk តាមរយៈ create() ឬ update()។' },
      { label: '$guarded', desc: 'ផ្ទុយពី fillable: ការពារ Field ទាំងនេះពីការកែប្រែជា Bulk។' },
      { label: 'Mass-Assignment Vuln', desc: 'ការពារ Hacker ពីការប្តូរតួនាទីរបស់ពួកគេទៅជា "admin" តាមរយៈការ hack form។' },
      { label: 'Validation First', desc: 'តែងតែផ្ទៀងផ្ទាត់ទិន្នន័យមុនពេលបញ្ជូនវាទៅ create($request->all())។' },
    ],
    tip: 'កុំប្រើ $guarded = []។ វាធ្វើឱ្យ Database របស់អ្នកទាំងមូលងាយរងគ្រោះដោយសារការចាក់បញ្ចូលទិន្នន័យមិនល្អ។',
    lab: 'បង្កើត Model ហើយកំណត់ឱ្យបញ្ជូនតែ Field "title" និង "body" ប៉ុណ្ណោះ។',
    result: 'Field ដែលមិនមានការអនុញ្ញាត នឹងត្រូវបានរំលងចោលក្នុងពេលប្រតិបត្តិការ Database។',
    filename: 'app/Models/Post.php',
    code: `class Post extends Model {
    protected $fillable = ['title', 'body'];
    
    // Hacker sends 'role' => 'admin', 
    // but Laravel ignores it!
}`,
    icon: Shield,
  },
  {
    id: 'L07-S3', chapter: 'crud',
    title: 'Route-Model Binding', subtitle: 'ការទាញយកទិន្នន័យដោយស្វ័យប្រវត្តិ',
    accent: '#ec4899',
    bg: 'radial-gradient(ellipse at 90% 70%, rgba(236,72,153,0.08) 0%, transparent 55%)',
    concepts: [
      { label: 'Implicit Binding', desc: 'Laravel បញ្ជូន Model instance ដោយផ្ទាល់ទៅក្នុង Controller method របស់អ្នក។' },
      { label: 'Type-Hinting', desc: 'Controller: index(Post $post) ទាញយក post តាមរយៈ ID ដោយស្វ័យប្រវត្តិ។' },
      { label: 'Query Scoping', desc: 'ចម្រោះ Resourceful routes របស់អ្នកដោយស្វ័យវត្តិតាមរយៈ scope methods។' },
      { label: 'Key Mapping', desc: 'ប្រើ "slug" ឬ "uuid" ជំនួសឱ្យ "id" សម្រាប់ URL ដែលស្អាត និងល្អសម្រាប់ SEO។' },
    ],
    tip: 'ការប្រើ (Post $post) ជួយឱ្យអ្នកមិនចាំបាច់សរសេរ Post::findOrFail($id) ដោយដៃឡើយ។',
    lab: 'កែសម្រួល Method "edit" ឱ្យប្រើ Implicit Model Binding។',
    result: 'កូដក្នុង Controller ត្រូវបានកាត់បន្ថយ ៥០% ខណៈដែលរក្សាភាពច្បាស់លាស់។',
    filename: 'PostController.php',
    code: `public function show(Post $post) {
    return view('posts.show', ['post' => $post]);
}

// Route: /posts/{post}`,
    icon: FileCode,
  },
  {
    id: 'L07-S4', chapter: 'crud',
    title: 'Soft Deletes', subtitle: 'ការរក្សាទុកទិន្នន័យឱ្យមានសុវត្ថិភាព',
    accent: '#ec4899',
    bg: 'radial-gradient(ellipse at center, rgba(236,72,153,0.05) 0%, transparent 55%)',
    concepts: [
      { label: 'Trash System', desc: 'ជំនួសឱ្យការលុបទិន្នន័យចេញពី DB វានឹងដាក់ចំណាំ "deleted_at" វិញ។' },
      { label: 'Restoration', desc: 'អនុញ្ញាតឱ្យអ្នកប្រើប្រាស់ទាញយកទិន្នន័យដែលបានលុបដោយអចេតនាត្រឡប់មកវិញ។' },
      { label: 'Trash Cleanup', desc: 'លុបទិន្នន័យចេញជាស្ថាពរដោយប្រើ forceDelete()។' },
      { label: 'Database Integrity', desc: 'រក្សាទំនាក់ទំនង Foreign key ទោះបីជា Item ត្រូវបាន "លុប" ក៏ដោយ។' },
    ],
    tip: 'ប្រើ SoftDeletes សម្រាប់ស្ទើរតែគ្រប់ទិន្នន័យអាជីវកម្មសំខាន់ៗ។ ទិន្នន័យគឺជាទ្រព្យសម្បត្តិដ៏មានតម្លៃ!',
    lab: 'បន្ថែម SoftDeletes trait ទៅក្នុង Post model និងដំណើរការ migration។',
    result: 'ទិន្នន័យដែលបានលុបនៅតែមានក្នុង DB ប៉ុន្តែបាត់ពី UI។',
    filename: 'app/Models/Post.php',
    code: `use Illuminate\\Database\\Eloquent\\SoftDeletes;

class Post extends Model {
    use SoftDeletes;
}

// Restore it later:
$post->restore();`,
    icon: Activity,
  },

  /* ── CHAPTER 8: QUEUES & JOBS ── */
  {
    id: 'L08-S1', chapter: 'queues',
    title: 'ការផ្ទេរភារកិច្ច (Offloading Tasks)', subtitle: 'ថាមពលរបស់ Async',
    accent: '#fb923c',
    bg: 'radial-gradient(ellipse at 10% 80%, rgba(251,146,60,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Latency Problem', desc: 'ភារកិច្ចយឺតៗ (ការផ្ញើ Email, ការត្រួតពិនិត្យ API, ការកែសម្រួលរូបភាព) មិនគួររំខានដល់ការឆ្លើយតបទៅអ្នកប្រើប្រាស់ឡើយ។' },
      { label: 'The Solution', desc: 'ផ្លាស់ប្តូរភារកិច្ចទាំងនោះទៅកាន់ "Queue" ដើម្បីដំណើរការនៅ background ដោយឡែកពីគ្នា។' },
      { label: 'User Experience', desc: 'អ្នកប្រើប្រាស់ទទួលបានសារ "ជោគជ័យ" ភ្លាមៗ ខណៈដែល server កំពុងរៀបចំកិច្ចការធំៗនៅពីក្រោយ។' },
    ],
    tip: 'ប្រសិនបើកិច្ចការចំណាយពេល >100ms ហើយមិនចាំបាច់សម្រាប់ UI ភ្លាមៗទេ សូមដាក់វាចូលក្នុង Queue។',
    lab: 'ស្វែងរកដំណើរការយឺតៗក្នុងកម្មវិធីរបស់អ្នក (ដូចជាការផ្ញើវិក្កយបត្រ) ហើយរៀបចំវាទៅកាន់ Queue។',
    result: 'បង្កើនល្បឿននៃការឆ្លើយតប និងធ្វើឱ្យអ្នកប្រើប្រាស់កាន់តែសប្បាយចិត្ត។',
    filename: 'terminal',
    code: `# See available queue drivers in .env
# sync (default/local), database, redis, sqs
QUEUE_CONNECTION=database`,
    icon: Zap,
  },
  {
    id: 'L08-S2', chapter: 'queues',
    title: 'ការបង្កើត Jobs', subtitle: 'make:job និងការ Dispatches',
    accent: '#fb923c',
    bg: 'radial-gradient(ellipse at 90% 20%, rgba(251,146,60,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'Job Classes', desc: 'កញ្ចប់ការងារដែលរក្សាទុកក្នុង app/Jobs។ ពួកវាត្រូវអនុវត្ត (implement) ShouldQueue។' },
      { label: 'Dispatching', desc: 'សកម្មភាពបញ្ជូន Job ទៅក្នុង Queue ពី Controller ឬ Service របស់អ្នក។' },
      { label: 'Dependencies', desc: 'Laravel ចាក់បញ្ចូល dependencies ទៅក្នុង handle() method ដោយស្វ័យប្រវត្តិតាមរយៈ Service Container។' },
    ],
    tip: 'រក្សា handle() method ក្នុង Job របស់អ្នកឱ្យ "ខ្លី"។ ប្រើ Service classes សម្រាប់ Logic ស្មុគស្មាញ។',
    lab: 'បង្កើត Job ថ្មីមួយ និង Dispatch វាចេញពី Test route។',
    result: 'ទិន្នន័យថ្មីនឹងបង្ហាញនៅក្នុង jobs database table របស់អ្នក។',
    filename: 'SendInvoice.php',
    code: `// Generate Job
// php artisan make:job SendInvoice

class SendInvoice implements ShouldQueue
{
    public function handle(): void
    {
        // Expensive logic here
    }
}

// Dispatch it
SendInvoice::dispatch($order);`,
    icon: Package,
  },
  {
    id: 'L08-S3', chapter: 'queues',
    title: 'Queue Workers', subtitle: 'ការដោះស្រាយបញ្ជីការងារ',
    accent: '#fb923c',
    bg: 'radial-gradient(ellipse at center, rgba(251,146,60,0.1) 0%, transparent 55%)',
    concepts: [
      { label: 'Artisan Worker', desc: 'ដំណើរការដែលរង់ចាំស្តាប់ Jobs ថ្មីៗ និងចាត់ចែងអនុវត្តពួកវា។' },
      { label: 'Priority Queues', desc: 'ចាត់ចែងភារកិច្ចសំខាន់ៗ (Reset Password) មុនភារកិច្ចដែលមានអាទិភាពទាប (Newsletter)។' },
      { label: 'Failures & Retries', desc: 'ព្យាយាមដំណើរការ Job ឡើងវិញដោយស្វ័យប្រវត្តិប្រសិនបើវាបរាជ័យដោយសារបញ្ហា API ឬ timeouts។' },
    ],
    tip: 'នៅក្នុង production សូមប្រើឧបករណ៍ដូចជា "Supervisor" ដើម្បីធានាថា queue worker របស់អ្នកដំណើរការ ២៤/៧។',
    lab: 'ចាប់ផ្តើមដំណើរការ worker ហើយសង្កេតមើលសកម្មភាពចាត់ចែង jobs របស់អ្នក។',
    result: 'terminal បង្ហាញស្ថានភាព "Processing" និង "Done" នៃកិច្ចការនីមួយៗ។',
    terminal: 'php artisan queue:work --queue=high,default',
    terminalOutput: '   Processing Job: SendInvoice...\n   DONE: Processed Job.',
    icon: Terminal,
    filename: 'terminal',
    code: `# Start the worker
php artisan queue:work

# For local development (auto-restarts on code change)
php artisan queue:listen`,
  },
  {
    id: 'L08-S4', chapter: 'queues',
    title: 'Laravel Horizon', subtitle: 'ការត្រួតពិនិត្យដំណើរការតាមរយៈ Redis',
    accent: '#fb923c',
    bg: 'radial-gradient(ellipse at 80% 80%, rgba(251,146,60,0.08) 0%, transparent 55%)',
    concepts: [
      { label: 'Real-time Stats', desc: 'តាមដានល្បឿនដំណើរការ រយៈពេលរង់ចាំ និងអត្រាបរាជ័យតាមរយៈ dashboard ដ៏ស្រស់ស្អាត។' },
      { label: 'Supervisor Config', desc: 'កំណត់ចំនួន worker pool ដោយផ្ទាល់ក្នុងកូដ (PHP) ជំនួសឱ្យការកំណត់ក្នុង server configs។' },
      { label: 'Failed Job Retry', desc: 'ពិនិត្យ និងព្យាយាមដំណើរការ job ដែលបានបរាជ័យឡើងវិញដោយគ្រាន់តែចុច click តែម្តងក្នុង UI។' },
    ],
    tip: 'ប្រសិនបើអ្នកប្រើ Redis សម្រាប់ queues នោះ Horizon គឺជាឧបករណ៍ដែលមិនអាចខ្វះបានសម្រាប់គ្រប់គ្រងវា។',
    lab: 'ដំឡើង Horizon ហើយចូលមើល dashboard នៅក្នុង browser របស់អ្នក។',
    result: 'មើលឃើញយ៉ាងច្បាស់នូវរាល់សកម្មភាពការងារនៅ background នៃកម្មវិធីរបស់អ្នក។',
    terminal: 'php artisan horizon',
    terminalOutput: '   Horizon started successfully.',
    icon: Activity,
    filename: 'horizon.php',
    code: `'environments' => [
    'production' => [
        'supervisor-1' => [
            'connection' => 'redis',
            'processes' => 10,
        ],
    ],
],`,
  },

  /* ── CHAPTER 9: ADVANCED ── */
  {
    id: 'L09-S1', chapter: 'advanced',
    title: 'Smart Caching', subtitle: 'ការទាញយកទិន្នន័យក្នុងល្បឿនលឿនបំផុត',
    accent: '#3b82f6',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(59,130,246,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Query Caching', desc: 'រក្សាទុកលទ្ធផល query ដែលប្រើប្រាស់ធនធានច្រើនទៅក្នុង Redis/Memcached សម្រាប់ការចូលប្រើភ្លាមៗនៅពេលក្រោយ។' },
      { label: 'Atomic Locks', desc: 'ការពារ "race conditions" នៅពេលដែលមានអ្នកប្រើប្រាស់ពីរនាក់ព្យាយាម update ទិន្នន័យតែមួយក្នុងពេលតែមួយ។' },
      { label: 'TTL Logic', desc: 'Time-To-Live: កំណត់ឱ្យ cache ចាស់ៗផុតកំណត់ដោយស្វ័យប្រវត្តិតាមរយៈពេលដែលបានកំណត់។' },
    ],
    tip: 'កុំធ្វើ caching គ្រប់យ៉ាង។ cache ដែលពិបាកក្នុងការសម្អាត (Invalidate) គឺជាមូលហេតុទូទៅនៃកំហុស (bugs)។',
    lab: 'កំណត់ cache សម្រាប់ query ស្ថិតិអ្នកប្រើប្រាស់ដែលស្មុគស្មាញក្នុងរយៈពេល ២៤ ម៉ោង។',
    result: 'រយៈពេល query ធ្លាក់ចុះពី 500ms មកត្រឹមតែ 2ms ប៉ុណ្ណោះ។',
    filename: 'DashboardController.php',
    code: `$stats = Cache::remember('user.stats', now()->addDay(), function () {
    return User::calculateComplexStats();
});`,
    icon: Zap,
  },
  {
    id: 'L09-S2', chapter: 'advanced',
    title: 'Task Scheduling', subtitle: 'ការជំនួស PHP Cron',
    accent: '#3b82f6',
    bg: 'radial-gradient(ellipse at 10% 90%, rgba(59,130,246,0.08) 0%, transparent 55%)',
    concepts: [
      { label: 'Eloquent Schedule', desc: 'កំណត់ភារកិច្ចដែលត្រូវធ្វើដដែលៗរបស់អ្នកក្នុងកូដ PHP ជំនួសឱ្យការប្រើ server crontab ដែលស្មុគស្មាញ។' },
      { label: 'Daily/Weekly', desc: 'ប្រើ syntax ងាយៗ៖ $schedule->command("backup")->dailyAt("01:00")។' },
      { label: 'Overlap Prevention', desc: 'ធានាថាភារកិច្ចមួយមិនចាប់ផ្តើមដំណើរការស្ទួនគ្នា ប្រសិនបើភារកិច្ចមុនមិនទាន់បញ្ចប់។' },
      { label: 'Maintenance', desc: 'សម្អាត logs ដែលហួសកំណត់ដោយស្វ័យប្រវត្តិ រក្សាទុកទិន្នន័យ (backup) ឬលុបឯកសារចាស់ៗ។' },
    ],
    tip: 'រៀបចំ schedule សម្រាប់អ្វីៗគ្រប់យ៉ាង ចាប់ពីការ backup database រហូតដល់ការសង្ខេបសកម្មភាពប្រចាំថ្ងៃ។',
    lab: 'រៀបចំ command ឱ្យដំណើរការរៀងរាល់នាទីដើម្បីពិនិត្យ subscription ដែលជិតផុតកំណត់។',
    result: 'ម៉ាស៊ីនស្វ័យប្រវត្តិកម្មចាប់ផ្តើមដំណើរការតាមកាលកំណត់។',
    filename: 'app/Console/Kernel.php',
    code: `$schedule->command('prune:logs')->daily();

$schedule->call(function () {
    // Custom logic here
})->everyFiveMinutes();`,
    terminal: 'php artisan schedule:list',
    terminalOutput: '   0 1 * * *  php artisan prune:logs',
    icon: List,
  },
  {
    id: 'L09-S3', chapter: 'advanced',
    title: 'Storage & Files', subtitle: 'ការគ្រប់គ្រងការ upload របស់ user',
    accent: '#3b82f6',
    bg: 'radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'FileSystem', desc: 'គ្រប់គ្រងការ upload ជាមួយ local, S3 ឬ R2 drivers យ៉ាងងាយស្រួល។' },
      { label: 'Asset URLs', desc: 'បង្កើត path ដែលត្រឹមត្រូវដោយប្រើ Storage::url($path) សម្រាប់ការគាំទ្រ CDN។' },
      { label: 'Public Disk', desc: 'រក្សាទុកឯកសារដែលអាចចូលមើលជាសាធារណៈបាន (ឧទាហរណ៍៖ រូបភាពតំណាង profile)។' },
      { label: 'Private Disk', desc: 'រក្សាទុកឯកសារសំខាន់ៗដែលត្រូវការការផ្ទៀងផ្ទាត់សិទ្ធិមុននឹងចូលមើលបាន។' },
    ],
    tip: 'កុំរក្សាទុករូបភាពដោយផ្ទាល់ក្នុង public/ folder។ upload ពួកវាទៅកាន់ storage/ ហើយធ្វើការភ្ជាប់ link វិញ។',
    lab: 'រក្សាទុករូបភាព avatar ដែលបាន upload ទៅក្នុង "public" disk ហើយបង្ហាញវា។',
    result: 'ឯកសារត្រូវបានរក្សាទុកដោយជោគជ័យ និងអាចចូលមើលជាសាធារណៈបាន។',
    filename: 'UploadController.php',
    code: `$path = $request->file('avatar')->store('avatars', 'public');
$user->update(['avatar' => $path]);`,
    icon: Clock,
  },
  {
    id: 'L09-S4', chapter: 'advanced',
    title: 'Monitoring & Logs', subtitle: 'Laravel Pulse និង Horizon',
    accent: '#3b82f6',
    bg: 'radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 55%)',
    concepts: [
      { label: 'Laravel Pulse', desc: 'dashboard តាមដានសុខភាព server ក្នុងពេលជាក់ស្តែងសម្រាប់ CPU, cache និង query យឺតៗ។' },
      { label: 'Laravel Horizon', desc: 'UI ដ៏ស្អាតសម្រាប់តាមដាន Redis-powered queues របស់អ្នក។' },
      { label: 'Log Channels', desc: 'បញ្ជូនសារកំហុសទៅកាន់ Slack, email ឬ Sentry ដោយស្វ័យប្រវត្តិ។' },
      { label: 'Performance', desc: 'កំណត់អត្តសញ្ញាណអ្នកប្រើប្រាស់ណាខ្លះដែលជួបប្រទះការឆ្លើយតបយឺតបំផុត។' },
    ],
    tip: 'ដំឡើង Pulse លើគ្រប់កម្មវិធី production។ វាដូចជាការឆ្លុះអ៊ិចស្វាយលើ server របស់អ្នកអញ្ចឹង។',
    lab: 'មើល dashboard នៃ query ដែលយឺតបំផុតដើម្បីកំណត់រកចំណុចដែលត្រូវកែលម្អ។',
    result: 'មើលឃើញពីចំណុចស្ទះនៃល្បឿនដំណើរការកម្មវិធី។',
    filename: 'terminal',
    code: `# Install the vitals dashboard
composer require laravel/pulse
php artisan migrate`,
    icon: Activity,
  },

  /* ── CHAPTER 10: API DEVELOPMENT ── */
  {
    id: 'L10-S1', chapter: 'api',
    title: 'JSON និង Sanctum', subtitle: 'Laravel សម្រាប់ Mobile/JS Apps',
    accent: '#10b981',
    bg: 'radial-gradient(ellipse at 70% 80%, rgba(16,185,129,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'API Routes', desc: 'កំណត់ endpoints នៅក្នុង routes/api.php ដែលមាន /api prefix តាមលំនាំដើម។' },
      { label: 'Sanctum Tokens', desc: 'ការផ្ទៀងផ្ទាត់សិទ្ធិដ៏ស្រាលសម្រាប់ SPAs និង mobile apps។' },
      { label: 'Bearer Auth', desc: 'បញ្ជូន tokens ដោយសុវត្ថិភាពតាមរយៈ Authorization header។' },
      { label: 'Statelessness', desc: 'APIs មិនប្រើ sessions ទេ; រាល់ការស្នើសុំត្រូវតែមានអត្តសញ្ញាណផ្ទាល់ខ្លួន។' },
    ],
    tip: 'ប្រើ Sanctum សម្រាប់គម្រោងភាគច្រើន។ វាសាមញ្ញជាង Passport និងដំណើរការយ៉ាងល្អសម្រាប់ SPAs។',
    lab: 'ការពារ route មួយដោយប្រើ "auth:sanctum" middleware និងចូលប្រើវាដោយប្រើ token។',
    result: 'ការចូលប្រើប្រាស់ទិន្នន័យ JSON សំខាន់ៗត្រូវបានអនុញ្ញាតដោយជោគជ័យ។',
    filename: 'routes/api.php',
    code: `Route::middleware('auth:sanctum')
    ->get('/user', function (Request $request) {
        return $request->user();
    });`,
    icon: Lock,
  },
  {
    id: 'L10-S2', chapter: 'api',
    title: 'API Resources', subtitle: 'ការរៀបចំទិន្នន័យឱ្យមានរបៀប',
    accent: '#10b981',
    bg: 'radial-gradient(ellipse at 30% 20%, rgba(16,185,129,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Data Wrapping', desc: 'រៀបចំ JSON response របស់អ្នកឱ្យស្ថិតក្នុង "data" key ជាស្តង់ដារតែមួយ។' },
      { label: 'Conditional Stats', desc: 'បង្ហាញ field ជាក់លាក់លុះត្រាតែមានទំនាក់ទំនងទិន្នន័យ ឬអ្នកប្រើប្រាស់ជា admin។' },
      { label: 'Pagination', desc: 'Laravel រៀបចំ "next_page_url" និងចំនួនសរុបដោយស្វ័យប្រវត្តិនូវរាល់ពេលប្រើ resources។' },
      { label: 'Collections', desc: 'កំណត់ទម្រង់បញ្ជីទិន្នន័យឱ្យមានភាពស៊ីសង្វាក់គ្នាពេញមួយ API របស់អ្នក។' },
    ],
    tip: 'តែងតែប្រើ Resources។ ពួកវាដើរតួជាស្រទាប់សុវត្ថិភាពរវាង DB និង web។',
    lab: 'បង្កើត UserResource ដែលលាក់ email របស់អ្នកប្រើប្រាស់ពីការបង្ហាញមុខជាសាធារណៈ។',
    result: 'ទិន្នន័យ JSON ស្អាត មានសុវត្ថិភាព និងងាយស្រួលសម្រាប់ frontend យកទៅប្រើ។',
    filename: 'app/Http/Resources/UserResource.php',
    code: `public function toArray($request) {
    return [
        'id' => $this->id,
        'name' => $this->name,
        'joined' => $this->created_at->diffForHumans()
    ];
}`,
    icon: RefreshCw,
  },
  {
    id: 'L09-S3', chapter: 'api',
    title: 'Rate Limiting', subtitle: 'ការការពារធនធានរបស់អ្នក',
    accent: '#10b981',
    bg: 'radial-gradient(ellipse at 90% 90%, rgba(16,185,129,0.08) 0%, transparent 55%)',
    concepts: [
      { label: 'Throttle', desc: 'កំណត់ចំនួននៃការស្នើសុំដែលអ្នកប្រើប្រាស់អាចធ្វើបានក្នុងមួយនាទី (ឧទាហរណ៍ ៦០ ដង/នាទី)។' },
      { label: 'Dynamic Limits', desc: 'ផ្តល់ឱ្យអ្នកប្រើប្រាស់ Premium នូវការស្នើសុំ ១,០០០ ដង ខណៈអ្នកប្រើ Free បានតែ ១០ ដង។' },
      { label: 'Backoff', desc: 'បង្ខំឱ្យរង់ចាំយូរជាងមុន ប្រសិនបើពួកគេនៅតែបន្តបំពានដែនកំណត់។' },
      { label: 'DDoS Defense', desc: 'ការពារ bots ពីការវាយលុក server របស់អ្នកដោយការស្នើសុំក្លែងក្លាយជាច្រើន។' },
    ],
    tip: 'RateLimiter របស់ Laravel ប្រើ Redis សម្រាប់តាមដានសកម្មភាពក្នុងល្បឿនលឿន។',
    lab: 'កំណត់រចនាសម្ព័ន្ធ limiter ដែលអនុញ្ញាតការស្នើសុំតែ ១០ ដងក្នុងមួយនាទីសម្រាប់ភ្ញៀវ។',
    result: 'HTTP 429 "Too Many Requests" ត្រូវបានបង្ហាញត្រឡប់ទៅវិញសម្រាប់អ្នកដែលបំពាន។',
    filename: 'RouteServiceProvider.php',
    code: `RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});`,
    icon: Activity,
  },
  {
    id: 'L09-S4', chapter: 'api',
    title: 'API Versioning', subtitle: 'ការវិវឌ្ឍដោយមិនបង្កឱ្យមានការខូចខាត',
    accent: '#10b981',
    bg: 'radial-gradient(ellipse at center, rgba(16,185,129,0.05) 0%, transparent 55%)',
    concepts: [
      { label: 'v1 / v2 Routes', desc: 'រក្សាទុក API ជំនាន់ផ្សេងៗគ្នានៅក្នុង folder/files ដាច់ដោយឡែកពីគ្នា។' },
      { label: 'Deprecation', desc: 'ផ្តល់ដំណឹងដល់អ្នកអភិវឌ្ឍន៍ថា endpoint ណាមួយនឹងត្រូវលុបចោលនាពេលអនាគត។' },
      { label: 'Compatibility', desc: 'ធានាថា app ចាស់ៗនៅតែដើរ ខណៈពេលដែលអ្នកកំពុង upgrade backend។' },
      { label: 'Documentation', desc: 'ប្រើឧបករណ៍ដូចជា Scribe ដើម្បីបង្កើត API docs ចេញពីកូដរបស់អ្នកដោយស្វ័យប្រវត្តិ។' },
    ],
    tip: 'ចាប់ផ្តើមជាមួយ v1 នៅក្នុង URL របស់អ្នក។ អ្នកនឹងអរគុណខ្លួនឯងនៅ ៦ ខែក្រោយ។',
    lab: 'រៀបចំ route group ដែលមាន prefix "v1" សម្រាប់រាល់ endpoints សំខាន់ៗរបស់អ្នក។',
    result: 'រចនាសម្ព័ន្ធ API ប្រកបដោយវិជ្ជាជីវៈ និងរួចរាល់សម្រាប់ការរីកចម្រើនយូរអង្វែង។',
    filename: 'routes/api.php',
    code: `Route::prefix('v1')->group(function () {
    Route::apiResource('posts', PostController::class);
});`,
    icon: GitBranch,
  },

  /* ── CHAPTER 10: FRONTEND INTEGRATION ── */
  {
    id: 'L10-S1', chapter: 'frontend',
    title: 'Vite & Tailwind', subtitle: 'Modern Frontend Stack',
    accent: '#fbbf24',
    bg: 'radial-gradient(ellipse at 10% 90%, rgba(251,191,36,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Vite', desc: 'ឧបករណ៍ build frontend ដែលលឿនដូចផ្លេកបន្ទោរសម្រាប់ Laravel។' },
      { label: 'Tailwind CSS', desc: 'Utility-first CSS: រចនាកម្មវិធីរបស់អ្នកដោយមិនចាំបាច់ចាកចេញពី HTML។' },
      { label: 'Asset Bundling', desc: 'ការចងក្រង SCSS/JS/React ទៅជាឯកសារដែលរួចរាល់សម្រាប់ផលិតកម្ម។' },
      { label: 'HMR', desc: 'Hot Module Replacement: ការធ្វើបច្ចុប្បន្នភាពភ្លាមៗនៅពេលអ្នករក្សាទុកឯកសារ។' },
    ],
    tip: 'ប្រើ @vite(["resources/css/app.css"]) នៅក្នុង master layout របស់អ្នកដើម្បីដំណើរការស្ទីល។',
    lab: 'ដំឡើង Tailwind និងប្តូរពណ៌ផ្ទៃខាងក្រោយនៃកម្មវិធីរបស់អ្នក។',
    result: 'ស្ទីលទំនើបត្រូវបានអនុវត្ត និងធ្វើបច្ចុប្បន្នភាពដោយស្វ័យប្រវត្តិតាមរយៈ Vite។',
    filename: 'vite.config.js',
    code: `export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});`,
    icon: Sparkles,
  },
  {
    id: 'L10-S2', chapter: 'frontend',
    title: 'Livewire', subtitle: 'Full-stack PHP Components',
    accent: '#fbbf24',
    bg: 'radial-gradient(ellipse at 80% 10%, rgba(251,191,36,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'TALL Stack', desc: 'Tailwind, Alpine, Laravel, Livewire — បង្កើត SPAs ជាមួយ logic PHP។' },
      { label: 'Reactivity', desc: 'ប្រអប់បញ្ចូល និងប៊ូតុងធ្វើបច្ចុប្បន្នភាព UI ភ្លាមៗដោយមិនចាំបាច់ reload ទំព័រ។' },
      { label: 'Properties', desc: 'បញ្ជូនទិន្នន័យពីអថេរ PHP ទៅកាន់ search inputs ឬ form fields ដោយផ្ទាល់។' },
      { label: 'Actions', desc: 'ហៅ methods PHP ដោយផ្ទាល់ពី HTML របស់អ្នក: wire:click="save"។' },
    ],
    tip: 'ប្រើ Livewire ប្រសិនបើអ្នកស្រឡាញ់ PHP ប៉ុន្តែចង់បានបទពិសោធន៍អ្នកប្រើប្រាស់ដែលទាន់សម័យ និងមានប្រតិកម្មរហ័ស។',
    lab: 'បង្កើត component ស្វែងរកក្នុងពេលជាក់ស្តែងដែលចម្រោះអ្នកប្រើប្រាស់នៅពេលអ្នកវាយបញ្ចូល។',
    result: 'ឥរិយាបទឌីណាមិកដូចជា "JavaScript" ដោយប្រើតែកូដ PHP ប៉ុណ្ណោះ។',
    filename: 'SearchUsers.php',
    code: `class SearchUsers extends Component {
    public $search = '';

    public function render() {
        return view('livewire.search', [
            'users' => User::where('name', 'like', "%{$this->search}%")->get()
        ]);
    }
}`,
    icon: Zap,
  },
  {
    id: 'L10-S3', chapter: 'frontend',
    title: 'Inertia.js', subtitle: 'Modern Monolith',
    accent: '#fbbf24',
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.08) 0%, transparent 55%)',
    concepts: [
      { label: 'Protocol', desc: 'ស្ពានដែលភ្ជាប់ Laravel backends ទៅកាន់ React/Vue frontends យ៉ាងល្អឥតខ្ចោះ។' },
      { label: 'No API Needed', desc: 'បង្កើត SPA ដោយមិនចាំបាច់សរសេរ API endpoint តែមួយ ឬប្រើ Axios។' },
      { label: 'Server Routing', desc: 'រក្សាការរៀបចំ routing ក្នុង Laravel ខណៈពេលបង្ហាញ components ក្នុង React។' },
      { label: 'Shared State', desc: 'ងាយស្រួលបញ្ជូន Auth user ឬ Flash messages ទៅកាន់ React props របស់អ្នក។' },
    ],
    tip: 'Inertia ផ្តល់ឱ្យអ្នកនូវថាមពលរបស់ React ជាមួយនឹងភាពសាមញ្ញនៃ Laravel បែបប្រពៃណី។',
    lab: 'បង្កើត "Dashboard" React component និងបង្ហាញវាចេញពី route របស់ Laravel។',
    result: 'បទពិសោធន៍ SPA ដែលមានប្រសិទ្ធភាពខ្ពស់ដោយមិនមានភាពស្មុគស្មាញ។',
    filename: 'DashboardController.php',
    code: `public function index() {
    return Inertia::render('Dashboard', [
        'stats' => $stats
    ]);
}`,
    icon: Layers,
  },
  {
    id: 'L10-S4', chapter: 'frontend',
    title: 'Alpine.js', subtitle: 'Lightweight Scripting',
    accent: '#fbbf24',
    bg: 'radial-gradient(ellipse at center, rgba(251,191,36,0.05) 0%, transparent 55%)',
    concepts: [
      { label: 'Micro-Interactions', desc: 'គ្រប់គ្រង dropdowns, modals និង toggles ជាមួយកូដ JS តូចៗ។' },
      { label: 'x-data', desc: 'កំណត់ស្ថានភាព (state) របស់ component ដោយផ្ទាល់នៅលើ tag HTML។' },
      { label: 'x-on:click', desc: 'ការរង់ចាំព្រឹត្តិការណ៍ដែលងាយយល់ និងរក្សា logic ឱ្យនៅជិត UI។' },
      { label: 'Small Footprint', desc: 'ថាមពលខ្លាំងក្នុងកញ្ចប់តូច (~15kb) បើធៀបនឹង React។' },
    ],
    tip: 'Alpine គឺជា "Tailwind នៃ JavaScript"។ ល្អឥតខ្ចោះសម្រាប់ការបន្ថែមប្រតិកម្មរហ័សបន្តិចបន្តួច។',
    lab: 'បង្កើត mobile navigation menu ដែលអាចបិទ/បើកបានដោយប្រើ Alpine។',
    result: 'ធាតុ UI អន្តរកម្មដែលដំណើរការបានដោយមិនមានឯកសារ JS ផ្ទាល់ខ្លួនច្រើន។',
    filename: 'nav.blade.php',
    code: `<div x-data="{ open: false }">
    <button @click="open = !open">Menu</button>
    <nav x-show="open">...</nav>
</div>`,
    icon: Activity,
  },

  /* ── CHAPTER 11: DEPLOYMENT ── */
  {
    id: 'L11-S1', chapter: 'deploy',
    title: 'បើកដំណើរការ (Go Live)', subtitle: 'Cloud & Forge',
    accent: '#8b5cf6',
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Laravel Forge', desc: 'វិធីដែលងាយស្រួលបំផុតក្នុងការរៀបចំ server នៅលើ AWS/Digital Ocean។' },
      { label: 'Laravel Cloud', desc: 'ការដាក់ឱ្យប្រើប្រាស់ serverless ដោយផ្ទាល់ពី GitHub commits។' },
      { label: 'Optimization', desc: 'ប្រើ php artisan config:cache, route:cache សម្រាប់ល្បឿនផលិតកម្ម។' },
      { label: 'CI/CD', desc: 'ដំណើរការតេស្តដោយស្វ័យប្រវត្តិកែប្រែមុនពេលរាល់ការ push ទៅកាន់ផលិតកម្ម។' },
    ],
    tip: 'កុំដំណើរការ migrate:fresh ក្នុងផលិតកម្មឱ្យសោះ។ វានឹងលុបទិន្នន័យពិតប្រាកដរបស់អ្នកទាំងអស់!',
    lab: 'ដំណើរការបញ្ជា optimization ក្នុងផលិតកម្ម និងពិនិត្យមើលល្បឿនដែលកើនឡើង។',
    result: 'គេហទំព័រត្រូវបានដំណើរការល្អបំផុត និងសុវត្ថិភាពសម្រាប់ចរាចរណ៍សកល។',
    terminal: 'php artisan optimize',
    terminalOutput: '   INFO  Caching configuration.\n   INFO  Caching routes.\n   DONE  Optimization complete.',
    icon: Rocket,
    filename: 'terminal',
    code: `# 1. Optimize configuration
php artisan config:cache

# 2. Optimize routes
php artisan route:cache

# 3. Optimize views
php artisan view:cache`,
  },
  {
    id: 'L11-S2', chapter: 'deploy',
    title: 'CI/CD Pipelines', subtitle: 'ការបញ្ជូនដោយស្វ័យប្រវត្តិ',
    accent: '#8b5cf6',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(139,92,246,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'GitHub Actions', desc: 'ដំណើរការការតេស្តរបស់អ្នកដោយស្វ័យប្រវត្តិនូវរាល់ពេល push ទៅកាន់ git។' },
      { label: 'Linting', desc: 'ពិនិត្យមើលរចនាបថនៃការសរសេរកូដមុនពេលកូដត្រូវបានបញ្ចូលគ្នា (merged)។' },
      { label: 'Staging Env', desc: 'ដាក់ឱ្យប្រើប្រាស់លើ server សាកល្បងជាមុនសិន ដើម្បីផ្ទៀងផ្ទាត់មុខងារនានា។' },
      { label: 'Automated Deploy', desc: 'ប្រសិនបើការតេស្តជាប់ នោះ pipeline នឹងបញ្ជូនកូដទៅកាន់ផលិតកម្មសម្រាប់អ្នក។' },
    ],
    tip: 'ស្វ័យប្រវត្តិកម្មគឺជាសុវត្ថិភាព។ វាការពារកំហុសរបស់មនុស្សក្នុងអំឡុងពេល "Push to Live"។',
    lab: 'បង្កើតឯកសារ .github/workflows/tests.yml និងសាកល្បងដំណើរការវា។',
    result: 'ការបញ្ជាក់ដោយចក្ខុវិស័យថាកូដរបស់អ្នកមានស្ថេរភាព និងរួចរាល់សម្រាប់ផលិតកម្ម។',
    filename: 'tests.yml',
    code: `name: Run Tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: php artisan test`,
    icon: GitBranch,
  },
  {
    id: 'L11-S3', chapter: 'deploy',
    title: 'ការតាមដានកំហុស (Error Tracking)', subtitle: 'Sentry & Bugsnag',
    accent: '#8b5cf6',
    bg: 'radial-gradient(ellipse at 90% 80%, rgba(139,92,246,0.08) 0%, transparent 55%)',
    concepts: [
      { label: 'Real-time Alerts', desc: 'ទទួលបានការជូនដំណឹងតាម Slack ឬ Email ភ្លាមៗនៅពេលមានកំហុសកើតឡើង។' },
      { label: 'Contextual Data', desc: 'មើលឃើញបន្ទាត់កូដជាក់លាក់ User ID និង browser ដែលបានបរាជ័យ។' },
      { label: 'Stack Traces', desc: 'ពិនិត្យឱ្យបានស៊ីជម្រៅអំពីអ្វីដែលនាំឱ្យមានការគាំង — ទោះបីជានៅក្នុងផលិតកម្មក៏ដោយ។' },
      { label: 'Resolve/Ignore', desc: 'គ្រប់គ្រងបំណុលបច្ចេកទេស (technical debt) ដោយកំណត់អាទិភាពលើកំហុសសំខាន់ៗ។' },
    ],
    tip: 'កុំរង់ចាំអ្នកប្រើប្រាស់រាយការណ៍ពីកំហុស។ អ្នកគួរតែដឹងពីពួកវាមុនពួកគេ!',
    lab: 'ដំឡើង Sentry SDK និងសាកល្បងបង្កើត error មួយ។',
    result: 'របាយការណ៍កំហុសលម្អិតបង្ហាញនៅក្នុង dashboard តាមដានរបស់អ្នក។',
    filename: 'logging.php',
    code: `'channels' => [
    'sentry' => [
        'driver' => 'sentry',
    ],
],`,
    icon: Activity,
  },
  {
    id: 'L11-S4', chapter: 'deploy',
    title: 'ការពង្រីក និងការរីកចម្រើន (Scaling & Growth)', subtitle: 'លើសពី Server តែមួយ',
    accent: '#8b5cf6',
    bg: 'radial-gradient(ellipse at center, rgba(139,92,246,0.05) 0%, transparent 55%)',
    concepts: [
      { label: 'Load Balancing', desc: 'បែងចែកចរាចរណ៍ទិន្នន័យទៅកាន់ server ជាច្រើន (AWS/DigitalOcean)។' },
      { label: 'Redis Sentinel', desc: 'ការគ្រប់គ្រង cache និង queue ដែលមានលទ្ធភាពប្រើប្រាស់ខ្ពស់។' },
      { label: 'Read Replicas', desc: 'កាត់បន្ថយបន្ទុក database read query ទៅកាន់ follower nodes ដាច់ដោយឡែក។' },
      { label: 'Horizontal Scaling', desc: 'បន្ថែម server បន្ថែមទៀតនៅពេលដែលចំនួនអ្នកប្រើប្រាស់កើនឡើងដល់រាប់លាននាក់។' },
    ],
    tip: 'Laravel ត្រូវបានរចនាឡើងដើម្បីពង្រីកទំហំ។ វាផ្តល់ថាមពលដល់គេហទំព័រធំៗមួយចំនួននៅលើអ៊ីនធឺណិត។',
    lab: 'កំណត់រចនាសម្ព័ន្ធការភ្ជាប់ DB របស់អ្នកឱ្យប្រើ "read" host ដាច់ដោយឡែក។',
    result: 'ដំណើរការ database ខ្ពស់ជាងមុន និងភាពជឿជាក់ក្រោមបន្ទុកធ្ងន់។',
    filename: 'database.php',
    code: `'mysql' => [
    'read' => [
        'host' => '192.168.1.1',
    ],
    'write' => [
        'host' => '192.168.1.2'
    ],
],`,
    icon: Server,
  },

  /* ── CHAPTER 13: TODO APP DEMO (START-TO-FINISH) ── */
  {
    id: 'L13-S1', chapter: 'todo',
    title: 'មូលដ្ឋានគ្រឹះ', subtitle: 'ជំហានទី ១៖ ការរៀបចំកម្មវិធី',
    accent: '#0ea5e9',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(14,165,233,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Laravel Installer', desc: 'ចាប់ផ្តើមគម្រោងថ្មីជាមួយ "laravel new todo-app"។' },
      { label: 'Environment', desc: 'កំណត់ .env របស់អ្នកឱ្យប្រើ SQLite ឬ MySQL database ក្នុងស្រុក។' },
      { label: 'Initial Server', desc: 'បើកដំណើរការ dev server ដើម្បីមើលទំព័រស្វាគមន៍។' },
    ],
    tip: 'ជ្រើសរើសជម្រើស "SQLite" ក្នុងអំឡុងពេលដំឡើងសម្រាប់ការរៀបចំក្នុងស្រុកដែលលឿនបំផុតដោយមិនចាំបាច់មាន DB server។',
    lab: 'បង្កើតគម្រោង Laravel ថ្មី និងផ្ទៀងផ្ទាត់ព័ត៌មានសម្ងាត់ database ក្នុង .env។',
    result: 'ការដំឡើង Laravel ថ្មីរួចរាល់សម្រាប់ការអភិវឌ្ឍន៍។',
    filename: 'terminal',
    code: `# Create the project
laravel new todo-app

# Choose your stack
# -> Starter kit: None
# -> Testing: Pest
# -> DB: SQLite`,
    terminal: 'laravel new todo-app',
    terminalOutput: '   INFO  Application ready! Build something amazing.',
    icon: Rocket,
  },
  {
    id: 'L13-S2', chapter: 'todo',
    title: 'ស្ថាបត្យកម្មរូបរាង', subtitle: 'ជំហានទី ២៖ ប្លង់មូលដ្ឋាន (Base Layout)',
    accent: '#0ea5e9',
    bg: 'radial-gradient(ellipse at 80% 30%, rgba(14,165,233,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'App Layout', desc: 'បង្កើត layout.blade.php ដើម្បីគ្រប់គ្រងការរុករក និងស្ទីលរបស់អ្នក។' },
      { label: 'Tailwind CDN', desc: 'បន្ថែម Tailwind CSS យ៉ាងរហ័សសម្រាប់ការសាកល្បងដំបូង។' },
      { label: 'Content Yield', desc: 'កំណត់តំបន់ @yield("content") សម្រាប់ទំព័រនីមួយៗ។' },
    ],
    tip: 'រក្សាប្លង់របស់អ្នកឱ្យស្អាត។ បំបែកការរុករក (navigation) របស់អ្នកទៅជា @include partial នៅពេលក្រោយ។',
    lab: 'បង្កើតប្លង់ HTML មូលដ្ឋានដែលមាន container នៅចំកណ្តាលសម្រាប់បញ្ជី todo របស់អ្នក។',
    result: 'គ្រោងឆ្អឹង container ដែលមានលក្ខណៈវិជ្ជាជីវៈសម្រាប់កម្មវិធីរបស់អ្នក។',
    filename: 'views/layout.blade.php',
    code: `<!DOCTYPE html>
<html>
<head>
    <title>Todo App</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-10">
    <div class="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        @yield('content')
    </div>
</body>
</html>`,
    icon: Layout,
  },
  {
    id: 'L13-S3', chapter: 'todo',
    title: 'ការកំណត់ទិន្នន័យ', subtitle: 'ជំហានទី ៣៖ Migration & Model',
    accent: '#0ea5e9',
    bg: 'radial-gradient(ellipse at 30% 50%, rgba(14,165,233,0.1) 0%, transparent 60%)',
    concepts: [
      { label: 'The Task Model', desc: 'PHP object ដែលតំណាងឱ្យ record ក្នុង database របស់អ្នក។' },
      { label: 'The Schema', desc: 'migration ដែលកំណត់សសរស្ដម្ភ (columns) "title" និង "is_completed"។' },
      { label: 'Fillables', desc: 'បញ្ជាក់សសរស្ដម្ភដែលអនុញ្ញាតឱ្យបញ្ចូលទិន្នន័យជាបណ្តុំ (mass-assignment)។' },
    ],
    tip: 'តែងតែដាក់ default(false) សម្រាប់សសរស្ដម្ភស្ថានភាពប្រភេទ boolean របស់អ្នក។',
    lab: 'បង្កើត model ជាមួយ migration និងកំណត់ schema។',
    result: 'រចនាសម្ព័ន្ធទិន្នន័យត្រូវបានបញ្ចប់ និង table ត្រូវបាន migrated។',
    filename: 'database/migrations/xxx_tasks.php',
    code: `public function up() {
    Schema::create('tasks', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->boolean('is_completed')->default(false);
        $table->timestamps();
    });
}`,
    icon: Database,
  },
  {
    id: 'L13-S4', chapter: 'todo',
    title: 'ផែនទី URL', subtitle: 'ជំហានទី ៤៖ ការកំណត់ Routes',
    accent: '#0ea5e9',
    bg: 'radial-gradient(ellipse at center, rgba(14,165,233,0.08) 0%, transparent 70%)',
    concepts: [
      { label: 'GET Route', desc: 'កំណត់កន្លែងសម្រាប់មើលបញ្ជី todo (/) ។' },
      { label: 'POST Route', desc: 'គ្រប់គ្រងការបញ្ជូនភារកិច្ច (task) ថ្មី។' },
      { label: 'PATCH Route', desc: 'ធ្វើបច្ចុប្បន្នភាពស្ថានភាពនៃភារកិច្ចដែលមានស្រាប់។' },
    ],
    tip: 'រៀបចំ route របស់អ្នកជាក្រុមដើម្បីឱ្យមានសណ្តាប់ធ្នាប់នៅពេលកម្មវិធីរបស់អ្នករីកធំ។',
    lab: 'បន្ថែម route សម្រាប់ការបង្ហាញបញ្ជី និងការរក្សាទុកភារកិច្ចក្នុង routes/web.php។',
    result: 'Endpoints ត្រូវបានបង្កើតឡើងសម្រាប់ TaskController។',
    filename: 'routes/web.php',
    code: `use App\\Http\\Controllers\\TaskController;

Route::get('/', [TaskController::class, 'index']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::patch('/tasks/{task}', [TaskController::class, 'update']);`,
    icon: Globe,
  },
  {
    id: 'L13-S5', chapter: 'todo',
    title: 'ខួរក្បាលនៃកម្មវិធី', subtitle: 'ជំហានទី ៥៖ Controller Logic',
    accent: '#0ea5e9',
    bg: 'radial-gradient(ellipse at 10% 80%, rgba(14,165,233,0.06) 0%, transparent 60%)',
    concepts: [
      { label: 'Index Logic', desc: 'ទាញយក Task::latest()->get() និងបញ្ជូនវាទៅកាន់ view។' },
      { label: 'Store Logic', desc: 'ផ្ទៀងផ្ទាត់ការស្នើសុំ (request) និងរក្សាទុកភារកិច្ចទៅក្នុង DB។' },
      { label: 'Redirects', desc: 'ប្រើ return back() ដើម្បីរក្សាអ្នកប្រើប្រាស់នៅលើទំព័រដដែល។' },
    ],
    tip: 'ការផ្ទៀងផ្ទាត់ (Validation) ការពារ database របស់អ្នកពីទិន្នន័យទទេ ឬខ្សែអក្សរដែលមានបំណងអាក្រក់។',
    lab: 'សរសេរ index និង store methods នៅក្នុង TaskController របស់អ្នក។',
    result: 'Logic កម្មវិធីឥឡូវនេះអាចទទួល និងរក្សាទុកភារកិច្ចអ្នកប្រើប្រាស់ពិតប្រាកដ។',
    filename: 'app/Http/Controllers/TaskController.php',
    code: `public function index() {
    return view('tasks', ['tasks' => Task::latest()->get()]);
}

public function store(Request $request) {
    Task::create($request->validate(['title' => 'required']));
    return back();
}`,
    icon: Zap,
  },
  {
    id: 'L13-S6', chapter: 'todo',
    title: 'ការបង្ហាញឌីណាមិក', subtitle: 'ជំហានទី ៦៖ ការបង្ហាញភារកិច្ចម្តងមួយៗ',
    accent: '#0ea5e9',
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(14,165,233,0.1) 0%, transparent 55%)',
    concepts: [
      { label: '@forelse', desc: 'loop ដ៏មានថាមពលដែលគ្រប់គ្រងបញ្ជីទទេបានយ៉ាងល្អ។' },
      { label: 'Input Binding', desc: 'ភ្ជាប់ $task->id ទៅកាន់ទម្រង់ (forms) ធ្វើបច្ចុប្បន្នភាព។' },
      { label: 'UI Feedback', desc: 'បង្ហាញបន្ទាត់ឆូតពីលើប្រសិនបើ is_completed ពិត (true)។' },
    ],
    tip: 'ប្រើ Tailwind-colors (text-gray-400) សម្រាប់ធាតុដែលបានបញ្ចប់ដើម្បីបន្ថយអាទិភាពរូបភាពរបស់ពួកវា។',
    lab: 'អនុវត្ត @forelse loop នៅក្នុងឯកសារ tasks.blade.php របស់អ្នក។',
    result: 'បញ្ជីធ្វើបច្ចុប្បន្នភាពឌីណាមិកផ្អែកលើមាតិកា database របស់អ្នក។',
    filename: 'views/tasks.blade.php',
    code: `@forelse($tasks as $task)
    <li class="{{ $task->is_completed ? 'line-through text-gray-400' : '' }}">
        {{ $task->title }}
    </li>
@empty
    <p>No tasks yet. Take a break!</p>
@endforelse`,
    icon: List,
  },
  {
    id: 'L13-S7', chapter: 'todo',
    title: 'អន្តរកម្ម', subtitle: 'ជំហានទី ៧៖ ការបិទ/បើកស្ថានភាព',
    accent: '#0ea5e9',
    bg: 'radial-gradient(ellipse at 80% 20%, rgba(14,165,233,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'Toggle Logic', desc: '$task->update(["is_completed" => !$task->is_completed])។' },
      { label: 'Method Spoofing', desc: 'ប្រើ @method("PATCH") នៅក្នុង forms តូចៗរបស់អ្នក។' },
      { label: 'UX', desc: 'អ្នកប្រើប្រាស់ចុចប៊ូតុង ទំព័រ reload ហើយភារកិច្ចត្រូវបានឆូតចេញ។' },
    ],
    tip: 'form តូចមួយនៅជុំវិញប៊ូតុងគឺជាវិធីស្តង់ដារដើម្បីជម្រុញការផ្លាស់ប្តូរស្ថានភាពនៅក្នុង Blade។',
    lab: 'បន្ថែមប៊ូតុង toggle នៅខាងក្នុងធាតុបញ្ជីភារកិច្ចរបស់អ្នក។',
    result: 'ឥឡូវនេះអ្នកប្រើប្រាស់អាចកត់សម្គាល់ភារកិច្ចថាបានបញ្ចប់ក្នុងពេលជាក់ស្តែង។',
    filename: 'views/tasks.blade.php',
    code: `<form action="/tasks/{{ $task->id }}" method="POST">
    @csrf
    @method('PATCH')
    <button class="text-xs text-blue-500">
        {{ $task->is_completed ? 'Undo' : 'Done' }}
    </button>
</form>`,
    icon: RefreshCw,
  },
  {
    id: 'L13-S8', chapter: 'todo',
    title: 'ទីបញ្ចប់', subtitle: 'ជំហានទី ៨៖ ការតុបតែង និងការផ្ទៀងផ្ទាត់',
    accent: '#0ea5e9',
    bg: 'radial-gradient(ellipse at center, rgba(14,165,233,0.08) 0%, transparent 70%)',
    concepts: [
      { label: 'Error Messages', desc: 'ប្រើ @error("title") ដើម្បីបង្ហាញសារពណ៌ក្រហមប្រសិនបើការបញ្ចូលទិន្នន័យនៅទំនេរ។' },
      { label: 'Flash Success', desc: 'ប្រាប់អ្នកប្រើប្រាស់ថា "បានបន្ថែមភារកិច្ច!" ដោយប្រើ session()->flash()។' },
      { label: 'Optimization', desc: 'ពិនិត្យមើលកូដរបស់អ្នកសម្រាប់បញ្ហា N+1 query (ទោះបីជាមិនសូវមាននៅទីនេះក៏ដោយ)។' },
    ],
    tip: 'អ្នកប្រើប្រាស់ចូលចិត្តមតិកែលម្អ-សារជោគជ័យសាមញ្ញៗធ្វើឱ្យកម្មវិធីមានអារម្មណ៍ថា "រស់រវើក"។',
    lab: 'អនុវត្តការជូនដំណឹងអំពីការផ្ទៀងផ្ទាត់ និងផ្ទាំងជោគជ័យ។',
    result: 'កម្មវិធី Todo ដែលពេញលេញ និងមានលក្ខណៈវិជ្ជាជីវៈ។',
    filename: 'app/Http/Controllers/TaskController.php',
    code: `// Success flash message
return back()->with('success', 'Hooray! Task added.');

// In the view:
@if(session('success'))
    <div class="bg-green-100 text-green-700">...</div>
@endif`,
    icon: Trophy,
  },

  /* ── CHAPTER 14: E-COMMERCE CAPSTONE PROJECT ── */
  {
    id: 'L14-S1', chapter: 'assignment',
    title: 'វិសាលភាពកិច្ចការ', subtitle: 'បេសកកម្មដ៏អស្ចារ្យ',
    accent: '#f472b6',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(244,114,182,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Product Catalog', desc: 'បង្ហាញប្រភេទ (categories) ការស្វែងរក និងទំព័រលម្អិតទំនិញ។' },
      { label: 'Shopping Cart', desc: 'ប្រើ Laravel sessions ដើម្បីរក្សាស្ថានភាពសម្រាប់អ្នកប្រើប្រាស់ជាភ្ញៀវ។' },
      { label: 'Order Logic', desc: 'ទំនាក់ទំនងស្មុគស្មាញរវាង Users, Addresses និង Orders។' },
    ],
    tip: 'ចាប់ផ្តើមជាមួយ schema។ ប្រសិនបើ database របស់អ្នករឹងមាំ អ្វីៗដែលនៅសល់គឺគ្រាន់តែជាការតភ្ជាប់ប៉ុណ្ណោះ!',
    lab: 'រៀបចំបញ្ជី table database ធំៗយ៉ាងហោចណាស់ ៥ ដែលអ្នកនឹងត្រូវការ។',
    result: 'ផែនទីបង្ហាញផ្លូវច្បាស់លាស់សម្រាប់ការអភិវឌ្ឍន៍គម្រោង capstone របស់អ្នក។',
    filename: 'requirements.md',
    code: `Architecture Goals:
1. Custom Auth (Breeze/Jetstream)
2. Product CRUD with Image Upload
3. Cart Session Management
4. Email Receipts (via Queues)
5. Admin Dashboard for Orders`,
    icon: Star,
  },
  {
    id: 'L14-S2', chapter: 'assignment',
    title: 'ការរចនា Schema ស្នូល', subtitle: 'ដំណាក់កាលទី ១៖ ស្ថាបត្យកម្ម Database',
    accent: '#f472b6',
    bg: 'radial-gradient(ellipse at 80% 30%, rgba(244,114,182,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'Categories', desc: 'ទំនាក់ទំនងជាន់គ្នាសម្រាប់រុករក (ឧទាហរណ៍៖ គ្រឿងអេឡិចត្រូនិក > កុំព្យូទ័រយួរដៃ)។' },
      { label: 'Orders', desc: 'ភ្ជាប់អ្នកប្រើប្រាស់ទៅកាន់ "order_items" ជាច្រើនសម្រាប់តាមដានប្រវត្តិ។' },
      { label: 'Stock Tracking', desc: 'អនុវត្ត logic ដើម្បីការពារការលក់លើសចំនួនសម្រាប់ទំនិញដែលពេញនិយម។' },
    ],
    tip: 'ប្រើ polymorphic relations ប្រសិនបើអ្នកចង់ឱ្យអ្នកប្រើប្រាស់អាច "បញ្ចេញមតិ" លើទាំង Products និង Reviews។',
    lab: 'រចនាទំនាក់ទំនង "One-to-Many" រវាង Categories និង Products។',
    result: 'រចនាសម្ព័ន្ធទិន្នន័យដែលអាចពង្រីកបាន និងមានសមត្ថភាពគ្រប់គ្រងទំនិញរាប់ពាន់។',
    filename: 'database/migrations/order_items.php',
    code: `Schema::create('order_items', function (Blueprint $table) {
    $table->id();
    $table->foreignId('order_id')->constrained();
    $table->foreignId('product_id')->constrained();
    $table->integer('quantity');
    $table->decimal('price', 10, 2);
    $table->timestamps();
});`,
    icon: Workflow,
  },
  {
    id: 'L14-S3', chapter: 'assignment',
    title: 'ការបញ្ជូនចុងក្រោយ', subtitle: 'ដំណាក់កាលទី ២៖ ការដាក់ឱ្យប្រើប្រាស់ និងការតុបតែង',
    accent: '#f472b6',
    bg: 'radial-gradient(ellipse at center, rgba(244,114,182,0.1) 0%, transparent 70%)',
    concepts: [
      { label: 'Optimization', desc: 'ប្រើ eager loading (with()) ដើម្បីការពារ N+1 queries នៅពេលបង្ហាញបញ្ជីផលិតផល។' },
      { label: 'Gate Security', desc: 'ការពារ /admin routes របស់អ្នកដោយប្រើ Middleware ឬ Gate ផ្ទាល់ខ្លួន។' },
      { label: 'Deployment', desc: 'បញ្ជូនកូដរបស់អ្នកទៅកាន់ Forge, Vapor ឬ Heroku ដើម្បីឱ្យពិភពលោកបានឃើញ។' },
    ],
    tip: 'បង្កើត "Seed Profile" ដែលមានផលិតផល ១០០ និងប្រភេទ ១០ សម្រាប់ការសាកល្បងរបស់អ្នក។',
    lab: 'បញ្ចប់ឯកសារ README.md របស់អ្នក និង push repository របស់អ្នកទៅកាន់ GitHub។',
    result: 'បំណែក portfolio វិជ្ជាជីវៈដែលត្រៀមរួចជាស្រេចសម្រាប់និយោជកសក្តានុពល។',
    filename: 'README.md',
    code: `# Project Nebula E-commerce
## Tech Stack
- Laravel 11 (PHP 8.3)
- Tailwind CSS
- MySQL
- Stripe API Integration

## Features
- Real-time cart updates
- One-click checkout
- Administrative inventory controls`,
    icon: Trophy,
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

    const parts = line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|$[a-zA-Z_]\w*|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_]\w*\b)/g);
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
              {t === 'code' ? 'Code' : 'Terminal'}
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
            {copied ? <><Check className="w-3 h-3" />បានចម្លង</> : <><Copy className="w-3 h-3" />ចម្លង</>}
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
              <span className="text-blue-400">~/laravel-app</span>
              <span className="text-zinc-600 font-bold">$</span>
              <span className="text-zinc-200">{terminal || 'php artisan serve'}</span>
            </div>
            {output
              ? <pre className="text-zinc-200 whitespace-pre-wrap">{output}</pre>
              : <div className="text-zinc-600 animate-pulse">No output yet.</div>
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
  const chapterParam = searchParams.get('chapter') || 'setup';

  // ISOLATE SLIDES: Only show slides for the active chapter (2-5 slides)
  const activeSlides = slides.filter(s => s.chapter === chapterParam);
  const displaySlides = activeSlides.length > 0 ? activeSlides : slides.filter(s => s.chapter === 'setup');

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
    const saved = localStorage.getItem('laravel_slide_notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const saveNote = (val: string) => {
    const next = { ...notes, [slide.id]: val };
    setNotes(next);
    localStorage.setItem('laravel_slide_notes', JSON.stringify(next));
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const newSlideVal = (current + 1).toString();
    const currentSlideParam = params.get('slide');

    // For better UX, only show &slide if we are past the first one
    if (current === 0) {
      if (currentSlideParam) {
        params.delete('slide');
        router.replace(`?${params.toString()}`, { scroll: false });
      }
    } else if (currentSlideParam !== newSlideVal) {
      params.set('slide', newSlideVal);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [current, router, searchParams]);

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
      // Don't navigate if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, isAnimating]); // Keep deps to ensure functions use closure-latest state or depend on functions

  const variants = {
    enter: (d: number) => ({ y: d * 30, opacity: 0, scale: 0.98 }),
    center: { y: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ y: d * -30, opacity: 0, scale: 0.98 }),
  };

  return (
    <div className="min-h-screen text-white flex flex-col overflow-hidden"
      style={{ background: '#07090f', fontFamily: "'Inter','DM Sans',system-ui,sans-serif" }}>

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none transition-all duration-700" style={{ background: slide.bg }} />
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.04) 0%, transparent 60%)' }} />

      {/* ── CHAPTER NAV BAR (NEW VERSION) ── */}
      <div className="relative z-[60] flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5 bg-black/60 backdrop-blur-2xl custom-header">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/courses/backend" 
            className="group flex items-center gap-3 px-3 sm:px-4 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 shadow-xl">
            <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors hidden lg:block">ចាកចេញ</span>
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
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 hidden sm:block">ផែនទីមេរៀន</span>
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
              <span className="text-zinc-500 uppercase tracking-widest font-black hidden lg:block">ភាពស្ទាត់ជំនាញនៃជំពូក</span>
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
               <span className="text-[9px] font-black text-zinc-600 uppercase tracking-tighter mb-0.5 hidden xs:block">ស្លាយ</span>
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
                          const params = new URLSearchParams();
                          params.set('chapter', ch.id);
                          router.push(`?${params.toString()}`);
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
                              ផ្នែកទី {i + 1}
                            </span>
                            {isActive && (
                              <span className="text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 rounded bg-white text-black uppercase tracking-tighter">បច្ចុប្បន្ន</span>
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
                      ការរុករកម៉ូឌុល
                   </div>
                   <div className="hidden lg:flex items-center gap-2 text-zinc-600 text-[10px] font-bold">
                      <span className="w-1 h-1 rounded-full bg-zinc-700" />
                      ជ្រើសរើសជំពូកដើម្បីទៅកាន់ស្លាយទាំងនោះដោយផ្ទាល់
                   </div>
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono text-zinc-500 bg-white/5 px-3 py-1 rounded-lg border border-white/5 uppercase tracking-tighter">
                   FULLSTACK ACADEMY • LARAVEL 11
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MAIN LAYOUT ── */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* LEFT — Concept cards */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={`left-${current}`} custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="flex-none lg:w-[45%] flex flex-col p-6 lg:p-10 xl:p-14 lg:border-r border-white/6 overflow-y-auto gap-6">

            {/* Title block */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-none border border-white/10"
                style={{ background: `${slide.accent}18` }}>
                <Icon className="w-6 h-6" style={{ color: slide.accent }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] px-2 py-0.5 rounded-full border"
                    style={{ color: chapterInfo.color, borderColor: `${chapterInfo.color}40`, background: `${chapterInfo.color}12` }}>
                    {chapterInfo.label}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-700">{slide.id}</span>
                </div>
                <h1 className="text-3xl xl:text-4xl font-black leading-tight text-white tracking-tighter">
                  {slide.title}
                </h1>
                <p className="text-sm text-white/40 font-bold uppercase tracking-widest mt-1">{slide.subtitle}</p>
              </div>
            </div>

            {/* Concept cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {slide.concepts.map((c, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.06 }}
                  className="rounded-xl border p-4 flex flex-col gap-1.5"
                  style={{ borderColor: `${slide.accent}20`, background: `${slide.accent}06` }}>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: slide.accent }}>
                    {c.label}
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Pro tip */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="rounded-xl border border-amber-500/15 bg-amber-500/5 p-4 flex gap-3">
              <Sparkles className="w-4 h-4 text-amber-400 flex-none mt-0.5" />
              <p className="text-sm text-amber-200/80 leading-relaxed"><span className="font-black text-amber-400">គន្លឹះពិសេស: </span>{slide.tip}</p>
            </motion.div>

            {/* Lab + Result */}
            <div className="space-y-3">
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
                className="rounded-xl border p-4 flex gap-3"
                style={{ background: `${slide.accent}08`, borderColor: `${slide.accent}25` }}>
                <Play className="w-4 h-4 flex-none mt-0.5" style={{ color: slide.accent }} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1.5" style={{ color: slide.accent }}>ការអនុវត្តជាក់ស្តែង (Lab Exercise)</p>
                  <p className="text-sm text-white font-semibold leading-relaxed">{slide.lab}</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4 flex gap-3">
                <Check className="w-4 h-4 flex-none mt-0.5 text-emerald-400" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 text-emerald-400">លទ្ធផលរំពឹងទុក (Expected Result)</p>
                  <p className="text-sm text-white font-semibold leading-relaxed">{slide.result}</p>
                </div>
              </motion.div>
            </div>

            {/* Nav buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button onClick={prev}
                className="p-3 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2 group">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-xs font-bold hidden sm:inline text-zinc-400">ថយក្រោយ</span>
              </button>
              <button onClick={next}
                className="flex-1 py-3 px-5 rounded-xl font-black text-xs active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
                style={{ background: slide.accent, color: '#000' }}>
                {current === displaySlides.length - 1 ? 'ចាប់ផ្តើមឡើងវិញ' : 'បន្ទាប់'}
                <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => setShowNotes(!showNotes)}
                className={`p-3 rounded-xl border transition-all ${
                  showNotes ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-white/5 border-white/8 text-zinc-500 hover:text-white'
                }`}>
                <StickyNote className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* RIGHT — Code panel */}
        <div className="flex-none lg:w-[55%] flex flex-col p-4 lg:p-8 xl:p-10 gap-4 overflow-hidden">
          <div className="flex items-center gap-2 flex-none">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/8 bg-white/5"
              style={{ color: slide.accent }}>
              <Terminal className="w-3.5 h-3.5" />
              កម្មវិធីកែសម្រួលអន្តរកម្ម
            </div>
            <div className="ml-auto text-[10px] font-mono text-zinc-700 hidden sm:block">
              ប្រើគ្រាប់ចុចព្រួញ ← → ដើម្បីរុករក
            </div>
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
                terminal={slide.terminal}
                terminalOutput={slide.terminalOutput}
                accent={slide.accent}
                filename={slide.filename}
              />
            </motion.div>
          </AnimatePresence>
        </div>
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
            <p className="mt-4 text-[10px] text-zinc-700 font-bold uppercase leading-relaxed">
              រក្សាទុកតាមស្លាយក្នុង localStorage
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
