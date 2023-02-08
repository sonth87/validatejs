/**
 * Validate tool
 * version: 0.0.3
 * author: Skyline
 * 
 *  validate by 
 * 
 * type : "string" | "number" | "phone" | "email" | "url" | "date" | "password" | "age"
 * min, max, length, match : [rule, error_message]
 * require : true | false
 * date format (nếu là string, nếu là objectdate thì bỏ qua)
 * 
 * Ex: 
 * 
 * Form fields : var field = { name: "sonth", email: "sonth@abc.abc", age: 20 };
 * 
 * Rule : 
 * var rule = { 
      name: name: {
        rule: {
          require: {
            value: true,
            message: "Trường không được để trống"
          },
          min: {
            value: 5,
          },
          max: {
            value: 15,
            message: "Tên quá dài (15)"
          },
        },
        type: "string",
        label: "Họ tên",
      },
      emal: {type: "email"},
      age: {
        type: "age",
        label: "Tuổi",
        rule: {
          min: { value: 16, type: "d", toDate: "", message: "Người được bảo hiểm phải trên 16 ngày tuổi" },
          max: { value: 60, type: "y", toDate: "", message: "Người được bảo hiểm không quá 60 tuổi" }
        }
      }
 * }
 * 
 */

/**
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
          type: "d", // Tính theo đơn vị:  d: ngày / m: tháng / y: năm   -default: y
          toDate: "", // Mốc ngày để tính tuổi (vd: ngày hiệu lực, ngày hiện tại) -default: ngày hiện tại
          message: "Người được bảo hiểm phải trên 16 ngày tuổi" // Thông báo lỗi -default: lấy theo message min, max của number
        },

string: validate theo chuỗi

number: validate theo số
 */

/**
Tính số tuổi

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
*/

/** 
REGEX.email           // regex cho email
REGEX.phone           // regex cho phone ( theo nhà mạng )
REGEX.url             // regex cho url
REGEX.date            // regex cho date ( format: dd-MM-YYYY | dd.MM.YYYY | dd/MM/YYYY )
REGEX.password        // regex cho password ( phải có chữ thường, chữ hoa, số và ký tự đặc biệt )
REGEX.ho_chieu        // regex cho số Hộ chiếu. (1 chữ cái đầu và 7 số)
REGEX.cccd            // regex cho số CCCD. (3 số đầu theo mã tỉnh thành)
REGEX.cmt             // regex cho số CMT. (C2-3 số đầu validate theo mã tỉnh thành)
REGEX.province_code   // regex cho mã tỉnh thành
*/
var REGEX = {
  email: /^[a-z][a-z0-9_.]{4,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/gi,
  phone: /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-9]|9[0-4|6-9])[0-9]{7}$/g,
  url: /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)/g,
  date: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/g,
  password:
    /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.\/?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{4,}/g,
  cccd: /^(0(?:0[12468]|1[0124579]|2[024-7]|3[013-8]|4[0245689]|5[12468]|6[024678]|7[024579]|8[0234679]|9[1-6])[0-9]{9})$/g,
  ho_chieu: /^([a-z][0-9]{7})$/gi,
  cmt: /^(?:0(?:[1-8][0-9]{7}|9[0125][0-9]{6})|1(?:[0-9][0-9]{7})|2(?:[0-79][0-9]{7}|(?:8[015]|3[01]|4[5])[0-9]{6})|3(?:[0-8][0-9]{7}))$/g,
  province_code:
    /^(?:0(?:[1-9]|9[0125])|1(?:[0-9])|2(?:[0-79]|8[015]|3[01]|4[5])|3(?:[0-8]))$/g,
  empty: /^\s*$/,
};

