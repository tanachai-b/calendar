import cx from "classnames";

export function Gradients() {
  return (
    <div className={cx("size-full", "absolute")}>
      <div
        className={cx("size-full", "absolute")}
        style={{
          background: "linear-gradient(155deg, #00000020,#00000000 20%)",
        }}
      ></div>
      <div
        className={cx("size-full", "absolute")}
        style={{
          background: "linear-gradient(-155deg, #00000020,#00000000 20%)",
        }}
      ></div>
      <div
        className={cx("size-full", "absolute")}
        style={{
          background: "linear-gradient(25deg, #ffffff20,#ffffff00 20%)",
        }}
      ></div>
      <div
        className={cx("size-full", "absolute")}
        style={{
          background: "linear-gradient(-25deg, #ffffff20,#ffffff00 20%)",
        }}
      ></div>
    </div>
  );
}
