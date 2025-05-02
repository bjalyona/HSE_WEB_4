#!/bin/sh
set -e

echo "⏳ Waiting for database to be ready..."
/usr/local/bin/wait-for-it.sh db:5432 --timeout=60 --strict -- echo "✅ Database is up"

echo "🚀 Running Prisma migrations..."
npx prisma migrate deploy

echo "🔄 Generating Prisma client..."
npx prisma generate

echo "✅ Prisma client generated. Starting app..."
exec "$@"
