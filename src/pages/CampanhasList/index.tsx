import {CardsCampanha} from "../../components/CardsCampanha";
import React, {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import Loading from "../../components/Loading/Index";
import {MagnifyingGlass} from "phosphor-react";
import {Header} from "../../components/HeaderCampanha";


export default function CampanhasList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dataSearch, setDataSearch] = useState([]);
    const [causes, setCauses] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

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
                <Header/>
                <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Oportunidades</h1>
                <div className={'pt-5 h-full w-full flex justify-start gap-5'}>
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
                                   className="input input-bordered w-96"
                                   value={searchTerm}
                                   onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={'grid grid-cols-4 gap-4 w-full'}>
                        {searchTerm && dataSearch.length === 0 && <p className={'flex text-3xl h-full '}>Não encontramos nenhuma campanha :/</p>}
                        {searchTerm && dataSearch.map((item) => (
                            <CardsCampanha
                                causes={item.campaign_causes}
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                imgAvatar={item?.ngo.photo_url}/>
                        ))}
                        {!searchTerm && filteredData.map((item) => (
                            <CardsCampanha
                                key={item.id}
                                causes={item.campaign_causes}
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                imgAvatar={item?.ngo.photo_url}/>
                        ))}
                </div>
            </div>
        )}
    </div>
    )
}

