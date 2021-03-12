(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Login.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Login.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
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
  name: 'login',
  data: function data() {
    return {
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      valid: true,
      email: '',
      emailRules: [function (v) {
        return !!v || 'E-mail is required';
      }, function (v) {
        return /.+@.+\..+/.test(v) || 'E-mail must be valid';
      }],
      showPassword: false,
      password: '',
      passwordRules: [function (v) {
        return !!v || 'Password is required';
      }, function (v) {
        return v && v.length >= 8 || 'Min 8 characters';
      }]
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])({
    current_user: 'auth/user'
  })),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])({
    setAlert: 'alert/set',
    setAuth: 'auth/set'
  })), {}, {
    submit: function submit() {
      var _this = this;

      this.loader = 'loading';

      if (this.$refs.form.validate()) {
        var formData = {
          'email': this.email,
          'password': this.password
        };
        axios.post('/api/auth/login', formData).then(function (response) {
          var data = response.data.data;

          _this.setAuth(data);

          if (_this.current_user.user.user_id.length > 0) {
            _this.setAlert({
              status: true,
              color: 'success',
              text: 'Login Success!',
              icon: 'mdi-check-circle',
              locAlert: false
            });

            _this.email = '';
            _this.password = '';

            _this.close();
          } else {
            _this.setAlert({
              status: true,
              color: 'error',
              text: 'Login Failed!',
              icon: 'mdi-alert-circle',
              locAlert: false
            });
          }
        })["catch"](function (error) {
          var resp_error = error.response;

          _this.setAlert({
            status: true,
            color: 'error',
            text: resp_error.data.error,
            icon: 'mdi-close-octagon',
            locAlert: false
          });
        });
      }
    },
    close: function close() {
      this.$emit('closed', false);
    },
    authProvider: function authProvider(provider) {
      var _this2 = this;

      this.loader = 'loading2';

      if (navigator.onLine) {
        var url = '/api/auth/social/' + provider;
        axios.get(url).then(function (response) {
          var data = response.data;
          window.location.href = data.url;
        })["catch"](function (error) {
          _this2.setAlert({
            status: true,
            color: 'error',
            text: 'Login Failed!',
            icon: 'mdi-alert-circle',
            locAlert: false
          });
        });
      } else {
        this.setAlert({
          status: true,
          color: 'error',
          text: 'No Internet Connection!',
          icon: 'mdi-google-downasaur',
          locAlert: false
        });
      }
    }
  }),
  watch: {
    loader: function loader() {
      var _this3 = this;

      var l = this.loader;
      this[l] = !this[l];
      setTimeout(function () {
        return _this3[l] = false;
      }, 4000);
      this.loader = null;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Login.vue?vue&type=template&id=6bdc8b8e&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Login.vue?vue&type=template&id=6bdc8b8e& ***!
  \********************************************************************************************************************************************************************************************************/
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
          _c("v-icon", { attrs: { left: "" } }, [_vm._v("mdi-login-variant")]),
          _vm._v(" "),
          _c("v-toolbar-title", [_vm._v("Login")]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { icon: "", dark: "" },
              nativeOn: {
                click: function($event) {
                  return _vm.close($event)
                }
              }
            },
            [_c("v-icon", [_vm._v("mdi-close-circle")])],
            1
          )
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
                  rules: _vm.emailRules,
                  label: "Email",
                  required: "",
                  autofocus: "",
                  "prepend-icon": "mdi-email-variant"
                },
                model: {
                  value: _vm.email,
                  callback: function($$v) {
                    _vm.email = $$v
                  },
                  expression: "email"
                }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                staticClass: "mb-2",
                attrs: {
                  rules: _vm.passwordRules,
                  label: "Password",
                  required: "",
                  "prepend-icon": "mdi-key-variant",
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
                        _vm._v("mdi-lock-open")
                      ]),
                      _vm._v("\n                    Login\n                ")
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "d-flex flex-row align-center" },
                [
                  _c("v-divider", { staticClass: "mx-3" }),
                  _vm._v(" or "),
                  _c("v-divider", { staticClass: "mx-3" })
                ],
                1
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
                        color: "blue-grey",
                        outlined: "",
                        loading: _vm.loading2
                      },
                      on: {
                        click: function($event) {
                          return _vm.authProvider("google")
                        }
                      }
                    },
                    [
                      _c("v-icon", { attrs: { left: "" } }, [
                        _vm._v("mdi-google")
                      ]),
                      _vm._v(
                        "\n                    Login with Google\n                "
                      )
                    ],
                    1
                  )
                ],
                1
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
                        color: "blue-grey",
                        outlined: "",
                        loading: _vm.loading3
                      },
                      on: {
                        click: function($event) {
                          return _vm.authProvider("github")
                        }
                      }
                    },
                    [
                      _c("v-icon", { attrs: { left: "" } }, [
                        _vm._v("mdi-github")
                      ]),
                      _vm._v(
                        "\n                    Login with GitHub\n                "
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
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Login.vue":
/*!*******************************************!*\
  !*** ./resources/js/components/Login.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_6bdc8b8e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=6bdc8b8e& */ "./resources/js/components/Login.vue?vue&type=template&id=6bdc8b8e&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js& */ "./resources/js/components/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_6bdc8b8e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_6bdc8b8e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Login.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/components/Login.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Login.vue?vue&type=template&id=6bdc8b8e&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/Login.vue?vue&type=template&id=6bdc8b8e& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_6bdc8b8e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=template&id=6bdc8b8e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Login.vue?vue&type=template&id=6bdc8b8e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_6bdc8b8e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_6bdc8b8e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);