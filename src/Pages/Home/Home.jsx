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
        <h1 className="text-[2rem] "> Hoş Geldiniz!</h1>

        <h4 className="text-2xl ">
          Sevgili Dostlarımız ve Değerli Sahipleri,
        </h4>

        <h5 className="mt-3 font-dark text-lg text-white text-left">
          <span className="ml-6"></span>Evcil hayvanlarınıza en iyi şekilde bakmanız için buradayız! Pet Shop
          olarak, evcil dostlarınızın tüm ihtiyaçlarını karşılayacak geniş bir
          ürün yelpazesi sunuyoruz. Kaliteli mamalar, eğlenceli oyuncaklar, şık
          aksesuarlar ve sağlıklı bakım ürünleri ile hem siz hem de sevimli
          arkadaşlarınız mutlu olacak. Tüm besin ihtiyaçlarını karşılayan
          güvenilir ve sağlıklı mamalarımızla evcil hayvanlarınızın sağlıklı ve
          enerjik kalmasını sağlıyoruz. Eğlenceli oyuncaklarımız, evcil
          hayvanlarınızın keyifle vakit geçirmesi için özel olarak tasarlandı.
          Tüy bakımı, hijyen ve sağlık için gereken her şeyi içeren bakım
          ürünlerimizle, sevimli dostlarınızın her zaman en iyi şekilde
          görünmesini ve hissetmesini sağlıyoruz. Şıklığı ve konforu bir arada
          sunan tasma, taşıma çantası gibi aksesuarlarımızla da evcil
          hayvanlarınızın tarzını yansıtabilirsiniz. Hızlı teslimat, güvenli
          ödeme seçenekleri ve müşteri memnuniyeti garantisi ile alışverişinizi
          kolaylaştırıyoruz. Evcil dostlarınızın mutluluğu bizim için önemli, bu
          yüzden en kaliteli ürünleri en iyi fiyatlarla sunuyoruz. Şimdi
          keşfetmeye başlayın ve evcil hayvanınız için en iyisini bulun!
        </h5>
      </div>
    </div>
  );
}

export default Home;
