import { useState } from "react";
import { registerApi } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

export function RegisterScreen({ onGoLogin }: { onGoLogin: () => void }) {
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerApi({ name, email, password });
      login(res.token, res.user);
      toast.success("Account created");
    } catch (err: any) {
      toast.error(err?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h1 className="text-gray-900 text-2xl mb-2">Register</h1>
        <p className="text-gray-600 mb-6">Create an account</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700">Name</label>
            <input
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Password</label>
            <input
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              minLength={6}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <button
          onClick={onGoLogin}
          className="mt-4 w-full text-sm text-blue-600 hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
