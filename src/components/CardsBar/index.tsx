import {Divide, MagnifyingGlass} from "phosphor-react";
import {useEffect, useState} from "react";

export function CardsBar() {

        const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(false);

        const handleGeolocationToggle = () => {
            setIsGeolocationEnabled(!isGeolocationEnabled);
        };

        useEffect(() => {
            if (isGeolocationEnabled) {
                navigator.geolocation.getCurrentPosition(position => {
                    console.log('Latitude:', position.coords.latitude);
                    console.log('Longitude:', position.coords.longitude);
                });
            }
        }, [isGeolocationEnabled]);

        return (
            <div className={'pt-5 h-full w-full flex justify-between'}>
                <select className="select select-ghost w-full max-w-xs">
                    <option disabled selected>Causas</option>
                    <option>Svelte</option>
                    <option>Vue</option>
                    <option>React</option>
                </select>
                <select className="select select-ghost w-full max-w-xs">
                    <option disabled selected>Habilidades</option>
                    <option>Svelte</option>
                    <option>Vue</option>
                    <option>React</option>
                </select>
                <div className="form-control">
                    <div className="input-group">
                        <button className="btn btn-square">
                            <MagnifyingGlass size={32} />
                        </button>
                        <input type="text" placeholder="Pesquisar…" className="input input-bordered"/>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer gap-3">
                        <span className="label-text font-medium">Localização</span>
                        <input type="checkbox" className="toggle"
                               checked={isGeolocationEnabled}
                               onChange={handleGeolocationToggle}/>
                    </label>
                </div>
            </div>
        )
    }
