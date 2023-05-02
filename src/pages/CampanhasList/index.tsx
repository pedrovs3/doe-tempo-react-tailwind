import {CardsCampanha} from "../../components/CardsCampanha";
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
    const [causes, setCauses] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

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
        handleSearch()
    };

    const handleSearch = () => {
       api.get(`/campaign/search?search=${searchTerm}`).then(({data}) => {
            setDataSearch(data.payload)
        });
    };


    useEffect(() => {
        const fetchData = async () => {
            const {data} = await api.get('/campaign/');

            setData(data.campaigns);
            setLoading(false)
        }

        fetchData().catch(console.error);

    },[])

    useEffect(() => {
        const fetchData = async () => {

            const causes = await api.get('/causes/');
            setCauses(causes.data.causes);

        }

        fetchData().catch(console.error);

    }, [])


    const filteredData = data.filter((item) => {
        if (!selectedId) {
            return true;
        } else {
            return item.campaign_causes.findIndex(cause => cause.causes.id === selectedId) !== -1;
            // return item.tbl_campaign_causes.tbl_causes.id === selectedId;
        }
    });


    return (
    <div>
        {loading ? (
            <Loading />
        ) : (
            <div className={'p-4'}>
                <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Oportunidades</h1>
                <div className={'pt-5 h-full w-full flex justify-between'}>
                    <select className="select select-ghost w-full max-w-xs" onChange={(event) => setSelectedId(event.target.value)}>
                        {causes.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.title}
                            </option>
                        ))}
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
                <div className={'grid grid-cols-4 gap-4 w-full'}>
                        {searchTerm && dataSearch.length === 0 && <p className={'flex text-3xl h-full items-center justify-center'}>Não encontramos nenhuma campanha :/</p>}
                        {searchTerm && dataSearch.map((item) => (
                            <CardsCampanha key={item.id} id={item.id} title={item.title} description={item.description} imgAvatar={item?.ngo.photo_url}/>
                        ))}
                        {!searchTerm && filteredData.map((item) => (
                            <CardsCampanha key={item.id} id={item.id} title={item.title} description={item.description} imgAvatar={item?.ngo.photo_url}/>
                        ))}
                </div>
            </div>
        )}
    </div>
    )
}

