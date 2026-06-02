import React, { useState } from 'react';

// DỮ LIỆU PHIM (MOCK DATA - ĐẦY ĐỦ 10 PHIM)
const MOVIE_LIST = [
  { id: 'doraemon', name: 'Phim điện ảnh Doraemon: Nobita và Lâu Đài Dưới Đáy Biển (Phiên Bản Mới)', tag: '2D Lồng Tiếng', image: '/assets/Doraemon.jpg' },
  { id: 'langtrungtang', name: 'Làng Trùng Tang', tag: '2D Phụ Đề', image: '/assets/LangTrungTang.jpg' },
  { id: 'motthoitadayeu', name: 'Một Thời Ta Đã Yêu', tag: '2D Lồng Tiếng', image: '/assets/MotThoiTaDaYeu.jpg' },
  { id: 'ocmuonhon', name: 'Ốc Mượn Hồn', tag: '2D Phụ Đề', image: '/assets/OcMuonHon.jpg' },
  { id: 'bachon', name: 'Ba Trợn', tag: '2D Lồng Tiếng', image: '/assets/BaTron.jpg' },
  { id: 'ngoidenkyquai', name: 'Ngôi Đền Kỳ Quái', tag: '2D Phụ Đề', image: '/assets/NgoiDenKyQuai.jpg' },
  { id: 'tambietgohan', name: 'Tạm Biệt Gohan', tag: '2D Lồng Tiếng', image: '/assets/TamBietGohan.jpg' },
  { id: 'heonammong', name: 'Heo Năm Móng', tag: '2D Lồng Tiếng', image: '/assets/HeoNamMong.jpg' },
  { id: 'trumso', name: 'Trùm Sò', tag: '2D Phụ Đề', image: '/assets/TrumSo.jpg' },
  { id: 'phiphong', name: 'Phi Phông: Quỷ Màu Rừng...', tag: '2D Phụ Đề', image: '/assets/PhiPhong.jpg' }
];

const RAP_LIST = [
  { id: 'nguyendu', name: 'Galaxy Nguyễn Du', slots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '18:30', '19:00', '20:00', '21:00'] },
  { id: 'tanbinh', name: 'Galaxy Tân Bình', slots: ['09:15', '10:00', '10:15', '10:30', '11:00', '11:15', '12:00', '12:15', '13:15', '14:00', '14:15', '15:00', '15:15', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'] },
  { id: 'sala', name: 'Galaxy Sala', slots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '18:30', '19:00'] }
];

const COMBO_LIST = [
  { 
    id: 'keychain', 
    name: 'Doraemon Key Chain', 
    desc: '1 Ví bông móc khóa Doraemon', 
    price: 140000, 
    image: '/assets/Combo1.jpg' 
  },
  { 
    id: 'combo_dora', 
    name: 'Doraemon Combo', 
    desc: '1 Ví bông móc khóa Doraemon + 1 Bắp + 1 Nước 27oz', 
    price: 190000, 
    image: '/assets/Combo2.jpg' 
  },
  { 
    id: 'combo_2big', 
    name: 'Combo 2 Big Extra Premium', 
    desc: '“Nhân đôi sự sảng khoái! Combo gồm 1 bắp rang bơ lớn, 2 Pepsi cỡ lớn + 1 snack Premium tùy chọn”', 
    price: 134000, 
    image: '/assets/Combo3.jpg' 
  },
];

const WALLET_METHODS = [
  { id: 'shopeepay', name: 'Ví ShopeePay - Giảm đến 20% tối đa 50K', logo: '/assets/logo-shopeepay.png' },
  { id: 'momo', name: 'Ví Điện Tử MoMo - Nhập mã "MOMODAY"', logo: '/assets/logo-momo.png' },
  { id: 'zalopay', name: 'Zalopay - Bạn mới Zalopay nhập mã GIAMSAU', logo: '/assets/logo-zalopay.png' },
  { id: 'payoo', name: 'HSBC/Payoo - ATM/VISA/MASTER/JCB/QRCODE', logo: '/assets/logo-payoo.jpg' },
  { id: 'fundiin', name: 'Trả sau Fundiin', logo: '/assets/logo-fundiin.png' }
];

