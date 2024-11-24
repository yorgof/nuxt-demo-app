  @echo off
  echo Starting PostgreSQL Docker container...

  docker run -d ^
      --name my-postgres ^
      -e POSTGRES_USER=clientuser ^
      -e POSTGRES_PASSWORD=mypassword ^
      -e POSTGRES_DB=demoappdb ^
      -p 5432:5432 ^
      postgres
  
  echo PostgreSQL Docker container started.