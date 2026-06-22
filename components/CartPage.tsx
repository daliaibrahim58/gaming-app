"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import Image from "next/image";

function CartPage() {
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cart.items);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-white">🛒 Your cart is empty</div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Your Cart</h1>

      {/* ITEMS */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white/10 p-4 rounded-lg"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <Image
                width={60}
                height={60}
                src={item.cover}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />

              <div>
                <h2 className="font-bold">{item.title}</h2>
                <p className="text-sm text-white/70">${item.price}</p>
              </div>
            </div>

            {/* RIGHT - CONTROLS */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="px-2 text-xl"
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="px-2 text-xl"
              >
                +
              </button>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="ml-4 text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="text-right text-2xl font-bold">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}

export default CartPage;
