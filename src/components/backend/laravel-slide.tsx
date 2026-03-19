"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ChevronLeft, ChevronRight, Code2, Copy, Check, RotateCcw,
  Terminal, Rocket, Database, Globe, Lock, Shield, Zap, Layers,
  Server, Package, Workflow, FileCode, ArrowRight, BookOpen,
  GitBranch, Star, Trophy, ShoppingCart, Key, Fingerprint,
  List, RefreshCw, Send, Search, Activity, StickyNote, Play,
  Box, HardDrive, Layout, Edit3, Sparkles, Clock,
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
  filename: string;
  code: string;
  terminal?: string;
  terminalOutput?: string;
  icon: React.ElementType;
}

/* ─── CHAPTERS ───────────────────────────────────────────────────── */
const CHAPTERS = [
  { id: 'setup',        label: '01 · Setup',        color: '#f43f5e' },
  { id: 'routing',      label: '02 · Routing',       color: '#f97316' },
  { id: 'controllers',  label: '03 · Controllers',   color: '#eab308' },
  { id: 'blade',        label: '04 · Blade',         color: '#22c55e' },
  { id: 'eloquent',     label: '05 · Eloquent',      color: '#06b6d4' },
  { id: 'auth',         label: '06 · Auth & API',    color: '#a855f7' },
  { id: 'queues',       label: '07 · Queues & Jobs', color: '#ec4899' },
];

