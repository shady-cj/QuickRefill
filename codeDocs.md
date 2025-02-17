# File structure

├── package.json
├── package-lock.json
├── prisma
│   ├── migrations
│   │   ├── 20250214135808_init
│   │   │   └── migration.sql
│   │   ├── 20250214145136_updated_password
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── README.md
├── src
│   ├── controllers
│   │   ├── accounts
│   │   │   └── auth
│   │   │   ├── account-verify.ts
│   │   │   ├── login.ts
│   │   │   ├── password-reset.ts
│   │   │   ├── register.ts
│   │   │   ├── request-account-verify.ts
│   │   │   ├── request-password-reset.ts
│   │   │   ├── token-refresh.ts
│   │   │   └── token-verify.ts
│   │   └── root.ts
│   ├── exceptions
│   │   ├── badRequests.ts
│   │   ├── root.ts
│   │   ├── unauthorizedRequests.ts
│   │   └── validation.ts
│   ├── index.ts
│   ├── lib
│   │   ├── handlers
│   │   │   └── errorHandler.ts
│   │   ├── storage
│   │   │   ├── crypto.ts
│   │   │   └── jwt_tokens.ts
│   │   ├── types
│   │   │   └── payload.ts
│   │   └── utils
│   │   ├── crypto
│   │   │   └── password-tokens-utils.ts
│   │   ├── jwt
│   │   │   ├── generateTokenPair.ts
│   │   │   └── verifyToken.ts
│   │   └── mail
│   │   └── otp.ts
│   ├── middlewares
│   │   └── errors.ts
│   ├── redis-init.ts
│   ├── routes
│   │   ├── accounts
│   │   │   ├── auth.ts
│   │   │   ├── root.ts
│   │   │   └── user.ts
│   │   └── root.ts
│   ├── schemas
│   │   └── user.ts
│   ├── secrets.ts
│   └── services
│   └── email.ts
└── tsconfig.json

Going through each folder

## Prisma

The folder contains schema for all the tables that will be created on the database.
Prisma is a database ORM that we'll be using for this project to streamline how crud (create, read, update, delete) functionalities

### /migrations

All database migrations

### schema.prisma

Where all database models are defined

## src/

Contains all the source files for the project
