import { useState } from 'react';
import { formatDate } from '../utils/helpers';
import Button from './Button';
import OrderPopover from './OrderPopover';

const ORDER_HISTORY_KEY = 'orderHistory';

function OrderHistory() {
  const [openOrderId, setOpenOrderId] = useState(null);

  let orderHistory = [];

  try {
    const raw = localStorage.getItem(ORDER_HISTORY_KEY);
    orderHistory = raw ? JSON.parse(raw) : [];
  } catch {
    orderHistory = [];
  }

  if (orderHistory.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-lg text-stone-500">No orders yet.</p>
        <Button type="primary" to="/">
          Start Ordering
        </Button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h2 className="mb-6 text-3xl font-bold text-stone-800">
        Your Order History
      </h2>

      <div className="overflow-x-auto rounded-lg border border-stone-200 shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-yellow-400 text-stone-800">
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                Created At
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orderHistory.map((order, index) => (
              <tr
                key={order.id}
                className={`border-t border-stone-200 transition-colors duration-300 ${
                  index % 2 === 0 ? 'bg-stone-50' : 'bg-white'
                } hover:bg-yellow-50`}
              >
                <td className="px-6 py-4 font-medium text-stone-800">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-stone-600">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-6 py-4 text-center">
                  <div
                    onMouseEnter={() => setOpenOrderId(order.id)}
                    onMouseLeave={() => setOpenOrderId(null)}
                    className="inline-block"
                  >
                    <Button type="small" to={`/order/${order.id}`}>
                      View Details
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popover rendered outside table to avoid overflow issues */}
      {openOrderId && <OrderPopover orderId={openOrderId} />}

      <p className="mt-6 text-center text-sm text-stone-500">
        Total orders:{' '}
        <span className="font-semibold text-stone-700">
          {orderHistory.length}
        </span>
      </p>
    </div>
  );
}

export default OrderHistory;
