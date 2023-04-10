import {CardsCampanha} from "../../components/CardsCampanha";
import {CardsBar} from "../../components/CardsBar";
import React, {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import Loading from "../../components/Loading";
import {MagnifyingGlass} from "phosphor-react";


export default function CampanhasList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(false);
    const handleGeolocationToggle = () => {
        setIsGeolocationEnabled(!isGeolocationEnabled);
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [dataSearch, setDataSearch] = useState([]);

    useEffect(() => {
        if (isGeolocationEnabled) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log('Latitude:', position.coords.latitude);
                console.log('Longitude:', position.coords.longitude);
            });
        }
    }, [isGeolocationEnabled]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
       const dataSearch = api.get(`/campaign/search?search=${searchTerm}`).then((response) => {
            setDataSearch(response.data)
        });
    };

    console.log(dataSearch)


    useEffect(() => {
        const fetchData = async () => {
            const {data} = await api.get('/campaign/');

            setData(data.campaigns);
            setLoading(false)
        }

        fetchData().catch(console.error);

    },[])


return (
    <div>
        {loading ? (
            <Loading />
        ) : (
            <div className={'p-4'}>
                <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Oportunidades</h1>
                <div className={'pt-5 h-full w-full flex justify-between'}>
                    <select className="select select-ghost w-full max-w-xs">
                        <option disabled selected>Causas</option>
                        <option>Svelte</option>
                        <option>Vue</option>
                        <option>React</option>
                    </select>
                    <div className="form-control">
                        <div className="input-group">
                            <button className="btn btn-square" onClick={handleSearch}>
                                <MagnifyingGlass size={32} />
                            </button>
                            <input type="text"
                                   placeholder="Pesquisar…"
                                   className="input input-bordered"
                                   value={searchTerm}
                                   onChange={handleInputChange}
                            />
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
                <div className={'grid grid-cols-4 gap-4'}>
                    {
                        data.map((item) => (
                            <CardsCampanha key={item.id}  id={item.id}  title={item.title}  description={item.description}/>
                        ))}

                </div>
            </div>
        )}
    </div>
    )
}
