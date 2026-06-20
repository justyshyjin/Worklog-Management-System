import "../styles/header.css";

import { Button } from "@mui/material";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import { useAuth } from "../context/AuthContext";

const Header = () => {

  const {
    user,
    logout
  } = useAuth();

  return (

    <header className="app-header">

      <div className="logo-section">

        <img
          src="/logo.png"
          alt="logo"
          className="app-logo"
        />

      </div>

      <div className="header-content">

        <div className="header-top">

          <h1>
            WorkLog Management System
          </h1>

        </div>

        <div className="header-bottom">

          <nav className="top-nav">

            <button>
              Dashboard
            </button>

            <button>
              Tasks
            </button>

            <button>
              Projects
            </button>

            <button>
              Users
            </button>

            <button>
              Reports
            </button>

            <button>
              Settings
            </button>

          </nav>

          <div className="user-panel">

            <span>
              {user?.username}
            </span>

            <Button
              className="logout-btn"
              size="small"
              variant="outlined"
              color="error"
              startIcon={
                <PowerSettingsNewIcon />
              }
              onClick={logout}
            >
              Logout
            </Button>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;