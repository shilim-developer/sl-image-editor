import request from "./request";

export const getImageListApi = () =>
  request.get<string>({ url: "api/getImageList" });
