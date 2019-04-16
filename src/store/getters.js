/*
 *基于state的所有计算属性的对象
 */
export default {
  //购物车中点餐总数和总价的计算属性
  totalCount(state) {
    //购物车上红色框内的总数
    return state.foodsChoosed.reduce((total, food) => {
      return (total = total + food.count);
    }, 0);
  },
  totalPrice(state) {
    //购物车右侧总价
    return state.foodsChoosed.reduce((total, food) => {
      return (total = total + food.count * food.price);
    }, 0);
  }
};
