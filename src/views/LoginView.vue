<template>
  <section class="From my-5 mx-auto pt-5 col-lg-5 col-md-8 col-10 position-relative">
    <div class="container px-5 py-5 shadow">
      <TransitionGroup name="nested">
        <Form v-if="formType === 'login'" @submit="onSubmitLogin" class="form-login">
          <h1 class="font-weight-bold py-3">ログイン</h1>
          <div class="form-row">
            <div class="form-floating mb-3">
              <Field
                name="username"
                type="username"
                class="form-control"
                id="floatingInputUsername"
                autocomplete="off"
                placeholder="ユーザー名"
                :rules="validateUsername"
              />
              <label for="floatingInputUsername">ユーザー名</label>
              <div class="error-place">
                <Transition>
                  <ErrorMessage name="username" class="text-danger ms-2" />
                </Transition>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-floating mb-3">
              <Field
                name="password"
                type="password"
                class="form-control"
                id="floatingInputPass"
                placeholder="name@example.com"
                :rules="validatePassword"
              />
              <label for="floatingInputPass">パスワード</label>
              <div class="error-place">
                <Transition>
                  <ErrorMessage name="password" class="text-danger ms-2" />
                </Transition>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-lg-12">
              <button class="btn1 mt-3 mb-5">ログイン</button>
            </div>
          </div>

          <p>
            アカウントをお持ちでない場合?
            <a href="#" @click="changeFormType('register')">登録</a>
          </p>
        </Form>
        <Form v-if="formType === 'register'" @submit="onSubmitRegister" class="form-register">
          <h1 class="font-weight-bold py-3 d-flex justify-content-end">登録</h1>
          <div class="form-row">
            <div class="form-floating mb-3">
              <Field
                name="username"
                type="username"
                class="form-control"
                id="floatingInputUsername"
                autocomplete="off"
                placeholder="ユーザー名"
                :rules="validateUsername"
              />
              <label for="floatingInputUsername">ユーザー名</label>
              <div class="error-place">
                <Transition>
                  <ErrorMessage name="username" class="text-danger ms-2" />
                </Transition>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-floating mb-3">
              <Field
                name="email"
                type="email"
                class="form-control"
                id="floatingInputEmail"
                autocomplete="off"
                placeholder="name@example.com"
                :rules="validateEmail"
              />
              <label for="floatingInputEmail">メールアドレス</label>
              <div class="error-place">
                <Transition>
                  <ErrorMessage name="email" class="text-danger ms-2" />
                </Transition>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-floating mb-3">
              <Field
                name="password"
                type="password"
                class="form-control"
                id="floatingInputPass"
                placeholder="パスワード"
                :rules="validatePassword"
              />
              <label for="floatingInputPass">パスワード</label>
              <div class="error-place">
                <Transition>
                  <ErrorMessage name="password" class="text-danger ms-2" />
                </Transition>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-lg-12">
              <button class="btn1 mt-3 mb-5">登録</button>
            </div>
          </div>

          <p>
            アカウントをお持ちでない場合?
            <a href="#" @click="changeFormType('login')">ログイン</a>
          </p>
        </Form>
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import { useAuthState } from "../store";
import router from "../router";

let formType = ref("login");
const { handleLogin } = useAuthState();
const changeFormType = type => {
  formType.value = type;
};

const onSubmitLogin = values => {
  console.log("LOGIN: ", values);
  handleLogin(values.username);
  router.push('/');
};
const onSubmitRegister = values => {
  console.log("REGISTER: ", values);
};
const validateUsername = value => {
  if (!value?.trim()) {
    return "This field is required";
  }
  return true;
};
const validatePassword = value => {
  if (!value?.trim()) {
    return "This field is required";
  }
  if (value?.length < 8) {
    return "Too short";
  }
  return true;
};
const validateEmail = value => {
  if (!value?.trim()) {
    return "This field is required";
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "This field must be a valid email";
  }
  if (value?.length < 8) {
    return "Too short";
  }
  return true;
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: rgb(219, 226, 226) !important;
}
.container {
  background: white;
  border-radius: 30px;
  max-height: 590px;
  overflow: hidden;
}
.btn1 {
  border: none;
  outline: none;
  height: 50px;
  width: 100%;
  background-color: black;
  color: white;
  border-radius: 4px;
  font-weight: bold;
}
.btn1:hover {
  background-color: white;
  border: 1px solid;
  color: black;
}
a {
  text-decoration: none !important;
}
.error-place {
  height: 20px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}

.nested-enter-active {
  transition-delay: 0.4s;
}

.nested-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}

.nested-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
