**[Demo](http://5.53.124.73:81)**

## Используемые технологии

- React

- Redux

- Saga

- Node.js

- Fastify

- Prisma

## Сборка и запуск

### backend

- В директории **backend** создать директорию **public**

- Переименовать файл **.env.demo** в **.env**

- Создать базу данных Postgresql. В файле **.env** заменить в переменной **DATABASE_URL** *name*, *password* и *DB_name* на актуальные

- `npm install`

- `npx prisma migrate dev`

- `npx prisma db seed`

- `npm run startDev`

### frontend
   
- Переименовать файл **.env.demo** в **.env**

- `npm install`

- `npm start`

