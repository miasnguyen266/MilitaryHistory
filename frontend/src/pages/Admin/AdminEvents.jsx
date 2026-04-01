// src/pages/Admin/AdminEvents.jsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    event_year: "",
    year_display_vi: "",
    year_display_en: "",
    title_vi: "",
    title_en: "",
    description_vi: "",
    description_en: "",
    image_url: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref để reset input file khi xóa ảnh
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setEvents(res.data);
    } catch (err) {
      setError("Không thể tải danh sách sự kiện");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      const res = await axios.post("/api/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData({ ...formData, image_url: res.data.image_url });
      toast.success("Upload ảnh thành công!");
    } catch (err) {
      toast.error("Upload ảnh thất bại");
    }
  };

  // Hàm xóa ảnh đã chọn
  const handleRemoveImage = () => {
    setFormData({ ...formData, image_url: "" });

    // Reset input file để không giữ file cũ
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    toast.success("Đã xóa ảnh");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      };

      if (editingId) {
        await axios.put(`/api/admin/events/${editingId}`, formData, config);
        toast.success("Cập nhật sự kiện thành công!");
      } else {
        await axios.post("/api/admin/events", formData, config);
        toast.success("Thêm sự kiện thành công!");
      }

      fetchEvents();
      resetForm();
    } catch (err) {
      toast.error("Lưu thất bại");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa sự kiện này?")) return;

    try {
      await axios.delete(`/api/admin/events/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      toast.success("Xóa sự kiện thành công!");
      fetchEvents();
    } catch (err) {
      toast.error("Xóa thất bại");
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setFormData({
      event_year: event.event_year || "",
      year_display_vi: event.year_display_vi || "",
      year_display_en: event.year_display_en || "",
      title_vi: event.title_vi || "",
      title_en: event.title_en || "",
      description_vi: event.description_vi || "",
      description_en: event.description_en || "",
      image_url: event.image_url || "",
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      event_year: "",
      year_display_vi: "",
      year_display_en: "",
      title_vi: "",
      title_en: "",
      description_vi: "",
      description_en: "",
      image_url: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (loading)
    return <div className="text-center py-20 text-xl">Đang tải...</div>;
  if (error)
    return (
      <div className="text-center py-20 text-red-600 text-xl">{error}</div>
    );

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-8">
        Quản lý Sự kiện Lịch sử
      </h1>

      {/* Form thêm/sửa */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 text-navy">
          {editingId ? "Sửa sự kiện" : "Thêm sự kiện mới"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Năm sự kiện (số nguyên)
            </label>
            <input
              name="event_year"
              type="number"
              placeholder="Ví dụ: -221 cho 221 TCN"
              value={formData.event_year}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full"
              required
            />
          </div>

          <input
            name="year_display_vi"
            placeholder="Năm hiển thị (VI) - ví dụ: 221 TCN"
            value={formData.year_display_vi}
            onChange={handleChange}
            className="p-4 border rounded-lg"
            required
          />

          <input
            name="year_display_en"
            placeholder="Year display (EN) - ví dụ: 221 BCE"
            value={formData.year_display_en}
            onChange={handleChange}
            className="p-4 border rounded-lg"
            required
          />

          <input
            name="title_vi"
            placeholder="Tiêu đề (VI)"
            value={formData.title_vi}
            onChange={handleChange}
            className="p-4 border rounded-lg"
            required
          />

          <input
            name="title_en"
            placeholder="Title (EN)"
            value={formData.title_en}
            onChange={handleChange}
            className="p-4 border rounded-lg"
            required
          />

          <textarea
            name="description_vi"
            placeholder="Mô tả chi tiết (VI)"
            value={formData.description_vi}
            onChange={handleChange}
            className="p-4 border rounded-lg md:col-span-2"
            rows="4"
            required
          />

          <textarea
            name="description_en"
            placeholder="Description (EN)"
            value={formData.description_en}
            onChange={handleChange}
            className="p-4 border rounded-lg md:col-span-2"
            rows="4"
            required
          />

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 font-medium">
              Ảnh sự kiện
            </label>

            {formData.image_url && (
              <div className="relative mb-4 inline-block">
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="h-40 object-contain rounded-lg shadow border"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-3 -right-3 text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition text-xl font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="w-full p-4 border rounded-lg"
            />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            className="bg-primary text-white px-10 py-4 rounded-lg hover:bg-primary-dark transition"
          >
            {editingId ? "Cập nhật" : "Thêm mới"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-10 py-4 rounded-lg hover:bg-gray-600 transition"
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      {/* Danh sách sự kiện */}
      <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-5 text-left">Năm (Sắp xếp)</th>
              <th className="p-5 text-left">Năm hiển thị (VI)</th>
              <th className="p-5 text-left">Tiêu đề (VI)</th>
              <th className="p-5 text-left">Ảnh</th>
              <th className="p-5 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t hover:bg-gray-50">
                <td className="p-5 font-medium">{event.event_year}</td>
                <td className="p-5">{event.year_display_vi}</td>
                <td className="p-5">{event.title_vi}</td>
                <td className="p-5">
                  {event.image_url ? (
                    <img
                      src={event.image_url}
                      alt=""
                      className="h-16 object-contain"
                    />
                  ) : (
                    "Không có"
                  )}
                </td>
                <td className="p-5 text-center">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
