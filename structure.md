
# Estrutura do Monorepo ServiçoPro

```text
servico-pro/
├── apps/
│   ├── web/                # Next.js 14+ Admin & Portal Cliente
│   │   ├── app/            # App Router
│   │   ├── components/     # UI Components (shadcn)
│   │   ├── hooks/          # Custom Hooks
│   │   └── lib/            # Utilities (Supabase, Zod)
│   └── mobile/             # React Native + Expo (App do Técnico)
│       ├── app/            # Expo Router
│       ├── components/     # NativeWind Components
│       └── hooks/          # Shared hooks
├── packages/
│   ├── database/           # Supabase Schema, Migrations, Types
│   ├── ui/                 # Componentes compartilhados (design system)
│   ├── config/             # Configurações de Tailwind, ESLint, TS
│   └── core/               # Lógica de negócio, validações (Zod), Types
├── supabase/
│   ├── migrations/         # Arquivos SQL de migração
│   ├── functions/          # Edge Functions (Stripe, Email)
│   └── seed.sql            # Dados iniciais
├── turbo.json              # Configuração do Turborepo
└── package.json            # Root dependencies
```
