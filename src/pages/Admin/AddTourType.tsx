import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";

function AddTourType() {
  const { data } = useGetTourTypesQuery(null);
  console.log(data);
  return <div>This is AddTourType component.</div>;
}
export default AddTourType;
