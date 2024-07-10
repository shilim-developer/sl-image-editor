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
            "width|300-800.0-0": 300,
            "height|300-800.0-0": 300,
            url: "@image()",
          },
        ],
      };
    },
  },
];
