import { useState, useEffect, useRef } from 'react';
import { getOrder } from '../services/apiRestaurant';

function OrderPopover({ orderId }) {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const popoverRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    getOrder(orderId)
      .then(setOrder)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [orderId]);

  // Position the popover in the center of the viewport
  useEffect(() => {
    if (popoverRef.current) {
      const popoverHeight = popoverRef.current.offsetHeight;
      setPosition({
        top: `calc(50vh - ${popoverHeight / 2}px)`,
        left: '50%',
        transform: 'translateX(-50%)',
      });
    }
  }, [order, isLoading]);

  return (
    <div
      ref={popoverRef}
      className="fixed z-50 w-96 rounded-lg border border-stone-200 bg-white p-6 shadow-2xl"
      style={{
        top: position.top,
        left: position.left,
        transform: position.transform,
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-pulse text-stone-500">Loading…</div>
        </div>
      ) : error ? (
        <p className="text-center text-red-600">Error loading order</p>
      ) : order ? (
        <div className="space-y-3">
          <div className="border-b border-stone-200 pb-3">
            <h4 className="text-lg font-semibold text-stone-800">
              Order #{order.id}
            </h4>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-stone-600">
              Status:{' '}
              <span
                className={`inline-block rounded-full px-3 py-1 font-medium capitalize ${
                  order.status === 'delivered'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {order.status}
              </span>
            </p>
            <p className="text-sm text-stone-600">
              Total:{' '}
              <span className="text-lg font-semibold text-stone-800">
                ₹{order.orderPrice}
              </span>
            </p>
            <p className="text-sm text-stone-600">
              Items:{' '}
              <span className="font-medium text-stone-800">
                {order.cart.length} item{order.cart.length !== 1 ? 's' : ''}
              </span>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default OrderPopover;