/* ─── SLIDE DATA ─────────────────────────────────────────────────── */
const slides: Slide[] = [
  /* ── CHAPTER 1: SETUP ── */
  {
    id: 'S1-1', chapter: 'setup',
    title: 'Install Laravel', subtitle: 'Composer create-project',
    accent: '#f43f5e',
    bg: 'radial-gradient(ellipse at 10% 20%, rgba(244,63,94,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Composer', desc: 'PHP dependency manager — required before anything else.' },
      { label: 'create-project', desc: 'Scaffolds a fresh Laravel app with all dependencies.' },
      { label: 'PHP 8.2+', desc: 'Laravel 11 requires PHP 8.2 minimum.' },
      { label: 'APP_KEY', desc: 'Auto-generated encryption key stored in .env.' },
    ],
    tip: 'Use `laravel new app-name` (Laravel installer) for an even faster setup with optional starter kits.',
    lab: 'Run the install command and verify the welcome page at localhost:8000.',
    result: 'Laravel welcome screen loads with no errors.',
    filename: 'terminal',
    code: `# 1. Install Laravel globally (optional shortcut)
composer global require laravel/installer

# 2. Create a new project
composer create-project laravel/laravel my-app

# 3. Enter the project
cd my-app

# 4. Start the dev server
php artisan serve`,
    terminal: 'php artisan serve',
    terminalOutput: `   INFO  Server running on [http://127.0.0.1:8000].

  Press Ctrl+C to stop the server

2026-03-19 10:00:01 ......... GET / ✔  200  12ms`,
    icon: Rocket,
  },
  {
    id: 'S1-2', chapter: 'setup',
    title: 'Folder Structure', subtitle: 'Know your way around',
    accent: '#f43f5e',
    bg: 'radial-gradient(ellipse at 80% 30%, rgba(244,63,94,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'app/', desc: 'Core logic — Models, Controllers, Middleware.' },
      { label: 'routes/', desc: 'All URL definitions: web.php, api.php, console.php.' },
      { label: 'resources/', desc: 'Blade views, raw CSS/JS before compilation.' },
      { label: 'database/', desc: 'Migrations, Seeders, and Factories.' },
    ],
    tip: 'The public/ folder is the only directory exposed to the web. Everything else is protected.',
    lab: 'Open routes/web.php and trace how the "/" route returns the welcome view.',
    result: 'You can explain the full request path from URL to rendered HTML.',
    filename: 'project-map.md',
    code: `my-app/
├── app/
│   ├── Http/
│   │   ├── Controllers/   ← Your logic lives here
│   │   └── Middleware/    ← Request filters
│   └── Models/            ← Eloquent models
├── config/                ← App settings
├── database/
│   ├── migrations/        ← Schema version control
│   └── seeders/           ← Test data
├── public/                ← Web root (index.php)
├── resources/
│   └── views/             ← Blade templates
├── routes/
│   ├── web.php            ← Browser routes
│   └── api.php            ← API routes
└── .env                   ← Secrets (never commit!)`,
    icon: HardDrive,
  },
  {
    id: 'S1-3', chapter: 'setup',
    title: 'The .env File', subtitle: 'Environment configuration',
    accent: '#f43f5e',
    bg: 'radial-gradient(ellipse at 40% 70%, rgba(244,63,94,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'APP_ENV', desc: 'local / production — controls debug mode and caching.' },
      { label: 'APP_DEBUG', desc: 'Set to false in production — never expose stack traces.' },
      { label: 'DB_*', desc: 'Database connection credentials for your environment.' },
      { label: 'APP_KEY', desc: 'Run php artisan key:generate if missing.' },
    ],
    tip: 'Always add .env to .gitignore. Commit .env.example with placeholder values instead.',
    lab: 'Set DB_DATABASE=laravel_app and create that database in MySQL.',
    result: 'php artisan migrate runs without a connection error.',
    filename: '.env',
    code: `APP_NAME=LaravelApp
APP_ENV=local
APP_KEY=base64:abc123...
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_app
DB_USERNAME=root
DB_PASSWORD=

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync`,
    icon: Shield,
  },

  /* ── CHAPTER 2: ROUTING ── */
  {
    id: 'S2-1', chapter: 'routing',
    title: 'Basic Routes', subtitle: 'Mapping URLs to responses',
    accent: '#f97316',
    bg: 'radial-gradient(ellipse at 20% 50%, rgba(249,115,22,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Route::get()', desc: 'Handles HTTP GET — used for displaying pages.' },
      { label: 'Route::post()', desc: 'Handles HTTP POST — used for form submissions.' },
      { label: 'Closure', desc: 'An inline function as the route handler (fine for prototyping).' },
      { label: 'web.php', desc: 'All browser-facing routes with session & CSRF support.' },
    ],
    tip: 'Returning an array from a route auto-converts it to JSON — great for quick API testing.',
    lab: 'Create a /hello route that returns your name and the current timestamp.',
    result: 'Visiting /hello shows a JSON or text response in the browser.',
    filename: 'routes/web.php',
    code: `<?php

use Illuminate\\Support\\Facades\\Route;

// Simple text response
Route::get('/hello', function () {
    return 'Hello from Laravel!';
});

// JSON response (array auto-converts)
Route::get('/status', function () {
    return [
        'app'     => config('app.name'),
        'status'  => 'online',
        'time'    => now()->toDateTimeString(),
    ];
});

// Named route — use in Blade: route('home')
Route::get('/', function () {
    return view('welcome');
})->name('home');`,
    icon: Workflow,
  },
  {
    id: 'S2-2', chapter: 'routing',
    title: 'Route Parameters', subtitle: 'Dynamic URL segments',
    accent: '#f97316',
    bg: 'radial-gradient(ellipse at 70% 20%, rgba(249,115,22,0.12) 0%, transparent 55%)',
    concepts: [
      { label: '{param}', desc: 'Required segment — 404 if missing.' },
      { label: '{param?}', desc: 'Optional segment — provide a default value.' },
      { label: 'whereNumber()', desc: 'Constrain param to digits only.' },
      { label: 'Route Model Binding', desc: 'Laravel auto-fetches the model by ID for you.' },
    ],
    tip: 'Route Model Binding eliminates the need to manually call Model::findOrFail($id) in every controller.',
    lab: 'Create /product/{id} that returns the product ID. Add a constraint so only numbers are accepted.',
    result: '/product/42 works. /product/abc returns 404.',
    filename: 'routes/web.php',
    code: `<?php

// Required parameter
Route::get('/user/{id}', function ($id) {
    return "Profile of user: {$id}";
});

// Optional parameter with default
Route::get('/greet/{name?}', function ($name = 'Guest') {
    return "Hello, {$name}!";
});

// Constrained — only digits allowed
Route::get('/post/{id}', function ($id) {
    return "Post #{$id}";
})->whereNumber('id');

// Route Model Binding — auto-fetches User by ID
use App\\Models\\User;
Route::get('/profile/{user}', function (User $user) {
    return $user;
});`,
    icon: ArrowRight,
  },
  {
    id: 'S2-3', chapter: 'routing',
    title: 'Route Groups', subtitle: 'Shared prefixes & middleware',
    accent: '#f97316',
    bg: 'radial-gradient(ellipse at 50% 80%, rgba(249,115,22,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'prefix()', desc: 'Prepend a URL segment to all routes in the group.' },
      { label: 'middleware()', desc: 'Apply auth or other middleware to a group at once.' },
      { label: 'name()', desc: 'Prefix route names for cleaner namespacing.' },
      { label: 'Nesting', desc: 'Groups can be nested for complex permission structures.' },
    ],
    tip: 'Group your admin routes under prefix("admin")->middleware("auth") to protect them all in one line.',
    lab: 'Create an admin group with /admin/dashboard and /admin/users routes.',
    result: 'Both routes share the /admin prefix and are listed in php artisan route:list.',
    filename: 'routes/web.php',
    code: `<?php

use Illuminate\\Support\\Facades\\Route;

// Admin group — prefix + middleware + name prefix
Route::prefix('admin')
    ->middleware('auth')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', function () {
            return 'Admin Dashboard';
        })->name('dashboard'); // → admin.dashboard

        Route::get('/users', function () {
            return 'User Management';
        })->name('users'); // → admin.users

    });

// Check all routes:
// php artisan route:list`,
    terminal: 'php artisan route:list',
    terminalOutput: `  GET|HEAD  /                    home
  GET|HEAD  admin/dashboard      admin.dashboard
  GET|HEAD  admin/users          admin.users`,
    icon: Layers,
  },

  /* ── CHAPTER 3: CONTROLLERS ── */
  {
    id: 'S3-1', chapter: 'controllers',
    title: 'Creating Controllers', subtitle: 'Artisan make:controller',
    accent: '#eab308',
    bg: 'radial-gradient(ellipse at 15% 40%, rgba(234,179,8,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'make:controller', desc: 'Artisan command that generates the class file instantly.' },
      { label: '--resource', desc: 'Generates all 7 CRUD methods: index, create, store, show, edit, update, destroy.' },
      { label: '--api', desc: 'Like --resource but skips create/edit (no HTML forms needed for APIs).' },
      { label: 'extends Controller', desc: 'Inherits helpers like validate(), middleware(), authorize().' },
    ],
    tip: 'Always use --resource or --api. Writing CRUD methods manually is a waste of time.',
    lab: 'Generate a ProductController with --resource and connect it to Route::resource.',
    result: 'php artisan route:list shows 7 product routes automatically.',
    filename: 'terminal',
    code: `# Generate a resource controller
php artisan make:controller ProductController --resource

# Generated file: app/Http/Controllers/ProductController.php
# Methods: index, create, store, show, edit, update, destroy

# Connect to routes/web.php in ONE line:
# Route::resource('products', ProductController::class);

# This creates all 7 routes:
# GET    /products           → index
# GET    /products/create    → create
# POST   /products           → store
# GET    /products/{id}      → show
# GET    /products/{id}/edit → edit
# PUT    /products/{id}      → update
# DELETE /products/{id}      → destroy`,
    terminal: 'php artisan make:controller ProductController --resource',
    terminalOutput: '   INFO  Controller [app/Http/Controllers/ProductController.php] created successfully.',
    icon: Terminal,
  },
  {
    id: 'S3-2', chapter: 'controllers',
    title: 'Request & Response', subtitle: 'Reading input, sending output',
    accent: '#eab308',
    bg: 'radial-gradient(ellipse at 75% 55%, rgba(234,179,8,0.12) 0%, transparent 55%)',
    concepts: [
      { label: '$request->input()', desc: 'Read a specific field from POST/GET data.' },
      { label: '$request->all()', desc: 'Get all input as an associative array.' },
      { label: '$request->validated()', desc: 'Only returns fields that passed validation rules.' },
      { label: 'response()->json()', desc: 'Return a JSON response with a custom HTTP status code.' },
    ],
    tip: 'Always use $request->validated() after validation — never trust raw $request->all() for DB writes.',
    lab: 'Build a store() method that reads name and price from the request and returns them as JSON.',
    result: 'POST /products with JSON body returns the submitted data with status 201.',
    filename: 'app/Http/Controllers/ProductController.php',
    code: `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        // Validate incoming data
        $data = $request->validate([
            'name'  => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        // $data only contains 'name' and 'price'
        $product = \\App\\Models\\Product::create($data);

        return response()->json([
            'message' => 'Product created',
            'data'    => $product,
        ], 201);
    }
}`,
    icon: Send,
  },
  {
    id: 'S3-3', chapter: 'controllers',
    title: 'Validation', subtitle: 'Protecting your data layer',
    accent: '#eab308',
    bg: 'radial-gradient(ellipse at 40% 20%, rgba(234,179,8,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'validate()', desc: 'Throws a 422 with error messages if rules fail.' },
      { label: 'Form Request', desc: 'Dedicated class for complex validation logic — keeps controllers clean.' },
      { label: 'Rule::unique()', desc: 'Ensures a value does not already exist in the database.' },
      { label: 'bail', desc: 'Stop running rules for a field after the first failure.' },
    ],
    tip: 'Use php artisan make:request StoreProductRequest to extract validation into its own class.',
    lab: 'Add a unique rule so no two products can share the same name.',
    result: 'Submitting a duplicate name returns a 422 with a clear error message.',
    filename: 'app/Http/Requests/StoreProductRequest.php',
    code: `<?php

namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;
use Illuminate\\Validation\\Rule;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Add policy check here later
    }

    public function rules(): array
    {
        return [
            'name'  => [
                'required', 'string', 'max:255',
                Rule::unique('products', 'name'),
            ],
            'price' => 'required|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
        ];
    }
}`,
    icon: Shield,
  },

  /* ── CHAPTER 4: BLADE ── */
  {
    id: 'S4-1', chapter: 'blade',
    title: 'Blade Syntax', subtitle: 'Laravel\'s template engine',
    accent: '#22c55e',
    bg: 'radial-gradient(ellipse at 20% 60%, rgba(34,197,94,0.15) 0%, transparent 55%)',
    concepts: [
      { label: '{{ $var }}', desc: 'Echo a variable — HTML-escaped automatically (XSS safe).' },
      { label: '{!! $html !!}', desc: 'Echo raw HTML — only use with trusted content.' },
      { label: '@if / @foreach', desc: 'Directives replace <?php ?> tags for cleaner templates.' },
      { label: '@csrf', desc: 'Injects a hidden token field — required in every POST form.' },
    ],
    tip: 'Always use {{ }} over {!! !!} unless you explicitly need to render HTML. It prevents XSS attacks.',
    lab: 'Create a Blade view that loops through a $products array and renders a card for each.',
    result: 'Page shows a list of product cards with name and price.',
    filename: 'resources/views/products/index.blade.php',
    code: `{{-- resources/views/products/index.blade.php --}}
@extends('layouts.app')

@section('title', 'Products')

@section('content')
  <h1 class="text-2xl font-bold mb-6">All Products</h1>

  @forelse($products as $product)
    <div class="card">
      <h2>{{ $product->name }}</h2>
      <p>Price: \${{ number_format($product->price, 2) }}</p>

      @if($product->stock > 0)
        <span class="badge-green">In Stock</span>
      @else
        <span class="badge-red">Out of Stock</span>
      @endif
    </div>
  @empty
    <p class="text-gray-400">No products found.</p>
  @endforelse

  {{ $products->links() }}  {{-- Pagination --}}
@endsection`,
    icon: Layout,
  },
  {
    id: 'S4-2', chapter: 'blade',
    title: 'Layouts & Components', subtitle: 'Reusable UI architecture',
    accent: '#22c55e',
    bg: 'radial-gradient(ellipse at 70% 40%, rgba(34,197,94,0.12) 0%, transparent 55%)',
    concepts: [
      { label: '@extends', desc: 'Inherit a master layout file.' },
      { label: '@yield / @section', desc: 'Define and fill named content slots.' },
      { label: 'x-component', desc: 'Blade components — reusable UI with props (like React).' },
      { label: '@props', desc: 'Declare expected props inside a component file.' },
    ],
    tip: 'Blade components (x-*) are the modern approach. Use @extends for simple layouts, components for reusable UI.',
    lab: 'Create an x-card component that accepts a $title prop and wrap your product cards with it.',
    result: '<x-card title="MacBook"> renders a styled card with the title.',
    filename: 'resources/views/components/card.blade.php',
    code: `{{-- resources/views/components/card.blade.php --}}
@props(['title', 'badge' => null])

<div class="rounded-2xl border border-white/10 bg-white/5 p-6">
  <div class="flex items-center justify-between mb-3">
    <h3 class="font-bold text-white text-lg">{{ $title }}</h3>
    @if($badge)
      <span class="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
        {{ $badge }}
      </span>
    @endif
  </div>

  {{-- $slot = everything between the tags --}}
  <div class="text-zinc-400">{{ $slot }}</div>
</div>

{{-- Usage in any view: --}}
{{-- <x-card title="MacBook Pro" badge="In Stock"> --}}
{{--   <p>Price: $1,299</p> --}}
{{-- </x-card> --}}`,
    icon: Box,
  },

  /* ── CHAPTER 5: ELOQUENT ── */
  {
    id: 'S5-1', chapter: 'eloquent',
    title: 'Models & Migrations', subtitle: 'Schema as code',
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at 15% 30%, rgba(6,182,212,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'make:model -m', desc: 'Creates the model AND its migration file in one command.' },
      { label: '$fillable', desc: 'Whitelist columns for mass assignment — security requirement.' },
      { label: 'Blueprint', desc: 'Fluent API for defining table columns and indexes.' },
      { label: 'timestamps()', desc: 'Adds created_at and updated_at columns automatically.' },
    ],
    tip: 'Always run php artisan migrate:fresh --seed in development to reset and repopulate your DB cleanly.',
    lab: 'Create a Product model with migration. Add name, price, stock, and category_id columns.',
    result: 'php artisan migrate creates the products table with all columns.',
    filename: 'database/migrations/create_products_table.php',
    code: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->decimal('price', 8, 2);
            $table->unsignedInteger('stock')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};`,
    terminal: 'php artisan migrate',
    terminalOutput: `   INFO  Running migrations.

  2026_03_19_000001_create_categories_table  10ms DONE
  2026_03_19_000002_create_products_table    14ms DONE`,
    icon: Database,
  },
  {
    id: 'S5-2', chapter: 'eloquent',
    title: 'CRUD with Eloquent', subtitle: 'Create, Read, Update, Delete',
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at 75% 65%, rgba(6,182,212,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'create()', desc: 'Insert a new row — requires $fillable to be set.' },
      { label: 'findOrFail()', desc: 'Fetch by ID or throw a 404 automatically.' },
      { label: 'update()', desc: 'Update fields on an existing model instance.' },
      { label: 'delete()', desc: 'Remove the record. Use SoftDeletes trait to keep it hidden.' },
    ],
    tip: 'Use firstOrCreate() to avoid duplicate inserts — it finds or creates in a single query.',
    lab: 'Write all 4 CRUD operations for Product in a controller. Test each with Postman.',
    result: 'All 4 operations work and return appropriate HTTP status codes.',
    filename: 'app/Http/Controllers/ProductController.php',
    code: `<?php

