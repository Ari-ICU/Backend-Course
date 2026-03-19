"use client";

import BackendGenericSlides, { Slide } from "@/components/backend/lessons/backend-generic-slides";
import { ArrowLeft, Cloud, Server, Terminal, ShieldCheck, Zap, Activity, HardDrive, Cpu, GitBranch, Globe, Lock, Share2, Rocket } from "lucide-react";
import Link from "next/link";


const devopsSlides: Slide[] = [
  // ── 01 · Hero ──────────────────────────────────────────────────────────────
  {
    type: 'hero',
    title: 'Cloud Architect',
    subtitle: 'Module 06 · DevOps & Industrial Deployment',
    content: 'Building the app is only half the battle. This module teaches you how to deploy, monitor, and scale Laravel applications on enterprise infrastructure using Forge, Vapor, and GitHub Actions.',
    icon: Cloud,
  },

  // ── 02 · Concept: Deployment Philosophy ────────────────────────────────────
  {
    type: 'concept',
    title: 'Deployment Workflows',
    subtitle: 'Immutable Infrastructure',
    content: 'Manual FTP/SSH deployments are dead. Modern DevOps uses automated CI/CD pipelines where code is tested, built, and deployed in a single repeatable flow. From local Git push to production cloud, zero human touch in between.',
    icon: GitBranch,
    callout: 'Never edit files directly on a production server. It creates drift — where production is different from your Git history. Always deploy via a clean, automated script.',
    keyPoints: [
      'CI: Continuous Integration — running tests on every PR.',
      'CD: Continuous Deployment — pushing code to production on merge.',
      'Atomicity: Deploys should be "all-or-nothing".',
      'Rollbacks: The ability to revert to a previous version in seconds.',
    ],
  },

  // ── 03 · Code: Environment Config ──────────────────────────────────────────
  {
    type: 'code',
    title: 'Production Hardening',
    subtitle: 'Optimization & Security',
    content: 'Laravel is optimized for developers locally, but for production, we must cache our configurations and routes to eliminate expensive file IO on every request. Hard hardening means PHP-FPM tuning and OPcache optimization.',
    icon: Zap,
    language: 'bash',
    codeFileName: 'deploy.sh',
    codeSnippet: `# ── Optimization Commands ─────────────────────────────
# Cache the config (do not read .env on every request)
php artisan config:cache

# Compile all blade views into cached PHP files
php artisan view:cache

# Map all routes into a single fast lookup array
php artisan route:cache

# Optimize composer autoloader
composer install --no-dev --optimize-autoloader

# Reset the OPcache (clears compiled code from RAM)
php artisan opcache:clear`,
    keyPoints: [
      'config:cache — improves performance but ignores .env changes until cleared.',
      'route:cache — can make route resolution up to 100x faster.',
      'composer --no-dev — keeps your server light by stripping testing tools.',
      'OPcache — keeps your code in server memory so it doesn\'t re-read files.',
    ],
  },

  // ── 04 · Diagram: GitHub Actions CI ────────────────────────────────────────
  {
    type: 'diagram',
    title: 'GitHub Actions Pipeline',
    subtitle: 'Automated Integrity',
    content: 'Visualizing the "Gatekeeper": Every push triggers a virtual server that boots Laravel, runs PostgreSQL, and executes your full test suite before any code reaches production.',
    icon: Activity,
    diagramNodes: [
      { label: 'Push',          desc: 'main branch',          color: '#6366f1' },
      { label: 'Ubuntu Runner', desc: 'Docker Containers',    color: '#8b5cf6' },
      { label: 'PHPUnit',       desc: 'Feature & Unit tests', color: '#10b981' },
      { label: 'Composer Audit',desc: 'Security scan',        color: '#ef4444' },
      { label: 'Deploy to Forge',desc: 'Webhook triggers Forge', color: '#0ea5e9' },
    ],
  },

  // ── 05 · Code: CI Config ───────────────────────────────────────────────────
  {
    type: 'code',
    title: 'Writing the CI Pipeline',
    subtitle: 'Automation Logic',
    content: 'The .github/workflows/main.yml file is the instruction manual for GitHub. It defines the environment, the database, and the commands required to verify your application.',
    icon: Terminal,
    language: 'bash',
    codeFileName: 'ci.yaml',
    codeSnippet: `name: Run Tests
on: [push, pull_request]

jobs:
  laravel-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: password
        ports: ['5432:5432']

    steps:
      - uses: actions/checkout@v4
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: dom, curl, libxml, mbstring, zip, pcntl, pdo, sqlite, pdo_sqlite, gd, redis

      - name: Install Dependencies
        run: composer install -q --no-ansi --no-interaction --no-scripts --no-progress --prefer-dist

      - name: Run PHPUnit
        run: vendor/bin/phpunit`,
    keyPoints: [
      'services: postgres — boots a real DB for your tests to use.',
      'Setup PHP — chooses the exact version to match production.',
      'runs-on: ubuntu-latest — the virtual machine used for the build.',
      'composer install — ensures identical dependencies to production.',
    ],
  },

  // ── 06 · Quiz: Deployment ──────────────────────────────────────────────────
  {
    type: 'quiz',
    title: 'Optimization Check',
    subtitle: 'Knowledge Check',
    content: '',
    icon: Zap,
    question: 'You change a variable in your .env file on production, but "config(\'app.name\')" still returns the old value. Why?',
    options: [
      {
        text: 'The .env file has incorrect permissions',
        correct: false,
        explanation: 'Incorrect permissions usually throw an error. If you get the *old* value, it means the old value is still cached.',
      },
      {
        text: 'You ran "php artisan config:cache" previously and the config is stuck in cache',
        correct: true,
        explanation: 'Correct. When configuration is cached, Laravel ignores the .env file entirely. You must run "php artisan config:clear" or "php artisan config:cache" again to refresh the cache.',
      },
      {
        text: 'Redis is caching the .env results',
        correct: false,
        explanation: 'Laravel\'s config cache is file-based (stored in bootstrap/cache/), not stored in Redis.',
      },
      {
        text: 'PHP-FPM needs a restart to read the new environment',
        correct: false,
        explanation: 'While PHP-FPM reads env on start, Laravel\'s config cache overrides that behavior. Clearing the cache is the standard fix.',
      },
    ],
  },

  // ── 07 · Concept: Laravel Forge ────────────────────────────────────────────
  {
    type: 'concept',
    title: 'Server Management: Forge',
    subtitle: 'PaaS for Laravel',
    content: 'Forge provisions and manages servers on AWS, DigitalOcean, or Linode. It handles Nginx configuration, SSL (Let\'s Encrypt), PHP-FPM pools, Redis, and MySQL setup automatically — allowing you to be an architect without being a full-time sysadmin.',
    icon: Server,
    keyPoints: [
      'Provisioning: Automatic setup of PHP, Nginx, Redis, and Postgres.',
      'Daemon Management: Keeping queue workers and Horizon alive 24/7.',
      'Isolation: Running multiple sites on one server safely.',
      'Networking: Managing firewalls and SSH access.',
    ],
  },

  // ── 08 · Diagram: The Web Stack ────────────────────────────────────────────
  {
    type: 'diagram',
    title: 'Production Architecture',
    subtitle: 'Nginx, PHP, and the Database',
    content: 'A request travels from the Global Internet, through an SSL-hardened Nginx, into the PHP-FPM pool, and finally queries the database and cache.',
    icon: Globe,
    diagramNodes: [
      { label: 'User',          desc: 'HTTPS (Port 443)',     color: '#6366f1' },
      { label: 'Nginx',         desc: 'Static Assets + Proxy', color: '#8b5cf6' },
      { label: 'PHP-FPM',       desc: 'The Engine (Port 9000)', color: '#bf4e20' },
      { label: 'PostgreSQL',    desc: 'Persistent Data',      color: '#10b981' },
      { label: 'Redis',         desc: 'Cache & Queues',       color: '#ef4444' },
    ],
  },

  // ── 09 · Code: Nginx Tuning ────────────────────────────────────────────────
  {
    type: 'code',
    title: 'High-Performance Nginx',
    subtitle: 'Server Optimization',
    content: 'Nginx should handle static assets (JS, CSS, Images) directly without touching PHP. It should also compress responses and manage browser caching to reduce server load.',
    icon: HardDrive,
    language: 'bash',
    codeFileName: 'nginx.conf',
    codeSnippet: `# ── Gzip Compression ────────────────────────────────
gzip on;
gzip_types text/plain text/css application/json application/javascript;

# ── Static Asset Caching ─────────────────────────────
location ~* \\.(?:ico|css|js|gif|jpe?g|png)$ {
    expires 30d;
    add_header Cache-Control "public";
    access_log off;
}

# ── Security Headers ────────────────────────────────
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
add_header X-Content-Type-Options "nosniff";`,
    keyPoints: [
      'gzip — reduces HTML/JSON payload size by up to 80%.',
      'expires 30d — tells browsers to store assets locally for a month.',
      'access_log off — reduces disk IO for small, unimportant asset requests.',
      'X-Frame-Options — prevents clickjacking attacks.',
    ],
  },

  // ── 10 · Concept: Horizontal Scaling ───────────────────────────────────────
  {
    type: 'concept',
    title: 'Horizontal Scaling',
    subtitle: 'Building a Cluster',
    content: 'One server can only handle so much. Scaling horizontally means adding more web servers and placing them behind a Load Balancer. This requires your app to be "Stateless" (no files stored locally, sessions in Redis).',
    icon: Share2,
    keyPoints: [
      'Load Balancer: Distributes traffic to multiple web servers.',
      'Redis Sessions: Ensure a user stays logged in even if they move servers.',
      'S3 Storage: Files must be stored centrally (AWS S3) not on local disk.',
      'Database Cluster: Scaling out read replicas and a single write server.',
    ],
  },

  // ── 11 · Code: Health Monitoring ───────────────────────────────────────────
  {
    type: 'code',
    title: 'Monitoring & Health',
    subtitle: 'Proactive Alerting',
    content: 'Don\'t wait for users to report a crash. Implement active health checks that monitor disk space, database load, and queue backlog. Sentry or Flare should be used for real-time error tracking.',
    icon: Activity,
    language: 'php',
    codeFileName: 'HealthServiceProvider.php',
    codeSnippet: `<?php
use Spatie\\Health\\Facades\\Health;
use Spatie\\Health\\Checks\\Checks\\DatabaseCheck;
use Spatie\\Health\\Checks\\Checks\\UsedDiskSpaceCheck;
use Spatie\\Health\\Checks\\Checks\\QueueCheck;

Health::checks([
    UsedDiskSpaceCheck::new()
        ->warnWhenUsedSpaceIsAbovePercentage(70)
        ->failWhenUsedSpaceIsAbovePercentage(90),

    DatabaseCheck::new(),

    QueueCheck::new()
        ->failWhenQueueSizeIsAbove(100),
]);

// ── Error Monitoring (Sentry) ──────────────────────
// Sentry::init(['dsn' => 'https://example@sentry.io/123']);`,
    keyPoints: [
      'Spatie Health — provides a beautiful dashboard for server vitals.',
      'QueueCheck — alerts you if background jobs are getting backed up.',
      'Error Tracking — Sentry captures stack traces and user context for every 500 error.',
      'Metric Alerting — Get Slack/Email notifications before the server fails.',
    ],
  },

  // ── 12 · Quiz: Infrastructure ──────────────────────────────────────────────
  {
    type: 'quiz',
    title: 'Cluster Architecture Check',
    subtitle: 'Knowledge Check',
    content: '',
    icon: Server,
    question: 'You have two web servers behind a load balancer. A user uploads a profile picture to Server A. They refresh and see a "404 Not Found". Why?',
    options: [
      {
        text: 'The image was too large for Server B',
        correct: false,
        explanation: 'Size is not the problem. The file simply doesn\'t exist on Server B.',
      },
      {
        text: 'The file was stored on Server A\'s local disk — and the second request hit Server B',
        correct: true,
        explanation: 'Correct. This is a common scaling trap. In a cluster, all files must be stored on a shared storage service (like AWS S3) so every server can see them.',
      },
      {
        text: 'The load balancer is blocking image traffic',
        correct: false,
        explanation: 'Load balancers typically handle all HTTP traffic equally. The storage location is the root cause.',
      },
      {
        text: 'The image needs to be cached in Redis',
        correct: false,
        explanation: 'Redis is for small data/objects, not binary files like images. Use S3 for files.',
      },
    ],
  },

  // ── 13 · Concept: Laravel Vapor ────────────────────────────────────────────
  {
    type: 'concept',
    title: 'Serverless: Laravel Vapor',
    subtitle: 'No Servers to Manage',
    content: 'Vapor is a serverless deployment platform for Laravel, powered by AWS Lambda. It scales from zero to thousands of requests per second automatically and resets to zero when no traffic exists — perfect for unpredictable workloads.',
    icon: Rocket,
    keyPoints: [
      'Auto-scaling: Never worry about CPU or RAM again.',
      'Pay-per-request: Zero cost if no one is using the app.',
      'Asset Management: Auto-syncs assets to Cloudfront CDN.',
      'Database Management: Integrated RDS and DynamoDB setup.',
    ],
  },

  // ── 14 · Hero: Final Review ────────────────────────────────────────────────
  {
    type: 'hero',
    title: 'Backend Mastery Confirmed',
    subtitle: 'Architect Graduation',
    content: 'You can build it, secure it, scale it, and deploy it. From the database engine to the serverless cloud, you now hold the complete industrial backend stack.',
    icon: ShieldCheck,
  },

  // ── 15 · Hero: Project Launch ──────────────────────────────────────────────
  {
    type: 'hero',
    title: 'Launch Project Sigma',
    subtitle: 'Module 06 · Final Capstone',
    content: 'Your final challenge: Deploy your Project Sigma application to a cluster with automated CI/CD, SSL, Redis caching, and health monitoring.',
    icon: Rocket,
  }
];

export default function LaravelDevOpsLessonPage() {
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
              style={{ background: '#6366f1' }}
            />
            Module 06 · DevOps & Cloud
          </div>
        </div>
      </nav>

      <BackendGenericSlides lessonTitle="Cloud Architecture Specialist" slides={devopsSlides} />
    </main>
  );
}