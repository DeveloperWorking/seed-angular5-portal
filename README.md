# README #

Este repositório contém o seed para aplicações em Phonegap.

Tecnologias:

* Phonegap;
* Angular-CLI versão 1.7.3;
* Angular versão 5;
* NodeJs versão >= 8.11.x;

# PhoneGap Seed

## Configuração do projeto

Para executar este projeto, siga os passos a seguir:

1. Pré-requisitos

    * Ter o Git instalado. Link: https://git-scm.com/downloads;
    * Ter o NodeJs instalado. Link: https://nodejs.org/en/download/;

2. Iniciando o projeto
    
    * Após clonar o projeto, navegue até o diretorio do mesmo e execute os comandos no terminal:
        * npm install

## Servidor de desenvolvimento

Execute `ng serve --open` para rodar o projeto em desenvolviment, o navegador se abrirá automaticamente ao usar a variável `--open`. O browser irá atualizar automaticamente quando os arquivos forem alterados.

## Code scaffolding

Execute `ng generate component component-name` para gerar um novo componente. Você também pode user `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Execute `ng build --base-href ./` para gerar os arquivos de distribuição. Os artefatos de build ficam na pasta `www/`. Use a flag `-prod` para utilizar configurações de produção.

## Processo de utilização do Git

Segue comando que devem ser executados sempre que uma nova funcionalidade for concluida e/ou todo inicio e fim do dia.
Esses comandos são executados no terminal.

* git pull   <-- Pega a ultima versão que está no repositorio
* git status <-- Verifica se tem algum item pendente de commit
* git add -A <-- Adiciona todas os itens pendentes de commit e os deixa em espera para "commit"
* git commit -m "MENSAGEM DE COMMIT" <-- Commita os itens e deixa em espera para "push"
* git push   <-- Sobe as alterações para o repositorio
