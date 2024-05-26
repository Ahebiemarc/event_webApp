import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";

const About = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="A propos de nous" />
            <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="lg:w-10/12 w-full">
                <h2 className="xl:w-8/12 lg:w-10/12 w-full font-bold text-gray-800 lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2">Nous sommes là pour rendre accessible et agréable à tous les moments occasionnels</h2>
                <p className="font-normal text-xl-fold leading-6 text-gray-600 mt-6">Rendre chaque instant occasionnel accessible et agréable pour tous. Nous nous engageons à enrichir vos expériences, en vous offrant des moments mémorables accessibles à chaque pas.</p>
            </div>

            <div className="lg:mt-14 sm:mt-10 mt-12">
                <img className="lg:block hidden w-full" src="https://i.ibb.co/GvwJnvn/Group-736.png" alt="Group of people Chilling" />
                <img className="lg:hidden sm:block hidden w-full" src="https://i.ibb.co/5sZTmHq/Rectangle-116.png" alt="Group of people Chilling" />
                <img className="sm:hidden block w-full" src="https://i.ibb.co/zSxXJGQ/Rectangle-122.png" alt="Group of people Chilling" />
            </div>

            <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
                <div className="w-full xl:w-5/12 lg:w-6/12">
                    <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">Our Story</h2>
                    <p className="font-normal text-base leading-6 text-gray-600 mt-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.In the first place we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent from</p>
                    <p className="font-normal text-base leading-6 text-gray-600 mt-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.In the first place we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent from</p>
                </div>
                <div className="lg:flex items-center w-full lg:w-1/2 ">
                    <img className="lg:block hidden w-full" src="https://i.ibb.co/2kxWpNm/Group-740.png" alt="people discussing on board" />
                    <img className="lg:hidden sm:block hidden w-full h-3/4" src="https://i.ibb.co/ZLgK3NQ/Group-788.png" alt="people discussing on board" />
                    <img className="sm:hidden block w-full" src="https://i.ibb.co/9g2R7Xr/Group-803.png" alt="people discussing on board" />
                </div>
            </div>
        </div>
        </DefaultLayout>
    );
};

export default About;