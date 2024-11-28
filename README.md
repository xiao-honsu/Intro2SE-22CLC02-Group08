# Intro2SE-22CLC02-Group08
# cách chạy
dùng cmd
* chạy backend: cd đến server: nodemon index
* chạy frontend: cd đến frontend: npm run dev

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





=============================================
# Backend
### 1. models và mockData
models là schema của csdl

ví dụ: UserModel đại diện cho bảng User trong mongodb

vì chưa liên kết csdl nên dùng dữ liệu giả lập (thư mục mockData)

các hàm findOne, findOne, create, ... sau này khi liên kết mongodb sẽ có bởi module mongoose, dùng tạm trước sau này xóa

### 2. controllers
nơi xử lý logic chính trên các model (hiển thị, thêm, xóa, sửa, ...)

ví dụ **authController** xử lý logic cho việc xác thực (login, signup, ...)

```js
const UserModel = require('../models/UserModel'); // kết nối đến models nè
const path = require('path');
const fs = require('fs');

// dữ liệu giả lập về admin
const adminDataPath = path.join(__dirname, '../mockData/admin.json');
const getAdminData = () => {
  const data = fs.readFileSync(adminDataPath, 'utf8');
  return JSON.parse(data);
};

// Controller logic, gồm 1 hoặc nhiều hàm riêng
const authController = {
    // hàm controller về login
    // kiểu ghi này tương đương với void login(req, res) {} như bên c++, req là request, res là response
    login: (req, res) => {
        const { email, password } = req.body; // req.body là cái mình nhập vô (email và pw)

        try {
            const admins = getAdminData(); // lấy danh sách admin
            const admin = admins.find(
                (admin) => admin.Email === email && admin.Password === password
            ); // tìm xem acc vừa nhập có phải admin k
            if (admin) 
                return res.status(200).json({ success: true, userType: "admin", Username: admin.Username });
            
            // tương tự User, user k cần lấy danh sách vì UserModel có sẵn rồi, sau này cx dùng hàm của mongoose (khi đã có db)
            const user = UserModel.findOne({
                where: { Email: email, Password: password }, 
            });
            if (user) 
                return res.status(200).json({ success: true, userType: user.Roles, Username: user.Username });
      
            return res.status(401).json({ success: false, message: "Invalid email or password" }); // k có thì trả về này
        } catch (error) {
            console.error("Error during login: ", error);
            return res.status(500).json({ success: false, message: "An error occurred while processing the login" });
        }
    },

    // tương tự thì sẽ có signup, rồi choose role, reset mk, ... blabla
    signup: (req, res) => {
        
    },
};

module.exports = authController;

```
### 3. middleware
trước khi đến controller thì sẽ đến middleware, tùy vào cái mình cần, ví dụ như login thì cần middleware nè, để check xem có thiếu trường nhập liệu hay gì k
```js
// dùng để kiểm tra xem các trường nhập liệu có trường nào bị thiếu không
const validateRequest = (requiredFields) => {  // requiredFields là mình truyền vào lúc gọi, gồm các trường mà tại sự kiện đó phải nhập
    return (req, res, next) => {  
        const missingFields = requiredFields.filter((field) => {   
            return !req.body[field] || req.body[field].trim() === '';  // cái req.body lúc trên có nêu rồi, đó là cái thực tế mình nhập
        });
  
        if (missingFields.length > 0) {  // check xem có thiếu trường nhập liệu nào k
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(", ")}`,
            });
        }
  
        next(); // next là để gọi tới bước tiếp theo
    };
};

module.exports = validateRequest;
```

### routes
định nghĩa các đường dẫn endpoint, nghĩa là sau này các sự kiện từ frontend (client) sẽ gọi tới các routes này để xử lý logic
ví dụ: **authRoute.js** các đường dẫn xử lý việc xác thực (login, signup, ...)
```jsx
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");  // import chỗ xử lý logic của cái route này
const validateRequest = require("../middleware/validateRequest");  // nếu cần thì import xử lý middleware

// tạo cái route xử lý đăng nhập, với endpoint là /login, để cái middleware trước controller nè, để xử lý mấy cái bé bé trước khi đến xử lý chính
router.post("/login", validateRequest(["email", "password"]), authController.login); 

module.exports = router;

```

### file index.js của backend
file chính của server
```js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoute");  // import cái cái route mình định nghĩa bên thư mục routes vào

