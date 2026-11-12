
import { useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";

import hamster from "./assets/Group 24.png";
import balanceIcon from "./assets/Group 9.png";
import coin from "./assets/image 2.png";
import mineIcon from "./assets/image 5.png";
import exchangeIcon from "./assets/Union.png";

export default function App() {
  const [balance, setBalance] = useState(507981);
  const [energy, setEnergy] = useState(6500);
  const [levels, setLevels] = useState([1, 1, 1]);

  const location = useLocation();
  const navigate = useNavigate();
  const isMine = location.pathname === "/menu";

  const items = [
    { name: "Top 10 car sales", price: 192, icon: "🚗" },
    { name: "Mine coins", price: 375, icon: "mine" },
    { name: "Margin trading x10", price: 2700, icon: "x10" },
  ];

  function buy(index, price) {
    if (balance < price) return;

    setBalance(balance - price);
    setLevels(levels.map((level, i) =>
      i === index ? level + 1 : level
    ));
  }

  return (
    <div className="min-h-screen bg-[#1d1d1d] flex justify-center text-white">
      <div className="relative w-full max-w-[390px] min-h-screen bg-[#2c2f35] sm:my-5 sm:rounded-[35px] overflow-hidden">

        <main className="px-5 pt-5 pb-24">

          {isMine ? (
            <Outlet context={{
              balance, setBalance, energy, setEnergy,
              balanceIcon, hamster
            }} />
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-7">
                profit per hour modal
              </p>

              <h2 className="text-center mb-8">
                Hamster Kombat
              </h2>

              <div className="flex justify-center items-center gap-2 mb-10">
                <img src={balanceIcon} className="w-8 h-8" alt="" />
                <b className="text-3xl">
                  {balance.toLocaleString("en-US")}
                </b>
              </div>

              <div className="bg-[#292c32] rounded-2xl p-4 border border-white/10">

                <div className="flex justify-end mb-5">
                  <button onClick={() => navigate("/menu")} className="text-2xl">
                    ✕
                  </button>
                </div>

                {items.map((item, index) => {
                  const price = Math.floor(
                    item.price * 1.5 ** (levels[index] - 1)
                  );

                  return (
                    <div key={item.name} className="bg-[#353941] rounded-xl p-3 mb-2">

                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 flex items-center justify-center">
                          {item.icon === "mine" ? (
                            <img src={mineIcon} className="w-10 h-10" alt="" />
                          ) : (
                            <span>{item.icon}</span>
                          )}
                        </div>

                        <div>
                          <p className="text-xs">{item.name}</p>
                          <p className="text-[10px] text-gray-400">
                            Profit per hour
                          </p>
                          <p className="text-yellow-400 text-xs">
                            +{levels[index] * 120}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between mt-3 pt-2 border-t border-white/5">
                        <span className="text-xs text-gray-400">
                          lvl {levels[index]}
                        </span>

                        <button
                          disabled={balance < price}
                          onClick={() => buy(index, price)}
                          className="text-yellow-400 text-xs disabled:opacity-40"
                        >
                          🪙 {price.toLocaleString("en-US")}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </>
          )}

        </main>

        {/* Нижняя навигация */}
        <nav className="absolute bottom-0 w-full h-[65px] bg-[#292c32] flex justify-around items-center border-t border-white/5">

          <NavLink to="/" end className={({ isActive }) =>
            isActive ? "text-yellow-400" : "text-gray-500"
          }>
            <div className="flex flex-col items-center gap-1">
              <img src={exchangeIcon} className="w-5 h-5" alt="" />
              <span className="text-[9px]">Exchange</span>
            </div>
          </NavLink>

          <NavLink to="/menu" className={({ isActive }) =>
            isActive ? "text-yellow-400" : "text-gray-500"
          }>
            <div className="flex flex-col items-center gap-1">
              <span>⛏</span>
              <span className="text-[9px]">Mine</span>
            </div>
          </NavLink>

          <div className="text-gray-500 text-center text-[9px]">👥<br />Friends</div>
          <div className="text-gray-500 text-center text-[9px]">💼<br />Earn</div>
          <div className="text-gray-500 text-center text-[9px]">🪙<br />AirDrop</div>

        </nav>
      </div>
    </div>
  );
}
