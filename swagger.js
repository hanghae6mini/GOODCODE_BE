const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "GOOD CODE",
        description: "코드를 공유하고 댓글을 달아서 서로 공부 할 수 있는 코드 리뷰 사이트",
    },
    host: "localhost:3000",
    schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
    "./app.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);