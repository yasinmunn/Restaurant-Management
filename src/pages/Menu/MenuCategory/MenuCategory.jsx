
import { Link } from 'react-router-dom';
import Cover from '../../Shared/Cover';
import MenuItem from '../../Shared/MenuItem';

const MenuCategory = ({ items, title, img }) => {
    return (
        <div className=''>
            {title &&
                <Cover img={img} title={title} description={'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.'}></Cover>
            }
            <div className='grid md:grid-cols-2 gap-10 my-14'>
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`}>
                <button className='btn btn-outline border-0 border-b-4 bg-black text-white mt-4'>Order</button>
            </Link>
        </div>
    );
};

export default MenuCategory;