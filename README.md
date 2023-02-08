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
