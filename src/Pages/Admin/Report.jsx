import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Report = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    reporterName: "",
    location: "",
    disasterType: "",
    description: "",
    date: "",
  });
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

  const handleCancel = () => {
    setForm({
      reporterName: "",
      location: "",
      disasterType: "",
      description: "",
      date: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }; //input

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      reporterName: form.reporterName,
      location: form.location,
      disasterType: form.disasterType,
      description: form.description,
      date: new Date(form.date).toISOString(),
    };
  
    console.log("Payload:", payload);
    try {
      const response = await axios.post(
        "https://api-disasters-reports.vercel.app/api/disasters",
        payload
      );
      console.log("Response Create:", response.data);
  
      setData([...data, response.data.data]); // Tambahkan data baru ke list
  
      // Reset form setelah berhasil submit
      setForm({
        reporterName: "",
        location: "",
        disasterType: "",
        description: "",
        date: "",
      });
  
      // Tampilkan notifikasi sukses
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil ditambahkan!",
      });
    } catch (error) {
      console.error(
        "Error submitting data:",
        error.response?.data || error.message
      );
      if (error.response?.status === 401) {
        console.error("Unauthorized. Redirecting to login.");
        navigate("/");
      } else {
        // Tampilkan notifikasi error
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat mengirim data.",
        });
      }
    }
  };
  

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

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

  return (
    <div className="bg-white flex-grow">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold">Pelapor</h2>
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 border rounded 
shadow-md bg-white"
        >
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="reporterName"
            >
              Nama Pelapor:
            </label>
            <input
              type="text"
              name="reporterName"
              value={form.reporterName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 
rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="location"
            >
              Lokasi:
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 
rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="disasterType"
            >
              Jenis Bencana:
            </label>
            <input
              type="text"
              name="disasterType"
              value={form.disasterType}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 
rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Deskripsi:
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 
rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="date"
            >
              Tanggal:
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 
rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded-md mr-2 hover:bg-gray-700 transition duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>

        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">No.</th>
              <th className="py-2 px-4">Nama Pelapor</th>
              <th className="py-2 px-4">Lokasi</th>
              <th className="py-2 px-4">Jenis Bencana</th>
              <th className="py-2 px-4">Deskripsi</th>
              <th className="py-2 px-4">Tanggal</th>
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
