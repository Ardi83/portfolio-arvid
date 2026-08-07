// The blog uses plain CSS. Without this file, Vite searches upward and picks up
// the portfolio's PostCSS config at the repo root, which requires Tailwind —
// a dependency this project does not have.
export default {
  plugins: {},
};
