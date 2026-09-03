import { getCategories } from "@/actions/products";
import CreateProductClient from "./create-product-client";

export default async function CreateProductPage() {
  const categories = await getCategories();
  return <CreateProductClient categories={categories} />;
}
