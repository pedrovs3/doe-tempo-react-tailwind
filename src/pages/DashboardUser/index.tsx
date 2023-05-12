import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading/Index";
import logo from "../../assets/img/ampi-doe-tempo.svg";
import {Check, CheckCircle, Handshake, List, X} from "phosphor-react";



export default function DashboardUser() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="h-screen w-screen">
                {loading ? (
                    <Loading />
                ) : (
                    <div className="drawer drawer-mobile">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col items-center justify-center">
                            <div>
                                <div className="stats shadow">
                                    <div className="stat">
                                        <div className="stat-figure text-blueberry">
                                            <span className="relative flex h-3 w-3">
                                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                            <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-blueberry"></span>
                                        </span>
                                        </div>
                                        <div className="stat-title">Campanhas Ativas</div>
                                        <div className="stat-value">31K</div>
                                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-figure text-blueberry">
                                            <Handshake size={32} />
                                        </div>
                                        <div className="stat-title">Voluntários Engajados</div>
                                        <div className="stat-value">4,200</div>
                                        <div className="stat-desc">↗︎ 400 (22%)</div>
                                    </div>

                                    <div className="stat">
                                        <div className="stat-figure text-blueberry">
                                            <CheckCircle size={32} />
                                        </div>
                                        <div className="stat-title">Campanhas concluídas</div>
                                        <div className="stat-value">1,200</div>
                                        <div className="stat-desc">↘︎ 90 (14%)</div>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto w-full pt-3.5">
                                <table className="table w-full">
                                    {/* head */}
                                    <thead>
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <th>Nome</th>
                                        <th>Campanha</th>
                                        <th>Status de Decisão</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">Hart Hagerty</div>
                                                    <div className="text-sm opacity-50">United States</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            Zemlak, Daniel and Leannon
                                            <br/>
                                            <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                        </td>
                                        <td>
                                            <div className={"flex gap-5"}>
                                                <button className="btn btn-circle btn-outline btn-accent">
                                                    <span className="hover:text-little-white"><Check size={32} /></span>
                                                </button>
                                                <button className="btn btn-circle btn-outline btn-error">
                                                    <span className="hover:text-little-white"><X size={32} /></span>
                                                </button>
                                            </div>
                                        </td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">details</button>
                                        </th>
                                    </tr>
                                    {/* row 2 */}
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src="/tailwind-css-component-profile-3@56w.png" alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">Brice Swyre</div>
                                                    <div className="text-sm opacity-50">China</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            Carroll Group
                                            <br/>
                                            <span className="badge badge-ghost badge-sm">Tax Accountant</span>
                                        </td>
                                        <td>Red</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">details</button>
                                        </th>
                                    </tr>
                                    {/* row 3 */}
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src="/tailwind-css-component-profile-4@56w.png" alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">Marjy Ferencz</div>
                                                    <div className="text-sm opacity-50">Russia</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            Rowe-Schoen
                                            <br/>
                                            <span className="badge badge-ghost badge-sm">Office Assistant I</span>
                                        </td>
                                        <td>Crimson</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">details</button>
                                        </th>
                                    </tr>
                                    {/* row 4 */}
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src="/tailwind-css-component-profile-5@56w.png" alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">Yancy Tear</div>
                                                    <div className="text-sm opacity-50">Brazil</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            Wyman-Ledner
                                            <br/>
                                            <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
                                        </td>
                                        <td>Indigo</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">details</button>
                                        </th>
                                    </tr>
                                    </tbody>
                                    {/* foot */}
                                    <tfoot>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Job</th>
                                        <th>Favorite Color</th>
                                        <th></th>
                                    </tr>
                                    </tfoot>

                                </table>
                            </div>
                            <label htmlFor="my-drawer-2" className="btn bg-blueberry drawer-button lg:hidden absolute top-0 left-0 mt-4 ml-4">
                                <List size={32} />
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                            <ul className="menu bg-blueberry p-4 w-80 text-little-white">
                                <img src={logo} />
                                <li><a>Sidebar Item 1</a></li>
                                <li><a>Sidebar Item 2</a></li>
                            </ul>
                        </div>
                    </div>

                )}
        </div>

    )
}

