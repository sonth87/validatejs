# Cách sử dụng

demo: https://validatejs.vercel.app/

## Cách 1

```
fields = [
  { field: "phone", value: "0987654321" },
  { field: "email", value: "abc" },
  {
    field: "password",
    value: "123",
    config: {
      type: "password",
      rule: {
        require: true,
        min: { value: 8, message: "Mật khẩu quá ngắn" },
        max: { value: 12, message: "Mật khẩu không nhiều hơn 12 ký tự" },
      },
    },
  }, // custom
];
// default field đã có sẽ tự map và có config mặc định
// phone, email, cccd_hc, password
validate.form(fields);
```

[📚 xem mô tả chi tiết](#configuration)

[Response có dạng như sau](#response)

## Cách 2

```
fields_value = {name: "test", phone: "0987654321", email: "abc@abc.abc"};
config = {
  name: {
    label: "Họ và tên",
    type: "string",
    rule: {
      require: { value: true, message: "Tên không được để trống" }
      min: { value: 4, message: "Tên không được ít hơn 4 ký tự" }
      min: { value: 20 }
    }
  },
  phone: {
    type: "phone",
    rule: {
      require: { value: true }
    }
  },
  email: {
    type: "email",
    rule: {
      min: { value: 8 }
    }
  }
}
validate(fields_value, config);
```

[📚 xem mô tả chi tiết](#configuration)

[Response có dạng như sau](#response)

## Cách 3

### Regex

```
Sử dụng trực tiếp Regex bằng cách gọi
REGEX.email           // regex cho email
REGEX.phone           // regex cho phone ( theo nhà mạng )
REGEX.url             // regex cho url
REGEX.date            // regex cho date ( format: dd-MM-YYYY | dd.MM.YYYY | dd/MM/YYYY )
REGEX.password        // regex cho password ( phải có chữ thường, chữ hoa, số và ký tự đặc biệt )
REGEX.ho_chieu        // regex cho số Hộ chiếu. (1 chữ cái đầu và 7 số)
REGEX.cccd            // regex cho số CCCD. (3 số đầu theo mã tỉnh thành)
REGEX.cmt             // regex cho số CMT. (C2-3 số đầu validate theo mã tỉnh thành)
REGEX.province_code   // regex cho mã tỉnh thành
```

vd:<br />
```
var reg = new RegExp(REGEX.email);
reg.test("my.email@email.vn");
```

### Function

```
// Tính tuổi theo ngày sinh, ngày lựa chọn (default today), kiểu (d: ngày, m: tháng, y: năm - default)
validate.getAgeByDob(inputDate, compareDate, type);

    + inputDate: ngày tháng năm sinh
    + compareDate: ngày hiệu lưc, ngày hiện tại, ... mặc định là ngày hiện tại
    + type: "d" | "m" | "y" lấy số tuổi theo ngày | tháng | năm. Mặc định: "y"

  vd: Tính số ngày tuổi của người có ngày sinh 20/12/2022 so với thời điểm 29/12/2022
        validate.getAgeByDob("20/12/2022", "29/12/2022", "d");
        // Kết quả: 9

      Tính số năm tuổi của người có ngày sinh 28/09/1987 so với ngày hiện tại
        validate.getAgeByDob("28/09/1987");
        // Kết quả: 35
```

### ⚙️ Configuration

Để gọi hàm validate có 2 cách gọi

[Cách 1 (như trên)](#cách-1)

```
validate.form(fields);

// Trong đó, fields là các trường cần được validate + value của nó
// Với các trường đã có default config thì chỉ cần truyền tên và giá trị
// vd: { field: "phone", value: "0987654321" }
// Hoặc có thể thêm config để ghi đè config mặc định, hoặc thêm trường mới
// vd: { field: "phone", value: "0987654321", config: { rule: { require: { value: false } } } }
// Các trường mặc định có tên : phone, cccd_hc, email, password
```

[Cách 2 (như trên)](#cách-2)

```
validate(fields_value, config);

// Trong đó
// fields_value: Giá trị của các trường trong form
// vd: { phone: phone_input_value, email: email_input_value, address: address_input_value }
// config: Cấu hình các quy tắc validate cho các trường
```

Cấu trúc của config rule sẽ có dạng

```
config = {
  name: {
    label: "Họ và tên",
    type: "string",
    rule: {
      require: { value: true, message: "Tên không được để trống" }
      min: { value: 4, message: "Tên không được ít hơn 4 ký tự" }
      min: { value: 20 }
    }
  },
};


type: Các kiểu dữ liệu
  email: validate theo email
    + default regex: REGEX.email
    + default message: "%{label} không đúng định dạng" // label của trường

  phone: validate theo số điện thoại (theo nhà mạng)
    + default regex: REGEX.phone
    + default message: "%{label} không đúng định dạng" // label của trường

  date: validate ngày tháng năm
    + default regex: REGEX.date // format : dd-MM-YYYY | dd.MM.YYYY | dd/MM/YYYY
    + default message: "%{label} không đúng định dạng" // label của trường

  url: validate theo url
    + default regex: REGEX.url // format : (http(s)://)(www.)myvbi.vn/
    + default message: "%{label} không đúng định dạng" // label của trường

  age: validate theo tuổi. Giá trị truyền yêu cầu :
    + min: số tuổi nhỏ nhất cho phép
    + max: số tuổi lớn nhất cho phép
    {
      value: 16, // Giá trị tuổi
      type: "d", // Tính theo đơn vị:  d: ngày / m: tháng / y: năm	 -default: y
      toDate: "", // Mốc ngày để tính tuổi (vd: ngày hiệu lực, ngày hiện tại) -default: ngày hiện tại
      message: "Người được bảo hiểm phải trên 16 ngày tuổi" // Thông báo lỗi -default: lấy theo message min, max của number
    },

  string: validate theo chuỗi

  number: validate theo số


rule: Quy tắc validate
  require: Bắt buộc nhập hay không
    + default message: "Không được để trống"

  min: quy định giá trị nhỏ nhất với number, hay ngắn nhất với string
    + default message (string): "%{label} phải nhiều hơn %{num} ký tự"
          // label của trường, num là giá trị truyền vào (min)
    + default message (number): "%{label} phải lớn hơn %{num}"
          // label của trường, num là giá trị truyền vào (min)

  max: quy định giá trị lớn nhất với number, hay dài nhất với string
    + default message (string): "%{label} phải ít hơn %{num} ký tự"
          // label của trường, num là giá trị truyền vào (max)
    + default message (number): "%{label} phải nhỏ hơn %{num}"
          // label của trường, num là giá trị truyền vào (max)

  length: độ dài cố định với cả string và number,

  format: custom validate theo regex, truyền vào value là 1 regex
    + default message: "%{label} không đúng định dạng"
          // label của trường

```

✨✨ Lưu ý, các trường không có config sẽ bỏ quả khi validate

### Response

```
{
  errors: true,
  fields: {
     name: ["[field_label] không được để trống"], // field_label: là label của trường đó trong config
     phone: ["Số điện thoại không đúng định dạng"],
     cccd_hc: ["Số CMT/CCCD/HC không đúng định dạng"]
  }
}
```

✨✨ Lưu ý: Các thông báo mặc định sẽ lấy theo label của từng trường
<br />
vd:

```
config = {
  name: {
    label: "Họ và tên",
    type: "string",
    rule: {
      require: { value: true }
    }
  },
};

// error Message
Có label: "Họ và tên không được để trống"
Không có label: "không được để trống"
```

✨✨ Có thể custom thông báo lỗi cho từng rule
<br />
vd:

```
config = {
  name: {
    type: "string",
    rule: {
      require: {
        value: true,
        message: "Thiếu tên rồi, alo alo"
      }  --> custom message
      min: { value: 1, message: "Tên gì mà ngắn thế" }  --> custom message
      max: { value: 30 } --> default message: phải ít hơn %num% ký tự
    }
  },
};
```
