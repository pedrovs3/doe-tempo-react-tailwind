
import React from "react";

export function HomeWelcome() {
    return (
            <div className={''}>
                <h1 className="text-5xl font-bold">Em busca de <span className="text-blueberry">ajudar</span> outras <br/>
                    pessoas de maneira <span className="text-blueberry">voluntária</span>?</h1>
                <p className="py-6">Embarque com a gente nessa jornada de fazer o mundo um lugar melhor!</p>
                <div className={'flex gap-5 pb-5'}>
                <button className="btn w-60 rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-accent">Junte-se a nós</button>
                <button className="btn w-60 rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-accent">Registre sua ONG</button>
                </div>
                <div className="stats shadow">
                    <div className="stat place-items-center">
                        <div className="stat-value">31K</div>
                        <div className="stat-desc">Voluntários cadastrados</div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-value text-blueberry">4,200</div>
                        <div className="stat-desc text-blueberry">Ong’s cadastradas</div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-value">1,200</div>
                        <div className="stat-desc">Campanhas Criadas</div>
                    </div>
                </div>
            </div>
    );
}
