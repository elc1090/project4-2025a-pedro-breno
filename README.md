# Projeto: Aplicação web com persistência de dados do lado do servidor

![Screenshot do projeto](/assets/Captura%20de%20tela%202025-05-26%20200914.png)
![Screenshot do projeto](/assets/Captura%20de%20tela%202025-05-26%20200847.png)

## Repositório Front-End
[https://github.com/Akunozz/Front-t3-web](https://github.com/Akunozz/Front-t3-web)

## Acesso ao Projeto
[https://roadmap-eta-one.vercel.app/](https://roadmap-eta-one.vercel.app/)

## Desenvolvedores:

- Breno Rosa  
- Pedro H. Jovanowichs  
Ambos estudantes de Sistemas de Informação.

## Nosso produto:

Desenvolvemos uma aplicação web de criação e gerenciamento de **roadmaps de aprendizado**, com foco no **compartilhamento de conhecimento**. A aplicação permite que usuários criem seus próprios planos de estudo e compartilhem com outros usuários.

### Funcionalidades:

- Login de usuários.
- Criação, edição e exclusão de roadmaps.
- Visualização de todos os roadmaps públicos.
- Campo de pesquisa para buscar roadmaps pelo título.
- Filtro para visualizar apenas os roadmaps do usuário logado.

## Desenvolvimento:

O projeto foi dividido entre front-end e back-end. O front-end foi desenvolvido em Next.js com Tailwind CSS. O back-end foi desenvolvido em Node.js com Express e MongoDB Atlas para persistência dos dados.

Uma das decisões principais foi associar cada roadmap ao `id` do usuário criador, permitindo o filtro correto por autor. A autenticação simples também foi suficiente para as funcionalidades propostas, sem necessidade de tokens avançados.

## Tecnologias

### Front-End:
- Next.js
- React
- Tailwind CSS
- Vercel (deploy)

### Back-End:
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Render (deploy)

## Ambiente de desenvolvimento
- Visual Studio Code
- Extensões: Prettier, ESLint, Tailwind CSS IntelliSense

## Referências e créditos

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB + Mongoose Documentation](https://mongoosejs.com/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Lucide Icons](https://lucide.dev/)
- ChatGPT para auxílio com rotas, integração com MongoDB e autenticação

---

Projeto entregue para a disciplina de [Desenvolvimento de Software para a Web](http://github.com/andreainfufsm/elc1090-2025a) em 2025a
