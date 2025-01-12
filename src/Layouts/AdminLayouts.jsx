import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logout } from "../Redux/AuthSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Log Out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Iya",
      cancelButtonText: "Tidak",
    });

    if (result.isConfirmed) {
      // Jika pengguna mengonfirmasi logout
      dispatch(logout);
      Swal.fire({
        icon: "success",
        title: "Log Out",
        text: "Anda berhasil keluar.",
      });
      navigate("/");
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <aside className="bg-indigo-900 w-64 text-white">
        <div className="p-4">
          <h2 className="font-bold">Aplikasi Admin</h2>
          <nav className="mt-4 ml-4">
            <ul>
              <li>
                <a href="/admin">Dashboard</a>
              </li>
              <li>
                <a href="/admin/report">Pelapor</a>
              </li>
              <li>
                <a href="/admin/data">Data</a>
              </li>
              <li>
                <a href="#">Settings</a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="bg-indigo-700 text-white p-4 shadow-md">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-yellow-300">
              Sistem Kebencanaan
            </h1>
            <div className="flex items-center">
              <p className="px-4 py-2">
                Welcome, {user.name} ({user.email})
              </p>
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
        <main className="p-4 flex-grow">
          <Outlet />
        </main>
        <footer className="bg-indigo-900 text-center text-white p-2 mt-auto">
          <p>&copy; Aku Admin</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
