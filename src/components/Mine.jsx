
import { useOutletContext } from "react-router-dom";
import energyIcon from "../assets/Vector.png";

export default function Mine() {
    const {
        balance,
        setBalance,
        energy,
        setEnergy,
        balanceIcon,
        hamster,
    } = useOutletContext();

    function tap() {
        if (energy > 0) {
            setBalance(balance + 12);
            setEnergy(energy - 1);
        }
    }

    return (
        <>
            <p className="text-sm text-gray-400 mb-7">Home</p>

            <h2 className="text-center mb-8">Hamster Kombat</h2>

            <div className="grid grid-cols-3 gap-2 mb-7">
                <Stat title="Earn per tap" value="+12" />
                <Stat title="Coins to level up" value="10 M" />
                <Stat title="Profit per hour" value="+636" />
            </div>

            <div className="flex justify-center items-center gap-2 mb-20">
                <img src={balanceIcon} className="w-8 h-8" alt="" />
                <b className="text-3xl">{balance.toLocaleString("en-US")}</b>
            </div>

            <button
                onClick={tap}
                className="w-full mb-16 active:scale-95 transition"
            >
                <img
                    src={hamster}
                    className="w-[290px] mx-auto"
                    alt="Hamster"
                />
            </button>

            <div className="flex justify-between text-xs mb-4">
                <span className="flex items-center gap-1">
                    <img src={energyIcon} className="w-5 h-5" alt="" />
                    {energy} / 6500
                </span>

                <button onClick={() => setEnergy(6500)}>
                    Boost
                </button>
            </div>

            <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${energy / 65}%` }}
                />
            </div>
        </>
    );
}

function Stat({ title, value }) {
    return (
        <div className="bg-[#353941] rounded-xl p-3 text-center">
            <p className="text-[9px] text-yellow-400">{title}</p>
            <p className="text-xs mt-1">{value}</p>
        </div>
    );
}
