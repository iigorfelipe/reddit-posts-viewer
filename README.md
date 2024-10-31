## 📌 Desafio:

Criar um programa que consulta diariamente a API do Reddit para coletar e armazenar postagens em destaque do subreddit "artificial". O programa também implementa endpoints REST para permitir a consulta das postagens em intervalos de datas específicos.

## 🛠️ Tecnologias Utilizadas:

- **[Node.js](https://nodejs.org/pt)**
- **[Typescript](https://www.npmjs.com/package/typescript)**
- **[Express](https://www.npmjs.com/package/express)**
- **[MongoDB](https://www.mongodb.com/pt-br)**
- **[Mongoose](https://www.npmjs.com/package/mongoose)**
- **[Jest](https://www.npmjs.com/package/jest)**
- **[Supertest](https://www.npmjs.com/package/supertest)**


## 📋 Executando o Projeto Localmente:

1. Clone o repositório:

```bash
git clone git@github.com:iigorfelipe/reddit-posts-viewer.git
```

2. Entre na pasta do projeto:

```bash
cd reddit-posts-viewer
```

3. Instale as dependências:

```bash
npm install
```

4. **Crie o arquivo .env:** Copie o arquivo de exemplo para criar seu próprio arquivo de configuração:
```bash
cp .env.example .env
```

5. Execute o projeto:

```bash
npm run dev
```

⚠️ Certifique-se de que o MongoDB esteja em execução:
```bash
sudo systemctl start mongod
```

Se encontrar qualquer dificuldade, sinta-se à vontade para me contatar através dos links fornecidos ao final desta documentação.


## 🌐 API

     http://localhost:3000/posts?start_date=2024-10-01T00:00:00.000Z&end_date=2024-10-30T00:00:00.000Z

Este endpoint recupera posts com base no intervalo de datas especificado.

### Parâmetros

- ``start_date`` (string): A data de início para o intervalo de datas no formato ISO 8601.

- ``end_date`` (string): A data de fim para o intervalo de datas no formato ISO 8601.

### Resposta

Após uma requisição bem-sucedida, o servidor responderá com um código de status 200 e um array JSON contendo objetos de post. Cada objeto de post inclui os seguintes campos:


- ``id`` (string): O identificador do post.
- ``title`` (string):  O título do post.
- ``author`` (string): O autor do post.
- ``created_utc`` (number): O timestamp de criação do post.
- ``ups`` (number): O número de upvotes para o post.
- ``num_comments`` (number): The O número de comentários no post.


      http://localhost:3000/posts/sorted?start_date=2024-10-01T00:00:00.000Z&end_date=2024-10-30T00:00:00.000Z&order=ups

Este endpoint realiza uma requisição HTTP GET para recuperar uma lista de posts ordenados por um intervalo de datas especificado e ordem.

### Parâmetros

- ``start_date`` (string): A data de início para o intervalo de datas no formato ISO 8601.

- ``end_date`` (string): A data de fim para o intervalo de datas no formato ISO 8601.

- ``order`` (string): A ordem pela qual os posts devem ser ordenados ("ups" ou "comments").

### Resposta

Após uma execução bem-sucedida, o servidor responderá com um código de status 200 e um array JSON contendo os posts ordenados, com a mesma estrutura descrita na seção de resposta acima.

### *Exemplo de requisição à API para obter posts ordenados, utilizando o [Postman](https://www.postman.com/).*

<img src="https://github.com/user-attachments/assets/65640926-3ff4-4335-a098-f0f384c4e8b3" alt="Exemplo de requisição a API para obter posts ordenados via Postman">


## 🧪 Testes

Este projeto inclui testes automatizados para garantir o funcionamento correto da API. Os testes são escritos utilizando ``Jest`` e ``Supertest``.

### Executando os Testes

Para executar os testes, siga os passos abaixo:

1. **Instale as Dependências**: Se você ainda não fez isso, instale as dependências do projeto:

```bash
npm install
```

2. Execute os Testes

```bash
npm test
```

⚠️ Certifique-se de que o MongoDB esteja em execução:
```bash
sudo systemctl start mongod
```

## 👨‍💻 Autor

**@Igor Felipe**

[![Linkedin Badge](https://img.shields.io/badge/-LinkdedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/iigor-felipe/)](https://www.linkedin.com/in/iigor-felipe/)
[![Gmail Badge](https://img.shields.io/badge/-Gmail-c14438?style=for-the-badge&logo=Gmail&logoColor=white&link=mailto:iigorfelipe@gmail.com)](mailto:iigorfelipe@gmail.com)