CREATE TABLE "users" (
  "id" bigint PRIMARY KEY,
  "firstname" varchar,
  "lastname" varchar,
  "email" email,
  "username" varchar,
  "password" varchar,
  "created_at" timestamp
);

CREATE TABLE "recipes" (
  "id" bigint PRIMARY KEY,
  "user_id" int,
  "title" varchar,
  "description" varchar,
  "steps" varchar,
  "created_at" timestamp
);

ALTER TABLE "recipes" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
