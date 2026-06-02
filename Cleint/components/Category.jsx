import React from "react";
import { TbBrandToyota } from "react-icons/tb";
import { SiHonda, SiSuzuki, SiHyundai, SiKia, SiNissan } from "react-icons/si";
import { Link } from "react-router-dom";

const brands = [
  { name: "Toyota", icon: <TbBrandToyota size={28} />, path: "/categories/toyota" },
  { name: "Honda",  icon: <SiHonda size={28} />,       path: "/categories/honda"  },
  { name: "Suzuki", icon: <SiSuzuki size={28} />,      path: "/categories/suzuki" },
  { name: "Hyundai",icon: <SiHyundai size={28} />,     path: "/categories/hyundai"},
  { name: "Kia",    icon: <SiKia size={28} />,         path: "/categories/kia"    },
  { name: "Nissan", icon: <SiNissan size={28} />,      path: "/categories/nissan" },
];

const Category = () => {
  return (
    <section className="px-6 md:px-12 py-12 bg-[#F8F7F4]">

      <div className="flex items-baseline justify-between mb-7">
        <h2 className="font-['Syne'] font-bold text-2xl md:text-3xl tracking-tight text-[#111111]">
          Browse by Brand
        </h2>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {brands.map((brand) => (
          <Link
            to={brand.path}
            key={brand.name}
            className="bg-white border border-black/[0.07] rounded-xl p-4 flex flex-col items-center gap-2.5 cursor-pointer hover:border-red-600 hover:bg-red-50 hover:-translate-y-0.5 transition-all group no-underline text-[#111111]"
          >
            <div className="w-12 h-12 bg-[#F8F7F4] rounded-lg flex items-center justify-center group-hover:bg-red-600/10 transition">
              {brand.icon}
            </div>
            <span className="text-sm font-medium">{brand.name}</span>
          </Link>
        ))}
      </div>

    </section>
  );
};

export default Category;