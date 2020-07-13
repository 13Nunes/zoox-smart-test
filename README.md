## Zoox Smart Avaliação Desenvolvedor

- API Node JS;
- Banco de dados MongoDB;
- Entrada e saída da API no formato JSON;
- Repositório no GitHub público;
- API com 2 Resources (Estados e Cidades);
- Tela de consulta com Angular ou Vue.

##### Observações pessoais
:microscope:  Fazia algum tempo que não trabalhava com MongoDB, pois atualmente estou estudando AWS DynamoDB, mas foi divertido relembrar.

### API Node JS
-------------
- Utilização do frameword express;
- Validação de entradas usando o módulo celebrate (JOI/Hapi);
- Módulo Cors para controle de Cross-Origin;
- Otimização da segurança utilizando o módulo helmet para headers;
- Otimização da segurança utilizando o módulo rate-limiter-flexible para combate a brutal force e DDoS;
- Drive para manuseio do banco mongoose;
- Documentação com os módulos swagger-jsdoc e swagger-ui-express. Para visualizar a documentação basta acessar a rota raiz da api;
- Caso não goste de testar a documentação pelo Swagger esteja livre para [importar o modelo do Insomnia](https://raw.githubusercontent.com/13Nunes/zoox-smart-test/master/Insomnia_zoox_smart_test.json) na raiz desse projeto;
- Token JWT gerado utilizando módulo jsonwebtoken;
- Manuseio do Timezone com o módulo moment-timezone.

##### Observações pessoais
:sunglasses: Preferi utilizar JWT para autorização da API, pois vejo essa solução mais frequentemente do que X-API-KEY. Além disso, o token é gerado a partir da autenticação evitando a necessidade de implementar um sistema para gerenciar chaves de acesso.
Para obter um token basta fazer login passando um email válido e qualquer valor para a senha (Fake login).

:clock830: Eu preferi manter o banco com o timezone UTC e ajustar a data ao timezone do usuário durante a execução da API. Considero que é sempre importante manter o dado limpo.

:sob: Eu só tive o domingo para realizar o teste e por isso não tive tempo de instralar o JEST e fazer os testes automatizados. Mas, deixo aqui um [artigo](https://medium.com/javascript-in-plain-english/how-i-setup-unit-test-for-mongodb-using-jest-mongoose-103b772ee164 "artigo") que eu separei para utilização (caso desse tempo).  Ele é interessante, pois utiliza uma instância do MongoDB em memória para não sujar a base durantes os testes.

##### Project setup
```
cd .\server
```
```
yarn install
```

##### Compiles and hot-reloads for development
```
yarn start
```

### Tela de consulta (Front-end Vue JS)
-------------
- Utilização do framework Vue [Quasar](https://quasar.dev/ "Quasar");
- Escolhi o Quasar, pois ele trabalha com Material Design (assim como o Vuetify), porém ele é mais completo e mais flexível. Além disso ele tem um ótimo suporte para Vuex que foi utilizado no projeto;
- O projeto tem i18n (multi-idioma) implementado utilizando Quasar;
- Qualquer login e senha acessa o painel, mas isso porque a API foi escrita assim. Esse projeto pode ser facilmente adaptado para produção;
- Não utilizei um DataGrid server side, pois o Quasar me oferece um Datagrid com suporte a busca, paginação e ordenação. Mas, naturalmente para grandes volumes de dados bastaria trocar o componente. A API tem suporte a ordenação e busca de qualquer forma.

##### Observações pessoais
:sweat_smile: Espero que reparem que toda vez que você entra no login uma nova imagem de fundo com o tema "segurança" é gerada. Para a página de esqueci minha senha uma imagem com o tema "paz" é gerada (imagino que a pessoa deve estar nervosa por perder a senha).

:muscle: Apesar de utilizar um frameword esse projeto está altamente customizado.

##### Project setup
```
cd .\web
```
```
yarn install
```

##### Compiles and hot-reloads for development
Caso o comando abaixo apresente algum problema instale o Quasar globalmente atravepés do comando `$ yarn global add @quasar/cli`.
```
yarn start
```

### Considerações finais
-------------
Acredito que todos os requisitos foram atendidos e extras interessantes foram apresentados.

| Requisito    | Completou  |
| :------------ |:-------------:|
| Node JS      | :thumbsup:   |
| MongoDB   | :thumbsup:   |
| JSON           | :thumbsup:   |
| GitHub        | :thumbsup:   |
| UTF-8          | :thumbsup:   |
| Timezone    | :thumbsup:   |

| Extra            | Completou  |
| :------------ |:-------------:|
| Documentação  | :thumbsup:   |
| Proteção            | :thumbsup:   |
| Testes                |   |
| Cache                |    |
