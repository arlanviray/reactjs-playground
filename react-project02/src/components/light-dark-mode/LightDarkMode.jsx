import useLocalStorage from "../../helpers/useLocalStorage";
import "./styles.scss";

function LightDarkMode() {
  const [theme, setTheme] = useLocalStorage("ThemeMode", "light");

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // console.log(theme);

  return (
    <div className="light-dark-mode maxwidth" data-theme={theme}>
      <p>
        Displaying
        <br />
        {theme.toUpperCase()} theme!
      </p>
      <button onClick={handleToggleTheme}>Change Theme</button>
      <div className="bodycolor"></div>
    </div>
  );
}

export default LightDarkMode;
