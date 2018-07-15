// 引入配置文件以及进化引擎
const config=require("./configs/ExampleConfig.js"),
    RevolutionEngine=require("./src/RevolutionEngine.js");

// 计算
let revolutionEngine=new RevolutionEngine(config);
revolutionEngine.revolve();

// 打印结果
const bestResult=revolutionEngine.getBestResult();
console.log("已知的最大值点坐标为",`(${bestResult[0]},${bestResult[1]})`);