use App\\Models\\Product;
use Illuminate\\Http\\Request;

class ProductController extends Controller
{
    // READ all
    public function index() {
        return Product::with('category')->latest()->paginate(10);
    }

    // CREATE
    public function store(Request $request) {
        $product = Product::create($request->validated());
        return response()->json($product, 201);
    }

    // UPDATE
    public function update(Request $request, Product $product) {
        $product->update($request->validated());
        return response()->json($product);
    }

    // DELETE
    public function destroy(Product $product) {
        $product->delete();
        return response()->json(null, 204);
    }
}`,
    icon: RefreshCw,
  },
  {
    id: 'S5-3', chapter: 'eloquent',
    title: 'Relationships', subtitle: 'hasMany, belongsTo, many-to-many',
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse at 40% 20%, rgba(6,182,212,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'hasMany', desc: 'One category has many products.' },
      { label: 'belongsTo', desc: 'Each product belongs to one category.' },
      { label: 'belongsToMany', desc: 'Products can have many tags via a pivot table.' },
      { label: 'with()', desc: 'Eager load relations to avoid the N+1 query problem.' },
    ],
    tip: 'Always eager load with with() when you know you\'ll access a relation in a loop. N+1 kills performance.',
    lab: 'Define hasMany on Category and belongsTo on Product. Load categories with their products.',
    result: '$category->products returns a collection of related Product models.',
    filename: 'app/Models/Category.php',
    code: `<?php

