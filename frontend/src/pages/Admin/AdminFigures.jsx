// src/pages/Admin/AdminFigures.jsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminFigures() {
  const [figures, setFigures] = useState([]);
  const [formData, setFormData] = useState({
    full_name_vi: "",
    full_name_en: "",
    birth_year: "",
    death_year: "",
    image_url: "",
    bio_vi: "",
    bio_en: "",
    contributions_vi: "",
    contributions_en: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchFigures();
  }, []);

  const fetchFigures = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/figures", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setFigures(res.data);
    } catch (err) {
      setError("Không thể tải danh sách nhân vật");
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

  const handleRemoveImage = () => {
    setFormData({ ...formData, image_url: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
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

      let figureId = editingId;

      // 1. Thêm / Cập nhật thông tin nhân vật chính
      if (editingId) {
        await axios.put(
          `/api/admin/figures/${editingId}`,
          {
            full_name_vi: formData.full_name_vi,
            full_name_en: formData.full_name_en,
            birth_year: formData.birth_year || null,
            death_year: formData.death_year || null,
            image_url: formData.image_url || null,
          },
          config,
        );
        toast.success("Cập nhật nhân vật thành công!");
      } else {
        const res = await axios.post(
          "/api/admin/figures",
          {
            full_name_vi: formData.full_name_vi,
            full_name_en: formData.full_name_en,
            birth_year: formData.birth_year || null,
            death_year: formData.death_year || null,
            image_url: formData.image_url || null,
          },
          config,
        );
        figureId = res.data.insertId || res.data.id;
        toast.success("Thêm nhân vật thành công!");
      }

      // 2. Thêm / Cập nhật nội dung chi tiết (bio + contributions)
      // Dùng try-catch riêng để không làm hỏng toàn bộ nếu route chưa có
      try {
        const res = await axios.post(
          `/api/admin/figures/${figureId}/contents`,
          {
            bio_vi: formData.bio_vi,
            bio_en: formData.bio_en,
            contributions_vi: formData.contributions_vi,
            contributions_en: formData.contributions_en,
          },
          config,
        );

        console.log("CONTENT RESPONSE:", res.data);
      } catch (err) {
        console.error("CONTENT ERROR:", err.response?.data || err);
        toast.error("Lỗi lưu nội dung!");
      }

      fetchFigures();
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Lưu thất bại. Vui lòng kiểm tra console.");
    }
  };

  const handleEdit = (figure) => {
    setEditingId(figure.id);
    setFormData({
      full_name_vi: figure.full_name_vi || "",
      full_name_en: figure.full_name_en || "",
      birth_year: figure.birth_year || "",
      death_year: figure.death_year || "",
      image_url: figure.image_url || "",
      bio_vi: figure.bio_vi || "",
      bio_en: figure.bio_en || "",
      contributions_vi: figure.contributions_vi || "",
      contributions_en: figure.contributions_en || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa nhân vật này?")) return;

    try {
      await axios.delete(`/api/admin/figures/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      toast.success("Xóa nhân vật thành công!");
      fetchFigures();
    } catch (err) {
      toast.error("Xóa thất bại");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      full_name_vi: "",
      full_name_en: "",
      birth_year: "",
      death_year: "",
      image_url: "",
      bio_vi: "",
      bio_en: "",
      contributions_vi: "",
      contributions_en: "",
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
        Quản lý Nhân vật Lịch sử
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 text-navy">
          {editingId ? "Sửa nhân vật" : "Thêm nhân vật mới"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="full_name_vi"
            placeholder="Tên tiếng Việt"
            value={formData.full_name_vi}
            onChange={handleChange}
            className="p-4 border rounded-lg"
            required
          />
          <input
            name="full_name_en"
            placeholder="Tên tiếng Anh"
            value={formData.full_name_en}
            onChange={handleChange}
            className="p-4 border rounded-lg"
            required
          />
          <input
            name="birth_year"
            type="number"
            placeholder="Năm sinh"
            value={formData.birth_year}
            onChange={handleChange}
            className="p-4 border rounded-lg"
          />
          <input
            name="death_year"
            type="number"
            placeholder="Năm mất"
            value={formData.death_year}
            onChange={handleChange}
            className="p-4 border rounded-lg"
          />

          {/* Phần upload ảnh có nút xóa */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 font-medium">
              Ảnh nhân vật
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

          <textarea
            name="bio_vi"
            placeholder="Tiểu sử (VI)"
            value={formData.bio_vi}
            onChange={handleChange}
            className="p-4 border rounded-lg md:col-span-2"
            rows="6"
          />
          <textarea
            name="bio_en"
            placeholder="Biography (EN)"
            value={formData.bio_en}
            onChange={handleChange}
            className="p-4 border rounded-lg md:col-span-2"
            rows="6"
          />
          <textarea
            name="contributions_vi"
            placeholder="Đóng góp (VI)"
            value={formData.contributions_vi}
            onChange={handleChange}
            className="p-4 border rounded-lg md:col-span-2"
            rows="6"
          />
          <textarea
            name="contributions_en"
            placeholder="Contributions (EN)"
            value={formData.contributions_en}
            onChange={handleChange}
            className="p-4 border rounded-lg md:col-span-2"
            rows="6"
          />
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
            {figures.map((figure) => (
              <tr key={figure.id} className="border-t hover:bg-gray-50">
                <td className="p-5">{figure.full_name_vi}</td>
                <td className="p-5">
                  {figure.birth_year} - {figure.death_year || "Nay"}
                </td>
                <td className="p-5">
                  {figure.image_url ? (
                    <img
                      src={figure.image_url}
                      alt=""
                      className="h-16 object-contain"
                    />
                  ) : (
                    "Không có"
                  )}
                </td>
                <td className="p-5 text-center">
                  <button
                    onClick={() => handleEdit(figure)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(figure.id)}
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
