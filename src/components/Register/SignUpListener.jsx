import React, { useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate, NavLink } from "react-router-dom";

const SignUpListener = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/sign-up") {
            navigate("/sign-up/general-info");
        }
    }, [location, navigate]);
    return (
        <div className="pt-[100px] min-h-[100vh] bg-dark bg-fixed">
            <div className="container mx-auto flex justify-center items-center">
                <div className="flex items-center justify-center flex-col">
                    <h1 className="text-5xl mb-12 text-bold text-dark100">Qeydiyyat Formu</h1>

                    <div className="flex items-center gap-6 px-12 py-6 text-dark100">
                        {/* Step 1 */}
                        <NavLink to="general-info"
                            className={({ isActive }) => `flex items-center cursor-pointer ${isActive ? 'text-dark100' : 'text-dark50'}`}
                        >
                            <div className={`w-10 h-10 leading-10 mr-3 border ${location.pathname.includes("general-info") ? "border-dark100" : "border-dark50"} rounded-full text-center`}>1</div>
                            <p className="text-[20px] mr-6 tracking-wide">Ümumi Məlumat</p>
                            <span className="inline-block w-[122px] h-[1px] bg-dark50"></span>
                        </NavLink>
                        {/* Step 2 */}
                        <NavLink to="education"
                            className={({ isActive }) => `flex items-center cursor-pointer ${isActive ? 'text-dark100' : 'text-dark50'}`}
                        >
                            <div className={`w-10 h-10 leading-10 mr-3 border ${location.pathname.includes("education") ? "border-dark100" : "border-dark50"} rounded-full text-center`}>2</div>
                            <p className="text-[20px] mr-6 tracking-wide">Təhsil və Təcrübə</p>
                            <span className="inline-block w-[122px] h-[1px] bg-dark50"></span>
                        </NavLink>
                        {/* Step 3 */}
                        <NavLink to="exam"
                            className={({ isActive }) => `flex items-center cursor-pointer ${isActive ? 'text-dark100' : 'text-dark50'}`}
                        >
                            <div className={`w-10 h-10 leading-10 mr-3 border ${location.pathname.includes("exam") ? "border-dark100" : "border-dark50"} rounded-full text-center`}>3</div>
                            <p className="text-[20px] mr-6 tracking-wide">İmtahan Mərhələsi</p>
                        </NavLink>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SignUpListener;
