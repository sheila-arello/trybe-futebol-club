
<!-- Olá, Tryber!
# 🚧 README em construção 🚧

Esse é apenas um arquivo inicial para o README do seu projeto.

É essencial que você preencha esse documento por conta própria, ok?

Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!

⚠️ IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.

Nesse projeto, você vai construir **um back-end dockerizado utilizando modelagem de dados através do Sequelize**
-->

# ⚽ Trybe Futebol Clube ⚽
Desenvolvido durante módulo de backend na Trybe | ago/2022.

## :page_with_curl: Sobre o Projeto

<details>
  <summary markdown="span"><strong>A aplicação</strong></summary><br />
    <!-- ![Exemplo app front](assets/front-example.png) -->

  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️
</details>
<details>
  <summary markdown="span"><strong>O que foi desenvolvido</strong></summary><br />

  Para esse projeto, foi desenvolvida uma API RESTful com aplicações frontend e backend integradas através do docker-compose, que consomem um banco de dados.

  Construí um __backend dockerizado utilizando modelagem de dados através do Sequelize__.

  Foram respeitadas regras de negócio pré definidas pela Trybe, onde precisei garantir que a API desenvolvida fosse capaz de ser consumida pelo frontend provido dentro do projeto.
  
  Destaco aqui, uma das regras principais nesse desenvolvimento. Para adicionar uma partida ou fazer alterações, o usuário deve estar logado. __Essa verificação é feita através de um token válido.__
  
  Além disso, as tabelas `teams` e `matches` contam com um relacionamento para executar as devidas atualizações das partidas.

</details>
<details>
<summary><strong>Observações</strong></summary><br />
  
* Para esse projeto, foi diponibilizado pela Trybe toda a parte de frontend, sendo minha responsabilidade a criação do backend.
* O projeto foi desenvolvido com base em requisitos definidos pela Trybe dentro de um tempo pré determinado.
</details>

## ⚔️ Desafios
<details>
<summary><strong>Principais Desafios</strong></summary><br />
  
* Utilização do typescript com POO: projeto referencia para firmar esses conceitos
* Conceitos de __SOLID__: desenvolver o projeto buscando utilizar ao máximo esses conceitos.
* LeaderBoard: Estruturar uma __query SQL__ para que, em uma única requisição, retornasse a classificação geral dos jogos.
</details>

## :man_technologist: Habilidades Desenvolvidas
<details>
<summary><strong>Hard Skills</strong></summary><br />
  
* Principais hard skills desenvolvidas:
  * TypeScript
  * POO
  * SOLID
</details>

<details>
<summary><strong>Soft Skills</strong></summary><br />
  
* Inteligência Emocional
* Autoliderança
* Gestão do Tempo
* Compartilhar conhecimentos com os demais alunos da Trybe
* Recorrer a mentorias para esclarecimento de dúvidas
</details>

## :memo: Metodologias
<details>
<summary><strong>Metodologias utilizadas</strong></summary><br />

* SOLID
* POO
* AGILE
</details>

## :hammer_and_wrench: Ferramentas

<details>
<summary><strong>Basicas</strong></summary><br />
  
* TypeScript
* Node.js
* cors
* dotenv
* express
* express-async-errors
  
</details>
<details>
<summary><strong>Validações</strong></summary><br />
  
* bcryptjs
* JWT
* Joi
</details>
<details>
<summary><strong>Banco de Dados</strong></summary><br />
  
* MySQL
* Sequelize
</details>
<details>
<summary><strong>Testes</strong></summary><br />
  
* Jest
* Mocha
* Chai
</details>

## 📈 Evolução do projeto
<details>
<summary><strong>Metodologias utilizadas</strong></summary><br />

* 
* 
* testes: atingir cobertura de 100%
</details>

## 🚧 Instalação do Projeto em construção 🚧
<!--
<details>
  <summary markdown="span"><strong>Tutorial para rodar localmente</strong></summary><br />
  
Após cada um dos passos, haverá um exemplo....

1. Abra o terminal e crie um diretório no local de sua preferência com o comando **mkdir**:
```javascript
  mkdir projetos
```


2. Entre no diretório que acabou de criar e depois clone o projeto:
```javascript
  cd projetos
  git clone git@github.com:...
```


3. Para evitar problemas de **CORS**, utilize a extensão **Live Server** do **VSCode** para conseguir carregar todos os assets externos, com o servidor rodando, abra o arquivo **index.html**, não é necessário rodar um **npm install** para ver o jogo rodando.

Se você apenas der duplo clique no arquivo **index.html**, o projeto não vai abrir em seu navegador e se você abrir o console, verá um problema de **CORS**.
</details>
-->
## 🚧 Como utilizar o projeto (operacional) em construção 🚧
<!--
Quais as possibilidades de uso da aplicação.
<br />
front > explicação de como funciona a interface.
<br />
back > insomia, como funciona o crud  e descrição das rotas. Tabela de rotas? (opção de visualização)
-->
