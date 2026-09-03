import { getProductById, getCategories } from "@/actions/products";
import { notFound } from "next/navigation";
import EditProductClient from "./edit-product-client";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product) notFound();

  return <EditProductClient product={product} categories={categories} />;
}
