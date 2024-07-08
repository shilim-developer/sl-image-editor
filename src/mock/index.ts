export default [
  {
    url: "/api/getImageList",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "ok",
        data: [],
      };
    },
  },
];
