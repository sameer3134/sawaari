import React, { useEffect, useState } from "react";
import logo from "../assets/sawaari_logo.png";
import bike from "../assets/bike.png";
import Sawaari from "./sawaari";

const Header = () => {
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollOffset(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            {/* Navbar */}
            <div className="text-gray-600 body-font">
                <div className="container px-5 mx-auto">
                    <p className="w-12 h-12 md:h-20 md:w-20 p-2 rounded-full flex title-font font-medium">
                        <img alt="logo" src={logo} />
                        <span
                            style={{
                                background: "linear-gradient(90deg, #54ff98, #508aff)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                            className="ml-3 text-2xl md:text-4xl mt-0 md:mt-4"
                        >
                            Sawaari
                        </span>
                    </p>
                </div>
            </div>

            {/* Hero Section */}
            <section
                className="text-gray-600 body-font overflow-hidden"
                id="hero-section"
                style={{
                    transform: `translateX(${scrollOffset * 0.2}px)`,
                    transition: "transform 0.02s ease-in-out",
                }}
            >
                <div className="container px-5 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        {/* Image Section */}
                        <img
                            alt="ecommerce"
                            className="w-1/2 lg:h-auto md:h-64 h-30 object-cover object-center rounded"
                            src={bike}
                        />
                        {/* Text Section */}
                        <div className="w-1/2 lg:pr-10 lg:py-6 mb-6 lg:mb-0 flex flex-col items-center justify-center">
                            <h1
                                className="text-gray-900 text-3xl md:text-8xl title-font font-medium"
                                style={{
                                    color: "#508aff",
                                }}
                            >
                                Book Once Ride Daily...
                            </h1>
                            <div className="mt-6 flex justify-end w-full">
                                <a
                                    href="#sawaari-info"
                                    className="text-white mt-0 xl:mt-10 py-1 md:py-2 md:px-8 px-4 text-[12px] md:text-xl rounded-full"
                                    style={{ backgroundColor: "#0ccda6" }}
                                >
                                    Know more
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="relative w-full h-16 md:h-36 bg-gray-800 flex flex-col justify-between">
                <div className="flex-grow"></div>
                <div
                    className="h-3 w-full"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to right, #fff, #fff 10px, transparent 20px, transparent 30px)",
                        height: "3px",
                    }}
                ></div>
                <div className="flex-grow"></div>
            </div>

            {/* Info Section */}
            <section id="sawaari-info" className="text-gray-800 body-font">
                <div className="container px-5 py-8 mx-auto">
                    <div className="flex flex-col text-center w-full ">
                        <p className="lg:w-2/3 font-semibold mx-auto leading-relaxed text:md md:text-2xl">
                            <span
                                style={{
                                    background: "linear-gradient(90deg, #54ff98, #508aff)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                                className="ml-3 text-xl md:text-4xl mt-0 md:mt-4"
                            >
                                Sawaari
                            </span>{" "}
                            is a platform where users can pre-schedule their rides on a weekly, monthly or flexible
                            basis. This ensures that a reliable rider is always available at your chosen time and
                            location, making your daily commute stress-free, punctual, and affordable. With Sawaari, you
                            no longer need to worry about the daily struggle of finding a ride -we’ve got you covered!
                        </p>
                    </div>
                </div>
            </section>

            {/* Other components */}
            <Sawaari />
        </div>
    );
};

export default Header;
