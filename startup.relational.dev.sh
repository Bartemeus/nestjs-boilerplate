#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh garysh.space:5432
npm run migration:run
npm run seed:run:relational
npm run start:prod
