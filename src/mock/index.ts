export default [
  {
    url: "/api/getImageList",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "ok",
        "data|10": [
          {
            width: 300,
            height: 500,
            url: "@image(300x500)",
          },
        ],
      };
    },
  },
];
