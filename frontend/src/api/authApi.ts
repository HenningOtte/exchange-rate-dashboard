import type { User } from "../types/user";

export type LoginSucess = {
  sucess: boolean;
  message: string;
  data: User;
};

export type RegisterSucess = {
  sucess: boolean;
  path: string;
  msg: string;
};

export async function postLogin(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
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

export async function postRegister(
  firstname: string,
  lastname: string,
  email: string,
  password: string,
) {
  try {
    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      }),
    });

    const data: RegisterSucess[] = await response.json();
    return data;
  } catch (error) {
    return [
      {
        sucess: false,
        path: "server",
        msg: "An unexpected server error occurred.",
      },
    ];
  }
}