// app/Models/Category.php
class Category extends Model
{
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}

// app/Models/Product.php
class Product extends Model
{
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Many-to-many with Tag via product_tag pivot
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}

// Usage — eager load to avoid N+1:
$categories = Category::with('products')->get();

foreach ($categories as $cat) {
    echo $cat->name . ': ' . $cat->products->count();
}`,
    icon: GitBranch,
  },

  /* ── CHAPTER 6: AUTH & API ── */
  {
    id: 'S6-1', chapter: 'auth',
    title: 'Laravel Sanctum', subtitle: 'Token-based API auth',
    accent: '#a855f7',
    bg: 'radial-gradient(ellipse at 20% 50%, rgba(168,85,247,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Sanctum', desc: 'Lightweight auth for SPAs and mobile apps using API tokens.' },
      { label: 'HasApiTokens', desc: 'Trait added to the User model to enable token creation.' },
      { label: 'createToken()', desc: 'Issues a new personal access token for the user.' },
      { label: 'auth:sanctum', desc: 'Middleware that validates the Bearer token on protected routes.' },
    ],
    tip: 'Store the token in httpOnly cookies for SPAs, or in secure storage for mobile apps — never in localStorage.',
    lab: 'Build a /api/login endpoint that returns a token. Protect /api/me with auth:sanctum.',
    result: 'GET /api/me with a valid Bearer token returns the authenticated user.',
    filename: 'app/Http/Controllers/AuthController.php',
    code: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\User;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function me(Request $request)
    {
        return $request->user();
    }
}`,
    terminal: 'php artisan install:api',
    terminalOutput: '   INFO  API scaffolding installed. Add HasApiTokens to your User model.',
    icon: Key,
  },
  {
    id: 'S6-2', chapter: 'auth',
    title: 'API Resources', subtitle: 'Transforming JSON output',
    accent: '#a855f7',
    bg: 'radial-gradient(ellipse at 70% 30%, rgba(168,85,247,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'API Resource', desc: 'A transformation layer between your model and JSON output.' },
      { label: 'toArray()', desc: 'Define exactly which fields are exposed in the response.' },
      { label: 'ResourceCollection', desc: 'Wraps a collection of resources with pagination metadata.' },
      { label: '$hidden', desc: 'Model-level field hiding — password, remember_token, etc.' },
    ],
    tip: 'API Resources decouple your DB schema from your API contract. Rename columns without breaking clients.',
    lab: 'Create a ProductResource that exposes id, name, formatted_price, and category name.',
    result: 'GET /api/products returns clean JSON with no raw DB column names leaking.',
    filename: 'app/Http/Resources/ProductResource.php',
    code: `<?php

namespace App\\Http\\Resources;

use Illuminate\\Http\\Resources\\Json\\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'              => $this->id,
            'name'            => $this->name,
            'formatted_price' => '$' . number_format($this->price, 2),
            'in_stock'        => $this->stock > 0,
            'category'        => $this->whenLoaded('category', fn() => [
                'id'   => $this->category->id,
                'name' => $this->category->name,
            ]),
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}

// Usage in controller:
// return ProductResource::collection(Product::with('category')->paginate(10));`,
    icon: Package,
  },
  {
    id: 'S6-3', chapter: 'auth',
    title: 'Deployment Checklist', subtitle: 'Going to production',
    accent: '#a855f7',
    bg: 'radial-gradient(ellipse at 50% 70%, rgba(168,85,247,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'APP_DEBUG=false', desc: 'Never expose stack traces in production.' },
      { label: 'optimize', desc: 'Cache config, routes, and views for maximum speed.' },
      { label: 'migrate --force', desc: 'Run migrations non-interactively on the server.' },
      { label: 'Queue Worker', desc: 'Run php artisan queue:work as a background process.' },
    ],
    tip: 'Use Laravel Forge or Railway for zero-downtime deployments with automatic SSL and queue management.',
    lab: 'Run the full production optimization sequence on your local app and measure response time.',
    result: 'App loads noticeably faster. php artisan route:list shows cached routes.',
    filename: 'terminal — deploy.sh',
    code: `#!/bin/bash
# deploy.sh — run on your server after git pull

# 1. Install dependencies (no dev packages)
composer install --no-dev --optimize-autoloader

# 2. Run pending migrations
php artisan migrate --force

# 3. Cache everything for speed
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 4. Restart queue workers
php artisan queue:restart

echo "✅ Deployment complete."`,
    terminal: 'php artisan optimize',
    terminalOutput: `   INFO  Caching configuration.
   INFO  Caching routes.
   INFO  Caching Blade templates.

   INFO  Optimization complete.`,
    icon: Rocket,
  },
  /* ── CHAPTER 7: QUEUES & JOBS ── */
  {
    id: 'S7-1', chapter: 'queues',
    title: 'Background Jobs', subtitle: 'Processing tasks asynchronously',
    accent: '#ec4899',
    bg: 'radial-gradient(ellipse at 20% 50%, rgba(236,72,153,0.15) 0%, transparent 55%)',
    concepts: [
      { label: 'Why Queues?', desc: 'Never make users wait for slow tasks like sending emails or processing video.' },
      { label: 'QUEUE_CONNECTION', desc: 'Set to redis or database in production, sync for local dev.' },
      { label: 'make:job', desc: 'Artisan command to create a new job class.' },
      { label: 'handle()', desc: 'The method inside the job class where the heavy lifting happens.' },
    ],
    tip: 'Always dispatch email sending to a queue. It makes your API response time instant instead of taking 2+ seconds.',
    lab: 'Create a SendWelcomeEmail job and dispatch it from your registration controller.',
    result: 'The user receives the email, but your API responds in < 50ms.',
    filename: 'terminal',
    code: `# 1. Create the migrations for the jobs table
php artisan make:queue-table
php artisan migrate

# 2. Set QUEUE_CONNECTION=database in .env

# 3. Create a new Job class
php artisan make:job ProcessPayment`,
    terminal: 'php artisan make:job ProcessPayment',
    terminalOutput: '   INFO  Job [app/Jobs/ProcessPayment.php] created successfully.',
    icon: Clock,
  },
  {
    id: 'S7-2', chapter: 'queues',
    title: 'Dispatching & Workers', subtitle: 'Executing the background tasks',
    accent: '#ec4899',
    bg: 'radial-gradient(ellipse at 70% 30%, rgba(236,72,153,0.12) 0%, transparent 55%)',
    concepts: [
      { label: 'dispatch()', desc: 'Send the job to the queue implicitly.' },
      { label: 'delay()', desc: 'Schedule the job to run after a certain amount of time.' },
      { label: 'queue:work', desc: 'The daemon process that constantly listens for new jobs and runs them.' },
      { label: 'Supervisor', desc: 'A Linux process manager used in production to keep queue:work running forever.' },
    ],
    tip: 'In production, use Laravel Horizon for a beautiful dashboard to monitor your Redis queues.',
    lab: 'Dispatch a job with a 5-minute delay and watch it appear in the database jobs table.',
    result: 'The job waits patiently in the table until the worker picks it up 5 minutes later.',
    filename: 'app/Http/Controllers/OrderController.php',
    code: `<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessPayment;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        // 1. Create the order in DB instantly
        $order = Order::create($request->all());

        // 2. Dispatch payment processing to background!
        ProcessPayment::dispatch($order->id);

        // 3. You can also delay execution
        // ProcessPayment::dispatch($order->id)->delay(now()->addMinutes(10));

        // 4. Respond to user immediately
        return response()->json(['message' => 'Order received!'], 201);
    }
}`,
    icon: Zap,
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
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setCode(initialCode); setOutput(initialOutput); }}
            className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-white/5 transition-all">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button onClick={copy}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
              copied ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}>
            {copied ? <><Check className="w-3 h-3" />Copied</> : <><Copy className="w-3 h-3" />Copy</>}
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
  const initialSlide = Math.max(0, Math.min(parseInt(searchParams.get('slide') || '1') - 1, slides.length - 1));

  const [current, setCurrent] = useState(initialSlide);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dir, setDir] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const slide = slides[current];
  const Icon = slide.icon;
  const progress = ((current + 1) / slides.length) * 100;
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
    params.set('slide', (current + 1).toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [current]);

  const goTo = useCallback((idx: number, d: number) => {
    if (isAnimating) return;
    setDir(d);
    setIsAnimating(true);
    setTimeout(() => { setCurrent(idx); setIsAnimating(false); }, 280);
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

      {/* ── CHAPTER NAV BAR ── */}
      <div className="relative z-20 flex items-center gap-1 px-6 py-3 border-b border-white/5 bg-black/30 backdrop-blur-xl overflow-x-auto mt-16 lg:mt-0">
        {CHAPTERS.map((ch, i) => {
          const isActive = ch.id === slide.chapter;
          const slideIdx = slides.findIndex(s => s.chapter === ch.id);
          return (
            <button key={ch.id} onClick={() => goTo(slideIdx, slideIdx > current ? 1 : -1)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                isActive
                  ? 'text-black border-transparent'
                  : 'bg-transparent border-white/8 text-zinc-500 hover:text-zinc-300 hover:border-white/20'
              }`}
              style={isActive ? { background: ch.color, borderColor: ch.color } : {}}>
              {ch.label}
            </button>
          );
        })}
        <div className="ml-auto flex items-center gap-3 flex-none pl-4">
          <div className="w-32 h-0.5 bg-white/8 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: chapterInfo.color }} />
          </div>
          <span className="text-[10px] font-mono text-zinc-600">
            {current + 1}<span className="text-zinc-800">/{slides.length}</span>
          </span>
        </div>
      </div>

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
              <p className="text-sm text-amber-200/80 leading-relaxed"><span className="font-black text-amber-400">Pro tip: </span>{slide.tip}</p>
            </motion.div>

            {/* Lab + Result */}
            <div className="space-y-3">
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
                className="rounded-xl border p-4 flex gap-3"
                style={{ background: `${slide.accent}08`, borderColor: `${slide.accent}25` }}>
                <Play className="w-4 h-4 flex-none mt-0.5" style={{ color: slide.accent }} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1.5" style={{ color: slide.accent }}>Lab Exercise</p>
                  <p className="text-sm text-white font-semibold leading-relaxed">{slide.lab}</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4 flex gap-3">
                <Check className="w-4 h-4 flex-none mt-0.5 text-emerald-400" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 text-emerald-400">Expected Result</p>
                  <p className="text-sm text-white font-semibold leading-relaxed">{slide.result}</p>
                </div>
              </motion.div>
            </div>

            {/* Nav buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button onClick={prev}
                className="p-3 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2 group">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-xs font-bold hidden sm:inline text-zinc-400">Prev</span>
              </button>
              <button onClick={next}
                className="flex-1 py-3 px-5 rounded-xl font-black text-xs active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
                style={{ background: slide.accent, color: '#000' }}>
                {current === slides.length - 1 ? 'Restart' : 'Next'}
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
              Interactive Editor
            </div>
            <div className="ml-auto text-[10px] font-mono text-zinc-700 hidden sm:block">
              ← → arrow keys to navigate
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
                <h3 className="text-sm font-black uppercase tracking-widest text-amber-400">Notes</h3>
                <p className="text-[10px] text-zinc-600 font-bold uppercase mt-0.5">{slide.id} · {slide.title}</p>
              </div>
              <button onClick={() => setShowNotes(false)} className="text-zinc-600 hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <textarea autoFocus
              value={notes[slide.id] || ''}
              onChange={e => saveNote(e.target.value)}
              placeholder="Your notes here... (auto-saves)"
              className="flex-1 w-full bg-black/40 rounded-xl p-4 text-sm text-zinc-300 resize-none outline-none border border-white/5 focus:border-amber-500/30 transition-all placeholder:text-zinc-700 font-mono"
            />
            <p className="mt-4 text-[10px] text-zinc-700 font-bold uppercase leading-relaxed">
              Saved per slide in localStorage
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
