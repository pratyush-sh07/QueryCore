-- ====================================================================
-- QueryCore Seed Data
-- Pre-populates administrative user and default enterprise knowledge base
-- ====================================================================

-- 1. Insert Default Administrative & Demo Accounts
-- Passwords below are hashed using bcrypt ($2b$12$...):
-- Password for all seed users is: Password123!
INSERT INTO users (id, email, hashed_password, full_name, department, role, is_active)
VALUES
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'admin@querycore.io', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Admin Operator', 'Engineering', 'admin', true),
    ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'engineer@querycore.io', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Sarah Chen', 'Engineering', 'member', true),
    ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'hr@querycore.io', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'David Miller', 'HR', 'member', true),
    ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'legal@querycore.io', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Elena Rostova', 'Legal', 'member', true)
ON CONFLICT (email) DO NOTHING;

-- 2. Insert Core Enterprise Documents (matches frontend defaults)
INSERT INTO documents (id, title, department, tags, content, is_confidential, created_by, created_at)
VALUES
    (
        'doc-1',
        'Enterprise AI Security & Compliance Policy 2026',
        'Legal',
        '["Security", "Compliance", "GDPR", "AI-Safety"]'::jsonb,
        'All enterprise AI tools and copilot sessions must adhere to SOC-2 Type II standards. Data processed through large language models must not be used for external training without explicit data isolation agreements. Internal access controls apply based on role-based access control (RBAC). Zero-trust audit logging is enforced across all vector search operations.',
        false,
        'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
        '2026-09-18T10:30:00Z'
    ),
    (
        'doc-2',
        'Employee Onboarding & Benefits Guide',
        'HR',
        '["Benefits", "Health", "PTO", "Onboarding"]'::jsonb,
        'Full-time employees receive 25 days of annual paid time off (PTO) alongside standard corporate holidays. Comprehensive health, dental, and vision insurance begins on day 1 of employment. Annual wellness stipend is $1,200. Mental health days are unlimited upon lead consultation.',
        false,
        'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
        '2026-09-22T14:15:00Z'
    ),
    (
        'doc-3',
        'Microservices Deployment & Cloud Architecture',
        'Engineering',
        '["Kubernetes", "CI/CD", "FastAPI", "Vite"]'::jsonb,
        'Services are deployed on AWS EKS using Helm charts. Production deployments require passing automated unit and integration tests with at least 80% coverage. All API endpoints must authenticate via JWT bearer tokens with RS256/HS256 signing. Database connection pooling is managed via PgBouncer with maximum 50 concurrent connections per pod.',
        false,
        'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
        '2026-09-28T09:00:00Z'
    ),
    (
        'doc-4',
        'Q4 Enterprise Sales Playbook & Pricing Tiers',
        'Sales',
        '["Sales", "Pricing", "B2B", "Contracts"]'::jsonb,
        'QueryCore enterprise tier is priced at $45 per user/month billed annually. Custom deployment and on-prem vector databases require an enterprise agreement signed by a VP or C-level executive. Annual contracts include dedicated 24/7 SLA and custom LLM fine-tuning pipelines.',
        false,
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        '2026-09-30T16:45:00Z'
    )
ON CONFLICT (id) DO NOTHING;
