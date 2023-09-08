export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}

// export function checkUser(loginInfo) {
//   return new Promise(async (resolve, reject) => {
//     const email = loginInfo.email;
//     const password = loginInfo.password;
//     const response = await fetch("http://localhost:8080/users?email=" + email);
//     const data = await response.json();
//     console.log({ data });
//     if (data.length) {
//       if (password === data[0].password) {
//         resolve({ data: data[0] });
//       } else {
//         reject({ message: "wrong credentials" });
//       }
//     } else {
//       reject({ message: "user not found" });
//     }
//   });
// }

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
