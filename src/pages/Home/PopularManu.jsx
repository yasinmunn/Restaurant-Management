
import SectionTItles from '../../Components/SectionTItles';
import MenuItem from '../Shared/MenuItem';
import useMenu from '../../hooks/useMenu';

const PopularManu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section>
            <SectionTItles
                subHeading={'From Our Manu'}
                heading={'Popular Items'}
            ></SectionTItles>
            <div className='grid md:grid-cols-2 gap-10 my-10'>
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
        </section>
    );
};

export default PopularManu;