(function () {
  "use strict";

  var MESSAGE = {
    empty: "Không được để trống",
    string_min: "%{label} phải nhiều hơn %{num} ký tự",
    string_max: "%{label} phải ít hơn %{num} ký tự",
    number_min: "%{label} phải lớn hơn %{num}",
    number_max: "%{label} phải nhỏ hơn %{num}",
    wrong_format: "%{label} không đúng định dạng",
  };

  var TYPE = [
    "string",
    "number",
    "phone",
    "email",
    "url",
    "date",
    "password",
    "cccd_hc",
    "age",
  ];
  var PARAM = {
    message: "message",
    regex: "regex",
    value: "value",
    toDate: "toDate",
    type: "type",
  };

  var validate = function (formFields, rules) {
    return _.test(formFields, rules);
  };
  var _ = validate;

  _.extend = function (obj) {
    [].slice.call(arguments).forEach(function (source) {
      for (var attr in source) {
        obj[attr] = source[attr];
      }
    });
    return obj;
  };

  _.extend(validate, {
    exposeModule: function (validate, root) {
      root.validate = validate;
    },
  });

  _.extend(validate, {
    // validate all fields
    test: function (formFields, rules) {
      var testResult = { errors: false, fields: {} }; // Ket qua test

      // loop in rules
      for (var fieldname in rules) {
        // init fields list in error result
        testResult.fields[fieldname] = [];

        // Field value
        var value = _.getFieldValue(formFields, fieldname);

        // List rule of this field
        var rulesOfField = rules[fieldname].hasOwnProperty("rule")
          ? rules[fieldname]["rule"]
          : undefined;

        // Test with field has value != undefined
        if (typeof value !== "undefined") {
          // is Required?
          var isRequired = _.isRequired(rulesOfField); // this field required or not

          // Field type
          var type = _.getFieldType(rules[fieldname]);

          // Field label
          var label = _.getParams(rules[fieldname], "label");

          var fieldContent = {
            label: label,
            type: type,
          };

          var formatTest;

          if (type) {
            switch (type) {
              case "email":
                formatTest = _.isEmail(value, rulesOfField, fieldContent);
                break;
              case "phone":
                formatTest = _.isPhone(value, rulesOfField, fieldContent);
                break;
              case "password":
                formatTest = _.isPassword(value, rulesOfField, fieldContent);
                break;
              case "url":
                formatTest = _.isUrl(value, rulesOfField, fieldContent);
                break;
              case "date":
                formatTest = _.isDate(value, rulesOfField, fieldContent);
                break;
              case "cccd_hc":
                formatTest = _.isCCCDHC(value, rulesOfField, fieldContent);
              default:
                break;
            }
          }

          if (formatTest) {
            testResult.errors = true;
            testResult.fields[fieldname].push(formatTest);
          }

          if (rulesOfField) {
            Object.keys(rulesOfField).forEach(function (ruleName) {
              var ruleDetail = rulesOfField[ruleName];
              var result;

              switch (ruleName) {
                case "require":
                  result = _.validator.require(value, ruleDetail);
                  break;
                case "min":
                  result = _.validator.min(value, ruleDetail, fieldContent);
                  break;
                case "max":
                  result = _.validator.max(value, ruleDetail, fieldContent);
                  break;
                case "format":
                  result = _.validator.format(value, ruleDetail, fieldContent);
                  break;
                case "length":
                  result = _.validator.length(value, ruleDetail, fieldContent);
                  break;
                default:
                  break;
              }

              // is err if: all case with required, otherwise value not null
              if (result && (isRequired || (!isRequired && value.length > 0))) {
                testResult.errors = true;
                testResult.fields[fieldname].push(result);
              }
            });
          }
        }
      }

      return testResult;
    },

    // get value from field (gia tri nhap)
    getFieldValue: function (formFields, fieldname) {
      if (!_.isObject(formFields) || !_.isString(fieldname)) return undefined;

      if (formFields.hasOwnProperty(fieldname))
        return formFields[fieldname].trim(); // remove spaces
      return undefined;
    },

    // get field type (string, number, phone, email, ...)
    getFieldType: function (formFields) {
      if (!_.isObject(formFields)) return "string";

      if (
        formFields.hasOwnProperty("type") &&
        TYPE.includes(formFields["type"])
      )
        return formFields["type"];
      return "string";
    },

    // get params of fields or rules (fields["message" | "regex" | "value"])
    getParams: function (fields, param) {
      try {
        return fields.hasOwnProperty(param) ? fields[param] : undefined;
      } catch (e) {
        return undefined;
      }
    },

    // render error message
    renderMessage: function (message, additions) {
      if (!_.isString(message)) return message;

      // find %{name} in message to replace
      var mReg = /(%?)%\{([^\}]+)\}/g;
      return message.replace(mReg, function (m0, m1, m2) {
        if (m1 === "%") return "%{" + m2 + "}";
        else return String(additions[m2] || "");
      });
    },
  });

  // validate data with rule
  _.validator = {
    // required field (value isn't empty)
    require: function (value, rule) {
      if (_.isEmpty(value))
        return _.getParams(rule, PARAM.message) || MESSAGE.empty;
      return undefined;
    },

    /**
     *  value: value of field
     *  type: string | number
     */
    min: function (value, rule, field) {
      var length = _.getParams(rule, PARAM.value);
      if (!length || !_.isInteger(length) || length < 0) return undefined;

      var params = { num: length, label: _.getParams(field, "label") };

      if (field.type === "age") {
        if (!_.isAgeValid(value, rule, "min"))
          return _.renderMessage(
            _.getParams(rule, PARAM.message) || MESSAGE.number_min,
            params
          );
      } else if (field.type === "number") {
        if (!_.isNumber(value) || value < length)
          return _.renderMessage(
            _.getParams(rule, PARAM.message) || MESSAGE.number_min,
            params
          );
      } else if (field.type === "date") {
        // Date
      } else if (value && value.length < length)
        return _.renderMessage(
          _.getParams(rule, PARAM.message) || MESSAGE.string_min,
          params
        );

      return undefined;
    },

    /**
     *  value: value of field
     *  type: string | number | date
     */
    max: function (value, rule, field) {
      var length = _.getParams(rule, PARAM.value);
      if (!length || !_.isInteger(length) || length < 0) return undefined;

      var params = { num: length, label: _.getParams(field, "label") };

      if (field.type === "age") {
        if (!_.isAgeValid(value, rule, "max"))
          return _.renderMessage(
            _.getParams(rule, PARAM.message) || MESSAGE.number_min,
            params
          );
      } else if (field.type === "number") {
        if (!_.isNumber(value) || value > length)
          return _.renderMessage(
            _.getParams(rule, PARAM.message) || MESSAGE.number_max,
            params
          );
      } else if (field.type === "date") {
        // Date
      } else if (value && value.length > length)
        return _.renderMessage(
          _.getParams(rule, PARAM.message) || MESSAGE.string_max,
          params
        );
      return undefined;
    },

    length: function (value, rule, field) {
      var length = _.getParams(rule, PARAM.value);
      if (!length || !_.isInteger(length) || length < 0) return undefined;

      var params = { num: length, label: _.getParams(field, "label") };

      if (value && value.length !== length)
        return _.renderMessage(
          _.getParams(rule, PARAM.message) || MESSAGE.wrong_format,
          params
        );
    },

    /**
     *  value: value of field
     *  type: string | number
     */
    format: function (value, rule, field) {
      var regex =
        _.getParams(rule, PARAM.value) ||
        _.getParams(rule, PARAM.regex) ||
        undefined;
      if (!_.isString(value) || !regex) return undefined;

      var params = { label: _.getParams(field, "label") };

      var reg = new RegExp(regex);
      if (value && !reg.test(value))
        return _.renderMessage(
          _.getParams(rule, PARAM.message) || MESSAGE.wrong_format,
          params
        );

      return undefined;
    },
  };

  // Validate By Type
  _.extend(validate, {
    isEmail: function (value, rule, field) {
      var _rule = Object.assign(rule || {}, { regex: REGEX.email });
      return _.validator.format(value, _rule, field);
    },

    isPhone: function (value, rule, field) {
      var _rule = Object.assign(rule || {}, { regex: REGEX.phone });
      return _.validator.format(value, _rule, field);
    },

    isUrl: function (value, rule, field) {
      var _rule = Object.assign(rule || {}, { regex: REGEX.url });
      return _.validator.format(value, _rule, field);
    },

    isDate: function (value, rule, field) {
      var _rule = Object.assign(rule || {}, { regex: REGEX.date });
      return _.validator.format(value, _rule, field);
    },

    isPassword: function (value, rule, field) {
      var _rule = Object.assign(rule || {}, { regex: REGEX.password });
      return _.validator.format(value, _rule, field);
    },

    isCCCDHC: function (value, rule, field) {
      // test CMT
      var isError = _.validator.format(
        value,
        Object.assign(rule || {}, { regex: REGEX.cmt }),
        field
      );

      // test CCCD
      if (isError && isError.length)
        isError = _.validator.format(
          value,
          Object.assign(rule || {}, { regex: REGEX.cccd }),
          field
        );

      // test ho chieu
      if (isError && isError.length)
        isError = _.validator.format(
          value,
          Object.assign(rule || {}, { regex: REGEX.ho_chieu }),
          field
        );

      // test 10-11 ký tự ko yêu cầu định dạng
      var regexp = /^[0-9a-z]{10,11}$/gi;
      if (isError && isError.length)
        isError = _.validator.format(
          value,
          Object.assign(rule || {}, { regex: regexp }),
          field
        );

      return isError;
    },

    /**
     * Tính tuổi hợp lệ
     * value: input value
     * type: "min" | "max"
     */
    isAgeValid: function (value, rule, type) {
      // Get target date to check age
      const dayCompare = _.getParams(rule, PARAM.toDate);

      // Expected age
      const expect_age = _.getParams(rule, PARAM.value);

      // get type (d: day, m: month, y: year)
      const checkType = _.getParams(rule, PARAM.type);
      var actual_age = _.getAgeByDob(value, dayCompare, checkType);

      if (actual_age >= 0) {
        if (type === "min") return expect_age <= actual_age;
        else if (type === "max") return expect_age >= actual_age;
      }

      return false;
    },
  });

  // Check object is a valid type
  _.extend(validate, {
    isRequired: function (rule) {
      return rule && typeof rule["require"] !== "undefined"
        ? _.getParams(rule["require"], "value") || false
        : false;
    },

    isObject: function (obj) {
      return obj === Object(obj);
    },

    isString: function (value) {
      return typeof value === "string";
    },

    isNumber: function (value) {
      return (
        typeof value === "number" ||
        (!isNaN(value) && !isNaN(parseFloat(value)))
      );
    },

    isInteger: function (value) {
      return _.isNumber(value) && value % 1 === 0;
    },

    isFunction: function (value) {
      return typeof value === "function";
    },

    isBoolean: function (value) {
      return typeof value === "boolean";
    },

    isDateTime: function (value) {
      var reg = new RegExp(REGEX.date);
      return value instanceof Date || reg.test(value);
    },

    isEmpty: function (value) {
      var attr;

      // If NULL | Undefined
      if (value === null || value === undefined) return true;

      // If not a function
      if (this.isFunction(value)) return false;

      // string with space only
      if (this.isString(value)) return REGEX.empty.test(value);

      // array without length
      if (this.isArray(value)) return value.length === 0;

      // Dates have no attributes but aren't empty
      if (this.isDateTime(value)) return false;

      return false;
    },
  });

  /**
   * Lấy số tuổi theo ngày sinh và ngày hiệu lực theo ngày, tháng, năm
   * @param {string} day string: date Ngày sinh
   * @param {string} dayCompare string: date Ngày hiệu lực ( default = today )
   * @param {'d' | 'm' | 'y'} checkType string: d, m, y
   * @returns number of d|m|y
   */
  _.getAgeByDob = function (day, dayCompare, checkType) {
    var reg = new RegExp(REGEX.date);
    if (!day || !reg.test(day)) return null;

    checkType = checkType ? checkType : "y";

    var today = new Date();
    var datearray = day.split("/");
    var newdate = datearray[1] + "/" + datearray[0] + "/" + datearray[2];
    var newDayCompare = dayCompare ? dayCompare.split("/") : null;
    var dob = new Date(newdate);
    var ngayCheck = dayCompare
      ? new Date(
          newDayCompare[1] + "/" + newDayCompare[0] + "/" + newDayCompare[2]
        )
      : today;

    if (checkType.toLowerCase() == "d") {
      var result = Math.floor((ngayCheck - dob) / (24 * 60 * 60 * 1000));
      return isNaN(result) ? null : result;
    }
    if (checkType.toLowerCase() == "m") {
      var months;
      months = (ngayCheck.getFullYear() - dob.getFullYear()) * 12;
      months -= dob.getMonth();
      months += ngayCheck.getMonth();
      return isNaN(months) ? null : months;
    }
    if (checkType.toLowerCase() == "y") {
      var result = Math.floor(
        (ngayCheck - dob) / (365.25 * 24 * 60 * 60 * 1000)
      );
      return isNaN(result) ? null : result;
    }

    return 0;
  };

  var DEFAULT_CONFIG = {
    phone: {
      type: "phone",
      label: "Số điện thoại",
      rule: { require: { value: true } },
    },
    cccd_hc: {
      type: "cccd_hc",
      label: "Số CMT/CCCD/HC",
      rule: { require: { value: true } },
    },
    email: {
      type: "email",
      label: "Email",
      rule: {
        format: { message: "Email không đúng định dạng" },
      },
    },
    password: {
      type: "password",
      label: "Mật khẩu",
      rule: {
        min: { value: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
      },
    },
  };
  /**
   * 1 cách khác để khai báo validate, 
   * sử dụng DEFAULT_CONFIG (nếu có thể - khi truyền đúng tên field)
   * 
   * 
   * var fields_temp = [
      { field: "phone", value: "0987654321" },
      { field: "password", value: "123" },
      {
        field: "custom-password",
        value: "123",
        config: {
          type: "password",
          rule: {
            require: true,
            min: { value: 8, message: "Mật khẩu quá ngắn" },
            max: { value: 12, message: "Mật khẩu không nhiều hơn 12 ký tự" },
          },
        },
      },
    ];
   * @param {*} fields // fields_temp
   */
  _.form = function (fields) {
    // return nếu ko có giá trị
    if (!fields || fields.length === 0) return;

    var config = {};
    var form_field = {};

    fields.map((item) => {
      var field_name = item.field;
      var field_value = item.value;
      var field_config = item.config;

      if (!field_name || !field_value) return;

      // check field có default config
      if (typeof DEFAULT_CONFIG[field_name] !== "undefined") {
        field_config = field_config || DEFAULT_CONFIG[field_name];
      }

      if (field_config) {
        config[field_name] = field_config;
        form_field[field_name] = field_value;
      }
    });

    if (Object.keys(config).length > 0 && Object.keys(form_field).length > 0) {
      return validate(form_field, config);
    }
    return;
  };

  validate.exposeModule(validate, this);
}.call(this));


/**
/////////// Cách 1 ///////////
fields = [
  { field: "phone", value: "0987654321" },
  { field: "password", value: "123" },
  {
    field: "custom-password",
    value: "123",
    config: {
      type: "password",
      rule: {
        require: true,
        min: { value: 8, message: "Mật khẩu quá ngắn" },
        max: { value: 12, message: "Mật khẩu không nhiều hơn 12 ký tự" },
      },
    },
  },
];
// default field đã có sẽ tự map và có config mặc định
// phone, email, cccd_hc, password
validate.form(fields);

/////////// Cách 2 ///////////
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
 */