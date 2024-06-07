import SectionTItles from "../../../Components/SectionTItles";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css';

const Featured = () => {
    return (
        <div className="feature-item bg-fixed text-white pt-6">
            <SectionTItles 
             subHeading={'Check it Out'} heading={'Featured Item'}
            ></SectionTItles>
            <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-40 gap-10 py-20 px-12">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="space-y-4">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">Where i can get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sunt magni at ducimus praesentium labore quasi vel, porro optio quod quia, voluptas tenetur, officia saepe.</p>
                    <button className="btn btn-primary">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;