export function register(user) {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === user.email)) {
        throw new Error("Email is already registered");
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}
export function login(email, password) {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    localStorage.setItem("currentUser", JSON.stringify(user));
}
export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}
export function logout() {
    localStorage.removeItem("currentUser");
}
export function updateUser(updatedUser, oldEmail) {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users = users.map((u) => (u.email === oldEmail ? updatedUser : u));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
}
