import { Outlet } from "react-router";

function AdminLayout() {
  return (
    <div>
      This is AdminLayout component.
      <Outlet />
    </div>
  );
}
export default AdminLayout;
