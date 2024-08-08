import Image from "next/image";
import ProfileImage from "@/public/profile.jpg";

const MyProfile = () => {
  return (
    <section className="w-full mx-auto">
      <Image
        className=" border-3 border-black  rounded-[100%] mx-auto mt-8 h-[200px] w-[200px]"
        src={ProfileImage}
        alt={""}
      />
      <div>
        <p className="mt-12 mb-12 text-3xl text-center text-white">
          Hello and Welcome 👋&nbsp;
          <span className="whitespace-nowrap">
            I&apos;m <span className="font-bold">ABUBAKAR</span>
          </span>
        </p>
      </div>
    </section>
  );
};

export default MyProfile;
