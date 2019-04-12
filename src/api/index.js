/*
 *接口请求函数模块
 *返回值：promise对象
 */

//*引入封装的ajax请求函数
import ajax from "./ajax";

const BASE_URL = "/api";

//*获取地址
//* 基于百度地图API的定位功能
export const geoFindMe = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        //* 百度地图API解析经纬度得到地址详情
        var point = new BMap.Point(longitude, latitude);

        var geoc = new BMap.Geocoder();
        geoc.getLocation(point, function(result) {
          //* 地址详情 result
          resolve(result);
        });
      }

      function error() {
        reject("无法获取位置信息");
      }
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 5000
      });
    } else {
      alert("不支持定位");
      return;
    }
  });
};

//*获取msite食品分类列表
export const getFoodList = () => ajax(BASE_URL + "/index_category");

//*获取商铺列表
export const getShopList = ({ latitude, longitude }) =>
  ajax(BASE_URL + "/shops", { latitude, longitude });

//*根据经纬度和关键字搜索商铺列表
export const searchShopList = ({ geohash, keyword }) =>
  ajax(BASE_URL + "/search_shops", { geohash, keyword });

//*获取一次性验证码
// export const getYanZhengMa = () => ajax(BASE_URL + "/captcha");

//*用户名密码登陆
export const passwordLogin = ({ name, pwd, captcha }) =>
  ajax(BASE_URL + "/login_pwd", { name, pwd, captcha }, "POST");

//*发送短信验证码
export const sendYanZhengMa = ({ phone }) =>
  ajax(BASE_URL + "/sendcode", { phone });

//*手机号验证码登陆
export const duanXinLogin = ({ phone, code }) =>
  ajax(BASE_URL + "/login_sms", { phone, code }, "POST");

//*根据会话获取用户信息
export const getUserMsg = () => ajax(BASE_URL + "/userinfo");

//*用户登出
export const quitLogin = () => ajax(BASE_URL + "/logout");
