<script setup>
import { useAuthState } from "../store";
import router from "../router";
import axios from "axios";
import { onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";

const { getUsername, handleLogout } = useAuthState();
const submitLogout = () => {
  handleLogout();
  router.push("login");
};

const sort = ref("");
const listUser = ref(null);
const searchKey = ref("");

function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

const handleSort = sortType => {
  sort.value = sortType;
  if (sortType === "ASC") {
    listUser.value.sort(compare);
  } else if (sortType === "DESC") {
    listUser.value.sort(compare).reverse();
  }
};

const handleSearch = async () => {
  await fetchNewData();
  if (searchKey.value) {
    const tmpArr = listUser.value.filter(user =>
      user.name.toLowerCase().includes(searchKey.value.toLowerCase())
    );
    listUser.value = tmpArr;
  }
};

const fetchNewData = async () => {
  await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then(data => (listUser.value = data.data));
};

const reset = () => {
  sort.value = "";
  searchKey.value = "";
  fetchNewData();
};

onMounted(() => fetchNewData());
</script>

<template>
  <main>
    <div class="header">
      <div>
        <input type="text" v-model="searchKey" @keyup.enter.native="handleSearch()" />
        <button @click="reset">Reset</button>
      </div>
      <div>
        Wellcome {{getUsername()}}
        <button @click="submitLogout">Logout</button>
      </div>
    </div>

    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1">Id</div>
        <div class="col col-2">
          User Name
          <button @click="handleSort('ASC')" v-if="sort === 'DESC' || sort === ''">
            <Icon icon="material-symbols:arrow-circle-down-rounded" width="30" height="30"></Icon>
          </button>
          <button @click="handleSort('DESC')" v-if="sort === 'ASC'">
            <Icon icon="material-symbols:arrow-circle-up-rounded" width="30" height="30"></Icon>
          </button>
        </div>
        <div class="col col-3">Email</div>
        <div class="col col-4">Phone</div>
      </li>
      <li class="table-row" v-for="user in listUser" :key="user.id">
        <div class="col col-1" data-label="Job Id">{{user.id}}</div>
        <div class="col col-2" data-label="Customer Name">{{user.name}}</div>
        <div class="col col-3" data-label="Amount">{{user.email}}</div>
        <div class="col col-4" data-label="Payment Status">{{user.phone}}</div>
      </li>
    </ul>
  </main>
</template>

<style scoped lang="scss">
body {
  font-family: "lato", sans-serif;
  padding: 2rem;
}
.header {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin: 15px;
}
.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}
.col button {
  background: none;
  border: none;
}
h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
  small {
    font-size: 0.5em;
  }
}
ul {
  padding-right: 20px;
}

.responsive-table {
  li {
    border-radius: 3px;
    padding: 25px 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }
  .table-header {
    background-color: #95a5a6;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .table-row {
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  }
  .col-1 {
    flex-basis: 10%;
  }
  .col-2 {
    flex-basis: 40%;
  }
  .col-3 {
    flex-basis: 25%;
  }
  .col-4 {
    flex-basis: 25%;
  }

  @media all and (max-width: 767px) {
    .table-header {
      display: none;
    }
    .table-row {
    }
    li {
      display: block;
    }
    .col {
      flex-basis: 100%;
    }
    .col {
      display: flex;
      padding: 10px 0;
      &:before {
        color: #6c7a89;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 50%;
        text-align: right;
      }
    }
  }
}
</style>