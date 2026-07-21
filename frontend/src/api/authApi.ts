import type { User } from "../types/user";

export type LoginSucess = {
  sucess: boolean;
  message: string;
  data: User;
};

export async function postLogin(inputEmail: string, inputPassword: string) {
  try {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputEmail,
        password: inputPassword,
      }),
    });

    const data: LoginSucess = await response.json();
    return data;
  } catch (error) {
    return {
      sucess: false,
      message: "Network error.",
      data: {
        firstname: "",
        lastname: "",
        email: "",
      },
    };
  }
}
