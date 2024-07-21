<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
### Dominio
Essa é uma `api` de uma aplicação para jogadores amadores de `tênis`. Esses jogadores fazem parte de um `ranking` que será atualizado de acordo com a realização de partidas. Os jogadores poderam fazer desafios para outros.
Atualmente o ranking é atualizado de forma manual essa API vai fazer com que o processo e o gerenciamento das partidas sejam feitas de forma automatica.

### Tecnologias usadas(até o momento)
- Nest JS
- Mongo DB

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Documentação de temos tecnicos sobre o NEST JS
### Aqui vou fazer explicar alguns conceitos do NEST JS
#### Diferença entre forFeature e forRoot
<p>No model, nas importações é possivel especificar o escopo dessa importação</p>
  <ul>
  <li>ForRoot(forRoot)</li>
    <p>Uso: Configuração global.</p>
    <p>Contexto: É utilizado para configurar e inicializar um módulo com escopo global na aplicação. Normalmente, é chamado no módulo raiz da aplicação (geralmente AppModule).</p>
    <p>Propósito: Configura serviços ou conexões que devem ser únicos e compartilhados por toda a aplicação. Como, por exemplo, uma conexão com banco de dados.</p>
  <li>ForFeature(forFeature)</li>
    <p>Uso: Configuração local (por módulo).</p>
    <p>É utilizado para registrar entidades ou recursos específicos dentro de um módulo específico. Não é singleton global, mas está disponível apenas para o módulo onde é importado.</p>
    <p>Usado para registrar entidades específicas do ORM ou recursos dentro de um módulo específico. Isso permite que cada módulo gerencie suas próprias dependências de forma isolada.</p>
    <li>
      forRootAsync: Usado para fornecer configuração assíncrona. Permite que você injete dependências ou carregue a configuração de maneira assíncrona.
    </li>
    <li>forFeatureAsync: Similar ao forRootAsync, mas para configuração local por módulo.</li>
  </ul> 

## License

Nest is [MIT licensed](LICENSE).
