import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect: navigate가 바뀔 때마다 로그인된 유저가 있는지 확인하기
  useEffect(() => {
    // fetchUser: supabase.auth.getUser()를 통해 로그인된 사용자의 정보를 가져와,
    // 유효한 정보가 있는 경우 user state에 저장하고,
    // 아닌 경우 /login 페이지로 리디렉션함
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 만약 user가 존재하지 않는 경우, /login 페이지로 리디렉션
      if (!user) {
        navigate("/login");
      }
      // user가 존재하는 경우, 사용자의 정보를 user state에 저장
      else {
        setUser(user);
      }
    };

    fetchUser(); // fetchUser()함수를 실행한다
  }, [navigate]);

  // handleLogout: 로그아웃을 실행하는 함수
  const handleLogout = async () => {
    await supabase.auth.signOut(); // supabase.auth.signOut() 함수를 사용해 로그아웃을 처리

    navigate("/login"); // /login 페이지로 리디렉션
  };

  return (
    <div>
      <h1>대시보드</h1>
      {user ? (
        <div>
          <p>환영합니다, {user.email}님!</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default Dashboard;
