// pages/Products.jsx
import { useState,useEffect } from "react";
import axios from "axios";



const emptyForm = { carName:"",brandName:"",year:"", price:"", mileage:"",title:"",description:"",thumbnail:"" };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch]     = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]         = useState(emptyForm);
  const [editId, setEditId]     = useState(null);
  const [errors, setErrors]     = useState({});

  useEffect(()=>{
    axios.get("https://car-e-commerce-website-production.up.railway.app/web/api/products/view")
    .then((res)=>{
      setProducts(res.data.cars)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  // Search filter
  const filtered = (products || []).filter((p) =>
    p.carName?.toLowerCase().includes(search.toLowerCase()) ||
    p.brandName?.toLowerCase().includes(search.toLowerCase()) 
  );

  // Validate
  function validate() {
    const e = {};
    if (!form.carName.trim())  e.carName  = "Car name required";
    if (!form.brandName.trim()) e.brandName = "Brand name required";
    if (!form.year)      e.year = "Year required";
    if (!form.price) e.price = "Price required";
    if (!form.mileage) e.mileage = "Mileage required";
    if (!form.title.trim()) e.title = "Title required";
    if (!form.description.trim()) e.description = "Description required";
    if (!form.thumbnail.trim()) e.thumbnail = "Thumbnail required";
    return e;
  }

  // Open Add modal
  function openAdd() {
    setForm(emptyForm);
    setEditId(null);
    setErrors({});
    setShowModal(true);
  }

  // Open Edit modal
function openEdit(p) {
    setForm({ carName: p.carName || "", brandName: p.brandName || "", year: p.year || "", price: p.price || "", mileage: p.mileage || "", title: p.title || "", description: p.description || "", thumbnail: p.thumbnail || "" });
    setEditId(p._id);
    setErrors({});
    setShowModal(true);
  }

  // Save (Add or Edit)
   async function handleSave() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

     const payload = {
      ...form,
      
      
    };

    if (editId) {
      await axios.put(`https://car-e-commerce-website-production.up.railway.app/web/api/products/update/${editId}`, payload)
      .then(()=>{
        setProducts((prev)=>{
          setProducts(prev.map((p) => p._id === editId ? { ...p, ...form } : p))
          });
          setShowModal(false);
          setForm(emptyForm);
          setEditId(null);
        }).catch((err)=>{ 
          console.log(err)  
})
    } else {
      // Add
        await axios.post('https://car-e-commerce-website-production.up.railway.app/web/api/products/additems',payload)
      .then((res)=>{
        const newCar = res.data.car;
        if(!newCar){
          console.log("backend response missing car data", res.data);
          return;
        }
        setProducts((prev) => [...prev, newCar]);
        setShowModal(false);
        setForm(emptyForm);
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  // Delete
  async function handleDelete(id) {
    if (window.confirm("Do you want to delete this product?")) {
      await axios.delete(`https://car-e-commerce-website-production.up.railway.app/web/api/products/delete/${id}`)
      .then(()=>{
      setProducts(products.filter((p) => p._id !== id));
      }).catch((err)=>{
        console.log(err)
      })

    }
  }

  // Toggle status
  async function toggleStatus(id) {
    await axios.put(`https://car-e-commerce-website-production.up.railway.app/web/api/products/updatestatus/${id}`)
    .then((res)=>{
      const updatedStatus = res.data.newStatus;
      setProducts(
        products.map((p)=>(p._id=== id ? { ...p, status: updatedStatus } : p))
      )
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="space-y-5">

      {/* Title + Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-gray-800">Products</h2>
        <button
          onClick={openAdd}
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          + Add Car
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or brand..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full sm:w-72 outline-none focus:border-gray-400"
      />

      <p className="text-sm text-gray-400">{filtered.length} products</p>

      {/* Mobile: Cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.map((p) => (
          <div key={p._id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">{p.carName}</p>
                <p className="text-xs text-gray-400">{p.brandName}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium
              ${p.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
             {p.status === "active" ? "active" : "deactivate"}
</span>
            </div>
            <p className="text-sm font-semibold text-gray-800">Rs {p.price}</p>
            <p className="text-xs text-gray-500">Year: {p.year}</p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => openEdit(p)}
                className="flex-1 text-xs border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50 text-gray-600"
              >
                Edit
              </button>
              <button
                onClick={() => toggleStatus(p._id)}
                className="flex-1 text-xs border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50 text-gray-600"
              >
                {p.status === "active" ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="flex-1 text-xs bg-red-50 text-red-600 border border-red-100 rounded-lg py-1.5 hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-left text-gray-400">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Car Name</th>
              <th className="px-4 py-3 font-medium">Brand</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Year</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, index) => (
              <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{p.carName}</td>
                <td className="px-4 py-3 text-gray-500">{p.brandName}</td>
                <td className="px-4 py-3 font-semibold text-gray-800">Rs {p.price}</td>
                <td className="px-4 py-3 text-gray-500">{p.year}</td>
                <td className="px-4 py-3">
                 <span className={`text-xs px-2 py-1 rounded-full font-medium
  ${p.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
  {p.status === "active" ? "active" : "deactivate"}
</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 text-gray-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleStatus(p._id)}
                      className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 text-gray-600"
                    >
                      {p.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-xs bg-red-50 text-red-600 border border-red-100 rounded-lg px-3 py-1.5 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">
            No products found.
          </div>
        )}
      </div>

      {/* Modal — Add / Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">

            {/* Modal Title */}
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-gray-800">
                {editId ? "Edit Car" : "Add New Car"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Form */}
           <div className="space-y-3">
  {/* Car Name */}
  <div>
    <label className="text-xs text-gray-500 mb-1 block">Car Name</label>
    <input
      type="text"
      placeholder="e.g. Toyota Corolla Altis X"
      value={form.carName}
      onChange={(e) => setForm({ ...form, carName: e.target.value })}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
    />
    {errors.carName && <p className="text-xs text-red-500 mt-1">{errors.carName}</p>}
  </div>

  {/* Brand Name */}
  <div>
    <label className="text-xs text-gray-500 mb-1 block">Brand</label>
    <input
      type="text"
      placeholder="e.g. Toyota"
      value={form.brandName}
      onChange={(e) => setForm({ ...form, brandName: e.target.value })}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
    />
    {errors.brandName && <p className="text-xs text-red-500 mt-1">{errors.brandName}</p>}
  </div>

  {/* Title */}
  <div>
    <label className="text-xs text-gray-500 mb-1 block">Title</label>
    <input
      type="text"
      placeholder="e.g. Family Favorite Sedan"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
    />
    {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
  </div>

  {/* Model Year & Price (Flex Layout) */}
  <div className="grid grid-cols-2 gap-3">
    <div>
      <label className="text-xs text-gray-500 mb-1 block">Year</label>
      <input
        type="number"
        placeholder="e.g. 2023"
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
      />
      {errors.year && <p className="text-xs text-red-500 mt-1">{errors.year}</p>}
    </div>

    <div>
      <label className="text-xs text-gray-500 mb-1 block">Price (Rs)</label>
      <input
        type="number"
        placeholder="e.g. 7500000"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
      />
      {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
    </div>
  </div>

  {/* Mileage & Status (Flex Layout) */}
  <div className="grid grid-cols-2 gap-3">
    <div>
      <label className="text-xs text-gray-500 mb-1 block">Mileage (km)</label>
      <input
        type="number"
        placeholder="e.g. 12000"
        value={form.mileage}
        onChange={(e) => setForm({ ...form, mileage: e.target.value })}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
      />
      {errors.mileage && <p className="text-xs text-red-500 mt-1">{errors.mileage}</p>}
    </div>

    <div>
      <label className="text-xs text-gray-500 mb-1 block">Status</label>
      <select
        value={form.status || "active"}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white focus:border-gray-400"
      >
        <option value="active">Active</option>
        <option value="deactivate">Deactivate</option>
      </select>
    </div>
  </div>

  {/* Thumbnail URL */}
  <div>
    <label className="text-xs text-gray-500 mb-1 block">Thumbnail Image URL</label>
    <input
      type="text"
      placeholder="https://example.com/image.jpg"
      value={form.thumbnail}
      onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
    />
    {errors.thumbnail && <p className="text-xs text-red-500 mt-1">{errors.thumbnail}</p>}
  </div>

  {/* Description */}
  <div>
    <label className="text-xs text-gray-500 mb-1 block">Description</label>
    <textarea
      placeholder="Premium driving experience with high resale value..."
      value={form.description}
      onChange={(e) => setForm({ ...form, description: e.target.value })}
      rows="3"
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 resize-none"
    />
    {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
  </div>

</div>

{/* Buttons */}
<div className="flex gap-3 pt-2">
  <button
    onClick={() => setShowModal(false)}
    className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50"
  >
    Cancel
  </button>
  <button
    onClick={handleSave}
    className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm hover:bg-gray-700"
  >
    {editId ? "Save Changes" : "Add Car"}
  </button>
</div>
          </div>
        </div>
      )}
    </div>
  );
}