-- Tablas de Better Auth (no cambiar nombres de columnas)
CREATE TABLE "user" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "emailVerified" boolean NOT NULL DEFAULT false,
  "image" text,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE "session" (
  "id" text PRIMARY KEY,
  "expiresAt" timestamp NOT NULL,
  "token" text NOT NULL UNIQUE,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now(),
  "ipAddress" text,
  "userAgent" text,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE "account" (
  "id" text PRIMARY KEY,
  "accountId" text NOT NULL,
  "providerId" text NOT NULL,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamp,
  "refreshTokenExpiresAt" timestamp,
  "scope" text,
  "password" text,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE "verification" (
  "id" text PRIMARY KEY,
  "identifier" text NOT NULL,
  "value" text NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now()
);

-- Tabla propia: viviendas publicadas
CREATE TABLE "properties" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL,
  "ownerName" text NOT NULL DEFAULT 'Anunciante',
  "title" text NOT NULL,
  "type" text NOT NULL,
  "price" integer NOT NULL DEFAULT 0,
  "neighborhood" text NOT NULL,
  "bedrooms" integer NOT NULL DEFAULT 0,
  "bathrooms" integer NOT NULL DEFAULT 1,
  "area" integer NOT NULL DEFAULT 0,
  "image" text NOT NULL,
  "description" text NOT NULL,
  "phone" text NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT now()
);
