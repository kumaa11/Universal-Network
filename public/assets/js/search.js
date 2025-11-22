import { setTransport, setWisp, makeURL, proxyUV } from "../../lithium.mjs";
import("../../uv/uv.config.js");

let iframe;
let protocol = location.protocol === "https:" ? "wss://" : "ws://";
let host = location.host;
let input = document.getElementById("rogoisdabest");
setWisp(`${protocol}${host}/wisp/`);
setTransport("epoxy");

document.addEventListener("keyup", async (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    iframe = document.getElementById("frame");

    if (
      input.value.trim().includes(".") &&
      !input.value.trim().startsWith("http://") &&
      !input.value.trim().startsWith("https://")
    ) {
      input.value = "https://" + input.value;
    }

    let url = await proxyUV(makeURL(input.value));
    console.log("set to UV");
    iframe.src = url;
    iframe.style.zIndex = "100";

    document.documentElement.style.overflow = "hidden";
    const goBackBtn = document.getElementById("goBackBtn");
    goBackBtn.style.top = "20px";

    goBackBtn.addEventListener("click", () => {
      iframe.style.zIndex = "-1";
      iframe.src = "";
      document.documentElement.style.overflow = "";
      goBackBtn.style.top = "-80px";
    });

    console.log("Loading URL in", iframe.id, ":", url);
  }
});
