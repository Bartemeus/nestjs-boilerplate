# NestJS REST API boilerplate 🇰🇿

npx nest generate module users
npx nest generate service users/user
npx nest generate controller users/user
npx nest generate service myService --flat

<br />
<p align="center"><a href="https://discord.com/channels/520622812742811698/1197293125434093701"><img src="https://github.com/brocoders/nestjs-boilerplate/assets/72293912/c9d5fbf0-b56d-46b5-bb30-f96f44764bae" width="300"/></a></p>
<br />

## Description <!-- omit in toc -->

NestJS REST API boilerplate for a typical project

[Full documentation here](/docs/readme.md)

Demo: <https://nestjs-boilerplate-test.herokuapp.com/docs>

A fully compatible frontend boilerplate: <https://github.com/brocoders/extensive-react-boilerplate>

Belongs to the [bc boilerplates](https://bcboilerplates.com/) ecosystem

<https://github.com/user-attachments/assets/a66f114a-c714-4036-8eeb-20cbf04ae985>

## Table of Contents <!-- omit in toc -->

- [Features](#features)
- [Contributors](#contributors)
- [Support](#support)

## Features

- [x] Database. Support [TypeORM](https://www.npmjs.com/package/typeorm) and [Mongoose](https://www.npmjs.com/package/mongoose).
- [x] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer)).
- [x] Sign in and sign up via email.
- [x] Social sign in (Apple, Facebook, Google, Twitter).
- [x] Admin and User roles.
- [x] Internationalization/Translations (I18N) ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [x] File uploads. Support local and Amazon S3 drivers.
- [x] Swagger.
- [x] E2E and units tests.
- [x] Docker.
- [x] CI (Github Actions).

В NestJS можно сгенерировать различные структуры с помощью `npx nest generate`. Вот основные доступные команды:

### 📌 **Генерация модулей и компонентов**
| Команда | Описание |
|---------|----------|
| `npx nest generate module <name>` | Генерирует модуль |
| `npx nest generate controller <name>` | Генерирует контроллер |
| `npx nest generate service <name>` | Генерирует сервис |
| `npx nest generate provider <name>` | Генерирует провайдер |
| `npx nest generate middleware <name>` | Генерирует middleware |
| `npx nest generate guard <name>` | Генерирует guard (защита маршрутов) |
| `npx nest generate interceptor <name>` | Генерирует interceptor (перехватчик запросов) |
| `npx nest generate pipe <name>` | Генерирует pipe (валидация и трансформация данных) |
| `npx nest generate resolver <name>` | Генерирует GraphQL resolver |
| `npx nest generate gateway <name>` | Генерирует WebSocket gateway |

### 🎯 **Дополнительные опции**
Каждой команде можно передавать **флаг `--flat`**, который генерирует файлы без отдельной папки:
```sh
npx nest generate service myService --flat
```
Это создаст `myService.service.ts` прямо в текущей папке.

Можно также указать путь для генерации:
```sh
npx nest generate module users
npx nest generate service users/user
npx nest generate controller users/user
```
Это создаст файлы внутри `src/users/`.

### 🛠 **Генерация с использованием сокращенного синтаксиса**
Можно использовать **сокращенные команды**:
```sh
npx nest g mo <name>  # module
npx nest g co <name>  # controller
npx nest g s <name>   # service
npx nest g p <name>   # pipe
npx nest g gu <name>  # guard
npx nest g mi <name>  # middleware
```