export default function App() {
  const [step, setStep] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  
  // TRẠNG THÁI KIỂM SOÁT POP-UP TRÊN WEB (MODAL STATES)
  const [showSoldOutModal, setShowSoldOutModal] = useState(false);
  const [showSeatErrorModal, setShowSeatErrorModal] = useState(false);
  const [showStarErrorModal, setShowStarErrorModal] = useState(false);
  const [showStarSuccessModal, setShowStarSuccessModal] = useState(false);

  const [chosenRap, setChosenRap] = useState<any>(null);
  const [chosenSlot, setChosenSlot] = useState('');
  const [chosenSeats, setChosenSeats] = useState<string[]>([]);
  const [chosenCombos, setChosenCombos] = useState<{ [key: string]: number }>({ keychain: 0, combo_dora: 0, combo_2big: 0 });

  // PHÂN HỆ STATE THANH TOÁN
  const [useStars, setUseStars] = useState(false);
  const [starsInput, setStarsInput] = useState('');
  const [isStarsApplied, setIsStarsApplied] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0); 
  const [agreeTerms, setAgreeTerms] = useState(false); 
  const [selectedWallet, setSelectedWallet] = useState(WALLET_METHODS[0]);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);

  const pricePerSeat = 70000;
  const totalTicketPrice = chosenSeats.length * pricePerSeat;
  const totalComboPrice = Object.keys(chosenCombos).reduce((sum, id) => {
    const item = COMBO_LIST.find(c => c.id === id);
    return sum + (item ? item.price * chosenCombos[id] : 0);
  }, 0);

  const finalTotal = Math.max(0, totalTicketPrice + totalComboPrice - appliedDiscount);

  const handleSlotClick = (rap: any, slot: string) => {
    if (slot === '10:00') {
      setShowSoldOutModal(true);
    } else {
      setChosenRap(rap);
      setChosenSlot(slot);
    }
  };

  const handleSeatClick = (seatCode: string) => {
    const soldSeats = ['D9', 'D10', 'C8', 'B10', 'E7', 'C7'];
    if (soldSeats.includes(seatCode)) return;
    if (chosenSeats.includes(seatCode)) {
      setChosenSeats(chosenSeats.filter(s => s !== seatCode));
    } else {
      setChosenSeats([...chosenSeats, seatCode]);
    }
  };

  const handleStep2Submit = () => {
    if (chosenSeats.length === 0) return;
    if (chosenSeats.includes('E2') && chosenSeats.includes('E4') && !chosenSeats.includes('E3')) {
      setShowSeatErrorModal(true);
    } else {
      setStep(3);
    }
  };

  const getTabHighlight = (currentTab: string) => {
    if (currentTab === 'phim' && step === 1) return "text-blue-700 border-b-2 border-blue-700 pb-4 font-bold";
    if (currentTab === 'ghe' && (step === 2 || step === 3)) return "text-blue-700 border-b-2 border-blue-700 pb-4 font-bold";
    if (currentTab === 'combo' && (step === 4 || step === 5)) return "text-blue-700 border-b-2 border-blue-700 pb-4 font-bold";
    if (currentTab === 'pay' && (step >= 6)) return "text-blue-700 border-b-2 border-blue-700 pb-4 font-bold";
    return "";
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex font-sans text-gray-800 select-none">
      
      {/* SIDEBAR TRÁI CỐ ĐỊNH */}
      <div className="w-64 bg-[#13427e] text-white flex flex-col fixed h-full left-0 top-0 shadow-xl z-20">
        <div className="p-6 text-center border-b border-blue-800 font-bold text-xl tracking-wider">
          <span className="text-orange-500">Galaxy</span> Cinema
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {['Trang chủ', 'Tra cứu phim', 'Đặt vé', 'Quản lý vé đã đặt', 'Đánh giá', 'Quản lý thông tin cá nhân'].map((name, i) => (
            <button key={i} className={`w-full text-left px-4 py-3 rounded-xl font-medium ${i === 2 ? 'bg-orange-500 text-white shadow-md' : 'text-blue-100 hover:bg-blue-800'}`}>
              {name}
            </button>
          ))}
        </nav>
      </div>

      {/* KHU VỰC BÊN PHẢI CHÍNH */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        
        {/* HEADER CỐ ĐỊNH */}
        <header className="bg-[#13427e] text-white px-8 py-4 flex justify-between items-center shadow-md fixed w-[calc(100%-16rem)] top-0 z-10">
          <div className="text-xl font-bold tracking-wide">ĐẶT VÉ</div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">👤</div>
            <span className="font-semibold">Nguyễn Tiến Minh</span>
            <span className="text-orange-400 font-bold">Star</span>
            <div className="bg-blue-900 px-3 py-1 rounded-lg border border-blue-700 text-xs text-orange-400">🎁 50 Stars</div>
          </div>
        </header>

        <main className="p-8 flex-1 mt-16 flex flex-col">
          
          <div className="flex justify-center space-x-12 border-b border-gray-300 pb-4 mb-6 text-gray-400 font-semibold text-sm">
            <span className={getTabHighlight('phim')}>Chọn phim / Rạp / Suất</span>
            <span className={getTabHighlight('ghe')}>Chọn ghế</span>
            <span className={getTabHighlight('combo')}>Chọn thức ăn</span>
            <span className={getTabHighlight('pay')}>Thanh toán</span>
          </div>

          <div className="w-full bg-[#f3f4f6] min-h-[520px]">
            
            {/* BƯỚC 1: CHỌN PHIM VÀ SUẤT CHIẾU */}
            {step === 1 && (
              <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border">
                <div className="flex-1">
                  {!selectedMovie ? (
                    <div>
                      <h2 className="text-sm font-bold text-gray-900 mb-4 border-l-4 border-blue-700 pl-3 uppercase">Chọn Phim</h2>
                      <div className="grid grid-cols-5 gap-4">
                        {MOVIE_LIST.map((movie) => (
                          <div key={movie.id} onClick={() => setSelectedMovie(movie)} className="cursor-pointer bg-white group rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-center">
                            <img src={movie.image} alt={movie.name} className="w-full aspect-[2/3] object-cover" />
                            <div className="p-2 text-left">
                              <h3 className="font-bold text-[11px] text-gray-700 line-clamp-1 leading-tight">{movie.name}</h3>
                              <span className="text-[9px] text-gray-400 block mt-1">{movie.tag}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-4"><h2 className="font-bold text-sm border-l-4 border-blue-700 pl-3 uppercase text-gray-900">Chọn suất chiếu</h2><button onClick={() => { setSelectedMovie(null); setChosenSlot(''); }} className="text-xs text-blue-600 underline">← Đổi phim</button></div>
                      <div className="space-y-6">
                        {RAP_LIST.map((rap) => (
                          <div key={rap.id} className="pb-2">
                            <h4 className="font-bold text-xs text-black mb-3">Galaxy {rap.name.split(' ').pop()}</h4>
                            <div className="grid grid-cols-6 gap-2">
                              {rap.slots.map(slot => (
                                <button key={slot} onClick={() => handleSlotClick(rap, slot)} className={`py-1.5 border font-bold text-xs rounded-lg transition-all ${chosenSlot === slot && chosenRap?.id === rap.id ? 'bg-blue-700 text-white border-blue-700 shadow-sm' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-700'}`}>{slot}</button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {selectedMovie && (
                  <div className="w-80 border-l pl-6 flex flex-col justify-between min-h-[350px]">
                    <div>
                      <div className="bg-orange-500 text-center py-2 text-white font-bold text-xs rounded-lg uppercase mb-4">Thông tin đơn hàng</div>
                      <img src={selectedMovie.image} alt={selectedMovie.name} className="w-full aspect-[2/1.5] object-cover rounded-xl border shadow-inner" />
                      <p className="text-center text-xs font-bold text-gray-700 mt-4">{chosenSlot ? `Đã chọn: ${chosenRap?.name} - Suất ${chosenSlot}` : 'Vui lòng chọn rạp và suất chiếu.'}</p>
                    </div>
                    <button onClick={() => { if(chosenSlot) setStep(2); }} disabled={!chosenSlot} className="w-full py-3 rounded-xl font-bold text-xs text-white bg-orange-500 hover:bg-orange-600">Tiếp tục</button>
                  </div>
                )}
              </div>
            )}

            {/* BƯỚC 2: SƠ ĐỒ CHỌN GHẾ NGỒI */}
            {step === 2 && selectedMovie && (
              <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border animate-fade-in">
                <div className="flex-1">
                  <h2 className="text-sm font-bold text-gray-900 mb-6 border-l-4 border-blue-700 pl-3 uppercase">Chọn ghế</h2>
                  <div className="flex flex-col items-center space-y-2">
                    {['G', 'F', 'E', 'D', 'C', 'B', 'A'].map((row) => (
                      <div key={row} className="flex items-center space-x-2.5">
                        <span className="w-4 font-bold text-xs text-gray-400 text-center">{row}</span>
                        <div className="flex space-x-1">
                          {Array.from({ length: 17 }, (_, i) => 17 - i).map((num) => {
                            const code = `${row}${num}`;
                            const isSold = ['D9', 'D10', 'C8', 'B10', 'E7', 'C7'].includes(code);
                            const isSelected = chosenSeats.includes(code);
                            return (
                              <button key={num} onClick={() => handleSeatClick(code)} className={`w-7 h-7 text-[10px] font-bold rounded-lg border flex items-center justify-center transition-all ${isSold ? 'bg-[#96a5b5] text-white border-[#96a5b5] cursor-not-allowed' : isSelected ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-blue-800 border-blue-400'}`}>{num}</button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full bg-gray-200 text-center text-[10px] py-1.5 rounded font-bold tracking-widest text-gray-400 mt-8">MÀN HÌNH</div>
                </div>

                <div className="w-80 border-l pl-6 flex flex-col justify-between min-h-[400px]">
                  <div className="space-y-4">
                    <div className="bg-orange-500 text-center py-2 text-white font-bold text-xs rounded-lg uppercase">Thông tin đơn hàng</div>
                    <img src={selectedMovie.image} alt={selectedMovie.name} className="w-full h-36 object-cover rounded-xl border" />
                    <div className="text-xs font-bold text-gray-600 space-y-1">
                      <p className="text-black font-black">{selectedMovie.name}</p>
                      <p className="text-gray-700">🏢 {chosenRap?.name}</p>
                      <p className="text-gray-700">🕒 Suất: {chosenSlot} - 26/05/2026</p>
                      <p className="text-orange-500 pt-2">Ghế đang chọn: {chosenSeats.join(', ')}</p>
                    </div>
                  </div>
                  <button onClick={handleStep2Submit} disabled={chosenSeats.length === 0} className="w-full py-3 rounded-xl font-bold text-xs text-white bg-orange-500 hover:bg-orange-600">Tiếp tục</button>
                </div>
              </div>
            )}

            {/* BƯỚC 3: XÁC NHẬN GHẾ TRUNG GIAN KHỔ LỚN TẠM THỜI */}
            {step === 3 && selectedMovie && (
              <div className="max-w-4xl mx-auto flex gap-6 items-start bg-white p-6 rounded-2xl border animate-fade-in">
                <div className="flex-1 bg-white border border-gray-300 rounded-3xl shadow-lg overflow-hidden flex flex-col justify-between min-h-[420px]">
                  <div className="bg-orange-500 text-center py-3 text-white font-bold text-sm uppercase">Thông tin đơn hàng</div>
                  <div className="p-6 flex gap-6 items-start flex-1">
                    <img src={selectedMovie.image} alt={selectedMovie.name} className="w-32 aspect-[2/3] object-cover rounded-xl shadow-md border" />
                    <div className="flex-1 space-y-2 text-xs">
                      <h4 className="font-black text-gray-900 text-base leading-snug">{selectedMovie.name}</h4>
                      <p className="text-gray-400 text-xs font-semibold">{selectedMovie.tag} -</p>
                      <p className="pt-4 text-gray-800 font-extrabold text-sm">🏢 {chosenRap?.name} <span className="text-gray-400 font-normal">- RAP 5</span></p>
                      <p className="text-gray-800 font-bold text-sm">🕒 Suất: {chosenSlot} - Thứ Ba, 26/05/2026</p>
                      <div className="border-t border-dashed border-gray-300 pt-4 mt-4 space-y-2 font-bold text-gray-500 text-sm">
                        <div className="flex justify-between"><span><span className="text-black font-black">{chosenSeats.length}x</span> Ghế đơn</span><span className="text-black text-right">Ghế: {chosenSeats.join(', ')}</span></div>
                        <div className="flex justify-between border-t border-blue-200 pt-3 text-base text-black font-black"><span>Tổng cộng</span><span className="text-orange-500">{totalTicketPrice.toLocaleString()} ₫</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 border-t flex justify-end">
                    <button onClick={() => setStep(4)} className="px-12 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm shadow-md">Tiếp tục</button>
                  </div>
                </div>
                
                {/* KHỐI ƯU ĐÃI COMBO BÊN PHẢI */}
                <div className="w-44 bg-gray-50 rounded-2xl p-3 border border-gray-200 text-center flex flex-col justify-between min-h-[420px] shadow-sm">
                  <div>
                    <div className="bg-blue-800 text-white text-[10px] font-bold py-1 rounded-md mb-2">Ưu đãi hôm nay</div>
                    <p className="text-[10px] font-black text-gray-900 uppercase">COMBO 2 BIG</p>
                    
                    <img 
                      src="/assets/Combo3.jpg" 
                      alt="Combo 2 Big Extra Premium" 
                      className="w-full h-20 object-cover rounded-lg my-3 border bg-white shadow-inner"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/150x80?text=Combo+2+Big';
                      }}
                    />
                    
                    <p className="text-[9px] text-gray-500 leading-relaxed font-medium">Tiết kiệm hơn 28,000đ - Combo 2 gồm 1 hộp bắp + 2 ly Pepsi lớn</p>
                    <p className="text-[10px] font-black text-orange-600 mt-2">Giá: 134.000 ₫</p>
                  </div>
                  <button onClick={() => { setChosenCombos({ ...chosenCombos, combo_2big: 1 }); setStep(4); }} className="w-full bg-orange-600 text-white text-[10px] font-bold py-2 rounded-xl hover:bg-orange-700 shadow">Đặt combo bắp nước</button>
                </div>
              </div>
            )}

            {/* BƯỚC 4: CHỌN COMBO BẮP NƯỚC */}
            {step === 4 && selectedMovie && (
              <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border shadow-sm flex-1">
                <div className="flex-1">
                  <h2 className="text-sm font-black text-gray-900 mb-5 border-l-4 border-blue-700 pl-2 uppercase tracking-wider">Chọn dịch vụ đi kèm (Combo)</h2>
                  
                  <div className="space-y-4">
                    {COMBO_LIST.map((item) => (
                      <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200/50">
                        
                        <div className="flex items-center space-x-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-20 h-20 object-cover rounded-lg border bg-white shadow-sm flex-shrink-0" 
                          />
                          <div>
                            <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                            <p className="text-xs text-gray-400 mt-1 max-w-md font-medium leading-relaxed">{item.desc}</p>
                            <p className="text-sm font-black text-blue-700 mt-2">Giá: {item.price.toLocaleString()} ₫</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2.5 bg-white border rounded-lg px-2.5 py-1.5 shadow-sm">
                          <button
                            onClick={() => setChosenCombos({ ...chosenCombos, [item.id]: Math.max(0, chosenCombos[item.id] - 1) })}
                            className="w-6 h-6 flex items-center justify-center font-bold text-gray-400 hover:text-red-500 bg-gray-100 rounded transition-colors"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold w-5 text-center text-gray-800">{chosenCombos[item.id]}</span>
                          <button
                            onClick={() => setChosenCombos({ ...chosenCombos, [item.id]: chosenCombos[item.id] + 1 })}
                            className="w-6 h-6 flex items-center justify-center font-bold text-blue-700 hover:bg-blue-50 bg-gray-100 rounded transition-colors"
                          >
                            +
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-80 border-l pl-6 flex flex-col justify-between min-h-[400px]">
                  <div className="space-y-4">
                    <div className="bg-orange-500 text-center py-2 text-white font-bold text-xs rounded-lg uppercase">Thông tin đơn hàng</div>
                    <img src={selectedMovie.image} alt={selectedMovie.name} className="w-full h-36 object-cover rounded-xl border" />
                    <div className="text-xs space-y-1 font-semibold">
                      <p className="text-black font-black">{selectedMovie.name}</p>
                      <p className="text-blue-700 font-bold">Ghế đã chọn: {chosenSeats.join(', ')}</p>
                      <p className="text-gray-500">Tiền bắp nước: {totalComboPrice.toLocaleString()} ₫</p>
                    </div>
                  </div>
                  <button onClick={() => setStep(5)} className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-bold text-xs text-white shadow-md">Tiếp tục</button>
                </div>
              </div>
            )}

            {/* BƯỚC 5: MÀN HÌNH XÁC NHẬN COMBO LỚN */}
            {step === 5 && selectedMovie && (
              <div className="max-w-2xl mx-auto bg-white border border-gray-300 rounded-3xl shadow-lg overflow-hidden flex flex-col justify-between min-h-[440px] animate-fade-in">
                <div className="bg-orange-500 text-center py-3 text-white font-bold text-sm uppercase">Thông tin đơn hàng</div>
                <div className="p-6 flex gap-6 items-start flex-1">
                  <img src={selectedMovie.image} alt={selectedMovie.name} className="w-28 aspect-[2/3] object-cover rounded-xl shadow border" />
                  <div className="flex-1 space-y-2 text-xs">
                    <h4 className="font-black text-gray-900 text-base leading-tight">{selectedMovie.name}</h4>
                    <p className="text-gray-400 font-semibold">{selectedMovie.tag} -</p>
                    <p className="pt-2 text-gray-800 font-black">🏢 {chosenRap?.name} <span className="text-gray-400 font-normal">- RAP 5</span></p>
                    <p className="text-gray-800 font-bold">🕒 Suất: {chosenSlot} - Thứ Ba, 26/05/2026</p>
                    <div className="border-t border-dashed border-gray-300 pt-3 mt-3 space-y-2 font-bold text-gray-500 text-sm">
                      <div className="flex justify-between"><span><span className="text-black font-black">{chosenSeats.length}x</span> Ghế đơn</span><span className="text-black">{totalTicketPrice.toLocaleString()} ₫</span></div>
                      {Object.keys(chosenCombos).map(id => chosenCombos[id] > 0 && (
                        <div key={id} className="flex justify-between border-t pt-2">
                          <span><span className="text-black font-black">{chosenCombos[id]}x</span> {COMBO_LIST.find(c => c.id === id)!.name}</span>
                          <span className="text-black">{(chosenCombos[id] * COMBO_LIST.find(c => c.id === id)!.price).toLocaleString()} ₫</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border-t flex justify-between items-center px-6">
                  <div className="flex flex-col"><span className="text-xs font-bold text-gray-400">Tổng cộng</span><span className="text-lg font-black text-orange-500">{(totalTicketPrice + totalComboPrice).toLocaleString()} ₫</span></div>
                  <button onClick={() => setStep(6)} className="px-12 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm shadow-md">Tiếp tục</button>
                </div>
              </div>
            )}

            {/* BƯỚC 6: ÁP DỤNG ĐIỂM STARS (UI 6.1) */}
            {step === 6 && selectedMovie && (
              <div className="flex gap-6 items-start animate-fade-in bg-[#f3f4f6]">
                <div className="flex-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-200/80 min-h-[460px]">
                  <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Thanh toán</h2>
                  <div className="flex items-center space-x-2 mb-4">
                    <input type="checkbox" id="stars_check" checked={useStars} onChange={(e) => setUseStars(e.target.checked)} className="w-4 h-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                    <label htmlFor="stars_check" className="font-bold text-xs text-gray-700 cursor-pointer flex items-center">Áp dụng điểm Stars <span className="text-gray-400 ml-1 text-[10px]">▼</span></label>
                  </div>
                  <div className="flex gap-4 mb-6 max-w-lg">
                    <input 
                      type="number" 
                      placeholder="Nhập số điểm..." 
                      disabled={!useStars} 
                      value={starsInput} 
                      onChange={(e) => setStarsInput(e.target.value)} 
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white focus:border-orange-500" 
                    />
                    <button 
                      disabled={!useStars} 
                      onClick={() => { 
                        const pts = parseInt(starsInput);
                        if (!starsInput || pts <= 0 || pts > 70) {
                          setShowStarErrorModal(true); 
                          setIsStarsApplied(false); 
                          setAppliedDiscount(0);
                        } else { 
                          setShowStarSuccessModal(true); 
                          setIsStarsApplied(true); 
                          setAppliedDiscount(pts * 1000); 
                        } 
                      }} 
                      className="px-8 py-2 bg-[#f47b20] hover:bg-orange-600 text-white rounded-lg font-bold text-xs shadow-sm transition-colors"
                    >
                      Áp dụng
                    </button>
                  </div>
                  <div className="space-y-2 text-[11px] text-gray-600 font-medium leading-relaxed max-w-2xl">
                    <p className="text-gray-400">Bạn đang có <span className="font-bold text-gray-700">70 điểm Stars</span></p>
                    <p className="font-bold text-gray-800 text-xs pt-2">Lưu ý</p>
                    <p>Điểm Stars có thể quy đổi thành tiền để mua vé hoặc bắp/nước tại các cụm rạp Galaxy Cinema. 1 Stars = 1,000 VNĐ</p>
                    <p className="pl-6">* Stars quy định trên 1 giao dịch: tối thiểu là 20 điểm và tối đa là 100 điểm.</p>
                    <p>Stars là điểm tích lũy dựa trên giá trị giao dịch bởi thành viên giao dịch tại Galaxy Cinema. Cơ chế tích lũy stars, như sau:</p>
                    <p className="pl-8">• Thành viên Star: 3% trên tổng giá trị/ số tiền giao dịch.</p>
                    <p className="pl-8">• Thành viên G-Star: 5% trên tổng giá trị/ số tiền giao dịch.</p>
                    <p className="pl-8">• Thành viên X-Star: 7% trên tổng giá trị/ số tiền giao dịch.</p>
                  </div>
                </div>

                <div className="w-[360px] bg-white rounded-3xl shadow-sm border border-gray-200/80 overflow-hidden flex flex-col justify-between min-h-[460px]">
                  <div>
                    <div className="m-3 mb-0 bg-[#f47b20] text-center py-2 text-white font-bold text-xs rounded-xl uppercase tracking-wider shadow-sm">Thông tin đơn hàng</div>
                    <div className="p-3 flex gap-3 border-b border-dashed border-gray-200">
                      <img src={selectedMovie.image} alt={selectedMovie.name} className="w-16 h-24 rounded object-cover border bg-gray-50 flex-shrink-0" />
                      <div className="text-[10px] font-bold space-y-1 flex-1">
                        <h4 className="text-black text-xs font-black line-clamp-2 uppercase leading-tight">{selectedMovie.name}</h4>
                        <p className="text-gray-700 mt-1">🏢 Rạp: {chosenRap?.name.replace('Galaxy ', '')}</p>
                        <p className="text-gray-400">Suất chiếu: <span className="text-orange-500 font-bold">{chosenSlot}</span> - 26/05</p>
                        <p className="text-gray-600">Ghế: {chosenSeats.join(', ')}</p>
                      </div>
                    </div>
                    <div className="px-4 space-y-2.5 text-[11px] font-bold text-gray-600">
                      <div className="flex justify-between border-t border-dashed border-gray-300 pt-3"><span className="font-normal text-gray-400"><span className="text-black font-bold">{chosenSeats.length > 0 ? chosenSeats.length : 2}x</span> Ghế đơn</span><span className="text-black">{totalTicketPrice > 0 ? totalTicketPrice.toLocaleString() : '140.000'} ₫</span></div>
                      <div className="text-[10px] text-gray-400 font-normal pl-4 -mt-1">Ghế: {chosenSeats.length > 0 ? chosenSeats.join(', ') : 'E8, E9'}</div>
                      <div className="flex justify-between border-t border-dashed border-gray-300 pt-2.5"><span className="font-normal text-gray-400">1x Combo 2 Big Extra Premium</span><span className="text-black">{totalComboPrice > 0 ? totalComboPrice.toLocaleString() : '134.000'} ₫</span></div>
                      {isStarsApplied && <div className="flex justify-between border-t border-dashed border-gray-300 pt-2.5 text-green-600"><span className="font-normal">Giảm giá áp dụng điểm Stars:</span><span>-{appliedDiscount.toLocaleString()} ₫</span></div>}
                    </div>
                  </div>
                  <div className="p-4 border-t border-dashed border-gray-200 bg-gray-50/40">
                    <div className="flex justify-between items-center mb-4 px-1"><span className="text-xs font-black text-black">Tổng cộng</span><span className="text-sm font-black text-[#f47b20]">{finalTotal.toLocaleString()} ₫</span></div>
                    <button onClick={() => setStep(7)} className="w-full bg-[#f47b20] hover:bg-orange-600 py-3 rounded-xl font-bold text-xs text-white shadow-md uppercase">Thanh Toán</button>
                  </div>
                </div>
              </div>
            )}

            {/* BƯỚC 7: MÀN TRUNG GIAN XÁC NHẬN THANH TOÁN (UI 6.2.1) */}
            {step === 7 && selectedMovie && (
              <div className="flex gap-8 justify-center items-start animate-fade-in bg-[#f3f4f6] -m-6 p-6 rounded-2xl">
                <div className="w-[580px] bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between min-h-[460px]">
                  <div>
                    <div className="m-4 mb-0 bg-[#f47b20] text-center py-2.5 text-white font-bold text-xs rounded-xl uppercase tracking-wider shadow-sm">
                      Thông tin đơn hàng
                    </div>
                    <div className="p-5 flex gap-4 border-b border-gray-100 items-start">
                      <div className="w-24 aspect-[2/3] rounded-xl overflow-hidden border shadow-sm bg-gray-50 flex-shrink-0">
                        <img src={selectedMovie.image} alt={selectedMovie.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 text-xs font-bold text-gray-500 space-y-1.5 pt-1">
                        <h4 className="text-black text-sm font-black leading-tight line-clamp-3 mb-1">{selectedMovie.name}</h4>
                        <p className="text-gray-400 text-[11px] font-medium pb-2">{selectedMovie.tag} -</p>
                        <p className="text-gray-800 font-extrabold text-xs">{chosenRap?.name || 'Galaxy Nguyễn Du'} <span className="text-gray-400 font-normal">- RAP 5</span></p>
                        <p className="text-gray-800 font-medium">Suất: {chosenSlot || '20:00'} - Thứ Ba, 26/05/2026</p>
                      </div>
                    </div>
                    <div className="px-5 space-y-3 text-xs font-bold text-gray-600 mt-2">
                      <div className="flex justify-between border-b border-dashed border-gray-200 pb-2.5 pt-2">
                        <span className="font-normal text-gray-400"><span className="text-black font-bold">{chosenSeats.length > 0 ? chosenSeats.length : 2}x</span> Ghế đơn</span>
                        <span className="text-black">{totalTicketPrice > 0 ? totalTicketPrice.toLocaleString() : '140.000'} ₫</span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-normal pl-4 -mt-2">Ghế: {chosenSeats.length > 0 ? chosenSeats.join(', ') : 'E8, E9'}</div>
                      <div className="flex justify-between border-b border-dashed border-gray-200 pb-2.5">
                        <span className="font-normal text-gray-400"><span className="text-black font-bold">1x</span> Combo 2 Big Extra Premium</span>
                        <span className="text-black">{totalComboPrice > 0 ? totalComboPrice.toLocaleString() : '134.000'} ₫</span>
                      </div>
                      {isStarsApplied && (
                        <div className="flex justify-between border-b border-dashed border-gray-200 pb-2.5 text-gray-500">
                          <span className="font-normal text-gray-400">Giảm giá áp dụng điểm Stars</span>
                          <span className="text-black">-{appliedDiscount.toLocaleString()} ₫</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-5 border-t border-dashed border-gray-200 bg-gray-50/40">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-sm font-black text-black">Tổng cộng</span>
                      <span className="text-base font-black text-[#f47b20]">{finalTotal.toLocaleString()} ₫</span>
                    </div>
                  </div>
                </div>

                <div className="w-[320px] bg-transparent flex flex-col space-y-4 pt-10">
                  <div className="p-4 bg-white rounded-2xl border border-dashed border-blue-400 text-[11px] space-y-3 shadow-md relative animate-fade-in">
                    <div className="font-black text-blue-800 flex items-center text-xs">👮 Xác nhận thanh toán</div>
                    <p className="text-gray-600 leading-tight">Tôi xác nhận các thông tin đặt vé đã chính xác</p>
                    <label className="flex items-start text-gray-500 font-semibold cursor-pointer leading-relaxed">
                      <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-0.5 mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" />
                      <span>Tôi đồng ý các <span className="text-orange-500 underline">Điều khoản dịch vụ</span> và <span className="text-orange-500 underline">Chính sách bảo mật & Chia sẻ thông tin</span> của Galaxy Cinema</span>
                    </label>
                  </div>
                  <button 
                    onClick={() => { if(agreeTerms) setStep(8); }} 
                    disabled={!agreeTerms}
                    className={`w-full py-2.5 rounded-xl font-bold text-sm text-white shadow transition-all tracking-wide text-center uppercase ${agreeTerms ? 'bg-orange-500 hover:bg-orange-600 cursor-pointer shadow-md' : 'bg-gray-300 text-gray-400 cursor-not-allowed shadow-none'}`}
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            )}

            {/* BƯỚC 8: CHỌN PHƯƠNG THỨC VÍ ĐIỆN TỬ */}
            {step === 8 && selectedMovie && (
              <div className="space-y-3 bg-white p-6 rounded-2xl border">
                <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase">Chọn phương thức thanh toán</h2>
                {WALLET_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-3.5 border rounded-xl hover:bg-gray-50/60 cursor-pointer transition-all ${
                      selectedWallet?.id === method.id
                        ? 'ring-2 ring-blue-700 border-blue-700 bg-blue-50/10'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="wallet_radio"
                      checked={selectedWallet?.id === method.id}
                      onChange={() => setSelectedWallet(method)}
                      className="w-4 h-4 text-blue-700 mr-4"
                    />
                    <div className="w-10 h-10 bg-white rounded-lg border border-gray-100 flex items-center justify-center p-1 mr-4 shadow-xs flex-shrink-0">
                      <img 
                        src={method.logo} 
                        alt={method.name} 
                        className="w-full h-full object-contain" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/40x40?text=Wallet';
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700 flex-1">{method.name}</span>
                  </label>
                ))}
                <button onClick={() => setStep(9)} className="w-full mt-4 bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-bold text-xs text-white shadow-md uppercase">
                  Xác nhận ví & Tiếp tục
                </button>
              </div>
            )}

            {/* BƯỚC 9: MÀN HÌNH HIỂN THỊ MÃ QR CODE THANH TOÁN */}
            {step === 9 && selectedMovie && (
              <div className="flex gap-6 items-start animate-fade-in bg-[#f3f4f6] -m-6 p-6 rounded-2xl">
                <div className="flex-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-200/80 min-h-[460px] flex gap-6">
                  
                  {/* CỘT DANH SÁCH VÍ BÊN TRÁI */}
                  <div className="w-[32%] border-r pr-6 border-gray-200/80 space-y-3 opacity-75 pointer-events-none flex flex-col items-center pt-2">
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-2 self-start">Thanh toán</h2>
                    <p className="text-[10px] text-gray-400 font-bold self-start -mt-2 pb-2">Ví điện tử thanh toán</p>
                    
                    {WALLET_METHODS.map((method) => (
                      <div 
                        key={method.id} 
                        className={`w-full flex items-center p-2 rounded-xl border transition-all ${
                          selectedWallet.id === method.id 
                            ? 'bg-blue-50/40 border-blue-600 ring-1 ring-blue-600 scale-102 font-bold' 
                            : 'bg-gray-50/50 border-gray-100 opacity-40'
                        }`}
                      >
                        <div className="w-8 h-8 bg-white rounded-lg border border-gray-100 flex items-center justify-center p-1 mr-3 shadow-xs flex-shrink-0">
                          <img 
                            src={method.logo} 
                            alt={method.name} 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://placehold.co/32x32?text=W';
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-700 line-clamp-1">{method.name.split(' - ')[0]}</span>
                      </div>
                    ))}
                  </div>

                  {/* KHU VỰC QUÉT MÃ QR CHÍNH GIỮA */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                    <h3 className="font-black text-sm text-gray-900 mb-1">Quét để thanh toán</h3>
                    <p className="text-[11px] text-gray-400 max-w-xs mb-6 leading-relaxed">
                      Mở ứng dụng <span className="font-extrabold text-orange-500 uppercase">{selectedWallet.id}</span> hoặc Shopee để quét.<br />
                      Hoặc, bạn có thể sử dụng các ứng dụng tài chính khác để thanh toán
                    </p>
                    
                    {/* Hộp chứa mã QR */}
                    <div className="flex-1 flex items-center justify-center p-2 shadow-md relative w-44 h-44 bg-white border-2 border-gray-300 rounded-2xl">
                      <img 
                        src="/assets/QR.jpg" 
                        alt="Mã QR Thanh toán" 
                        className="w-full h-full object-contain rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/150x150?text=QR+Code';
                        }}
                      />
                      <span className="absolute -top-1 bg-red-600 text-white font-bold px-2 py-0.5 text-[9px] rounded shadow-md uppercase tracking-wider">
                        Ưu đãi
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-400 font-bold mt-6">Tổng thanh toán</p>
                    <p className="text-xl font-black text-orange-500 mt-0.5">{finalTotal.toLocaleString()} ₫</p>
                  </div>

                </div>

                {/* KHỐI THÔNG TIN ĐƠN HÀNG BÊN PHẢI */}
                <div className="w-[360px] bg-white rounded-3xl shadow-sm border border-gray-200/80 overflow-hidden flex flex-col justify-between min-h-[460px]">
                  <div>
                    <div className="m-3 mb-0 bg-[#f47b20] text-center py-2 text-white font-bold text-xs rounded-xl uppercase tracking-wider shadow-sm">Thông tin đơn hàng</div>
                    <div className="p-4 flex gap-3 items-start">
                      <div className="w-20 aspect-[2/3] rounded-lg overflow-hidden border shadow-sm bg-gray-50 flex-shrink-0">
                        <img src={selectedMovie.image} alt={selectedMovie.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 text-[11px] font-bold text-gray-500 space-y-1">
                        <h4 className="text-black text-xs font-black leading-tight line-clamp-3 mb-1">{selectedMovie.name}</h4>
                        <p className="text-gray-400 text-[10px] font-medium pb-2">{selectedMovie.tag} -</p>
                        <p className="text-gray-800 font-extrabold text-[11px]">{chosenRap?.name || 'Galaxy Nguyễn Du'} <span className="text-gray-400 font-normal">- RAP 5</span></p>
                        <p className="text-gray-800 font-medium">Suất: {chosenSlot || '20:00'} - Thứ Ba, 26/05/2026</p>
                      </div>
                    </div>
                    <div className="px-4 space-y-2.5 text-[11px] font-bold text-gray-600 border-b border-dashed pb-4">
                      <div className="flex justify-between border-t border-dashed border-gray-300 pt-3">
                        <span>{chosenSeats.length > 0 ? chosenSeats.length : 2}x Ghế đơn</span>
                        <span className="text-black">{totalTicketPrice > 0 ? totalTicketPrice.toLocaleString() : '140.000'} ₫</span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-normal pl-4 -mt-1">Ghế: {chosenSeats.length > 0 ? chosenSeats.join(', ') : 'E8, E9'}</div>
                      <div className="flex justify-between border-t border-dashed border-gray-300 pt-2.5">
                        <span>Combo bắp nước</span>
                        <span className="text-black">{totalComboPrice > 0 ? totalComboPrice.toLocaleString() : '134.000'} ₫</span>
                      </div>
                      {isStarsApplied && (
                        <div className="flex justify-between border-t border-dashed border-gray-300 pt-2.5 text-green-600">
                          <span>Giảm giá áp dụng điểm Stars:</span>
                          <span>-{appliedDiscount.toLocaleString()} ₫</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 border-t border-dashed border-gray-200 bg-gray-50/40 space-y-2">
                    <div className="flex justify-between items-center mb-2 px-1">
                      <span className="text-xs font-black text-black">Tổng cộng</span>
                      <span className="text-sm font-black text-[#f47b20]">{finalTotal.toLocaleString()} ₫</span>
                    </div>
                    <button onClick={() => setPaymentSuccess(true)} className="w-full bg-orange-500 hover:bg-orange-600 py-2.5 rounded-xl font-bold text-xs text-white shadow uppercase tracking-wide">Kích hoạt Thành Công</button>
                    <button onClick={() => setPaymentSuccess(false)} className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-xl font-bold text-[10px] text-white transition-all uppercase">Kích hoạt Thất Bại</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* ========================================================= */}
      {/* KHU VỰC CÁC POP-UP MODAL TRÊN WEB */}
      {/* 1. POP-UP HẾT VÉ */}
      {showSoldOutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl w-80 p-5 text-center border shadow-xl">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 text-lg text-red-600">⚠️</div>
            <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">Suất chiếu hết vé</h3>
            <p className="text-gray-500 text-xs mb-4">Xin lỗi, suất chiếu lúc 10:00 đã hết ghế trống. Vui lòng lựa chọn suất chiếu khác.</p>
            <button onClick={() => setShowSoldOutModal(false)} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg text-xs">Đồng ý</button>
          </div>
        </div>
      )}

      {/* 2. POP-UP LỖI CHỌN GHẾ NGẮT QUÃNG */}
      {showSeatErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl w-96 p-5 text-center border shadow-xl">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 text-lg text-orange-600">⚠️</div>
            <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">Vị trí ghế không hợp lệ</h3>
            <p className="text-gray-500 text-xs mb-4 leading-relaxed">Bạn không thể bỏ trống một ghế ở giữa. Vui lòng không để ghế trống đơn lẻ cạnh ghế đã chọn.</p>
            <button onClick={() => setShowSeatErrorModal(false)} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg text-xs">Hủy và chọn lại</button>
          </div>
        </div>
      )}

      {/* 3. POP-UP LỖI ĐIỂM STARS */}
      {showStarErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl w-80 p-5 text-center border shadow-xl">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 text-lg text-red-600">✕</div>
            <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">Áp dụng thất bại</h3>
            <p className="text-gray-500 text-xs mb-4">Số điểm nhập không hợp lệ hoặc vượt quá 70 Stars hiện có của bạn.</p>
            <button onClick={() => setShowStarErrorModal(false)} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg text-xs">Thử lại</button>
          </div>
        </div>
      )}

      {/* 4. POP-UP THÀNH CÔNG ĐIỂM STARS */}
      {showStarSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl w-80 p-5 text-center border shadow-xl">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-lg text-green-600">✓</div>
            <h3 className="font-bold text-green-600 text-sm mb-1 uppercase">Áp dụng thành công</h3>
            <p className="text-gray-500 text-xs mb-4">Hệ thống đã giảm trừ thành công {(parseInt(starsInput) * 1000).toLocaleString()} ₫ vào tổng đơn.</p>
            <button onClick={() => setShowStarSuccessModal(false)} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg text-xs">Tuyệt vời</button>
          </div>
        </div>
      )}

      {/* 5. POP-UP THANH TOÁN THẤT BẠI TRỰC DIỆN */}
      {paymentSuccess === false && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-3xl w-[380px] p-6 text-center border shadow-2xl relative">
            <button onClick={() => setPaymentSuccess(null)} className="absolute top-4 right-5 text-gray-400 text-lg hover:text-gray-700">✕</button>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 text-xl text-red-600">✕</div>
            <h3 className="text-sm font-black text-red-600 mb-2 uppercase tracking-wider">Thanh toán thất bại</h3>
            <p className="text-gray-500 text-xs font-semibold mb-6 border p-2.5 rounded-xl bg-gray-50">
              Đường dẫn thanh toán gặp sự cố.<br />Vui lòng thử lại sau
            </p>
          </div>
        </div>
      )}

      {/* 6. POP-UP THANH TOÁN THÀNH CÔNG TRỰC DIỆN */}
      {paymentSuccess === true && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-3xl w-[380px] p-6 text-center border shadow-2xl relative">
            <button onClick={() => setPaymentSuccess(null)} className="absolute top-4 right-5 text-gray-400 text-lg hover:text-gray-700">✕</button>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-xl text-green-600">✓</div>
            <h3 className="text-sm font-black text-[#1a4b8c] mb-2 uppercase tracking-wider">Thanh toán thành công</h3>
            <p className="text-gray-500 text-xs font-semibold mb-6 border p-2.5 rounded-xl bg-gray-50">
              Quý khách đã đặt vé thành công
            </p>
            <button onClick={() => { setPaymentSuccess(null); setStep(1); setSelectedMovie(null); setChosenSeats([]); setChosenSlot(''); setChosenCombos({ keychain: 0, combo_dora: 0, combo_2big: 0 }); setIsStarsApplied(false); setAppliedDiscount(0); setStarsInput(''); setUseStars(false); }} className="w-full bg-[#f47b20] hover:bg-orange-600 py-3 rounded-xl font-bold text-xs text-white shadow-md uppercase">Về Trang Chủ Đặt Tiếp</button>
          </div>
        </div>
      )}

    </div>
  );
}