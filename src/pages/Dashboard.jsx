import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div>
      <h2>대시보드</h2>
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
