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
    </section>
  );
};

export default MyProfile;
