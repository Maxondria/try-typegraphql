import { main } from "./server";

main().then(({ app }) => {
  app.listen(4000, () =>
    console.log("Server started on http://localhost:4000/graphql")
  );
});
