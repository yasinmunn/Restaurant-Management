import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Category from "./Category";
import Featured from "./Featured/Featured";
import PopularManu from "./PopularManu";
import Testimonial from "./Testimonials/Testimonial";

const Home = () => {
    return (
        <div>
              <Helmet>
                <title>Bistro Boss | Home</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularManu></PopularManu>
            <Featured></Featured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;