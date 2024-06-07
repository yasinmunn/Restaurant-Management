import React, { useEffect, useState } from 'react';
import SectionTItles from '../../Components/SectionTItles';
import MenuItem from '../Shared/MenuItem';

const PopularManu = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItems = data.filter(item => item.category === 'popular');
                setMenu(popularItems)
            })

    }, [])
    return (
        <section>
            <SectionTItles
                subHeading={'From Our Manu'}
                heading={'Popular Items'}
            ></SectionTItles>
            <div className='grid md:grid-cols-2 gap-10 my-10'>
                {
                    menu.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
        </section>
    );
};

export default PopularManu;