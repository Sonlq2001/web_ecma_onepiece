import { $ } from './../utils.js';
// let selectorRules = {};
// const Validator = (options) => {

//     const getParent = (element, selector) => {
//         while(element.parentElement){
//             if(element.parentElement.matches(selector)){
//                 return element.parentElement;
//             }
//             element = element.parentElement;
//         }
//     }


//     // thực hiện validate
//     const checkValue = (inputElement, rule) => {
//         let spanError = getParent(inputElement, options.fieldGroup).querySelector(options.error);
//         let errorMessage;
//         const rules = selectorRules[rule.selector];
//         const lengthRules = rules.length;
//         for(let i = 0; i < lengthRules; i++){
//             errorMessage = rules[i](inputElement.value);
//             if(errorMessage) break;
//         }

//         if(errorMessage) {
//             spanError.innerText = errorMessage;
//             inputElement.classList.add('bgr');
//         }else{
//             spanError.innerText = '';
//             inputElement.classList.remove('bgr');
//         }
//         return !errorMessage;
//     }

//     // lấy các thành phần trong form
//     const formElement = $(options.form);
//     if(formElement){
//         // khi submit form
//         formElement.addEventListener('submit', e => {
//             e.preventDefault();
//             // flag check
//             let isFormValid = true;

//             options.rules.forEach(rule => {
//                 let inputElement = formElement.querySelector(rule.selector);
//                 const isValid = checkValue(inputElement, rule);
//                 if(!isValid){
//                     isFormValid = false;
//                 }
//             });

//             if(isFormValid){
//                 if(typeof options.onSubmit === 'function'){
//                     const enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
//                     const formValues = Array.from(enableInputs).reduce((values, input) => {
//                         return (values[input.name] = input.value) && values;
//                     }, {});
//                     // console.log(formValues);
//                 }
//             }
//         })

//         // lắng nghe sự kiện blur, input...
//         options.rules.forEach(rule => {
//             let inputElement = formElement.querySelector(rule.selector);
            
//             // lấy tất cả các rule
//             if(Array.isArray(selectorRules[rule.selector])) {
//                 selectorRules[rule.selector].push(rule.test);
//             } else {
//                 selectorRules[rule.selector] = [rule.test]
//             }

//             if(inputElement) {
//                 // khi blur
//                 inputElement.addEventListener('blur', () => {
//                     checkValue(inputElement, rule);                    
//                 })

//                 // khi bắt đầu nhập
//                 inputElement.addEventListener('input', () => {
//                     let spanError = getParent(inputElement, options.fieldGroup).querySelector(options.error);
//                     spanError.innerText = '';
//                     inputElement.classList.remove('bgr');
//                 })
//             }


//         });
//     }
// }

// Validator.isRequired = (selector, message) => {
//     return {
//         selector: selector,
//         test (value) {
//             return value.trim() ? undefined : message || 'Vui lòng nhập trường này !';
//         }
//     };
// }

// Validator.minLength = (selector, min) => {
//     return {
//         selector: selector,
//         test (value) {
//             return value.length > min ? undefined : 'Độ dài tối thiểu là 6 kí tự !';
//         }
//     };
// }

// export default Validator;
// Đối tượng `Validator`
function Validator(options) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        
        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }
        
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    let formValues = Array.from(enableInputs).reduce(function (values, input) {
                        
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files[0];
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        }

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
               // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                } 
            });
        });
    }

}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  message || 'Vui lòng nhập trường này'
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :  message || 'Trường này phải là email';
        }
    };
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined :  message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}

export default Validator;