import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // 양식에서 입력할 이메일, 비밀번호 값을 useState로 관리한다
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 로딩 중일 때 버튼을 비활성화하는 역할
  const [loading, setLoading] = useState(false);
  // 로그인/회원가입 시 오류가 발생하면 사용자에게 메시지를 보냄
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // handleSignIn: 로그인 처리함수
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard"); // 로그인 성공 시 이동
    }

    setLoading(false);
  };

  // handleSignUp: 회원가입 처리함수
  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      alert("회원가입 완료! 이메일을 확인해주세요.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          로그인
        </button>
        <button type="button" onClick={handleSignUp} disabled={loading}>
          회원가입
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
