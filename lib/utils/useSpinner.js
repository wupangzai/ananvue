const ora = (...args) => import("ora").then((m) => m.default(...args));

const useSpinner = async (text, spinnerType = "dots") => {
  const spinner = await ora({ text, spinner: spinnerType });

  spinner.start(); // 默认开启

  return spinner;
};

module.exports = useSpinner;