dotenv.config();
const app = express(); // tạo cái app chính của mình

app.use(cors({   // này để frontend ở port khác so với backend nhưng vẫn request đến backend đc
    origin: "http://localhost:5174",    // mình cho luôn cái port của frontend ở đây luôn, sau deploy thì sửa sau
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json()); // Parse JSON request body


app.use("/auth", authRoutes);   // dùng cái authRoute ở đây, nêu thêm cái "/auth" ở phía trước cho rõ
// nghĩa là để xác thực này kia, ví dụ login, thì gọi đến localhost:3000/auth/login  (cái /login là mình để bên authRoute rồi đó)


const PORT = process.env.PORT || 3000;  // file .env sẽ cho nó port hoặc url nào đó, nhma để chắc chắn thì thêm cái || 3000
app.listen(PORT, () => {
  console.log(`Backend is running at http://localhost:${PORT}`);
});

```




## ví dụ về luồng xử lý Login

## xử lý frontend

### người dùng tới: http://localhost:5174/login
* 5174: port cho frontend mà mình quy định
* /login: route của trang login mình quy định trong frontend/src/app.jsx

trong LoginPage thuộc file frontend/src/pages/Login.jsx
khai báo:
```jsx
    const [email, setEmail] = useState("");  //line 15
    const [password, setPassword] = useState("");  // line 16
```
email là biến giữ giá trị email người dùng nhập, passwork là biến giữ giá trị passwork người dùng nhập
setEmail, setPasswork để thay đổi giá trị

### trên giao diện login, người dùng nhập email và passwork
```jsx
    <Form.Group controlId="formEmail" className="mb-3">
        <Form.Control type="email" placeholder="Your email" className="login-input" value={email}  
            onChange={e => setEmail(e.target.value)} />
    </Form.Group>   

    <Form.Group controlId="formPassword" className="mb-3">
        <Form.Control type="password" placeholder="Your password" className="login-input" value={password} 
            onChange={e => setPassword(e.target.value)} />
    </Form.Group> 
```
cái chỗ **value={email}** và **value={password}** là lưu giá trị 

rồi nếu có sự kiện xảy ra (sự kiện mình nhập liệu)
gọi đến hàm onChange để đặt lại email và pw mình vừa nhập (chữ e là viết tắt cho event):
* onChange={e => setEmail(e.target.value)}
* onChange={e => setPassword(e.target.value)}


### Khi mình nhấn nút:
```jsx
    <Button variant="warning" className="login-button" onClick={handleLogin}>Login</Button>
```
nút có hàm onClick={handleLogin}, là khi mình nhấn nó, nó gọi đến hàm handleLogin.

### từ frontend đến backend
trước đó, mình có folder services (thuộc frontend) để gửi api đến backend

file auth.js thuộc folder services sẽ quản lý api liên quan đến xác thực (login, signup, ...)

```jsx
    // đây là frontend/src/services/auth.js
    const BASE_URL = "http://localhost:3000/auth";

    const authAPI = {
        login: async (data) => {
            try {
                const response = await fetch(`${BASE_URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                return await response.json();
            } catch (error) {
            console.error("Error during login:", error);
            return { success: false, message: "An error occurred" };
        }
    },

    signup: async (data) => {
  
    },
};
export default authAPI;
  
```


```jsx
    const handleLogin = async () => {
        setLoading(true);
        setError("");
        setMessage("Sending email and password...");

        const loginData = { email, password };  // cái này là user nhập vào đó

        try {
            // gửi cái response này đến hàm login thuộc authApi đã làm bên services nè
            const res = await authAPI.login(loginData);

            if (res.success) {
                setMessage(`Logged in as ${res.userType}`); // Thông báo thành công
                setUserType(res.userType);

                // Điều hướng dựa trên userType
                if (res.userType === "admin") navigate("/");
                else if (res.userType === "user") navigate("/ChooseRole");
            } else {
                setError(res.message || "Invalid email or password!");
                setMessage(""); // Xóa thông báo thành công nếu có lỗi
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            setMessage(""); // Xóa thông báo thành công nếu xảy ra lỗi
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
```

### phía backend
trong services (frontend) nó fetch cái này "http://localhost:3000/auth/login"
lúc này nó gọi đến route /auth/login nè
rồi trong route này nó xử lý middleware, rồi đến controller, sau đó nó gửi response về lại handleLogin (ở trong file Login ở frontend) rồi nó tiếp tục ....
