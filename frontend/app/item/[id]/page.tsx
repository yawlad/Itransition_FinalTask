import ItemPage from "@/components/ItemPage/ItemPage";

export default function Item({ params }: { params: { id: number } }) {
  return <ItemPage id={params.id} />;
}
