let navigate: (path: string) => void;

export const setNavigate = (navFn: typeof navigate) => {
  navigate = navFn;
};

export const navigateTo = (path: string) => {
  if (navigate) {
    navigate(path);
  }
};