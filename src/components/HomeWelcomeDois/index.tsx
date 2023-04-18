import React from "react";
import Students from "../../assets/img/Student-Discussing.svg";
import WaveDown from "../../assets/img/waveDown.svg";
import WaveUp from "../../assets/img/waveUp.svg";
export function HomeWelcomeDois() {
    return (
        <div className={''}>
            <div className="flex flex-col w-full">
                <img src={WaveUp}/>
                <div className="flex  w-full bg-blueberry">
                    <img src={Students}/>
                    <div className={'flex flex-col w-full items-end p-10'}>
                        <h1 className="text-5xl font-bold text-little-white">Nos conheça melhor!</h1>
                        <p className="py-6 text-little-white">A AMPI nasceu para atuar no setor de trabalho voluntário cujo objetivo é a criação da plataforma DoeTempo que se propõe a de auxiliar no trabalho social no Brasil, além de fiscalizar ONG’s certificando se são bem-intencionadas, impossibilitando que sejam feitos golpes ou qualquer desvio. Além disso, promover por meio da comunicação entre voluntário e ONG, um amplo compartilhamento de informações, surgindo assim nossa rede social de trabalho voluntário, que permite a criação de certificados de participação que podem ser compartilhados em diversas redes, interação entre voluntários com posts de ações sociais, promovendo assim maior incentivo e engajamento no mundo solidário.</p>
                    </div>
                </div>
                <img src={WaveDown}/>
            </div>
        </div>
    );
}
