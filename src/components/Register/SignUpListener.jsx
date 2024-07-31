import React from "react";
import { Outlet, useLocation, NavLink } from "react-router-dom";

const SignUpListener = () => {
    const location = useLocation();

    return (
        <div className="min-h-[100vh] py-[100px] bg-dark bg-fixed">
            <div className="flex justify-center items-center">
                <div className="flex items-center justify-center flex-col xs:mx-6">
                    <h1 className="text-5xl xs:text-3xl sm:text-4xl mb-12 xs:mb-10 text-bold text-dark100">Qeydiyyat Formu</h1>

                    <div className="flex items-center gap-6 xs:gap-0 lg:px-12 py-6 xs:py-0 text-dark100">
                        {/* Step 1 */}
                        <NavLink to="general-info"
                            className={({ isActive }) => `flex items-center cursor-pointer ${isActive ? 'text-dark100' : 'text-dark50'}`}
                        >
                            <div className="xs:text-[10px] flex items-center justify-center text-center flex-col sm:flex-row gap-3">
                                <div className={`lg:w-10 lg:h-10 w-8 md h-8 leading-8 xs:w-5 xs:h-5 xs:text-[10px] lg:leading-10 xs:leading-5 lg:mr-3 sm:mr-1  border ${location.pathname.includes("general-info") ? "border-dark100" : "border-dark50"} rounded-full text-center`}>1</div>
                                <p className="xl:text-xl lg:text-sm text-xs mr-6 xs:mr-0 tracking-wide">Ümumi Məlumat</p>
                            </div>
                            <span className="inline-block lg:w-[122px] md:w-[80px] w-[50px] h-[1px] bg-dark50"></span>
                        </NavLink>
                        {/* Step 2 */}
                        <NavLink to="education"
                            className={({ isActive }) => `flex items-center cursor-pointer ${isActive ? 'text-dark100' : 'text-dark50'}`}
                        >
                            <div className="xs:text-[10px] flex items-center justify-center text-center flex-col sm:flex-row gap-3">
                                <div className={`lg:w-10 lg:h-10 w-8 md h-8 leading-8 xs:w-5 xs:h-5 xs:text-[10px] lg:leading-10 xs:leading-5 lg:mr-3 sm:mr-1  border ${location.pathname.includes("education") ? "border-dark100" : "border-dark50"} rounded-full text-center`}>2</div>
                                <p className="xl:text-xl lg:text-sm text-xs mr-6 xs:mr-0 tracking-wide">Təhsil və Təcrübə</p>
                            </div>
                            <span className="inline-block lg:w-[122px] md:w-[80px] w-[50px] h-[1px] bg-dark50"></span>
                        </NavLink>
                        {/* Step 3 */}
                        <NavLink to="final"
                            className={({ isActive }) => `flex items-center cursor-pointer ${isActive ? 'text-dark100' : 'text-dark50'}`}
                        >
                            <div className="xs:text-[10px] flex items-center justify-center text-center flex-col sm:flex-row gap-3">
                                <div className={`lg:w-10 lg:h-10 w-8 md h-8 leading-8 xs:w-5 xs:h-5 xs:text-[10px] lg:leading-10 xs:leading-5 lg:mr-3 sm:mr-1  border ${location.pathname.includes("exam") ? "border-dark100" : "border-dark50"} rounded-full text-center`}>3</div>
                                <p className="xl:text-xl lg:text-sm text-xs tracking-wide">Final</p>
                            </div>
                        </NavLink>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SignUpListener;
