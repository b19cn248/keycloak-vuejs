<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import keycloak from "@/keycloak.js";

const user = ref(null);
const message = ref(null); // Thêm thông báo trạng thái

onMounted(async () => {
  try {
    const token = keycloak.token;
    const email = keycloak.tokenParsed?.email;

    if (!token || !email) {
      console.error('Token or email not found');
      return;
    }

    const response = await axios.get(`https://keycloak.openlearnhub.io.vn/api/v1/users/email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    user.value = response.data;
  } catch (error) {
    console.error('Error fetching user:', error.response ? error.response : error);
  }
});

const updateUser = async () => {
  try {
    const token = keycloak.token;
    await axios.put(
        `http://localhost:8080/api/v1/users/${user.value.id}`,
        user.value,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    message.value = "User information updated successfully!";
  } catch (error) {
    message.value = "Failed to update user information.";
    console.error(error);
  }
};
</script>

<template>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <img src="https://via.placeholder.com/50" alt="Avatar" class="avatar" />
      <h2>Welcome, {{ user?.username || "User" }}!</h2>
    </header>

    <!-- Form -->
    <div class="content">
<!--      <h1>Chào bạn nhé , {{ user?.first_name || "User" }}!</h1>-->
      <h1>Chào bạn nhé, {{ user ? `${user.first_name || 'User'} ${user.last_name || ''}`.trim() : 'User' }}!</h1>
      <div v-if="user" class="form">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="user.username" disabled />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="user.email" disabled />
        </div>
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="user.first_name" />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="user.last_name" />
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" v-model="user.status">
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <!-- Save Button -->
        <button @click="updateUser">Save Changes</button>
        <!-- Message -->
        <p v-if="message" class="message">{{ message }}</p>
      </div>
      <div v-else>
        <p>Loading user information...</p>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2024 Your Company. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
/* General Styles */
.container {
  margin: 20px auto;
  max-width: 700px;
  font-family: Arial, sans-serif;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border-radius: 10px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid white;
}

.content {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

button {
  font-size: 16px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.message {
  margin-top: 10px;
  font-size: 14px;
  color: green;
}

.footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #555;
}
</style>
