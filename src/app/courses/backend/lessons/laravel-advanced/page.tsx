"use client";

import BackendGenericSlides, { Slide } from "@/components/backend/lessons/backend-generic-slides";
import { ArrowLeft, Layers, Zap, Database, ShieldCheck, Radio, Share2, Cpu, Activity, Clock, PackageX, Monitor, Cloud } from "lucide-react";
import Link from "next/link";


const advancedSlides: Slide[] = [
  // ── 01 · Hero ──────────────────────────────────────────────────────────────
  {
    type: 'hero',
    title: 'Enterprise Laravel',
    subtitle: 'Module 05 · High-Concurrency Architecture',
    content: 'Take your applications beyond simple requests. Master the asynchronous power of the Laravel ecosystem. This module covers distributed processing, real-time broadcasting, and enterprise-grade performance patterns.',
    icon: Layers,
  },

  // ── 02 · Concept: Queue Architecture ───────────────────────────────────────
  {
    type: 'concept',
    title: 'Queue Architecture',
    subtitle: 'Beyond Sync Execution',
    content: 'When a web request takes too long (sending emails, generating reports, processing images), it stalls the user experience. Queues allow us to offload these tasks to background workers, returning an immediate response to the user while the work continues asynchronously.',
    icon: Share2,
    callout: 'Use a persistent driver like Redis or SQS in production. The "database" driver is great for development but causes IO contention under high scale.',
    keyPoints: [
      'Throughput: The server handles more requests by doing less work per request.',
      'Resilience: If a job fails, it stays in the queue and can be retried automatically.',
      'Scaling: You can scale workers independently from your web servers.',
      'Isolation: Slow tasks don\'t block fast tasks.',
    ],
  },

  // ── 03 · Diagram: Queue Flow ───────────────────────────────────────────────
  {
    type: 'diagram',
    title: 'Request-Queue Pipeline',
    subtitle: 'Asynchronous Workflow',
    content: 'Tracing a request from the user, through the job dispatcher, into the Redis store, and finally to the background worker process.',
    icon: Activity,
    diagramNodes: [
      { label: 'Web UI',      desc: 'Form Submit',         color: '#6366f1' },
      { label: 'Controller',  desc: 'Dispatch Job',        color: '#8b5cf6' },
      { label: 'Redis',       desc: 'Job Storage',         color: '#ef4444' },
      { label: 'Worker',      desc: 'php artisan queue:work', color: '#10b981' },
      { label: 'Email/API',   desc: 'Final Output',        color: '#f59e0b' },
    ],
  },

  // ── 04 · Code: Job Dispatching ─────────────────────────────────────────────
  {
    type: 'code',
    title: 'Job Dispatching',
    subtitle: 'Encapsulating Logic',
    content: 'A Job class encapsulates a single unit of work. It receives data in its constructor and executes the logic in its handle() method. Dependency injection is fully supported in handle(), resolved directly from the service container.',
    icon: Zap,
    language: 'php',
    codeFileName: 'ProcessVideo.php',
    codeSnippet: `<?php
declare(strict_types=1);

namespace App\\Jobs;

use Illuminate\\Bus\\Queueable;
use Illuminate\\Contracts\\Queue\\ShouldQueue;
use Illuminate\\Foundation\\Bus\\Dispatchable;
use Illuminate\\Queue\\InteractsWithQueue;
use Illuminate\\Queue\\SerializesModels;
use App\\Services\\VideoProcessor;
use App\\Models\\Video;

class ProcessVideo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    // The data is serialized into the queue
    public function __construct(
        protected Video $video,
        protected string $format = 'mp4'
    ) {}

    // Executed by the background worker process
    public function handle(VideoProcessor $processor): void
    {
        $processor->convert(
            video:  $this->video,
            target: $this->format
        );
    }
}

// ── Dispatching from Controller ─────────────────────
// ProcessVideo::dispatch($video, 'webm');
// ProcessVideo::dispatch($video)->delay(now()->addMinutes(10));`,
    keyPoints: [
      'implements ShouldQueue — the marker for background execution',
      'SerializesModels — shrinks the payload by storing only the Model ID',
      'Handle() dependencies — auto-injected by the Laravel container',
      'Delay() — schedule jobs to run minutes or hours into the future',
    ],
  },

  // ── 05 · Quiz: Queues ──────────────────────────────────────────────────────
  {
    type: 'quiz',
    title: 'Queue Integrity',
    subtitle: 'Knowledge Check',
    content: '',
    icon: ShieldCheck,
    question: 'A Job class uses SerializesModels. You change a user\'s name in the DB after dispatching the job but before it runs. Which name will the job see?',
    options: [
      {
        text: 'The old name from when the job was dispatched',
        correct: false,
        explanation: 'SerializesModels only stores the ID. When the job starts, it re-queries the database. It does NOT store the full object state at dispatch time.',
      },
      {
        text: 'The new name currently in the database',
        correct: true,
        explanation: 'Correct. SerializesModels hydrates the fresh model state from the database as soon as the worker starts the handle() method. This ensures data consistency.',
      },
      {
        text: 'It will throw a ModelNotFoundException',
        correct: false,
        explanation: 'Only if the row was deleted in the meantime. If the record still exists, it will simply load the current state.',
      },
      {
        text: 'It depends on whether you used the Redis or DB driver',
        correct: false,
        explanation: 'SerializesModels behavior is independent of the driver. It is a framework-level serialization contract.',
      },
    ],
  },

  // ── 06 · Code: Retries & Backoff ──────────────────────────────────────────
  {
    type: 'code',
    title: 'Resilient Systems',
    subtitle: 'Failing Gracefully',
    content: 'Distributed systems fail. APIs go down, network timeouts happen. Laravel provides granular control over retry attempts and exponential backoff to ensure transient failures don\'t result in data loss.',
    icon: Clock,
    language: 'php',
    codeFileName: 'SendWebhook.php',
    codeSnippet: `<?php
declare(strict_types=1);

namespace App\\Jobs;

class SendWebhook implements ShouldQueue
{
    // Max attempts before moving to "failed_jobs" table
    public int $tries = 5;

    // Max runtime before the worker kills the job
    public int $timeout = 60;

    // Number of seconds to wait between retries
    public function backoff(): array
    {
        return [10, 60, 300]; // wait 10s, then 1m, then 5m
    }

    public function handle(HttpClient $client): void
    {
        $response = $client->post($this->url, $this->payload);

        if ($response->failed()) {
            throw new \\Exception('API Down'); // trigger retry
        }
    }

    public function failed(\\Throwable $exception): void
    {
        // One last attempt to notify or log after all retries fail
        Log::error("Webhook permanently failed: " . $exception->getMessage());
    }
}`,
    keyPoints: [
      '$tries — total attempts permitted before giving up',
      'backoff() — exponential waits prevent hammering a struggling service',
      'failed() — cleanup logic after the final attempt fails',
      'php artisan queue:retry — manually replay any failed job from the UI/CLI',
    ],
  },

  // ── 07 · Concept: Job Batching ─────────────────────────────────────────────
  {
    type: 'concept',
    title: 'Job Batching',
    subtitle: 'Parallel Processing',
    content: 'Batching lets you group a set of jobs and track their progress as a single unit. It provides terminal callbacks (then, catch, finally) that execute only after the entire set has finished. Perfect for large imports or multi-step processing chains.',
    icon: Layers,
    callout: 'Batching requires a database table to track job IDs and completion status. Run php artisan queue:batches-table to set it up.',
    keyPoints: [
      'Progress tracking: $batch->progress() returns percentage completion',
      'Chain vs Batch: Chaining runs 1-by-1; Batching runs in parallel',
      'Atomic failure: You can tell a batch to cancel all remaining jobs if one fails',
      'Then/Catch: Execute final logic (e.g. notify user) once everything is done',
    ],
  },

  // ── 08 · Code: Laravel Horizon ─────────────────────────────────────────────
  {
    type: 'code',
    title: 'Laravel Horizon',
    subtitle: 'Visualizing Queues',
    content: 'Horizon is a beautiful, Redis-powered dashboard for managing Laravel queues. It provides real-time metrics on job throughput, wait times, and failure rates. More importantly, it provides a code-driven configuration for your workers.',
    icon: Monitor,
    language: 'php',
    codeFileName: 'horizon.php',
    codeSnippet: `<?php
// config/horizon.php

'environments' => [
    'production' => [
        'supervisor-1' => [
            'connection' => 'redis',
            'queue'      => ['high', 'default', 'low'],
            'balance'    => 'auto', // auto-scale based on load
            'maxProcesses' => 15,
            'tries'      => 3,
        ],
    ],
    'staging' => [
        'supervisor-1' => [
            'maxProcesses' => 3,
        ],
    ],
],

// ── Access Control ──────────────────────────────────
// Gate::define('viewHorizon', function ($user) {
//     return in_array($user->email, ['admin@app.com']);
// });`,
    keyPoints: [
      'Dashboard — see exactly what is running, waiting, and failing',
      'Auto-balancing — shifts workers to the busiest queue automatically',
      'Metric Snapshots — analyze busy times and job performance over time',
      'Auth Gate — secure the dashboard in production via the Gate',
    ],
  },

  // ── 09 · Concept: Event Architecture ───────────────────────────────────────
  {
    type: 'concept',
    title: 'Event Listeners',
    subtitle: 'Decoupled Logic',
    content: 'Instead of cramming 5 things into one controller (Notify user, log activity, check promo, sync to CRM), fire one Event. Multiple listeners then respond independently. This makes your code easier to extend and test in isolation.',
    icon: Share2,
    callout: 'Listeners can also be queued! Just add "implements ShouldQueue" to the listener class, and Laravel will fire the response in the background automatically.',
    keyPoints: [
      'Event: "What happened" (e.g. OrderPlaced)',
      'Listener: "What should we do about it" (e.g. EmailReceipt)',
      'Discovery: Laravel can find events/listeners automatically via class names',
      'Observers: Specialized listeners for Model lifecycle (creating, updating)',
    ],
  },

  // ── 10 · Code: Real-time Broadcasting ──────────────────────────────────────
  {
    type: 'code',
    title: 'Real-time Broadcasting',
    subtitle: 'WebSocket Mastery',
    content: 'Broadcasting allows you to "share" your server-side Laravel events with your client-side JavaScript. When an order is shipped, the browser UI updates instantly without a page refresh. Laravel supports Pusher, Ably, and native Reverb.',
    icon: Radio,
    language: 'php',
    codeFileName: 'OrderShipped.php',
    codeSnippet: `<?php
declare(strict_types=1);

namespace App\\Events;

use Illuminate\\Contracts\\Broadcasting\\ShouldBroadcast;

class OrderShipped implements ShouldBroadcast
{
    public function __construct(public Order $order) {}

    // The channel name (Public, Private, or Presence)
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel("orders.{$this->order->user_id}")
        ];
    }

    // The data sent to the JS client
    public function broadcastWith(): array
    {
        return [
            'id'     => $this->order->id,
            'status' => 'Out for Delivery',
        ];
    }
}`,
    keyPoints: [
      'ShouldBroadcast — triggers the websocket push automatically',
      'PrivateChannel — restricted to authorized users via a Gate/Auth',
      'broadcastWith() — controls the JSON payload sent to the browser',
      'Laravel Echo — the JS companion to listen for these events',
    ],
  },

  // ── 11 · Diagram: Reverb Architecture ──────────────────────────────────────
  {
    type: 'diagram',
    title: 'Laravel Reverb',
    subtitle: 'Native WebSockets',
    content: 'Reverb is a high-speed, 1st-party WebSocket server built for Laravel. It runs directly on your server, eliminating the cost and latency of 3rd-party services like Pusher while maintaining full compatibility with Echo.',
    icon: Zap,
    diagramNodes: [
      { label: 'PHP App',    desc: 'broadcast() event',      color: '#6366f1' },
      { label: 'Reverb',     desc: 'running on port 8080',  color: '#f59e0b' },
      { label: 'WebSockets', desc: 'persistent duplex link', color: '#10b981' },
      { label: 'Clients',    desc: 'Chrome, iOS, Android',   color: '#0ea5e9' },
    ],
  },

  // ── 12 · Code: Advanced Caching ────────────────────────────────────────────
  {
    type: 'code',
    title: 'Object Caching',
    subtitle: 'Redis & Cache Tags',
    content: 'General caching (key-value) is basic. Advanced systems use Cache Tags to group related items. When one record changes, you can invalidate the entire tag group instantly without clearing unrelated items.',
    icon: Database,
    language: 'php',
    codeFileName: 'CacheService.php',
    codeSnippet: `<?php
declare(strict_types=1);

// Storing with multiple tags
Cache::tags(['people', 'artists'])->put('John', $john, $seconds);
Cache::tags(['people', 'authors'])->put('Anne', $anne, $seconds);

// Later...

// Clears John, but Anne stays! 
Cache::tags('artists')->flush();

// Clears BOTH John and Anne
Cache::tags('people')->flush();

// ── Atomic Locks ────────────────────────────────────
// Prevent double-processing (e.g. avoid double payments)
$lock = Cache::lock('process-payment', 10);

if ($lock->get()) {
    // Process payment safely...
    $lock->release();
}`,
    keyPoints: [
      'Tags — only supported by Redis and Memcached drivers',
      'Atomic Locks — prevent race conditions in background tasks',
      'TTL — balance between performance and data freshness',
      'Flush — granular invalidation beats global clearing',
    ],
  },

  // ── 13 · Concept: Repository Pattern ───────────────────────────────────────
  {
    type: 'concept',
    title: 'The Repository Pattern',
    subtitle: 'Abstracting Data Access',
    content: 'Repositories sit between your code and the database. By wrapping Eloquent calls in a repository, you make your code testable (swap for an in-memory mock) and prevent model logic from leaking into your controllers.',
    icon: Layers,
    callout: 'Don\'t over-engineer. For simple apps, Eloquent in controllers is fine. For enterprise apps where you might swap storage or have complex caching, Repositories provide a necessary safety layer.',
    keyPoints: [
      'Decoupling: Your business logic doesn\'t know about PostgreSQL or Redis.',
      'Testability: Easy to mock in unit tests without a database.',
      'Centralization: Update a query in one place, it reflects everywhere.',
      'Thin Controllers: Controllers focus on routing, not data fetching.',
    ],
  },

  // ── 14 · Code: Service Layer ───────────────────────────────────────────────
  {
    type: 'code',
    title: 'Service Layer Logic',
    subtitle: 'Thin Controllers, Thick Services',
    content: 'Business logic belongs in Services. Services orchestrate multiple models, repositories, and notification systems. This keeps controllers focused on HTTP concerns and makes the logic reusable in Artisan commands and Jobs.',
    icon: Cpu,
    language: 'php',
    codeFileName: 'OrderService.php',
    codeSnippet: `<?php
declare(strict_types=1);

namespace App\\Services;

class OrderProcessingService
{
    public function __construct(
        protected PaymentGateway $payments,
        protected InventoryManager $stock
    ) {}

    public function process(Order $order): bool
    {
        return DB::transaction(function () use ($order) {
            // 1. Check Stock
            if (! $this->stock->has($order->items)) return false;

            // 2. Charge User
            $this->payments->charge($order->user, $order->total);

            // 3. Mark Complete
            $order->markAsPaid();

            // 4. Fire Async Tasks
            OrderCompleted::dispatch($order);
            
            return true;
        });
    }
}`,
    keyPoints: [
      'Unit of Work — services handle the complex "how" of business flows',
      'Reusable — call the same service from an API, a Web UI, or a CSV Import Job',
      'Injected — resolved by the container for automatic dependency management',
    ],
  },

  // ── 15 · Quiz: Patterns ────────────────────────────────────────────────────
  {
    type: 'quiz',
    title: 'Architectural Selection',
    subtitle: 'Knowledge Check',
    content: '',
    icon: Layers,
    question: 'A client wants to switch their database from PostgreSQL to MongoDB. Which pattern makes this transition the easiest?',
    options: [
      {
        text: 'The Service Layer Pattern',
        correct: false,
        explanation: 'Services deal with business flows. They would still be calling Eloquent queries internally if you didn\'t use a repository.',
      },
      {
        text: 'The Repository Pattern',
        correct: true,
        explanation: 'Correct. By wrapping all data access in an interface, you only need to create a new MongoRepository implementation and swap the binding in your Service Provider.',
      },
      {
        text: 'The Facade Pattern',
        correct: false,
        explanation: 'Facades are just static proxies to container services. They don\'t help with data storage abstraction.',
      },
      {
        text: 'The Observer Pattern',
        correct: false,
        explanation: 'Observers respond to model events. They are still bound to specific Eloquent models.',
      },
    ],
  },

  // ── 16 · Code: Task Scheduling ─────────────────────────────────────────────
  {
    type: 'code',
    title: 'Task Scheduling',
    subtitle: 'One Cron to Rule Them All',
    content: 'Stop managing individual crontab entries on your server. Laravel\'s scheduler lets you manage all periodic tasks in one file with a fluent, readable API. It handles overlapping protection, running in the background, and output logging natively.',
    icon: Clock,
    language: 'php',
    codeFileName: 'console.php',
    codeSnippet: `<?php
// routes/console.php (Laravel 11+)

use Illuminate\\Support\\Facades\\Schedule;

// Run a command every night
Schedule::command('backups:run')->dailyAt('02:00');

// Run a closure every five minutes
Schedule::call(fn() => User::pruneUnverified())->everyFiveMinutes();

// Prevent overlapping — if the job is still running, 
// don't start a second instance.
Schedule::job(new SyncCloudData)
    ->hourly()
    ->withoutOverlapping()
    ->onOneServer();

// Maintenance mode behavior
Schedule::command('emails:send')->everyMinute()->evenInMaintenanceMode();`,
    keyPoints: [
      '* * * * * php artisan schedule:run — the only cron entry needed',
      'withoutOverlapping() — prevents server CPU spikes and database locks',
      'onOneServer() — ensures jobs only run once in a multi-server cluster',
      'evenInMaintenanceMode() — keep system-critical tasks alive during updates',
    ],
  },

  // ── 17 · Concept: Multi-Tenancy ────────────────────────────────────────────
  {
    type: 'concept',
    title: 'Multi-Tenancy Concepts',
    subtitle: 'SaaS Architecture',
    content: 'Building software for thousands of companies (tenants)? You need a strategy to separate their data. Multi-tenancy in Laravel is usually handled via "Single Database" (using tenant_id column) or "Multi-Database" (one DB per tenant).',
    icon: Cloud,
    callout: 'For most SaaS apps, Single Database with a trait to apply global scopes to every query is the most cost-effective and scalable approach.',
    keyPoints: [
      'Identification: Determining the current tenant via subdomain or Header.',
      'Separation: Using Eloquent Global Scopes to automatically filter by tenant.',
      'Isolation: Hardening file storage and caches so tenants can\'t "see" each other.',
      'Provisioning: Logic for creating new tenants and their infrastructure.',
    ],
  },

  // ── 18 · Code: Package Development ─────────────────────────────────────────
  {
    type: 'code',
    title: 'Package Development',
    subtitle: 'Reusable Ecosystem',
    content: 'How do you extract a feature (e.g. an internal API wrapper) to reuse it across 5 company apps? You build a Laravel Package. Learn how to structure service providers, config files, and migrations for distribution.',
    icon: PackageX,
    language: 'php',
    codeFileName: 'ServiceProvider.php',
    codeSnippet: `<?php
namespace MyCompany\\ApiWrapper;

class ApiServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Publish config to app directory
        $this->publishes([
            __DIR__.'/../config/api.php' => config_path('api.php'),
        ], 'config');

        // Load migrations from package
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');

        // Register custom commands
        if ($this->app->runningInConsole()) {
            $this->commands([
                Commands\\SyncData::class,
            ]);
        }
    }
}`,
    keyPoints: [
      'publishes() — lets users override your package default config',
      'loadRoutesFrom() — register routes directly within the package',
      'Service Provider — the "brain" that wires the package into Laravel',
      'Composer — used to require your package via private Git or Packagist',
    ],
  },

  // ── 19 · Concept: Laravel Pulse ────────────────────────────────────────────
  {
    type: 'concept',
    title: 'Laravel Pulse',
    subtitle: 'Real-time Monitoring',
    content: 'Laravel Pulse provides at-a-glance health metrics for your production app. It monitors slow routes, high-usage users, database bottlenecks, and job performance. Unlike generic monitoring tools, it is deeply aware of Laravel internals.',
    icon: Activity,
    keyPoints: [
      'Slow Routes: See exactly which controller is lagging in production.',
      'Jobs: Track failure rates and throughput per queue.',
      'Memory: Detect leaks and high-usage background tasks.',
      'Custom Cards: Register your own cards to monitor business metrics.',
    ],
  },

  // ── 20 · Diagram: Pulse Integration ────────────────────────────────────────
  {
    type: 'diagram',
    title: 'Pulse Data Flow',
    subtitle: 'Metric Aggregation',
    content: 'Pulse uses "Ingest" workers to collect data in the background with near-zero impact on your application performance.',
    icon: Activity,
    diagramNodes: [
      { label: 'PHP Request',   desc: 'captures timing',      color: '#6366f1' },
      { label: 'Pulse Ingest',  desc: 'Redis-based buffer',    color: '#8b5cf6' },
      { label: 'Aggregator',    desc: 'summarizes data',      color: '#0ea5e9' },
      { label: 'DB Storage',    desc: 'pulse_* tables',       color: '#10b981' },
      { label: 'Pulse UI',      desc: 'real-time charts',     color: '#f59e0b' },
    ],
  },

  // ── 21 · Code: Activity Logging ─────────────────────────────────────────────
  {
    type: 'code',
    title: 'Activity Logging',
    subtitle: 'System Auditing',
    content: 'Who deleted that user? When was this price changed? Activity logging creates a permanent, searchable audit trail. Spatie\'s laravel-activitylog is the gold standard for tracking model and system-level events.',
    icon: ShieldCheck,
    language: 'php',
    codeFileName: 'Product.php',
    codeSnippet: `<?php
namespace App\\Models;

use Spatie\\Activitylog\\Traits\\LogsActivity;
use Spatie\\Activitylog\\LogOptions;

class Product extends Model
{
    use LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['price', 'stock_quantity'])
            ->logOnlyDirty()  // only log if values changed
            ->dontSubmitEmptyLogs();
    }
}

// ── Manual logging ──────────────────────────────────
// activity()
//    ->performedOn($order)
//    ->causedBy($user)
//    ->withProperties(['action' => 'refund'])
//    ->log('Order was refunded manually');`,
    keyPoints: [
      'LogsActivity Trait — automatic audit trail for models',
      'logOnlyDirty() — prevents logging if no actual change occurred',
      'causedBy() — tracks which user (or system process) trigged the change',
      'properties() — store arbitrary JSON metadata about the event',
    ],
  },

  // ── 22 · Quiz: Advanced Ops ────────────────────────────────────────────────
  {
    type: 'quiz',
    title: 'Operations Mastery',
    subtitle: 'Knowledge Check',
    content: '',
    icon: Zap,
    question: 'You want to run a job only if the same job is not already running on ANY server in your cluster. Which combination is correct?',
    options: [
      {
        text: '->withoutOverlapping() on the schedule',
        correct: false,
        explanation: 'withoutOverlapping() uses a local lock. In a cluster, multiple servers might still start the same cron. You need a distributed lock mechanism.',
      },
      {
        text: '->onOneServer() on the schedule',
        correct: true,
        explanation: 'Correct. onOneServer() uses your cache driver (Redis/Memcached) to ensure only one server in the cluster acquires the lock to run the scheduled task.',
      },
      {
        text: 'public $tries = 1; on the job',
        correct: false,
        explanation: 'This only controls retries. It does not prevent multiple instances of the same job from starting simultaneously.',
      },
      {
        text: 'Configuring Horizon with balance => "auto"',
        correct: false,
        explanation: 'This balances workers between queues based on load, but doesn\'t handle global task exclusivity.',
      },
    ],
  },

  // ── 23 · Hero: Integration ─────────────────────────────────────────────────
  {
    type: 'hero',
    title: 'Enterprise Graduation',
    subtitle: 'Final Module Review',
    content: 'You have mastered the total distributed architecture: Queues, Jobs, Batching, Horizon, Events, Broadcasting, Reverb, Redis Caching, Repositories, Services, Scheduling, Multi-Tenancy, Packages, Pulse, and Auditing. You are ready to build world-scale Laravel systems.',
    icon: Zap,
  },

  // ── 24 · Hero: Final Launch ────────────────────────────────────────────────
  {
    type: 'hero',
    title: 'Module 05 Complete',
    subtitle: 'Project Sigma Launch',
    content: 'It\'s time to apply everything. Your challenge: Build a real-time analytics engine that processes millions of events using Horizon and broadcasts updates to a global dashboard using Reverb.',
    icon: Radio,
  }
];

export default function LaravelAdvancedLessonPage() {
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
              style={{ background: '#bf4e20' }}
            />
            Module 05 · Advanced Laravel
          </div>
        </div>
      </nav>

      <BackendGenericSlides lessonTitle="Laravel Enterprise Patterns" slides={advancedSlides} />
    </main>
  );
}