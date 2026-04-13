import { PRODUCTS } from "../../../components/products";
import ProductDetail from "./ProductDetail";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }) {
  return <ProductDetail slug={params.slug} />;
}
