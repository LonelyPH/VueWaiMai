/*
 *使用mock.js提供mock数据接口
 */
import Mock from "mockjs";
import data from "./data.json";

//*返回商品的接口
Mock.mock('/goods', {code: 0,data: data.goods});

//*返回评价的接口
Mock.mock("/pingjia", {code: 0, data: data.ratings});

//*返回商家信息的接口
Mock.mock("/msg", {code: 0, data: data.info});
