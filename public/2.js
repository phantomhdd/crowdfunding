(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CreatePassword.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/CreatePassword.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
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
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'createPassword',
  data: function data() {
    var _this = this;

    return {
      loader: null,
      loading: false,
      valid: true,
      showPassword: false,
      password: '',
      passwordRules: [function (v) {
        return !!v || 'Password is required';
      }, function (v) {
        return v && v.length >= 8 || 'Min 8 characters';
      }],
      passwordConfirmRules: [function (v) {
        return !!v || 'Password is required';
      }, function (v) {
        return v && v.length >= 8 || 'Min 8 characters';
      }, function (v) {
        return v === _this.password || 'Password don\'t match';
      }],
      showPasswordConfirm: false,
      passwordConfirm: ''
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])({
    current_user: 'auth/user'
  })), {}, {
    email: function email() {
      return this.current_user.user.email;
    }
  }),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])({
    setAlert: 'alert/set',
    setAuth: 'auth/set'
  })), {}, {
    submit: function submit() {
      var _this2 = this;

      this.loader = 'loading';

      if (this.$refs.form.validate()) {
        var formData = {
          'email': this.email,
          'password': this.password,
          'password_confirmation': this.passwordConfirm
        };
        axios.post('/api/auth/update-password', formData).then(function (response) {
          var data = response.data.data;

          _this2.setAlert({
            status: true,
            color: 'success',
            text: 'Account was Created!',
            icon: 'mdi-check-circle',
            locAlert: false
          });

          _this2.setAuth(data);

          _this2.login(_this2.email, _this2.password);

          _this2.password = '';
          _this2.passwordConfirm = '';

          _this2.$refs.form.reset();

          _this2.$refs.form.resetValidation();

          _this2.close();
        })["catch"](function (error) {
          var response = error.response;

          _this2.setAlert({
            status: true,
            color: 'error',
            text: response.data.error,
            icon: 'mdi-close-octagon',
            locAlert: false
          });
        });
      }
    },
    login: function login(email, pass) {
      var _this3 = this;

      var formData = {
        'email': email,
        'password': pass
      };
      axios.post('/api/auth/login', formData).then(function (response) {
        var data = response.data.data;

        _this3.setAuth(data);

        _this3.password = '';

        _this3.close();
      });
    },
    close: function close() {
      this.$emit('closed', false);
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CreatePassword.vue?vue&type=template&id=81ae893c&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/CreatePassword.vue?vue&type=template&id=81ae893c& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
          _c("v-icon", { attrs: { left: "" } }, [_vm._v("mdi-account-key")]),
          _vm._v(" "),
          _c("v-toolbar-title", [_vm._v("Create Password")])
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
                staticClass: "mb-2",
                attrs: {
                  rules: _vm.passwordRules,
                  label: "Password",
                  required: "",
                  "prepend-icon": "mdi-form-textbox-password",
                  "append-icon": _vm.showPassword ? "mdi-eye" : "mdi-eye-off",
                  type: _vm.showPassword ? "text" : "password",
                  hint: "At least 8 characters"
                },
                on: {
                  "click:append": function($event) {
                    _vm.showPassword = !_vm.showPassword
                  }
                },
                model: {
                  value: _vm.password,
                  callback: function($$v) {
                    _vm.password = $$v
                  },
                  expression: "password"
                }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                staticClass: "mb-2",
                attrs: {
                  rules: _vm.passwordConfirmRules,
                  label: "Password Confirmation",
                  required: "",
                  "prepend-icon": "mdi-form-textbox-password",
                  "append-icon": _vm.showPasswordConfirm
                    ? "mdi-eye"
                    : "mdi-eye-off",
                  type: _vm.showPasswordConfirm ? "text" : "password",
                  hint: "At least 8 characters"
                },
                on: {
                  "click:append": function($event) {
                    _vm.showPasswordConfirm = !_vm.showPasswordConfirm
                  }
                },
                model: {
                  value: _vm.passwordConfirm,
                  callback: function($$v) {
                    _vm.passwordConfirm = $$v
                  },
                  expression: "passwordConfirm"
                }
              }),
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
                        _vm._v("mdi-account-check")
                      ]),
                      _vm._v("\n                    Create\n                ")
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
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/CreatePassword.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/CreatePassword.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CreatePassword_vue_vue_type_template_id_81ae893c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreatePassword.vue?vue&type=template&id=81ae893c& */ "./resources/js/components/CreatePassword.vue?vue&type=template&id=81ae893c&");
/* harmony import */ var _CreatePassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreatePassword.vue?vue&type=script&lang=js& */ "./resources/js/components/CreatePassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CreatePassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CreatePassword_vue_vue_type_template_id_81ae893c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CreatePassword_vue_vue_type_template_id_81ae893c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/CreatePassword.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/CreatePassword.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/CreatePassword.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CreatePassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./CreatePassword.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CreatePassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CreatePassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/CreatePassword.vue?vue&type=template&id=81ae893c&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/CreatePassword.vue?vue&type=template&id=81ae893c& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreatePassword_vue_vue_type_template_id_81ae893c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./CreatePassword.vue?vue&type=template&id=81ae893c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CreatePassword.vue?vue&type=template&id=81ae893c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreatePassword_vue_vue_type_template_id_81ae893c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreatePassword_vue_vue_type_template_id_81ae893c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);