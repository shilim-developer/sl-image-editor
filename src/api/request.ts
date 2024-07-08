import { router } from "@/router";
import Request from "../utils/request";
import { BASE_URL, TIME_OUT } from "./config";
window.$message = useMessage();

function handleError(data: any) {
  let msg = "";
  switch (data.code) {
    case 2:
      msg = data.message;
      break;
    case 3:
      msg = "系统繁忙,请稍后重试";
      break;
    case 4:
      msg = "登陆过期";
      router.push("/login");
      break;
    default:
      msg = data.code;
      break;
  }
  console.log(msg);
  window.$message.error(msg);
}

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptorHooks: {
    requestInterceptor: (config: any) => {
      return config;
    },
    requestInterceptorCatch: (error) => {
      return Promise.reject(error);
    },
    responseInterceptor: (response) => {
      // 对响应数据做点什么
      if (
        response.data &&
        response.data.code !== 200 &&
        (response.headers["content-type"].includes("application/json") ||
          response.headers["content-type"].includes("text/html"))
      ) {
        handleError(response.data);
        return Promise.reject(response);
      } else if (
        response.headers["content-type"].includes("application/vnd.ms-excel")
      ) {
        return response;
      }
      return response.data;
    },
    responseInterceptorCatch: (error) => {
      // 对响应错误做点什么
      try {
        window.$message.error("网络错误，请检查后重试");
      } catch (err) {
        if (!(error.message && error.message === "cancelRequest")) {
          window.$message.error("网络错误，请检查后重试");
        }
      }
      return Promise.reject(error);
    },
  },
});

export default request;
