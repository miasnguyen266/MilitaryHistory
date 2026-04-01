// src/pages/Admin/AdminPeriods.jsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminPeriods() {
  const [periods, setPeriods] = useState([]);
  const [formData, setFormData] = useState({
    period_name_vi: "",
    period_name_en: "",
    start_year: "",
    end_year: "",
    content_vi: "",
    content_en: "",
    image_url: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref để reset input file khi xóa ảnh
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchPeriods();
  }, []);

  const fetchPeriods = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/periods", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setPeriods(res.data);
    } catch (err) {
      setError("Không thể tải danh sách thời kỳ");
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
        await axios.put(`/api/admin/periods/${editingId}`, formData, config);
        toast.success("Cập nhật thời kỳ thành công!");
      } else {
        await axios.post("/api/admin/periods", formData, config);
        toast.success("Thêm thời kỳ thành công!");
      }

      fetchPeriods();
      resetForm();
    } catch (err) {
      toast.error("Lưu thất bại");
    }
  };

  const handleEdit = (period) => {
    setEditingId(period.id);
    setFormData({
      period_name_vi: period.period_name_vi || "",
      period_name_en: period.period_name_en || "",
      start_year: period.start_year || "",
      end_year: period.end_year || "",
      content_vi: period.content_vi || "",
      content_en: period.content_en || "",
      image_url: period.image_url || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa thời kỳ này?")) return;

    try {
      await axios.delete(`/api/admin/periods/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      toast.success("Xóa thời kỳ thành công!");
      fetchPeriods();
    } catch (err) {
      toast.error("Xóa thất bại");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      period_name_vi: "",
      period_name_en: "",
      start_year: "",
      end_year: "",
      content_vi: "",
      content_en: "",
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
        Quản lý Thời kỳ Lịch sử
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 text-navy">
          {editingId ? "Sửa thời kỳ" : "Thêm thời kỳ mới"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="period_name_vi"
            placeholder="Tên tiếng Việt"
            value={formData.period_name_vi}
            onChange={handleChange}
            className="p-4 border rounded-lg"
            required
          />
          <input
            name="period_name_en"
            placeholder="Tên tiếng Anh"
            value={formData.period_name_en}
            onChange={handleChange}
            className="p-4 border rounded-lg"
            required
          />
          <input
            name="start_year"
            type="number"
            placeholder="Năm bắt đầu"
            value={formData.start_year}
            onChange={handleChange}
            className="p-4 border rounded-lg"
            required
          />
          <input
            name="end_year"
            type="number"
            placeholder="Năm kết thúc"
            value={formData.end_year}
            onChange={handleChange}
            className="p-4 border rounded-lg"
          />
          <textarea
            name="content_vi"
            placeholder="Nội dung (VI)"
            value={formData.content_vi}
            onChange={handleChange}
            className="p-4 border rounded-lg md:col-span-2"
            rows="5"
          />
          <textarea
            name="content_en"
            placeholder="Content (EN)"
            value={formData.content_en}
            onChange={handleChange}
            className="p-4 border rounded-lg md:col-span-2"
            rows="5"
          />

          {/* ==================== PHẦN UPLOAD ẢNH CÓ NÚT XÓA ==================== */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 font-medium">
              Ảnh thời kỳ
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

      {/* Danh sách */}
      <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-5 text-left">Tên (VI)</th>
              <th className="p-5 text-left">Thời gian</th>
              <th className="p-5 text-left">Ảnh</th>
              <th className="p-5 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {periods.map((period) => (
              <tr key={period.id} className="border-t hover:bg-gray-50">
                <td className="p-5">{period.period_name_vi}</td>
                <td className="p-5">
                  {period.start_year} - {period.end_year || "Nay"}
                </td>
                <td className="p-5">
                  {period.image_url ? (
                    <img
                      src={period.image_url}
                      alt=""
                      className="h-16 object-contain"
                    />
                  ) : (
                    "Không có"
                  )}
                </td>
                <td className="p-5 text-center">
                  <button
                    onClick={() => handleEdit(period)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(period.id)}
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
