import Banner from "./Banner";
import Category from "./Category";
import Featured from "./Featured/Featured";
import PopularManu from "./PopularManu";
import Testimonial from "./Testimonials/Testimonial";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <PopularManu></PopularManu>
            <Featured></Featured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;