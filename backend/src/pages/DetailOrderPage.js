import productApi from './../api/productApi';
import ordersApi from './../api/ordersApi';
import ordersDetailApi from './../api/ordersDetailApi';
import { currentURL, $ } from './../utils';

const DetailOrderPage = {
    async render () {
        const { data : dataOrders } = await ordersApi.getAll();
        const { data : dataProducts } = await productApi.getAll();
        const { data : dataOrderDetail } = await ordersDetailApi.getAll();
        const idOrder = currentURL().id;
        
        // get value address user order
        const userOrder = dataOrders.find(order => {
            return order.id == idOrder;
        })
        
        let orders = [];
        let totalPay = 0;

        dataOrderDetail.forEach(orderDetail => {
            // lấy ra các sản phẩm theo idOrder
            const prdOrder = dataProducts.filter(product => {
                return orderDetail.idPrd == product.id && orderDetail.idOrder == idOrder;
            })
            
            // lấy ra các sp đã order
            const handleOrdered = prdOrder.map(order => {
                return {
                    name: order.name, 
                    image: order.image,
                    price: order.price,
                    quantity: orderDetail.quantity,
                    sale: order.sale,
                }
            })

            
            orders.push(...handleOrdered);
        })

        return /*html*/ `
        <div class="container-fluid main">
            <div class="row">
                <div class="col-lg-12">
                    <h3 class="page-header">Chi tiết đơn hàng</h3>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">Địa chỉ người nhận</div>
                        <div class="panel-body">
                            <h4 class="">${userOrder.name}</h4>
                        </div>
                        <div class="panel-body">Ngày đặt hàng: ${userOrder.timeOrder}</div>
                        <div class="panel-body">Số điện thoại: ${userOrder.phone}</div>
                        <div class="panel-body">Địa chỉ: ${`${userOrder.commune} - ${userOrder.district} - ${userOrder.capital}`}</div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading">Sản phẩm đơn hàng</div>
                        <div class="panel-body">
                        <div class="table-responsive" id="list-cate">
                            <table class="table table-hover" id="dataTables-example">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Giảm giá</th>
                                        <th>Tạm tính</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${
                                        orders.map((order, index) => {
                                            let totalPrice = 0;
                                            let priceSale = 0;
                                            if(order.sale == '' || order.sale == null || order.sale == 0) {
                                                priceSale = parseInt(order.price);
                                            } else {
                                                priceSale = ((100 - parseInt(order.sale)) / 100) * parseInt(order.price);
                                            }
                                            
                                            // total price
                                            totalPrice += (priceSale * order.quantity);
                                            // total pay
                                            totalPay += totalPrice;

                                            return /*html*/ `
                                                <tr>
                                                    <td>${index + 1}</td>
                                                    <td>
                                                        <img src="${order.image}" alt="" width="70px" height="100px" class="img-prd-order">
                                                        ${order.name}
                                                    </td>
                                                    <td>${order.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</td>
                                                    <td>${order.quantity}</td>
                                                    <td>${order.sale ? order.sale : 0}</td>
                                                    <td>${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</td>
                                                </tr>
                                            `;
                                        }).join('')
                                    }
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Tổng cộng</td>
                                        <td>${Math.ceil(totalPay).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>

                    </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
        </div>
        `;
    }
}

export default DetailOrderPage;