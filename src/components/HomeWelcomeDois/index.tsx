import React from "react";
import Students from "../../assets/img/Student-Discussing.svg";
import WaveDown from "../../assets/img/waveDown.svg";
import WaveUp from "../../assets/img/waveUp.svg";
export function HomeWelcomeDois() {
    return (
        <div className={''}>
            <div className="flex flex-col w-full">
                <img src={WaveUp}/>
                <div className="flex  w-full h-50 bg-blueberry">
                    <img src={Students}/>
                    <div className={'flex flex-col w-full'}>
                        <h1 className="text-5xl font-bold text-little-white">Nos conheça melhor!</h1>
                        <p className="py-6 text-little-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>

                </div>
                <img src={WaveDown}/>
            </div>
        </div>
    );
}
