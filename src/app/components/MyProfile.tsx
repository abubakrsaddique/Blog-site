import Image from "next/image";
import ProfileImage from "@/public/profile.jpg";

const MyProfile = () => {
  return (
    <section className="w-full mx-auto">
      <Image
        className=" border-3 border-black height-[200px] rounded-[50%] mx-auto mt-8"
        src={ProfileImage}
        width={200}
        height={200}
        alt={""}
      />
    </section>
  );
};

export default MyProfile;
