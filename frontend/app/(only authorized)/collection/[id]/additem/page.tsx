import AddItemPage from "@/components/ItemPage/AddItemPage";

const AddItem = ({ params }: { params: { id: number } }) => {
  return <AddItemPage collectionId={params.id} />;
};
export default AddItem;
