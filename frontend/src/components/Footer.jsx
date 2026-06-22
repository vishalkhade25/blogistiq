const Footer = () => {
  return (
    <div className="border-t-2 border-gray-300 px-6 py-4 bg-white mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">BLOGISTIQ</h2>

        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Blogistiq. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;