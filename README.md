# Serverless Demo: AWS Lambda + Prisma 7 + Neon + AWS CDK

This project demonstrates how to deploy a TypeScript-based Node.js backend to AWS Lambda using the latest Prisma 7 features and Neon database.

## Architecture

- **Backend**: Node.js (TypeScript) + Express + `serverless-http`.
- **Database**: Neon (PostgreSQL) using the **Prisma 7 Driver Adapter** (No engine binary needed in Lambda!).
- **Infrastructure**: AWS CDK (v2).
- **API Gateway**: REST API acting as a proxy to Lambda.

## Prerequisites

1.  An AWS Account and configured credentials.
2.  A [Neon](https://neon.tech) database.
3.  Node.js installed.

## Setup

1.  **Configure Environment**:
    Open `backend/.env` and ensure your `DATABASE_URL` is correct.
    ```text
    DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
    ```

2.  **Install Dependencies**:
    ```bash
    # In the root or backend directory
    cd backend && npm install
    # In the cdk directory
    cd ../cdk && npm install
    ```

3.  **Local Development (Optional)**:
    You can test the database connection locally:
    ```bash
    cd backend
    npx ts-node src/test-db.ts # (If you still have the test script)
    ```

## Deployment

1.  **Synthesize CloudFormation**:
    ```bash
    cd cdk
    npx cdk synth
    ```

2.  **Deploy to AWS**:
    ```bash
    npx cdk deploy
    ```
    After deployment, the `ApiEndpoint` will be printed in the terminal.

## API Endpoints

- `GET /`: Hello world message.
- `GET /users`: List all users from the database.
- `POST /users`: Create a new user.
  - Body: `{ "email": "user@example.com", "name": "John Doe" }`

## Notes on Prisma 7

This demo uses the new Prisma 7 configuration:
- `prisma.config.ts` is used for CLI tools.
- `schema.prisma` contains only the model definitions (no `url` field).
- `@prisma/adapter-neon` is used in the handler to provide a high-performance database connection over HTTP, ideal for serverless environments.
