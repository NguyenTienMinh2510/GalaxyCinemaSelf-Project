import React from 'react';

export default function Sidebar() {
  // Danh sách các mục menu y hệt trong tài liệu Word của bạn
  const menuItems = [
    { id: 'home', name: 'Trang chủ' },
    { id: 'search', name: 'Tra cứu phim' },
    { id: 'booking', name: 'Đặt vé', active: true }, // Mặc định tô cam mục Đặt vé
    { id: 'manage', name: 'Quản lý vé đã đặt' },
    { id: 'review', name: 'Đánh giá' },
    { id: 'profile', name: 'Quản lý thông tin cá nhân' },
  ];

  return (
    <div className="w-64 h-screen bg-[#13427e] text-white flex flex-col p-4 fixed left-0 top-0 border-r border-blue-900">
      {/* Khu vực chứa Logo Galaxy Cinema */}
      <div className="flex items-center justify-center mb-8 py-4 border-b border-blue-700">
        <span className="text-xl font-bold tracking-wider text-white">
          <span className="text-orange-500">Galaxy</span>Cinema
        </span>
      </div>

      {/* Danh sách các nút điều hướng menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              item.active 
                ? 'bg-orange-500 text-white shadow-md' 
                : 'hover:bg-blue-800 text-blue-100'
            }`}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
}