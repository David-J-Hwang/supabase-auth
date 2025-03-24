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
    // 로그인 과정을 처리하는 동안 버튼을 비활성화하도록 loading state를 true로 둔다
    setLoading(true);
    // 사용자에게 보일 에러 메시지인 error state를 초기화한다
    setError("");

    // supabase.auth.signInWithPassword() 함수를 사용해 로그인을 요청한다
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // 로그인 실패 시 error.message로 error state를 설정한다
    if (error) {
      setError(error.message);
    }
    // 로그인 성공 시 Dashboard 페이지로 이동한다
    else {
      navigate("/dashboard");
    }

    // 로그인 처리가 끝나면 로딩 상태를 완료로 두기 위해 loading state를 false로 둔다
    setLoading(false);
  };

  // handleSignUp: 회원가입 처리함수
  const handleSignUp = async () => {
    // 로그인 과정을 처리하는 동안 버튼을 비활성화하기 위해 loading state를 true로 둔다다
    setLoading(true);
    // 사용자에게 보일 에러 메시지인 error state를 초기화한다
    setError("");

    // supabase.auth.signUp() 함수를 사용해 회원가입을 요청한다
    const { error } = await supabase.auth.signUp({ email, password });

    // 회원가입 실패 시 error.message로 error state를 설정한다
    if (error) {
      setError(error.message);
    }
    // 회원가입 성공 시 이메일 확인을 요청하는 alert를 표시한다
    else {
      alert("회원가입 완료! 이메일을 확인해주세요.");
    }

    // 회원가입 처리가 완료된 경우 loading state를 false로 둔다
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
