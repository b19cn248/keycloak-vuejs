<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import keycloak from "@/keycloak.js";

const users = ref([]);

onMounted(async () => {
  try {
    const token = keycloak.token; // Lấy token từ Keycloak
    console.log("Using token: ", token); // Inspect the token value

    const response = await axios.get('http://user.service.openlearnhub.io.vn/api/v1/users', {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token qua header
      },
      params: {
        page: 0,
        size: 10,
      },
    });

    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error.response ? error.response : error);
  }
});



</script>

<template>
  <div class="container">
    <h1>User Information</h1>
    <div class="table-wrapper">
      <table class="user-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.status ? 'Active' : 'Inactive' }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 20px auto;
  max-width: 90%; /* Tăng chiều ngang tổng thể */
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
}

.table-wrapper {
  overflow-x: auto; /* Đảm bảo bảng cuộn ngang nếu nội dung quá lớn */
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 12px 20px; /* Tăng padding để dữ liệu thoáng hơn */
  text-align: left;
  word-wrap: break-word;
}

.user-table th {
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
  font-size: 16px;
}

.user-table td {
  font-size: 14px;
}

.user-table tr:nth-child(even) {
  background-color: #f2f2f2; /* Tô màu xen kẽ cho các dòng */
}

.user-table tr:hover {
  background-color: #ddd; /* Hiệu ứng hover */
}

@media (min-width: 768px) {
  .user-table {
    font-size: 16px; /* Tăng kích thước chữ cho màn hình lớn hơn */
  }
}
</style>
