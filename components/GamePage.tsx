"use client";

import { useEffect, useState } from "react";
import { useGetProductByIdQuery } from "@/redux/api/productsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import SwiperCards from "@/components/swiper/SwiperCards";
import { AlertDemo } from "@/components/shared/AlertDemo";

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/slices/cartSlice";

import { toggleFavorite } from "@/redux/slices/favoritesSlice";

import { FaHeart } from "react-icons/fa";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function GamePage({ id }: { id: number }) {
  const { data: game, isLoading, isError } = useGetProductByIdQuery(id);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  // ALERT STATE
  const [alert, setAlert] = useState<null | {
    status: "success" | "error";
    title: string;
    desc: string;
  }>(null);

  // auto close alert
  useEffect(() => {
    if (!alert) return;

    const timer = setTimeout(() => {
      setAlert(null);
    }, 1500);

    return () => clearTimeout(timer);
  }, [alert]);

  // favorite
  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((item) => item.id === game?.id),
  );

  // cart
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.id === game?.id),
  );

  const quantity = cartItem?.quantity || 0;

  if (isLoading) return <div>Loading...</div>;
  if (isError || !game) return <div>Game not found</div>;

  return (
    <motion.div
      className="space-y-8 p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ALERT */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AlertDemo
              status={alert.status}
              title={alert.title}
              desc={alert.desc}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SWIPER */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SwiperCards item={game} />
      </motion.div>

      {/* INFO */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="text-2xl sm:text-4xl font-bold">{game.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm sm:text-base">
          <span>{game.genre}</span>

          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={16} fill="currentColor" />
            <span>{game.rating}</span>
          </div>
        </div>

        <p>{game.description}</p>

        <p className="text-xl font-bold">${game.price}</p>

        {/* ACTIONS */}
        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* CART */}
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            {/* ADD TO CART */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!user) {
                  setAlert({
                    status: "error",
                    title: "Cart",
                    desc: "You must login first",
                  });
                  return;
                }

                dispatch(
                  addToCart({
                    id: game.id,
                    title: game.title,
                    price: game.price,
                    cover: game.cover,
                  }),
                );

                setAlert({
                  status: "success",
                  title: "Cart",
                  desc: "Item added successfully",
                });
              }}
              className="w-full rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700 sm:w-auto"
            >
              Add To Cart
            </motion.button>

            {/* +/- */}
            <motion.div
              className="flex gap-3 rounded-lg bg-white/10 px-4 py-2"
              whileHover={{ scale: 1.05 }}
            >
              <button
                onClick={() => {
                  if (!user) {
                    setAlert({
                      status: "error",
                      title: "Cart",
                      desc: "You must login first",
                    });
                    return;
                  }

                  dispatch(decreaseQuantity(game.id));

                  setAlert({
                    status: "success",
                    title: "Cart",
                    desc:
                      quantity <= 1
                        ? "Item removed from cart"
                        : "Quantity decreased",
                  });
                }}
                className="px-2 text-xl"
              >
                −
              </button>

              <span className="min-w-[20px] text-center">{quantity}</span>

              <button
                onClick={() => {
                  if (!user) {
                    setAlert({
                      status: "error",
                      title: "Cart",
                      desc: "You must login first",
                    });
                    return;
                  }

                  dispatch(increaseQuantity(game.id));

                  setAlert({
                    status: "success",
                    title: "Cart",
                    desc: "Quantity increased",
                  });
                }}
                className="px-2 text-xl"
              >
                +
              </button>
            </motion.div>
          </div>

          {/* FAVORITE */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!user) {
                setAlert({
                  status: "error",
                  title: "Favorite",
                  desc: "You must login first",
                });
                return;
              }

              dispatch(
                toggleFavorite({
                  id: game.id,
                  title: game.title,
                  cover: game.cover,
                }),
              );

              setAlert({
                status: "success",
                title: "Favorite",
                desc: "Updated successfully",
              });
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-5 py-2 transition hover:bg-white/20 sm:w-auto"
          >
            <FaHeart
              className={`text-xl ${
                isFavorite ? "text-red-500" : "text-white"
              }`}
            />
            Favorite
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default GamePage;
