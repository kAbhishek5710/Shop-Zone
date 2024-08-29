import Divider from "@mui/material/Divider";

export default function Profile() {
  return (
    <div className="mx-12 mt-8">
      <h1 className="ml-8 mb-4 font-semibold font-jersey-10 text-xl">Account_Name</h1>
      <Divider orientation="horizontal" flexItem />
      <div className="flex justify-start flex-col-reverse md:flex-row gap-6 text-gray-700">
        <div className="grid gap-2 justify-center items-start text-sm">
          <div className="p-4">
            <h3 className="text-base">
              <a href="#">Overview</a>
            </h3>
          </div>
          <Divider orientation="horizontal" flexItem />
          <div className="p-4">
            <h1 className="text-gray-500 text-base opacity-70">ORDERS</h1>
            <ul className="mt-3 ml-2">
              <li>
                <a href="#">Orders & Returns</a>
              </li>
            </ul>
          </div>
          <Divider orientation="horizontal" flexItem />
          <div className="p-4">
            <h1 className="text-gray-500 text-base opacity-70">CREDITS</h1>
            <ul className="mt-3 ml-2">
              <li>
                <a href="#">Coupons</a>
              </li>
              <li>
                <a href="#">Credits</a>
              </li>
              <li>
                <a href="#">Cash Points</a>
              </li>
            </ul>
          </div>
          <Divider orientation="horizontal" flexItem />
          <div className="p-4">
            <h1 className="text-gray-500 text-base opacity-70">PROFILE</h1>
            <ul className="mt-3 ml-2">
              <li>
                <a href="#">Saved Cards</a>
              </li>
              <li>
                <a href="#">Saved UPI</a>
              </li>
              <li>
                <a href="#">Saved Wallets</a>
              </li>
              <li>
                <a href="#">Addresses</a>
              </li>
              <li>
                <a href="#">Shopping Insiders</a>
              </li>
              <li>
                <a href="#">Delete Account</a>
              </li>
            </ul>
          </div>
          <Divider orientation="horizontal" flexItem />
        </div>
        <Divider orientation="vertical" flexItem className="hidden md:flex" />
        <div className="flex flex-col items-start px-8 md:px-12 lg:px-60 pt-12 my-5 border border-customBlue border-opacity-20 rounded-lg flex-grow">
          <div>
            <h1 className="text-black opacity-80 font-semibold text-2xl">
              Profile Details
            </h1>
          </div>
          <Divider orientation="horizontal" flexItem />
          <div className="flex flex-col gap-8 ml-6 my-8 text-base font-medium">
            <div>
              <img src="" alt="" />
            </div>
            <div className="grid grid-cols-2 lg:gap-x-48">
              <p>Full Name</p>
              <p>Abhishek Kushwaha</p>
            </div>
            <div className="grid grid-cols-2 lg:gap-x-48">
              <p>Mobile Number</p>
              <p>9936569874</p>
            </div>
            <div className="grid grid-cols-2 lg:gap-x-48">
              <p>Email ID</p>
              <p>demoMail@gmail.com</p>
            </div>
            <div className="grid grid-cols-2 lg:gap-x-48">
              <p>Gender</p>
              <p>Male</p>
            </div>
            <div className="grid grid-cols-2 lg:gap-x-48">
              <p>Date of Birth</p>
              <p>- not added -</p>
            </div>
            <div className="grid grid-cols-2 lg:gap-x-48">
              <p>Location</p>
              <p>Purani Haveli ke khandhar me</p>
            </div>
            <div className="grid grid-cols-2 lg:gap-x-48">
              <p>Alternate Mobile</p>
              <p>XXXXXXXX89</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
