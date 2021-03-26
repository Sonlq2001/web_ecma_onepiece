import ordersApi from './../api/ordersApi';
import ordersDetailApi from './../api/ordersDetailApi';
import { currentURL , $} from './../utils';

const ListOrders = {
    async render () {
        const { data : ordersDetail } = await ordersDetailApi.getAll();
        const { data : orders } = await ordersApi.getAll();
        
        let orderUser = [];
        const result = orders.forEach(order => {
            // get order detail có idOrder giống nhau
            const details = ordersDetail.filter(detail => {
                return detail.idOrder == order.id;
            })
            
            // tính tổng số lượng sp và tổng tiền đơn hàng theo idOrder giống nhau
            let totalPrd = 0;
            let totalPrice = 0;
            details.forEach(qt => {
                totalPrd += parseInt(qt.quantity);
                totalPrice += parseInt(qt.unitPrice) * parseInt(qt.quantity);
            })

            const listOrder = {
                id: details[0].idOrder,
                name: order.name,
                quantity: totalPrd,
                timeOrder: order.timeOrder,
                totalPriceOrder: totalPrice,
                status: details[0].status,
            }
            orderUser.push(listOrder);
        })   
        console.log(orderUser);
        
        return /*html*/ `
            <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover table-cate" id="dataTables-example">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Người đặt</th>
                            <th>Số lượng</th>
                            <th>Thời gian</th>
                            <th>Tổng tiền đơn hàng chưa trừ Sale</th>
                            <th>Xác nhận</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${
                            
                            orderUser.map((order, index) => {
                                let statusOrder;
                                switch(order.status){
                                    case 0: 
                                        statusOrder = 'Đã hủy';
                                    break;
                                    case 1: 
                                        statusOrder = 'Chờ xác nhận';
                                    break;
                                    case 2: 
                                        statusOrder = 'Chờ lấy hàng';
                                    break;
                                    case 3: 
                                        statusOrder = 'Đã giao';
                                    break;
                                }
                                return /*html*/ `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${order.name}</td>
                                        
                                        <td>${order.quantity}</td>
                                        <td>${order.timeOrder}</td>
                                        <td>${order.totalPriceOrder.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</td>
                                        <td>
                                            <span class="btn-status">${statusOrder}</span>
                                        </td>
                                        <td class="d-flex justify-content-between">
                                            <a href="/#/order-detail/${order.id}" class="btn btn-primary mr-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                `;
                            }).join('')
                        }

                    </tbody>
                </table>
            </div>
        `;
    },
    async afterRender () {
        const btnStatus = $('.btn-status');
        if(Array.isArray(btnStatus)) {
            btnStatus.forEach(btn => {
                btn.addEventListener('click', function () {
                    this.classList.add('active');
                    this.innerText = `Đã xác nhận`;
                    this.style.animation = `default`;
                })
            })
        }
    }
}

export default ListOrders;