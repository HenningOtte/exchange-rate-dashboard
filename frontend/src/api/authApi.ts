import type { User } from "../types/user";

export type LoginSuccess = {
  success: boolean;
  message: string;
  data: User;
  token: string;
};

export type RegisterSuccess = {
  success: boolean;
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

    const data: LoginSuccess = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Network error.",
      data: {
        firstname: "",
        lastname: "",
        email: "",
      },
      token: "",
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

    const data: RegisterSuccess[] = await response.json();
    return data;
  } catch (error) {
    return [
      {
        success: false,
        path: "server",
        msg: "An unexpected server error occurred.",
      },
    ];
  }
}
