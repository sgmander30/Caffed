import { PRODUCTS, getProductBySlug } from "../../../components/products";
import { notFound } from "next/navigation";
import ProductDetail from "./ProductDetail";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return notFound();
  return <ProductDetail product={product} />;
}
