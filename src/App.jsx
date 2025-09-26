import { MdOutlineFoodBank } from "react-icons/md";
import { BiBowlRice } from "react-icons/bi";
import { LuSalad } from "react-icons/lu";
import { BiDrink } from "react-icons/bi";
import { BiBowlHot } from "react-icons/bi";
import { FaCaretRight } from "react-icons/fa6";
import miGoreng from "./../src/assets/mi-goreng.png";
import miKuah from "./../src/assets/mi-kuah.png";
import nasiGorengJawa from "./../src/assets/nasi-goreng-jawa.png";
import nasiGorengHongkong from "./../src/assets/nasi-goreng-hongkong.png";
import nasiGorengKambing from "./../src/assets/nasi-goreng-kambing.png";

function App() {
  const categoryList = [
    {
      icon: BiBowlRice,
      name: "Nasi",
    },
    {
      icon: BiBowlHot,
      name: "Mi",
    },
    {
      icon: LuSalad,
      name: "Salad",
    },
    {
      icon: BiDrink,
      name: "Minuman",
    },
  ];

  const menuList = [
    {
      image: nasiGorengHongkong,
      name: "Nasi Goreng Hongkong",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    },
    {
      image: miGoreng,
      name: "Mi Goreng",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    },
    {
      image: nasiGorengJawa,
      name: "Nasi Goreng Jawa",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    },
    {
      image: nasiGorengKambing,
      name: "Nasi Goreng Kambing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    },
    {
      image: miKuah,
      name: "Mi Kuah",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    },
  ];

  return (
    <div className="max-w-xl mx-auto py-5">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between px-5">
          <p className="font-supermercado">Dapur Bunda Bahagia</p>
          <MdOutlineFoodBank className=" size-7" />
        </div>

        <div className="flex gap-10 bg-[#2f4978] text-white py-2 justify-center">
          {categoryList.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <item.icon className="size-5" />
              <p>{item.name}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 px-5">
          {menuList.map((item, index) => (
            <div
              key={index}
              className="bg-amber-100 rounded-lg hover:cursor-pointer"
            >
              <img
                src={item.image}
                className="rounded-t-lg aspect-video object-cover"
              />

              <div className="flex p-2">
                <div className="flex flex-col gap-1.5 flex-1">
                  <p className="text-sm font-semibold truncate">{item.name}</p>
                  <p className="text-xs line-clamp-2">{item.description}</p>
                </div>
                <FaCaretRight className="size-4.5 self-end text-amber-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
