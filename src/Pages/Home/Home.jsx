import React from "react";
import "./Home.css";
import dog from "../../../public/home-page.jpg";
function Home() {
  return (
    <div
      className="image absolute top-0 z-[-1]"
      style={{ backgroundImage: `url(${dog})` }}
    >
      <div className=" backdrop-blur-[4px] bg-black/50 text-white  text-center flex flex-col top-56 absolute w-7/12 left-80 rounded-md py-10 px-5">
        <h1 className="text-[2rem] "> Welcome!</h1>

        <h4 className="text-2xl "> Dear Friends and Valued Owners, </h4>

        <h5 className="mt-3 font-dark text-lg text-white text-left">
          <span className="ml-6"></span>We are here to help you take the best
          care of your pets! As a Pet Shop, we offer a wide range of products to
          meet all the needs of your beloved companions. With high-quality food,
          fun toys, stylish accessories, and healthy care products, both you and
          your furry friends will be happy. Our reliable and healthy foods
          ensure that your pets stay healthy and energetic. Our fun toys are
          specially designed to keep your pets entertained. Our care products,
          which include everything needed for fur care, hygiene, and health,
          ensure that your beloved pets always look and feel their best. With
          accessories like leashes and carrying bags that combine style and
          comfort, you can reflect your pet's personality. We make shopping
          easier with fast delivery, secure payment options, and a customer
          satisfaction guarantee. Your pet's happiness is important to us, which
          is why we offer the best quality products at the best prices. Start
          exploring now and find the best for your pet!
        </h5>
      </div>
    </div>
  );
}

export default Home;
