
# recipe-api

A recipe-api é uma API que recebe ingredientes como parâmetro de entrada em uma chamada GET e retorna uma lista de receitas. 
As receitas são baseadas na API [RecipePuppy](http://www.recipepuppy.com/about/api/) e os gifs obtidos da API [Giphy](https://developers.giphy.com/docs/).

### Pré-requisitos

Estas ferramentas devem ser instaladas:
- [Node](https://nodejs.org/) - dependência de desenvolvimento
- [Docker](https://www.docker.com/) - dependência de execução
- [GNU Make](https://www.gnu.org/software/make/) - dependência de execução
- [GnuPG](https://gnupg.org/) - dependência de execução

### Makefile

O Makefile é uma maneira de padronizar a execução de comandos em diferentes projetos.
Para utilizar os targets do Makefile é necessário possuir o Gnu Make (já está presente nas distros GNU/Linux).

Targets:
- `make start`: Inicia a api localmente (sem docker)
- `make install`: Baixa as dependências do projeto
- `make lint`: Executa o lint
- `make audit`: Escaneia o projeto em busca de vulnerabilidades
- `make test`: Executa os testes
- `make docker-build`: Constrói uma imagem do projeto
- `make docker-run`: Executa um container da imagem gerada
- `make docker-logs`: Exibe os logs do container
- `make encrypt-env`: Encripta o arquivo app.env
- `make decrypt-env`: Decripta o arquivo app.env

### Arquivo app.env.gpg

O `app.env.gpg` é um arquivo com variáveis de ambiente encriptado com o GnuPG.
É importante evitar expor variáveis de ambiente em repositórios de código, principalmente quando há informações sensíveis como senhas e tokens de acesso.
Para decriptar o arquivo basta executar o target `make decrypt-env` e inserir a senha.

### Rodando o projeto
Para executar o projeto:
 1. `make decrypt-env` (necessário apenas uma vez)
 1. `make docker-build`
 1. `make docker-run`
 1. `make docker-logs` (para acompanhar os logs)

### Exemplo de uso

##### Get /recipes
Query params:
 - `i`: uma lista de ingredientes (máximo 3)
```
curl 'http://localhost:3000/recipes/?i=bread,sausage'; echo
```
Resposta:
```
{
  "keywords": [
    "bread",
    "sausage"
  ],
  "recipes": [
    {
      "gif": "https://giphy.com/gifs/missyelliott-missy-elliott-all-n-my-grill-mGDiFLpDIQQhf8NrcQ",
      "ingredients": [
        "bread",
        "sausage"
      ],
      "link": "http://find.myrecipes.com/recipes/recipefinder.dyn?action=displayRecipe&recipe_id=1085238",
      "title": "Grilled Sausages"
    },
    {
      "gif": "https://giphy.com/gifs/eye-roll-glee-147md7Nq2YZvc4",
      "ingredients": [
        "bacon",
        "bread",
        "cream cheese",
        "sausage"
      ],
      "link": "http://www.recipezaar.com/Bacon-and-Sausage-Roll-Ups-254325",
      "title": "Bacon and Sausage Roll-Ups"
    }
  ]
}
```

### Próximos passos:
- Utilizar o docker multistage build para executar todos os targets do Makefile. O docker multistage permite concentrar as dependencias dentro da imagem, mantendo assim a mesma versão de ferramentas, independente de quem está usando.
- Especificar a API com [OpenAPI](https://www.openapis.org/). O OpenAPI define um padrão para descrever APIs REST.
