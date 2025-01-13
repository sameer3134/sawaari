import React, { useEffect, useState } from "react";
import logo from "../assets/sawaari_logo.png";
import bike from "../assets/bike.png";
import Sawaari from "./sawaari";
import Blink from 'react-blink-text';

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

    const handleKnowMoreClick = () => {
        const infoSection = document.getElementById("sawaari-info");
        if (infoSection) {
            infoSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="bg-gray-200">
            {/* Navbar */}
            <div class="text-gray-600 body-font">
                <div class="container px-5 mx-auto flex items-center sm:flex-row flex-col">
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

                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start font-bold text-red-600 text-md">
                        <Blink text="Currently running only in Patna" color="text-blue-500" fontSize='20' />
                    </span>
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
                            className="w-1/2 lg:h-auto md:h-64 h-30 object-contain rounded"
                            src={bike}
                        />
                        {/* Text Section */}
                        <div className="w-1/2 lg:pr-10 lg:py-6 mb-6 lg:mb-0 flex flex-col items-center justify-center">
                            <h1
                                className="text-gray-900 text-3xl md:text-4xl title-font font-medium"
                                style={{
                                    color: "#00326b",
                                }}
                            >
                                "Book Once Ride Daily 🏍️"
                            </h1>
                            <div className="mt-6 flex justify-end w-full">
                                <button
                                    onClick={handleKnowMoreClick}
                                    className="text-white mt-0 xl:mt-10 py-1 md:py-2 md:px-8 px-4 text-[12px] md:text-xl rounded-full"
                                    style={{ backgroundColor: "#0ccda6" }}
                                >
                                    Know more
                                </button>
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
                            "repeating-linear-gradient(to right, #fff, #fff 30px, transparent 30px, transparent 60px)",
                        height: "5px",
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
                            no longer need to worry about the daily struggle of finding a ride - <span
                                className=" mt-0 md:mt-4 text-black font-semibold"
                            >we’ve got you covered!
                            </span>
                        </p>
                    </div>
                </div>
            </section>

            <p className="mt-8 items-center text-4xl font-bold">How we are different from them</p>

            <section class="text-gray-600 body-font overflow-hidden">
                <div class="container px-5 py-6 mx-auto">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap">
                        <div class="w-full lg:w-1/2 lg:pl-10 lg:py-6 mt-6 lg:mt-0 ">
                            <div className="border border-green-500 rounded-lg py-10 shadow-xl bg-gray-200"
                            >
                                <h2 class="title-font text-gray-500 text-lg font-bold  tracking-widest" style={{ color: "#0ccda6" }}>Cost Effective</h2>
                                <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">20-30% lesser than others 😊</h1>
                            </div></div>

                        <div class="w-full lg:w-1/2 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <div className="border border-green-500 rounded-lg py-10 shadow-xl bg-gray-200"
                            >
                                <h2 class="title-font text-gray-500 text-lg font-bold  tracking-widest" style={{ color: "#0ccda6" }}>Captain Assignment</h2>
                                <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">within 18 hours 🕑</h1>
                            </div>
                        </div></div>
                </div>
            </section>

            {/* Other components */}
            <Sawaari />
        </div>
    );
};

export default Header;
