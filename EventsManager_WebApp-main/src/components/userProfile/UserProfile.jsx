import React from "react";

import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
  } from "@material-tailwind/react";


const UserProfileC = ({open, handleOpen}) =>{

    return(
        <div >
            <Dialog
                size="xm"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <div className="flex w-full items-center justify-center">
                    <div className="bg-white mt-10 rounded-lg w-[350px] ">
                        <div className="flex items-center justify-center pt-10 flex-col">
                            <img src="https://i.pinimg.com/originals/a8/bc/90/a8bc90ea196737604770aaf9c2d56a51.jpg" className="rounded-full w-32" />
                            <h1 className="text-gray-800 font-semibold text-xl mt-5">Bae Suzy</h1>
                            <h1 className="text-gray-500 text-sm">Monastir, Tunisia</h1>
                            <h1 className="text-gray-500 text-sm p-4 text-center">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </h1>
                        </div>
                        <div className="flex justify-between p-4">
                        <div>
                            <h1 className="text-xs uppercase text-gray-500">Membership</h1>
                            <h1 className="text-xs text-yellow-500">Gold Member</h1>
                        </div>
                        <div>
                            <button className="text-xs text-green-300 border-2 py-1 px-2 border-green-300">Renew</button>
                        </div>
                        </div>
                        <div className="flex items-center justify-center mt-3 mb-6 flex-col">
                        <h1 className="text-xs text-gray-500">Get Connected</h1>
                        <div className="flex mt-2">
                        <img src="https://www.iconsdb.com/icons/preview/gray/facebook-xxl.png" alt="" className="w-6 border-2 p-1 rounded-full mr-3" />  
                            <img src="https://www.iconsdb.com/icons/preview/gray/twitter-xxl.png" alt="" className="w-6 border-2 p-1 rounded-full mr-3" />
                        <img src="https://www.iconsdb.com/icons/preview/gray/google-plus-xxl.png" alt="" className="w-6 border-2 p-1 rounded-full mr-3" />
                            <img src="https://www.iconsdb.com/icons/preview/gray/instagram-6-xxl.png" alt="" className="w-6 border-2 p-1 rounded-full" />  
                        </div>
                        
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};


export default UserProfileC;