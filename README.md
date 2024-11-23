# Intro2SE-22CLC02-Group08

# Frontend
## Cài đặt node_module trước 
```bash
cd src/frontend
npm install
```

## Cách chạy
```bash
cd src/frontend
npm run dev
```
để dừng: Ctrl C -> y

## Code:
file chính **App.jsx** gọi đến các trang trong **/pages** -> page gọi đến **/components**

* Tạo trang trong **/pages**
* dùng lại các component đã có hoặc tạo mới
* thêm trang trong **App.jsx** và tạo đường dẫn đến trang

* dùng scss: tương tự css nhưng cho phép viết lồng nhau
* dùng jsx: như js

Muốn dùng icon: 
ví dụ
```javascript
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping, faUser, faBell, faCommentDots } from "@fortawesome/free-solid-svg-icons";
```