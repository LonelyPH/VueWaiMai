/*
 *自定义过滤器
 */

import Vue from "vue";

/*
*定义时间格式过滤器
*将毫秒值转换成自定义格式的日期
*例如：2019-04-15 19:30:08
*/
Vue.filter("dataFilter", function(value) {
  // 重写toLocaleString方法，自定义格式化日期
  Date.prototype.toLocaleString = function() {
    // 补0
    function addZero(num) {
      if (num < 10) return "0" + num;
      return num;
    }
    // 按自定义拼接格式返回
    return (
      this.getFullYear() +
      "-" +
      addZero(this.getMonth() + 1) +
      "-" +
      addZero(this.getDate()) +
      " " +
      +addZero(this.getHours()) +
      ":" +
      addZero(this.getMinutes()) +
      ":" +
      addZero(this.getSeconds())
    );
  };
  // 根据毫秒数构建 Date 对象
  let date = new Date(value);
  // 按重写的自定义格式，格式化日期
  return date.toLocaleString();
});
