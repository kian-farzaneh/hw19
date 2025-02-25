import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigator = useNavigate();

  return (
    <div className="bg-[#19191a] w-full h-screen flex justify-center items-center gap-5">
      <button
        onClick={() => navigator("/signin_page")}
        className="border rounded-full py-5 px-10 text-white"
      >
        Signin
      </button>
      <button
        onClick={() => navigator("/signup_page")}
        className="border rounded-full py-5 px-10 text-white"
      >
        Signup
      </button>
    </div>
  );
}
