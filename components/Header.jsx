import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromApi } from "@/utils/api";

const Header = () => {
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const [showCatMenu, setShowCatMenu] = React.useState(false);
  const [show, setShow] = React.useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [categories, setCategories] = React.useState(null);

  const { cartItems } = useSelector((state) => state.cart);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.addEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await fetchDataFromApi("api/categories?populate=*");
    setCategories(data);
  };

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center 
      justify-between z-20 sticky top-0 transition-transform duration-300 
      ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
          <img src="/logo.svg" alt="" className="w-[40px] md:w-[60px]" />
        </Link>
        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />

        {mobileMenu && (
          <MobileMenu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}

        <div className="flex items-centergap-2 text-black">
          <div
            className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center 
          items-center hover:bg-black/[0.05] cursor-pointer relative"
          >
            <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
            <div
              className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full
             bg-red-600 absolute top-1 
             left-5 md:left-7 text-white text-[10px] md:tex-[12px] 
             flex justify-center items-center px-[2px] md:px-[5px]"
            >
              5
            </div>
          </div>

          <Link href="/cart">
            <div
              className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center 
          items-center hover:bg-black/[0.05] cursor-pointer relative"
            >
              <BsCart className="text-[15px] md:text-[20px]" />
              {cartItems.length > 0 && (
                <div
                  className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full
           bg-red-600 absolute top-1 
           left-5 md:left-7 text-white text-[10px] md:tex-[12px] 
           flex justify-center items-center px-[2px] md:px-[5px]"
                >
                  {cartItems.length}
                </div>
              )}
            </div>
          </Link>

          <div
            className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center 
          items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2"
          >
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
