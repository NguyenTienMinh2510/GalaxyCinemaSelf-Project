# 🎬 Hướng Dẫn Chạy Dự Án Galaxy Cinema

Chào bạn! Đây là tài liệu hướng dẫn từng bước chi tiết để bạn có thể tự mở và chạy trang web này trên máy tính của mình, ngay cả khi máy bạn **chưa cài đặt bất kỳ công cụ lập trình nào**. 

Vui lòng làm theo các bước đơn giản dưới đây:

---

## 🛠️ Bước 1: Cài đặt môi trường ban đầu (Chỉ làm lần đầu)

Để chạy được trang web, máy tính của bạn cần một phần mềm nền tảng tên là **Node.js**.

1. Truy cập vào trang web chính thức: [nodejs.org](https://nodejs.org/)
2. Bấm vào nút tải phiên bản **LTS** (Phiên bản khuyến nghị cho hầu hết người dùng, ví dụ: 20.x hoặc 22.x).
3. Sau khi tải về file cài đặt (`.msi` trên Windows hoặc `.pkg` trên Mac), bạn mở lên và bấm **Next** (Tiếp tục) cho đến khi hoàn thành.

---

## 📂 Bước 2: Tải code của dự án về máy

Nếu bạn không sử dụng Git, cách nhanh nhất là tải file nén:

1. Tại trang GitHub này, bạn nhìn lên góc trên bên phải, bấm vào nút **Code** màu xanh.
2. Chọn **Download ZIP**.
3. Sau khi tải xong, hãy giải nén file đó ra một thư mục trên máy tính của bạn (Ví dụ: Ngoài màn hình Desktop).

---

## 🚀 Bước 3: Khởi động trang web (Localhost)

Bây giờ chúng ta sẽ dùng cửa sổ dòng lệnh của máy tính để cài đặt thư viện và bật trang web lên.

### Trên Windows:
1. Mở thư mục dự án bạn vừa giải nén ra.
2. Bấm chuột vào **thanh địa chỉ** của thư mục (thanh hiển thị đường dẫn ở phía trên cùng cửa sổ), xóa toàn bộ đường dẫn đó đi, gõ chữ `cmd` rồi ấn **Enter**.
3. Một cửa sổ màn hình màu đen (Command Prompt) sẽ hiện ra.

### Trên Mac:
1. Mở ứng dụng **Terminal** trên Mac lên.
2. Gõ chữ `cd ` (có một dấu cách đằng sau chữ cd).
3. Kéo và thả nguyên cả thư mục dự án vừa giải nén vào cửa sổ Terminal đó rồi ấn **Enter**.

---

### Chạy các lệnh sau tại cửa sổ dòng lệnh vừa mở:

**Lệnh 1: Cài đặt các thư viện cần thiết**
> Sao chép lệnh dưới đây, dán vào cửa sổ dòng lệnh và ấn **Enter**. Quá trình này mất khoảng 1-2 phút tùy thuộc vào tốc độ mạng của bạn.
````bash
npm install

**Lệnh 2: Khởi chạy trang web

> Sau khi lệnh 1 chạy xong và dừng lại, bạn gõ tiếp lệnh sau và ấn Enter:
````bash
npm run dev

🎉 Bước 4: Xem kết quả
Sau khi chạy Lệnh 2 thành công, màn hình sẽ hiển thị dòng chữ thông báo kèm theo một đường link, thông thường sẽ là:
👉 http://localhost:5173/

Cách vào xem: Bạn chỉ cần mở trình duyệt web (Chrome, Edge, Safari...) và gõ địa chỉ http://localhost:5173/ vào thanh địa chỉ rồi ấn Enter. Trang web của bạn đã sẵn sàng hoạt động!

⚠️ Lưu ý quan trọng: Trong suốt quá trình xem trang web, bạn không được tắt cửa sổ màn hình đen (CMD/Terminal) đi. Nếu tắt cửa sổ đó, trang web sẽ bị dừng hoạt động. Khi nào không muốn xem nữa, bạn có thể tắt cửa sổ đó đi là xong.
