import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useStores from "../../store";
import { isLogined } from "../../utils/auth";
import { HeaderOption, StyleHeader, StyleNav, StyleNavLink } from "./style";

const routes: Array<{ name: string; path: string }> = [
  {
    name: "首页",
    path: "/",
  },
  {
    name: "发现",
    path: "/discover",
  },
  {
    name: "音乐库",
    path: "/library",
  },
];

const Header = observer(() => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userStore } = useStores();
  const avatarUrl = userStore.profile?.avatarUrl;
  const [search, setSearch] = useState("");

  // 处理搜索
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === "enter" && search.length !== 0) {
      navigate(`/search?word=${search}`);
    }
  };

  return (
    <StyleHeader>
      <HeaderOption>
        <div className="iconButton" onClick={() => navigate(-1)}>
          <FiChevronLeft size="25px" />
        </div>
        <div className="iconButton" onClick={() => navigate(1)}>
          <FiChevronRight size="25px" />
        </div>
      </HeaderOption>
      <StyleNav>
        {routes.map((item) => (
          <StyleNavLink
            key={item.path}
            onClick={() => navigate(item.path)}
            className={item.path === pathname ? "active" : ""}
          >
            {item.name}
          </StyleNavLink>
        ))}
      </StyleNav>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
      >
        <Input
          placeholder="搜索"
          defaultValue={search}
          style={{ marginRight: "10px" }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          onKeyUp={handleSearch}
        />
        {isLogined() ? (
          <img
            src={avatarUrl}
            alt="个人头像"
            onClick={() => navigate("/user")}
          />
        ) : (
          <Button onClick={() => navigate("/login")}>登录</Button>
        )}
      </div>
    </StyleHeader>
  );
});

export default Header;
