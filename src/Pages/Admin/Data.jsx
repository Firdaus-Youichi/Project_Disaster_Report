import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Data = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    reporterName: "",
    location: "",
    disasterType: "",
    description: "",
    date: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [activeSort, setActiveSort] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("Token tidak ditemukan. Arahkan ke halaman login.");
      navigate("/"); // Arahkan pengguna ke halaman login
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-disasters-reports.vercel.app/api/disasters"
        );
        console.log("Fetched Data:", response.data);
        setData(response.data.data || []);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
        if (error.response?.status === 401) {
          console.error("Unauthorized. Redirecting to login.");
          navigate("/");
        }
      }
    };
    fetchData();
  }, [navigate]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      reporterName: item.reporterName,
      location: item.location,
      disasterType: item.disasterType,
      description: item.description,
      date: item.date.split("T")[0], // Format tanggal untuk input
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      reporterName: form.reporterName,
      location: form.location,
      disasterType: form.disasterType,
      description: form.description,
      date: new Date(form.date).toISOString(),
    };

    try {
      const response = await axios.put(
        `https://api-disasters-reports.vercel.app/api/disasters/${editId}`,
        payload
      );
      console.log("Response Update:", response.data);

      setData((prevData) =>
        prevData.map((item) => (item.id === editId ? response.data.data : item))
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil diperbarui!",
      });

      closeModal();
    } catch (error) {
      console.error(
        "Error updating data:",
        error.response?.data || error.message
      );
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat memperbarui data.",
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm({
      reporterName: "",
      location: "",
      disasterType: "",
      description: "",
      date: "",
    });
    setEditId(null);
  };

  const handleDelete = async (id) => {
    try {
      // Tampilkan dialog konfirmasi menggunakan SweetAlert2
      const result = await Swal.fire({
        title: "Apakah Anda Yakin?",
        text: "Anda tidak dapat memulihkan data ini",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });

      if (result.isConfirmed) {
        // Lakukan penghapusan data jika dikonfirmasi
        const response = await axios.delete(
          `https://api-disasters-reports.vercel.app/api/disasters/${id}`
        );

        if (response.status === 200) {
          setData((prevData) => prevData.filter((item) => item.id !== id));
          Swal.fire("Terhapus!", "Data telah terhapus", "success");
        } else {
          Swal.fire("Error!", "Terjadi kesalahan.", "error");
        }
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Terjadi kesalahan.",
        "error"
      );
    }
  };

  const handleSort = (type) => {
    const sortedData = [...data];
    if (type === "latest") {
      sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (type === "oldest") {
      sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setData(sortedData);
    setActiveSort(type); // Set the active sort button
  };

  return (
    <div className="bg-white flex-grow">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Data Laporan</h2>

        <div className="mb-4">
          <button
            onClick={() => handleSort("latest")}
            className={`px-4 py-2 ${
              activeSort === "latest" ? "bg-gray-500" : "bg-gray-400"
            } text-white rounded-md mr-2`}
          >
            Terbaru
          </button>
          <button
            onClick={() => handleSort("oldest")}
            className={`px-4 py-2 ${
              activeSort === "oldest" ? "bg-gray-500" : "bg-gray-400"
            } text-white rounded-md`}
          >
            Terlama
          </button>
        </div>

        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">No.</th>
              <th className="py-2 px-4">Nama Pelapor</th>
              <th className="py-2 px-4">Lokasi</th>
              <th className="py-2 px-4">Jenis Bencana</th>
              <th className="py-2 px-4">Deskripsi</th>
              <th className="py-2 px-4">Tanggal</th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((item, index) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.reporterName}</td>
                  <td className="border px-4 py-2">{item.location}</td>
                  <td className="border px-4 py-2">{item.disasterType}</td>
                  <td className="border px-4 py-2">{item.description}</td>
                  <td className="border px-4 py-2">{formatDate(item.date)}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-2 py-1 bg-yellow-500 text-white 
rounded-md hover:bg-yellow-600 transition duration-200 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-2 py-1 bg-red-600 text-white 
rounded-md hover:bg-red-700 transition duration-200"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit Data</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nama Pelapor:
                </label>
                <input
                  type="text"
                  name="reporterName"
                  value={form.reporterName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Lokasi:
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Jenis Bencana:
                </label>
                <input
                  type="text"
                  name="disasterType"
                  value={form.disasterType}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Deskripsi:
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tanggal:
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Data;
