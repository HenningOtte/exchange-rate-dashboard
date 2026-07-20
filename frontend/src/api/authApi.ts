export type LoginSucess = {
  sucess: boolean;
  message: string;
};

export async function postLogin() {
  try {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "HenningOtte91@gmail.com",
        password: "2RidersOnTheStorm9",
      }),
    });

    const data: LoginSucess = await response.json();
    return data;
  } catch (error) {
    return {
      sucess: false,
      message: "Network error.",
    };
  }
}
