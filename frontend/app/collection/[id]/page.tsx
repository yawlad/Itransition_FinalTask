import CollectionPage from "@/components/CollectionPage/CollectionPage";

const Collection = ({ params }: { params: { id: number } }) => {
  return <CollectionPage id={params.id} />;
};
export default Collection;
