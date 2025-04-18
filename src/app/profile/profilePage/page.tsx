"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  avatar: string | null;
}

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState<SignUpForm>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    avatar: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

   

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Store the username in localStorage
      localStorage.setItem('username', formData.username);
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push("/dashboard");
    } catch (err) {
      setError("An error occurred during sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if(formData.username == 'username' ){
    setError("This username is popular Impersonation is not allowed");
    setIsLoading(false);
    return;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-red-900 to-pink-800 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white/10 backdrop-blur-lg shadow-lg sm:rounded-3xl sm:p-20 border border-white/10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200/10">
              <div className="py-8 text-base leading-6 space-y-4 text-white sm:text-lg sm:leading-7">
                <div className="flex flex-col items-center mb-8">
                  <h1 className="text-3xl font-bold text-center mb-4">Create Account</h1>
                  
                  {/* Avatar Upload Section */}
                  <div className="relative group cursor-pointer mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-white/20 flex items-center justify-center border-2 border-white/30 hover:border-white/60 transition-colors">
                      {formData.avatar ? (
                        <Image 
                          src={formData.avatar} 
                          alt="Avatar preview" 
                          width={96} 
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <svg className="w-12 h-12 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      )}
                    </div>
                    <input
                      type="file"
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="absolute bottom-0 right-0 bg-white/20 rounded-full p-2 border border-white/30">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded text-sm">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                      placeholder="Enter username"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                      placeholder="Enter email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                      placeholder="Enter password"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                      placeholder="Confirm password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <button
                    onClick={() => router.push("")}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Already have an account? Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







