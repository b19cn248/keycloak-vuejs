import Keycloak from "keycloak-js";

// Cấu hình Keycloak
const keycloak = new Keycloak({
    url: "https://keycloak.openlearnhub.io.vn/", // URL Keycloak (thay bằng URL thực tế của Keycloak)
    realm: "OpenLearnHub",            // Tên realm (ví dụ: "master")
    clientId: "user-management",          // ID client Keycloak (ví dụ: "vue-app")
});

export default keycloak;
