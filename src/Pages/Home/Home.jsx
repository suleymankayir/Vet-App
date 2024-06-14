import React from "react";
import "./Home.css";
import dog from "../../../public/dog1.jpeg";
function Home() {
  return (
    <div
      className="resim absolute top-0 z-[-1]"
      style={{ backgroundImage: `url(${dog})` }}
    >
      <div className=" backdrop-blur-[4px] bg-white/20 text-white  text-center flex flex-col top-56 absolute w-7/12 left-80 rounded-md py-10 px-5">
        <h1 className="text-[2rem]"> Hoş Geldiniz!</h1>

        <h4 className="text-2xl">Sevgili Dostlarımız ve Değerli Sahipleri,</h4>

        <h5 className="font-light text-lg">
          Veteriner kliniğimize adım attığınız andan itibaren, yalnızca
          hayvanlarınızın değil, aynı zamanda sizin de ailenizin bir parçası
          olduğunuzu hissetmenizi istiyoruz. Burada, dostlarınızın sağlığı ve
          mutluluğu bizim için en büyük önceliktir. Bizler, hayvanların
          yaşamlarında ne kadar önemli bir yere sahip olduğunu ve her birinin
          özel ilgi ve sevgiye ihtiyaç duyduğunu biliyoruz. Onların sağlığı ve
          iyiliği için buradayız, çünkü her bir pati izinde, kuyruk sallamada ve
          sevimli miyavlamada kalplerimizi ısıtan eşsiz bir bağ var. Hedefimiz,
          dostlarınızın her zaman mutlu, sağlıklı ve enerjik olmasını sağlamak.
          İster rutin kontroller için gelmiş olun, ister acil bir durum için,
          her zaman yanınızdayız. En gelişmiş tedavi yöntemleri ve şefkat dolu
          yaklaşımımızla, hayvanlarınızın sağlığını korumak ve iyileştirmek için
          buradayız. Her tüylü dostumuzun sağlığı bizim için çok değerli.
          Onların neşesi, sizin mutluluğunuzdur. Gelin, birlikte sağlıklı ve
          mutlu bir yaşam için adım atalım.
        </h5>
      </div>
    </div>
  );
}

export default Home;
