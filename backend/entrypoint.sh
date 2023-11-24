#!/bin/bash

echo "Waiting for the PostgreSQL database to start..."
until PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\q' ;
do 
  echo "Still waiting..."
  sleep 1
done

echo "PostgreSQL database is up and running."

echo "Applying database migrations..."
python manage.py makemigrations
python manage.py migrate
python manage.py migrate --run-syncdb

echo "Starting Django server..."
python manage.py runserver 0.0.0.0:8000