import { IconButton, Tooltip } from "@mui/material";
import AudioHome from "./AudioHome";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <AudioHome />
      <div className="fixed left-5 bottom-5">
        <Tooltip title="Logout">
          <IconButton
            color="error"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <Logout sx={{ height: 30, width: 30 }} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Home;
