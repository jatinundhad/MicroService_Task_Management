#!/bin/bash

# Wait for the MySQL database to be ready
until mysqladmin ping -h mysqldb -u root -pvishv; do
  echo "MySQL is unavailable - sleeping"
  sleep 2
done

echo "MySQL is up - starting your application"
nodemon apiGateway.js
