(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Otp.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Otp.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var intervalTimer;
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'otp',
  data: function data() {
    return {
      selectedTime: 0,
      timeLeft: '00:00',
      endTime: '0',
      times: 300,
      loader: null,
      loading: false,
      valid: true,
      otpcode: '',
      otpcodeRules: [function (v) {
        return !!v || 'Code is required';
      }, function (v) {
        return /^[1-9]\d*$|^$/.test(v) || 'Number only';
      }, function (v) {
        return v && v.length >= 6 || 'Min 6 digits';
      }]
    };
  },
  created: function created() {
    this.setTime(this.times);
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])({
    current_user: 'auth/user'
  })), {}, {
    email: function email() {
      return this.current_user.user.email;
    }
  }),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])({
    setDialogComponent: 'dialog/setComponent',
    setAlert: 'alert/set',
    setAuth: 'auth/set'
  })), {}, {
    regenerateOtp: function regenerateOtp() {
      var _this = this;

      this.setTime(this.times);
      var formData = {
        email: this.email
      };
      axios.post("/api/auth/regenerate-otp", formData).then(function (response) {
        var data = response.data;
        _this.otpcode = '';

        _this.$refs.form.reset();

        _this.$refs.form.resetValidation();

        if (data.response_code == '01') {
          _this.setAlert({
            status: true,
            color: 'error',
            text: data.response_message,
            icon: 'mdi-close-octagon',
            locAlert: false
          });
        } else {
          _this.setAlert({
            status: true,
            color: 'warning',
            text: 'Check your E-mail!',
            icon: 'mdi-alert-circle',
            locAlert: false
          });
        }
      })["catch"](function (error) {
        console.log(error);
      });
    },
    setTime: function setTime(seconds) {
      clearInterval(intervalTimer);
      this.timer(seconds);
    },
    timer: function timer(seconds) {
      var now = Date.now();
      var end = now + seconds * 1000;
      this.displayTimeLeft(seconds);
      this.selectedTime = seconds;
      this.countdown(end);
    },
    countdown: function countdown(end) {
      var _this2 = this;

      intervalTimer = setInterval(function () {
        var secondsLeft = Math.round((end - Date.now()) / 1000);

        if (secondsLeft === 0) {
          _this2.endTime = 0;
        }

        if (secondsLeft < 0) {
          clearInterval(intervalTimer);
          return;
        }

        _this2.displayTimeLeft(secondsLeft);
      }, 1000);
    },
    displayTimeLeft: function displayTimeLeft(secondsLeft) {
      var minutes = Math.floor(secondsLeft % 3600 / 60);
      var seconds = secondsLeft % 60;
      this.timeLeft = "".concat(this.zeroPadded(minutes), ":").concat(this.zeroPadded(seconds));
    },
    zeroPadded: function zeroPadded(num) {
      return num < 10 ? "0".concat(num) : num;
    },
    submit: function submit() {
      var _this3 = this;

      this.loader = 'loading';

      if (this.$refs.form.validate()) {
        var formData = {
          'otp_code': this.otpcode
        };
        axios.post('/api/auth/verification', formData).then(function (response) {
          var data = response.data;

          if (data.response_code == '01') {
            _this3.setAlert({
              status: true,
              color: 'error',
              text: data.response_message,
              icon: 'mdi-close-octagon',
              locAlert: false
            });
          } else {
            _this3.setAlert({
              status: true,
              color: 'success',
              text: 'Account was Verified!',
              icon: 'mdi-check-circle',
              locAlert: false
            });

            _this3.setAuth(data.data);

            _this3.otpcode = '';

            _this3.$refs.form.reset();

            _this3.$refs.form.resetValidation();

            _this3.setDialogComponent('createPassword');
          }
        })["catch"](function (error) {
          var response = error.response;

          _this3.setAlert({
            status: true,
            color: 'error',
            text: response.data.error,
            icon: 'mdi-close-octagon',
            locAlert: false
          });
        });
      }
    }
  }),
  watch: {
    loader: function loader() {
      var _this4 = this;

      var l = this.loader;
      this[l] = !this[l];
      setTimeout(function () {
        return _this4[l] = false;
      }, 4000);
      this.loader = null;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Otp.vue?vue&type=template&id=5c5a8ce0&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Otp.vue?vue&type=template&id=5c5a8ce0& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    [
      _c(
        "v-toolbar",
        { attrs: { dark: "", color: "teal darken-2" } },
        [
          _c("v-icon", { attrs: { left: "" } }, [_vm._v("mdi-shield-key")]),
          _vm._v(" "),
          _c("v-toolbar-title", [_vm._v("OTP Code")])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-container",
        { attrs: { fluid: "" } },
        [
          _c(
            "v-form",
            {
              ref: "form",
              attrs: { "lazy-validation": "" },
              model: {
                value: _vm.valid,
                callback: function($$v) {
                  _vm.valid = $$v
                },
                expression: "valid"
              }
            },
            [
              _c("v-text-field", {
                attrs: {
                  label: "OTP Code",
                  rules: _vm.otpcodeRules,
                  required: "",
                  autofocus: "",
                  "prepend-icon": "mdi-key",
                  hint: "At least 6 digits",
                  maxlength: "6"
                },
                model: {
                  value: _vm.otpcode,
                  callback: function($$v) {
                    _vm.otpcode = $$v
                  },
                  expression: "otpcode"
                }
              }),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "text-xs-center d-flex justify-center" },
                [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.timeLeft) +
                      "\n            "
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "text-xs-center d-flex justify-center my-2" },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        color: "teal darken-1",
                        disabled: !_vm.valid,
                        loading: _vm.loading,
                        dark: _vm.valid
                      },
                      on: { click: _vm.submit }
                    },
                    [
                      _c("v-icon", { attrs: { left: "" } }, [
                        _vm._v("mdi-send")
                      ]),
                      _vm._v("\n                    Send Otp\n                ")
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "d-flex flex-row align-center px-5" },
                [_c("v-divider")],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "text-xs-center d-flex justify-center" },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "caption",
                      attrs: { text: "" },
                      on: { click: _vm.regenerateOtp }
                    },
                    [_vm._v("Re-generate OTP Code")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Otp.vue":
/*!*****************************************!*\
  !*** ./resources/js/components/Otp.vue ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Otp_vue_vue_type_template_id_5c5a8ce0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Otp.vue?vue&type=template&id=5c5a8ce0& */ "./resources/js/components/Otp.vue?vue&type=template&id=5c5a8ce0&");
/* harmony import */ var _Otp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Otp.vue?vue&type=script&lang=js& */ "./resources/js/components/Otp.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Otp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Otp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Otp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Otp_vue_vue_type_template_id_5c5a8ce0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Otp_vue_vue_type_template_id_5c5a8ce0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Otp.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Otp.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/components/Otp.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Otp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Otp.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Otp.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Otp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Otp.vue?vue&type=template&id=5c5a8ce0&":
/*!************************************************************************!*\
  !*** ./resources/js/components/Otp.vue?vue&type=template&id=5c5a8ce0& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Otp_vue_vue_type_template_id_5c5a8ce0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Otp.vue?vue&type=template&id=5c5a8ce0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Otp.vue?vue&type=template&id=5c5a8ce0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Otp_vue_vue_type_template_id_5c5a8ce0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Otp_vue_vue_type_template_id_5c5a8ce0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);