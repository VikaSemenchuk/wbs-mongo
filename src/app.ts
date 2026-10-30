import { Command } from "commander";
import { client } from "#db";
import {
  getProducts,
  getProductById,
  searchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./products.ts";
import {
  toNumber,
  parseId,
  requiredInput,
  tagsToArray,
} from "./inputValidation.ts";
import type { Product } from "./types.ts";

const program = new Command();

const newProduct = (
  name: string,
  price: string,
  stock: string,
  tags: string,
): Product => {
  return {
    name: requiredInput(name),
    price: toNumber(requiredInput(price)),
    stock: toNumber(requiredInput(stock)),
    tags: tagsToArray(requiredInput(tags)),
  };
};

program
  .name("ecommerce-cli")
  .description("Simple product CRUD CLI")
  .version("1.0.0");

program
  .command("list")
  .description("List all products")
  .action(async () => {
    await client.connect();
    const products = await getProducts();
    console.log(products);
  });

program
  .command("get <id>")
  .description("Get product by ID")
  .action(async (id: string) => {
    await client.connect();
    const product = await getProductById(parseId(id));
    console.log(product);
  });

program
  .command("search <text>")
  .description("Search products by tag")
  .action(async (input: string) => {
    const text = requiredInput(input);

    await client.connect();
    const results = await searchProduct(text);
    console.log(results);
  });

program
  .command("add <name> <price> <stock> <tags> ")
  .description("Add a new product")
  .action(async (name: string, price: string, stock: string, tags: string) => {
    const product = newProduct(name, price, stock, tags);

    await client.connect();
    const id = await createProduct(product);
    console.log(id);
  });

program
  .command("update <id> <name> <price> <stock> <tags>")
  .description("Update a product by ID")
  .action(
    async (
      id: string,
      name: string,
      price: string,
      stock: string,
      tags: string,
    ) => {
      const product = newProduct(name, price, stock, tags);

      await client.connect();
      const updatedProduct = await updateProduct(parseId(id), product);
      console.log(updatedProduct);
    },
  );

program
  .command("delete <id>")
  .description("Delete product by ID")
  .action(async (id: string) => {
    await client.connect();
    const result = await deleteProduct(parseId(id));
    console.log(result);
  });

program.hook("postAction", () => process.exit(0));
program.parse();
