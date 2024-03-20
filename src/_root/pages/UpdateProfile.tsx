import EditProfileForm from "@/components/formes/EditProfileForm";
import UpdatePassword from "@/components/formes/UpdatePassword";
import Loader from "@/components/shared/Loader";
import { useSelector } from "react-redux";

export default function UpdateProfile() {
  const { userInfo } = useSelector((state) => state.auth) 
  
  
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-2 justify-start w-full">
          <img src="/assets/icons/65465465.png" width={55} height={55} alt="add-post" />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>
        {!userInfo ? <Loader></Loader> :<EditProfileForm userData={userInfo}></EditProfileForm>}
        <hr className=" border-gray-700 border w-full" />
        <h2 className="w-full font-bold text-3xl text-center my-4">Update password</h2>
        <UpdatePassword userData={userInfo}></UpdatePassword>
      </div>
    </div>
  )
}
