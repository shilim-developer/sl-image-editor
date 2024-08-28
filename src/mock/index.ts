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
            width: 900,
            height: 1347,
            url: "https://img.pconline.com.cn/images/upload/upc/tx/itbbs/2101/25/c1/251135935_1611532823091_mthumb.jpg",
          },
        ],
      };
    },
  },
];
