# Full-Stack Example App
## Nx, NestJS(Fastify), GraphQL(Mercurius), Prisma, NestJS, 

![alt text](https://github.com/hoqua/full-stack/blob/part-1-backend/tools/readme/schema.png?raw=true)

### How to run:
- Install docker and nx globally
- `npm i`
- Create `.local.env` from `.env`
- `npm start:dev` 
- Go to GQL Playground. Create User :
```
mutation {
  signUp(signUpInput:{
    email: "youtube-test@test.com", 
    password:"testtest"
  }){
    id
  }
}
```

### Core parts and useful tips
- [Nx](https://nx.dev/getting-started/intro)
  - Create workspace `npx create-nx-workspace full-stack —preset=nest`
  - Add nest app `nx g @nrwl/nest:app my-nest-app --tags "scope:api"`
- [Nest](https://nestjs.com)
  - Add nest package `npm install --save-dev @nrwl/nest`
  - Useful packages `npm i @nestjs/platform-fastify @nestjs/graphql @nestjs/mercurius graphql mercurius`
  - Generate nest resource `nx g @nrwl/nest:resource  -p api --directory="app/resources" --type="graphql-code-first" --crud --name {name}`
  - Generate nest:lib with api scope `nx g @nrwl/nest:lib api/data-access-db --buildable --tags "scope:api"`
  - **!** Validation pipes works together with gql default validation, skipMissingProperties essential.
- [Prisma](https://www.prisma.io/docs/)
  - Add prisma field under package.json `"schema": "libs/api/data-access-db/src/lib/schema.prisma"`
  - Add docker compose.yml to spin up database
  - **!** Check out `prisma-nestjs-graphql` docs if types/validation support needed
  - **!** Create `.local.env` with needed variables
- [NextJS](https://nextjs.org/docs/getting-started)
  - Add next package `npm install --save-dev @nrwl/next`
  - Create next app `nx g @nrwl/next:app web`
  - Turn on `swcMinify: true` to make build faster
- [GraphQL Code Generator](https://www.graphql-code-generator.com/docs/getting-started)
  - Add needed packages `npm i -D graphql-codegen @graphql-codegen/cli @graphql-codegen/near-operation-file-preset @graphql-codegen/typed-document-node @graphql-codegen/typescript-operations @graphql-codegen/typescript @graphql-codegen/typescript-urql`
  - Run generate if config in place `"gen:gql": "graphql-codegen --config tools/gql-codegen/gql-codegen.yml --watch"`
