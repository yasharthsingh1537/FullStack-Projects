import { NavLink, Outlet } from "react-router";
export default function MainLayout() {
  return (
    <div>
      <nav>
        <NavLink to="/" end>
          All Tasks
        </NavLink>
        <br></br>
        <NavLink to="create">New Task</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
