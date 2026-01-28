const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

type AuthResponse = {
  ok: boolean;
  token: string;
  user: { id: string; name: string; email: string };
};

export async function registerApi(payload: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Register failed");
  return data as AuthResponse;
}

export async function loginApi(payload: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Login failed");
  return data as AuthResponse;
}
