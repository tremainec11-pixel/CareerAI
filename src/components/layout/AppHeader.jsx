function AppHeader() {
  const fullName = "Nathan Charles";
  const firstInitial = fullName.charAt(0).toUpperCase();

  return (
    <header className="app-header">
      <div className="app-brand-wrapper">
        <div className="app-brand-icon">
          C
        </div>

        <div className="app-brand">
          Career<span>AI</span>
        </div>
      </div>

      <div className="app-user-area">
        <div className="user-avatar">
          {firstInitial}
        </div>

        <div className="user-info">
          <span className="app-user-name">
            {fullName}
          </span>

          <span className="user-role">
            Career Profile
          </span>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;