"use client";

import BackendGenericSlides, { Slide } from "@/components/backend/lessons/backend-generic-slides";
import { ArrowLeft, Database, HardDrive, Zap, Layers, Code, Search, Link as LinkIcon, Eye, Activity, RefreshCcw, Terminal, ShieldCheck, Filter, Table, Box, Cloud, Trash2 } from "lucide-react";
import Link from "next/link";


const eloquentSlides: Slide[] = [
  // ── 01 · Hero ──────────────────────────────────────────────────────────────
  {
    type: 'hero',
    title: 'Eloquent Data Specialist',
    subtitle: 'Module 03 · Database Engineering with ORM',
    content: 'Master the most powerful object-relational mapper in the PHP world. Beyond basic queries into database performance engineering, complex relationships, and atomic transactions.',
    icon: Database,
  },

  // ── 02 · Concept: Active Record ────────────────────────────────────────────
  {
    type: 'concept',
    title: 'Active Record Philosophy',
    subtitle: 'The Model as a Row',
    content: 'Eloquent implements the Active Record pattern. Every model instance represents exactly one row in your database table. Changing a property on the object and calling save() generates the SQL UPDATE automatically. This makes data manipulation expressive and intuitive.',
    icon: Search,
    callout: 'Models do not just store data; they encapsulate behavior. Add business logic (like "isOrderPaid()") directly to the model to keep your code readable.',
    keyPoints: [
      'Model instance = Database row',
      'Model class = Database table',
      'Relationships are defined as methods on the model class',
      'Automated timestamps (created_at, updated_at) out of the box',
    ],
  },

  // ── 03 · Code: Migrations ──────────────────────────────────────────────────
  {
    type: 'code',
    title: 'Precision Migrations',
    subtitle: 'Schema Version Control',
    content: 'Migrations are the version control for your database. Instead of sharing SQL dumps, you share migration files. Laravel provides a fluent API to build indexes, foreign keys, and complex column types without writing raw DDL.',
    icon: HardDrive,
    language: 'php',
    codeFileName: 'create_products_table.php',
    codeSnippet: `<?php
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->unique();
            $table->string('name');
            $table->decimal('price', 10, 2);
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['name', 'price']); // composite index
        });
    }

    public function down(): void {
        Schema::dropIfExists('products');
    }
};`,
    keyPoints: [
      'constrained() — automatically detects category_id links to categories.id',
      'onDelete(\'cascade\') — deletes products when their category is deleted',
      'softDeletes() — adds deleted_at column for non-destructive removals',
      'unique() — enforces database-level integrity for SKUs or Emails',
    ],
  },

  // ── 04 · Diagram: Factory Pipeline ─────────────────────────────────────────
  {
    type: 'diagram',
    title: 'Factories & Seeders',
    subtitle: 'Generating Synthetic Data',
    content: 'Factories define the "blueprint" of a record using Faker. Seeders then call these factories to populate your database with thousands of realistic records for testing and local development.',
    icon: RefreshCcw,
    diagramNodes: [
      { label: 'Faker library',   desc: 'generates random names', color: '#6366f1' },
      { label: 'ProductFactory',  desc: 'defines model shape',   color: '#8b5cf6' },
      { label: 'DatabaseSeeder',  desc: 'calls factory(1000)',  color: '#10b981' },
      { label: 'PostgreSQL',      desc: 'final storage',         color: '#0ea5e9' },
    ],
  },

  // ── 05 · Code: Advanced Factories ──────────────────────────────────────────
  {
    type: 'code',
    title: 'Complex State Patterns',
    subtitle: 'Synthetic Data Logic',
    content: 'Factories can define "states" — variations of a record. Instead of manual setup in your tests, you can call $factory->published() or $factory->expensive() to get perfectly configured test data instantly.',
    icon: Layers,
    language: 'php',
    codeFileName: 'ProductFactory.php',
    codeSnippet: `<?php
namespace Database\\Factories;

use App\\Models\\Product;
use Illuminate\\Database\\Eloquent\\Factories\\Factory;

class ProductFactory extends Factory {
    public function definition(): array {
        return [
            'name'  => $this->faker->words(3, true),
            'price' => $this->faker->randomFloat(2, 10, 500),
            'sku'   => $this->faker->unique()->ean13(),
        ];
    }

    // Custom state for discounted items
    public function discounted(): static {
        return $this->state(fn() => ['price' => 5.00]);
    }
}

// ── Usage in tests/seeders ──────────────────────────
// Product::factory()->count(10)->create();
// Product::factory()->discounted()->create(['name' => 'Sale Item']);`,
    keyPoints: [
      'faker->unique() — ensures no collisions in random data generation',
      'state() — chainable methods to modify specific attributes',
      'create() — persists to DB; make() — keeps only in memory (faster for tests)',
    ],
  },

  // ── 06 · Quiz: Eloquent Basics ─────────────────────────────────────────────
  {
    type: 'quiz',
    title: 'Model Integrity',
    subtitle: 'Knowledge Check',
    content: '',
    icon: Database,
    question: 'You want to add "deleted_at" support to your Product model. What is required?',
    options: [
      {
        text: 'Add "protected $softDeletes = true;" to the model',
        correct: false,
        explanation: 'A property is not enough. You must use the SoftDeletes trait and add the column in your migration.',
      },
      {
        text: 'Use the SoftDeletes trait in the model and $table->softDeletes() in the migration',
        correct: true,
        explanation: 'Correct. The migration creates the column, and the trait overrides the delete() and query() behavior to handle the deleted_at timestamp automatically.',
      },
      {
        text: 'Manually check "whereNull(\'deleted_at\')" in every query',
        correct: false,
        explanation: 'The SoftDeletes trait applies this global scope automatically. You don\'t need to add it manually to every query.',
      },
      {
        text: 'Soft deletes only work with the Redis driver',
        correct: false,
        explanation: 'Soft deletes are a database feature (timestamp column) and work with MySQL, Postgres, SQLite, etc.',
      },
    ],
  },

  // ── 07 · Concept: Mass Assignment ──────────────────────────────────────────
  {
    type: 'concept',
    title: 'Mass Assignment',
    subtitle: 'Security & Guarding',
    content: 'Mass assignment allows creating a model from an array: User::create($request->all()). This is dangerous if a user adds "is_admin=1" to the POST request. $fillable whitelists allowed fields, while $guarded blacklists forbidden ones.',
    icon: ShieldCheck,
    callout: 'Industry standard: Use $fillable. It is safer because new database columns are blocked by default until you explicitly add them to the whitelist.',
    keyPoints: [
      'protected $fillable = [\'name\', \'email\'];',
      'protected $guarded = [\'id\', \'is_admin\'];',
      'Exception: "Add [field] to fillable" — common Laravel error when fields are missing.',
      'forceCreate() ignores guarding — use only in trusted seeders.',
    ],
  },

  // ── 08 · Code: Getters & Setters ────────────────────────────────────────────
  {
    type: 'code',
    title: 'Accessors & Mutators',
    subtitle: 'Attribute Decoration',
    content: 'Accessors let you format data for display (e.g. price to $USD), while Mutators let you format for storage (e.g. hashing passwords). Laravel 9+ introduced a new, unified syntax using the Attribute return type.',
    icon: Code,
    language: 'php',
    codeFileName: 'User.php',
    codeSnippet: `<?php
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Casts\\Attribute;

class User extends Model {
    // Modern Unified Syntax
    protected function name(): Attribute {
        return Attribute::make(
            get: fn (string $value) => ucwords($value), // Accessor
            set: fn (string $value) => strtolower($value), // Mutator
        );
    }

    protected function formattedPrice(): Attribute {
        return Attribute::make(
            get: fn () => '$' . number_format($this->price / 100, 2),
        )->shouldCache(); // performance optimization
    }
}`,
    keyPoints: [
      'ucwords($value) — ensures names are always capitalized in the UI',
      'strtolower($value) — ensures emails or usernames are stored consistently',
      'shouldCache() — prevents re-calculating expensive attributes multiple times',
      'Virtual Attributes — formattedPrice doesn\'t exist in DB but works in code',
    ],
  },

  // ── 09 · Concept: Attribute Casting ────────────────────────────────────────
  {
    type: 'concept',
    title: 'Attribute Casting',
    subtitle: 'Native Type Conversion',
    content: 'Database values are often strings. Casting automatically converts them into PHP types like Boolean, DateTime, Collection, or Decrypted strings when you access them.',
    icon: Box,
    keyPoints: [
      '\'is_active\' => \'boolean\' — converts 0/1 to true/false',
      '\'metadata\' => \'array\' — auto-JSON encodes/decodes',
      '\'options\' => \'collection\' — returns a Laravel Collection object',
      '\'secret\' => \'encrypted\' — auto-encrypts at rest in the DB',
      '\'role\' => UserRole::class — casts to a PHP Enum',
    ],
  },

  // ── 10 · Code: Scopes ──────────────────────────────────────────────────────
  {
    type: 'code',
    title: 'Query Scopes',
    subtitle: 'Reusable Logic',
    content: 'Stop repeating where(\'status\', \'active\') in every controller. Scopes let you define reusable query segments. Local scopes are called manually; Global scopes are applied automatically to every query.',
    icon: Filter,
    language: 'php',
    codeFileName: 'Order.php',
    codeSnippet: `<?php
class Order extends Model {
    // Local Scope: Order::active()->get()
    public function scopeActive($query) {
        return $query->where('status', 'active');
    }

    // Dynamic Scope: Order::ofStatus('shipped')->get()
    public function scopeOfStatus($query, $status) {
        return $query->where('status', $status);
    }
}

// ── In Controller ───────────────────────────────────
$orders = Order::active()->latest()->paginate(10);
$admins = User::whereHas('role', fn($q) => $q->admin())->get();`,
    keyPoints: [
      'scopePrefix — the "scope" prefix is required on the method name',
      'Implicit $query — the first argument is always the query builder',
      'Fluent Interface — scopes are chainable with other builder methods',
      'Global Scopes — use for multi-tenancy (where tenant_id = X)',
    ],
  },

  // ── 11 · Diagram: 1-to-N Relationship ──────────────────────────────────────
  {
    type: 'diagram',
    title: 'The 1-to-Many Link',
    subtitle: 'HasMany & BelongsTo',
    content: 'The bread and butter of database design. One category has many products; one product belongs to one category. Laravel handles the foreign key lookups under the hood.',
    icon: LinkIcon,
    diagramNodes: [
      { label: 'Category',  desc: 'Primary: ID',        color: '#6366f1' },
      { label: '---',       desc: 'Relationship',       color: '#94a3b8' },
      { label: 'Product 1', desc: 'FK: category_id',    color: '#10b981' },
      { label: 'Product 2', desc: 'FK: category_id',    color: '#10b981' },
    ],
  },

  // ── 12 · Code: Many-to-Many ─────────────────────────────────────────────────
  {
    type: 'code',
    title: 'Many-to-Many Magic',
    subtitle: 'Pivot Tables',
    content: 'Requires a pivot table (e.g. order_product). Laravel manages attaching and detaching records from this bridge table without you manually querying it.',
    icon: Table,
    language: 'php',
    codeFileName: 'Order.php',
    codeSnippet: `<?php
class Order extends Model {
    public function products() {
        return $this->belongsToMany(Product::class)
            ->withPivot('quantity', 'unit_price')
            ->withTimestamps();
    }
}

// ── Usage ───────────────────────────────────────────
$order->products()->attach($productId, ['quantity' => 2]);
$order->products()->sync([1, 2, 3]); // Replaces all with these IDs
$order->products()->toggle($productId);`,
    keyPoints: [
      'attach() — inserts a new row into pivot',
      'sync() — the "all-in-one" manager: adds new, removes missing',
      'withPivot() — lets you access extra columns on order_product',
      'Pivot records available as $product->pivot->quantity',
    ],
  },

  // ── 13 · Concept: Polymorphic Relations ────────────────────────────────────
  {
    type: 'concept',
    title: 'Polymorphic Architecture',
    subtitle: 'One Model, Many Parents',
    content: 'A "Comment" model can belong to a "Post" OR a "Video". Instead of category_id, we use [commentable_id, commentable_type]. This allows one table to serve as a child to infinite parent models.',
    icon: Activity,
    callout: 'Use "enforceMorphMap" in your AppServiceProvider to store "post" instead of "App\\Models\\Post" in the DB. This decouples your database from your PHP namespace.',
    keyPoints: [
      'MorphTo() — the child defines who its parent is',
      'MorphMany() — the parent lists its children',
      'commentable_id — the ID of the parent row',
      'commentable_type — the Class name of the parent',
    ],
  },

  // ── 14 · Diagram: Has-Many-Through ─────────────────────────────────────────
  {
    type: 'diagram',
    title: 'Has-Many-Through',
    subtitle: 'Jumping Relationships',
    content: 'Accessing related data across three tables. User -> Project -> Tasks. A User can access all Tasks through their Projects in a single Eloquent call.',
    icon: Search,
    diagramNodes: [
      { label: 'User',      desc: 'id: 1',              color: '#6366f1' },
      { label: 'Project',   desc: 'user_id: 1',         color: '#8b5cf6' },
      { label: 'Task',      desc: 'project_id: X',      color: '#10b981' },
    ],
  },

  // ── 15 · Quiz: Relationships ───────────────────────────────────────────────
  {
    type: 'quiz',
    title: 'Relationship Selection',
    subtitle: 'Knowledge Check',
    content: '',
    icon: LinkIcon,
    question: 'A User has a Profile. A Profile has a User. Which one should hold the "user_id" foreign key?',
    options: [
      {
        text: 'The User table',
        correct: false,
        explanation: 'The User is the parent. If you put profile_id in the user table, you restrict the scalability if one user could ever have multiple profiles.',
      },
      {
        text: 'The Profile table',
        correct: true,
        explanation: 'Correct. The Profile belongs to the User. The foreign key user_id belongs in the profiles table. User model uses hasOne(Profile); Profile model uses belongsTo(User).',
      },
      {
        text: 'Both tables for maximum safety',
        correct: false,
        explanation: 'Circular dependencies are a database anti-pattern. Pick one owner (the child).',
      },
      {
        text: 'Neither — use a pivot table for 1-to-1 relationships',
        correct: false,
        explanation: 'Pivot tables are for Many-to-Many. For 1-to-1, a direct foreign key is faster and cleaner.',
      },
    ],
  },

  // ── 16 · Concept: N+1 Problem ──────────────────────────────────────────────
  {
    type: 'concept',
    title: 'The N+1 Performance Killer',
    subtitle: 'The ORM Hidden Trap',
    content: 'If you loop through 50 products and access $product->category, Eloquent runs 1 query for the list + 50 queries for the categories. Total: 51 queries. This is the N+1 problem.',
    icon: Eye,
    callout: 'Use Eager Loading with the "with()" method to solve this. Laravel runs 2 queries total: one for the list, one for ALL relevant categories using WHERE IN.',
    keyPoints: [
      'Problem: Lazy loading in a loop kills DB performance.',
      'Solution: $products = Product::with(\'category\')->get();',
      'Detection: Use Laravel Debugbar or Clockwork to see query counts.',
      'Prevention: Use $this->preventLazyLoading() in development.',
    ],
  },

  // ── 17 · Code: Advanced Eager Loading ──────────────────────────────────────
  {
    type: 'code',
    title: 'Constraining Eager Loads',
    subtitle: 'Optimized Hydration',
    content: 'Don\'t load everything. You can filter and sort the related data directly inside the "with" call to reduce the data hydrated into memory.',
    icon: Zap,
    language: 'php',
    codeFileName: 'CategoryRepository.php',
    codeSnippet: `<?php
// Load categories with only their 3 newest products
$categories = Category::with(['products' => function ($query) {
    $query->where('stock', '>', 0)
          ->latest()
          ->limit(3);
}])->get();

// Nested Eager Loading
// Author -> Posts -> Comments
$blog = Author::with('posts.comments.user')->find(1);

// Eager load only COUNT (very fast)
$users = User::withCount('posts')->get();
// Access as $user->posts_count;`,
    keyPoints: [
      'withCount() — gets related totals without loading full objects.',
      'Dot Notation — drilling deep: posts.comments.attachments.',
      'Conditional Loading — with([\'orders.items\' => fn($q) => ...]).',
    ],
  },

  // ── 18 · Concept: Transactions ─────────────────────────────────────────────
  {
    type: 'concept',
    title: 'Atomic Transactions',
    subtitle: 'All or Nothing',
    content: 'If you deduct money from a user and the server crashes before you create the order, money is lost. Transactions ensure that either ALL database calls succeed, or they are all rolled back as if they never happened.',
    icon: ShieldCheck,
    keyPoints: [
      'DB::transaction(fn() => ...) — recommended syntax.',
      'Manual: DB::beginTransaction(), DB::commit(), DB::rollBack().',
      'Crucial for financial data, inventory, and multi-table updates.',
      'Supports up to 5 retries if a deadlock occurs.',
    ],
  },

  // ── 19 · Code: Observers ───────────────────────────────────────────────────
  {
    type: 'code',
    title: 'Model Observers',
    subtitle: 'Global Event Hooks',
    content: 'Observers group all logic for a model\'s lifecycle (creating, updating, deleting) into one class. Perfect for calculating slugs, syncing search indexes, or sending notifications on save.',
    icon: Activity,
    language: 'php',
    codeFileName: 'UserObserver.php',
    codeSnippet: `<?php
namespace App\\Observers;

class UserObserver {
    public function creating(User $user) {
        $user->uuid = (string) Str::uuid();
    }

    public function deleted(User $user) {
        $user->profile->delete();
    }
}

// ── In AppServiceProvider ───────────────────────────
User::observe(UserObserver::class);`,
    keyPoints: [
      'creating/created — before and after insert.',
      'updating/updated — before and after save.',
      'saving/saved — runs on both create and update.',
      'deleting/deleted — before and after delete (or soft delete).',
    ],
  },

  // ── 20 · Quiz: Observers vs Scopes ─────────────────────────────────────────
  {
    type: 'quiz',
    title: 'Pattern Selection',
    subtitle: 'Knowledge Check',
    content: '',
    icon: Activity,
    question: 'You want to automatically filter out "banned" users from every query in your app. Which tool should you use?',
    options: [
      {
        text: 'A Local Scope called "active"',
        correct: false,
        explanation: 'Local scopes must be called manually: User::active(). If you forget one, you leak banned users.',
      },
      {
        text: 'A Global Scope',
        correct: true,
        explanation: 'Correct. A global scope is applied to every query (User::all(), User::find(), etc.) automatically once registered in the model\'s boot() method.',
      },
      {
        text: 'A Model Observer',
        correct: false,
        explanation: 'Observers respond to changes (Save/Delete). They cannot filter or modify SELECT queries.',
      },
      {
        text: 'A Middleware',
        correct: false,
        explanation: 'Middleware handles HTTP requests. While it can check if the *current* user is banned, it cannot filter database queries for *other* users.',
      },
    ],
  },

  // ── 21 · Concept: Serialization ────────────────────────────────────────────
  {
    type: 'concept',
    title: 'Data Serialization',
    subtitle: 'JSON & Hidden Fields',
    content: 'When you return a model from a controller, Laravel calls toArray() or toJson(). You must control which fields are visible to prevent leaking passwords, tokens, or internal flags.',
    icon: Eye,
    keyPoints: [
      'protected $hidden = [\'password\']; — never includes in JSON.',
      'protected $visible = [\'id\', \'name\']; — ONLY these are included.',
      'protected $appends = [\'is_admin\']; — includes virtual attributes.',
      'makeVisible() / makeHidden() — dynamic control at runtime.',
    ],
  },

  // ── 22 · Code: API Resources ───────────────────────────────────────────────
  {
    type: 'code',
    title: 'API Resources',
    subtitle: 'The Transformation Layer',
    content: 'Don\'t return models directly. API Resources provide a "mapping" layer between your model and the JSON response. This protects your API from database changes.',
    icon: Terminal,
    language: 'php',
    codeFileName: 'UserResource.php',
    codeSnippet: `<?php
namespace App\\Http\\Resources;

class UserResource extends JsonResource {
    public function toArray($request) {
        return [
            'id'    => $this->id,
            'name'  => $this->first_name . ' ' . $this->last_name,
            'email' => $this->email,
            'posts' => PostResource::collection($this->whenLoaded('posts')),
        ];
    }
}`,
    keyPoints: [
      'whenLoaded() — prevents N+1 by only including data if eager loaded.',
      'collection() — transforms an entire array/collection of models.',
      'Encapsulation — change DB "usr_name" to JSON "username" easily.',
    ],
  },

  // ── 23 · Concept: Cursor Pagination ────────────────────────────────────────
  {
    type: 'concept',
    title: 'Cursor Pagination',
    subtitle: 'Infinite Scroll Engine',
    content: 'Standard "Offset" pagination (Page 1, 2, 3) gets slow on millions of rows because DB must scan all skipped rows. Cursor pagination uses "WHERE ID > last_id", which is a high-speed index lookup.',
    icon: RefreshCcw,
    callout: 'Use "cursorPaginate()" for social media feeds or infinite scrolls. Use "paginate()" for admin tables where jumping to a specific page number is required.',
    keyPoints: [
      'Paginate: Jump to Page 500 (Slow on large data).',
      'SimplePaginate: Next/Prev only (Faster).',
      'CursorPaginate: Next/Prev using indexes (Fastest).',
      'Caveat: Cursor pagination doesn\'t support "Total Count" or jump to page.',
    ],
  },

  // ── 24 · Code: Raw SQL ─────────────────────────────────────────────────────
  {
    type: 'code',
    title: 'Breaking the ORM',
    subtitle: 'Raw Expressions',
    content: 'Sometimes Eloquent is too slow or limited for complex reports. Drop into Raw SQL safely. Always use bindings or DB::raw to prevent SQL injection.',
    icon: Terminal,
    language: 'php',
    codeFileName: 'ReportController.php',
    codeSnippet: `<?php
// Calculate distance between two points using SQRT/POW
$stores = Store::select('*')
    ->selectRaw('(SQRT(POW(69.1 * (lat - ?), 2))) AS distance', [$userLat])
    ->orderBy('distance')
    ->get();

// Complex Joins
DB::table('orders')
    ->select('department', DB::raw('SUM(price) as total_sales'))
    ->groupBy('department')
    ->havingRaw('SUM(price) > ?', [1000])
    ->get();`,
    keyPoints: [
      'DB::raw() — marks a string as safe "as-is" for the query.',
      'Parameter Binding (?) — prevents SQL injection manually.',
      'selectRaw() / havingRaw() — specialized methods for parts of the query.',
    ],
  },

  // ── 25 · Diagram: Multi-Tenancy ────────────────────────────────────────────
  {
    type: 'diagram',
    title: 'Multi-Tenant Scopes',
    subtitle: 'Data Isolation',
    content: 'How Slack or Trello keeps data separate. A Global Scope automatically adds "WHERE tenant_id = current_customer" to every query behind the scenes.',
    icon: Cloud,
    diagramNodes: [
      { label: 'Query: User::all()', desc: 'developer code', color: '#6366f1' },
      { label: 'Global Scope',       desc: 'injects WHERE',   color: '#8b5cf6' },
      { label: 'SQL Generated',     desc: 'SELECT...WHERE t=X', color: '#10b981' },
    ],
  },

  // ── 26 · Code: Model Pruning ───────────────────────────────────────────────
  {
    type: 'code',
    title: 'Automatic Database Cleanup',
    subtitle: 'Prunable Models',
    content: 'Laravel can automatically delete old records (like expired tokens or 2-year-old logs) using the "Prunable" trait. Combine with the scheduler to keep your database lean.',
    icon: Trash2,
    language: 'php',
    codeFileName: 'ActivityLog.php',
    codeSnippet: `<?php
use Illuminate\\Database\\Eloquent\\Prunable;

class ActivityLog extends Model {
    use Prunable;

    // Define which records should be deleted
    public function prunable() {
        return static::where('created_at', '<=', now()->subMonths(6));
    }

    // Optional: logic before deletion
    protected function pruning() {
        Log::info('Deleting stale activity log.');
    }
}`,
    keyPoints: [
      'Prunable Trait — marks model for scheduled deletion.',
      'php artisan model:prune — the command that executes cleanup.',
      'Massive scale — prunable uses chunked deletion to prevent DB locking.',
    ],
  },

  // ── 27 · Hero: Review ──────────────────────────────────────────────────────
  {
    type: 'hero',
    title: 'Eloquent Mastered',
    subtitle: 'Module 03 Graduation',
    content: 'You have mastered Active Record, Migrations, Mass Assignment, Scopes, Accessors, Relationships (Polymorphic, Through, N-N), N+1 prevention, Transactions, and API transformation. You are a Database Engineer.',
    icon: Database,
  },

  // ── 28 · Hero: Final Launch ────────────────────────────────────────────────
  {
    type: 'hero',
    title: 'Project Sigma: Data Layer',
    subtitle: 'Capstone Challenge',
    content: 'Build a multi-tenant e-commerce core with complex relationships, polymorphic reviews, and optimized reports using raw SQL and eager loading.',
    icon: Zap,
  }
];

export default function EloquentMasteryLessonPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <nav
        className="px-8 py-5 sticky top-0 z-50 border-b"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/courses/backend"
            className="flex items-center gap-2.5 text-sm font-medium transition-colors"
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
              style={{ background: '#10b981' }}
            />
            Module 03 · Eloquent Mastery
          </div>
        </div>
      </nav>

      <BackendGenericSlides lessonTitle="Eloquent Data Specialist" slides={eloquentSlides} />
    </main>
  );
}